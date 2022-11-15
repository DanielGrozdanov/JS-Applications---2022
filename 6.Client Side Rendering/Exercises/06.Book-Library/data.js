import * as api from "./api.js"

const path = 'jsonstore/collections/books/'

const endPoints = {
    'loadBooks': path,
    'createNewBook': path,
    'putEditedBook': path,
    'deleteBook' : path
}

export async function loadBooks(){
  return api.get(endPoints.loadBooks)
}


export async function createNewBook(body){
    return api.post(endPoints.createNewBook, body)
}

export async function putEditedBook(id,body){
  return api.put(endPoints.putEditedBook + id, body)
}

export async function deleteBook(id){
  return api.delete(endPoints.deleteBook + id)
}