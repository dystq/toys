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
			initialColor: "#000",
			targetColor: "#fff",
			currentColor: "#000",
			currentRgb: [0,0,0],
			path: [],
		}
	}

	componentDidMount(){
		this.resetGame();
	}

	resetGame() {
		const twoColors = [Util.getRandomColor(true), Util.getRandomColor(false)];
		const coinToss = Math.floor(Math.random()*2);
		const newPath = [twoColors[coinToss]];
		this.setState({
			initialColor: twoColors[coinToss],
			targetColor: twoColors[1-coinToss],
			currentColor: twoColors[coinToss],
			currentRgb: Util.fun2Rgb(twoColors[coinToss]),
			path: newPath.slice(),
		});
	}

	isGameWon(col,wedge){
		const a = Util.fun2Rgb(this.state.targetColor);
		const b = Util.fun2Rgb(col);
		const maxDistance = a.map((x,i)=>Math.abs(b[i]-x)).reduce((m,n)=>Math.max(m,n));
		return maxDistance <= wedge;
	}

	adjustWedge(n){
		if(this.isGameWon(this.state.currentColor,this.props.wedgeConst - n)) this.props.handleWin();
		else this.props.adjustWedge(n);
	}

	updateColorState(rgb){
		const newRgb = rgb.slice();
		const newCol = Util.rgb2Fun(newRgb);
		if(this.isGameWon(newCol,this.props.footWedgeSize)) this.props.handleWin();
		const newPath = this.state.path.slice();
		newPath.push(newCol);
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
				<Text style={[styles.dev,{fontSize: 12, marginBottom:5}]}>
					Current: {this.state.currentColor}
					{"\n"} Target: {this.state.targetColor}
					{"\n"}   Step: {this.props.stepSize}
					{"\n"}   Goal: +/- {this.props.footWedgeSize}
					{"\n"}   Path: {this.state.path.length-1}
				</Text>
			</View>
			);
	}

  renderGaslight(){
  	if(this.props.mode==1) return(<View style={[styles.gaslight]}><Gaslight 
  		initial = {this.props.footWedgeSize} 
  		footWedgeSize = {this.props.footWedgeSize}
  		adjustWedge = {(n) => this.adjustWedge(n)} /></View>
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
