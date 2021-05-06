fetch("http://localhost:3000/api/cameras")
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    for (let prop in value) {
        createLigne(value[prop])
    };
    console.log(document)
    
})
.catch(function(err) {
    // Une erreur est survenue
});


function createLigne(article){
    try{
        var lig = document.createElement("div")
        lig.classList.add("row");
        var colid = createColonne(article._id);
        lig.appendChild(colid);
        var colname = createColonne(article.name);
        lig.appendChild(colname);
        var colprice = createColonne(article.price);
        lig.appendChild(colprice);
        var colimg = createColonneImage(article.imageUrl);
        lig.appendChild(colimg);

        var h1 = document.getElementsByTagName("h1")[0];

        document.body.insertBefore(lig,h1)
}
catch(ex) {console.log(ex);}
}

function createColonne(donnee){
    try{
        var col = document.createElement("div");
        col.classList.add("col");

        var newContent = document.createTextNode(donnee);
        col.appendChild(newContent);

        return col;
    }
    catch(ex) {console.log(ex);}
}

function createColonneImage(donnee){
    try{
        var col = document.createElement("div");
        col.classList.add("col");

        var newContent = createImg(donnee,'image');
        col.appendChild(newContent);

        return col;
    }
    catch(ex) {console.log(ex);}
}


function createImg(src, alt) {
    var img = document.createElement('img');
    img.src = src;
    img.setAttribute("width","40%");
    if ( alt != null ) img.alt = alt;

    return img;
}