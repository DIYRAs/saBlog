import React, { useState } from 'react'
import Button from '../components/button'
import { useEffect } from 'react'

const Navigation = () => {
    const [username, setUsername] = useState()
    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'))
            console.log(`username: ${username}`)
        }
    }, [username])

    // const getUserProfile = useCallback(async () => {
    //     const formData = new FormData()
    //     formData.append('input', username)
    //     try {
    //         const res = await fetch('http://localhost/PHP/saBlog/control.php?action=getProfile', {
    //             method: 'POST',
    //             body: formData
    //         })
    //         const data = await res.json()
    //         console.log(data)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [username])
    // useEffect(() => {
    //     getUserProfile()
    // }, [getUserProfile])

    return (
        <>
            {/* SIDE or NAVBAR */}
            {/* DESKTOP */}
            <div className='h-full hidden pt-10 bg-zinc-800 max-w-[300px] min-w-[300px] space-y-3 lg:flex item-center text-center flex-col text-teal-50'>
                <h1 className='font-serif text-5xl italic'>da saBlog</h1>
                <p className='text-sm'>Here you can post anything you like</p>

                <div className='grid w-full h-full grid-cols-1 px-8 py-6 mt-16 border-t border-b'>
                    <div className='space-y-3'>
                        <Button text={'POST'} page={'post'} />
                        <Button text={'HOME'} page={''} />
                    </div>
                    {!username?.trim() ? (
                        <>
                            <div className='self-end space-y-3'>
                                <Button text={'Register'} page={'entries'} />
                                <Button text={'Login'} page={'entries'} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='self-end text-xl'>
                                <p>username: <span className='font-semibold'>{username}</span></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* END DESKTOP */}
            {/* MOBILE */}
            <div className='shadow-sm navbar lg:hidden bg-zinc-800 text-teal-50'>
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
                            <p>|||</p>
                        </div>
                        <ul tabIndex={0}
                            className='p-2 mt-3 space-y-4 shadow w-36 menu menu-sm dropdown-content bg-zinc-700 rounded-box z-1'>
                            <li> <Button text={'POST'} page={'post'} /></li>
                            <li> <Button text={'HOME'} page={''} /></li>
                            {!username?.trim() ? (
                                <>
                                    <li> <Button text={'Register'} page={'entries'} /></li>
                                    <li> <Button text={'Login'} page={'entries'} /></li>
                                </>
                            ) : (
                                <>
                                    <div className=''>
                                        <p>username: {username}</p>
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='navbar-center'>
                    <a href="#" className='text-xl btn btn-ghost'>da saBlog</a>
                </div>
                <div className='navbar-end'>
                    {/* <button className='btn btn-ghost btn-circle'>
                <p>Search</p>
            </button> */}
                </div>
            </div>
            {/* END MOBILE */}
            {/* END SIDE or NAVBAR */}
        </>
    )
}

export default Navigation