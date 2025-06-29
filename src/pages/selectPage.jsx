import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from '../components/navigation'

const SelectPage = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const postId = params.get('postId')
    const [selectedPost, setSelectedPost] = useState({})

    const getSelectedUserPost = useCallback(
        async () => {
            try {
                const res = await fetch(`http://localhost/PHP/saBlog/control.php?postId=${postId}`, {
                    method: 'GET'
                })
                const data = await res.json()
                if (res.ok) {
                    setSelectedPost(data)
                    console.log(data)
                }
            } catch (err) {
                console.error(err);
            }
        }, [postId])
    useEffect(() => {
        getSelectedUserPost()
    }, [getSelectedUserPost])

    // HANDLE COMMENT
    const [uname, setUname] = useState()
    const [form, setForm] = useState({
        username: '',
        comment: ''
    })
    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUname(localStorage.getItem('username'))
            setForm({ username: uname })
        } else {
            setUname('Anonymous')
            setForm({ username: uname })
        }
    }, [uname])
    const { username, comment } = form
    const handleAddComment = async () => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('comment', comment)
        formData.append('locationId', postId)

        try {
            const res = await fetch('http://localhost/PHP/saBlog/control.php?action=postComment', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                handleGetComment()
                setForm({
                    username: uname,
                    comment: ''
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    // GET COMMENT
    const [getComment, setGetComment] = useState([])
    const handleGetComment = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost/PHP/saBlog/control.php?action=getComment&postId=${postId}`, {
                method: 'POST'
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setGetComment(data)
            }
        } catch (err) {
            console.error(err);
        }
    }, [postId])
    useEffect(() => {
        handleGetComment()
    }, [handleGetComment])
    // const datas = []
    // for (let i = 0; i < 10; i++) {
    //     datas.push(
    //         <p key={i} className='flex flex-col p-3 rounded-lg bg-zinc-200'>
    //             <span className='text-sm font-bold'>Anonim</span>
    //             akwokaowk apalah
    //         </p>
    //     )
    // }

    const toMain = useNavigate()
    document.addEventListener('keydown', (e) => {
        e.key == 'Escape' ? toMain('/') : null
    })


    return (
        <div className='flex flex-col lg:flex-row w-full md:h-screen h-[140vh] text-teal-950 bg-zinc-300'>
            {/* SIDE or NAVBAR */}
            <Navigation />
            {/* END SIDE or NAVBAR */}

            {/* MAIN CONTENT */}
            <div className='flex flex-col items-center w-full h-full pt-10'>
                {/* COMMENT BAR */}
                <div className='flex items-center justify-between w-10/12 h-12 px-1 rounded-full lg:w-7/12'
                    style={{ boxShadow: 'inset 0.5px 0.5px 5px black' }} >
                    <input
                        className='w-10/12 h-12 px-4 text-sm lg:w-6/12 outline-0 lg:text-md'
                        placeholder='Type your comment here...'
                        type="text"
                        value={comment}
                        name='comment'
                        onChange={(e) => { setForm(prev => ({ ...prev, comment: e.target.value })) }} />
                    <div onClick={handleAddComment}
                        className='w-10 h-10 bg-teal-800 rounded-full cursor-pointer'>post</div>
                </div>
                {/* END COMMENT BAR */}

                {/*DIVIDER*/} <hr className='w-full mt-8 mb-5' />

                {/* POST SECTION */}
                <div className='grid w-full h-full grid-cols-1 px-5 pt-5 pb-2 overflow-y-auto gap-y-10 md:grid-cols-2 place-items-center bg-zinc-300'
                    style={{ scrollbarWidth: 'none' }}>
                    {/* SELECT POST */}
                    <div className='flex flex-col justify-between w-full h-full md:border-r gap-y-5'>
                        <p className='-mb-2 text-xl font-bold md:-mb-5 md:text-2xl max-w-54'>{selectedPost.name}</p>
                        <p className='md:p-3 max-h-[130px] overflow-y-auto'
                            style={{ scrollbarWidth: 'thin' }} >{selectedPost.text_content}</p>
                        {selectedPost.media_type == 'video/mp4' ? (
                            <><video src={`http://localhost/PHP/saBlog${selectedPost.media}`} controls controlsList='nodownload' className='object-cover object-center w-full'></video></>
                        ) : (
                            <><img src={`http://localhost/PHP/saBlog${selectedPost.media}`} alt="image" className='object-cover object-center w-full' /></>
                        )}
                        <div className='h-[50px] flex justify-around'>
                            <button className='btn btn-dash'>Like</button>
                            <button className='btn btn-dash'>Comment</button>
                            <button className='btn btn-dash'>Share</button>
                        </div>
                    </div>
                    {/* DIVIDER */}
                    <div className='flex flex-col w-full h-full max-h-full pt-3 pb-6 overflow-y-auto md:pl-5 gap-y-3'>
                        {/* USER COMMENT */}
                        {getComment ? (
                            <>
                                {getComment.map((item) => (
                                    <p key={item.comment_id} className='flex flex-col p-3 rounded-lg bg-zinc-200'>
                                        <span className='text-sm font-bold'>{item.username}</span>
                                        {item.comment}
                                    </p>
                                ))}
                            </>
                        ) : <><p>There's no comment yet</p></>}
                        {/* END USER COMMENT */}
                    </div>
                    {/* END SELECT POST */}
                </div>
                {/* END POST SECTION */}
            </div>
            {/* END MAIN CONTENT */}
        </div>
    )
}

export default SelectPage