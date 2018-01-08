'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';

// A box that gets colored lots 
//and spits out words of fierce optimism

export default class Chatterbox extends Component{

	renderDevMode(){
		return (
			<TouchableOpacity 
			style={[styles.box,{backgroundColor: this.props.color}]}
			onPress={this.props.disableDevMode} >
				<Text style = {[styles.dev,{marginBottom:15, fontSize:12}]}>
					{this.props.devText}
				</Text>
				<Text style = {styles.dev}>
					{this.props.color}
				</Text>
			</TouchableOpacity>);
	}

	renderTutorialString(){
		if(!this.props.isLit && !this.props.isMud) 
			return(
				<Text style={[styles.text,{position:"absolute",top:3,left:3}]}>
					tutorial
				</Text>);
	}

	renderChatString(){
		const thisColor = this.props.isMud? "#fff" : "#000";
		return (
			<Text style={[styles.text,{color: thisColor}]}>
				{this.props.chattyText}
			</Text>);
	}

	renderNormalMode(){
		return(
			<View style={[styles.box,{backgroundColor: this.props.color}]} >
				{this.renderTutorialString()}
				{this.renderChatString()}
			</View>);
	}

	render() {
		if(this.props.mode ==1) return(this.renderDevMode());
		else return (this.renderNormalMode());	
	}
}

const styles = StyleSheet.create({
	box: {
		width: 200,
		height: 200,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'Menlo',
		fontSize: 14,	
	},
	dev: {
		fontSize: 18,
		fontFamily:'Menlo',
		color: "#fff",
		backgroundColor: "#000",
		paddingLeft:5, paddingRight:5,
	}
});

