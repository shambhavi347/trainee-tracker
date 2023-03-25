import React, { useState, useEffect } from "react";
import axios from "axios";
import { cancel } from "././../Images/Images";
import { useNavigate } from "react-router-dom";
import { loading } from "././../Images/Images";
import "../CSS/Document.css";
// import "./Regular.scss";
// import LoadingDots from "imgs/loading-dots.gif";

const WatchTrainee = ({ sendId, sendName }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
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
        console.log("File details" + data);
        sendId(data.id);
        sendName(data.originalname);
        setFileName(data.originalname);
        console.log("File name:" + fileName);
        // data ? sendId(data) : sendId("empty");
        // console.log(data);
        setImageId(data.id);
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

  const deletePdf = async () => {
    try {
      console.log(imageId);
      const data = await axios.get("/file/delete/" + imageId);
      // const res = data.json();
      if (data.status === 500) window.alert("error while deleting file");
      else {
        setFileName(null);
        setImageId(null);
        setFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div className="inputcontainer"> */}
      {currentlyUploading ? (
        <div className="load-div">
          <img src={loading} className="loadingdots" alt="upload in progress" />
        </div>
      ) : (
        <>
          <input
            className="file-input"
            onChange={handleFile}
            type="file"
            name="file"
            id="file"
          />
          {file ? (
            <label
              className={`inputlabel ${file && "file-selected"}`}
              htmlFor="file"
              onClick={handleClick}
              id="upload-btn"
            >
              <>Upload</>
              {/* {imageId ? <>{file}</> : null} */}
            </label>
          ) : null}
        </>
      )}
      {/* </div> */}
      {/* <div className="image-section"> */}
      {/* {imageId ? (
          <> */}
      {/* <img
              className="image"
              src={`/api/image/${imageId}`}
              alt="regular version"
            /> */}
      {/* <a className="link" href={`/api/image/${imageId}`} target="_blank"> */}
      {/* <div className="fileName">{fileName}</div>
            <div onClick={routeChangeAdmin}>Download</div>
            <div onClick={routChangeViewPDf}>View</div>
            <div onClick={deletePdf}>Delete</div> */}

      {/* </a> */}
      {/* </>
        ) : null}
      </div> */}
    </>
  );
};

export default WatchTrainee;
