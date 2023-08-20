import React from 'react'
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Folder = ({ folder }) => {
  return (
    <Button 
      to={{
        pathname: `/folder/${folder.id}`,
        // state: { folder: folder },
      }} 
      className="text-truncate w-100" 
      variant='outline-dark' 
      as={Link}
    >
      <FaFolder className='me-2' />
      {folder.name}
    </Button>
  )
}

export default Folder