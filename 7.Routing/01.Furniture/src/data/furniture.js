import * as api from './api.js'


const endPoints = {
    'furnitures': "data/catalog",
    'getFurnitureById': "data/catalog/",
    'createNewFurniture': "data/catalog",
    'updateFurniture': "data/catalog/",
    "deleteFurniture": "data/catalog/",
    "getMyFurniture": "data/catalog?where=_ownerId%3D%22"
}

export async function getAllFurniture() {
    return api.get(endPoints.furnitures)
}


export async function getFurnitureById(id) {
    return api.get(endPoints.getFurnitureById + id)
}

export async function createNewFurniture(body) {
    return api.post(endPoints.createNewFurniture, body)
}

export async function updateFurniture(id, body) {
    return api.put(endPoints.updateFurniture + id, body)
}

export async function deleteFurniture(id) {
    return api.delete(endPoints.deleteFurniture + id)
}

export async function getMyFurniture(userId) {
    const id = `${userId}%22`
    return api.get(endPoints.getMyFurniture + id);
}