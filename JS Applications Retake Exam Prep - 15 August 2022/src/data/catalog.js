import * as api from '../api/api.js'

const endPoints = {
    "getAllItems": "data/shoes?sortBy=_createdOn%20desc",
    "createNewItem": "data/shoes",
    "getItemById": "data/shoes/", // + id
    "updateItemById": "data/shoes/", // +id
    "deleteItemById": "data/shoes/", // +id
    "searchQuery": "data/shoes?where=brand"
}

export async function getAllItems() {
    const res = await api.get(endPoints.getAllItems)
    return res;
}

export async function createNewItem(brand, model, imageUrl, release, designer, value) {
    const res = await api.post(endPoints.createNewItem, { brand, model, imageUrl, release, designer, value })
    return res;
}

export async function getItemById(id) {
    const res = await api.get(endPoints.getItemById + id)
    return res;
}
export async function editItemById(id, brand, model, imageUrl, release, designer, value) {
    const res = await api.put(endPoints.updateItemById + id, { brand, model, imageUrl, release, designer, value })
    return res;
}

export async function deleteItemById(id) {
    await api.delete(endPoints.deleteItemById + id);
}

export async function searchQuery(query){
    const res = await api.get(endPoints.searchQuery + encodeURIComponent(` LIKE "${query}" `))
    return res;
}