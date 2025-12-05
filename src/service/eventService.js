import { createEventRequest, getAllEventsRequest, deleteEventRequest, editEventRequest } from "../api/eventeApi";

export async function createEvent(title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color, convidados) {
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
    createEventRequest(group, title, description, location, event_type, start_datetime, end_datetime,rruleMap[recurrence_rrule], recurrence_exceptions, color, convidados)
}

export async function getAllEvents(){
    const response = await getAllEventsRequest() 
    const responseData = await response.json()

    if(response.ok){
        return responseData
    }
    return null;
}

export async function deleteEvent(id){
    const response = await deleteEventRequest(id)

    if(response.ok){
        return {ok : true}
    }
}

export async function editEvent(id, title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color, convidados){
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

    const response = await editEventRequest(id, title, description, location, event_type, start_datetime, end_datetime, rruleMap[recurrence_rrule], recurrence_exceptions, color, convidados)

    if(response.ok){
        return {ok:true}
    }
    return null;
}