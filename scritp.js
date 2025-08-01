let nombre, total;
let coup = 0;
let coup_precedent = 0;
let j1, j2;
let joueurActif = "";
let historique = {};

// données formulaire
byId("form").addEventListener("submit", (e) => {
    e.preventDefault();

    j1 = byId("j1").value;
    j2 = byId("j2").value;
    nombre = parseInt( byId('nbr').value ); 
    total = nombre;

    historique[j1] = [];
    historique[j2] = [];

    joueurActif = j1;

    byId("form").classList.add("d-none")
    byId("jeu").classList.remove("d-none")
    
    info()
});



// Evenement click sur le button (1, 2, 3)
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        coup = parseInt( e.currentTarget.value );
        jouer(coup);
        e.currentTarget.disabled = true;
    })
});


function jouer(){
    // Vérifie si erreur de choix
    if ( coup == coup_precedent || coup < 0 || coup > 3 || coup > nombre ){
        byId("erreur").classList.add('alert-danger');
        byId("erreur").classList.remove('d-none');
        byId("erreur").textContent = "erreur de choix";
        return;
    }

    coup_precedent = coup;
    nombre -= coup;

    // mise à jour historique coup
    historique[joueurActif].push(coup);

    infoHistorique();

    // Vérifie si fin de jeu
    if( nombre == 0 || (coup == 1 && nombre == 1) ){
        byId("info").innerHTML = `<h2>${joueurActif} a gagné 🎮 cette partie</h2>`;
        byId('bille').style.display = "none";
        return;
    }

    // changement de joueur
    joueurActif = joueurActif == j1 ? j2 : j1;

    info();
}


function info(){
    // désactiver tous les btn
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });

    byId("info").innerHTML = "";

    let msgJoueur = document.createElement("h3");
    msgJoueur.textContent = `${joueurActif} à toi de jouer: `;
    byId("info").appendChild(msgJoueur);

    let msgCp= document.createElement("div");
    msgCp.textContent = `Coup précédent: ${coup_precedent}`;
    byId("info").appendChild(msgCp);
    console.log(nombre);

    let nbr= document.createElement("div");
    nbr.textContent = `Reste: ${nombre}`;
    byId("info").appendChild(nbr);

    bille();
}


function bille(){
    let image = "";
    for (let index = 0; index < nombre; index++) {
        image += "🥎";
    }

    byId('bille').innerHTML = image;
}


// historique des coups par joueur
function infoHistorique(){
    byId("info-historique").innerHTML = "";

    // for in : clé de l'objet (historique)
    for( let joueur in historique){
        let h4 = document.createElement("h4");
        h4.textContent = `joueur: ${joueur} : `;
        byId("info-historique").appendChild(h4);

        let div = document.createElement("div");
        div.textContent = "[" + historique[joueur].join(", ") + "]";
        byId("info-historique").appendChild(div); 
    }
}



function byId(id){return document.getElementById(id);}