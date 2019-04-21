import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {PanGestureHandler, TapGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import View from '../../components/view';

class Swipeable extends Component {
  static propTypes = {
    renderLeftActions: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const dragX = new Animated.Value(0);
    const offsetX = new Animated.Value(0);

    // const gestureState = new Animated.Value(0);

    this.transX = new Animated.Value(0);
    this.leftWidth = new Animated.Value(0);

    const leftThreshold = 70;
    // const leftWidth = new Animated.Value(100);

    this.state = {
      leftWidth: new Animated.Value(100),
    };

    this._onGestureEvent = Animated.event([
      {
        nativeEvent: ({translationX: x, state}) => {
          return Animated.block([
            Animated.debug('left width', this.state.leftWidth),
            Animated.set(dragX, Animated.add(x, offsetX)),
            Animated.set(this.transX, dragX),
            Animated.cond(Animated.eq(state, State.END), [
              Animated.cond(
                Animated.greaterOrEq(dragX, leftThreshold),
                Animated.set(this.transX, this.state.leftWidth),
                Animated.set(this.transX, 0),
              ),
              Animated.set(offsetX, this.transX),
            ]),
          ]);
        },
      },
    ]);

    // this.onLeftLayout = Animated.event([
    //   {
    //     nativeEvent: ({layout: {width}}) => {
    //       return Animated.block([Animated.set(leftWidth, 50)]);
    //     },
    //   },
    // ]);

    this.onLeftLayout = ({
      nativeEvent: {
        layout: {width},
      },
    }) => {
      console.warn('ethan -  go here');
      if (!this.state.leftWidth) {
        // Animated.set(this.state.leftWidth, 50);
        // Animated.set(leftWidth, 50);
        // this.setState({leftWidth: width});
        this.setState({leftWidth: new Animated.Value(50)});
      }
    };
  }

  // onLeftLayout = ({
  //   nativeEvent: {
  //     layout: {width},
  //   },
  // }) => {
  //   if (!this.state.leftWidth) {
  //     Animated.set(this.leftWidth, 50);
  //     this.setState({leftWidth: width});
  //   }
  // };

  // getGestureEvent = () => {
  //   const {leftWidth} = this.state;
  //   if (leftWidth) {
  //     console.warn('ethan - leftWidth',leftWidth);
  //     const dragX = new Animated.Value(0);
  //     const offsetX = new Animated.Value(0);
  //     const leftThreshold = 70;

  //     return Animated.event([
  //       {
  //         nativeEvent: ({translationX: x, state}) => {
  //           return Animated.block([
  //             Animated.set(dragX, Animated.add(x, offsetX)),
  //             Animated.set(this.transX, dragX),
  //             Animated.cond(Animated.eq(state, State.END), [
  //               Animated.cond(
  //                 Animated.greaterOrEq(dragX, leftThreshold),
  //                 Animated.set(this.transX, leftWidth),
  //                 Animated.set(this.transX, 0),
  //               ),
  //               Animated.set(offsetX, this.transX),
  //             ]),
  //           ]);
  //         },
  //       },
  //     ]);
  //   }
  // };

  renderLeftActions() {
    const {renderLeftActions} = this.props;

    if (renderLeftActions) {
      return (
        <View
          onLayout={this.onLeftLayout}
          // onLayout={Animated.event([
          //   {
          //     nativeEvent: {
          //       layout: {
          //         width: this.leftWidth,
          //       },
          //     },
          //   },
          // ])}
          style={[StyleSheet.absoluteFillObject, {right: undefined, borderWidth: 2}]}
        >
          {renderLeftActions()}
        </View>
      );
    }
  }

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onGestureEvent}
      >
        <Animated.View style={{flex: 1}}>
          {this.renderLeftActions()}
          <Animated.View style={{transform: [{translateX: this.transX}]}}>{this.props.children}</Animated.View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default Swipeable;
