const RESOURCE_LIBRARY_URL = "";
const screen=document.getElementById("screen");
let state={cash:0,nextPay:"",selected:[]};

const bills=[
 ["housing","Rent / mortgage / immediate housing","Housing"],
 ["power","Electricity / gas / essential utility","Essential utility"],
 ["water","Water / sewer","Essential utility"],
 ["food","Food / basic household necessities","Basic needs"],
 ["meds","Essential medication / medical need","Basic needs"],
 ["workcar","Transportation needed to keep working","Income protection"],
 ["insurance","Required vehicle insurance","Income / legal protection"],
 ["phone","Phone needed for work, safety, or essential contact","Essential communication"],
 ["child","Childcare needed to work / essential child need","Basic needs"],
 ["debt","Credit card / unsecured debt minimum","Debt"],
 ["subscription","Subscription / entertainment","Lower priority"],
 ["other","Something else","Other"]
];

function goTop(){window.scrollTo({top:0,behavior:"smooth"})}
function home(){
 screen.innerHTML=`<div class="eyebrow">FREE INTERACTIVE TOOL</div>
 <h1>What Do I Pay First?</h1>
 <p class="lead">When there isn't enough money for everything, the goal isn't to be perfect. It's to protect the things that can hurt you fastest if they go unpaid.</p>
 <div class="note"><strong>This is a prioritizing tool—not a judgment.</strong><br>We're looking at what needs attention before your next income.</div>
 <button class="primary" onclick="money()">Start my priority check</button>`;
 goTop();
}
function money(){
 screen.innerHTML=`<div class="eyebrow">STEP 1 OF 3</div><h2>What are we working with?</h2>
 <label for="cash">About how much money is available right now?</label><input id="cash" type="number" min="0" step=".01" placeholder="$0">
 <label for="nextPay">When is your next expected income?</label><input id="nextPay" type="date">
 <p class="small">An estimate is fine. This tool doesn't save or send what you enter.</p>
 <div class="actions"><button class="primary" onclick="saveMoney()">Next</button><button class="secondary" onclick="home()">← Start over</button></div>`;goTop();
}
function saveMoney(){state.cash=Math.max(0,Number(document.getElementById("cash").value)||0);state.nextPay=document.getElementById("nextPay").value;pickBills()}
function pickBills(){
 screen.innerHTML=`<div class="eyebrow">STEP 2 OF 3</div><h2>What needs money before your next income?</h2>
 <p class="lead">Check everything that applies. We'll sort the list next.</p>
 <div>${bills.map(([id,label])=>`<div class="row"><input id="${id}" type="checkbox"><label for="${id}">${label}</label></div>`).join("")}</div>
 <div class="actions"><button class="primary" onclick="saveBills()">Sort my priorities</button><button class="secondary" onclick="money()">← Back</button></div>`;goTop();
}
function saveBills(){state.selected=bills.filter(([id])=>document.getElementById(id).checked).map(x=>x[0]);results()}
function item(id){return bills.find(x=>x[0]===id)?.[1]||id}
function list(ids){return ids.length?`<ul>${ids.map(x=>`<li>${item(x)}</li>`).join("")}</ul>`:"<p>Nothing you selected landed here.</p>"}
function results(){
 const first=["housing","power","water","food","meds"].filter(x=>state.selected.includes(x));
 const protect=["workcar","insurance","phone","child"].filter(x=>state.selected.includes(x));
 const later=["debt","subscription"].filter(x=>state.selected.includes(x));
 const other=state.selected.includes("other")?["other"]:[];
 const date=state.nextPay?new Date(state.nextPay+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"}):"your next income";
 screen.innerHTML=`<div class="eyebrow">YOUR PRIORITY MAP</div><h2>Protect the essentials first.</h2>
 <p>You have about <span class="money">$${state.cash.toFixed(2)}</span> available until <strong>${date}</strong>.</p>
 <div class="bucket"><h3>1. Check these first</h3><div>${list(first)}<p class="small">Housing, essential utilities, food, and essential medical needs can have fast real-world consequences.</p></div></div>
 <div class="bucket"><h3>2. Protect your ability to keep life moving</h3><div>${list(protect)}<p class="small">These may protect income, required transportation, essential childcare, or communication.</p></div></div>
 <div class="bucket"><h3>3. Then look at these</h3><div>${list(later)}<p class="small">Don't ignore debts or other bills. But when cash is truly short, paying a little toward everything can leave an essential need uncovered. Check due dates, grace periods, late-fee rules, and hardship options before deciding.</p></div></div>
 ${other.length?`<div class="bucket"><h3>Needs your judgment</h3><div>${list(other)}<p class="small">Ask: What happens if this waits? Could it affect housing, safety, health, employment, required insurance, or another essential need?</p></div></div>`:""}
 <div class="note"><strong>Before you send money:</strong> get the exact due date and minimum needed to prevent the immediate consequence. If you can't cover an essential bill, contact the provider early and ask about extensions, payment arrangements, or assistance.</div>
 <h2>One next step</h2><p>Choose the highest-priority item on this page and get its exact amount and deadline. Don't solve the whole month yet.</p>
 <div class="actions"><button class="primary" onclick="home()">Run another priority check</button>${RESOURCE_LIBRARY_URL?`<a href="${RESOURCE_LIBRARY_URL}">More Grounded Living Now resources</a>`:""}</div>`;goTop();
}
home();