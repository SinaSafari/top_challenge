import React from 'react'
import { useRouter } from "next/router"
import { useState } from "react"
import axios from 'axios'
import { Form, Button, ToastContainer, Toast } from 'react-bootstrap'

const CreateFrom = () => {
    //states for controlling content of the form
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // handling toast for error in creation process
    const [errorToast, setErrorToast] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter()


    /**
     * send a post request to server to create a new note,
     * also reload the current page in order to run the
     * getserverside function and get fresh data 
     */
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data, status } = await axios.post("http://localhost:3000/api/notes", { title, description })

            if (status >= 400) {
                console.log("error", JSON.stringify(data))
            }

            // cleaning form content
            setTitle("")
            setDescription("")

            // running getServerSideProps for fetching fresh content 
            router.push({ pathname: router.pathname })
        } catch (err) {
            setErrorMsg(err.toString())
            setErrorToast(!errorToast)
        }

    }


    return (
        <>

            <ToastContainer position="top-end">
                <Toast show={errorToast} onClose={() => setErrorToast(!errorToast)} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">something went wrong...</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMsg || "sdafsadf"}</Toast.Body>
                </Toast>
            </ToastContainer>


            <h3>Create Note</h3>
            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title of note</Form.Label>
                    <Form.Control type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>description of note</Form.Label>
                    <Form.Control type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Form.Text className="text-muted">
                        description if not required.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateFrom
