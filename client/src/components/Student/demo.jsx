import React, { useState } from "react";

const demo = () => {
  const [page0, setPage0] = useState(true);
  const [page1, setPage1] = useState(false);
  const [page2, setPage2] = useState(false);
  return (
    <>
      {page0 ? (
        <>
          {/* write your page 1 code here 
                <button onClick = {() => {setPage1(true) ; setPage0(false) ; setPage2(false);}}> NEXT</button>
        
        */}
        </>
      ) : page1 ? (
        <>
          {/* write your page 2 code here 
<button onClick = {() => {setPage2(true); setPage0(false); setPage1(false);}}> NEXT </button> 
<button onClick = {() => {setPage2(false); setPage0(true); setPage1(false);}}> PREVIOUS </button>        
        */}
        </>
      ) : page2 ? (
        <>
          {/* write your page 2 code here 
        <button onClick = {() => {setPage1(true) ; setPage0(false);setPage2(false);}}> PREVIOUS</button>
        <button>SUBMIT</button>
        */}
        </>
      ) : null}
    </>
  );
};

export default demo;
