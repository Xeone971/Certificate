import * as data from './tab.js';
import { encryptData, decryptData } from './encrypt.js';



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
        cookiesObj[name] = decryptData(value);
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
    document.body.insertAdjacentHTML( 'afterbegin', '<div id="myID1"><p>Here\'s your certificate!</p></div>' );
    controlevuepdf();
    var element = document.getElementById('element-to-print');
    var bouton = document.getElementById("bouton");
    bouton.addEventListener("click", (event) => {
    var opt = {
        filename:     'myfile.pdf',
        html2canvas:  { scale: 1, scrollY: 0 },
        jsPDF:        { unit: 'cm', format: 'a4', orientation: 'landscape' }
        };
        html2pdf()
        .from(element)
        .set(opt)
        .save();
});
}

function fonctionSiFalse() {
    // Code à exécuter si la vérification est False
    console.log("Certains cookies ne sont pas valides !");
    // Autres actions...
    document.body.insertAdjacentHTML( 'afterbegin', '<div id="myID2">You do not meet the criteria for this certificate</div>' );
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
            const decryptedValue = decryptData(decodeURIComponent(cookieValue));
            return decryptedValue;
        }
    }

    // Retourner null si le cookie n'a pas été trouvé
    return null;
}

// Exemple d'utilisation :
let nomCookie = getCookie('pathway');
console.log(nomCookie); // Affichera la valeur du cookie 'pathway' ou null si le cookie n'existe pas
console.log(data[nomCookie])

var give = document.getElementById("creaCookieQcm");

give.addEventListener("click", (e) => {
    // if (nomCookie && data[nomCookie]) {
    const valuesArray = data[nomCookie];
    const encryptedValue = encryptData('8');
    let newdata = [];
    for (let key in data[nomCookie]) {
        const length = valuesArray[key].length; // Accéder à la longueur du tableau à la clé spécifique
        console.log(length); // Afficher la longueur du tableau
        for (let i = 0; i < length; i ++){
        newdata.push(data[nomCookie][key][i]);
        }
    }
    console.log(newdata)  
    for (let value of newdata) {
        // Créer un cookie avec la valeur '6' pour chaque valeur du tableau
        document.cookie = `${value}=${encryptedValue}; path=/`;
    }
    });
    
    // give.addEventListener("click", (e) => {
    //     const valuesArray = data[nomCookie];
    //     let newdata = [];
    //     for (let key in data[nomCookie]) {
    //         const length = valuesArray[key].length;
    //         for (let i = 0; i < length; i ++) {
    //             // Crypter la valeur '8' avant de créer le cookie
    //             const encryptedValue = encryptData('8');
    //             newdata.push(encryptedValue);
    //         }
    //     }
    //     newdata.forEach((value, index) => {
    //         document.cookie = `${index}=${value}; path=/`;
    //     });
    // });

function vuepdf(data) {
    return `
    <div id="element-to-print" class="oui">
        <p>${data.nom}  ${data.prenom}</p>
        <img src="../media/OF ATTENDANCE.png" alt="tqt">
    </div>
    <button id="bouton">Générer PDF</button>
    `
}

function controlevuepdf(){
    var cookies = document.cookie.split("; ");

    // Tableau JSON pour stocker les données des cookies
    var cookieData = {};

    // Parcourir tous les cookies
    cookies.forEach(function(cookie) {
      // Diviser le cookie en nom et valeur
    var parts = cookie.split("=");
    var cookieName = parts[0];
    var cookieValue = parts[1];

      // Mettre à jour le tableau JSON avec les données du cookie
    cookieData[cookieName] = decryptData(cookieValue);
});
    
    const tqt = vuepdf(cookieData);
    document.body.insertAdjacentHTML("afterbegin", tqt);
}
