import { httpClient, httpClientAuth } from "./httpClient";

export function createEventRequest(group, title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color){

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
            color            
        })
    });
}

export function getAllEventsRequest(){
    const eventos = httpClientAuth("/events/",{
        method: "GET",
    });
    
    return eventos
}