/**
 *	This code provides the functions that will accept Timeslot objects, connect with
 *	Google Calendar API, create a new Calendar, and import the timeslots into the
 *	new Google Calendar.
 *	
**/



/**
	Creates a timeslot object given startTime, endTime, name, location.
	
	@param startTime A datetime representing the start of the timeslot
	@param endTime A datetime representing the end of a timeslot
	@param name The name of the event (timeslot label)
	@param location The location where the event will occur
	@return A timeslot object representing an event
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
	Creates a new calendar in Google Calendar and populates the calendar with events.
	
	@param name The name of the calendar
	@param remindMethod The reminder method for the calendar, options are: "email", "sms", "popup" -- see https://developers.google.com/google-apps/calendar/v3/reference/calendarList/insert
	@param remindMinutes The number of minutes before the start of the event that the reminder should be triggered.
	@param remindEmail The email which reminders will be sent to if remindMethod is set to "email"
	@param timeslots An array of timeslot objects
	@param endOfSemester A datetime representing the end of classes for the semester.  Used to mark the end of event recurrence

	Specifications for datetime can be found here: http://tools.ietf.org/html/rfc3339#section-5
**/
function addNewCalendar( name, timeslots, remindMethod, remindMinutes, remindEmail, endOfSemester ) {

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
			
			// Grab the id for the newly created valendar
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
						},
						
						// Recurrence rules according to iCalendar format
						// See http://googleappsdeveloper.blogspot.ca/2011/12/calendar-v3-best-practices-recurring.html for explanation
						// or http://tools.ietf.org/html/rfc5545#section-3.3.10 for RRULE specifications
						'recurrence': [
							"RRULE:FREQ=WEEKLY;UNTIL=" + endOfSemester
						]
					}
				});
				
				// Perform the request
				timeslotRequest.execute( function( response2 ) {
				
					if( response2.status == 200 ) {
					
						// Successfully added the event
						console.log( timeslot.name + " event added successfully." );
					} else {
						// Couldn't add event
						console.log( "Error adding event " + timeslot.name + "." );
						console.log( "HTTP Response Status: " + response2.status );
						console.log( "HTTP Response: " + response2 );
					}
				
				});
			}
		} else {
			// Couldn't add calendar
			console.log( "Error creating calendar." );
			console.log( "HTTP Response Status: " + response.status );
		};
	});
}



function addToGoogle() {
	
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
	
}