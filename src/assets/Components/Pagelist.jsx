import React from "react";

function PageList({pageno,next,prev}){
  return(
     <div className="bg-gray-600 h-6 w-full flex justify-center space-x-3">
         <div>
         <i className="fa-solid fa-arrow-left cursor-pointer" onClick={prev}></i>
         </div>
         <div>
            {pageno}
         </div>
         <div>
         <i onClick = {next} className="fa-solid fa-arrow-right cursor-pointer"></i>
         </div>
     </div>
  )

}

export default PageList;