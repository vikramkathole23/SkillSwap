  import React ,{useState} from "react";
  import Tab from "@mui/material/Tab";

function TabButton({ label }){
    const [tab, setTab] = useState("I Learned");

    return(
    
    <button
      className={`px-3 py-1 border-b-2 ${
        tab === label.toLowerCase()
          ? "border-red-500 text-white"
          : "border-transparent text-gray-400"
      }`}
      onClick={() => setTab(label.toLowerCase())}
    >
      {label}
    </button>
    )
   
  };

  export default TabButton;