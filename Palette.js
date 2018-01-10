'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,} from 'react-native';
import * as Util from './utilities'
import Inkled from './Inkled'
import Swatch from './Swatch'

// Palette manages the rendering of inkleds and
// the swatch
//
// It needs:
// swatchColor [R,G,B]
// mode {regular, developer}

export default class Palette extends Component{

  renderInkled(color){
    const {swatchColor} = this.props;
    const channel = Util.channelIndexOfColor(color);
    const system = Util.systemOfColor(color);
    const magnitude = mapToAdditiveFromSystem[system](swatchColor[channel]);
    return (
      <Inkled 
      channel={channel} 
      system={system}
      magnitude={magnitude} 
      text="power"
      mode="power"
      onPress={() => this.addInk(n)} 
      />);
  }

  renderLightwell(n,c){
    return (
      <Inkled 
      channel={c} 
      magnitude={255-this.state.currentRgb[n]} 
      system={"additive"}
      text="power"
      mode="power"
      onPress={() => this.addLight(n)} 
      />);


  renderInkpot(n,c){
    return (
      <Inkled 
      channel={c} 
      magnitude={this.state.currentRgb[n]} 
      system={"subtractive"}
      text="power"
      mode="power"
      onPress={() => this.addInk(n)} 
      />);
  }



  updateColorState(rgb){
    const newRgb = rgb.slice();
    const newCol = Util.rgb2Fun(newRgb);
    const newPath = this.state.path.slice();
    newPath.push(newCol);
    if(this.isGameWon(newCol,this.props.footWedgeSize)) {
    	const optimal = this.state.optimal.slice();
    	const stuff = optimal.concat(newPath);
    	this.props.handleWin(stuff);
    }
    this.setState({
      currentColor: newCol,
      currentRgb: newRgb,
      path: newPath,
    });
  }

  addInk(hue) {
    this.updateColorState(Util.addInk(hue, (this.state.currentRgb).slice(), this.props.stepSize));
  }

  addLight(hue) {
    this.updateColorState(Util.addLight(hue, (this.state.currentRgb).slice(), this.props.stepSize));
  }

  renderDevStuff(){
    if(this.props.mode==1) return(
      <View style={[styles.container, {position:"absolute", top:50}]}>
        <Text style={[styles.dev,{fontSize: 12, marginBottom:5}]}> Target: {this.state.targetColor}
          {"\n"}Current: {this.state.currentColor}
          {"\n"}   Step: {this.props.stepSize}
          {"\n"}   Goal: +/- {this.props.footWedgeSize}
          {"\n"}   Path: {this.state.path.length-1}
          {"\n"}Optimal: {this.state.optimal[0]}, {this.state.optimal[1]}, {this.state.optimal[2]}
        </Text>
      </View>
      );
  }

  renderGaslight(){
    if(this.props.mode==1) return(<View style={[styles.gaslight]}><Gaslight 
      initial = {this.props.footWedgeSize} 
      footWedgeSize = {this.props.footWedgeSize}
      adjustWedge = {(n) => this.props.adjustWedge(n)} /></View>
      );
  }

  renderInkpot(n){
    return (
      <Inkpot 
      hue={n} 
      remaining={this.state.currentRgb[n]} 
      step={this.props.stepSize} 
      addInk={() => this.addInk(n)} 
      mode={this.props.mode}
      />);
  }

  renderLightwell(n){
    return (
      <Lightwell 
      hue={n} 
      remaining={255-this.state.currentRgb[n]} 
      step={this.props.stepSize} 
      addLight={() => this.addLight(n)} 
      mode={this.props.mode}
      />);
  }

  renderGame(){
    return(
      <View style={[styles.container]}>
        <View style={styles.palette}>
          {this.renderInkpot(0)}
          {this.renderInkpot(1)}
          {this.renderInkpot(2)}
        </View>
        <Swatch 
          color={this.state.currentColor} 
          resetGame={()=>this.resetGame()} 
          mode={this.props.mode}/>
        <View style={styles.palette}>
          {this.renderLightwell(0)}
          {this.renderLightwell(1)}
          {this.renderLightwell(2)}
        </View>
      </View>
      );
  }

  render() {
    return(
      <View style={[styles.container,{backgroundColor:this.state.targetColor}]}>
        {this.renderDevStuff()}
        {this.renderGame()}
        {this.renderGaslight()}
      </View>
      );
  }
}

const styles = StyleSheet.create({
  gaslight: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dev: {
    fontSize: 18,
    fontFamily:'Menlo',
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft:5, paddingRight:5,
  },
  palette: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    width: 200,
  },
});

const modeConfig = {
  developer: {
    mode: "power",
    text: "power"
  }
  regular: {
    mode: "power",
    text: "blank"
  }
}
