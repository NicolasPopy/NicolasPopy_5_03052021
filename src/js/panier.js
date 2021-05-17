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


function sauverPanier(panier)
{
    localStorage.setItem("panier", JSON.stringify(panier));
}

export  function ajouterElementPanier(element) {
        chargerPanier().then((res)=>{
            res.push(element);
            sauverPanier(res);
    });
}

export function viderPanier()
{
    localStorage.clear();
}

export async function chargerIds(){
    var tabid = [];
    var panier = await chargerPanier();

    for (let prod in panier) {
        tabid.push(panier[prod]._id);
    }
    console.log("retour chargerid");
    return tabid;

}