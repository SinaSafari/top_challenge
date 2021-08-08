import { openDB } from "@/lib/openDB";

export default async function handler(req, res) {
  try {
    const db = await openDB()
    db.exec("CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255))")
    return res.json({
      success: true,
      message: "done",
      data: {}
    })
  } catch (err) {
    return {
      success: false,
      message: `something went wrong: ${err.toString()}`,
      data: {}
    }
  }
}
