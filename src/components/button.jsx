import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ text, page }) => {
    const navigate = useNavigate()
    const directTo = (page) => {
        navigate(`/${page}`)
    }

    return (
        <button onClick={() => { directTo(page) }}
            className='w-full font-bold tracking-widest bg-transparent hover:bg-teal-700 rounded-xl ring ring-teal-200 hover:ring-0 btn btn-soft'>
            {text}
        </button>
    )
}

export default Button