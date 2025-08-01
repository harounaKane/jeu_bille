let nombre = 15;
let coup = 0;
let coup_precedent = 0;
let joueurActif = "salah";
let historique = {
    "salah": [],
    "azzedine": []
};

info()

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
        return;
    }

    // changement de joueur
    joueurActif = joueurActif == "salah" ? "azzedine" : "salah";

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

    let nbr= document.createElement("div");
    nbr.textContent = `Reste: ${nombre}`;
    byId("info").appendChild(nbr);
}

// historique des coups par joueur
function infoHistorique(){
    byId("info-historique").innerHTML = "";

    // for in : clé de l'objet (historique)
    for( let joueur in historique){
        let h4 = document.createElement("h4");
        h4.textContent = `joueur: ${joueur} : `;
        byId("info-historique").appendChild(h4);

        // chaque clé, on parcourt son tableau
        historique[joueur].forEach(c => {
            let div = document.createElement("div");
            div.textContent = `${c}, `;
            div.classList.add("d-inline");
            byId("info-historique").appendChild(div); 
        });

    }
}

function byId(id){return document.getElementById(id);}