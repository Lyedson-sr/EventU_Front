import { httpClient, httpClientAuth } from "./httpClient";

export function createEventRequest(group, title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color, guest_emails){
    console.log(event_type)
    return httpClientAuth("/events/",{
        method: "POST",
        body: JSON.stringify({
            group, 
            title, 
            description, 
            location, 
            event_type, 
            start_datetime, 
            end_datetime, 
            recurrence_rrule, 
            recurrence_exceptions, 
            color,
            guest_emails
        })
    });
}

export function getAllEventsRequest(){
    const eventos = httpClientAuth("/events/",{
        method: "GET",
    });
    
    return eventos
}

export function deleteEventRequest(id) {
    return httpClientAuth(`/events/${id}/`, {
        method: "DELETE"
    });
}

export function editEventRequest(id, title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color, guest_emails){
    console.log("Eviando")
    return httpClientAuth(`/events/${id}/`,{
        method: "PATCH",
        body: JSON.stringify({
            title, 
            description, 
            location, 
            event_type, 
            start_datetime, 
            end_datetime, 
            recurrence_rrule, 
            recurrence_exceptions, 
            color, 
            guest_emails
        })
    });
}

export function getOccurrencesResquest(startStr, endStr){
    const query = `?start=${encodeURIComponent(startStr)}&end=${encodeURIComponent(endStr)}`;

    return httpClientAuth("/events/occurrences/" +query,{
        method: "GET"
    })
}