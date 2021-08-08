import { deleteNote, getSingleNote, updateSingleNote } from "@/lib/repositories/notes.repositories"

export default async function NotesById(req, res) {
    if (req.method === "GET") {
        const data = await getSingleNote(req.query.id)
        if (data.success) {
            return res.json(data)
        }
        return res.status(400).json(data)
    }

    else if (req.method === "PUT") {
        const { title, description } = req.body

        const data = await updateSingleNote(req.query.id, title, description)
        if (data.success) {
            return res.json(data)
        }
        return res.status(400).json(data)
    }

    else if (req.method === "DELETE") {
        const data = await deleteNote(req.query.id)
        if (data.success) {
            return res.json(data)
        }
        return res.status(400).json(data)
    }

    else {
        return res.status(405).json({ success: false, message: "method not allowed", data: {} })
    }
}