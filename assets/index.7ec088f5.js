import{f as e}from"./vendor.519c7c38.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const o=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,c)=>{const d=new URL(e,o);if(self[t].moduleMap[d])return a(self[t].moduleMap[d]);const s=new Blob([`import * as m from '${d}';`,`${t}.moduleMap['${d}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){c(new Error(`Failed to import: ${e}`)),n(i)},onload(){a(self[t].moduleMap[d]),n(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/assets/");const t={apiKey:"AIzaSyC6LKCskt2L8MCIVF-5AMizR9jEKlyYbvQ",authDomain:"my-webrtc-b2385.firebaseapp.com",projectId:"my-webrtc-b2385",storageBucket:"my-webrtc-b2385.appspot.com",messagingSenderId:"1011676544129",appId:"1:1011676544129:web:a55b676996d9e812fc2180",measurementId:"G-N89GH0YJWM"};e.apps.length||e.initializeApp(t);const a=e.firestore(),o=new RTCPeerConnection({iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10});let n=null,c=null;const d=document.getElementById("webcamButton"),s=document.getElementById("webcamVideo"),i=document.getElementById("callButton"),r=document.getElementById("callInput"),l=document.getElementById("answerButton"),m=document.getElementById("remoteVideo"),p=document.getElementById("hangupButton");d.onclick=async()=>{n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),c=new MediaStream,n.getTracks().forEach((e=>{o.addTrack(e,n)})),o.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{c.addTrack(e)}))},s.srcObject=n,m.srcObject=c,i.disabled=!1,l.disabled=!1,d.disabled=!0},i.onclick=async()=>{const e=a.collection("calls").doc(),t=e.collection("offerCandidates"),n=e.collection("answerCandidates");r.value=e.id,o.onicecandidate=e=>{e.candidate&&t.add(e.candidate.toJSON())};const c=await o.createOffer();await o.setLocalDescription(c);const d={sdp:c.sdp,type:c.type};await e.set({offer:d}),e.onSnapshot((e=>{const t=e.data();if(!o.currentRemoteDescription&&(null==t?void 0:t.answer)){const e=new RTCSessionDescription(t.answer);o.setRemoteDescription(e)}})),n.onSnapshot((e=>{e.docChanges().forEach((e=>{if("added"===e.type){const t=new RTCIceCandidate(e.doc.data());o.addIceCandidate(t)}}))})),p.disabled=!1},l.onclick=async()=>{const e=r.value,t=a.collection("calls").doc(e),n=t.collection("answerCandidates"),c=t.collection("offerCandidates");o.onicecandidate=e=>{e.candidate&&n.add(e.candidate.toJSON())};const d=(await t.get()).data().offer;await o.setRemoteDescription(new RTCSessionDescription(d));const s=await o.createAnswer();await o.setLocalDescription(s);const i={type:s.type,sdp:s.sdp};await t.update({answer:i}),c.onSnapshot((e=>{e.docChanges().forEach((e=>{if(console.log(e),"added"===e.type){let t=e.doc.data();o.addIceCandidate(new RTCIceCandidate(t))}}))}))};
