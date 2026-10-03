const tools=[
["PriceLabs","pricing"],["Wheelhouse","pricing"],["Beyond Pricing","pricing"],
["Hospitable","pms"],["Guesty","pms"],["Hostaway","pms"],["OwnerRez","pms"],
["Airbnb Hosting Dashboard","ota"],["Vrbo Owner Center","ota"],["Booking.com","ota"],
["Slack","ops"],["WhatsApp Business","ops"],["Notion","ops"],["Trello / Asana","ops"],
["Vista Social","social"],["Canva","social"],["Meta Business Suite","social"],["CapCut","social"],
["Google Workspace","analytics"],["Google Sheets / Excel","analytics"],["Airtable","analytics"]];
const chips=document.getElementById('chips'),q=document.getElementById('q');
let filter='all';
function render(){
  const t=q.value.trim().toLowerCase();
  const list=tools.filter(([n,c])=>(filter==='all'||c===filter)&&n.toLowerCase().includes(t));
  chips.innerHTML=list.length?list.map(([n])=>`<span class="chip">${n}</span>`).join(''):'<span class="chip">No tools match</span>';
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');filter=b.dataset.f;render();
});
q.oninput=render;render();

// Experience accordion
document.querySelectorAll('.jh').forEach(h=>h.onclick=()=>{
  const job=h.parentElement,open=job.classList.toggle('open');
  h.setAttribute('aria-expanded',open);
});

// Interests tabs
const interests=[
["Garment & Fashion Design","Designing clothing patterns, sewing, and drafting custom garments using a home machine."],
["Baking","Add your baking story here: favorite bakes, recipes, or what you enjoy most."],
["Pet Companionship","Add a line about your pets and what they bring to your day."],
["Creative Focus","Add a line about how creative hobbies sharpen your work."]];
const panel=document.getElementById('panel');
function showTab(i){panel.innerHTML=`<h3>${interests[i][0]}</h3><p>${interests[i][1]}</p>`}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');showTab(+b.dataset.i);
});
showTab(0);

// Copy buttons
document.querySelectorAll('.copy').forEach(b=>b.onclick=async()=>{
  try{await navigator.clipboard.writeText(b.dataset.c);b.textContent='Copied';}catch{b.textContent='Press Ctrl+C'}
  setTimeout(()=>b.textContent='Copy',1500);
});

// Mobile menu + active link highlight
const nav=document.querySelector('.nav nav'),burger=document.querySelector('.burger');
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>io.observe(s));