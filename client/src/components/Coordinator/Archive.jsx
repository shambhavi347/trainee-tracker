import React, { useState, useEffect } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Coordinator/Archive.css";
import { arrowLeft } from "../../Images/Images";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { fetchDocument } from "../../service/api.js";

export const ThemeContext = createContext(null);
const Archive = () => {
  const [theme, setTheme] = useState("light");
  const [document, setDocument] = useState([]);

  const ViewPDf = (fileId) => {
    //   try {
    // console.log(fileId);
    fetch(`/api/files/view/${fileId}`)
      .then((res) => {
        // convert the response to a blob
        return res.blob();
      })
      .then((blob) => {
        // create a URL for the blob
        const url = URL.createObjectURL(blob);

        // create a new window to display the PDF
        const newWindow = window.open();
        newWindow.document.write(
          `<iframe src="${url}" width="100%" height="100%"></iframe>`
        );
      });
  };

  const retTheme = (btn) => {
    setTheme(btn);
  };
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const data = await fetchDocument();
        setDocument(data);
        console.log(document);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoc();
  }, [document]);

  let navigate = useNavigate();
  const handleNavigate = () => {
    let path = "/coordinator-dashboard";
    navigate(path);
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, retTheme }}>
        <div id={theme}>
          <NavBar2 retTheme={retTheme} />

          <div className="archive-divUP">
            <div className="topline">
              <button className="back-btn" onClick={handleNavigate}>
                <img className="back-img" src={arrowLeft} alt="" />
              </button>
              <div className="archive-title-h3">Archives</div>
            </div>
            <div className="archive-div">
              {document ? (
                <>
                  {document?.map((val) => (
                    <div className="archive-tile">
                      <div className="nameTitle">{val.project_name}</div>
                      {val.document?.map((value) => (
                        <div
                          className="doc-name"
                          onClick={() => ViewPDf(value.fileID)}
                        >
                          {value.fileName}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <div className="NoArchive">No Documents in Archive</div>
              )}
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default Archive;
