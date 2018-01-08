'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';

// A box that gets colored a lot 

export default class Swatch extends Component{

  renderNormalMode(){
    return (
      <View style={[styles.box,{backgroundColor: this.props.color}]} >
      </View>
    );
  }

  renderDevMode(){
    return (
      <TouchableOpacity 
        onPress={this.props.resetGame}
        style={[styles.box,{backgroundColor: this.props.color}]} >
        <Text style={[styles.dev,{fontSize:12,marginBottom:15}]}>
          {DEV_TEXT}
        </Text>
        <Text style={styles.dev}>
          {this.props.color}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    if(this.props.mode==1) return(this.renderDevMode());
    else return(this.renderNormalMode());
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
  dev: {
    fontSize: 18,
    fontFamily:'Menlo',
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft:5, paddingRight:5,
  }
});


const DEV_TEXT = "tHiS iS dEv MoDe!!\ntap for new colors\nreturn to _______\\\ngame mode        /"

