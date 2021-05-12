import "../css/main.scss";
import "../css/produit.scss";
import * as monPanier from "./panier.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
var produit ;



fetch("http://localhost:3000/api/cameras/" + id)
.then(function(res) {
    if (res.ok) {        
        return res.json();
    }
})
.then(function(value) {

    produit = value;
    afficheProduit(value);
    loadpanier();
    
})
.catch(function(err) {
    // Une erreur est survenue
});

function loadpanier() {
    var panier = monPanier.chargerPanier(); 
    
    for (let prod in panier) {
        ajouterlipanier(panier[prod].name);
    }
}

function ajouterlipanier(nameprod){
    var panierliste = document.getElementById("panierliste");
    var liproduit = document.createElement("li");

    liproduit.innerHTML = nameprod;
    panierliste.appendChild(liproduit);
}



function afficheProduit(prod){ 
    try{
      //Affiche titre
      var titre = document.getElementById("titre");
      var h1 = titre.getElementsByTagName("h1")[0];
      h1.innerHTML = prod.name;

      //Affiche prix
      var prix = document.getElementById("prix");
      var strong = prix.getElementsByTagName("strong")[0];
      strong.innerHTML = prod.price/100 + " €";

      //Affiche image
      var photo = document.getElementById("photo");
      var img = photo.getElementsByTagName("img")[0];
      img.setAttribute("src", prod.imageUrl);

      //Affiche description
      var description = document.getElementById("description");
      var p = description.getElementsByTagName("p")[0];
      p.innerHTML = prod.description;

      //Affiche Option
      var option = document.getElementsByClassName("form-select")[0];
      for (let opt in prod.lenses) {
         var optionselect = document.createElement("option");
         optionselect.value = prod.lenses[opt];
         optionselect.innerHTML = prod.lenses[opt];
         option.appendChild(optionselect);
      }

      //Affiche bouton
      var btn = document.getElementsByClassName("btn-panier")[0];

      btn.onclick=ajouterPanier;


    }catch(ex)
    {
        console.error(ex);
    }
    return
}


function ajouterPanier(){ 
    monPanier.ajouterElementPanier(produit, true);

    ajouterlipanier(produit.name);

}
