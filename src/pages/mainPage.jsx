import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/navigation'

const MainPage = () => {
    const [userPost, setUserPost] = useState([])
    const [status, setStatus] = useState()

    const getUserpost = async () => {
        try {
            const res = await fetch('http://localhost/PHP/saBlog/control.php', {
                method: 'GET'
            })
            const data = await res.json()
            if (res.ok) {
                console.log(data)
                setStatus(true)
                setUserPost(data)
            }
        } catch (err) {
            setStatus(false)
            console.error(`error: ${err}`);
        }
    }
    useEffect(() => {
        getUserpost()
    }, [])

    const navigate = useNavigate()
    const directToSelect = (id) => {
        const params = new URLSearchParams({ postId: id })
        navigate({
            pathname: '/select',
            search: params.toString()
        })
    }
    const handlePropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className='flex flex-col lg:flex-row w-full lg:h-screen h-[140vh] text-teal-950 bg-zinc-300'>
            {/* SIDE or NAVBAR */}
            <Navigation />
            {/* END SIDE or NAVBAR */}

            {/* MAIN CONTENT */}
            <div className='flex flex-col items-center w-full h-full pt-16'>
                {/* SEARCH BAR */}
                <div className='flex items-center justify-between w-10/12 h-12 px-1 rounded-full lg:w-7/12'
                    style={{ boxShadow: 'inset 0.5px 0.5px 5px black' }} >
                    <input
                        className='w-10/12 h-12 px-4 text-sm lg:w-6/12 outline-0 lg:text-md'
                        placeholder='You can search something here...'
                        type="text" />
                    <div className='w-10 h-10 bg-teal-800 rounded-full'></div>
                </div>
                {/* END SEARCH BAR */}

                {/*DIVIDER*/} <hr className='w-full mt-10 mb-5' />

                {/* POST SECTION */}
                <div className='flex flex-wrap items-center justify-center w-full h-full gap-10 px-5 pt-5 pb-10 overflow-y-auto bg-zinc-300'
                    style={{ scrollbarWidth: 'none' }}>
                    {/* USER POST */}
                    {!status ? <button onClick={getUserpost} className='self-start rounded-full btn btn-soft btn-error'>Try again</button> : null}
                    {!userPost ? (
                        <><p className='self-start text-xl'>{userPost.message}</p></>
                    ) : (
                        <>
                            {userPost.map((item) => (
                                <div onClick={() => { directToSelect(item.id) }}
                                    key={item.id} className='max-h-[540px] cursor-auto w-full h-max max-w-[400px] border pb-4 flex justify-between flex-col space-y-3'>
                                    <div className='max-h-full overflow-hidden'>
                                        <p
                                            className='p-3 overflow-x-auto font-bold max-w-54'
                                            style={{ scrollbarWidth: 'none' }}>
                                            {item.name}
                                        </p>
                                        <p
                                            className='max-h-[120px] px-3 overflow-y-auto break-words'
                                            style={{ scrollbarWidth: 'thin' }}
                                            onClick={handlePropagation} >
                                            {item.text_content}
                                        </p>
                                    </div>
                                    {item.media_type == 'video/mp4' ? (
                                        <>
                                            <video
                                                src={`http://localhost/PHP/saBlog${item.media}`}
                                                className='w-full h-[250px] object-cover object-center bg-transparent'
                                                controls
                                                controlsList='nodownload'></video>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                className='w-full h-[250px] object-cover object-center bg-transparent'
                                                src={`http://localhost/PHP/saBlog${item.media}`}
                                                alt="image post"
                                                loading='lazy'
                                            />
                                        </>
                                    )}
                                    <div className='h-[50px] flex justify-around items-center'>
                                        <button onClick={handlePropagation} className='btn btn-dash'>Like</button>
                                        <button className='btn btn-dash'>Comment</button>
                                        <button onClick={handlePropagation} className='btn btn-dash'>Share</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {/* END USER POST */}
                </div>
                {/* END POST SECTION */}
            </div>
            {/* END MAIN CONTENT */}
        </div >
    )
}

export default MainPage