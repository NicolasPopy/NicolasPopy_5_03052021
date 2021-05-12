export function chargerPanier()
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

export  function ajouterElementPanier(element, doublon) {
  var panier = chargerPanier();

  if (doublon || (doublon == false && panier.exists(element) == false)) {
    // si on autorise les doublons, on ajoute tout le temps ou si on n'autorise pas les doublons mais que l'élément n'est pas dans le panier, on ajoute.
    panier.push(element);
    sauverPanier(panier);
  }
}