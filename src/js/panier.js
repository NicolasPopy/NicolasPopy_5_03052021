//**********************
// Récupère les infos du panier dans le LocalStorage
//**********************

export async function chargerPanier()
{
    if(localStorage.getItem('panier') != null)
    {
        return JSON.parse(localStorage.getItem("panier"));
    }
    else
    {
        return new Array(0);
    }
}

//**********************
// Sauve le panier dans le LocalStorage 
//**********************

function sauverPanier(panier)
{
    localStorage.setItem("panier", JSON.stringify(panier));
}


// Ajoute un article dans le panier et Save dans LocalStorage

export  function ajouterElementPanier(element) {
        chargerPanier().then((res)=>{
            var index = res.findIndex((e) => e._id == element._id);
            if (index >= 0 && res.length>0) {
                res[index].qte +=1;
            } else {
                element.qte = 1;
                res.push(element);
            }

            //res.push(element);
            sauverPanier(res);
    });
}

//**********************
// Vide le panier du LocalStorage
//**********************

export async function viderPanier()
{
    localStorage.clear();
}


//**********************
// Récupère les Ids des articles dans un tableau pour POST la commande
//**********************

export async function chargerIds(){
    var tabid = [];
    var panier = await chargerPanier();

    for (let prod in panier) {
        tabid.push(panier[prod]._id);
    }
    console.log("retour chargerid");
    return tabid;
}


//**********************
// Calcul prix total de la commande
//**********************

export async function calculTotalCommande(){
    var total = 0;

    var panier = await chargerPanier();
    for (let prod in panier) {
        total += panier[prod].price * panier[prod].qte;
    }

    return (total/100).toFixed(2);
}