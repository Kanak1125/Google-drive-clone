import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { Link } from 'react-router-dom';

const FolderBreadCrumbs = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, ...currentFolder.path];
   
  return (
    <Breadcrumb 
        className='flex-grow-1 p-4 '
        listProps={{ className: "bg-white p-0 m-0"}}
    >
        {path.map((folder, index) => {
            return <Breadcrumb.Item 
                key={folder.id}
                linkAs={Link}
                // linkProps is an object that holds properties to be passed to the underlying 'Link' component...
                linkProps={{
                    to: {
                        pathname: folder.id ? `folder/${folder.id}` : '/',
                        state: { folder: {...folder, path: path.slice(1, index) } },
                        // the state is passed as folder: {
                            // ...folder // previous folder props like name and id...
                            // (extra) subset of path, if we are in ['root', 'newfolder1', 'child', 'grandchild'], we'll set the path to ['newfolder1', 'child'] so it can remain when traversing to the other folders or files...
                        // }
                    }
                }}
                className='text-truncate d-inline-block'
                style={{ maxWidth: "150px" }}  
            >
                
                {folder.name}
            </Breadcrumb.Item>
            
        })}
        {currentFolder && (
            <Breadcrumb.Item 
                className='text-truncate d-inline-block'
                style={{ maxWidth: "200px" }}  
                active  
            >
                {currentFolder.name}
            </Breadcrumb.Item>
        )}
    </Breadcrumb>
  )
}

export default FolderBreadCrumbs