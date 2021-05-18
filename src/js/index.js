import "../css/main.scss";
import "../css/index.scss";


//**********************
// Chargement de la page et des produits
//**********************

window.onload = function() {

    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        for (let prop in value) {
            createArticle(value[prop])
        };      
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
};



//**********************
// Création card produit
//**********************


function createArticle(article){
    try{
        //Création du lien
        var link=document.createElement("a")
        link.setAttribute("href","produit.html?id=" + article._id)
        link.classList.add("stretched-link");

        //Création de la carte
        var card = document.createElement("article");
        card.classList.add("card","col","mx-4");

        card.appendChild(link);
        
        //Création de l'image
        var card_img = document.createElement("img");
        card_img.classList.add("card-img-top");
        card_img.src = article.imageUrl;
        card.appendChild(card_img)

        //Création du body de la card
        var card_body = document.createElement("div");
        card_body.classList.add("card-body")
        

        //Création du titre de la card
        var card_title = document.createElement("h2");
        card_title.classList.add("card-title");
        card_title.innerHTML = article.name;
        card_body.appendChild(card_title);

        //Création de la description de la card
        var card_desc = document.createElement("p");
        card_desc.classList.add("card-subtitle");        
        card_desc.innerHTML = article.description;
        card_body.appendChild(card_desc);

        //Création du prix de la card
        var card_prix = document.createElement("div");
        card_prix.classList.add("card-footer","fw-bold");
        card_prix.innerHTML = article.price/100 + " €";
        

        //Ajout de la card dans card-deck
        card.appendChild(card_body);
        card.appendChild(card_prix);
        var carddeck = document.getElementById("grille_produits");
        carddeck.appendChild(card)
}
catch(ex) {console.log(ex);}
}

