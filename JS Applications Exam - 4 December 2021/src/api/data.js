import { del, get, post, put } from "./api.js";

const endpoints = {
    "createPage": 'data/albums',
    "getAlbums": "data/albums",
    "getAlbumById": "data/albums/",
    'editAlbumById': "data/albums/",
    "deleteAlbum": 'data/albums/',
    "searchAlbum": 'data/albums?where=name'

}

export async function searchAlbum(query) {
    const res = get(endpoints.searchAlbum + encodeURIComponent(` LIKE "${query}" `))
    debugger
    return res;
}
export async function createPage(body) {
    const res = post(endpoints.createPage, body)
    return res;
}

export async function getAlbums() {
    const res = get(endpoints.getAlbums + '?sortBy=_createdOn%20desc&distinct=name')
    return res;
}

export async function getAlbumById(albumId) {
    const res = get(endpoints.getAlbumById + albumId)
    return res;
}

export async function editAlbumById(id, body) {
    const res = put(endpoints.editAlbumById + id, body)
    return res;
}

export async function deleteAlbum(albumId) {
    const res = del(endpoints.deleteAlbum + albumId)
}