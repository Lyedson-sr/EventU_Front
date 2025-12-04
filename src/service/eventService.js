import { createEventRequest, getAllEventsRequest } from "../api/eventeApi";

export async function createEvent(title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color) {
    
    let group = null
    if(event_type != "Pessoal"){
        //Criar a logica depois 
        group = null
    }else{
        event_type = "personal"
    }

    const rruleMap = {
        "Não se repete": null, 
        "Diariamente": "RRULE:FREQ=DAILY",
        "Semanalmente": "RRULE:FREQ=WEEKLY",
        "Mensalmente": "RRULE:FREQ=MONTHLY",
        "Anualmente": "RRULE:FREQ=YEARLY"
    }; 
    createEventRequest(group, title, description, location, event_type, start_datetime, end_datetime,rruleMap[recurrence_rrule], recurrence_exceptions, color)
}

export async function getAllEvents(){
    const response = await getAllEventsRequest() 
    const responseData = await response.json()

    if(response.ok){
        return responseData
    }
    return null;
}