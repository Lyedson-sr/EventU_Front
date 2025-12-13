import { httpClientAuth } from "./httpClient";

export function createGroupRequest(name, description, color, members_emails){
    return httpClientAuth("/groups/",{
        method: "POST",
        body: JSON.stringify({
            name,
            description, 
            color, 
            members_emails
        })
    });
}


export function getGroupResquest(){
    return httpClientAuth("/groups/",{
        method: "GET"
    })
}


export function deleteGroupRequest(id){
    return httpClientAuth(`/groups/${id}/`, {
        method: "DELETE"
    });
}