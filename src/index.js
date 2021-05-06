import "./style.scss";


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
    console.log(document)
    
})
.catch(function(err) {
    // Une erreur est survenue
});


function createArticle(article){
    try{
        

        var card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("width","0.5 vw");
        

        var card_img = document.createElement("img");
        card_img.src = article.imageUrl;

        card.appendChild(card_img)

        var card_body = document.createElement("div");
        card_body.classList.add("card-body")
        

    
        var card_title = document.createElement("h1");
        card_title.innerHTML = article.name;
        card_body.appendChild(card_title);

        var card_desc = document.createElement("p");
        card_desc.innerHTML = article.description;
        card_body.appendChild(card_desc);

        card.appendChild(card_body);       

        var carddeck = document.getElementsByClassName("card-deck")[0];

        carddeck.appendChild(card)
}
catch(ex) {console.log(ex);}
}

