import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../index';
import {ThemeManager} from '../../../style';

describe('Text', () => {
  beforeEach(() => {
    ThemeManager.setComponentTheme('Text', undefined);
  });

  it('should render clean text', () => {
    const tree = renderer.create(<Text>text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render uppercase text', () => {
    const tree = renderer.create(<Text uppercase>text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('style modifiers', () => {
    it('should render text with red50 as a color', () => {
      const tree = renderer.create(<Text red50>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render text with white color modifier', () => {
      const tree = renderer.create(<Text bg-white>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render text with text30 typography modifier', () => {
      const tree = renderer.create(<Text text30>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('spacings modifiers', () => {
    // Margins
    it('should render text with right and left margin', () => {
      const tree = renderer
        .create(
          <Text marginR-20 marginL-10>
            text
          </Text>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render text with top and bottom margin', () => {
      const tree = renderer
        .create(
          <Text marginR-20 marginL-10>
            text
          </Text>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render text with horizontal margin', () => {
      const tree = renderer.create(<Text marginH-20>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render text with vertical margin', () => {
      const tree = renderer.create(<Text marginV-20>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('should support theme props', () => {
    it('should have default theme props', () => {
      ThemeManager.setComponentTheme('Text', {
        color: 'red',
        text30: true,
      });
      const tree = renderer.create(<Text>text</Text>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
