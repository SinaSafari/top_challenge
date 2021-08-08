import { openDB } from "@/lib/openDB"

/**
 * this method returns list of notes in the database.
 * 
 */
export async function getAllNotes() {
    try {
        const db = await openDB();
        const notes = await db.all("SELECT * FROM notes");
        return {
            success: true,
            message: "all notes",
            data: notes || {},
        };

    } catch (err) {
        return {
            success: false,
            message: `something went wrong: ${err.toString()}`,
            data: {},
        }
    }
}


/**
 * this function returns a single instance of note by its id.
 * 
 * @param {string} id 
 */
export async function getSingleNote(id) {
    try {

        if (!id) {
            return {
                success: false,
                message: `id can't be empty`,
                data: {},
            }
        }

        const db = await openDB();
        const stmt = `SELECT * FROM notes WHERE id = ${id}`
        const note = await db.get(stmt);
        return {
            success: true,
            message: `single note with id ${id}`,
            data: note || {},
        };

    } catch (err) {
        return {
            success: false,
            message: `something went wrong: ${err.toString()}`,
            data: {},
        }
    }
}


/**
 * 
 * this function creates a note in database, title is required and description is optional.
 * by default description is set to `description was not entered` if it's not provided
 * 
 * this function returnsall notes after creating note.
 * 
 * @param config this object contains title and descriptions 
 */
export async function createNote({ title, description = "description was not entered" }) {
    try {
        if (title === "") {
            return {
                success: false,
                message: `title can't be empty`,
                data: {},
            }
        }
        const db = await openDB();
        await db.run("INSERT INTO notes (title, description) VALUES(?, ?)", title, description);
        const notes = await getAllNotes()
        return {
            success: true,
            message: `note created successfully`,
            data: notes,
        };
    } catch (err) {
        return {
            success: false,
            message: `something went wrong: ${err.toString()}`,
            data: {},
        }
    }
}


/**
 * 
 * this function update a single note in database by its id
 * and all note will be returnd from this function.
 * 
 * title and id are required.
 * 
 * @param {string} id 
 * @param {string} title 
 * @param {string} description 
 * @returns 
 */
export async function updateSingleNote(id, title, description) {
    try {
        if (title === "" && !id) {
            return {
                success: false,
                message: `title or id can't be empty`,
                data: {},
            }
        }
        const db = await openDB();

        const stmt = `UPDATE notes SET title = ${title}, description = ${description} WHERE id = ${id}`

        const note = await db.exec(stmt);

        const notes = await getAllNotes()
        return {
            success: true,
            message: `note updated with id ${id}`,
            data: notes,
        };
    } catch (err) {
        return {
            success: false,
            message: `something went wrong: ${err.toString()}`,
            data: {},
        }
    }
}


/**
 * this function deletes one note from database and returns all notes
 * 
 * 
 * @param {string} id 
 * @returns 
 */
export async function deleteNote(id) {
    try {

        if (!id) {
            return {
                success: false,
                message: `id can't be empty`,
                data: {},
            }
        }

        const db = await openDB();
        const stmt = `DELETE FROM notes WHERE id = ${id}`
        await db.exec(stmt);
        const notes = await getAllNotes()

        return {
            success: true,
            message: `single note with id ${id}`,
            data: notes,
        };
    } catch (err) {
        return {
            success: false,
            message: `something went wrong: ${err.toString()}`,
            data: {},
        }
    }
}