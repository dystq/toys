'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import * as Util from './utilities'
import Gaslight from './Gaslight'
import Inkpot from './Inkpot'
import Lightwell from './Lightwell'
import Swatch from './Swatch'

export default class Game extends Component{

  constructor(props){
    super(props);
    this.state = {
      initialColor: "rgb(0,0,0)",
      targetColor: "rgb(255,255,255)",
      currentColor: "rgb(0,0,0)",
      currentRgb: [0,0,0],
      path: [],
      optimal: [0,0,0],
    }
  }

  componentDidMount(){
    this.resetGame();
  }

  componentWillReceiveProps(newProps){
  	const oldWedge = this.props.footWedgeSize;
  	const newWedge = newProps.footWedgeSize;
  	if (oldWedge!=newWedge){
  		const newOptimal = this.getNewOptimal(this.state.currentColor,oldWedge,newWedge);
  		this.setState({optimal: newOptimal});
  		if(this.isGameWon(this.state.currentColor,newWedge)) {
  			const path = this.state.path.slice()
  			const stuff = newOptimal.concat(path);
    		this.props.handleWin(stuff);
    	}
  	}

  	}


	getNewOptimal(currCol,oldWedge,newWedge){
  	const oldStep = Util.wedge2Step(oldWedge);
  	const newStep = Util.wedge2Step(newWedge);
  	const oldOptimal = this.state.optimal.slice();
  	const oldHereToGoal = Util.getDistance(this.state.targetColor,currCol,oldStep,oldWedge);
  	const optimalFirstHalf = oldOptimal.map((x,i)=>x-oldHereToGoal[i]);
  	const newHereToGoal = Util.getDistance(this.state.targetColor,currCol,newStep,newWedge);
  	const newOptimal = optimalFirstHalf.map((x,i)=>x+newHereToGoal[i]);
  	return newOptimal;
  }

  resetGame() {
    const twoColors = [Util.getRandomColor(true), Util.getRandomColor(false)];
    const coinToss = Math.floor(Math.random()*2);
    const newPath = [twoColors[coinToss]];
    const newOptimal = Util.getDistance(twoColors[coinToss],twoColors[1-coinToss],this.props.stepSize,this.props.footWedgeSize);
    this.setState({
      initialColor: twoColors[coinToss],
      targetColor: twoColors[1-coinToss],
      currentColor: twoColors[coinToss],
      currentRgb: Util.fun2Rgb(twoColors[coinToss]),
      path: newPath.slice(),
      optimal: newOptimal,
    });
  }

  isGameWon(col,wedge){
    // const a = Util.fun2Rgb(this.state.targetColor);
    // const b = Util.fun2Rgb(col);
    // const maxDistance = a.map((x,i)=>Math.abs(b[i]-x)).reduce((m,n)=>Math.max(m,n));
    // return maxDistance <= wedge;
    const a = Util.getDistance(this.state.targetColor,col,Util.wedge2Step(wedge),wedge);
    return (a.reduce((m,n)=>m+n) == 0);
  }

  // adjustWedge(n){
  // 	const newWedgeSize = this.props.wedgeConst - n;
  //   const newStepSize = newWedgeSize*2-4;
  // 	const oldOptimal = this.state.optimal.slice()
  // 	const hereToGoal = Util.getDistance(this.state.targetColor, this.state.currentColor,this.props.stepSize,this.props.footWedgeSize);
  // 	let optimalFirstHalf = oldOptimal.map((x,i)=>x-hereToGoal[i]);
  // 	let newOptimalSecondHalf = Util.getDistance(this.state.targetColor, this.state.currentColor,newStepSize,newWedgeSize);
  // 	let newOptimal = optimalFirstHalf.map((x,i)=>x+newOptimalSecondHalf[i]);
  // 	this.setState({optimal: newOptimal});
  //   if(newOptimalSecondHalf.reduce((m,n)=>m+n) == 0) this.props.handleWin();
  //   else this.props.adjustWedge(n);
  // }

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

const GAME_OVER_AFTER = 500; // Fail game if exceeded
