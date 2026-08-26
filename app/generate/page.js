"use client"

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Generate = () => {
    const [link, setlink] = useState("")
    const [handle, sethandle] = useState("")
    const [linktext, setlinktext] = useState("")
    const [pic, setpic] = useState("")


    const notify = () => toast("your link genrated succesfully !");
    const notify1 = () => toast("added");
    const addLink = async (text, link, handle, add) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "link": link,
            "linktext": text,
            
            "handle": handle
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
        const r = await fetch("http://localhost:3000/api/generate", requestOptions)
        const result = await r.json()
        toast(result.message || "link added succesfully !")

        setlink("");
        setlinktext("");
        } catch (error) {
            toast.error("failed to add link");
            console.error(error);
        }



    }
    return (
        <div className='bg-blue-600 min-h-screen grid grid-cols-2'>
            <div className=' p-10 py-72'>
                <h1 className=' text-3xl'>Create your Bitree</h1>
                <div className='justify-center text-2xl items-center rounded-3xl border-amber-200 pt-2 space-y-5'>
                    <p>Step 1. claim your handle </p>
                    <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className=' bg-amber-50 rounded-2xl p-2' placeholder='choose your handle'></input>
                    <p>Step 2. add links</p>
                    <div className='gap-3.5 space-x-2'>
                        <input
                            value={linktext || ""}
                            onChange={e => setlinktext(e.target.value)}
                            className="bg-amber-50 rounded-2xl p-2"
                            placeholder="enter link text"
                        />

                        <input
                            value={link || ""}
                            onChange={e => setlink(e.target.value)}
                            className="bg-amber-50 rounded-2xl p-2"
                            placeholder="enter link"
                        
                        />

                        <button onClick={() => addLink(linktext, link, handle)}   className='bg-black text-white rounded-2xl p-2'>Add link</button>
                    </div>
                    <p>Step 3. Add Picture and Finalize</p>
                    <input value={pic || ""} onChange={e => { setpic(e.target.value) }} className='  bg-amber-50 rounded-2xl p-2' placeholder='enter image url'></input>
                    <button className='bg-black text-white rounded-2xl p-2' onClick={notify}>Create your bitlinks</button>
                    <ToastContainer />

                    <div>

                    </div>
                </div>
            </div>
            <div className='bg-blue-600'>
                <img src="/image.png" className='w-full h-full'></img>
            </div>

        </div>
    )
}

export default Generate