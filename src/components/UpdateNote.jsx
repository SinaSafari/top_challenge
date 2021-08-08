import React, { useState } from 'react'
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios'

const UpdateNote = ({ note }) => {

	// editable state handles showing some elements in ui
	// also disables the inputs if it is set to false
	const [editable, setEditable] = useState(false)

	// shwoing toasts is handled by this state.
	const [errorToast, setErrorToast] = useState(false)

	// form content values in states
	// default values comes from props but if
	// props did not provided, for preventing unhandled errors
	// we use some static strings.
	const [title, setTitle] = useState(note.title || "title not provided")
	const [description, setDescription] = useState(note.description || "description is empty")

	// storing error messages
	const [errorMsg, setErrorMsg] = useState('')

	const router = useRouter()


	/**
	 * this handler tries to update the note by requesting to
	 * server and then redirect user to home page
	 * if anything went wrong, error will be shown in toast
	 */
	const updateClickHandler = async (e) => {
		e.preventDefault()
		try {
			if (editable) {
				const { data, status } = await axios.put(`http://localhost:3000/api/notes/${router.query.id}`)

				router.push({
					pathname: "/"
				})
			} else {
				setEditable(true)
			}
		} catch (err) {
			setErrorMsg(err.message)
			setErrorToast(!errorToast)
			return
		}

	}

	return (
		<div>

			<ToastContainer position="top-end">
				<Toast show={errorToast} onClose={() => setErrorToast(!errorToast)}>
					<Toast.Header>
						<strong className="me-auto">something went wrong...</strong>
					</Toast.Header>
					<Toast.Body>{errorMsg || "sdafsadf"}</Toast.Body>
				</Toast>
			</ToastContainer>


			<h3>{editable ? "Update Note" : "Details Of Note"}</h3>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Title of note</Form.Label>
					<Form.Control type="text" placeholder="title" disabled={!editable} value={title} onChange={(e) => setTitle(e.target.value)} />

				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>description of note</Form.Label>
					<Form.Control type="text" placeholder="description" disabled={!editable} value={description} onChange={(e) => setDescription(e.target.value)} />
					<Form.Text className="text-muted">
						description if not required.
					</Form.Text>
				</Form.Group>

				<Button variant="primary" type="submit" onClick={updateClickHandler}>
					{editable ? "Update" : "Edit"}
				</Button>
				{editable && (
					<Button variant="info" className="mx-2" onClick={() => setEditable(false)}>
						Cancle
					</Button>
				)}

			</Form>
		</div>
	)
}

export default UpdateNote
