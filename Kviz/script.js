let pitanje1 ={
    tekst: "Za koje od navedenih dostignuća je Albert Ajnštajn dobio Nobelovu nagradu?",
    odgovori:["Teorija relativnosti", "Fotoelektricni efekat", "Braunovo kretanje", "Kvantna teorija"],
    indeksTacnogOdgovora: 1 
};
let pitanje2 = {
    tekst: "Koliko dugo je trajao Stogodisnji rat?",
    odgovori:["96 godina", "103 godine", "109 godina", "116 godina"],
    indeksTacnogOdgovora: 3
};
let pitanje3 = {
    tekst: "Koje je najvece ostrvo u Japanu?",
    odgovori:["Honšu", "Kjušu", "Hokaido", "Šikoko"],
    indeksTacnogOdgovora: 0
};
let pitanje4 = {
    tekst: "Koji naučnik se smatra začetnikom klasične genetike?",
    odgovori:["Čarls Darvin", "Robert Huk", "Gregor Mendel", "Luj Paster"],
    indeksTacnogOdgovora: 2
};
let pitanje5 = {
    tekst: "Zid koji se nalazi između teritorija današnje Engleske i Škotske je dobio ime po kom rimskom imperatoru?",
    odgovori:["Trajanu", "Hadrijanu", "Oktavijanu Avgustu", "Klaudiju"],
    indeksTacnogOdgovora: 1
};
let pitanje6 = {
    tekst:"Ko je komponovao 'Prsten Nibelunga', ciklus od četiri opere?",
    odgovori:["Volfgang Amadeus Mocart", "Ludvig Van Betoven", "Rihard Vagner", "Jozef Hajdn"],
    indeksTacnogOdgovora: 2
};
let pitanje7 = {
    tekst: "Koliko kvantnih brojeva postoji?",
    odgovori:["Dva", "Tri", "Četiri", "Pet"],
    indeksTacnogOdgovora: 2
};
let pitanje8 = {
    tekst: "Koji antički grčki filozof je autor paradoksa o Ahilu i kornjači?",
    odgovori:["Zenon", "Platon", "Aristotel", "Demokrit"],
    indeksTacnogOdgovora: 0
};
let pitanje9 = {
    tekst: "Kako se zovu linije na geografskoj karti koje povezuju mesta iste nadmorske visine?",
    odgovori:["Izobate", "Izoterme", "Izobare", "Izohipse"],
    indeksTacnogOdgovora: 3
};
let pitanje10 ={
    tekst: "Koliko žena je imao engleski kralj Henri VII Tjudor?",
    odgovori:["Pet", "Šest", "Sedam", "Osam"],
    indeksTacnogOdgovora: 1
}; 
let pitanje11 ={
    tekst: "Koliko kostiju ima telo odraslog čoveka?",
    odgovori:["206", "221", "237", "245"],
    indeksTacnogOdgovora: 0
}; 
let pitanje12 ={
    tekst: "Koji od navedenih manastira je zadužbina srpskog kralja Stefana Prvovenčanog?",
    odgovori:["Studenica", "Žiča", "Manasija", "Mileševa"],
    indeksTacnogOdgovora: 1
}; 
let pitanje13 ={
    tekst: "Koje je najdublje jezero na svetu?",
    odgovori:["Jezero Viktorija", "Jezero Hjuron", "Kaspijsko jezero", "Bajkalsko jezero"],
    indeksTacnogOdgovora: 3
}; 
let pitanje14 ={
    tekst: "Koji je najviši planinski vrh u Evropi?",
    odgovori:["Mon Blan", "K2", "Elbrus", "Matterhorn"],
    indeksTacnogOdgovora: 2
};
let pitanje15 ={
    tekst: "Po grčkoj mitologiji, heroj Persej je usmrtio koje od navedenih mitskih bića?",
    odgovori:["Krakena", "Minotaura", "Nemejskog lava", "Hidru"],
    indeksTacnogOdgovora: 0
};
let pitanje16 ={
    tekst: "Pored filmova Titanik i Gospodar prstenova: Povratak kralja, koji je još film osvojio jedanaest oskara?",
    odgovori:["Avatar", "Prohujalo sa vihorom", "Priča sa zapadne strane", "Ben-Hur"],
    indeksTacnogOdgovora: 3
};
let pitanje17 ={
    tekst: "Koji renesansni umetnik je naslikao Sikstinsku kapelu?",
    odgovori:["Rafaelo", "Mikelandjelo", "Leonardo da Vinči", "Donatelo"],
    indeksTacnogOdgovora: 1
};
let pitanje18 ={
    tekst: "Koliko je zlatnih medalja osvojio Majkl Felps na olimpijskim igrama u Pekingu 2008. godine?",
    odgovori:["Šest", "Osam", "Devet", "Deset"],
    indeksTacnogOdgovora: 1
};
let pitanje19 ={
    tekst: "Koji je glavni grad Nepala?",
    odgovori:["Luanda", "Muskat", "Katmandu", "Taškent"],
    indeksTacnogOdgovora: 2
};
let pitanje20 ={
    tekst: "Kako se naziva konstanta koja definise broj molekula u jednom molu neke supstance?",
    odgovori:["Bolcmanova konstanta", "Univerzalna gasna konstanta", "Plankova konstanta", "Avogadrova konstanta"],
    indeksTacnogOdgovora: 3
};

let nizPitanja = [pitanje1, pitanje2, pitanje3, pitanje4, pitanje5, pitanje6, pitanje7, pitanje8, pitanje9, pitanje10, pitanje11, pitanje12, pitanje13, pitanje14, pitanje15, pitanje16, pitanje17, pitanje18, pitanje19, pitanje20];
let formaKviza = document.getElementById("formaKviza");
let posalji = document.getElementById("posalji");
let novaPitanja = document.getElementById("novaPitanja");
let tacnost = document.getElementById("tacnost");




let odabirNiza = niz => {
    let placeHolderPitanje;
    for( let i = niz.length; i >1; i--){
        placeHolderPitanje = niz[i - 1];
        let randomSelektor = Math.floor(Math.random() * [i])
        niz[i-1] = niz[randomSelektor];
        niz[randomSelektor] = placeHolderPitanje;
    }
    let odabraniNiz = niz.slice(0, 5);
    return odabraniNiz;   
}
let odabraniNiz = odabirNiza(nizPitanja);


function napraviKviz () {
    let niz = odabraniNiz;
    for( let i = 0; i < niz.length; i++){
        let divPitanje = document.createElement("div");
        divPitanje.classList.add('pitanje');
        let p = document.createElement("p");
        p.classList.add('paragraf');
        p.innerHTML = `${i+1}. ${niz[i].tekst}`
        divPitanje.append(p);
        
        for(j = 0; j < 4; j++){
            let o = document.createElement("input");
            let divOdgovor = document.createElement("div");
            divOdgovor.classList.add('odgovor');
            o.type = "radio";
            o.name = `odgovor${i}`;
            o.value = j;
            if (o.value == 0) {
                o.checked = true;
            }
            let odgovor = document.createElement("span");
            odgovor.innerHTML = niz[i].odgovori[j];
            odgovor.innerHTML += '<br>'
            divOdgovor.append(o);
            divOdgovor.append(odgovor);
            divPitanje.append(divOdgovor);
        }        
        formaKviza.append(divPitanje)        
    }
}

window.addEventListener("load", napraviKviz);
function refresh() {
    window.location.reload();
}
novaPitanja.addEventListener("click", refresh);

posalji.addEventListener("click", slanje);

function slanje() {
    let checkedOdg = document.querySelectorAll("input:checked");  
    checkedOdg.forEach ( (o, i)=> {
        if (o.value == odabraniNiz[i].indeksTacnogOdgovora) {
        tacnost.innerHTML+= `<p class="green">Odgovorili ste tačno na ${i+1}. pitanje.</p>`;
        formaKviza.childNodes[i+1].style.border="3px solid green"
        }else{
        tacnost.innerHTML+= `<p class="red">Niste odgovorili tačno na ${i+1}. pitanje.</p>`;
        formaKviza.childNodes[i+1].style.border="3px solid red"
         } 
        });
    let sviradio = document.querySelectorAll('input');
    sviradio.forEach (r => {
            r.disabled = true;
        })
    tacnost.style.display = "block";
    posalji.removeEventListener("click", slanje);  
}





