'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import * as Util from './utilities'

// A little pot of ink or a little LED light
// 
// Manages the rendering of a single square of color
// It's dumb and stateless
// 
// Attributes that affect its rendering:
// Channel: {red, green, blue}
// System: {additive, subtractive}
// Magnitude: [0, ... , 255]
// Mode: {solid, power, stock}
// Text: {blank, power, stock, title}
// onPress()
//
// Use stock or power text for dev. Probably stock.

export default class Inkled extends Component{

  getRGBA(){
    const {channel, system, magnitude, mode} = this.props;
    let color = new Array(3).fill(Util.identityInSystem[system]);
    color[Util.indexOfChannel[channel]] = mapToValue[mode](system,magnitude);
    const alpha = magnitude == 0 ? alphaOf[mode] : alphaOf.enabled;
    return Util.convertFrom.channelsTo.RGBA(color,alpha);
  }

  getText(){
    const {text, magnitude, system, channel} = this.props;
    if(text=="stock") return magnitude.toString();
    else if(text=="blank") return null;
    else if(text=="power") return (255-magnitude).toString();
    else if(text=="title") return titleForChannel[system][channel];
    else return null;
  }

  getStyle(){
    const {text} = this.props;
    if(text=="title"){
      const {system} = this.props;
      const identity = new Array(3).fill(255-Util.identityInSystem[system]);
      const color = Util.convertFrom.channelsTo.RGB(identity);
      return([styles.title, {color: color}]);
    }
    else if(text=="power" || text=="stock") return (styles.label);
    else return null;
  }

  renderInsides(){
    return(
      <Text style = {this.getStyle()}>
        {this.getText()}
      </Text>
      );
  }

  renderSquare(){
    const {magnitude, onPress} = this.props;
    const style = [styles.square, {backgroundColor: this.getRGBA()}];
    if (magnitude != 0)
      return(
        <TouchableOpacity 
          style = {style} 
          onPress = {onPress}>
            {this.renderInsides()}
        </TouchableOpacity>
        );
    else 
      return(
        <View style = {style}>
          {this.renderInsides()}
        </View>
        );
  }

  render(){
    return(this.renderSquare());
  }
}

const styles = StyleSheet.create({
  square: {
    width: 60, height: 60,
    padding: 0, margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily:'Menlo',
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft:5, paddingRight:5,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Cochin',
  }
});

const alphaOf = {
  solid: 0.1,
  power: 1,
  stock: 1,
  enabled: 1
}

const mapToValue = {
  solid: (system,magnitude)=>255-Util.identityInSystem[system],
  stock: (system,magnitude)=>Util.mapToAdditiveFromSystem[system](magnitude),
  power: (system,magnitude)=>255-Util.mapToAdditiveFromSystem[system](magnitude)
}

const titleForChannel = {
  additive: {
    red: "L",
    green: "E",
    blue: "D"
  },
  subtractive: {
    red: "I",
    green: "N",
    blue: "K"
  }
}