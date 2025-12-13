import { createGroupRequest, deleteGroupRequest, editGroupRequest, getGroupResquest } from "../api/groupApi"

export async function createGroup(groupData){
    const codigoCor = Math.floor(Math.random() * 16777215).toString(16);
    const cor = `#${codigoCor.padStart(6, '0')}`;

    const response = await createGroupRequest(groupData.name, groupData.description, cor, groupData.members)
    if(response.ok){
        return {ok : true}
    }
}

export async function getGroup(){
    const response = await getGroupResquest();

    if(response.ok){
        return await response.json()
    }
}

export async function deleteGroup(id) {
    const response = await deleteGroupRequest(id);

    if(response.ok){
        return {ok : true}
    }
}

export async function editGroup(groupData){
    
    const response = await editGroupRequest(groupData.id, groupData.name, groupData.description, groupData.color, groupData.members)
    if(response.ok){
        return {
            ok : true,
            statusCode: response.status
        }
    }else{
        return {
            ok : false,
            statusCode: response.status
        }
    }
}