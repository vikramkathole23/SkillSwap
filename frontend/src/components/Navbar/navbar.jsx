import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";




function Navbar() {
    const [selectedlink,setselectedlink]=useState(0)

    const handleselectedlinks=(idx)=>{
        setselectedlink(idx)
    }

    const selected='selected';
    return ( 
        <>
            <div className="nav-container sticky z-50 top-0 border-b border-white flex justify-between h-[65px] px-[20px]">
                <div className='flex gap-8 items-center'>
                    <Link to="/home" onClick={()=>handleselectedlinks(o)}><h1 className='brand-Name text-3xl cursor-pointer'>SkillSwap</h1></Link>
                    <ul className=' flex gap-8 items-center '>
                        <Link to="/home" onClick={()=>handleselectedlinks(o)}><li className={selectedlink==0?selected:""}>Home</li></Link>
                        <Link to="/my-swap" onClick={()=>handleselectedlinks(1)}><li className={selectedlink==1?selected:""}>MySwap</li></Link>
                        <li className='links'>Explore</li>
                        {/* <li className='links'>My Swap</li> */}
                        <li className='links'>Messages</li>
                    </ul>
                </div>
                <div className='flex justify-center items-center  gap-8'>
                    <div className="search ">
                       <input type="text" placeholder='Search' />  
                    </div>
                    <div className="notification-box h-[40px] w-[40px]  flex items-center justify-center cursor-pointer text-2xl">
                        <FaRegBell/>
                    </div>
                    <div className=' cursor-pointer'>
                        <Link to="/main" onClick={()=>handleselectedlinks(4)}><p className={selectedlink==4?selected:""}><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></p> </Link>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Navbar;