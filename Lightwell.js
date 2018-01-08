'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Util from './utilities';

// Little well of red, green, or blue

export default class Lightwell extends Component{

	renderContent() {
		if (this.props.mode==2) return(<Text style = {[styles.cochin, {color: "#ffffff"}]}>{LETTERS[this.props.hue]}</Text>);
		else return null;
	}

	renderDevModeAntics(){
		if(this.props.mode ==1){
			let component2RGB = [0,0,0];
			component2RGB[this.props.hue] = 255-this.props.remaining;
			const component2 = Util.rgb2Fun(component2RGB);
			return(
				<LinearGradient 
					colors={[component2, COLORS[this.props.hue]]} 
					style = {styles.lightwell}>
					<Text style = {[styles.dev]}>
						{this.props.remaining}
					</Text>
				</LinearGradient>);
		}
		else return (this.renderContent())
}

	renderNonemptyWell(){
		return(
			<TouchableOpacity 
				style = {[styles.lightwell, {backgroundColor: COLORS[this.props.hue]}]} 
				onPress = {this.props.addLight}>
				{this.renderDevModeAntics()}
			</TouchableOpacity>
			);
	}

	renderEmptyWell(){
		return (
			<View style = {[styles.lightwell, {backgroundColor: LOW_ALPHA[this.props.hue]}]} >
				{this.renderContent()}
			</View>
			);
	}

	render() {
		if(this.props.remaining < 1) return(this.renderEmptyWell());
		else return (this.renderNonemptyWell());
	}
}

const styles = StyleSheet.create({
	lightwell: {
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

const LETTERS = ["L","E","D"];
const SATURATED_LETTERS = ["L","U","X"];
const COLORS = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"];
const LOW_ALPHA = ["rgba(255,0,0,0.1)", "rgba(0,255,0,0.1)", "rgba(0,0,255,0.1)"];
const SATURATED_COLORS = ["rgb(255,242,242)", "rgb(242,255,242)", "rgb(242,242,255)"];
