import { FaFile } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { database, storage } from '../../firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const File = ({ file, currentFolder }) => {
  console.log(file, currentFolder);

  const { currentUser } = useAuthContext();

  function deleteFile(e, file) {
    e.preventDefault();

    const {id: fileId, name: fileName} = file;

    const filePath = currentFolder === ROOT_FOLDER ?        
      `${currentFolder.path.join('/')}/${fileName}` : 
      `${currentFolder.path.join('/')}/${currentFolder.name}/${fileName}`;

    const storageRef = storage
      .ref(`/files/${currentUser.uid}/${filePath}`);

    storageRef.delete() // delete() method returns a promise...
      .then(() => {
        database.files.doc(fileId).delete()
          .then(() => {
            console.log("File deleted from collection succesfully...");
          }).catch((error) => {
            console.error("Error while deleting the doc from the collection", error);
          })

        console.log("File deletion successful");
      })
      .catch((error) => {
        console.error("Error deleting file: ", error);
      })
    console.log(storageRef, fileName);
  }

  return (
    <a href={file.url} target='_blank' className='btn btn-outline-dark text-truncate w-100 position-relative link' >
        < FaFile className='me-2'/>
        {file.name}
        < MdDelete 
          size={22} 
          className='del-btn btn-outline-dark'
          style={{
            position: 'absolute',
            right: '5px',
            top: '50%',
            transform: "translateY(-50%)",
            zIndex: 1,
            border: "1px solid white"
          }}
          onClick={(e) => deleteFile(e, file)}
        />
    </a>
  )
}

export default File