import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import {Colors} from '../../style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import Image from '../../components/image';
import Swipeable from './Swipeable';

const ITEM_PROP_TYPES = {
  width: PropTypes.number,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.number,
  onPress: PropTypes.func,
};

class Drawer extends BaseComponent {
  static displayName = 'Drawer';

  static propTypes = {
    /**
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tention
     */
    tension: PropTypes.number,
    /**
     * Press handler
     */
    onPress: PropTypes.func,
    /**
     * OnDragStart handler
     */
    onDragStart: PropTypes.func,
    /**
     * The bottom layer's items to appear when opened from the right
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape(ITEM_PROP_TYPES)),
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem: PropTypes.shape(ITEM_PROP_TYPES),
    /**
     * Whether to give the items equal width (the max width)
     */
    equalWidths: PropTypes.bool,
    /**
     * The color for the text and icon tint of the items
     */
    itemsTintColor: PropTypes.string,
    /**
     * The items' icon size
     */
    itemsIconSize: PropTypes.number,
    /**
     * The items' text style
     */
    itemsTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  };

  state = {};

  renderItem = ({item, index, itemsCount, progressAnimatedValue, dragAnimatedValue}) => {
    // const textOpacity = progressAnimatedValue.interpolate({
    //   inputRange: [(1 / itemsCount) * index, (1 / itemsCount) * (index + 1)],
    //   outputRange: [0, 1],
    // });

    // const textOpacity = dragAnimatedValue.interpolate({
    //   inputRange: [0, item.width],
    //   outputRange: [0, 1],
    // });
    const textOpacity = 1;
    return (
      <TouchableOpacity
        key={index}
        center
        style={{backgroundColor: item.background, width: item.width}}
        onPress={item.onPress}
      >
        {item.icon && <Image style={[styles.itemIcon]} source={item.icon} />}
        {item.text && <Animated.Text style={[styles.itemText, {opacity: textOpacity}]}>{item.text}</Animated.Text>}
      </TouchableOpacity>
    );
  };

  renderRightItems = (progressAnimatedValue, dragAnimatedValue) => {
    const {rightItems} = this.getThemeProps();
    return _.map(rightItems, (item, index) =>
      this.renderItem({item, index, progressAnimatedValue, dragAnimatedValue, itemsCount: rightItems.length}),
    );
  };

  renderLeftItems = (progressAnimatedValue, dragAnimatedValue) => {
    const {leftItem} = this.getThemeProps();
    if (leftItem) {
      return this.renderItem({item: leftItem, index: 0, progressAnimatedValue, dragAnimatedValue, itemsCount: 1});
    }
  };

  render() {
    return (
      <Swipeable renderRightActions={this.renderRightItems} renderLeftActions={this.renderLeftItems}>
        {this.props.children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  itemText: {
    color: Colors.white,
  },
  itemIcon: {
    tintColor: Colors.white,
  },
});

export default Drawer;
