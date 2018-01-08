'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,Slider} from 'react-native';
import * as Util from './utilities'
import Swab from './Swab'

// What is normally called a settings panel is called a gaslight here

export default class Gaslight extends Component{

	constructor(props){
		super(props);
		this.state={
			slider: this.props.initial,
		}
	}

	adjusting(x){
		this.setState({
			slider: x,
		})
	}

	renderSwab(x){
		return(<Swab 
			greyBase = {BASE_GREY}
			tindex = {x}
			amount = {MIN_RESOLVE+MAX_RESOLVE-this.state.slider}
			/>);
	}


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.dev}>
					{MIN_RESOLVE+MAX_RESOLVE-this.state.slider} levels
				</Text>
				<Slider style = {styles.slider}
					minimumValue = {MIN_RESOLVE} 
					maximumValue = {MAX_RESOLVE}
					minimumTrackTintColor = "#000"
					thumbTintColor = "#F00"
					value = {this.state.slider}
					step = {1}
					onValueChange = {(x) => this.adjusting(x)}
					onSlidingComplete = {this.props.adjustWedge}
				/>
				<View style={styles.testerRow}>			
					{this.renderSwab(4)}
					{this.renderSwab(5)}
					{this.renderSwab(3)}
				</View>
				<View style={styles.testerRow}>			
					{this.renderSwab(0)}
					{this.renderSwab(1)}
					{this.renderSwab(2)}
				</View>
			</View>
			);}
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Menlo',
		fontSize: 14,	
	},
		dev: {
		fontSize: 12,
		fontFamily:'Menlo',
		color: "#fff",
		backgroundColor: "#000",
		paddingLeft:5, paddingRight:5,
	},
	slider: {
		width: 200,
	},
	container:{
		alignItems: 'center',
		justifyContent: 'center',
	},
	testerRow:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

const BASE_GREY = 180;
const MIN_RESOLVE = 3;  
const MAX_RESOLVE = 32;

