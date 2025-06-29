import React, { useState } from 'react'
import Form from '../components/form'

const Login_Register = () => {
    const [action, setAction] = useState('')

    const handleRegister = () => {
        setAction('register')
    }
    const handleLogin = () => {
        setAction('login')
    }

    return (
        <div className='flex justify-center w-full h-screen pt-16 bg-zinc-800'>
            {action === 'login' ? (
                <>
                    {/* LOGIN */}
                    <Form action={'login'} handle={handleRegister} />
                    {/* END LOGIN */}
                </>
            ) : (
                <>
                    {/* REGISTER */}
                    <Form action={'register'} handle={handleLogin} />
                    {/* END REGISTER */}
                </>
            )}
        </div>
    )
}

export default Login_Register