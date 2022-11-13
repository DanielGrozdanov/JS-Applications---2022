import * as api from "./api.js";

const endPoints = {
    "getAllIdea": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    "createIdea": "data/ideas"
}
export async function getAllIdea() {
   return api.get(endPoints.getAllIdea)
}

export async function createIdea(data){
    return api.post(endPoints.createIdea, data)
}