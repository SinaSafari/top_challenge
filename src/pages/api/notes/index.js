import { openDB } from "../../../../lib/openDB"
import { createNote, getAllNotes } from "../../../../lib/repositories/notes.repositories"

export default async function Notes(req, res) {
    if (req.method === "GET") {
        const data = await getAllNotes()
        if (data.success) {
            return res.json(data)
        }
        return res.status(400).json(data)

    } else if (req.method == "POST") {

        const { title, description } = req.body
        const data = await createNote({ title: title, description: description })

        if (data.success) {
            return res.json(data)
        }
        return res.status(400).json(data)

    } else {
        return res.status(405).json({ success: false, message: "method not allowed", data: {} })
    }
}