//node module to set required time-zone and display on the dashboard
var moment = require('moment-timezone');

function starttime( startdate){
var zone = "America/Chicago";
     startdate=moment.tz(startdate, zone).format();
startdate=startdate.substring(0, startdate.indexOf('-05'));

return startdate;
}


function endtime( enddate){
    var zone = "America/Chicago";
     enddate=moment.tz(enddate, zone).format();
enddate=enddate.substring(0, enddate.indexOf('-05'));
return enddate;
        }

module.exports.start=starttime;
module.exports.end=endtime;
