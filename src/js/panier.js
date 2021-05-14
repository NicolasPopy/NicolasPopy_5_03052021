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