import NavbarComponent from './NavbarComponent'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import AddFileButton from './AddFileButton'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder';
import File from './File';
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadCrumbs from './FolderBreadCrumbs';

const Dashboard = () => {
  const { folderId } = useParams();
  // const location  = useLocation();
  // console.log(location);

  const { folder, childFolders, childFiles } = useFolder(folderId);
  // console.log(state);
  console.log(folder);
  console.log(folderId)

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} currentFiles={childFiles}/>
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {
              childFolders.map(childFolder => (
              <div 
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={ childFolder } />
              </div>
            ))}
          </div>    
        )}
        { childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {
              childFiles.map(childFile => (
              <div 
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={ childFile } currentFolder={ folder }/>
              </div>
            ))}
          </div>    
        )}

      </Container>
    </>
  )
}

export default Dashboard