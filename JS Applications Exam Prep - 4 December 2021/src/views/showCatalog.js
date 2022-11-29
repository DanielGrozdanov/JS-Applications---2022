import { getAlbums } from "../api/data.js"
import { html ,nothing} from "../lib.js"

export async function showCatalog(context) {
    const user = context.user;
    const albums = await getAlbums();
    context.render(renderCatalogTemplate(albums, user))
}

export const renderCatalogTemplate = (albums, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length === 0 ? html`<p>No Albums in Catalog!</p>` : albums.map(albums => createAlbumCard(albums, user))}
</section>`


const createAlbumCard = (album, user) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user ? html`
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : nothing}

    </div>
</div>`