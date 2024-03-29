import * as data from './tab.js';

var appro = document.getElementById("appro");

appro.addEventListener('click', function() {
    // Récupérer la valeur du cookie 'pathway'
    const pathwayValue = getCookie('pathway');

// Vérifier si le cookie 'pathway' existe et correspond à une clé dans l'objet data
    if (pathwayValue && data[pathwayValue]) {
        const nomsCookiesReference = Object.values(data[pathwayValue]).flat();
        // Utilisez nomsCookiesReference comme vous le souhaitez
        console.log(nomsCookiesReference);
    if (verifierCookies(nomsCookiesReference)) {
        // Si la vérification est réussie (True)
        fonctionSiTrue();
    } else {
        // Si la vérification échoue (False)
        fonctionSiFalse();
    }
    } else {
        console.error("Le chemin (path) spécifié dans le cookie 'pathway' n'est pas valide ou n'existe pas dans l'objet data.");
    }
});

function verifierCookies(nomsCookiesReference) {
    // Extraire les cookies de document.cookie
    const cookies = document.cookie.split(';').reduce((cookiesObj, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookiesObj[name] = parseInt(value, 10);
        return cookiesObj;
    }, {});

    // Vérifier les valeurs des cookies de référence
    for (const nomCookie of nomsCookiesReference) {
        if (!(nomCookie in cookies) || cookies[nomCookie] <= 5) {
            return false;
        }
    }
    return true;
}

function fonctionSiTrue() {
    // Code à exécuter si la vérification est True
    console.log("Tous les cookies sont valides !");
    // Autres actions...
    document.insertAdjacentHTML("<p>Tous les cookies sont valides !</p>");
}

function fonctionSiFalse() {
    // Code à exécuter si la vérification est False
    console.log("Certains cookies ne sont pas valides !");
    // Autres actions...
    document.body.insertAdjacentHTML( 'afterbegin', '<div id="myID">Vous navez pas remplis les critères pour avoir ce certificat</div>' );
}

console.log(data.pathTrad);
console.log(data.path1);
console.log(data.path1Trad);


function getCookie(name) {
    // Sépare la chaîne des cookies en un tableau de cookies individuels
    let cookieArray = document.cookie.split('; ');

    // Parcourir le tableau de cookies
    for (let cookie of cookieArray) {
        // Séparer le nom et la valeur du cookie actuel
        let cookieParts = cookie.split('=');
        let cookieName = cookieParts[0];
        let cookieValue = cookieParts[1];

        // Vérifier si le nom du cookie correspond à celui recherché
        if (cookieName === name) {
            // Retourner la valeur du cookie
            return decodeURIComponent(cookieValue);
        }
    }

    // Retourner null si le cookie n'a pas été trouvé
    return null;
}

// Exemple d'utilisation :
let nomCookie = getCookie('pathway');
console.log(nomCookie); // Affichera la valeur du cookie 'nom' ou null si le cookie n'existe pas
