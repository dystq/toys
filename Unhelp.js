'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View} from 'react-native';
import Inkpot from './Inkpot'
import Lightwell from './Lightwell'
import Chatterbox from './Chatterbox'
import Gaslight from './Gaslight'
import * as Util from './utilities'

// "Tutorial" and other funhelpful things (: (:

export default class Unhelp extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isMud: false,
      isLit: false,
      chatIndex: 0,
      color: [180,180,180],
      blackCode: "", 
      whiteCode: "",
      subMode: 0,

    }
  }

  reminisceABit(){
    const newSubMode = (this.state.subMode+1)%DEV_TEXT.length;
    this.setState({subMode: newSubMode});
  }

  setDystq(index){
    if(this.props.mode == 1){
      const attempt = (this.state.whiteCode).concat(index.toString());
      if (attempt != DELIA_CODE.slice(0,attempt.length)) 
        this.setState({whiteCode: ""});
      else{
        if (attempt == DELIA_CODE) {
          this.setState({whiteCode: ""});
          this.reminisceABit();
        }
        else 
          this.setState({whiteCode: attempt});
      }
    }
  }

  setDev(index,isBlack){
    if(isBlack) this.setState({blackCode: "DEV"});
    else {
      const attempt = (this.state.blackCode).concat(index.toString());
      if (attempt != DEV_CODE.slice(0,attempt.length)) 
        this.setState({blackCode: ""});
      else{
        if (attempt == DEV_CODE) {
          this.setState({blackCode: ""});
          this.props.enableDevMode();
        }
        else 
          this.setState({blackCode: attempt});
      }
    }
  }

  addInk(hue) {
    const newColor = Util.addInk(hue, (this.state.color).slice(), this.props.stepSize);
    const isBlack = Util.isBlack(newColor);
    this.setState({
      isLit: false, //cannot be white after adding ink
      isMud: isBlack,
      color: newColor,
    });
    this.setDev(hue+3, isBlack);
    this.setDystq(hue+3);
  }

  addLight(hue) {
    const newColor = Util.addLight(hue, this.state.color.slice(), this.props.stepSize);
    const isWhite = Util.isWhite(newColor);
    let newChatIndex = this.state.chatIndex;
    let dystq = "";
    if(isWhite) {
      newChatIndex = (newChatIndex+1)%CHATTY_TEXT.length
      dystq = "o";
      if(this.props.isNoob) 
        this.props.unNoobify();
    }
    this.setState({
      isMud: false, //cannot be black
      isLit: isWhite,
      color: newColor,
      chatIndex: newChatIndex,
      whiteCode: dystq,
    });
    this.setDev(hue, false);
  }

  renderInkpot(n){
    return (
      <Inkpot 
        hue={n} 
        remaining={this.state.color[n]} 
        step={this.props.stepSize} 
        addInk={() => this.addInk(n)} 
        mode={this.props.mode}
      />);
  }

  renderLightwell(n){
    return (
      <Lightwell 
        hue={n} 
        remaining={255-this.state.color[n]} 
        step={this.props.stepSize} 
        addLight={() => this.addLight(n)} 
        mode={this.props.mode}
      />);
  }

  getChattyText(){
    if(this.state.isLit) return CHATTY_TEXT[this.state.chatIndex];
    else if(this.state.isMud) return QUIET_TEXT[1];
    else return QUIET_TEXT[0];
  }

  renderChatterbox(){
    return (
      <Chatterbox 
        color={Util.rgb2Fun(this.state.color)} 
        chattyText={this.getChattyText()}
        isMud={this.state.isMud}
        isLit={this.state.isLit}
        mode={this.props.mode}
        devText={DEV_TEXT[this.state.subMode]}
        disableDevMode={this.props.disableDevMode}
      />);
  }

    renderGaslight(){
    return(<View style={[styles.gaslight]}><Gaslight 
      wedgeSize = {this.props.footWedgeSize}
      minWedgeSize = {3}
      rangeWedgeSizes = {29}
      showValue = {false}
      showTesters = {true}
      wedgeChanged = {()=>{return null}} />
      </View>
      );
  }


  render() {
    return(
      <View style={styles.container}>
        <View style={styles.palette}>
          {this.renderInkpot(0)}
          {this.renderInkpot(1)}
          {this.renderInkpot(2)}
        </View>
        {this.renderChatterbox()}
        <View style={styles.palette}>
          {this.renderLightwell(0)}
          {this.renderLightwell(1)}
          {this.renderLightwell(2)}
        </View>
        {this.renderGaslight()}
      </View>
      );
  }
}

const styles = StyleSheet.create({
    gaslight: {
    position: 'absolute',
    bottom: 50,
  },
  palette: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  slider: {
    width: 200,
  },
});

const QUIET_TEXT = [
"the goal is to\nremove the box",
">:)"]
const CHATTY_TEXT = [
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
const DEV_CODE = "DEV211043"; //BiGGeR MaC >:) >:) >:)
const DELIA_CODE = "o54455445"; // :(
const DEV_TEXT = [" ---------------- \n \\  WELCOME TO  /\n /  DEVEL MODE  \\\n ---------------- \n tap to return to \n   regular mode   ",
"it is january 2018\nand this is a very\nlame easter egg -D",
" I have eaten a great \n number of chocolates \nwhile making this game\n      (: (: (: -D ",
"(no more entries)"
];
