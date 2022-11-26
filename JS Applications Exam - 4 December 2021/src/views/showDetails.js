import { deleteAlbum, getAlbumById } from "../api/data.js";
import { html, nothing } from "../lib.js"


export async function showDetails(context) {
    const id = context.params.id;
    const user = context.user;
    const album = await getAlbumById(id);
    const isOwner = user && user._id === album._ownerId;
    context.render(renderDetailsDemplate(album, isOwner, onDelete))


    async function onDelete() {
        const choice = confirm("Are you sure you want to delete the record?");

        if (choice) {
            await deleteAlbum(id);
            context.page.redirect("/home")
        }
    }

}

const renderDetailsDemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner ? html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click = ${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`: nothing}

        </div>
    </div>
</section>`