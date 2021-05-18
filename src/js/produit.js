import "../css/main.scss";
import "../css/produit.scss";
import * as monPanier from "./panier.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
var produit ;





//************************
// Affiche détail produit 
//************************


fetch("http://localhost:3000/api/cameras/" + id)
.then(function(res) {
    if (res.ok) {        
        return res.json();
    }
})
.then(function(value) {

    produit = value;
    produit.qte = 1;
    afficheProduit(value);
    loadpanier();
    
})
.catch(function(err) {
    // Une erreur est survenue
});

//************************
// Affiche détail produit dans le DOM
//************************


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
      btn.addEventListener ("click", ajouterPanier);

        var btn = document.getElementsByClassName("btn-viderpanier")[0];
        btn.addEventListener ("click", viderPanier);

    }catch(ex)
    {
        console.error(ex);
    }
    return
}


// *************
// Panier Aside
//**************


async function loadpanier(loadpanier) {
  var panierliste = document.getElementById("panierliste");
  panierliste.innerHTML='';
  console.log("loadpanier");

  var panier = await monPanier.chargerPanier();
  console.log(panier);
  for (let prod in panier) {
    ajouterlipanier(panier[prod]);
  }

}

async function ajouterPanier(){ 
    await monPanier.ajouterElementPanier(produit, true);
    loadpanier();
}

async function viderPanier(){ 
  await monPanier.viderPanier();
  loadpanier();
}


function ajouterlipanier(prod) {
  var panierliste = document.getElementById("panierliste");
  var liproduit = document.createElement("li");

  liproduit.innerHTML = prod.name +" qté : " + prod.qte;
  panierliste.appendChild(liproduit);
}