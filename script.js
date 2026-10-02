let doctors = [
{name:"Dr. Shashikant Yadav",dept:"General Physician",age:"35 Years | 10 Years Exp",fees:"₹500",available:true},
{name:"Dr. Vikash YADAV",dept:"Cardiologist",age:"42 Years | 15 Years Exp",fees:"₹800",available:true},
{name:"Dr. Manish Yadav",dept:"Dentist",age:"32 Years | 7 Years Exp",fees:"₹400",available:true},
{name:"Dr. Vasudev Yadav",dept:"Orthopedic",age:"45 Years | 18 Years Exp",fees:"₹600",available:true}
];
let labs = [
{name:"Blood Test",price:"₹300"},
{name:"X-Ray",price:"₹500"},
{name:"ECG",price:"₹400"},
{name:"Ultrasound",price:"₹1200"}
];
let currentUser = null;
let selectedDoctor = null;
let selectedLab = null;
let tokenCounter = parseInt(localStorage.getItem("token")||"100");

function hide(id){document.getElementById(id).classList.add("hidden")}
function show(id){document.getElementById(id).classList.remove("hidden")}
function goToLoginPage(){hide("welcomePage");show("loginPage")}
function openAdminLogin(){show("adminLoginModal")}
function openDoctorLogin(){show("doctorLoginModal")}

function patientLogin(){
let name=document.getElementById("pNameLogin").value;
let mobile=document.getElementById("pMobileLogin").value;
if(!name || mobile.length!=10){alert("Name aur 10 digit mobile dalo");return;}
currentUser={name,mobile};
document.getElementById("showName").innerText=name;
hide("loginPage");show("homePage");
renderDoctors();renderLabs();renderHistory();
}

function renderDoctors(){
let c=document.getElementById("doctorContainer");c.innerHTML="";
doctors.forEach((d,i)=>{
c.innerHTML+=`<div class="doc-card">
<h4>${d.name}</h4><small>${d.dept}</small><br><small style="color:gray">${d.age}</small><br>
<b style="color:#10b981">${d.fees}</b><br>
<span style="font-size:10px;color:${d.available?'green':'red'}">${d.available?'● Available':'● Busy'}</span><br>
<button class="btn" style="margin-top:6px;padding:6px" onclick="openBook(${i})">Book Now</button>
</div>`;
});
}

function renderLabs(){
let c=document.getElementById("labContainer");c.innerHTML="";
labs.forEach((l,i)=>{
c.innerHTML+=`<div class="lab-card"><h4>${l.name}</h4><b>${l.price}</b><br>
<button class="btn" style="margin-top:6px;padding:6px" onclick="openLab(${i})">Book Test</button></div>`;
});
}

function openBook(i){
selectedDoctor=doctors[i];
document.getElementById("modalDocName").innerText=selectedDoctor.name;
document.getElementById("modalDept").innerText=selectedDoctor.dept;
document.getElementById("modalAgeExp").innerText=selectedDoctor.age;
document.getElementById("modalStatus").innerHTML=selectedDoctor.available?'<small style="color:green">Available Hai</small>':'<small style="color:red">Abhi Available Nahi</small>';
show("bookModal");
}

function openLab(i){
selectedLab=labs[i];
document.getElementById("labModalName").innerText=selectedLab.name;
document.getElementById("labModalPrice").innerText=selectedLab.price;
show("labModal");
}

function confirmBooking(){
let date=document.getElementById("bookDate").value;
let time=document.getElementById("bookTime").value;
let problem=document.getElementById("bookProblem").value;
if(!date||!time||!problem){alert("Sab bharo");return;}
tokenCounter++;localStorage.setItem("token",tokenCounter);
let app={token:tokenCounter,name:currentUser.name,mobile:currentUser.mobile,doctor:selectedDoctor.name,dept:selectedDoctor.dept,ageExp:selectedDoctor.age,fees:selectedDoctor.fees,date,time,problem};
let apps=JSON.parse(localStorage.getItem("apps")||"[]");apps.push(app);localStorage.setItem("apps",JSON.stringify(apps));
hide("bookModal");showSlip(app);
}

function confirmLabBooking(){
let date=document.getElementById("labDate").value;
let time=document.getElementById("labTime").value;
if(!date||!time){alert("Date Time bharo");return;}
let labBook={name:currentUser.name,test:selectedLab.name,price:selectedLab.price,date,time};
let labsData=JSON.parse(localStorage.getItem("labBooks")||"[]");labsData.push(labBook);localStorage.setItem("labBooks",JSON.stringify(labsData));
hide("labModal");alert("Lab Test Booked: "+selectedLab.name);renderHistory();
}

function showSlip(app){
show("slipPage");hide("homePage");
document.getElementById("slipPrintDate").innerText=new Date().toLocaleDateString();
document.getElementById("slipPrintTime").innerText=new Date().toLocaleTimeString();
document.getElementById("sName").innerText=app.name;
document.getElementById("sMobile").innerText=app.mobile;
document.getElementById("sDoc").innerText=app.doctor;
document.getElementById("sAgeExp").innerText=app.ageExp;
document.getElementById("sDept").innerText=app.dept;
document.getElementById("sDate").innerText=app.date;
document.getElementById("sTime").innerText=app.time;
document.getElementById("sProblem").innerText=app.problem;
document.getElementById("sFees").innerText=app.fees;
document.getElementById("sToken").innerText=app.token;
}

function showHomeAgain(){hide("slipPage");hide("prescriptionPage");show("homePage");renderHistory();}
function renderHistory(){
let apps=JSON.parse(localStorage.getItem("apps")||"[]");
let c=document.getElementById("historyContainer");c.innerHTML="";
apps.filter(a=>a.mobile==currentUser.mobile).reverse().forEach(a=>{
c.innerHTML+=`<div class="history-card"><div><b>${a.doctor}</b><br><small>${a.date} ${a.time} | Token: ${a.token}</small></div><small>${a.fees}</small></div>`;
});
}

function adminUserPassLogin(){
let u=document.getElementById("adminUserInput").value;
let p=document.getElementById("adminPassInput").value;
if(u=="admin" && p=="admin123"){hide("adminLoginModal");hide("loginPage");show("adminPage");loadAdmin();}
else{alert("Wrong Admin Password");}
}
function doctorLogin(){
let d=document.getElementById("doctorSelect").value;
let p=document.getElementById("doctorPass").value;
if(p=="doctor123"){
document.getElementById("doctorPageName").innerText=d;
hide("doctorLoginModal");hide("loginPage");show("doctorPage");
document.getElementById("docTotalPatients").innerText=JSON.parse(localStorage.getItem("apps")||"[]").filter(a=>a.doctor==d).length;
}
else{alert("Wrong Doctor Password");}
}
function loadAdmin(){
let apps=JSON.parse(localStorage.getItem("apps")||"[]");
document.getElementById("totalApps").innerText=apps.length;
let rev=0;apps.forEach(a=>{rev+=parseInt(a.fees.replace("₹",""))});document.getElementById("totalRevenue").innerText="₹"+rev;
}
function payNow(){alert("Payment Gateway Integration - Demo")}
function shareWhatsApp(){let t=document.getElementById("sToken").innerText;window.open("https://wa.me/91"+currentUser.mobile+"?text=Your Token is "+t+" - Health Care Center");}
function downloadSlip(){window.print();}
function downloadPrescription(){window.print();}
