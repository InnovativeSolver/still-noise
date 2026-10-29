const button=document.querySelector('#toggle');
const label=document.querySelector('.button-label');
const icon=document.querySelector('.play-icon');
const statusText=document.querySelector('#status');
const volume=document.querySelector('#volume');
const volumeValue=document.querySelector('#volume-value');
let context=null, source=null, gain=null, playing=false;

function makeNoise(ctx){
  // A short generated buffer loops forever; no audio asset or network request is needed.
  const seconds=3, size=ctx.sampleRate*seconds, buffer=ctx.createBuffer(1,size,ctx.sampleRate), data=buffer.getChannelData(0);
  let last=0;
  for(let i=0;i<size;i++){const white=Math.random()*2-1;last=(last+.02*white)/1.02;data[i]=white*.22+last*3.5;}
  const node=ctx.createBufferSource();node.buffer=buffer;node.loop=true;return node;
}
async function start(){
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext){statusText.textContent='This browser does not support Web Audio';return;}
  context=context||new AudioContext();
  if(context.state==='suspended')await context.resume();
  gain=context.createGain();gain.gain.value=Number(volume.value)/100*.45;gain.connect(context.destination);
  source=makeNoise(context);source.connect(gain);source.start();playing=true;
  button.setAttribute('aria-label','Stop white noise');label.textContent='Stop listening';icon.textContent='Ⅱ';statusText.textContent='Playing continuously';document.body.classList.add('playing');
}
function stop(){if(source){source.stop();source.disconnect();source=null;}playing=false;button.setAttribute('aria-label','Start white noise');label.textContent='Start listening';icon.textContent='▶';statusText.textContent='Sound is off';document.body.classList.remove('playing');}
button.addEventListener('click',()=>playing?stop():start());
volume.addEventListener('input',()=>{const value=Number(volume.value);volumeValue.value=`${value}%`;volume.style.background=`linear-gradient(to right,var(--green) ${value}%,#41473c ${value}%)`;if(gain)gain.gain.setTargetAtTime(value/100*.45,context.currentTime,.04);});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
