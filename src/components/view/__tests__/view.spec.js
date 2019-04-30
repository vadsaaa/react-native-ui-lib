import React from 'react';
import renderer from 'react-test-renderer';
import View from '../index';
import {ThemeManager} from '../../../style';

describe('View', () => {
  beforeEach(() => {
    ThemeManager.setComponentTheme('View', undefined);
  });

  it('should render clean view', () => {
    const tree = renderer.create(<View />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('should support theme props', () => {
    it('should have default theme props', () => {
      ThemeManager.setComponentTheme('View', {
        'bg-dark80': true,
        flex: true,
      });
      const tree = renderer.create(<View />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('layout modifiers', () => {
    it('should render view with flex modifier', () => {
      const tree = renderer.create(<View flex />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with row modifier', () => {
      const tree = renderer.create(<View row />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with left+bottom modifier', () => {
      const tree = renderer.create(<View left bottom />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with right+top modifier', () => {
      const tree = renderer.create(<View right top />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('style modifiers', () => {
    it('should render view with red50 background color modifier', () => {
      const tree = renderer.create(<View bg-red50 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with black background color modifier', () => {
      const tree = renderer.create(<View bg-black />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with border radius modifier', () => {
      const tree = renderer.create(<View br20 />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('spacings modifiers', () => {
    // Paddings
    it('should render view with right and left padding', () => {
      const tree = renderer.create(<View paddingR-20 paddingL-10 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with top and bottom padding', () => {
      const tree = renderer.create(<View paddingR-20 paddingL-10 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with horizontal padding', () => {
      const tree = renderer.create(<View paddingH-20 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with vertical padding', () => {
      const tree = renderer.create(<View paddingV-20 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    // Margins
    it('should render view with right and left margin', () => {
      const tree = renderer.create(<View marginR-20 marginL-10 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with top and bottom margin', () => {
      const tree = renderer.create(<View marginR-20 marginL-10 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with horizontal margin', () => {
      const tree = renderer.create(<View marginH-20 />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render view with vertical margin', () => {
      const tree = renderer.create(<View marginV-20 />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
