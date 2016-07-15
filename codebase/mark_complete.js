//======================
//Mark events complete
//======================

function mark_complete(id){
			eventObj = scheduler.getEvent(id);
			startdate = eventObj.start_date;
			enddate = eventObj.end_date;
			pickup = eventObj.pickup;
			destination = eventObj.destination;
			transtime = eventObj.transtime;
			type = eventObj.type;
			unit = eventObj.unit_id;
			  
			
			if(eventObj.complete == "0"){
				scheduler.getEvent(eventObj.id).complete="1";
				scheduler.updateEvent(eventObj.id,{start_date: startdate, end_date: enddate, pickup: pickup, destination: destination, transtime: transtime, type: type, unit_id: unit, complete:"1"});
				scheduler.callEvent("onEventChanged", [eventObj.id, eventObj]);
				scheduler.updateView();
				 return true;
				}
			else{
				scheduler.getEvent(eventObj.id).complete="0";
				scheduler.updateEvent(eventObj.id,{start_date: startdate, end_date: enddate, pickup: pickup, destination: destination, transtime: transtime, type: type, unit_id: unit, complete:"0"});
				scheduler.callEvent("onEventChanged", [eventObj.id, eventObj]);
				scheduler.updateView();
				 return true;
				}
				
		}		