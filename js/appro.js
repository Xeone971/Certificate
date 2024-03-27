var appro = document.getElementById("appro");

appro.addEventListener('click', function() {
    const nomsCookiesReference = ['cookie1', 'cookie2', 'cookie3'];

    if (verifierCookies(nomsCookiesReference)) {
        // Si la vérification est réussie (True)
        fonctionSiTrue();
    } else {
        // Si la vérification échoue (False)
        fonctionSiFalse();
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
