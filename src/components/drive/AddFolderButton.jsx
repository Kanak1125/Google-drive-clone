import { useState } from 'react'
import { database } from '../../firebase'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaFolderPlus } from 'react-icons/fa'
import { useAuthContext } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

const AddFolderButton = ({ currentFolder }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    // const [error, setError] = useState("");
    const { currentUser } = useAuthContext();
    
    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    // function checkDocExistence(name) {
    //     database.folders.then(collections => {
    //         collections.foreach(collection => {
    //             if (collection.name === name) {
    //                 setError("The folder already exists.");
    //             }
    //         })
    //     })
    // }

    function handleSubmit(e) {
       e.preventDefault(); 
    //    console.log(database);
        // checkDocExistence(name);

        if (currentFolder == null) return;
        
        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({
                name: currentFolder.name,
                id: currentFolder.id,
            })
        }

        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimeStamp(),
        })
       setName("");
       closeModal();
    }
  return (
    <>
        <Button onClick={openModal} variant='success' size='sm'>
            <FaFolderPlus size='24'/>
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control 
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='secondary'
                        onClick={closeModal}
                    >Close</Button>
                    <Button variant='success' type='submit'>Add new folder</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
  )
}

export default AddFolderButton