import React, { useState, useEffect } from "react";
import axios from "axios";
import { cancel } from "././../Images/Images";
import { useNavigate } from "react-router-dom";
// import "./Regular.scss";
// import LoadingDots from "imgs/loading-dots.gif";

const WatchTrainee = ({ sendId }) => {
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [progress, setProgress] = useState(null);
  let navigate = useNavigate();
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", file, file.name);
    axios
      .post(`/api/image/upload`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
          console.log(
            "upload progress: ",
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(({ data }) => {
        sendId(data);
        // data ? sendId(data) : sendId("empty");
        // console.log(data);
        setImageId(data);
        setFile(null);
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log("db error");
          alert("db error");
        } else {
          console.log("other error: ", err);
        }
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      });
  };

  const handleClick = () => {
    if (inputContainsFile) {
      setCurrentlyUploading(true);
      fileUploadHandler();
    }
  };
  const routeChangeAdmin = () => {
    let path = `/view/image/` + imageId;
    navigate(path);
  };
  const routChangeViewPDf = () => {
    let path = `/view/pdf/` + imageId;
    navigate(path);
  };
  return (
    <div className="regular">
      <div className="image-section">
        {imageId ? (
          <>
            {/* <img
              className="image"
              src={`/api/image/${imageId}`}
              alt="regular version"
            /> */}
            {/* <a className="link" href={`/api/image/${imageId}`} target="_blank"> */}
            <div onClick={routeChangeAdmin}>Download</div>
            <div onClick={routChangeViewPDf}>View</div>

            {/* </a> */}
          </>
        ) : (
          <p className="nopic">no regular version pic yet</p>
        )}
      </div>
      <div className="inputcontainer">
        {currentlyUploading ? (
          <img src={cancel} className="loadingdots" alt="upload in progress" />
        ) : (
          <>
            <input
              className="file-input"
              onChange={handleFile}
              type="file"
              name="file"
              id="file"
            />
            <label
              className={`inputlabel ${file && "file-selected"}`}
              htmlFor="file"
              onClick={handleClick}
            >
              {file ? <>Upload</> : null}
              {/* {imageId ? <>{file}</> : null} */}
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchTrainee;
