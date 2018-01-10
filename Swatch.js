'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import * as Util from './utilities'

// A chatty little box that gets colored a lot 
// and says a great number of things
//
// No brain, no state, no grief
// 
// Attributes that affect its rendering:
// Channels: {[r,g,b] | 0<=r,g,b<=255}
// Context: {blank, win, tutorial, devel_game, devel_side, black, white, delia}
// onPress()
//
// OPtionally:
// WhiteIndex
// DeliaIndex
// results
// optimal


export default class Swatch extends Component{

  getText(){
    const {context, whiteIndex, deliaIndex} = this.props;
    if(context == "white") return textForWhiteIndex[whiteIndex];
    else if(context == "delia") return textForDeliaIndex[deliaIndex];
    else return staticTextForContext[context];
  }

  renderOptional(){
    const {context} = this.props;
    if (context=="tutorial") return(
      <Text style={[styles[labelStyleForContext["tutorial"]],styles.optionalLabel]}>
          {optionalTextForContext[context]}
      </Text>
      )
  }

  renderInsides(){
    const {context} = this.props;
    if(!staticTextForContext[context]) return null;
    else return(
      <Text style = {styles[labelStyleForContext[context]]}>
        {this.getText()}
      </Text>
    );
  }

  renderSquare(){
    const {context, channels, onPress} = this.props;
    const component = componentForContext[context];
    const style = [styles.square, {backgroundColor: Util.convertFrom.channelsTo.RGB(channels)}]
    if(component == "touchableOpacity")
      return(
        <TouchableOpacity 
          style = {style} 
          onPress = {onPress}>
            {this.renderOptional()}
            {this.renderInsides()}
        </TouchableOpacity>
        );
    else 
      return(
        <View style = {style}>
          {this.renderOptional()}
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
    width: 200,
    height: 200,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackSheerLabel: {
    color: "rgb(255,255,255)",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: 12,
    fontFamily:'Menlo',
    paddingLeft:5, paddingRight:5,
  },
  pressLabel: {
    color: "rgb(0,0,0)",
    fontSize: 14,
    fontFamily:'Menlo'
  },
  chalkLabel: {
    color: "rgb(255,255,255)",
    fontSize: 14,
    fontFamily:'Menlo'
  },
  optionalLabel: {
    position:"absolute",top:3,left:3
  }
});

const componentForContext = {
  blank: "view",
  win: "touchableOpacity",
  tutorial: "view",
  devel_game: "touchableOpacity",
  devel_side: "touchableOpacity",
  black: "view",
  white: "view",
  delia: "touchableOpacity"
}

const labelStyleForContext = {
  win: "pressLabel",
  tutorial: "pressLabel",
  devel_game: "blackSheerLabel",
  devel_side: "blackSheerLabel",
  black: "chalkLabel",
  white: "pressLabel",
  delia: "blackSheerLabel"
}

const staticTextForContext = {
  blank: null,
  tutorial: "the goal is to\nremove the box",
  devel_game: "tHiS iS dEv MoDe!!\ntap for new colors\nreturn to _______\\\ngame mode        /",
  devel_side: " ---------------- \n \\  WELCOME TO  /\n /  DEVEL MODE  \\\n ---------------- \n tap to return to \n   regular mode   ",
  black: ">:)"
}

const optionalTextForContext = {
  tutorial: "tutorial"
}

const textForWhiteIndex = [
  "%",
  "great job", 
  "nice work", 
  ":)", 
  "you've got it",
  "A+", 
  "10/10", 
  "(O:",
  "most superb", 
  "   truly   \nexceptional", 
  "best I've seen\n in my career ",
  "speechless", 
  "   WARNING:   \nI have run out\nof new phrases",
];

const textForDeliaIndex = [
  "it is january 2018\nand this is a very\nlame easter egg -D",
  " I have eaten a great \n number of chocolates \nwhile making this game\n      (: (: (: -D ",
  "(no more entries)"
];
