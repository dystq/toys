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

export function isBlack(rgb) {
  if (rgb.map(x=>x==0).reduce((x,y)=>x&&y)) return true;
  else return false;
}

export function isWhite(rgb) {
  if (rgb.map(x=>x==255).reduce((x,y)=>x&&y)) return true;
  else return false;
}

export function wedge2Step(wedge){
  return wedge*2-4;
}

export function slider2Wedge(slider){
  return MIN_RESOLVE + MAX_RESOLVE - slider;
}

const MIN_RESOLVE = 3; //Probably shouldn't change these
const MAX_RESOLVE = 32; //without updating Gaslight :()