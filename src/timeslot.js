/**
 *	This code provides the functions that will accept Timeslot objects, connect with
 *	Google Calendar API, create a new Calendar, and import the timeslots into the
 *	new Google Calendar.
 *	
**/



/**
 * Creates a timeslot object given startTime, endTime, name, location.
 */
function timeslot( startTime, endTime, name, location ) {
	x = {
		'startTime': startTime,
		'endTime': endTime,
		'name': name,
		'location': location
	}
	
	return x;
}


/**
	Adds a new calendar.
	
	name is the name of the calendar
	remindMethod is the reminder method for the calendar, options are: "email", "sms", "popup" -- see https://developers.google.com/google-apps/calendar/v3/reference/calendarList/insert
	remindMinutes is the number of minutes before the start of the event that the reminder should be triggered.
	remindEmail is the email which reminders will be sent to if remindMethod is set to "email"
	timeslots is an array of timeslot objects.
**/
function addNewCalendar( name, timeslots, remindMethod, remindMinutes, remindEmail ) {

	// Create a new calendar request
	var request = gapi.client.request({
	
		'path': 'https://www.googleapis.com/calendar/v3/calendars',
		'method': 'post',
		'body': {
			'summary': name
		}
	});
	
	// Create the new calendar, then on the callback..
	request.execute( function( response ){
	
		if( response.status == 200 ) {
			
			var id = response.id;
			
			console.log( "Calendar '" + name + "' added with id " + id );
		
			// Iterate through all timeslots
			// Create new event for each.
			for( timeslot in timeslots ) {
			
				// Create URL
				var url = "https://www.googleapis.com/calendar/v3/calendars/" + id + "/events";
			
				// Add new event for timeslot
				var timeslotRequest = gapi.client.request({
				
					'path': url,
					'method': 'post',
					'body': {
						'start': {
							'dateTime': timeslot.startTime
						},
						'end': {
							'dateTime': timeslot.endTime
						},
						'summary': timeslot.name,
						'location': timeslot.location,
						'attendees': [
							{
								'email': remindEmail
							}
						],
						'reminders': {
							'overrides': [
								{
									'method': remindMethod,
									'minutes': remindMinutes
								}
							]
						}
					}
				});
				
				// Perform the request
				timeslotRequest.execute( function( response2 ) {
				
				});
			}
		} else {
			// Couldn't contact....
		};
	});
}




/**function addToGoogle() {
	
	var clientId = '1000599483308.apps.googleusercontent.com';
	var apiKey = 'AIzaSyAkIyqo8PebedO89oCV5UyZHc_pJ0e7aKs';
	var scopes = 'https://www.googleapis.com/auth/calendar';
	
	function handleClientLoad() {
		gapi.client.setApiKey(apiKey);
		window.setTimeout(checkAuth,1);
	}

	function checkAuth() {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
	}
	
	function handleAuthResult() {
		alert( "HELLO" );
	}
	
	checkAuth();
	
}