function markOos(unitid){
		unit = scheduler.getSection(unitid);
		if(unit.oos == "0"){
			window.dhx.ajax.post("./codebase/units_select.php","action=Update&id="+unitid+"&oos=1");
			}
		else{
			window.dhx.ajax.post("./codebase/units_select.php","action=Update&id="+unitid+"&oos=0");
			setTimeout(function(){
				location.reload();
					},1000);
		}
}

