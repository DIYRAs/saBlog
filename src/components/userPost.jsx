import React from 'react'

const userPost = ({ userPost, directToSelect, handlePropagation }) => {
    return (
        <>
            {userPost.map((item) => (
                <div onClick={() => { directToSelect(item.id) }}
                    key={item.id} className='min-h-[540px] cursor-auto w-full h-max max-w-[400px] border pb-4 flex justify-between flex-col space-y-3'>
                    <div className='max-h-full overflow-hidden'>
                        <p
                            className='p-3 overflow-x-auto font-bold max-w-54'
                            style={{ scrollbarWidth: 'none' }}>
                            {item.name}
                        </p>
                        <p
                            className='max-h-full px-3 overflow-y-auto break-words'
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
                    <div className='h-[50px] flex justify-around'>
                        <button onClick={handlePropagation} className='btn btn-dash'>Like</button>
                        <button className='btn btn-dash'>Comment</button>
                        <button onClick={handlePropagation} className='btn btn-dash'>Share</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default userPost