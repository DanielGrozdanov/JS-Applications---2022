import { html } from '../../lib.js'

export function generateFurnitureCard(furniture) {
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="./${furniture.img}" />
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`
}