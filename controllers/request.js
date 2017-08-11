const express = require('express');
const api = express.Router();
const https = require('https');
const http = require("http");
const session = require('express-session');
const mailgun = require('mailgun-js');
var moment = require('moment-timezone');
var xl = require('./Excel');

api.all('/', function (req, res) {
    var enrollments = [];	        /*to hold enrollments warnings*/
    var users = [];		            /*to hold users warnings*/
    var status = [];	            /*to hold section warnings*/
    var courses = [];	            /*to hold courses warnings*/
    var fail = false;		        /* to know it there are any errors */
    var errors = [];		        /* to hold errors*/
    var startdate;		            /*to hold start date of new files ike accounts term etc*/
    var enddate;		            /*to hold end date of new file */
    var file = '';		            /* to hold the name of the new file*/
    var filewarning = [];	        /* to hold warnings of new file */
    var coursetime = true;      	/* acts like flag for course start time*/
    var enrollmentstime = true; 	/* acts like flag for enrollments start time*/
    var usertime = true;        	/* acts like flag for user start time*/
    var sectionstime = true;	    /* acts like flag for  section time*/
    var coursewarning = true;	    /* acts like flag for course warnings*/
    var enrollmentwarning = true;	/* acts like flag for enrollments warnings*/
    var userwarning = true;	        /* acts like flag for user warnings*/
    var sectionwarning = true;	    /* acts like flag for section warnings*/

    var options2 = {
        host: '//host ',
        path: '//path'

    };
    var json_data = ""; /* json_data will hold the json data*/
    var callback2 = function (response2) {
        response2.on('data', function (chunk) {
            json_data += chunk;


        });
        response2.on('end', function () {
            json_data = JSON.parse(json_data);


            for (var i = 0; i < json_data.sis_imports.length; i++) {


                //we are storing the data about number of files updated and exporting it to view 

                //retreiving start and end date from JSON if there is a error
                startdate = String(json_data.sis_imports[i].started_at);
                enddate = String(json_data.sis_imports[i].ended_at);
 

                var zone = "America/Chicago";
                startdate = moment.tz(startdate, zone).format();
                startdate = startdate.substring(0, startdate.indexOf('-05'));
                enddate = moment.tz(enddate, zone).format();
                enddate = enddate.substring(0, enddate.indexOf('-05'));

               

                // this condition will execute when the 1st batch has errors, this will get all the warnings and store in errors array 
                if (json_data.sis_imports[i].workflow_state === "failed_with_messages") {
                    
                   var recordCount = {
                    countusers: json_data.sis_imports[i].data.counts.users,
                    countcourses: json_data.sis_imports[i].data.counts.courses,
                    countenrollments: json_data.sis_imports[i].data.counts.enrollments,
                    countsection: json_data.sis_imports[i].data.counts.sections
                }

                    fail = true;

                    errors = json_data.sis_imports[i].processing_errors.slice(0);
                    break;
                }

                //If the uploaded file is not a courses users enrollements and sections file this code executes 
                if (json_data.sis_imports[i].data.supplied_batches[0] != "enrollment" && json_data.sis_imports[i].data.supplied_batches[0] != "course" && json_data.sis_imports[i].data.supplied_batches[0] != "user" && json_data.sis_imports[i].data.supplied_batches[0] != "section") {
                    // to the the new file name
                    file = json_data.sis_imports[i].data.supplied_batches;
                    //if it has warnings this contidion will execute and store warnings in filewarning array
                    if (json_data.sis_imports[i].workflow_state === "imported_with_messages")
                        filewarning = ((json_data.sis_imports[i].processing_warnings).slice(0))
var recordCount = {
                    countusers: json_data.sis_imports[i].data.counts.users,
                    countcourses: json_data.sis_imports[i].data.counts.courses,
                    countenrollments: json_data.sis_imports[i].data.counts.enrollments,
                    countsection: json_data.sis_imports[i].data.counts.sections
                }

                    break;
                }

                // this condition will execute when there are no warnings or errors in first bath and it will set the warnings flag of all files present in this batch
                if (json_data.sis_imports[i].workflow_state == "imported") {

var recordCount = {
                    countusers: json_data.sis_imports[i].data.counts.users,
                    countcourses: json_data.sis_imports[i].data.counts.courses,
                    countenrollments: json_data.sis_imports[i].data.counts.enrollments,
                    countsection: json_data.sis_imports[i].data.counts.sections
                }
                    for (var j = 0; json_data.sis_imports[i].data.supplied_batches.length > j; j++) {
                        if (json_data.sis_imports[i].data.supplied_batches[j] == "enrollment")
                            enrollmentwarning = false;
                        if (json_data.sis_imports[i].data.supplied_batches[j] == "course") {
                            coursewarning = false

                        }
                        if (json_data.sis_imports[i].data.supplied_batches[j] == "section")
                            sectionwarning = false;
                        if (json_data.sis_imports[i].data.supplied_batches[j] == "user")
                            userwarning = false;

                    }

                }

                //If the latest batch has warnings in it this code will be executed and store the warnings in respected array
                if (json_data.sis_imports[i].workflow_state == "imported_with_messages") {

                     var recordCount = {
                    countusers: json_data.sis_imports[i].data.counts.users,
                    countcourses: json_data.sis_imports[i].data.counts.courses,
                    countenrollments: json_data.sis_imports[i].data.counts.enrollments,
                    countsection: json_data.sis_imports[i].data.counts.sections
                }

                    //If the latest batch has only single file in it this code will be executed
                    if (json_data.sis_imports[i].data.supplied_batches.length === 1) {

                        // temp1 is the JSON object it contais data about fine name like courses or users etc    
                        var temp1 = {
                            supplied_batches: json_data.sis_imports[i].data.supplied_batches
                        }


                        if (temp1.supplied_batches == "enrollment")
                            enrollments = ((json_data.sis_imports[i].processing_warnings).slice(0));
                        if (temp1.supplied_batches == "course") {

                            courses = (json_data.sis_imports[i].processing_warnings).slice(0);
                        }
                        if (temp1.supplied_batches == "section")
                            status = (json_data.sis_imports[i].processing_warnings).slice(0)
                        if (temp1.supplied_batches == "user")
                            users = (json_data.sis_imports[i].processing_warnings).slice(0)



                    }
                    //If the uploaded batch has multiple files "else" will be executed and stores warnings in there relative array 
                    else {
                        for (j = 0; j < json_data.sis_imports[i].processing_warnings.length; j++)
                            for (k = 0; k < json_data.sis_imports[i].processing_warnings[j].length; k++)

                                if (json_data.sis_imports[i].processing_warnings.length > 0) {
                                    if (json_data.sis_imports[i].processing_warnings[j][k] === "enrollments.csv") {

                                        enrollments.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                        k = k + 1;
                                    }
                                    if (json_data.sis_imports[i].processing_warnings[j][k] === "courses.csv") {

                                        courses.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                        k = k + 1;
                                    }
                                    if (json_data.sis_imports[i].processing_warnings[j][k] === "users.csv") {
                                        users.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                        k = k + 1;
                                    }

                                    if (json_data.sis_imports[i].processing_warnings[j][k] === "sections.csv") {

                                        status.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                        k = k + 1;
                                    }
                                }
                    }

                    // this part will set flag of any file warnings to false if they have warnings loaded into them
                    if (enrollments.length > 0)
                        enrollmentwarning = false;

                    if (status.length > 0)
                        sectionwarning = false;

                    if (users.length > 0)
                        userwarning = false;

                    if (courses.length > 0)
                        coursewarning = false;

                }

                break;
            }

            //These variables are used to store start and end time of four files 
            var timeenrollment = '__';
            var endenrollment = '__';
            var timecourse = '__';
            var endcourse = '__';
            var timesection = '__';
            var endsection = '__';
            var timeuser = '__';
            var enduser = '__';

            //this for loop is used to get data about start time end time and warnings from all batches 
            for (var i = 0; i < json_data.sis_imports.length; i++) {
                // if there are errors in one batch we can skip it as there is no information in it 
                if (json_data.sis_imports[i].workflow_state === "failed_with_messages")
                    continue;

                else {
                    //the number of times this loop will iterate is equal to the number of files in each batch
                    for (var j = 0; j < json_data.sis_imports[i].data.supplied_batches.length; j++) {

                        //in the below lines of code we find the file name in batch and find it start and end time and set it time flag to "false"
                        if (json_data.sis_imports[i].data.supplied_batches[j] == "enrollment" && enrollmentstime == true) {
                            var timeenrollment = xl.start(json_data.sis_imports[i].created_at);
                            var endenrollment = xl.end(json_data.sis_imports[i].ended_at);
                            enrollmentstime = false;
                        }

                        if (json_data.sis_imports[i].data.supplied_batches[j] == "course" && coursetime == true) {

                            var timecourse = xl.start(json_data.sis_imports[i].created_at);
                            var endcourse = xl.end(json_data.sis_imports[i].ended_at);
                            coursetime = false;
                        }

                        if (json_data.sis_imports[i].data.supplied_batches[j] == "section" && sectionstime == true) {

                            var timesection = xl.start(json_data.sis_imports[i].created_at);
                            var endsection = xl.end(json_data.sis_imports[i].ended_at);
                            sectionstime = false;
                        }

                        if (json_data.sis_imports[i].data.supplied_batches[j] == "user" && usertime == true) {

                            var timeuser = xl.start(json_data.sis_imports[i].created_at);
                            var enduser = xl.end(json_data.sis_imports[i].ended_at);
                            usertime = false;
                        }
                    }

                    // this condition will execute and find which files are there in batch with out any warnings
                    if (json_data.sis_imports[i].workflow_state == "imported") {
                        for (var j = 0; json_data.sis_imports[i].data.supplied_batches.length > j; j++) {
                            if (json_data.sis_imports[i].data.supplied_batches[j] == "enrollment")
                                enrollmentwarning = false;
                            if (json_data.sis_imports[i].data.supplied_batches[j] == "course") {
                                coursewarning = false
                            }
                            if (json_data.sis_imports[i].data.supplied_batches[j] == "section")
                                sectionwarning = false;
                            if (json_data.sis_imports[i].data.supplied_batches[j] == "user")
                                userwarning = false;
                        }
                    }
                    else {
                        //this code is used to get warnings from previous batches 
                        if (json_data.sis_imports[i].workflow_state == "imported_with_messages") {

                            if (json_data.sis_imports[i].data.supplied_batches.length === 1) {
                                var temp1 = {
                                    importID: json_data.sis_imports[i].id,
                                    supplied_batches: json_data.sis_imports[i].data.supplied_batches
                                }

                                if (temp1.supplied_batches == "enrollment" && enrollmentwarning == true)
                                    enrollments = ((json_data.sis_imports[i].processing_warnings).slice(0));
                                if (temp1.supplied_batches == "course" && coursewarning == true) {

                                    courses = (json_data.sis_imports[i].processing_warnings).slice(0);
                                }
                                if (temp1.supplied_batches == "section" && sectionwarning == true)
                                    status = (json_data.sis_imports[i].processing_warnings).slice(0)
                                if (temp1.supplied_batches == "user" && userwarning == true)
                                    users = (json_data.sis_imports[i].processing_warnings).slice(0)
                            }

                            else {
                                for (j = 0; j < json_data.sis_imports[i].processing_warnings.length; j++)
                                    for (k = 0; k < json_data.sis_imports[i].processing_warnings[j].length; k++)

                                        if (json_data.sis_imports[i].processing_warnings.length > 0) {
                                            if (json_data.sis_imports[i].processing_warnings[j][k] === "enrollments.csv" && enrollmentwarning == true) {
                                                enrollments.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                                k = k + 1;
                                            }
                                            if (json_data.sis_imports[i].processing_warnings[j][k] === "courses.csv" && coursewarning == true) {
                                                courses.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                                k = k + 1;
                                            }
                                            if (json_data.sis_imports[i].processing_warnings[j][k] === "users.csv" && userwarning == true) {
                                                users.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                                k = k + 1;
                                            }
                                            if (json_data.sis_imports[i].processing_warnings[j][k] === "sections.csv" && sectionwarning == true) {
                                                status.push(json_data.sis_imports[i].processing_warnings[j][k + 1])

                                                k = k + 1;
                                            }
                                        }
                            }

                            //setting warnings flags if files have warnings in them 
                            if (enrollments.length > 0)
                                enrollmentwarning = false;

                            if (status.length > 0)
                                sectionwarning = false;

                            if (users.length > 0)
                                userwarning = false;

                            if (courses.length > 0)
                                coursewarning = false;
                        }
                    }
                }
            }

            //JSON object to hold time of all four files 
            var time = {
                timeenrollment: timeenrollment,
                endenrollment: endenrollment,
                timecourse: timecourse,
                endcourse: endcourse,
                timesection: timesection,
                endsection: endsection,
                timeuser: timeuser,
                enduser: enduser
            }

            //Here we are using mailgun, a node module to send email. The for loop iterates through the json data and checks if there are any warnings 
            //if there are any, it adds to the body. Subject is the subject and text is the body of the email api_key and domain are generated by mailgun  
            for (var i = 0; i < json_data.sis_imports.length; i++) {
                if (json_data.sis_imports[i].workflow_state === "imported_with_messages") {
                    var api_key = '//api_key';
                    var domain = '//domain';
                    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
                    var data = {
                        from: 'SIS import dashboard <postmaster@sandbox5bab74a21d8b456c94011e161b058a0a.mailgun.org>',
                        to: '//to mail',
                        subject: 'Warnings !',
                        text: String(enrollments) + String(users) + String(status) + String(courses)
                    };
                }
            }

            //getting the system date and time
            var todays_date = new Date();
            var todays_day = todays_date.getDay();
            var current_minute = todays_date.getMinutes();
            var current_hour = todays_date.getHours();
            var stored_hour=current_hour;
            var stored_excel = 'admindashboard_assets/backup.xlsx';
            var Warnings_and_logs = 'admindashboard_assets/SIS_ImportLogs.xlsx';
            
            //Intially one excel sheet is required. So we place a empty excel sheet and name it  backup.xlsx
            //localStorage.getItem('//key') calls the value assosiated with key
            //localStorage.setItem('//key',value) sets the value and key
            //localStorage.removeItem('//key') removes the value assosiated with key
            //using 'node-local storage', a node module to store a values on server
            if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                var localStorage = new LocalStorage('./scratch');
            }
            //this code runs second minute of every hour 
              var z = current_hour * 60;
              localStorage.setItem(z, z);
            if (current_minute == 6) {
                function increment_counter() {
                    //var z = stored_hour * 60;
                    //localStorage.setItem(z, z);
                    // Each time the function runs the increased value is stored into 'e' 
                    //if (current_hour!=00||current_hour!=0) {
                         var hour_23=23*60;
                         var hour_22=22*60;
                         //As we are using 24 hours clock thos code is needed for hhour:00
                        if (stored_hour==0||stored_hour==00) {
                           
                         if ( localStorage.getItem((hour_23)==null)) {
                            
                                          localStorage.setItem('e', 1);  
                                          }
                                          localStorage.removeItem(hour_22);
                                            }
                                        //As we are using 24 hours clock this code is needed for hour:01
                                 if (stored_hour==1||stored_hour==01) {
                                     localStorage.removeItem(hour_23);
                                    
                                }           

                          if (stored_hour!=00||stored_hour!=0) {
                          
                    if (localStorage.getItem((current_hour - 1) * 60) == null) {
                        localStorage.setItem('e', 1);
                    }
                                        }   
                    var mm = localStorage.getItem('e');
                    console.log("testing value before increasing",mm);
                    var mm1 = mm++;
                    console.log("testing mm1 mm1 m1111111111111111111",mm1);
                    localStorage.setItem('e', mm1 + 1);
                    console.log("testing function", localStorage.getItem('e'));
                    var returned_value = localStorage.getItem('e');
                    return returned_value;
                localStorage.removeItem((current_hour-2)*60);
                }
                 var increased_value = increment_counter();
                 console.log("increased value test",increased_value);
                    //mm and mm1 are temporary variables
                //the returned value is stored in the variable 'increased_value'
            }
            //testing if the value obtained from the function xop is odd or even so we can choose the excel file we want to write to 
            if (increased_value%2 == 1) {
                console.log("a/2=1 test", increased_value % 2);
                stored_excel = 'admindashboard_assets/backup.xlsx';
                Warnings_and_logs = 'admindashboard_assets/SIS_ImportLogs.xlsx';
            }

            if (increased_value%2 == 0) {
                console.log("a/2=1 test", increased_value % 2);
                stored_excel = 'admindashboard_assets/SIS_ImportLogs.xlsx';
                Warnings_and_logs = 'admindashboard_assets/backup.xlsx';
            } 
           
            //exceljs a node module we use to write to excel sheet
            var excel = require("exceljs");
            workbook = new excel.Workbook();
           
            //read a file 
            workbook.xlsx.readFile(stored_excel)
                .then(function () {
                    //Get the worksheet you want to write to 
                    var worksheet = workbook.getWorksheet(2);
                    var first_worksheet = workbook.getWorksheet(1);
                    
                    //From the worksheet,get the row you want to write to 
                    var summary_column_header = worksheet.getRow(1);

                    //Coloumns we need 
                    summary_column_header.getCell(1).value = 'Errors in Users';
                    summary_column_header.getCell(2).value = 'Errors in Courses';
                    summary_column_header.getCell(3).value = 'Errors in Sections';
                    summary_column_header.getCell(4).value = 'Errors in Enrollments';
                    summary_column_header.getCell(5).value = 'Canvas ID';
                    var summary_cell = worksheet.getRow(increased_value);
                    var logs_cell = first_worksheet.getRow(increased_value);

                    //To refresh the excel sheet for every 30 days we use the following code/
                    //localStorage.setItem(current_minute, current_minute);
                   // console.log("testing in console", localStorage.getItem(current_minute));
                    //console.log("testing in real console", localStorage.getItem(current_minute - 1));

                    //For the first time it runs on first day of every month this code claers the excel sheet so that it can add new data 
                    
                        
                        if (current_hour==0||current_hour==00) {
                            localStorage.removeItem(22); 
                            stored_hour=24;
                        }

                        if (current_hour==1||current_hour==01) {
                            localStorage.removeItem(23);
                        }  
                            if (todays_day == 1) {
                                localStorage.setItem(current_hour, current_hour);
                        if (localStorage.getItem(stored_hour - 1) == null) {
                            console.log("testing no 1 in if passed");
                            var stored_value = localStorage.getItem('e');
                            for (var i = stored_value; i > 1; i--) {
                                summary_cell = worksheet.getRow(i);
                                for (var i1 = 1; i1 < 6; i1++) {
                                    summary_cell.getCell(i1).value = '';
                                }
                                var reset = localStorage.getItem('e');
                                reset--;
                                localStorage.setItem('e', reset);
                            }

                            for (var i = stored_value; i > 2; i--) {
                                logs_cell = first_worksheet.getRow(i);
                                for (var i1 = 1; i1 < 13; i1++) {
                                    logs_cell.getCell(i1).value = '';
                                }
                            }
                        }
                    
                        else {
                            localStorage.removeItem(stored_hour - 2);
                        }
                    }

                    //appending the warings to calls of excel sheet
                    summary_cell.getCell(1).value = String(users);
                    summary_cell.getCell(2).value = String(courses);
                    summary_cell.getCell(3).value = String(status);
                    summary_cell.getCell(4).value = String(enrollments);
                    summary_cell.getCell(5).value = String(json_data.sis_imports[1].id);
                    var first_worksheet = workbook.getWorksheet(1);

                    //coloumn headings of second sheet in workbook.
                    var logs_coloumn_headers = first_worksheet.getRow(1);
                    logs_coloumn_headers.getCell(1).value = 'CanvasID';
                    logs_coloumn_headers.getCell(2).value = 'Created_At';
                    logs_coloumn_headers.getCell(3).value = 'Started_At';
                    logs_coloumn_headers.getCell(4).value = 'Updated_At';
                    logs_coloumn_headers.getCell(5).value = 'Ended_At';
                    logs_coloumn_headers.getCell(6).value = 'WorkFlow_State';
                    logs_coloumn_headers.getCell(7).value = '%_Completed';
                    logs_coloumn_headers.getCell(8).value = 'Users';
                    logs_coloumn_headers.getCell(9).value = 'Courses';
                    logs_coloumn_headers.getCell(10).value = 'Sections';
                    logs_coloumn_headers.getCell(11).value = 'Enrollments';

                    logs_cell.getCell(1).value = String(json_data.sis_imports[1].id);
                    logs_cell.getCell(2).value = String(json_data.sis_imports[1].created_at);
                    logs_cell.getCell(3).value = String(json_data.sis_imports[1].started_at);
                    logs_cell.getCell(4).value = String(json_data.sis_imports[1].updated_at);
                    logs_cell.getCell(5).value = String(json_data.sis_imports[1].ended_at);
                    logs_cell.getCell(6).value = String(json_data.sis_imports[1].workflow_state);
                    logs_cell.getCell(7).value = String(json_data.sis_imports[1].progress);
                    logs_cell.getCell(8).value = String(json_data.sis_imports[1].data.counts.enrollments);
                    logs_cell.getCell(9).value = String(json_data.sis_imports[1].data.counts.courses);
                    logs_cell.getCell(10).value = String(json_data.sis_imports[1].data.counts.users);
                    logs_cell.getCell(11).value = String(json_data.sis_imports[1].data.counts.sections);

                    //this code saves all the modifications
                    summary_column_header.commit();
                    summary_cell.commit();
                    logs_coloumn_headers.commit();
                    logs_cell.commit();
                    return workbook.xlsx.writeFile(Warnings_and_logs);
                })


      //As we are swapping the excel sheets each time the function starts for the download button to have the most recent one we do the following code
                // var excel = require("exceljs");       
                // if (increased_value%2==0) {                              
                //     var workbook_final = new excel.Workbook();
                //      workbook_final.xlsx.readFile('admindashboard_assets/SIS_ImportLogs.xlsx')
                //  .then(function() {
                //     return workbook_final.xlsx.writeFile('admindashboard_assets/backup.xlsx');
                // }) 
                //           }

            var rses = String(enrollments);

            res.render("index", { time: time, fail: fail, enrollmentsname: enrollments, courses: courses, users: users, section: status, recordCount: recordCount, errors: errors, startdate: startdate, enddate: enddate, file: file, filewarning: filewarning });
        });
    }
    var tempReq2 = https.request(options2, callback2);
    tempReq2.end();

});
module.exports = api;
