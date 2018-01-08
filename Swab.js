'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,Slider} from 'react-native';
import * as Util from './utilities'

// A little swab of color to return cmyrgb tints

export default class Swab extends Component{

	render() {
		const {greyBase, tindex, amount} = this.props;
		const color = [greyBase,greyBase,greyBase];
		if(tindex>2) color[tindex-3] -= Math.floor(amount/2);
		else color[tindex] += amount;
		return (
				<View style={[styles.tester,{backgroundColor:Util.rgb2Fun(color)}]}/>
			);}
}

const styles = StyleSheet.create({
	tester:{
		width:50, height:10,
		margin:5,
	}
});

