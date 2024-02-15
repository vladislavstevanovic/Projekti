
export class Chatroom {
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.chat = db.collection("chat");
        this.unsub = false;
    }
    set room(r){
        this._room = r;
        if(this.unsub) {
            this.unsub();
        }
    }
    set username(u) {
        if (u.length > 2 && u.length < 10 && u.trim() != "") {
            this._username = u;
        }else{
            alert(`Duzina korisnickog imena mora da bude izmedju 2 i 10 karaktera`);
        }
    }
    get room() {
        return this._room;
    }
    get username() {
        return this._username;
    }
    // Metod za dodavanje chatova
    async addChat(mess) {
        try{
        // kreiranje dokumenta koji zelimo da dodamo u bazu
        let docChat = {
            message: mess,
            username: this.username,
            room: this.room,
            created_at: new Date(),
        };
        let response = await this.chat.add(docChat); // pamti dokument u bazi
        return response; // vraca promise, na koji moze da se zakaci. then i .catch
        }
        catch{
            console.error("Doslo je do greske", err);
        }
    }


    getChats(callback) {
        this.unsub = this.chat
        .where("room","==",this.room)
        .orderBy("created_at", "asc")
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    callback(change.doc.data());
                }
            });
        });
    }
    updateRoom(room){
        this.room = room;
    }
    async deleteChat(chatId) {
        try {
            await this.chat.doc(chatId).delete();
            console.log('Poruka izbrisana');
        } catch (error) {
            console.error('Greska', error);
        }
    }


}



    /*addChat(msg){
        let datum = new Date();
        this.chat
        .add({
            message: msg,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(datum)
        })
        .then( () => {
            console.log("Uspesno dodat cet");
        })
        .catch( (e) => {
            console.log(`Greska ${e}`);
        })
    }*/

        /*getChats(){
        this.chat
        .where("room","==",this.room)
        .orderBy("created_at", "asc")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
            let data = doc.data();
            console.log(data);
            });
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
    }*/