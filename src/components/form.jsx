import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = ({ action, handle }) => {
    const navigate = useNavigate()
    // HANDLE STATE
    const [formContent, setFormContent] = useState({
        legend: '',
        instruction: '',
        dos: ''
    })
    const [formData, setFormData] = useState({
        input: '',
        name: '',
        email: '',
        password: ''
    })
    const [resultData, setResultData] = useState({})

    const { legend, instruction, dos } = formContent
    const { input, name, email, password } = formData
    const { status, where, message } = resultData

    // HANDLE FORM SWITCH
    useEffect(() => {
        if (action === 'login') {
            setFormContent({
                legend: 'Login',
                instruction: `Don't have an account?`,
                dos: 'Register'
            })
        } else {
            setFormContent({
                legend: 'Register',
                instruction: `Already have an account?`,
                dos: 'Login'
            })
        }
    }, [action])

    // HANDLE FORM SUBMIT
    const handleFormInput = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('input', input)
        formData.append('username', name)
        formData.append('email', email)
        formData.append('password', password)
        try {
            const res = await fetch(`http://localhost/PHP/saBlog/control.php?action=${action}`, {
                method: 'POST',
                body: formData
            })
            const datas = await res.json()
            console.log(datas.data)
            setResultData(datas)
            if (res.ok) {
                localStorage.setItem('username', datas.data.username)
                console.log(localStorage.getItem('username'))
                setFormData({
                    input: '',
                    name: '',
                    email: '',
                    password: ''
                })
                navigate('/')
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <fieldset style={{ boxShadow: '1px 1px white, inset 0 0 5px white' }}
            className='p-4 bg-transparent border fieldset border-zinc-400 rounded-box w-xs h-max'>
            <legend className='text-[16px] fieldset-legend bg-teal-200/20 rounded-full px-4'>{legend}</legend>
            <form onSubmit={handleSubmit}>
                <div className='space-y-6'>
                    {action === 'register' ? (
                        <>
                            <div>
                                <label className='label' htmlFor="name">
                                    {status === 'error' && where === 'username' ? <><span className='text-red-400'>{message}</span></> : <>Username</>}
                                </label>
                                <input onChange={handleFormInput} name='name' value={name} className='input focus:outline-0' id='name' type="text" placeholder='Enter your username' required />
                            </div>
                            <div>
                                <label className='label' htmlFor="email">
                                    {status === 'error' && where === 'email' ? <><span className='text-red-400'>{message}</span></> : <>Email</>}
                                </label>
                                <input onChange={handleFormInput} name='email' value={email} className='input focus:outline-0' id='email' type="email" placeholder='Enter your email' required />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className='label' htmlFor="input">
                                    Username/Email
                                </label>
                                <input onChange={handleFormInput} name='input' value={input} className='input focus:outline-0' id='input' type="text" placeholder='Enter your username or email' required />
                            </div>
                        </>
                    )}
                    <div>
                        <label className='label' htmlFor="password">Password</label>
                        <input onChange={handleFormInput} name='password' value={password} className='input focus:outline-0' id='password' type="password" placeholder='Enter your password' required />
                    </div>
                </div>

                <p>{instruction} <span onClick={handle} className='text-blue-400 underline cursor-pointer'>{dos}</span> here</p>
                <button type='submit' className='mt-4 bg-teal-900 btn btn-soft'>{legend.toUpperCase()}</button>
            </form>
        </fieldset>
    )
}

export default Form