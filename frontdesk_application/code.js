function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Student Attendance')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Get unique courses from "sales history link"
function getCourses() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('sales history link');
  if (!sh) throw new Error('Sheet "sales history link" missing!');

  const data = sh.getDataRange().getValues();
  const headers = data.shift();
  const colCourse = headers.indexOf('Course');
  if (colCourse === -1) throw new Error('Column "Course" missing in sales history link');

  const courses = [...new Set(data.map(r => r[colCourse]).filter(Boolean))];
  return courses.sort();
}

// Get students by course
function getStudentsByCourse(course) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('sales history link');
  if (!sh) throw new Error('Sheet "sales history link" missing!');

  const data = sh.getDataRange().getValues();
  const headers = data.shift();

  const map = {};
  headers.forEach((h, i) => map[h] = i);

  const required = ['ID','Name','Email','Phone','Course'];
  required.forEach(r => { if (!(r in map)) throw new Error(`Missing column ${r}`); });

  return data
    .filter(r => r[map['Course']] === course)
    .map(r => ({
      ID: r[map['ID']],
      Name: r[map['Name']],
      Email: r[map['Email']],
      Phone: r[map['Phone']],
      Course: r[map['Course']]
    }));
}

// Get employee list (TA names) from Data Type sheet column B
function getEmployeeList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('Data Type');
  if (!sh) throw new Error('Sheet "Data Type" missing!');

  const data = sh.getRange("B2:B").getValues().flat().filter(Boolean);
  return data;
}

// Save attendance
function saveAttendance(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('attendance record') || ss.insertSheet('attendance record');

  // Ensure headers
  const headers = [
    "Session Date","Course","Student ID","Name","Email","Phone",
    "Attendance","Remark","Marked By (TA)","System User","Timestamp"
  ];
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
  }

  const { sessionDate, course, taName, records } = payload;
  if (!sessionDate || !course || !records || !taName) throw new Error("Missing fields in payload");

  const data = sh.getDataRange().getValues();
  const existing = {};
  data.slice(1).forEach(row => {
    const key = [row[0], row[1], row[2]].join('|'); // SessionDate|Course|StudentID
    existing[key] = true;
  });

  records.forEach(stu => {
    const key = [sessionDate, course, stu.ID].join('|');
    const row = [
      sessionDate,
      course,
      stu.ID,
      stu.Name,
      stu.Email,
      stu.Phone,
      stu.Attendance,
      stu.Remark,
      taName,
      Session.getActiveUser().getEmail(), // System user email
      new Date()
    ];

    if (!existing[key]) {
      sh.appendRow(row);
    } else {
      // update existing row
      const range = sh.getDataRange();
      const values = range.getValues();
      for (let i = 1; i < values.length; i++) {
        const r = values[i];
        const k = [r[0], r[1], r[2]].join('|');
        if (k === key) {
          sh.getRange(i+1, 7).setValue(stu.Attendance);
          sh.getRange(i+1, 8).setValue(stu.Remark);
          sh.getRange(i+1, 9).setValue(taName);
          sh.getRange(i+1, 10).setValue(Session.getActiveUser().getEmail());
          sh.getRange(i+1, 11).setValue(new Date());
          break;
        }
      }
    }
  });

  return true;
}
