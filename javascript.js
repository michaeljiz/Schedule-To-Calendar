


var Classes = [];
function Parse(txt)
{

	var ii;
	var jj;
	if(txt.innerHTML.trim() != "&nbsp;" && $(txt).find('b').length != 0)
	{
		
		
		//console.log(txt);
		var x = $(txt).find('b')[0].nextSibling;
		//console.log(x);
		var y = $(txt).find('b')[1].nextSibling;
		//console.log(y);
		var z = $(txt).find('br')[0].nextSibling;
		//console.log(z);
		var w = $(txt).find('br')[2].nextSibling;
		//console.log(w);

		x = x.textContent.trim();
		y = y.textContent.trim();
		z = z.textContent.trim();
		w = w.textContent.trim();
		
	}

	return new Class(x,y,z,w);
	
}

function Class (starttime, endtime, name, loc)
{
	this.StartTime = starttime;
	this.EndTime = endtime;
	this.Name = name;
	this.location = loc;
}
var rows;
var Table;
function Load()
{
	Table = $('table').children();
	rows = Table.children(); //An array of rows contaning columns
	for(var ii = 0; ii < rows.length ; ++ii)
	{
		var columns = rows[ii].children;
		for(var jj = 0; jj< columns.length; ++jj)
			
		{
		
			Classes.push(Parse(columns[jj]));
		}
	}
}


$(document).ready( Load );