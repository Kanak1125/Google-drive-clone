import { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaFileUpload } from 'react-icons/fa'
import { useAuthContext } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { database, storage } from '../../firebase'
import { v4 as uuidV4 } from "uuid";
import { ProgressBar } from 'react-bootstrap'
import { Toast } from 'react-bootstrap'

const AddFileButton = ({ currentFolder }) => {
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const { currentUser } = useAuthContext();

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;
        
        const id = uuidV4();
        setUploadingFiles(prevUploadingFiles => (
            [
                ...prevUploadingFiles,
                { id: id, name: file.name, progress: 0, error: false }
            ]
        ))
        const filePath = currentFolder === ROOT_FOLDER ?        
            `${currentFolder.path.join('/')}/${file.name}` : 
            `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;
        console.log(filePath);
        
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file);
        // setUploadedFileName(e.target.files[0].name);
        
        uploadTask.on('state_changed', snapshot => {    // function to be run when the task is being uploaded...
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadingFile => {
                    if (uploadingFile.id === id) {
                        return {
                            ...uploadingFile,
                            progress: progress
                        }
                    } 
                    
                    return uploadingFile
                })
            })
        }, () => {  // error function...
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true};
                    }
                    return uploadFile;
                })
            })
        }, () => {  // function to be run in completion of uploading task...
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadingFiles => {
                    return uploadingFiles.id !== id;
                })
            })

            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files
                    .where("name", "==", file.name)
                    .where("userId", "==", currentUser.uid)
                    .where("folderId", "==", currentFolder.id)
                    .get()
                    .then(existingFiles => {
                        const existingFile = existingFiles.docs[0];
                        if (existingFile) {
                            existingFile.ref.update({ url: url })
                        } else {
                            database.files.add({
                                url: url,
                                name: file.name,
                                createdAt: database.getCurrentTimeStamp(),
                                folderId: currentFolder.id,
                                userId: currentUser.uid,
                            })
                        }
                    })
            })
        })
    }

    return (
    <>
        <label className='btn btn-success btn-sm m-0 me-2'>
            <FaFileUpload size='24'/>
            <input 
                type="file" 
                onChange={handleFileUpload}
                style={{ opacity: 0, position: "absolute", left: "-9999px"}}    
            />
        </label>
        {uploadingFiles.length > 0 && 
            ReactDOM.createPortal(
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        maxWidth: '250px',
                    }}
                >
                    {uploadingFiles.map(file => (
                        <Toast 
                            key={file.id}
                            onClose={() => {
                            setUploadingFiles(prevUploadingFiles => {
                                return prevUploadingFiles.filter(uploadfile => {
                                    return uploadfile.id !== file.id;
                                })
                            })
                        }}>
                            <Toast.Header 
                                closeButton={file.error}
                                className='text-truncate w-100 d-block'
                            >
                                {file.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ProgressBar 
                                    animated={!file.error}
                                    variant={ file.error ? 'danger' : 'primary'}
                                    now={file.error ? 100 : file.progress * 100}
                                    label = {
                                        file.error ? "Error" :
                                        `${Math.round(file.progress * 100)}%`
                                    }
                                    className='w-100'
                                />
                            </Toast.Body>
                        </Toast>
                    ))}
                </div>,
                document.body   // this is where the portal component will be rendered out...
            )}
    </>
  )
}

export default AddFileButton