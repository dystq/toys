'use strict'

import React, { Component } from 'react';
import {StyleSheet,Text,View,PixelRatio,Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Game from './Game'
import Unhelp from './Unhelp'
import Won from './Won'
import * as Util from './utilities'

export default class App extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isNoob: false, //has not completed tutorial
      seeWin: false, 
      stepSize: (FOOT_WEDGE_DEFAULT-3)*2, 
      footWedgeSize: FOOT_WEDGE_DEFAULT, 
      mode: 1,
      numSteps: 0,
      numOptimal: 0,
      stuff: [],
    };
  }

  adjustWedge(n){ 
    const wedge = Util.slider2Wedge(n);
    const step = Util.wedge2Step(wedge);
    this.setState({
      stepSize: step,
      footWedgeSize: wedge,
    });
  }

  unNoobify(){
    this.setState({isNoob:false});
  }

  handleWin(stuff){
    this.setState({
      seeWin: true,
      numSteps: stuff.length-4,
      numOptimal: stuff[0]+stuff[1]+stuff[2],
      stuff: stuff,
    });
  }

  enableDevMode(){
    this.setState({mode:1});
  }

  disableDevMode(){
    this.setState({mode:0});
  }

  exitWin(){
    this.setState({seeWin: false})
  }

  renderMain(seeWin){
    if(seeWin) 
      return(<Won 
        exitWin = {()=>this.exitWin()}
        numSteps = {this.state.numSteps}
        numOptimal = {this.state.numOptimal}
        stuff = {this.state.stuff}
        />);
    else
      return(<Game 
        stepSize = {this.state.stepSize} 
        footWedgeSize = {this.state.footWedgeSize} 
        adjustWedge={(n)=>this.adjustWedge(n)}
        handleWin = {(stuff) => this.handleWin(stuff)}
        mode = {this.state.mode}
        wedgeConst = {MIN_RESOLVE+MAX_RESOLVE}
        />);
  }

  renderHelp(){
    return(<Unhelp 
      stepSize={this.state.stepSize} 
      footWedgeSize={this.state.footWedgeSize}
      isNoob = {this.state.isNoob}
      unNoobify={()=>this.unNoobify()}     
      mode = {this.state.mode} 
      enableDevMode = {()=>this.enableDevMode()}
      disableDevMode = {()=>this.disableDevMode()}
      />);
  }

  renderSide(win){
    return(this.renderHelp());
  }

  renderCake(){
    if(!this.state.eggIsHidden) return(<Egg/>);
  }

  render() {
    const {seeWin} = this.state;
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
      {this.renderMain(seeWin)}
      {this.renderSide(seeWin)}
      </Swiper>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PIXEL_RATIO = PixelRatio.get();
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ALPHA = 0.85; //for winscreen
const MIN_STEPS_TO_WIN = 4;
const FOOT_WEDGE_DEFAULT = 10; //Should be 10
const MODES = ["basic", "developer"] 
const MIN_RESOLVE = 3; //Probably shouldn't change these
const MAX_RESOLVE = 32; //without updating Gaslight :()