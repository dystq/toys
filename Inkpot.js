'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Util from './utilities'

// Little pot of cyan, magenta, or yellow

export default class Inkpot extends Component{

	renderContent() {
		if(this.props.mode==2) return(
			<Text style = {[styles.cochin, {color: "#000000"}]}>
				{LETTERS[this.props.hue]}
			</Text>);
		else return null;		
	}

	renderDevModeAntics(){
		if(this.props.mode == 1){
			let component1RGB = [255,255,255];
			let component2RGB = [255,255,255];
			component1RGB[this.props.hue] = Math.floor(this.props.remaining/2);
			component2RGB[this.props.hue] = this.props.remaining;
			const component1 = Util.rgb2Fun(component1RGB);
			const component2 = Util.rgb2Fun(component2RGB);
			return(
				<LinearGradient colors={[COLORS[this.props.hue], component1,component2]} style = {styles.inkpot}>
					<Text style = {[styles.dev]}>
						{this.props.remaining}
					</Text>
				</LinearGradient>
				);}
			else return (this.renderContent())
		}

	renderNonemptyPot(){
		return(
			<TouchableOpacity 
			style = {[styles.inkpot, {backgroundColor: COLORS[this.props.hue]}]} 
			onPress = {this.props.addInk}>
				{this.renderDevModeAntics()}
			</TouchableOpacity>
			);
	}

	renderEmptyPot(){
		return (
			<View style = {[styles.inkpot, {backgroundColor: LOW_ALPHA[this.props.hue]}]} >
				{this.renderContent()}
			</View>
			);
	}

	render() {
		if(this.props.remaining < 1) return(this.renderEmptyPot());
		else return (this.renderNonemptyPot());
	}
}

const styles = StyleSheet.create({
	inkpot: {
		width: 60, height: 60,
		padding: 0, margin: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cochin: {
		fontSize: 40,
		fontFamily: 'Cochin',
	},
	dev: {
		fontSize: 18,
		fontFamily:'Menlo',
		color: "#fff",
		backgroundColor: "#000",
		paddingLeft:5, paddingRight:5,
	}
});

const LETTERS = ["I","N","K"];
const EMPTY_LETTERS = ["M","U","D"];
const TEXT_COLOR = "rgb(0,0,0)";
const COLORS = ["rgb(0,255,255)", "rgb(255,0,255)", "rgb(255,255,0)"];
const EMPTY_COLORS = ["rgb(242,255,255)", "rgb(255,242,255)", "rgb(255,255,252)"];
const LOW_ALPHA = ["rgba(0,255,255,0.1)", "rgba(255,0,255,0.1)", "rgba(255,255,0,0.1)"];
