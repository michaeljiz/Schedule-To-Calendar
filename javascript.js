var Table = $('table').children();
var rows = Table.children(); //An array of rows contaning columns


var Classes = [];
function Parse(txt)
{


	return new Class(x,y,z);
}

function Class (starttime, endtime, name)
{
	this.StartTime = starttime;
	this.EndTime = endtime;
	this.Name = name;
}


for(var ii = 0; ii < rows.length ; ++ii)
{
	var columns = rows[ii].children;
	for(var jj = 0; jj< columns.length; ++jj)
	{
		Classes.push(Parse(columns[jj].innerHTML));
	}
}

