import React, { useState, useEffect } from "react";
import "../../CSS/Trainee/TraineeProject.css";
import {
  getProjectList,
  getGroupProject,
  getOwnPro,
  getOwnGroup,
  uploadFile,
  pullDocument,
} from "../../service/api.js";
import { arrowDown, cancel, expand } from "../../Images/Images";
import WatchTrainee from "../WatchTrainee";
import axios from "axios";

const TraineeProject = () => {
  const [projectList, setProjectList] = useState([]);
  const [proEx, setProEx] = useState(false);
  const [project, setProject] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupPro, setGroupPro] = useState([]);
  const [proOwn, setProOwn] = useState([]);
  const [groupOwn, setGroupOwn] = useState([]);
  const [groupEx, setGroupEx] = useState(false);
  const [proOwnEx, setProOwnEx] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchOwnPro = async () => {
      try {
        const data = await getOwnPro();
        setProOwn(data);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwnPro();
  }, [proOwn]);
  // console.log(proOwn);
  useEffect(() => {
    const fetchOwnPro = async () => {
      try {
        const data = await getOwnGroup();
        setGroupOwn(data);
        // if(data)
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwnPro();
  }, [groupOwn]);
  // console.log(groupOwn);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectList();

        setProjectList(data);
        // console.log(projectList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [projectList]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getGroupProject();
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [groups]);

  useEffect(() => {
    groups.map((val) => {
      if (project.group_id === val._id) setGroupPro(val);
    });
  }, [project]);

  const sendId = (btn) => {
    setFileId(btn);
    // setDocument({ ...document, fileID: fileId });
  };

  const sendName = (name) => {
    console.log("Name" + name);
    setFileName(name);
    console.log("File Name" + fileName);
    // setDocument({ ...document, name: name });
  };

  const ViewPDf = (fileId) => {
    //   try {
    console.log(fileId);
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

  //delete uploaded file
  const deletePdf = async (fileId) => {
    try {
      console.log(fileId);
      const data = await axios.get("/file/delete/" + fileId);
      // const res = data.json();
      if (data.status === 500) window.alert("error while deleting file");
      else {
        setFileId(null);
        setFileName(null);

        // setDocument({ ...document, fileID: null });
        // setDocument({ ...document, name: null });
      }
    } catch (error) {
      setErr(error);
      console.log(error);
    }
  };

  const deleteUpPdf = async (fileId) => {
    try {
      console.log(fileId);
      const data = await axios.get("/file/delete/" + fileId);
      if (data.status === 500) window.alert("error while deleting file");
      else {
        const data = await pullDocument({
          fileId: fileId,
        });
        console.log(data);
      }
    } catch (error) {
      setErr(error);
      console.log(error);
    }
  };

  // const deleteUpPdf = async (fileId) => {
  //   try {
  //     const data = await pullDocument({
  //       fileId: fileId,
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     setErr(error);
  //     console.log(error);
  //   }
  // };
  const postPDF = async () => {
    // console.log(fileId);
    // console.log(fileName);
    try {
      const data = await uploadFile({
        fileID: fileId,
        fileName: fileName,
      });
      // console.log(data);
      if (data === "Success") {
        setFileId(null);
        setFileName(null);
      } else {
        window.alert("Error");
      }
    } catch (error) {
      console.log(err);
    }
  };
  // console.log(document);

  return (
    <>
      <div className="trainee-pro-body">
        <div className="project-listUp">
          <div className="project-list">
            <div className="project-list-inner">
              <h3 className="project-heading">Project List</h3>
              {projectList.length > 0 ? (
                projectList.map((val) => (
                  <>
                    <div className="project-title-trainee">{val.title}</div>
                    <button
                      className="expnd-btn-trainee-project"
                      onClick={() => {
                        setProEx(true);
                        setProject(val);
                      }}
                    >
                      <img
                        className="expnd-img-trainee-project"
                        src={expand}
                        alt=""
                      />
                    </button>
                  </>
                ))
              ) : (
                <div style={{ color: "#eee", textAlign: "center" }}>
                  No project yet
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="project-submissionUp">
          {proOwn === "no project" ? (
            <>
              <h2 style={{ color: "#eee", textAlign: "center" }}>
                No Project Assigned Yet
              </h2>
            </>
          ) : (
            <div className="project-own-div">
              <div>
                <div className="proOwn-title">{proOwn.title}</div>{" "}
                <button
                  className="down-btn-expand"
                  onClick={() => {
                    proOwnEx ? setProOwnEx(false) : setProOwnEx(true);
                  }}
                >
                  <img className="arrowDown-img" src={arrowDown} alt="" />
                </button>
              </div>

              {proOwnEx ? (
                <>
                  <div className="proOwnDesc-div">{proOwn.description}</div>
                </>
              ) : null}
            </div>
          )}
          {groupOwn === "No Group" ? (
            <>
              <h2 style={{ color: "#eee", textAlign: "center" }}>
                No Group Assigned Yet
              </h2>
            </>
          ) : (
            <>
              <div className="group-own-div">
                <div>
                  <div className="groupOwn-title">Group Details </div>{" "}
                  <button
                    className="down-btn-expand"
                    onClick={() => {
                      groupEx ? setGroupEx(false) : setGroupEx(true);
                    }}
                  >
                    <img className="arrowDown-img" src={arrowDown} alt="" />
                  </button>
                </div>
                {groupEx ? (
                  <>
                    <div className="groupDeet-div">
                      <div> Group: {groupOwn.name}</div>
                      <h4>Group Members</h4>
                      {groupOwn.members?.map((val) => (
                        <div>
                          {val.prefix} {val.first_name} {val.middle_name}{" "}
                          {val.last_name}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}

          <div className="workSub-divUp">
            <div className="workSub-heading">Work Submission</div>
            <WatchTrainee sendId={sendId} sendName={sendName} />
            {fileId ? (
              <>
                <div className="file-info">
                  <div className="file-info1">{fileName}</div>

                  <div className="file-info3" onClick={() => deletePdf(fileId)}>
                    Delete
                  </div>
                  <div className="file-info2" onClick={() => ViewPDf(fileId)}>
                    View
                  </div>
                  <div onClick={postPDF}>Submit</div>
                </div>
              </>
            ) : null}

            <h3>Documents</h3>
            {proOwn.document?.map((val) => (
              <>
                <div>{val.fileName}</div>
                <div
                  className="file-info3"
                  onClick={() => deleteUpPdf(val.fileID)}
                >
                  Delete
                </div>
                <div className="file-info2" onClick={() => ViewPDf(val.fileID)}>
                  View
                </div>
              </>
            ))}
          </div>
        </div>

        {proEx ? (
          <>
            <div className="expanded-div">
              <button
                className="cancel-btn-project"
                onClick={() => setProEx(false)}
              >
                <img className="cancel-img" src={cancel} alt="" />
              </button>
              <div className="projectEx-outer">
                <div className="project-div-inner">
                  <div className="project-title-div">
                    <div className="project-title-inner">{project.title}</div>
                  </div>
                  <div className="project-desc-div">{project.description}</div>
                  <div className="project-mem-div">
                    {project.group_id !== "null" ? (
                      <>
                        <div className="group-name-trainee-project">
                          <h3>Group {groupPro.name}</h3>
                        </div>
                        <h4>Group Members</h4>
                        {groupPro ? (
                          <>
                            {groupPro.members?.map((val) => (
                              <div>
                                {val.prefix} {val.first_name} {val.middle_name}{" "}
                                {val.last_name}
                              </div>
                            ))}
                          </>
                        ) : null}
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "1%" }}>
                        Not yet Assigned
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default TraineeProject;
