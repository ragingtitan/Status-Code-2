import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiX } from 'react-icons/fi';
const GoBack = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    }
  return (
    <div className='fixed top-0 right-0 z-10000' onClick={handleGoBack}><FiX/></div>
  )
}

export default GoBack