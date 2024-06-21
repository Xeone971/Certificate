/*
 * File: index.js
 * Contract: EU contract 2022-FR01-KA220-HED-000023509
 * Project: FitNESS 2 ERASMUS+
 * File Created: Thursday, 11th April 2024
 * Authors: Steward OUADI (AgroParisTech),  Olivier VITRAC (INRAE), Lucca COLLAS
 * -----
 * Last Modified: Friday, 21st June 2024
 * Modified By: Lucca COLLAS
 */


import * as data from './database.js';
import {
    encryptData,
    decryptData
} from './encrypt.js';



//var donneLocal = document.getElementById("sauvegarderDonneeslocal");
var donne = document.getElementById("sauvegarderDonnees");
var clearCookie = document.getElementById("clearOutputCookies");
var showCookie = document.getElementById("showCookies");

// donneLocal.addEventListener('click', sauvegarderDonneeslocal);
donne.addEventListener('click', sauvegarderDonnees);
clearCookie.addEventListener('click', clearOutputCookies);
showCookie.addEventListener('click', showCookies);

// function showCookies() {
//     const output = document.getElementById("cookies");
//     output.textContent = `> ${document.cookie}`;
//     }

function clearOutputCookies() {
    const output = document.getElementById("cookies");
    output.textContent = "";
}

function sauvegarderDonnees() {
    var nom = encryptData(document.getElementById('nom').value);
    var prenom = encryptData(document.getElementById('prenom').value);
    var dateNaissance = encryptData(document.getElementById('dateNaissance').value);
    var pathwaySelect = document.getElementById("pathway-selected");
    var selectedPathway = pathwaySelect.options[pathwaySelect.selectedIndex].value;
    var certificateSelect = document.getElementById("certificate-selected");
    var selectedCertificate = encryptData(certificateSelect.options[certificateSelect.selectedIndex].value);
    // Enregistrez les données cryptées dans des cookies
    document.cookie = 'nom=' + nom + '; path=/';
    document.cookie = 'prenom=' + prenom + '; path=/';
    document.cookie = 'dateNaissance=' + dateNaissance + '; path=/';
    document.cookie = 'pathway=' + encryptData(findKeyByValue(selectedPathway)) + '; path=/';
    document.cookie = 'certificateSelect=' + selectedCertificate + '; path=/';
    masterCertificate();
    //alert('Données sauvegardées avec succès!');
}

function showCookies() {
    const output = document.getElementById("cookies");
    const cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value
    }), {});

    const decryptedCookies = {
        nom: decryptData(cookies['nom']),
        prenom: decryptData(cookies['prenom']),
        dateNaissance: decryptData(cookies['dateNaissance']),
        pathway: decryptData(cookies['pathway']),
        certificateSelect: decryptData(cookies['certificateSelect'])
    };

    output.textContent = `> ${JSON.stringify(decryptedCookies)}`;
}



const pathways = document.getElementById("pathway-selected");


let newdata = [];
for (let key in data.pathTrad) {
    console.log(key); // Affiche la clé (par exemple, 'path1', 'path2', etc.)
    console.log(data.pathTrad[key]); // Affiche le tableau associé à la clé
    newdata.push(data.pathTrad[key][0]);

}
console.log(newdata);
newdata.forEach((pathway) => {
    const option = document.createElement("option");
    option.value = pathway.toLowerCase();
    option.text = pathway;
    pathways.appendChild(option); // Ajoutez l'option à petSelect, pas à pathway
});


function findKeyByValue(valueToFind) {
    console.log(valueToFind);
    for (let key in data.pathTrad) {
        if (data.pathTrad[key][0].toLowerCase() === valueToFind) {
            return key; // Retourne la clé si la valeur est trouvée
        }
    }
    return null; // Retourne null si la valeur n'est pas trouvée
}


var boutonapprobationpage = document.getElementById("approbationpage");

boutonapprobationpage.addEventListener("click", (e) => {
    window.location.href = "html/approbation.html"
});


function masterCertificate(){
    var nameCertificate = getCookie("certificateSelect");
    let pathwayValue;
    if (nameCertificate == "completion"){
        // Récupérer la valeur du cookie 'pathway'
        pathwayValue = `${getCookie('pathway')}Quiz`;
        console.log(pathwayValue);
    }else{
        pathwayValue = getCookie('pathway');
    }
        
    // Vérifier si le cookie 'pathway' existe et correspond à une clé dans l'objet data
    if (pathwayValue && data[pathwayValue]) {
        const nomsCookiesReference = Object.values(data[pathwayValue]).flat();
        // Utilisez nomsCookiesReference comme vous le souhaitez
        console.log(nomsCookiesReference);
        if (verifierCookies(nomsCookiesReference)) {
            // Si la vérification est réussie (True)
            fonctionSiTruetest();
        } else {
            // Si la vérification échoue (False)
            fonctionSiFalsetest();
        }
    } else {
        console.error("Le chemin (path) spécifié dans le cookie 'pathway' n'est pas valide ou n'existe pas dans l'objet data.");
    }


function fonctionSiTruetest() {
    // Code à exécuter si la vérification est True
    console.log("Tous les cookies sont valides !");
    var firstname = getCookie("nom");
    var lastname = getCookie("prenom");
    var date = getFormattedDate();
    var certificatetype = getCookie("certificateSelect");
    var pathway = getCookie("pathway");
    var pathwayname = data.pathTrad[pathway];
    // Autres actions...
    //document.body.insertAdjacentHTML('afterbegin', '<div id="myID1"><p>Here\'s your certificate!</p></div>');
    controlevuepdftest();
    var element = document.getElementById('element-to-print');
    var bouton = document.getElementById("bouton");
        var opt = {
            filename: 'myfile.pdf',
            html2canvas: {
                scale: 1,
                scrollY: 0
            },
            jsPDF: {
                unit: 'cm',
                format: 'a4',
                orientation: 'landscape'
            }
        };
        html2pdf()
            .from(element)
            .set(opt)
            // .save();
            .toPdf() // Convertir le contenu en PDF
            .get('pdf') // Obtenir l'objet jsPDF
            .then(function (pdf) {
                // Positionner et ajouter un lien cliquable
                // Les coordonnées x et y définissent la position de départ du texte
                // pdf.textWithLink('Cliquez ici pour visiter Google', 5, 5, { url: 'https://www.google.com' });
                // Sauvegarder le document
                pdf.save(`${firstname}_${lastname}_certificate-of-${certificatetype}_${pathwayname}_${date}`);
            });
            element.remove();
    
}

function vuepdftest(data) {
    if (nameCertificate = "attendance"){

    }
    return `
    <div id="element-to-print" class="oui">
        <p>${data.nom}  ${data.prenom}</p>
        <img src="../img/OF ATTENDANCE.png" alt="tqt">
    </div>
    `
}

function controlevuepdftest() {
    var cookies = document.cookie.split("; ");

    // Tableau JSON pour stocker les données des cookies
    var cookieData = {};

    // Parcourir tous les cookies
    cookies.forEach(function (cookie) {
        // Diviser le cookie en nom et valeur
        var parts = cookie.split("=");
        var cookieName = parts[0];
        var cookieValue = parts[1];

        // Mettre à jour le tableau JSON avec les données du cookie
        cookieData[cookieName] = decryptData(cookieValue);
    });

    const tqt = vuepdftest(cookieData);
    document.body.insertAdjacentHTML("afterbegin", tqt);
}
function fonctionSiFalsetest() {
    // Code à exécuter si la vérification est False
    console.log("Certains cookies ne sont pas valides !");
    // Autres actions...
    document.body.insertAdjacentHTML('afterbegin', '<div id="myID2">You do not meet the criteria for this certificate</div>');
}

function actionSiMoyenneBasse() {
    // Logique à exécuter si la moyenne est inférieure à 8
    
}

function verifierCookies(nomsCookiesReference) {
    var counter = 0;
    var average = 0;
    var  sum = 0;
    // Extraire les cookies de document.cookie
    const cookies = document.cookie.split(';').reduce((cookiesObj, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookiesObj[name] = decryptData(value);
        return cookiesObj;
    }, {});
    // Vérifier les valeurs des cookies de référence
    for (const nomCookie of nomsCookiesReference) {
        counter += 1;
        sum += Number(cookies[nomCookie]);
        if (!(nomCookie in cookies)) {
            alert("You haven't completed all your quizzes");
            return false;
        }
    }
    average = sum / counter;
    // Vérifier si la moyenne est inférieure à 8
    if (average < 8) {
        actionSiMoyenneBasse();
        alert('The average of your grades is less than 8, you do not meet the conditions to obtain this certificate!');
        return false;
    }
    alert('Succes!');
    return true;
}

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

function getFormattedDate() {
    const dateObj = new Date();
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = String(dateObj.getFullYear()).slice(-2); // Obtenir les deux derniers chiffres de l'année

    return `${day}-${month}-${year}`;
}
}