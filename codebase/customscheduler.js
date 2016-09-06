//======================
//Create Scheduler
//======================
		
function init() {

//=====================
//Menu
//=====================

	var mainMenu;
	mainMenu = new dhtmlXMenuObject("menuID");	
	mainMenu.addNewSibling(null, 1, "Scheduling");
		mainMenu.setHref(1,"./medkab.html");
	mainMenu.addNewSibling(1, 2, "Manage Units");
		mainMenu.setHref(2,"./manage_units.html");
	mainMenu.addNewSibling(2, 3, "Manage Units Types");
		mainMenu.setHref(3,"./manage_unit_types.html");
	mainMenu.addNewSibling(3,4,"Manage Event Types");
		mainMenu.setHref(4,"./manage_event_types.html");
	mainMenu.addNewSibling(4,5,"Manage Facilities");
		mainMenu.setHref(5,"./manage_facilities.html");
	
//====================
//Event Appearance
//====================
		
	//event coloration based on event type
	scheduler.templates.event_class=function(start, end, event){
		var css = "";
		if(event.complete == "1"){ //changes event color if marked complete
			css += "event_complete ";}
		if(event.type){ // changes event color based on event type
			css += "event_"+event.type;}
		return css; // default return
	};
				
	//Set up event text and change color if completed
	scheduler.templates.event_bar_text = function(start,end,event){
		var checkedBox = "";
			if(event.complete == "1"){
				checkBox ="checked";}
				else{
				checkBox="";}
		var html = "<input type='checkbox' onclick='mark_complete("+event.id+");'"+checkBox+">";
			return html+scheduler.getLabel("pickup",event.pickup) + "<br/>" + scheduler.getLabel("destination",event.destination);
	};
		
	//Set up tooltips
	scheduler.templates.tooltip_text = function(start,end,ev){
		if (ev.pickup) {
			return "<b>Pickup:</b> "+scheduler.getLabel("pickup",ev.pickup)+"<br/><b>Destination:</b> " +  scheduler.getLabel("destination",ev.destination);
		}
	};
				
		
		
//===============
//Configuration
//===============	

		
		scheduler.locale.labels.timeline_tab = "Timeline";
		scheduler.locale.labels.section_custom="Unit";
		scheduler.config.details_on_create=true;
		scheduler.config.details_on_dblclick=true;
		scheduler.config.xml_date="%Y-%m-%d %H:%i:%s";
		scheduler.config.time_step=15;
		scheduler.config.ajax_error = "console";
		scheduler.config.show_loading = true;
		scheduler.config.prevent_cache = true;
		scheduler.config.container_autoresize = false;
		
		
		
		var elements = scheduler.serverList("units"); //get units from server
		var facilities = scheduler.serverList("facilities");  //get facilities from server
		var appointmenttype = scheduler.serverList("appointments");  //get event types from server
		var dstart = new Date();
			
		scheduler.createTimelineView({
			section_autoheight: true,
			name:	"timeline",
			x_unit:	"minute",
			x_date:	":%i",
			second_scale:{x_date:"%H", x_unit: "hour"}, //hours above minutes
			x_step:	15, //15 minute blocks
			x_size: 48,
			x_start: (dstart.getHours()*4)-8, //automatically forward the calendar view to now minus two hours
			x_length:5,
			y_unit: elements,
			y_property:	"unit_id",
			render: "tree",
			folder_events_available: true,
			event_dy:"full",
			dy:45,
			dx:70
		});
		
		
		
		//create units (sections)
		//var oosUnits = scheduler.serverList("oos");
		//console.log(oosUnits);
		scheduler.templates.timeline_scale_label = function(key, label, section){
			
			var unit = scheduler.getSection(key);
			if(unit.oos == "0"){ //if not OOS, don't check box
				var checked = "";
			}
			else {  //if OOS, check box and block timespan
				var checked = "checked";
				scheduler.addMarkedTimespan({days:new Date(),zones:"fullday", css: "pink", html:"<b> OUT OF SERVICE </>", type: "dhx_time_block", sections: {timeline:key}});
			}
				var unitHtml = "<input type='checkbox' onclick='markOos("+key+");'"+checked+">";
			return label + unitHtml;
}
			
	//===============
	//Lightbox and data
	//===============
		
		
		//Section labels	
		scheduler.locale.labels.section_pickup = "Pick-Up";
		scheduler.locale.labels.section_dropoff = "Drop-Off";
		scheduler.locale.labels.section_appttype = "Appointment Type";
		scheduler.locale.labels.section_transtime = "Tansport Time (in minutes)";
		scheduler.locale.labels.section_unit = "Unit";
		scheduler.locale.labels.section_complete = "Completed";
		scheduler.locale.labels.button_help="";
		
		//lightbox setup, shows complete
		scheduler.templates.lightbox_header = function(start, end, event){
			if(event.complete == "1"){
				return "Completed";
			}
			else {
			return "";
			}
		}
		
		//set up lightbox fields
		scheduler.config.lightbox.sections=[	
			{name:"pickup", height:40,options:facilities, map_to: "pickup", type: "combo", image_path: "codebase/common/dhtmlxCombo/imgs/", filtering: true, cache: true , focus: true, button:"help"},
			{name:"dropoff", height:40,options:facilities, map_to: "destination", type: "combo", image_path: "codebase/imgs_flat/", filtering: true,cache: true, button:"help"},
			{name:"appttype", height: 40, map_to:"type", type:"select",options:appointmenttype, button:"help"},
			{name:"transtime", height: 40, map_to:"transtime", type:"textarea",options:null, button:"help"},
			{name:"unit", height:30, type:"timeline", options:null , map_to:"unit_id" },
			//{name:"complete", height:30, map_to:"complete", type:"checkbox",button:"help", checked_value:"1", unchecked_value:"0"},
			{name:"time", height:72, type:"time", map_to:"auto"}
		];
		scheduler.form_blocks.textarea.button_click=function(index,button,shead,sbody){
			switch(index){
				case "3":
					dhtmlx.message({text:"Enter the transport time from CAD.<br/><br/> If the appointment type is Unavailable, Regions Outing, or Sentimental Journey, leave blank and set the end time in the Time Period section below", expire:100000});
					break;
			}
		}
		scheduler.form_blocks.select.button_click=function(index,button,shead,sbody){
			switch(index){
				case "2":
					dhtmlx.message({text:"Choose the appropriate type of appointment.", expire:100000});
					break;
			}
		}
		scheduler.form_blocks.combo.button_click=function(index,button,shead,sbody){
				dhtmlx.message({text:"Start typing the facility name, and select appropriate facility.<br/><br/>If no facility, enter the city name and select it.", expire:100000});
		}
		scheduler.form_blocks.checkbox.button_click=function(index,button,shead,sbody){
				dhtmlx.message({text:"Start typing the facility name, and select appropriate facility.<br/><br/>If no facility, enter the city name and select it.", expire:100000});
		}
		
		
		
		//set end date and time
		scheduler.attachEvent("onEventSave",function(id,ev, is_new){
			if(ev.type == 200||ev.type==201||ev.type==202||ev.type==207){
				var triptime = parseInt(ev.transtime)+38;
				var minutes = (parseInt((triptime/15))+1)*15;
				return ev.end_date = scheduler.date.add(ev.start_date, minutes, 'minute'); //updates end_date based on transport time, rounded up to the next 15 minutes
			} else {
				return ev.end_date; //returns set end date
			}
			
		});
				
		
		
		//DB based time blocking!!
		
		scheduler.attachEvent("onXLE", function (){
			for (var i = 0; i < elements.length; i++) {
				var alldays = [0,1,2,3,4,5,6];
				var start = elements[i].start_time;
				var end = elements[i].off_time;
				var workdays = elements[i].work_days.split(',').map(Number);
				var newTimes = convertTimes(start, end); //convert times to decimal
				//set work hours
				if(newTimes[0] < newTimes[1]){  //check for overnight
					var offDays = diff(workdays,alldays); 
					if(offDays.length != 0){ //if no days off there should be no blocking
						scheduler.addMarkedTimespan({days:[offDays], zones:"fullday", type: "dhx_time_block", sections:{timeline:elements[i].key}});
				} 
					scheduler.addMarkedTimespan({days:[workdays],zones:newTimes,invert_zones: true,type:"dhx_time_block",sections:{timeline:elements[i].key}});
				} else { //overnights
						var offDays = diff(workdays,alldays);
						
						if(offDays.length != 0){
							var b = offDays.indexOf(6);
							if(b != -1){
								var newOffDays = [0, offDays[0]+1];
							} else {
							var newOffDays = [offDays[0]+1, offDays[1]+1];
							}
						scheduler.addMarkedTimespan({days:[offDays], zones:[newTimes[1],1440], type: "dhx_time_block", sections:{timeline:elements[i].key}}); //blocking for off days
						scheduler.addMarkedTimespan({days:newOffDays, zones:[0,newTimes[1]], type: "dhx_time_block", sections:{timeline:elements[i].key}}); //blocking second part of off days
				} 
						
						scheduler.addMarkedTimespan({days:[workdays],zones:[0,newTimes[1],newTimes[0],1440],invert_zones: true,type:"dhx_time_block",sections:{timeline:elements[i].key}});
				}
			}
				scheduler.setCurrentView();
		});
					
		
				
		//init scheduler
		scheduler.init('scheduler_here',new Date(),"timeline");
		//load serverlists
		scheduler.load("codebase/events_tree_db.php");
		//connection to DB and init of connection
		var dp = new dataProcessor("codebase/events_tree_db.php");
		dp.init(scheduler);
		//dp.setAutoUpdate(12000);
	
		
	}
	
	
		//show's minical on page
		function show_minical(){
			if (scheduler.isCalendarVisible())
				scheduler.destroyCalendar();
			else
				scheduler.renderCalendar({
					position:"dhx_minical_icon",
					date:scheduler._date,
					navigation:true,
					handler:function(date,calendar){
						scheduler.setCurrentView(date);
						scheduler.destroyCalendar()
					}	
				});
		}
		

	