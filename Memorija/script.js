import nizSlika from "./Slike.js";

console.log(nizSlika);

let nizIskorisceni = [];
let kliknutoIme = [];
let kliknutId = [];
let pogodjeniParovi = [];

let unosImena = document.getElementById("unosImena");
let lako = document.getElementById("lako");
let srednje = document.getElementById("srednje");
let tesko = document.getElementById("tesko");
let ekspert = document.getElementById("ekspert")
let pocniIgru = document.getElementById("pocniIgru");
let containerSlika = document.getElementById("containerSlika");
let resetuj = document.getElementById("resetuj");
let vreme = document.getElementById("vreme");
let tabele = document.querySelectorAll(".tabela");
let cekiranaTezina = document.getElementsByName("skor");
let popup = document.getElementById("popup");
let closePopup = document.getElementById("closePopup")


let trenutnoVreme = 0;
let protekloVreme = 0;

let rezultatiLako = [];
let rezultatiSrednje = [];
let rezultatiTesko = [];
let rezultatiEkspert = [];


if (localStorage.getItem("lako") == null) {
    localStorage.setItem("lako", JSON.stringify(rezultatiLako));
}else{
    rezultatiLako = JSON.parse(localStorage.getItem("lako"));
    updateTable(0, rezultatiLako);
}
if (localStorage.getItem("srednje") == null) {
    localStorage.setItem("srednje", JSON.stringify(rezultatiSrednje));
}else{
    rezultatiSrednje = JSON.parse(localStorage.getItem("srednje"));
    updateTable(1, rezultatiSrednje);
}
if (localStorage.getItem("tesko") == null) {
    localStorage.setItem("tesko", JSON.stringify(rezultatiTesko));
}else{
    rezultatiTesko = JSON.parse(localStorage.getItem("tesko"));
    updateTable(2, rezultatiTesko);
}
if (localStorage.getItem("ekspert") == null) {
    localStorage.setItem("ekspert", JSON.stringify(rezultatiEkspert));
}else{
    rezultatiEkspert = JSON.parse(localStorage.getItem("ekspert"));
    updateTable(3, rezultatiEkspert);
}
console.log(rezultatiLako);

function sortiraj (niz) {
    for( let i = 0; i < niz.length - 1; i++){
        for( let j = i+1; j < niz.length; j++){
            if (Number(niz[j].vreme) < Number(niz[i].vreme)) {
                let placeholder = niz[i];
                niz[i] = niz[j];
                niz[j] = placeholder;
            }
        }
    }
    return niz.slice(0, 5);
}

function odbrojavanje() {
    trenutnoVreme++;
    vreme.innerHTML = trenutnoVreme;
}
pocniIgru.addEventListener("click", function() {
    containerSlika.innerHTML = "" 
    if (unosImena.value === "") {
        alert("Morate uneti ime!");
        return;
    }
    if (trenutnoVreme > 0) {
        clearInterval(protekloVreme);
        trenutnoVreme = 0;
    }
    if (containerSlika.innerHTML == "" && unosImena.value != "") {
        if (lako.checked) {
            nizIskorisceni = nizSlika.slice(0, 16);
        }else if (srednje.checked) {
            nizIskorisceni = nizSlika.slice(0, 36);
        }else if (tesko.checked) {
            nizIskorisceni = nizSlika.slice(0, 64);
        }else{
            nizIskorisceni = nizSlika.slice(0, 100);
        }
        let placeHolderSlika;
        for( let i = nizIskorisceni.length; i > 1; i--) {
            placeHolderSlika = nizIskorisceni[i-1];
            let randomSelektor = Math.floor(Math.random() * [i-1]);
            nizIskorisceni[i-1] = nizIskorisceni[randomSelektor];
            nizIskorisceni[randomSelektor] = placeHolderSlika;
        }
        console.log(nizIskorisceni);
        for( let i =0; i < nizIskorisceni.length; i++){
            let slika = document.createElement("img");
            slika.classList.add("slika");
            slika.setAttribute('src', 'slike/slika0.png');
            slika.setAttribute('id', i);
            slika.addEventListener("click", okreni);
            containerSlika.append(slika);
        }
        if (trenutnoVreme == 0) {
            trenutnoVreme = 0;
            protekloVreme = setInterval(odbrojavanje, 1000);
        }  
    }
})
function poklapanje() {
    const slike = document.querySelectorAll("img");
    const prvaSlikaId = kliknutId[0];
    const drugaSlikaId = kliknutId[1];
    if (prvaSlikaId == drugaSlikaId) {
        slike[prvaSlikaId].setAttribute("src", "slike/slika0.png");
        slike[drugaSlikaId].setAttribute("src", "slike/slika0.png");
    }else if (kliknutoIme[0] == kliknutoIme[1]) {
        slike[prvaSlikaId].removeEventListener("click", okreni);
        slike[drugaSlikaId].removeEventListener("click", okreni);
        pogodjeniParovi.push(kliknutoIme)
    }else {
        slike[prvaSlikaId].setAttribute("src", "slike/slika0.png");
        slike[drugaSlikaId].setAttribute("src", "slike/slika0.png");
    }
    kliknutoIme = [];
    kliknutId = [];
    if (pogodjeniParovi.length == nizIskorisceni.length / 2) {
        let rez = {
            name: `${unosImena.value}`,
            vreme: `${trenutnoVreme}`,
        }
        if (lako.checked) {
            rezultatiLako.push(rez);
            let top5 = sortiraj(rezultatiLako);
            rezultatiLako = top5;
            updateTable(0, rezultatiLako);
            localStorage.setItem("lako", JSON.stringify(rezultatiLako));
        }else if (srednje.checked) {
            rezultatiSrednje.push(rez);
            let top5 = sortiraj(rezultatiSrednje);
            rezultatiSrednje = top5;
            updateTable(1, rezultatiSrednje);
            localStorage.setItem("srednje", JSON.stringify(rezultatiSrednje));
        }else if (tesko.checked) {
            rezultatiTesko.push(rez);
            let top5 = sortiraj(rezultatiTesko);
            rezultatiTesko = top5;
            updateTable(2, rezultatiTesko);
            localStorage.setItem("tesko", JSON.stringify(rezultatiTesko));
        }else{
            rezultatiEkspert.push(rez);
            let top5 = sortiraj(rezultatiEkspert);
            rezultatiEkspert = top5;
            updateTable(3, rezultatiEkspert);
            localStorage.setItem("ekspert", JSON.stringify(rezultatiEkspert));
        }
        openPopup();
        console.log(rez);
        console.log(rezultatiLako);
        containerSlika.innerHTML = "";
        clearInterval(protekloVreme);      
        pogodjeniParovi =[];
        trenutnoVreme = 0;
        protekloVreme = 0;
    }
}


function okreni() {
    let idSlike = this.getAttribute("id");
    kliknutoIme.push(nizIskorisceni[idSlike].name);
    kliknutId.push(idSlike);
    this.setAttribute("src", nizIskorisceni[idSlike].img);
    if (kliknutoIme.length == 2) {
        setTimeout(poklapanje, 300);
    }
}
resetuj.addEventListener("click", () => {
    containerSlika.innerHTML = "";
    clearInterval(protekloVreme);
    pogodjeniParovi =[];
    trenutnoVreme = 0;
    protekloVreme = 0;
})

cekiranaTezina.forEach(t => {
    t.addEventListener("change", function () {
        tabele.forEach((tabela, i) => {
            tabela.style.display = "none";
            if (this.value == i) {
                tabela.style.display = "block";
            }
        });
    });
});


function updateTable(tezina, rezultat) {
    tabele[tezina].innerHTML = "<tr><td>Mesto</td><td>Korisničko ime</td><td>Vreme</td></tr>";
    rezultat.forEach((r, i) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = `${i + 1}.`;
        let td2 = document.createElement("td");
        td2.innerHTML = `${r.name}`;
        let td3 = document.createElement("td");
        td3.innerHTML = `${r.vreme}`;
        tr.append(td1, td2, td3);
        tabele[tezina].append(tr);
    });
}
function openPopup() {
    popup.classList.add("open-popup");
}
function closePopupFunction () {
    popup.classList.remove("open-popup")
}
closePopup.addEventListener("click", closePopupFunction);

