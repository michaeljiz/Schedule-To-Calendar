


	  // Setup the dnd listeners.
  var dropZone; 
var Classes = [];
function Parse(txt)
{

	
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
		console.log(x);
		console.log(y);
		console.log(z);
		console.log(w);
		return new Class(x,y,z,w);
	}

	
	return null;
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
	document.getElementById('drop_zone');
	dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
}

function StartParse()
{
	Table = $('table').children();
	rows = Table.children(); //An array of rows contaning columns
	for(var ii = 0; ii < rows.length ; ++ii)
	{
		var columns = rows[ii].children;
		for(var jj = 0; jj< columns.length; ++jj)
			
		{
			var t = Parse(columns[jj]);
			if(t != null)
				Classes.push(t);
		}
	}
}

$(document).ready( Load );


	
	function handleFileSelect(evt) 
	{
		evt.stopPropagation();
		evt.preventDefault();

		files = evt.dataTransfer.files; // FileList object.

		// files is a FileList of File objects. List some properties.
		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
		  console.log(f.name);
		}
		file = files[0];
		
		ReadFile(file);
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  var reader;
  function ReadFile(fileToRead)
  {
	reader = new FileReader();
	reader.readAsText(fileToRead);
	reader.onload = LoadFile;
  }
  
    function LoadFile()
  {
	var recTxt = reader.result	;
	$('#table_top').html(recTxt);
	StartParse();
  }