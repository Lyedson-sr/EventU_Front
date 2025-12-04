import { httpClient } from "./httpClient";

export function createEventRequest(group, title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color){

    return httpClient("/events/",{
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
    const eventos = httpClient("/events/",{
        method: "GET",
    });
    
    return eventos
}