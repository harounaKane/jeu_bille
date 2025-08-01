let nombre = 5;
let coup = 0;
let coup_precedent = 0;
let joueurActif = "salah";
let historique = {
    "salah": [],
    "azzedine": []
};

info()

document.querySelectorAll("button").forEach(element => {
    element.addEventListener("click", (e) => {
        coup = parseInt( e.target.value );
        jouer(coup);
    })
});

function jouer(){
    if ( coup == coup_precedent || coup < 0 || coup > 3 || coup > nombre ){
        byId("erreur").classList.add('alert-danger');
        byId("erreur").textContent = "erreur";
        return;
    }

    coup_precedent = coup;
    nombre -= coup;

    if( nombre == 0 || (coup == 1 && nombre == 1) ){
        byId("info").innerHTML = `<h2>${joueurActif} a gagné 🎮 cette partie</h2>`;
        return;
    }

    joueurActif = joueurActif == "salah" ? "azzedine" : "salah";

    info();
}

function info(){
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

function byId(id){return document.getElementById(id);}