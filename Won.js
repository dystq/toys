'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';

export default class Won extends Component{
  //TODO: tie winstyles to buttons
  render() {
    return(
      <TouchableOpacity onPress = {this.props.exitWin} style={styles.container}>
      <Text>GOAL REACHED
      {"\n"}  Steps: {this.props.numSteps}
      {"\n"}Optimal: {this.props.numOptimal}
			{"\n"}  Stuff: {this.props.stuff}
      </Text>

      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
