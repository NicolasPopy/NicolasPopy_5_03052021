import "../css/main.scss";
import "../css/confirmation.scss";
import * as monPanier from "./panier.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');



//************************
// Récupère l'id de commande et l'affiche
//************************

window.onload = async function() {
    var H1 = document.querySelector("#confirmationText");

    H1.innerHTML= "Merci pour votre commande " + id;

    var H2 = document.querySelector("#confirmationTotal");
    H2.innerHTML ="d'un montant de "+ await monPanier.calculTotalCommande() + "€";

}

