import { useState } from "react";
import RegStudent from './RegStudent';
import RegStudent1 from './RegStudent1';
import RegStudent2 from './RegStudent2';

const FinalPage = () => {
    const [page, setPage] = useState(0);

    const componentList = [
        <RegStudent 
            page={page}
            setPage={setPage}
        />,
        <RegStudent1 
            page={page}
            setPage={setPage}
        />,
        <RegStudent2 
            page={page}
            setPage={setPage}
        />,
    ];
    return (
        <div className="App">
        <div className="progress-bar"></div>       
        <div>{componentList[page]}</div>
      </div>
    );
}

export default FinalPage