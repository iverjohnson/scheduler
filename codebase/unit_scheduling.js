//convert times from HH:MM:SS to decimal number
function convertTimes(starttime,endtime){
	arr = starttime.split(':');
	var startHour = parseInt(arr[0]);
	var startMinutes = parseInt(arr[1]);
	var startMinutesDecimal = startMinutes/60;
	var newStart = (startHour+startMinutesDecimal)*60;
	arr2 = endtime.split(':');
	var endHour = parseInt(arr2[0]);
	var endMinutes = parseInt(arr2[1]);
	var endMinutesDecimal = endMinutes/60;
	var newEnd = (endHour+endMinutesDecimal)*60;
	var newTimes = [newStart,newEnd];
	return newTimes;
}
	

//Find "off days" (days not in work days array)
function diff(a1, a2) {
  return a1.concat(a2).filter(function(val, index, arr){
    return arr.indexOf(val) === arr.lastIndexOf(val);
  });
}

//called when checkbox is clicked on unit, marks unit out of service or back in service
function markOos(unitid){
		var unit = scheduler.getSection(unitid);
		var formatFunc = scheduler.date.date_to_str("%Y-%m-%d");
		var oos_date = formatFunc(scheduler._date);
		
		if(unit.oos == "0"){
			
			window.dhx.ajax.post("./codebase/units_select.php","action=Update&id="+unitid+"&oos=1");
			//window.dhx.ajax.post("./codebase/units_select.php","action=Insert&id="+unitid+"&oos_date="+oos_date);
			/*setTimeout(function(){
				location.reload();
					},1000);*/
		}
		else{
			window.dhx.ajax.post("./codebase/units_select.php","action=Update&id="+unitid+"&oos=0");
			setTimeout(function(){
				location.reload();
					},1000);
		}
}
