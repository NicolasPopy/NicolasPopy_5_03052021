
import "../css/main.scss";
import "../css/validation.scss";
import * as monPanier from "./panier.js";

var total = 0;


//************************
// Charge recap commande  et calcule total
//************************

window.onload = function() {
    try{
        chargerPanierHtml();

        var btnvalide = document.querySelector(".btn-validerpanier");
        btnvalide.addEventListener ("click", validerPanier);
        
        var btnvide = document.querySelector(".btn-viderpanier");
        btnvide.addEventListener ("click", viderPanier);


    }
    catch(ex){
        console.log(ex);
    }
};

//************************
// Charge le panier dans la case panier de
//************************

function chargerPanierHtml(){
    monPanier.chargerPanier().then(function(res) {
        // on vide le div avant de le remplir
        var carddeck = document.querySelector("#grille_produits");
        carddeck.innerHTML ="";

        if(res.length >0)
        {
            for (let article in res) {
                createCardProduit(res[article]);
            };
        }
    });
    
    creerTotal();
}

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
    cardimg.classList.add("img_carre","img-fluid");
    cardimg.setAttribute("src", article.imageUrl);

    //body
    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body","py-0");

    //title
    var cardtitle = document.createElement("h3")
    cardtitle.classList.add("card-title","text-center");
    cardtitle.innerHTML = article.name;
    cardbody.appendChild(cardtitle);


    //footer
    var cardfooter = document.createElement("div");
    cardfooter.classList.add("card-footer");
    var strong = document.createElement("strong");
    strong.innerHTML = article.qte + " X " + (article.price / 100).toFixed(2) + "€";
    cardfooter.appendChild(strong);


    cardhorizontal.appendChild(cardimg);
    cardhorizontal.appendChild(cardbody);
    cardhorizontal.appendChild(cardfooter);

    card.appendChild(cardhorizontal);

    var carddeck = document.querySelector("#grille_produits");
    carddeck.appendChild(card)
}


//************************
// Affiche le total dans le DOM
//************************


async function creerTotal() {
    var cardtotal = document.querySelector("#Total");
    cardtotal.innerHTML = await monPanier.calculTotalCommande() + '€';
}


//************************
// POST la commande et destinataire au serveur pour confirmation
//************************


async function  validerPanier() {

    var form = document.querySelector(".formDestinataire");
    var nom = document.querySelector("#Nom");

    if(form.checkValidity() == false ){
        alert("Certains champs ne sont pas conformes :\n " + checkForm());
    }
    else
    {   
        var contact =  getInfosClient();
        const products = await monPanier.chargerIds();

        if(products.length > 0)
        {
            var  jsonbody = {contact,products,};    

            var ret = await fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(jsonbody)
            })            

            var reponse = await ret.json();
            redirectionConfirmation(reponse.orderId);
        }
        else
        {
            alert("Votre panier est vide.");
        }
    }
}

async function viderPanier(){
    await monPanier.viderPanier();
    chargerPanierHtml();
}


//************************
// Vérification du formulaire de contact
//************************

function checkForm(){
    var prenom = document.querySelector("#Prenom");
    var nom = document.querySelector("#Nom");
    var adresse = document.querySelector("#Adresse");
    var ville = document.querySelector("#Ville");
    var email = document.querySelector("#Email");

    var message = "";
    message += checkTextInput(prenom) + checkTextInput(nom) + checkTextInput(adresse) + checkTextInput(ville) + checkEmail(email);

    return message;
}

function checkTextInput(inp){
    if(inp.value == null || inp.value == "")
    {
        return "- Le champ " + inp.name + " est vide.\n";
    }
    else
    {
        if(inp.checkValidity()==false){
            return "- Le champ " + inp.name + " n'utilise pas de caractères alphabétique ou spéciaux autorisés ( ,.'-).\n";
        }
        else
            return "";
    }
}


function checkEmail(inp){
    if(inp.value == null || inp.value == "")
    {
        return "- Le champ Email est vide";
    }
    else
    {
        if(inp.checkValidity()==false){
            return "- Le champ Email n'est pas au bon format autorisé.";
        }
        else
            return "";
    }
}

//************************
// Récupère les infos du destinataire dans le DOM
//************************

function getInfosClient() {
    var nom = document.querySelector("#Nom").value;
    var prenom = document.querySelector("#Prenom").value;
    var adresse = document.querySelector("#Adresse").value;
    var ville = document.querySelector("#Ville").value;
    var email = document.querySelector("#Email").value;

    return {firstName:prenom,lastName:nom,address:adresse,city:ville,email:email};    
}



//************************
// Redirige vers la page confirmation
//************************


function redirectionConfirmation(orderId){
    document.location.href="/confirmation.html?id="+orderId; 
}