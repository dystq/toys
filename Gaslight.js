'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,Slider} from 'react-native';
import * as Util from './utilities'

// What is normally called a settings panel 
// is called a gaslight here
//
// It converts wedge-size into color depth
// and renders a slider for the user to
// change the color depth and accordingly
// the wedge size.
//
// It needs some things to do its job:
// minWedgeSize, rangeWedgeSize, wedgeSize
// showValue, showTesters
// wedgeChanged()

export default class Gaslight extends Component{

  invert(value){
    return 2*this.props.minWedgeSize+this.props.rangeWedgeSizes - value;
  }

  constructor(props){
    super(props);
    this.state = {
      depth: this.invert(this.props.wedgeSize)
    }
  }

  renderTesters(){
    const tintUpColor = new Array(3).fill(baseGreyValue);
    const tintDownColor = new Array(3).fill(baseGreyValue);
    const tintAmount = Math.floor(this.invert(this.state.depth)/2);
    tintUpColor[Util.indexOfChannel[humansWeakestChannel]] += tintAmount;
    tintDownColor[Util.indexOfChannel[humansWeakestChannel]] -= tintAmount;
    return(
      <View>
        <View style = {[styles.tester,{backgroundColor: Util.convertFrom.channelsTo.RGB(tintUpColor)}]}>
          <Text style = {[styles.text]}>{testerText[0]}</Text>
        </View>
        <View style = {[styles.tester,{backgroundColor: Util.convertFrom.channelsTo.RGB(tintDownColor)}]}>
          <Text style = {[styles.text]}>{testerText[1]}</Text>
        </View>
      </View>
    );
  }

  renderValue(){
    return(<Text style = {styles.text}>{this.invert(this.state.depth)}</Text>)
  }

  render() {
    const {minWedgeSize, rangeWedgeSizes, showValue, showTesters} = this.props;
    const {depth} = this.state;
    return (
      <View style = {styles.container}>
        {showTesters && this.renderTesters()}
        {showValue && this.renderValue()}
        <Slider style = {styles.slider}
          minimumValue = {minWedgeSize} 
          maximumValue = {minWedgeSize+rangeWedgeSizes}
          value = {this.state.depth}
          step = {1}
          onValueChange = {(x) => this.setState({depth: x})}
          onSlidingComplete = {this.props.wedgeChanged}
          minimumTrackTintColor = {trackColor.left}
          maximumTrackTintColor = {trackColor.right}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Menlo',
    fontSize: 12, 
  },
  slider: {
    width: 200,
  },
  tester: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, height: 20,
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const baseGreyValue = 180;
const humansWeakestChannel = "red";
const testerText = [
  "keep us distinguishable", 
  "but only just barely so"];
const trackColor = {
  left: "rgb(0,0,0)",
  right: "rgb(180,180,180)"
};
