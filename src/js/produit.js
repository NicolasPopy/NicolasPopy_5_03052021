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

window.onload = function() {
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
}

//************************
// Affiche détail produit dans le DOM
//************************


function afficheProduit(prod){ 
    try{
      //Affiche titre
      var h1 = document.querySelector("#titre h1");
      h1.innerHTML = prod.name;

      //Affiche prix   
      var strong = document.querySelector("#prix strong");
      strong.innerHTML = (prod.price/100).toFixed(2) + "€";

      //Affiche image
      var img = document.querySelector("#photo img");
      img.setAttribute("src", prod.imageUrl);

      //Affiche description
      var p = document.querySelector("#description p");
      p.innerHTML = prod.description;

      //Affiche Option
      var option = document.querySelector(".form-select");
      for (let opt in prod.lenses) {
          var optionselect = document.createElement("option");
          optionselect.value = prod.lenses[opt];
          optionselect.innerHTML = prod.lenses[opt];
          option.appendChild(optionselect);
      }

      //Affiche bouton
      var btn = document.querySelector(".btn-panier");
      btn.addEventListener ("click", ajouterPanier);

      
      var btnvalider = document.querySelector("#bouton_valider");
      btnvalider.addEventListener ("click", redirectionValidation );


        var btnvider = document.querySelector("#bouton_vider");
        btnvider.addEventListener ("click", viderPanier);

    }catch(ex)
    {
        console.error(ex);
    }    
}

function redirectionValidation()
{
  document.location.href="/validation.html"
}


// *************
// Panier Aside
//**************


async function loadpanier(loadpanier) {
  var panierliste = document.querySelector("#panierliste");
  panierliste.innerHTML='';

  var panier = await monPanier.chargerPanier();
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
  var panierliste = document.querySelector("#panierliste");
  var liproduit = document.createElement("li");
  liproduit.classList.add("list-group-item","bg-light","mx-4","my-3","py-5","py-lg-1");

  liproduit.innerHTML = prod.name +" qté : " + prod.qte;
  panierliste.appendChild(liproduit);
}