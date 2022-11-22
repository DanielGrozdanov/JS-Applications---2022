import * as api from "./api.js";


const endPoints = {
    "getAllTeams": "data/teams",
    "getAllMembers": 'data/members?where=status%3D%22member%22',
    "createNewTeam": 'data/teams',
    'getTeamById': "data/teams/", //TODO - delete :id,
    'editTeamById': 'data/teams/', //TODO - delete :id
    "teamMemberRequest": "data/members",
    'teamMemberApprove': "data/members/",
    'getTeamOwnerMembers': 'data/members'


}
export async function getAllTeams() {
    const res = await api.get(endPoints.getAllTeams)
    return res;
}

export async function createNewTeam(body) {
    const res = await api.post(endPoints.createNewTeam, body)
    return res;
}

export async function getTeamById(id) {
    const res = await api.get(endPoints.getTeamById + id)
    return res;
}

export async function editTeamById(id, body) {
    const res = await api.put(endPoints.editTeamById + id, body)
    return res;
}

export async function teamMemberRequest(teamId) {
    const rest = await api.post(endPoints.teamMemberRequest, {teamId})
    return rest;
}

export async function  teamMemberApprove(id){
    const rest = await api.put(endPoints.teamMemberApprove + id)
    
}

export async function getTeamOwnerMembers(teamId){
    const url = endPoints.getTeamOwnerMembers + `?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers'`
    const res = await api.get(url);
    return res;

}