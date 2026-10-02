function hide(id){document.getElementById(id).classList.add('hidden')}
const UPI="9520933721@ptyes";
const _0xA1="QXZhbmlzaCBZYWRhdg==";const _0xB2="MjMwNTMwMTAxMDM4";
function getCred(){try{return{u:atob(_0xA1),p:atob(_0xB2)}}catch(e){return{u:"",p:""}}}
let defaultDoctors=[
{name:"Dr. Shashikant Yadav",dept:"Ayurveda 🌿",fees:"₹800",feesNum:800,icon:"🧑‍⚕️",age:"Age: 28 Years",exp:"Exp: 5 Years",status:"yes"},
{name:"Dr. Vikash YADAV",dept:"Dentist 🦷",fees:"₹500",feesNum:300,icon:"🧑‍⚕️",age:"Age: 24 Years",exp:"Exp: 3 Years",status:"yes"},
{name:"Dr. Manish Yadav",dept:"General Physician",fees:"₹400",feesNum:400,icon:"🧑‍⚕️",age:"Age: 22 Years",exp:"Exp: 2 Years",status:"yes"},
{name:"Dr. Vasudev Yadav",dept:"Orthopedic",fees:"₹600",feesNum:600,icon:"🧑‍⚕️",age:"Age: 30 Years",exp:"Exp: 4 Years",status:"yes"}];
let labTests=[{name:"Blood Test",price:"₹350",icon:"🩸",time:"24H"},{name:"Sugar Test",price:"₹150",icon:"🍬",time:"2H"},{name:"X-Ray",price:"₹500",icon:"🦴",time:"Same Day"},{name:"Thyroid",price:"₹600",icon:"🧬",time:"24H"}];
localStorage.setItem('yadav_doctor_status',JSON.stringify(defaultDoctors));
let doctors=defaultDoctors;
function save(){localStorage.setItem('yadav_doctor_status',JSON.stringify(doctors))}
function getStatus(s){return s=='yes'?`<span style="background:#10b981;color:#fff;padding:2px 6px;border-radius:6px;font-size:9px">YES</span>`:`<span style="background:red;color:#fff;padding:2px 6px;border-radius:6px;font-size:9px">NO</span>`}
function openAdminLogin(){document.getElementById('adminLoginModal').classList.remove('hidden')}
function openDoctorLogin(){document.getElementById('doctorLoginModal').classList.remove('hidden')}
function doctorLogin(){let sel=document.getElementById('doctorSelect').value;let p=document.getElementById('doctorPass').value;if(p!="1111")return alert("Wrong Password");hide('doctorLoginModal');document.getElementById('welcomePage').style.display='none';document.getElementById('loginPage').classList.add('hidden');document.getElementById('doctorPage').classList.remove('hidden');document.getElementById('doctorPageName').innerText=sel;currentDoctorName=sel;renderDoctorPage();history.pushState({page:"doctor"}, "", "#doctor");}
function adminUserPassLogin(){let u=document.getElementById('adminUserInput').value.trim();let p=document.getElementById('adminPassInput').value.trim();let c=getCred();if(u===c.u&&p===c.p){hide('adminLoginModal');document.getElementById('welcomePage').style.display='none';document.getElementById('loginPage').classList.add('hidden');document.getElementById('adminPage').classList.remove('hidden');renderAdmin();history.pushState({page:"admin"}, "", "#admin");}else alert("Wrong")}
let selectedDoctor=null,selectedLab=null,patientData={},appointments=JSON.parse(localStorage.getItem('yadav_appointments')||'[]'),labBookings=JSON.parse(localStorage.getItem('yadav_lab')||'[]'),prescriptions=JSON.parse(localStorage.getItem('yadav_prescriptions')||'[]'),currentAppIndex=null,currentRxAppointmentIndex=null,currentDoctorName="";
function goToLoginPage(){document.getElementById('welcomePage').style.display='none';document.getElementById('loginPage').classList.remove('hidden');document.getElementById('loginPage').style.display='flex';history.pushState({page:"login"}, "", "#login");}
function patientLogin(){let n=document.getElementById('pNameLogin').value,m=document.getElementById('pMobileLogin').value;if(n.length<3||m.length!=10)return alert('Sahi dalo');patientData={name:n,mobile:m};document.getElementById('loginPage').classList.add('hidden');document.getElementById('homePage').classList.remove('hidden');document.getElementById('showName').innerText=n;
document.getElementById('doctorContainer').innerHTML=doctors.map((d,i)=>`<div class="doc-card"><div style="font-size:26px">${d.icon}</div><h4 style="font-size:12px;margin:4px 0">${d.name}</h4><div style="margin:3px 0">${getStatus(d.status)}</div><small style="font-size:9px">${d.dept}<br>${d.age}<br>${d.exp}<br><b>${d.fees}</b></small><br><button class="btn" style="padding:6px;font-size:10px;background:#10b981;margin-top:5px" onclick="openBook(${i})">Book</button></div>`).join('');
document.getElementById('labContainer').innerHTML=labTests.map((l,i)=>`<div class="lab-card"><div style="font-size:24px">${l.icon}</div><h4 style="font-size:11px">${l.name}</h4><small style="font-size:9px">${l.price} | ${l.time}</small><br><button class="btn" style="padding:5px;font-size:10px;background:orange;margin-top:5px" onclick="openLab(${i})">Book Test</button></div>`).join('');
renderHistory();renderLabHistory();renderMedicalHistory();history.pushState({page:"home"}, "", "#home");}

function renderAdmin(){
let t=appointments.length,r=appointments.filter(a=>a.paid).reduce((s,a)=>s+a.feesNum,0);document.getElementById('totalApps').innerText=t;document.getElementById('totalRevenue').innerText="₹"+r;
let sHTML=doctors.map((d,i)=>`<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #eee"><div><b style="font-size:11px">${d.name}</b> <small style="font-size:8px">${d.age}, ${d.exp}</small><br>${getStatus(d.status)}</div><select onchange="changeStatus(${i},this.value)" style="width:70px"><option value="yes" ${d.status=='yes'?'selected':''}>YES</option><option value="no" ${d.status=='no'?'selected':''}>NO</option></select></div>`).join('');document.getElementById('doctorStatusControl').innerHTML=sHTML;
let h=`<table style="width:100%;background:#fff;border-radius:8px;overflow:hidden;font-size:11px"><tr style="background:#6a5af9;color:#fff"><td style="padding:6px">Patient</td><td style="padding:6px">Token</td><td style="padding:6px">Act</td></tr>`;appointments.slice().reverse().forEach((a,idx)=>{let ri=appointments.length-1-idx;h+=`<tr><td style="padding:6px">${a.name}<br><small>${a.docName}</small></td><td style="padding:6px">${a.token}</td><td style="padding:6px"><button onclick="openRx(${ri})" style="padding:3px 6px;background:green;color:#fff;border:none;border-radius:4px">Rx</button> <button onclick="del(${ri})" style="padding:3px 6px;background:red;color:#fff;border:none;border-radius:4px">DEL</button></td></tr>`;});h+=`</table>`;document.getElementById('adminTableContainer').innerHTML=h;
let labH = `<table style="width:100%;background:#fff;border-radius:8px;overflow:hidden;font-size:11px;margin-top:6px"><tr style="background:orange;color:#fff"><td style="padding:6px">Patient</td><td style="padding:6px">Test</td><td style="padding:6px">Del</td></tr>`;
if(labBookings.length==0){ labH+=`<tr><td colspan="3" style="padding:8px;text-align:center;color:gray">No Lab Tests</td></tr>`; }
else{ labBookings.slice().reverse().forEach((l,idx)=>{ let ri=labBookings.length-1-idx; labH+=`<tr><td style="padding:6px">${l.name}<br><small>${l.mobile}</small></td><td style="padding:6px">${l.testName}<br><small>${l.date}</small></td><td style="padding:6px"><button onclick="delLab(${ri})" style="padding:3px 6px;background:red;color:#fff;border:none;border-radius:4px">DEL</button></td></tr>`; }); }
labH+=`</table>`; document.getElementById('adminLabContainer').innerHTML=labH;
let rxH = `<table style="width:100%;background:#fff;border-radius:8px;overflow:hidden;font-size:11px;margin-top:6px"><tr style="background:#10b981;color:#fff"><td style="padding:6px">Patient</td><td style="padding:6px">Medicine</td><td style="padding:6px">Del</td></tr>`;
if(prescriptions.length==0){ rxH+=`<tr><td colspan="3" style="padding:8px;text-align:center;color:gray">No Prescription</td></tr>`; }
else{ prescriptions.slice().reverse().forEach((p,idx)=>{ let ri=prescriptions.length-1-idx; rxH+=`<tr><td style="padding:6px">${p.name}<br><small>${p.docName} | ${p.token}</small></td><td style="padding:6px"><small>${p.diagnosis.substring(0,30)}</small></td><td style="padding:6px"><button onclick="delRx(${ri})" style="padding:3px 6px;background:red;color:#fff;border:none;border-radius:4px">DEL</button> <button onclick="viewPrescription(${ri})" style="padding:3px 6px;background:#6a5af9;color:#fff;border:none;border-radius:4px;margin-top:2px">View</button></td></tr>`; }); }
rxH+=`</table>`; document.getElementById('adminRxContainer').innerHTML=rxH;
}

function renderDoctorPage(){let my=appointments.filter(a=>a.docName==currentDoctorName);document.getElementById('docTotalPatients').innerText=my.length;let h=my.map(a=>{let idx=appointments.findIndex(ap=>ap.token==a.token);return `<div style="background:#fff;padding:8px;border-radius:8px;margin:5px 0;display:flex;justify-content:space-between"><div><b style="font-size:11px">${a.name}</b><br><small>${a.token} | ${a.problem}</small></div><button onclick="openRx(${idx})" style="padding:4px 8px;background:green;color:#fff;border:none;border-radius:4px">Rx</button></div>`;}).join('');document.getElementById('doctorPatientList').innerHTML=h||'<p style="text-align:center;color:gray">No patient</p>';}
function changeStatus(i,v){doctors[i].status=v;save();renderAdmin();}
function del(i){if(confirm("Delete Appointment?")){appointments.splice(i,1);localStorage.setItem('yadav_appointments',JSON.stringify(appointments));renderAdmin();}}
function delLab(i){ if(confirm("Delete Lab Test?")){ labBookings.splice(i,1); localStorage.setItem('yadav_lab',JSON.stringify(labBookings)); renderAdmin(); renderLabHistory(); } }
function delRx(i){ if(confirm("Delete Prescription?")){ prescriptions.splice(i,1); localStorage.setItem('yadav_prescriptions',JSON.stringify(prescriptions)); renderAdmin(); renderMedicalHistory(); } }
function openRx(i){currentRxAppointmentIndex=i;let a=appointments[i];document.getElementById('rxPatientName').innerText=a.name;document.getElementById('rxToken').innerText=a.token;document.getElementById('rxModal').classList.remove('hidden');}
function savePrescription(){let a=appointments[currentRxAppointmentIndex];let diag=document.getElementById('rxDiagnosis').value;let meds=document.getElementById('rxMedicines').value;let adv=document.getElementById('rxAdvice').value;let fol=document.getElementById('rxFollowup').value;if(!diag||!meds)return alert("Diagnosis+Medicines likho");let rx={token:a.token,name:a.name,mobile:a.mobile,docName:a.docName,date:new Date().toLocaleDateString(),diagnosis:diag,medicines:meds,advice:adv,followup:fol};let ex=prescriptions.findIndex(p=>p.token==a.token);if(ex>=0)prescriptions[ex]=rx;else prescriptions.push(rx);localStorage.setItem('yadav_prescriptions',JSON.stringify(prescriptions));hide('rxModal');alert("Rx Saved!");}
function renderHistory(){let my=appointments.filter(a=>a.mobile==patientData.mobile),box=document.getElementById('historyContainer');if(my.length==0){box.innerHTML='<p style="padding:0 10px;color:gray;font-size:10px">No appointment</p>';return;}box.innerHTML=my.reverse().map(a=>{let oi=appointments.findIndex(x=>x.token===a.token);return `<div class="history-card"><div><b style="font-size:10px">${a.docName}</b><br><small>${a.date} ${a.time} | ${a.token}</small></div><button onclick="viewSlip(${oi})" style="padding:5px 8px;background:#6a5af9;color:#fff;border:none;border-radius:5px;font-size:9px">Slip</button></div>`;}).join('');}
function renderLabHistory(){let myLab=labBookings.filter(l=>l.mobile==patientData.mobile);let box=document.getElementById('labHistoryContainer');if(myLab.length==0){box.innerHTML='<p style="padding:0 10px;color:gray;font-size:10px">No Lab Tests</p>';return;}box.innerHTML=myLab.reverse().map(l=>`<div class="history-card"><div><b style="font-size:11px">${l.testName}</b><br><small>${l.date} ${l.time}</small></div><span style="padding:5px 8px;background:orange;color:#fff;border-radius:5px;font-size:9px">${l.price}</span></div>`).join('');}
function renderMedicalHistory(){let myRx=prescriptions.filter(pr=>pr.mobile==patientData.mobile);let box=document.getElementById('medicalHistoryContainer');if(myRx.length==0){box.innerHTML='<p style="padding:0 10px;color:gray;font-size:10px">No Prescription yet</p>';return;}let html=`<div style="background:#fff;border-radius:10px;margin:0 8px;padding:8px">`;myRx.reverse().forEach(rx=>{let ri=prescriptions.findIndex(p=>p.token==rx.token);html+=`<div style="border:1px solid #10b981;border-radius:6px;padding:6px;margin:5px 0;display:flex;justify-content:space-between"><div><b style="font-size:11px">💊 ${rx.docName}</b><br><small style="font-size:9px">${rx.date} | ${rx.diagnosis}</small></div><button onclick="viewPrescription(${ri})" style="padding:5px 8px;background:#10b981;color:#fff;border:none;border-radius:4px;font-size:9px">Dekho</button></div>`;});html+=`</div>`;box.innerHTML=html;}
function viewPrescription(i){let rx=prescriptions[i];document.getElementById('pDate').innerText=rx.date;document.getElementById('pToken').innerText=rx.token;document.getElementById('pName').innerText=rx.name;document.getElementById('pDoc').innerText=rx.docName;document.getElementById('pDiagnosis').innerText=rx.diagnosis;document.getElementById('pMedicines').innerText=rx.medicines;document.getElementById('pAdvice').innerText=rx.advice;document.getElementById('pFollowup').innerText=rx.followup;document.getElementById('homePage').classList.add('hidden');document.getElementById('prescriptionPage').classList.remove('hidden');history.pushState({page:"rxview"}, "", "#rxview");}
function openBook(i){selectedDoctor=doctors[i];document.getElementById('modalDocName').innerText=selectedDoctor.name;document.getElementById('modalDept').innerText=selectedDoctor.dept+" - "+selectedDoctor.fees;document.getElementById('modalAgeExp').innerText=selectedDoctor.age+" | "+selectedDoctor.exp;document.getElementById('modalStatus').innerHTML=getStatus(selectedDoctor.status);document.getElementById('bookModal').classList.remove('hidden');}
function openLab(i){selectedLab=labTests[i];document.getElementById('labModalName').innerText=selectedLab.name;document.getElementById('labModalPrice').innerText=selectedLab.price;document.getElementById('labModal').classList.remove('hidden');}
function confirmLabBooking(){let d=document.getElementById('labDate').value,t=document.getElementById('labTime').value;if(!d||!t)return alert("Date Time");let o={name:patientData.name,mobile:patientData.mobile,testName:selectedLab.name,price:selectedLab.price,date:d,time:t};labBookings.push(o);localStorage.setItem('yadav_lab',JSON.stringify(labBookings));renderLabHistory();alert("Booked!");}
function confirmBooking(){let d=document.getElementById('bookDate').value,t=document.getElementById('bookTime').value,p=document.getElementById('bookProblem').value||'Checkup';if(!d||!t)return alert('Date Time');let token='YHC'+Math.floor(1000+Math.random()*9000);let na={name:patientData.name,mobile:patientData.mobile,docName:selectedDoctor.name,dept:selectedDoctor.dept,fees:selectedDoctor.fees,feesNum:selectedDoctor.feesNum,age:selectedDoctor.age,exp:selectedDoctor.exp,date:d,time:t,problem:p,token:token,paid:false};appointments.push(na);localStorage.setItem('yadav_appointments',JSON.stringify(appointments));showSlip(na,appointments.length-1);hide('bookModal');}
function showSlip(a,i){currentAppIndex=i;document.getElementById('slipPrintDate').innerText=new Date().toLocaleDateString();document.getElementById('slipPrintTime').innerText=new Date().toLocaleTimeString();document.getElementById('sName').innerText=a.name;document.getElementById('sMobile').innerText=a.mobile;document.getElementById('sDoc').innerText=a.docName;document.getElementById('sAgeExp').innerText=(a.age||'')+" | "+(a.exp||'');document.getElementById('sDept').innerText=a.dept;document.getElementById('sFees').innerText=a.fees;document.getElementById('sDate').innerText=a.date;document.getElementById('sTime').innerText=a.time;document.getElementById('sProblem').innerText=a.problem;document.getElementById('sToken').innerText=a.token;document.getElementById('homePage').classList.add('hidden');document.getElementById('slipPage').classList.remove('hidden');history.pushState({page:"slip"}, "", "#slip");}
function viewSlip(i){showSlip(appointments[i],i);}
function showHomeAgain(){document.getElementById('slipPage').classList.add('hidden');document.getElementById('prescriptionPage').classList.add('hidden');document.getElementById('homePage').classList.remove('hidden');renderHistory();renderLabHistory();renderMedicalHistory();history.pushState({page:"home"}, "", "#home");}
function payNow(){let a=appointments[currentAppIndex];window.location.href=`upi://pay?pa=${UPI}&pn=Yadav&am=${a.feesNum}&cu=INR&tn=${a.token}`;}
function shareWhatsApp(){let a=appointments[currentAppIndex];window.open(`https://wa.me/?text=${encodeURIComponent("YADAV HEALTH CENTER "+a.name+" "+a.docName+" "+a.token)}`,'_blank');}
function downloadSlip(){let c=document.getElementById('slipContent').innerHTML;let w=window.open('','_blank');w.document.write(`<html><head><style>@page{size:A4;margin:10mm}*{font-family:Arial}body{padding:10mm}</style></head><body>${c}<script>window.print()<\/script></body></html>`);w.document.close();}
function downloadPrescription(){let c=document.getElementById('prescriptionContent').innerHTML;let w=window.open('','_blank');w.document.write(`<html><head><style>@page{size:A4;margin:10mm}*{font-family:Arial}</style></head><body>${c}<script>window.print()<\\/script></body></html>`);w.document.close();}
history.replaceState({page:"welcome"}, "", "#welcome");
window.addEventListener('popstate', function(e){
  let page = e.state? e.state.page : "welcome";
  document.getElementById('slipPage').classList.add('hidden');
  document.getElementById('prescriptionPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('doctorPage').classList.add('hidden');
  document.getElementById('adminLoginModal').classList.add('hidden');
  document.getElementById('doctorLoginModal').classList.add('hidden');
  document.getElementById('bookModal').classList.add('hidden');
  document.getElementById('labModal').classList.add('hidden');
  document.getElementById('rxModal').classList.add('hidden');
  if(page=="slip" || page=="rxview"){
    if(patientData.name){
      document.getElementById('homePage').classList.add('hidden');
      document.getElementById('loginPage').classList.add('hidden');
      document.getElementById('welcomePage').style.display='none';
      if(page=="slip") document.getElementById('slipPage').classList.remove('hidden');
      else document.getElementById('prescriptionPage').classList.remove('hidden');
      return;
    }
  }
  if(page=="home" && patientData.name){
    document.getElementById('welcomePage').style.display='none';
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    return;
  }
  if(page=="login"){
    document.getElementById('welcomePage').style.display='none';
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginPage').style.display='flex';
    return;
  }
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('welcomePage').style.display='flex';
});