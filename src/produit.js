import "./css/main.scss";
import "./css/produit.scss";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');



fetch("http://localhost:3000/api/cameras/" + id)
.then(function(res) {
    if (res.ok) {        
        return res.json();
    }
})
.then(function(value) {
    afficheProduit(value);
    
})
.catch(function(err) {
    // Une erreur est survenue
});


function afficheProduit(prod){ 
    try{
      //Affiche titre
      var titre = document.getElementById("titre");
      var h1 = titre.getElementsByTagName("h1")[0];
      h1.innerHTML = prod.name;

      //Affiche prix
      var prix = document.getElementById("prix");
      var strong = prix.getElementsByTagName("strong")[0];
      strong.innerHTML = prod.price + " €";

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

      console.log(prod);
      for (let opt in prod.lenses) {
         var optionselect = document.createElement("option");
         optionselect.value = prod.lenses[opt];
         optionselect.innerHTML = prod.lenses[opt];
         option.appendChild(optionselect);
        console.log(prod.lenses[opt]);
      }
    }catch(ex)
    {
        console.error(ex);
    }
    return
}