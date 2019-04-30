import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent, asBaseComponent, forwardRef} from '../../commons';

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendslink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 */
class Text extends Component {
  static displayName = 'Text';
  static propTypes = {
    ...RNText.propTypes,
    ...BaseComponent.propTypes,
    /**
     * color of the text
     */
    color: PropTypes.string,
    /**
     * whether to center the text (using textAlign)
     */
    center: PropTypes.bool,
    /**
     * whether to change the text to uppercase
     */
    uppercase: PropTypes.bool,
  };

  // static defaultProps = {
  //   color: Colors.dark10,
  // }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const {style, center, uppercase, modifiers, forwardedRef, ...others} = this.props;
    const color = this.props.color || modifiers.color;
    const {margins, typography} = modifiers;

    const textStyle = [
      styles.container,
      !_.isEmpty(typography) && typography,
      color && {color},
      !_.isEmpty(margins) && margins,
      center && {textAlign: 'center'},
      style,
    ].filter(Boolean); // cleans undefined or falsy values

    const children = uppercase ? this.transformToUppercase(this.props.children) : this.props.children;

    return (
      <RNText {...others} style={textStyle} ref={forwardedRef}>
        {children}
      </RNText>
    );
  }

  transformToUppercase(items) {
    if (typeof items === 'string') {
      return items.toUpperCase();
    }
    return items;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});

export default asBaseComponent(forwardRef(Text));
