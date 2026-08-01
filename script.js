document.addEventListener("DOMContentLoaded",()=>{

/* MOBILE NAV */

const navToggle=document.getElementById("navToggle");
const navLinks=document.getElementById("navLinks");

if(navToggle&&navLinks){
        navToggle.addEventListener("click",()=>{
        navLinks.classList.toggle("mobile-open");
});
}

/* SMOOTH NAVIGATION */

document.querySelectorAll('a[href^="#"]').forEach(link=>{
        link.addEventListener("click",e=>{
        e.preventDefault();

const target=document.querySelector(link.getAttribute("href"));

if(target){
    target.scrollIntoView({
    behavior:"smooth"
});
}

navLinks.classList.remove("mobile-open");
});
});

/* START JOURNEY */

const journeyBtn=document.getElementById("journeyBtn");

if(journeyBtn){

journeyBtn.addEventListener("click",()=>{

journeyBtn.innerHTML="Opening... ❤️";
journeyBtn.disabled=true;

setTimeout(()=>{

document.getElementById("notes").scrollIntoView({
behavior:"smooth"
});

journeyBtn.innerHTML="Start Our Journey →";
journeyBtn.disabled=false;

},1200);

});

}

/* COUNTDOWN */

const days=document.getElementById("days");
const hours=document.getElementById("hours");
const minutes=document.getElementById("minutes");
const seconds=document.getElementById("seconds");

function updateCountdown(){

const now=new Date();

let birthday=new Date(
now.getFullYear(),
7,
2,
0,
0,
0
);

if(now>birthday){
birthday.setFullYear(birthday.getFullYear()+1);
}

const diff=birthday-now;

const d=Math.floor(diff/(1000*60*60*24));
const h=Math.floor(diff/(1000*60*60))%24;
const m=Math.floor(diff/(1000*60))%60;
const s=Math.floor(diff/1000)%60;

if(days)days.innerText=String(d).padStart(2,"0");
if(hours)hours.innerText=String(h).padStart(2,"0");
if(minutes)minutes.innerText=String(m).padStart(2,"0");
if(seconds)seconds.innerText=String(s).padStart(2,"0");

}

updateCountdown();
setInterval(updateCountdown,1000);

/* MUSIC */

const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

let playing=false;

if(music&&musicBtn){

music.loop=true;

musicBtn.addEventListener("click",()=>{

if(!playing){

music.play().then(()=>{

playing=true;
musicBtn.innerHTML="⏸ Pause Music";

}).catch(()=>{

musicBtn.innerHTML="🎵 Music";

});

}else{

music.pause();
playing=false;
musicBtn.innerHTML="🎵 Music";

}

});

}

/* LOVE NOTES */

document.querySelectorAll(".note").forEach(note=>{
note.addEventListener("click",()=>{
note.classList.toggle("open");
});
});

/* FLOATING HEARTS */

function createHeart(){

const heart=document.createElement("div");

heart.innerHTML="❤️";
heart.style.position="fixed";
heart.style.left=Math.random()*100+"vw";
heart.style.bottom="-40px";
heart.style.fontSize=(20+Math.random()*20)+"px";
heart.style.pointerEvents="none";
heart.style.opacity=".85";
heart.style.zIndex="9999";
heart.style.transition="transform 6s linear,opacity 6s";

document.body.appendChild(heart);

setTimeout(()=>{
heart.style.transform=`translateY(-120vh) rotate(${Math.random()*360}deg)`;
heart.style.opacity="0";
},100);

setTimeout(()=>{
heart.remove();
},6100);

}

setInterval(createHeart,700);

/* SPARKLES */

function sparkle(){

const star=document.createElement("div");

star.innerHTML="✨";
star.style.position="fixed";
star.style.left=Math.random()*100+"vw";
star.style.top=Math.random()*100+"vh";
star.style.fontSize=(12+Math.random()*12)+"px";
star.style.pointerEvents="none";
star.style.zIndex="9998";

document.body.appendChild(star);

star.animate([
{transform:"scale(.2)",opacity:0},
{transform:"scale(1.4)",opacity:1},
{transform:"scale(.2)",opacity:0}
],{
duration:1800,
easing:"ease-in-out"
});

setTimeout(()=>{
star.remove();
},1800);

}

setInterval(sparkle,350);

/* CONFETTI */

const confettiBtn=document.getElementById("confettiBtn");

if(confettiBtn){

confettiBtn.addEventListener("click",()=>{

for(let i=0;i<180;i++){
createConfetti();
}

});

}

function createConfetti(){

const piece=document.createElement("div");

piece.style.position="fixed";
piece.style.width="10px";
piece.style.height="10px";
piece.style.left=Math.random()*100+"vw";
piece.style.top="-20px";
piece.style.borderRadius="2px";
piece.style.pointerEvents="none";
piece.style.zIndex="99999";

const colors=[
"#ff5c8a",
"#ffd166",
"#6ee7ff",
"#ffffff",
"#ff9ecf",
"#ffe066"
];

piece.style.background=colors[Math.floor(Math.random()*colors.length)];

document.body.appendChild(piece);

const duration=3000+Math.random()*2000;

piece.animate([
{transform:"translateY(0) rotate(0deg)"},
{transform:`translate(${Math.random()*300-150}px,${window.innerHeight+50}px) rotate(${720+Math.random()*720}deg)`}
],{
duration:duration,
easing:"ease-out"
});

setTimeout(()=>{
piece.remove();
},duration);

}
/* CARD MODAL */

const cardModal=document.getElementById("cardModal");
const modalVisual=document.getElementById("modalVisual");
const modalQuote=document.getElementById("modalQuote");

if(cardModal){

cardModal.addEventListener("click",e=>{
if(e.target===cardModal)closeModal();
});

document.addEventListener("keydown",e=>{
if(e.key==="Escape")closeModal();
});

}

window.openModal=function(visualClass,image,quoteText){

if(!cardModal)return;

modalVisual.innerHTML=`<img src="${image}" alt="Birthday Photo">`;
modalQuote.innerText=quoteText;

cardModal.classList.add("open");
document.body.style.overflow="hidden";

};

window.closeModal=function(){

if(!cardModal)return;

cardModal.classList.remove("open");
document.body.style.overflow="";

};

/* SCROLL ANIMATION */

const cards=document.querySelectorAll(".glass-card,.note,.card,.memory-card");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([
{opacity:0,transform:"translateY(50px)"},
{opacity:1,transform:"translateY(0)"}
],{
duration:900,
fill:"forwards"
});

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

cards.forEach(card=>observer.observe(card));

});