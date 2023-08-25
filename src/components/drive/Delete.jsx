import { MdDelete } from 'react-icons/md';

const Delete = ({ deleteFunc }) => {
  return (
    <MdDelete 
        size={22} 
        className='del-btn btn-outline-dark'
        style={{
          position: 'absolute',
          right: '5px',
          top: '50%',
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={ deleteFunc }
    />
  )
}

export default Delete