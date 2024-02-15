import { Chatroom } from "./chat.js";
import { chatUI } from "./ui.js";

// DOM

let listaPoruka = document.getElementById("listaPoruka");
let sendMessageTekst = document.getElementById("sendMessageTekst");
//let sendMessageBtn = document.getElementById("sendMessageBtn");
let sendMessageForm = document.getElementById("sendMessageForm");
let updateUsernameTekst = document.getElementById("updateUsernameTekst");
let updateUsernameBtn = document.getElementById("updateUsernameBtn");
let updateUsernameForm = document.getElementById("updateUsernameForm");
let navRooms = document.querySelector("#containerSobe");
let colorPickerInput = document.getElementById("colorPickerInput");
let colorPickerBtn = document.getElementById("colorPickerBtn");
let sobe = document.querySelectorAll("#containerSobe input[type = button]");
let notifikacija = document.getElementById("notifikacija");


//Objekti
let backgroundColor = "#ffffff";
if (localStorage.backgroundColor) {
    backgroundColor = localStorage.backgroundColor;
}
document.body.style.backgroundColor = backgroundColor;
colorPickerInput.value = localStorage.backgroundColor;

let username = 'anonymus';
if (localStorage.username) {
    username = localStorage.username;
}

let chatroom = new Chatroom("#js", username);
let chatUI1 = new chatUI(listaPoruka)


chatroom.getChats(data => {
    chatUI1.list.append(chatUI1.templateLI(data));
})


sendMessageForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (sendMessageTekst.value.length > 0) {
        let message = sendMessageTekst.value
        chatroom.addChat(message);
    }   
    sendMessageForm.reset();
})

updateUsernameBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (updateUsernameTekst.value.length > 2 && updateUsernameTekst.value.length < 10 && updateUsernameTekst.value.trim() != ""){
        let newUsername = updateUsernameTekst.value;
        chatroom.username = newUsername;
        localStorage.setItem("username", newUsername);
        let messages = listaPoruka.getElementsByTagName("li");
        notifikacija.innerHTML = `Username promenjen u: ${newUsername}  !!!`;
        notifikacija.style.display = "flex"
        setTimeout(()=> {
            notifikacija.style.display = "none"
        },3000)
        for (let i = 0; i < messages.length; i++) {
            chatUI1.updateMessageClass(messages[i]);
        }
    }else{
        alert(`Duzina korisnickog imena mora da bude izmedju 2 i 10 karaktera`);
    }
        updateUsernameForm.reset();
})

navRooms.addEventListener('click', e=> {
    if (e.target.tagName == "INPUT") {
       sobe.forEach( s=> {
       s.classList.remove("selektovanaSoba");
       s.classList.add("button")
       }) 
       e.target.classList.remove("button");
       e.target.classList.add("selektovanaSoba")
       let newRoom = e.target.value;
       chatroom.room = newRoom;
       chatUI1.delete();
       chatroom.getChats(data => {
       chatUI1.list.append(chatUI1.templateLI(data)) 
    })
    }
})

colorPickerBtn.addEventListener('click', e=> {
    e.preventDefault()
    let newColor = colorPickerInput.value;
    document.body.style.backgroundColor = newColor;
    localStorage.setItem("backgroundColor", newColor);
})

   /*     sobe.forEach( r=> {
        if (r.value = chatroom.room) {
            r.classList.add("selektovanaSoba")
            r.classList.remove("button")
        }else{
            r.classList.remove("selektovanaSoba")
            r.classList.add("button")
        }
       }); */

