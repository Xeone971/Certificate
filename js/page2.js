import * as data from './tab.js';
import { encryptData, decryptData } from './encrypt.js';



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
    
        // Enregistrez les données cryptées dans des cookies
        document.cookie = 'nom=' + nom + '; path=/';
        document.cookie = 'prenom=' + prenom + '; path=/';
        document.cookie = 'dateNaissance=' + dateNaissance + '; path=/';
        document.cookie = 'pathway=' + encryptData(findKeyByValue(selectedPathway)) + '; path=/';
    
        alert('Données sauvegardées avec succès!');
    }
    
    function showCookies() {
        const output = document.getElementById("cookies");
        const cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        
        const decryptedCookies = {
            nom: decryptData(cookies['nom']),
            prenom: decryptData(cookies['prenom']),
            dateNaissance: decryptData(cookies['dateNaissance']),
            pathway: decryptData(cookies['pathway'])
        };
    
        output.textContent = `> ${JSON.stringify(decryptedCookies)}`;
    }




// function sauvegarderDonnees() {
//     var nom = document.getElementById('nom').value;
//     var prenom = document.getElementById('prenom').value;
//     var dateNaissance = document.getElementById('dateNaissance').value;
//     var pathwaySelect = document.getElementById("pathway-selected");
//     var selectedPathway = pathwaySelect.options[pathwaySelect.selectedIndex].value;
    
//     // Enregistrez les données dans des cookies
//     document.cookie = 'nom=' + nom + '; path=/';
//     document.cookie = 'prenom=' + prenom + '; path=/';
//     document.cookie = 'dateNaissance=' + dateNaissance + '; path=/';
//     document.cookie = 'pathway=' + findKeyByValue(selectedPathway) + '; path=/';

//     alert('Données sauvegardées avec succès!');
// }

// function sauvegarderDonneeslocal() {
//     var nom2 = document.getElementById('nom2').value;
//     var prenom2 = document.getElementById('prenom2').value;
//     var dateNaissance2 = document.getElementById('dateNaissance2').value;

//     // Enregistrez les données dans le stockage local
//     localStorage.setItem('nom', nom2);
//     localStorage.setItem('prenom', prenom2);
//     localStorage.setItem('dateNaissance', dateNaissance2);

//     alert('Données sauvegardées avec succès!');
//     }



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

boutonapprobationpage.addEventListener("click", (e) =>{
    window.location.href="/html/approbation.html"
});

