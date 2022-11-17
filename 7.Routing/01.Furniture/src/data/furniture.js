import * as api from './api.js' 


const endPoints = {
        'furnitures' : "data/catalog"
}

export async function getAllFurniture(){
    return api.get(endPoints.furnitures)
}
