import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, View, Text, Button} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

let counter = 1;
let sum = 0;

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View flex bg-dark80 bg-red50 padding-20 style={styles.container}>
        {/* <Text red20 marginL-120 uppercase>asdasd</Text> */}

        {this.state.show && <Tester />}

        <TouchableOpacity
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={() => this.setState({show: !this.state.show})}
        >
          <Text>PRESS ME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

class Tester extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.time = Date.now();
  }

  componentDidMount() {
    counter++;
    sum += Date.now() - this.time;
    console.warn('time:', sum / counter);
  }

  render() {
    return _.times(500, index => {
      return (
        // <View key={index}>
        <Text>text</Text>
        // </View>
      );
    });
  }
}
