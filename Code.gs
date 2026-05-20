// ============================================================
// GOOGLE APPS SCRIPT - v10.0 (Final Column & Display Sync)
// ============================================================
const SPREADSHEET_ID = '1eB-WBmnpUqdKcnUVqHrsC8rAmxkGUYbAJ1bxmd6NZYI';
const SHEET_NAME = 'Sheet1';
const ALLOW = { ENGLISH: 55, BANGLA: 48, PHYSICS: 48, CHEMISTRY: 48, MATH: 48, BIOLOGY: 48, ICT: 48 };
const FULL_HEADERS_100 = (function() {
var h = new Array(100).fill('');
h[0]='Timestamp'; h[1]='Full Name'; h[2]='Nick Name'; h[4]='T-PIN'; h[5]='Institute';
h[6]='Department'; h[7]='HSC Passing Year'; h[10]='Religion'; h[11]='Gender';
h[12]='Mobile Number 1'; h[13]='Mobile Number 2'; h[14]='Nagad Number';
h[21]='Email'; h[22]='Facebook ID'; h[23]='Teacher Activity Choice 1';
h[24]='Teacher Activity Choice 2'; h[25]='Teacher Activity Choice 3';
h[26]='Teacher Activity Choice 4'; h[27]='Subjects'; h[28]='Version Priority Choice 1';
h[29]='Version Priority Choice 2'; h[30]='Medium of Study (HSC Level)';
h[31]='MS Teams Telegram'; h[32]='Admition Unit'; h[33]='Admission Position';
h[34]='HSC Number'; h[35]='HSC Reg Number'; h[36]='HSC Board'; h[37]='HSC GPA';
h[38]='Evaluation Method'; h[39]='বাংলায় সম্পূর্ণ নাম'; h[40]='Date of Birth';
h[41]='Blood Group'; h[42]='College Name'; h[43]='Fathers Name'; h[44]='Fathers Occupation';
h[45]='Fathers Mobile'; h[46]='Mothers Name'; h[47]='Mothers Occupation';
h[48]='Mothers Mobile'; h[49]='National ID No'; h[50]='Present Area';
h[51]='Home District';
// Subjects (Mapped from Screenshot)
h[53]='English (%)'; h[54]='English Set'; h[55]='English Exam Date';
h[56]='Bangla (%)'; h[57]='Bangla Set'; h[58]='Bangla Exam Date';
h[59]='Physics (%)'; h[60]='Physics Set'; h[61]='Physics Exam Date';
h[62]='Chemistry (%)'; h[63]='Chemistry Set'; h[64]='Math (%)';
h[65]='Math Set'; h[66]='Math Exam Date'; h[67]='Biology (%)';
h[68]='Biology Set'; h[69]='Biology Exam Date'; h[70]='ICT (%)';
h[71]='ICT Set'; h[72]='ICT Exam Date'; h[73]='Training Report';
h[74]='Training Date'; h[75]='Campus'; h[76]='Evaluation Shift'; h[8]='Rm';
h[80]='Image File Name'; h[81]='ID Card File Name'; h[82]='Academic Student';
h[83]='Why Join'; h[84]='Action'; h[85]='Remark Comment'; h[87]='ID Checked?';
return h;
})();
const COL = { SL: 0, NAME: 1, STATUS: 38, TPIN: 4, INST: 5, DEPT: 6, BATCH: 7, RM: 8, MOB1: 12, ALT: 13 };
const REACT_COL_MAP = {
FULL_NAME: 2, NICK_NAME: 3, TPIN: 5, INST: 6, DEPT: 7, HSC_BATCH: 8, MOBILE_1: 13, MOBILE_2: 14,
MOBILE_BANKING: 15, RUNNING_PROGRAM: 16, PREVIOUS_PROGRAM: 17, EMAIL: 22, TEAMS_ID: 32, HSC_ROLL: 35,
HSC_REG: 36, HSC_BOARD: 37, HSC_GPA: 38, SUBJECT_1: 28, SUBJECT_2: 29, VERSION_INTERESTED: 31,
RELIGION: 11, GENDER: 12, DATE_OF_BIRTH: 41, FATHERS_NAME: 44, MOTHERS_NAME: 47, HOME_DISTRICT: 52,
ID_CHECKED: 85, FORM_FILL_DATE: 1, PHYSICAL_CAMPUS_PREF: 76, SELECTED_SUBJECT: 28,
REMARK_COMMENT: 86, REMARK_COUNT: 77,
ENGLISH_PCT: 54, ENGLISH_SET: 55, ENGLISH_DATE: 56,
BANGLA_PCT: 57, BANGLA_SET: 58, BANGLA_DATE: 59,
PHYSICS_PCT: 60, PHYSICS_SET: 61, PHYSICS_DATE: 62,
CHEMISTRY_PCT: 63, CHEMISTRY_SET: 64,
MATH_PCT: 65, MATH_SET: 66, MATH_DATE: 67,
BIOLOGY_PCT: 68, BIOLOGY_SET: 69, BIOLOGY_DATE: 70,
ICT_PCT: 71, ICT_SET: 72, ICT_DATE: 73,
TRAINING_REPORT: 74, TRAINING_DATE: 75,
EVALUATION_SHIFT: 76
};
function doGet(e) {
if (e && e.parameter && e.parameter.action === 'getOptions') return output_(getFilterOptionsFast());
return output_({ status: 'ok', message: 'API Live. v10.0' });
}
function doPost(e) {
try {
const p = JSON.parse(e.postData.contents);
const a = p.action;
if (a === 'getOptions') return output_(getFilterOptionsFast());
if (a === 'getFilteredDataFast') return output_(getFilteredDataFast(p.filters, p.page, p.pageSize));
if (a === 'sync') return output_(handleSyncAction());
if (a === 'search') return output_(handleSearchAction(p.q));
if (a === 'update') return output_(handleUpdateAction(p.tpin, p.searchKey, p.updates));
if (a === 'registration' || a === 'submitRegistration') return output_(handleRegistrationAction(p));
return output_({success:false, error:'Invalid action: ' + a});
} catch(err) { return output_({success:false, error: err.message}); }
}
function output_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function handleSyncAction() {
const sh = openSheetStrict_();
const d = sh.getDataRange().getDisplayValues();
return { ok: true, success: true, data: d.slice(1), header: d[0] };
}
function handleSearchAction(q) {
const sh = openSheetStrict_();
const d = sh.getDataRange().getDisplayValues().slice(1);
const query = String(q || '').toLowerCase();
const f = d.find(r => String(r[COL.TPIN]).toLowerCase() === query || cleanMobile_(r[COL.MOB1]) === query || cleanMobile_(r[COL.ALT]) === query);
return f ? { ok: true, success: true, data: f } : { ok: false, success: false, message: 'Not found' };
}
function handleUpdateAction(tpin, sk, up) {
const sh = openSheetStrict_();
const d = sh.getDataRange().getValues();
const q = String(sk || tpin || '').toLowerCase();
if(!q) return {ok:false, message:'Missing search key'};
let idx = -1;
for(let i=1; i<d.length; i++) {
if(String(d[i][COL.TPIN]).toLowerCase() === q || cleanMobile_(d[i][COL.MOB1]) === q || String(d[i][0]).toLowerCase() === q) { idx=i; break; }
}
if(idx === -1) return {ok:false, message:'Record not found in sheet'};
for(const [k,v] of Object.entries(up)) {
const col = REACT_COL_MAP[k];
if(col) sh.getRange(idx+1, col).setValue(v);
}
return {ok:true, success: true, message: 'Updated successfully'};
}
function handleRegistrationAction(data) {
try {
console.log("Incoming Data:", JSON.stringify(data));
const sh = openSheetStrict_();
const headers = FULL_HEADERS_100;
const row = headers.map(h => {
if(!h) return '';
if(h === 'Timestamp') return new Date();
if(h === 'Action') return data['Action'] || 'Pending';
if(h === 'বাংলায় সম্পূর্ণ নাম') return data['বাংলায় সম্পূর্ণ নাম'] || data['bengaliName'] || '';
if(h === 'Evaluation Shift') return data['Evaluation Shift'] || '';
return data[h] || '';
});
sh.appendRow(row);
return {success:true, ok: true, message: 'Registered successfully'};
} catch(e) { return {success:false, error: e.message}; }
}
function getFilterOptionsFast() {
const d = openSheetStrict_().getDataRange().getDisplayValues().slice(1);
const inst = new Set(), dept = new Set(), batch = new Set();
d.forEach(r => {
if(r[COL.INST]) inst.add(r[COL.INST]);
if(r[COL.DEPT]) dept.add(r[COL.DEPT]);
if(r[COL.BATCH]) batch.add(r[COL.BATCH]);
});
return { success: true, institutes: Array.from(inst).sort(), departments: Array.from(dept).sort(), batches: Array.from(batch).sort(), allow: ALLOW };
}
function getFilteredDataFast(f, p, ps) {
const d = openSheetStrict_().getDataRange().getDisplayValues().slice(1);
let rows = d;
if(f) {
if(f.institute && f.institute.length) rows = rows.filter(r => f.institute.includes(r[COL.INST]));
if(f.department && f.department.length) rows = rows.filter(r => f.department.includes(r[COL.DEPT]));
if(f.batch && f.batch.length) rows = rows.filter(r => f.batch.includes(r[COL.BATCH]));
}
const start = ((p || 1)-1)*(ps || 100);
return { success: true, rows: rows.slice(start, start+(ps || 100)), total: rows.length };
}
function openSheetStrict_() {
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
const sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
if(sh.getLastRow() === 0) sh.getRange(1, 1, 1, 100).setValues([FULL_HEADERS_100]);
return sh;
}
function cleanMobile_(v) { return String(v || '').replace(/\D/g, '').slice(-11); }
