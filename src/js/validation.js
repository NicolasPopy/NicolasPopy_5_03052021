
import "../css/main.scss";
import "../css/panier.scss";
import * as monPanier from "./panier.js";


var total = 0;

window.onload = function() {
     monPanier.chargerPanier().then(function(res) {

        var tabdedouble = [];

        for(var element in res){
            console.log(element) ;
            if (
              tabdedouble.filter((e) => e._id === res[element]._id).length > 0
            ) {
              res[element].qte += 1;
            } else {
              res[element].qte = 1;
            }
             tabdedouble.push(res[element]);
        }
    
        console.log(tabdedouble.length);
        if(tabdedouble.length >0)
        {
            for (let article in tabdedouble) {
            createCardProduit(tabdedouble[article]);
            };
        }

        creerTotal();
        
    });
};




function createCardProduit(article)
{   
    // Card
    var card = document.createElement("article");
    card.classList.add("card","w-75","mb-4");

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

    total += article.price;
    


    cardhorizontal.appendChild(cardimg);
    cardhorizontal.appendChild(cardbody);
    cardhorizontal.appendChild(cardfooter);

    card.appendChild(cardhorizontal);

    var carddeck = document.getElementById("grille_produits");
    carddeck.appendChild(card);

}

function creerTotal() {

    var cardtotal = document.getElementById("Total");

    cardtotal.innerHTML = total/100 + ',00 €';
}


