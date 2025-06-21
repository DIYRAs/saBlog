import React, { useState } from 'react'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/navigation'

const PostPage = () => {
    const [form, setForm] = useState({ name: '', text_content: '', file: null })
    const { name, text_content, file } = form
    const [showPopup, setShowPopup] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, file: e.target.files[0] }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowPopup(true)
    }

    const handleProceed = async () => {
        setShowPopup(false)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('text_content', text_content)
        formData.append('media', file)
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1])
        // }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (res.ok) {
                console.log(data)
            }
        } catch (err) {
            console.error(err);
        }

        alert("Posting berhasil (simulasi)")
        navigate('/')
    }

    return (
        <div className='flex flex-col lg:flex-row w-full lg:h-screen h-[140vh] text-teal-950 bg-zinc-300'>
            {/* SIDE OR NAVBAR */}
            <Navigation />
            {/* END SIDE OR NAVBAR */}

            {/* MAIN CONTENT */}
            <div className='flex flex-col items-center w-full h-full px-4 pt-16'>
                <h2 className='mb-5 text-3xl font-bold'>Create New Post</h2>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col w-full max-w-2xl gap-5 p-5 bg-white rounded-lg shadow'
                >
                    <input
                        name='name'
                        type='text'
                        className='px-4 py-2 border border-gray-400 rounded-md outline-none'
                        placeholder='Enter your name'
                        value={name}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name='text_content'
                        type='text'
                        className='px-4 py-2 border border-gray-400 rounded-md outline-none resize-none'
                        placeholder='Text here'
                        value={text_content}
                        onChange={handleInputChange}
                        required
                    ></textarea>

                    <input
                        type='file'
                        accept='image/*,video/*'
                        className='p-2 border border-gray-400 rounded-md file:bg-teal-200'
                        onChange={handleFileChange}
                        required
                    />

                    <button
                        type='submit'
                        className='px-5 py-2 text-white bg-teal-700 rounded hover:bg-teal-800'
                    >
                        Post
                    </button>
                </form>

                {/* POPUP KONFIRMASI */}
                {showPopup && (
                    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-40'>
                        <div className='p-6 bg-white rounded-xl shadow-lg w-[90%] max-w-md text-center'>
                            <p className='mb-4 text-lg font-semibold text-red-700'>
                                If you posting without any account,<br />
                                you can't delete or edit your posting.
                            </p>
                            <div className='flex justify-center gap-4 mt-4'>
                                <button
                                    onClick={() => {
                                        setShowPopup(false)
                                        navigate('/login')
                                    }}
                                    className='px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700'
                                >
                                    Login
                                </button>
                                <button
                                    onClick={handleProceed}
                                    className='px-4 py-2 font-bold text-white bg-teal-600 rounded hover:bg-teal-700'
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostPage
