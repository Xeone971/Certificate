/*
 * File: dataManagement.js
 * Contract: EU contract 2022-FR01-KA220-HED-000023509
 * Project: FitNESS 2 ERASMUS+
 * File Created: Thursday, 11th April 2024
 * Authors: Steward OUADI (AgroParisTech),  Olivier VITRAC (INRAE), Lucca COLLAS
 * -----
 * Last Modified: Wednesday, 5th June 2024
 * Modified By: Lucca COLLAS
 */


// import * as html2pdf from 'html2pdf.js';

var element = document.getElementById('element-to-print');

var bouton = document.getElementById("bouton");



// bouton.addEventListener("click", (event) => {
//     html2pdf()
//     .from(element)
//     .save();
// });

var bouton4 = document.getElementById("bouton4");
var bouton5 = document.getElementById("bouton5");


// Fonction pour exporter les données des cookies dans un tableau JSON
function exportCookiesToJSON() {
  // Obtenir tous les cookies du navigateur
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
    cookieData[cookieName] = cookieValue;
  });

  // Vous pouvez ajouter ici un tableau JSON par défaut
  var defaultData = {
    "name": "valeur_par_defaut1",

    // Ajoutez d'autres clés et valeurs par défaut selon vos besoins
  };

  // Fusionner les données par défaut avec les données des cookies
  var mergedData = Object.assign({}, defaultData, cookieData);

  // Convertir le tableau JSON en chaîne JSON
  var jsonData = JSON.stringify(mergedData);

  // Afficher la chaîne JSON dans la console (vous pouvez faire autre chose avec ces données)
  console.log(jsonData);

  // Vous pouvez également renvoyer les données si vous avez besoin de les utiliser dans votre code
  //return jsonData;
  // Créer un objet Blob avec le contenu JSON
  var blob = new Blob([jsonData], {
    type: "application/json"
  });

  // Créer un objet URL pour le Blob
  var url = URL.createObjectURL(blob);

  // Créer un élément <a> pour le téléchargement
  var a = document.createElement("a");
  a.href = url;
  a.download = "donnees_cookies.json"; // Nom du fichier de téléchargement

  // Ajouter l'élément <a> à la page
  document.body.appendChild(a);

  // Simuler un clic sur l'élément <a> pour déclencher le téléchargement
  a.click();

  // Retirer l'élément <a> de la page
  document.body.removeChild(a);
};

// Appeler la fonction pour exporter les données des cookies




// Fonction pour importer les données depuis un tableau JSON et créer des cookies
function importJSONToCookies(jsonData) {
  try {
    // Convertir la chaîne JSON en objet JavaScript
    var dataObject = JSON.parse(jsonData);

    // Parcourir toutes les clés de l'objet
    for (var key in dataObject) {
      // Obtenir la valeur associée à la clé
      var value = dataObject[key];

      // Créer un cookie avec la clé et la valeur
      document.cookie = key + "=" + value + "; path=/";
    }

    console.log("Cookies créés avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation du JSON vers les cookies:", error);
  }
};

// Exemple d'utilisation avec une chaîne JSON (remplacez avec votre propre JSON)
var jsonString = '{"nom_de_la_cle1": "nouvelle_valeur1", "nom_de_la_cle2": "nouvelle_valeur2"}';

// Appeler la fonction pour importer les données depuis le JSON vers les cookies


bouton4.addEventListener("click", (ok) => {
  exportCookiesToJSON();
});
// var newCookie = "name=oeschger; SameSite=None; Secure";
// bouton5.addEventListener("click", (pasok) =>{
//     importJSONToCookies(jsonData);
// });

function importJSONFromInputFile(inputFile) {
  var file = inputFile.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var jsonData = e.target.result;

      // Appeler la fonction pour importer les données depuis le JSON vers les cookies
      importJSONToCookies(jsonData);
    };

    // Lire le contenu du fichier en tant que texte
    reader.readAsText(file);
  }
};

var input = document.getElementById("fileInput");
document.getElementById('fileInput').addEventListener('change', function () {
  importJSONFromInputFile(this);
});


function vuepdf(data) {
  return `
        <p>${data.nom}  ${data.prenom}</p>
        <img src="./media/OF ATTENDANCE.png" alt="tqt">
        
    `
}

function controlevuepdf() {
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
    cookieData[cookieName] = cookieValue;
  });

  const tqt = vuepdf(cookieData);
  document.getElementById('element-to-print').insertAdjacentHTML("afterbegin", tqt);
}

// var bouton6 = document.getElementById("bouton6");
// bouton6.addEventListener('click', function () {
//   element.classList.toggle("oui");
//   controlevuepdf();
// });