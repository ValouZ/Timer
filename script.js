let presetBoutons = document.getElementsByClassName("btn");

let container = document.getElementsByClassName("container")[0];

let btnSetTimer = document.getElementsByClassName("set-timer")[0];

let hourInfo = document.getElementsByClassName("hour-info")[0];
let or = document.getElementsByClassName("or")[0];

let timerInProcess = document.getElementsByClassName("timer-in-process")[0];
let endTimer = document.getElementsByClassName("end-timer")[0];

let hourInputsDiv = document.getElementsByClassName("hour-end-inputs")[0];
let hourInputs = document.getElementsByClassName("hour-input");

let timer = document.getElementsByClassName("timer")[0];
let timerInputsDiv = document.getElementsByClassName("timer-inputs")[0];
let timerInputs = document.getElementsByClassName("timer-input");
let buttonAdd5 = document.createElement("button");

let dateEnd = "";
let NumTimer = 0;
let value = 0;
let dateHour = undefined;
let dateMinut = undefined;
let hour = 0;
let minut = 0;
let second = 0;

presetAddEventListener();

//_______________RECUPERE LA VALEUR DES BOUTONS_____________________//
function presetAddEventListener(){
    for (let i = 0; i < presetBoutons.length; i++){
        //  Ajout des actions listener sur les presetBoutons
        presetBoutons[i].addEventListener("click", startPresetGame);
        presetBoutons[i].classList.add("btn-hover");
    }
}     

//_______________RECUPERE LA VALEUR DANS L'INPUT DU TIMER_____________________//
for (let i = 0; i < timerInputs.length; i++){

    //on écoute tous les input dans le timer au moment de l'entrée de donnée dans les differents champs
    timerInputs[i].addEventListener("input", () =>{ 
        //On enlève la couleur de fin rouge donc on lui enlève la classe placeholder sur les inputs, on remets les couleurs et le texte de bases
        switchColors(false);

        endTimer.textContent = "Saisissez votre timer manuellement";

        //Si c'est des heures 
        if (i == 0){
            //si l'utilisateur n'a rien rentré ou supprimé son  texte on initilise à 0
            if (hour == ""){
                hour = 0;
            }
            //on récupère la valeur des heures et on les mutliple par 3600 pour avoir des secondes
            hour = Number(timerInputs[i].value)*3600;
        }
        //Si c'est des minutes
        if (i == 1){
            //si l'utilisateur n'a rien rentré ou supprimé son  texte on initilise à 0
            if (minut == ""){
                minut = 0;
            }
            //on récupère la valeur des minutes et on les mutliple par 60 pour avoir des secondes
            minut = Number(timerInputs[i].value)*60;
        }
        //Si c'est des secondes
        if (i == 2){
            //si l'utilisateur n'a rien rentré ou supprimé son  texte on initilise à 0
            if (second == ""){
                second = 0;
            }
            //on récupère la valeur des secondes et on les mutliple par 60 pour avoir des secondes
            second = Number(timerInputs[i].value); 
        }
        //on rajoute le tout (= le temps des heure, des minutes et des secondes) dans value pour pouvoir l'utiliser plus tard
        value = hour + minut + second;

    });
}

//_______________RECUPERE LA DATE DE FIN_____________________//
for (let i = 0; i < hourInputs.length; i++){
    hourInputs[i].addEventListener('input', () => {
        switchColors(false);
        //Si c'est des heures 
        if (i == 0){
            dateHour = Number(hourInputs[i].value);
        }
        //Si c'est des minutes
        if (i == 1){
            //on récupère la valeur des minutes et on les mutliple par 60 pour avoir des secondes
            dateMinut = Number(hourInputs[i].value);
        }
        // console.log(dateHour + "h - " + dateMinut);
    });
}



//_______________LANCE LE JEU SUR "ENTREE"_____________________//
window.addEventListener("keypress", (e) =>{
    if (e.key == "Enter"){
        start();
    }
});

//_______________ON ECOUTE LE BOUTON AU CLIC_____________________//
btnSetTimer.addEventListener("click", start); 

//_______________FONCTION POUR TOUT REINITIALISER ENN FIN/STOP DU TIMER_____________________//
function reset(){
    //on arrete les répétion
    clearInterval(NumTimer);
    // On enleve la class pour pouvoire faire la vérification dans start()
    buttonAdd5.classList.remove("btn-add5");
    // On enleve le bouton de la page
    timer.removeChild(buttonAdd5);
    // On lui enleve ses actions pour pas les multiplier
    buttonAdd5.removeEventListener("click", addFiveMinuts);
    
    //on réinitialise tout
    diff = 0;
    NumTimer = 0;
    value = 0;
    hour = 0;
    minut = 0;
    second = 0;
    dateHour = undefined;
    dateMinut = undefined;
    hourInputsDiv.style.display = "flex";
    timerInputsDiv.style.display = "flex";
    hourInfo.style.display = "flex";
    or.style.display = "flex";
    timerInProcess.textContent = "";
    // On reset le bouton avec ses classes de bases et le texte de base
    btnSetTimer.textContent = "Demarrer";
    btnSetTimer.classList.remove("stop");
    btnSetTimer.classList.add("start");
    //_______________REECOUTER LES BOUTONS DE DUREE_____________________//
    presetAddEventListener();
}

//_______________FONCTION QUI SE LANCE AU DEBUT____________________//
function start(){
    //_______________ON ONLEVE L'ECOUTE SUR LES BOUTONS_____________________//
    for (let i = 0; i < presetBoutons.length; i++){
        presetBoutons[i].removeEventListener("click", startPresetGame);
        presetBoutons[i].classList.remove("btn-hover");
    }
    //on fait disparaitre la div input du timer pour que l'utilisateur ne puisse pas entrer de valeurs
    timerInputsDiv.style.display = "none";
    hourInputsDiv.style.display = "none";
    hourInfo.style.display = "none";
    or.style.display = "none";


    //on vide la value dans les input du timer
    for (let i = 0; i < timerInputs.length; i++){
        timerInputs[i].value = "";
    }

    //_______________INITIALISATION DATE DE FIN SI L'UTILISATEUR LES A ENTREES_____________________//
    if (hourInputs[0].value != "" && hourInputs[1].value != ""){
        dateEnd = new Date();
        if (dateHour < dateEnd.getHours() || (dateHour == dateEnd.getHours() && dateMinut < dateEnd.getMinutes())){
            dateEnd.setDate(dateEnd.getDate() + 1);
        }
        dateEnd.setHours(dateHour);
        dateEnd.setMinutes(dateMinut);
        // console.log(dateEnd);
    }

    //_______________ARRETER LE TIMER_____________________//
    // si il clique sur le bouton onn arrete tout
    if  (NumTimer != 0){
        //On appel la fonction pour tout reset
        reset();
        endTimer.textContent = "Saisissez votre timer manuellement";
        return;
    }

    //Pour ne pas envoyer un timer sans valeur
    if (value <= 0 && dateEnd == ""){
        // style couleur rouge 
        timerInputsDiv.style.display = "flex";
        hourInputsDiv.style.display = "flex";
        hourInfo.style.display = "flex";
        or.style.display = "flex";

        switchColors(true);

        endTimer.textContent = "Valeur incorrecte";
        //On ajoute la possibilité de cliquer sur les boutons car le timer ne s'est pas lancé
        presetAddEventListener();
        return;
    }

    //_______________NOUVELLES DATES_____________________//
    //on initialise la date de départ
    let dateStart = new Date();
    //on initialise la date de fin
    if (hourInputs[0].value == "" || hourInputs[1].value == ""){
        dateEnd = new Date(dateStart.getTime() + value*1000);
    }

    //on vide la value dans les input de la date de fin
    for (let i = 0; i < hourInputs.length; i++){
        hourInputs[i].value = "";
    }
    
    //Transforme le texte demarrer du bouton par arreter
    timerInProcess.style.color = "#46D4AD";
    endTimer.style.color = "#46D4AD";
    // On enleve la class start et ajout stop pour changer le style du bouton
    btnSetTimer.classList.add("stop");
    btnSetTimer.classList.remove("start");
    btnSetTimer.textContent = "Arreter";

  
//_______________BOUTON +5 mins_____________________//
    //on ajoute un bouton +5 mins que si celui ci n'a pas de class
    if (!(buttonAdd5.classList.contains("btn-add5"))){
        buttonAdd5.classList.add("btn-add5");
        buttonAdd5.classList.add("btn-add5-hover");
        buttonAdd5.textContent = "+5min";
        timer.appendChild(buttonAdd5);
        buttonAdd5.addEventListener("click",addFiveMinuts);
    
    }

    

//_______________TIMER_____________________//
    // on répète la fonction timerfct toute les 50mms pour être sure de ne pas rater l'affiche d'une seconde
    NumTimer = setInterval(() => {timerfct(dateEnd)}, 50);
    displayEndTimer();
}

//_______________FONCTION QUI RECUPERE LA VALEUR DES BOUTONS ET DEMARE LE TIMER_____________________//
function startPresetGame(){
    value = this.value;
    start();
}

function switchColors(etat){
    // on met en rouge
    if (etat == true){
        for (let i = 0; i < timerInputs.length; i++){
            timerInputs[i].classList.add("placeholder");
        }
        for (let i = 0; i < hourInputs.length; i++){
            hourInputs[i].classList.add("placeholder");
        }
        timerInputsDiv.style.color = "#dd4244";
        hourInputsDiv.style.color = "#dd4244";
        hourInfo.style.color = "#dd4244";
        endTimer.style.color = "#dd4244";
        or.style.color = "#dd4244";
    }
    // On met en vert
    else {
        for (let j = 0; j < hourInputs.length; j++){
            hourInputs[j].classList.remove("placeholder");
        }
        for (let j = 0; j < timerInputs.length; j++){
            timerInputs[j].classList.remove("placeholder");
        }
        timerInputsDiv.style.color = "#46D4AD";
        endTimer.style.color = "#46D4AD";
        hourInputsDiv.style.color = "#46D4AD";
        hourInfo.style.color = "#46D4AD";
        or.style.color = "#46D4AD";
    }
    
}

//________________FONTION TIMER_____________________//               
//function timerfct (SecondRest, MinutRest, HourRest, dateEnd){
function timerfct (dateEnd){
    let NewDate = new Date();
    
    //on fait la difference entre la date actuelle et la date à la quelle on doit arriver
    //le résultat est donné en milisecondes
    let diff  = dateEnd - NewDate;

    //on arrète de faire setInterval lorsque lon arrive au décompte de 0
    if (diff <= 0 ){
        //On appel la fonction pour tout reset
        reset();
        // on change la couleur du texte du timer et du message de fin pour que l'oeil soit attirer sur ça
        switchColors(true);
        return;
    }

    //on récupère la partie entière pour n'avoir plus que des secondes
    diff = Math.floor(diff/1000);
    //on regarde avec un modulo 60 combien de seconde il reste
    let second = diff % 60;

    //on enlève les secondes et on récupère la partie entière pour n'avoir plus que les minutes
    diff = Math.floor((diff-second)/60);
    //on regarde avec un modulo 60 combien de minutes il reste
    let minut = diff % 60;

    //on enlève les minutes et on récupère la partie entière pour n'avoir plus que les heures
    diff = Math.floor((diff-minut)/60);
    let hour = diff;

    //Pour ajouter des 0 devant les chiffres
    if (hour < 10)
        hour = 0 + "" + hour;
    if (minut < 10)
        minut = 0 + "" + minut;
    if (second < 10)
        second = 0 + "" + second;

    //on affiche le timer celon s'il y a des heures des minutes ou des secondes
    if (hour > 0)
        timerInProcess.textContent = hour + ":" + minut + ":" + second;
    else{
        timerInProcess.textContent = minut+ ":" + second;
    }
}

function displayEndTimer(){
    let h = dateEnd.getHours();
    let m = dateEnd.getMinutes(); 
    if (h < 10)
        h = 0 + "" +h;
    if (m < 10)
        m = 0 + "" + m;
    endTimer.textContent = "Devant vos ordinateurs à " + h +"h"+ m;
}

//fonction pour ajouter 5 mins à value et relancer le timer
function addFiveMinuts(){
    if (value > 0){
        value = Number(value) + 5*60;
        clearInterval(NumTimer);
        NumTimer = 0;
        start();
    }
    else {
        dateEnd.setMinutes(dateEnd.getMinutes() + 5);
        displayEndTimer();
    }
}