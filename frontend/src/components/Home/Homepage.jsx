import React from 'react';
import SkillBox from './SkillBox';
import { useEffect,useState } from 'react';
import axios from 'axios';



function HomePage() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/skill");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  fetchData();
  }, []);

    return ( 
        <>
           <div className="home-container mx-[10%] p-2 ">
              <div className="search-category-container">
              </div>
              <div className="Skill-Conyainer mt-8">
              <h1 className='text-3xl font-semibold mb-6'>Skills Available</h1>
               {data.map((item,idx)=>(
                  <SkillBox data={item} key={idx} id={item.id}/>
               ))}
               </div>
           </div>
        </>
     );
}

export default HomePage;