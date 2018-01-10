export const isBlack = (channels)=>channels.every(x=>x==0);
export const isWhite = (channels)=>channels.every(x=>x==255);
export const getManhattanDistance = (first,second,unit,grace)=>first.map((c,i)=>(Math.ceil((Math.abs(second[i]-c)-grace)/unit)));

export const coinToss = ()=>(Math.random()<0.5);
export function getRandomChannels(lighter) {return new Array(3).fill(128*lighter).map(x=>x+Math.floor(Math.random()*127));}

export const identityInSystem = {additive:0,subtractive:255}
export const mapToAdditiveFromSystem = {additive: (x)=>(x),subtractive: (x)=>(255-x)}
export const channelNameOfColor = {red:"red",green:"green",blue:"blue",cyan:"red",magenta:"green",yellow:"blue"};
export const indexOfChannel = {red:0,green:1,blue:2};
export const systemOfColor = {red:"additive",green:"additive",blue:"additive",cyan:"subtractive",magenta:"subtractive",yellow:"subtractive"}

export const convertFrom ={
  channelsTo:{
    RGB: (array)=>("rgb("+array.map(c=>c.toString()).reduce((c1,c2)=>c1.concat(",",c2))+")"),
    hex: (array)=>("#".concat(array.map(c=>"00".concat(c.toString(16)).substr(-2)).reduce((h1,h2)=>h1.concat(h2))).toUpperCase()),
    RGBA: (array,alpha)=>("rgba("+array.map(c=>c.toString()).reduce((c1,c2)=>c1.concat(",",c2))+","+alpha.toString()+")"),
    printChannels: (array)=>("["+array.map(c=>c.toString()).reduce((c1,c2)=>c1.concat(",",c2))+"]")
  },
  RGBTo: {
    channels: (rgb)=>(rgb.slice(4,-1).split(",").map(x=>parseInt(x))),
    printChannels: (rgb)=>("["+rgb.slice(4,-1)+"]")
  }
}





// LEGACY STUFF



export function rgb2Fun(rgb){ 
  return "rgb(" + rgb.map(x=>x.toString()).reduce((x,y)=>x.concat(",",y)) + ")";
}

export function fun2Rgb(col){ 
  return col.slice(4,-1).split(",").map(x=>parseInt(x));
}

export function getDistance(a,b,s,w){
  const color1 = fun2Rgb(a);
  const color2 = fun2Rgb(b);
  return color1.map((x,i)=>(Math.ceil((Math.abs(color2[i]-x)-w)/s)));
}

export function getRandomColor(dark){
  let a = dark? 0 : 128;
  return "rgb(" + [0,0,0].map(x=>a+Math.floor(Math.random()*127)).reduce((m,n)=>m.toString().concat(",",n.toString())) + ")";
}

// hue is idx, base is rgb, d is stepSize
export function addInk(hue, base, d) {
  let mixed = base.slice();
  mixed[hue] = Math.max(0, mixed[hue]-d);
  return mixed;
}

export function addLight(hue, base, d) {
  let mixed = base.slice();
  mixed[hue] = Math.min(255, mixed[hue]+d);
  return mixed;
}



export function wedge2Step(wedge){
  return wedge*2-4;
}

export function slider2Wedge(slider){
  return MIN_RESOLVE + MAX_RESOLVE - slider;
}

const MIN_RESOLVE = 3; //Probably shouldn't change these
const MAX_RESOLVE = 32; //without updating Gaslight :()