function padToTwo(number) {
  if (number<=9) { number = ("0"+number).slice(-2); }
  return number;
}


function eXcell_timeselector(cell){                  // excell name is defined here
    if (cell){                                 // default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.setValue=function(val){
        this.setCValue(val);                                     
    }
    this.getValue=function(){
        return this.cell.innerHTML; // get value
    }
    this.edit=function(){
		var hours;
		var minutes;
		var seconds;
		h=0;
		m=0;
		s=0;
		while(h<25) {
			hours+= "<option value='"+padToTwo(h)+"'>"+padToTwo(h)+"</option>";
			h++;			
		}
		if(hours<10) hours="0"+hours;
		while(m<60) {
			minutes+= "<option value='"+padToTwo(m)+"'>"+padToTwo(m)+"</option>";
			m++;
		}
		while(s<60) {
			seconds+= "<option value='"+padToTwo(s)+"'>"+padToTwo(s)+"</option>";
			s++;
		}
				
        this.val = this.getValue(); // save current value
        this.cell.innerHTML = "<select style='width:50px;'>"+hours+"</select>"
        + "<select style='width:50px;'>"+minutes+"</select>"
		+"<select style='width:50px;'>"+seconds+"</select>"; // editor's html
          // blocks onclick event
          this.cell.childNodes[0].onclick=function(e){ (e||event).cancelBubble=true;} 
          this.cell.childNodes[1].onclick=function(e){ (e||event).cancelBubble=true;}
		  this.cell.childNodes[2].onclick=function(e){ (e||event).cancelBubble=true;} 
    }
    this.detach=function(){
          // sets the new value
          this.setValue(this.cell.childNodes[0].value+":"+this.cell.childNodes[1].value+":"+this.cell.childNodes[2].value); 
          return this.val!=this.getValue(); // compares the new and the old values
    }
}
eXcell_timeselector.prototype = new eXcell;    // nests all other methods from base class