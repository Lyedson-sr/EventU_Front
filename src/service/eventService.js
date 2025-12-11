import { createEventRequest, getAllEventsRequest, deleteEventRequest, editEventRequest, getOccurrencesResquest } from "../api/eventeApi";

export async function createEvent(title, description, location, event_type, start_datetime, end_datetime, recurrence_rrule, recurrence_exceptions, color, convidados) {
    let group = null
    if(event_type != "Pessoal"){
        //Criar a logica depois 
        group = null
    }else{
        event_type = "personal"
    }

    const date = new Date(end_datetime);

    const pad = n => String(n).padStart(2, '0');

    const formatted =
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) + "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) + "Z";

    console.log(formatted);


    const rruleMap = {
        "Não se repete": null, 
        "Diariamente": "RRULE:FREQ=DAILY;UNTIL="+formatted,
        "Semanalmente": "RRULE:FREQ=WEEKLY;UNTIL="+formatted,
        "Mensalmente": "RRULE:FREQ=MONTHLY;UNTIL="+formatted,
        "Anualmente": "RRULE:FREQ=YEARLY;UNTIL="+formatted
    }; 
    const response = await createEventRequest(group, title, description, location, event_type, start_datetime, start_datetime,rruleMap[recurrence_rrule], recurrence_exceptions, color, convidados)
    
    console.log(response)
    if(response.ok){
        return {ok:true}
    }
    return null
}

export async function getAllEvents(){
    const response = await getAllEventsRequest() 
    const responseData = await response.json()

    if(response.ok){
        return responseData.results.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});

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

    
    

    const dateEdit = new Date(end_datetime);

    const pad = n => String(n).padStart(2, '0');

    const formatted =
    dateEdit.getUTCFullYear() +
    pad(dateEdit.getUTCMonth() + 1) +
    pad(dateEdit.getUTCDate()) + "T" +
    pad(dateEdit.getUTCHours()) +
    pad(dateEdit.getUTCMinutes()) +
    pad(dateEdit.getUTCSeconds()) + "Z";

    console.log(formatted);

    const rruleMap = {
        "Não se repete": null, 
        "Diariamente": "RRULE:FREQ=DAILY;UNTIL="+formatted,
        "Semanalmente": "RRULE:FREQ=WEEKLY;UNTIL="+formatted,
        "Mensalmente": "RRULE:FREQ=MONTHLY;UNTIL="+formatted,
        "Anualmente": "RRULE:FREQ=YEARLY;UNTIL="+formatted
    }; 
    const response = await editEventRequest(id, title, description, location, event_type, start_datetime, start_datetime, rruleMap[recurrence_rrule], recurrence_exceptions, color, convidados)

    if(response.ok){
        return {ok:true}
    }
    return null;
}

export async function getOccurrences(startStr, endStr){
    const response = await getOccurrencesResquest(startStr, endStr);

    if(response.ok){
        return await response.json()
    }
}