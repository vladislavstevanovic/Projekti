export class chatUI {
    constructor(l){
        this.list = l;
    }
    set list(l) {
        this._list = l;
    }

    get list() {
        return this._list;
    }
    templateLI(obj) {
        let li = document.createElement('li');
        let div1 = document.createElement('div');
        let messageContainer = document.createElement('section');
        messageContainer.classList.add("messageContainer");
        let deleteButton = document.createElement('img');
        deleteButton.src = "slike/bin.png";
        deleteButton.classList.add('deleteButton');
        div1.innerHTML = `${obj.username} : ${obj.message} <br> ${this.formatDate(obj.created_at.toDate())}`;
        div1.classList.add("poruke");
        if (obj.username == localStorage.username) {
            div1.classList.add("aktivniUser")
        }else{
            div1.classList.add("ostaliUseri")
        }
        div1.append(deleteButton)
        messageContainer.append(div1)
        li.append(messageContainer);
        return li;
    }
    formatDate(vreme) {
        let date = new Date();
        let datum = String(vreme.getDate()).padStart(2,"0");
        let mesec = String(vreme.getMonth() + 1).padStart(2,"0");
        let sat = String(vreme.getHours()).padStart(2,"0");
        let minuti = String(vreme.getMinutes()).padStart(2,"0");
        if (date.getDate() == vreme.getDate() && date.getMonth() == vreme.getMonth() && date.getFullYear() == vreme.getFullYear()) {     
            return `${sat}:${minuti}`  
        }else{
            return `${datum}.${mesec}.${vreme.getFullYear()}. - ${sat}:${minuti}`;
        }
    }
    delete() {
        this.list.innerHTML = "";
    }
    updateMessageClass(li) {
        let div1 = li.querySelector('div:first-child');
        let messageUsername = div1.textContent.split(":")[0].trim();
    
        if (messageUsername == localStorage.username) {
            div1.classList.add('aktivniUser');
            div1.classList.remove('ostaliUseri');
        } else {
            div1.classList.remove('aktivniUser');
            div1.classList.add('ostaliUseri');
        }
    }
    
}