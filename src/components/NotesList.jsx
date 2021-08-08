import axios from 'axios'
import { Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import React from 'react'


const NotesList = ({ notes }) => {

    const router = useRouter()

    /**
     * this function tries to delete one note based on its id
     * and then redirects to home page (which is current page) for fetching
     * fresh data from server (running getServerSideProps)
     */
    const deleteNoteHanlder = async (e, id) => {
        e.preventDefault()
        try {
            const { data, status } = await axios.delete(`http://localhost:3000/api/notes/${id}`)

            router.push({
                pathname: router.pathname
            })
        } catch (err) {
            console.log("error: ", err)
        }

    }

    /**
     * navigates to single page of each note.
     */
    const singleNoteRedirectHandle = (e, id) => {
        e.preventDefault()
        router.push({
            pathname: `/notes/${id}`
        })
    }

    return (
        <>
            <Card className="bg-light border-0 p-2">

                {
                    notes.length === 0 ? (
                        <>
                            <p className="text-center">there's no note...</p>
                        </>
                    ) :
                        (
                            <>
                                <h3>Notes list</h3>

                                {
                                    notes.map(note => (
                                        <Card className="m-2" key={note.id}>
                                            <Card.Body>
                                                <Card.Title>
                                                    {note.title}
                                                </Card.Title>

                                                <Card.Text>
                                                    {note.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <div className="d-flex flex-row-reverse align-items-center mx-2">
                                                <Button onClick={(e) => deleteNoteHanlder(e, note.id)} className="m-1" variant="outline-danger">delete</Button>
                                                <Button onClick={(e) => singleNoteRedirectHandle(e, note.id)} className="m-1" ariant="light" >details</Button>
                                            </div>
                                        </Card>
                                    ))
                                }
                            </>
                        )
                }
            </Card>

        </>
    )
}

export default NotesList
