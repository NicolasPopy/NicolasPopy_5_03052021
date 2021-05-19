
import "../css/main.scss";
import "../css/validation.scss";
import * as monPanier from "./panier.js";

var total = 0;


//************************
// Charge recap commande  et calcule total
//************************

window.onload = function() {
    monPanier.chargerPanier().then(function(res) {

    if(res.length >0)
    {
        for (let article in res) {
            createCardProduit(res[article]);
        };
    }

        creerTotal();
        
    });
};


//************************
// Affiche le récap de commande dans le DOM
//************************

function createCardProduit(article)
{   
    // Card
    var card = document.createElement("article");
    card.classList.add("card","mb-4");

    //card horiztontal
    var cardhorizontal = document.createElement("div");
    cardhorizontal.classList.add("card-horizontal");

    //image
    var cardimg = document.createElement("img");
    cardimg.classList.add("img_carre","w-100","h-100");
    cardimg.setAttribute("src", article.imageUrl);

    //body
    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body");

    //title
    var cardtitle = document.createElement("h2")
    cardtitle.classList.add("card-title");
    cardtitle.innerHTML = article.name;
    cardbody.appendChild(cardtitle);

    //description
    var carddescription = document.createElement("div");
    carddescription.classList.add("card-text");
    carddescription.innerHTML = article.description;
    cardbody.appendChild(carddescription);

    //footer
    var cardfooter = document.createElement("div");
    cardfooter.classList.add("card-footer");
    cardfooter.innerHTML = article.qte + " X " + article.price/100 + ",00 €";
/* 
    total += article.price; */
    


    cardhorizontal.appendChild(cardimg);
    cardhorizontal.appendChild(cardbody);
    cardhorizontal.appendChild(cardfooter);

    card.appendChild(cardhorizontal);

    var carddeck = document.getElementById("grille_produits");
    carddeck.appendChild(card);

    var btn = document.getElementsByClassName(" btn-validerpanier")[0];
    btn.addEventListener ("click", validerPanier);

}


//************************
// Affiche le total dans le DOM
//************************


 async function creerTotal() {

    var cardtotal = document.getElementById("Total");

    cardtotal.innerHTML = await monPanier.calculTotalCommande() + ',00 €';
}


//************************
// POST la commande et destinataire au serveur pour confirmation
//************************


async function  validerPanier() {
    var contact =  getInfosClient();
    const products = await monPanier.chargerIds();
    var  jsonbody = {contact,products,};
    console.log(jsonbody);

        var ret = await fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(jsonbody)
        })
        

        var reponse = await ret.json();
        console.log(reponse.orderId);
        redirectionConfirmation(reponse.orderId);

}


//************************
// Récupère les infos du destinataire dans le DOM
//************************

function getInfosClient() {
    var nom = document.getElementById("Nom").value;
    var prenom = document.getElementById("Prenom").value;
    var adresse = document.getElementById("Adresse").value;
    var ville = document.getElementById("Ville").value;
    var email = document.getElementById("Email").value;

    return {firstName:prenom,lastName:nom,address:adresse,city:ville,email:email};    
}



//************************
// Redirige vers la page confirmation
//************************


function redirectionConfirmation(orderId){
    document.location.href="/confirmation.html?id="+orderId; 
  }