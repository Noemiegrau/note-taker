const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    constructor() {
        this.id = 0;
    }
    read() {
        return readFileAsync("db/db.json", "utf8");

    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    async getNotes() {
        console.log("get notes")
        const notes = await this.read();
        console.log(notes);
        let notesArray;
        try {
            //join the notes array with the new notes
            notesArray = [].concat(JSON.parse(notes));
        }
        catch (err) {
            notesArray = [];
        }
        return notesArray;

    }
    async addNotes(note) {
        console.log("add notes");
        const { title, text } = note;
        const newNote = { title, text, id: ++this.id };
        const notes = await this.getNotes();
        const updateNotes = [...notes, newNote];
        await this.write(updateNotes);
        return newNote;

    }
    async removeNote(id) {
        console.log("remove notes");
        const notes = await this.getNotes();
        const updatedNotes = notes.filter(note => note.id !== parseInt(id));
        return await this.write(updatedNotes);
    }
}

module.exports = new Notes();