import { del, get, post, put } from "./api.js";


export async function getPets() {
    const res = await get('data/pets?sortBy=_createdOn%20desc&distinct=name');
    return res;

}

export async function getPetById(petId) {
    const res = await get('data/pets/' + petId)
    return res;
}

export async function createNewPet(body) {
    const res = await post("data/pets/", body);
    return res
}

export async function editPet(id, body) {
    const res = await put("data/pets/" + id, body)
    return res;

}

export async function deleteById(id) {
    const res = await del("data/pets/" + id);
    return res;
}