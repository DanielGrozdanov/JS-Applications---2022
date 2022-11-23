import { get, post } from "./api.js"

export async function donateToPet(petId) {
    const res = await post("data/donation", { petId })
}

export async function getDonations(petId) {
    const res = await get(`data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
    return res;   
}

export async function getOwnDonation(petId, userId){
    const res = await get(`data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return res;
}