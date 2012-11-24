


var Classes = [];
function Parse(txt)
{

	var ii;
	var jj;
	if(txt.innerHTML.trim() != "&nbsp;")
	{
		
		
		
		var x = $(txt).find('b')[0].nextSibbling;
		var y = $(txt).find('b')[1].nextSibbling;
		var z = $(txt).find('br')[0].nextSibbling;
		var w = $(txt).find('br')[2].nextSibbling;

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