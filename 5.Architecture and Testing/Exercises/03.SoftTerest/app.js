import { logout } from "./src/api/user.js";
import { initialize} from "./src/router.js";
import { showCatalog } from "./src/views/catalog.js";
import { showCreateView } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from "./src/views/home.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";

document.getElementById("defSection").remove();


const links = {
    "/": showHome,
    "/catalog": showCatalog,
    "/login": showLogin,
    "/register": showRegister,
    "/details": showDetails,
    "/create": showCreateView,
    "/logout": async function(){
        await logout();
        router.goTo("/");
        router.updateNavigate();
    }
}




const router = initialize(links)
router.updateNavigate();

router.goTo("/");
