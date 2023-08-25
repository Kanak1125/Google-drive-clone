import React from 'react'
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Delete from './Delete';
import { database } from '../../firebase';
import { useAuthContext } from '../../contexts/AuthContext';

const Folder = ({ folder }) => {
  const { currentUser } = useAuthContext();

  function deleteFolder(e, folder) {
    e.preventDefault();

    // Recursively deleting a folder and its subfolders...
    function deleteFolderRecursively(folderId) {
      database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
        .get().then(querySnapshot => {
          querySnapshot.forEach(subfolderDoc => {
            const subfolderData = subfolderDoc.data();
            if (subfolderData.hasOwnProperty("parentId") && subfolderData.parentId !== undefined) {
              const subfolderId = subfolderData.id;
              deleteFolderRecursively(subfolderId);
              // database.folders.doc(subfolderId).delete().then(() => {
              //   console.log(`Subfolder ${subfolderId} deleted successfully`);
              // }).catch(error => {
              //   console.error(`Error while deleting sub folder ${subfolderId}: `, error);
              // })
              console.log(subfolderId);
            }
          })
        }).catch(error => {
          console.error("Error while fetching subfolders: ", error);
        });
    }

    deleteFolderRecursively(folder.id);

    database.folders.doc(folder.id).delete()
      .then(() => {
        console.log("Folder successfully deleted...");
      })
      .catch((error) => {
        console.error("Error while deleting the folder: ", error);
      })

      
    console.log("The folder deleted successfully...");
  }
  return (
    <Button 
      to={{
        pathname: `/folder/${folder.id}`,
        // state: { folder: folder },
      }} 
      className="text-truncate w-100 position-relative link" 
      variant='outline-dark' 
      as={Link}
    >
      <FaFolder className='me-2' />
      {folder.name}
      <Delete
        currentItem = { folder }
        deleteFunc = {(e) => deleteFolder(e, folder) }
       />
    </Button>
  )
}

export default Folder