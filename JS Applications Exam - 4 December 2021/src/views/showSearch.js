import { html, nothing } from "../lib.js"
import { searchAlbum } from "../api/data.js";

export function showSearch(context) {

    context.render(renderSearchTemplate(false, onSearch))

    async function onSearch() {
        const field = document.getElementById("search-input");
        const query = field.value;
        if (!query) {
            return alert("Field cannot be empty")
        }

        const albums = await searchAlbum(query);
        const isOwner = context.user;


        context.render(renderSearchTemplate(true, onSearch, albums, isOwner))
    }
}

const renderSearchTemplate = (clicked, onSearch, albums, isOwner) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${clicked ? createResultTemplate(albums, isOwner) : nothing}
    </div>
</section>
`
const createResultTemplate = (albums, isOwner) => {
    return html`${albums.length > 0 ? html`
${albums.map(album => createCard(album, isOwner))}
`: html`<p class="no-result">No result.</p>`}`
}

const createCard = (album, isOwner) => html`

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
        ${isOwner ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`: nothing}

    </div>
</div>`

