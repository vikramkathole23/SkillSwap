import React from 'react';

function UserSkill({data}) {
    return ( 
        <div className="box-container my-4">
        <div className="inner-container flex justify-between ">
          <div className="description ">
            <h1  className="text-2xl mb-2 cursor-pointer">{data.skillName}</h1>
            <p>{data.description}</p>
            <div className="mt-[20px]">
              <button className="box-btn px-4 py-1">Request Swap</button>
            </div>
          </div>
          <div className="Box-image h-[200px] ">
            <img
              className="h-full "
              src="https://framerusercontent.com/images/0YHMW01oxIdRY4oW3VsdPXOL8xQ.jpg "
              alt="img"
            />
          </div>
        </div>
      </div>
     );
}

export default UserSkill;