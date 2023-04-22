import React, { useEffect, useState } from "react";
import {
  getGroupAssign,
  getGroups,
  assignProject,
  sendRemark,
} from "../../service/api";
import { cancel } from "../../Images/Images";
import axios from "axios";
import "../../CSS/Coordinator/ProjectDetails.css";
// import { use } from "../../../../server/router/traineeRegRoute";

const ProjectDetails = ({ project }) => {
  const [groups, setGroups] = useState([]);
  const [groupAssign, setGroupAssign] = useState([]);
  const [groupEx, setGroupEx] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [errorPro, setErrorPro] = useState("");
  const [proGroup, setProGroup] = useState([]);
  const [err, setErr] = useState(null);
  const [remark, setRemark] = useState("");

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

  const handleRemark = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setRemark(value);
    // console.log(remark);
  };
  const postRemark = async (fileID, projectId) => {
    // console.log(fileID + " " + projectId);
    try {
      const data = await sendRemark({
        remark,
        projectId,
        fileID,
      });
      console.log(data);
      if (data) window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    groups.map((val) => {
      if (project.group_id === val._id) setProGroup(val);
    });
    // console.log(proGroup);
  }, [groupAssign]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data1 = await getGroups();
        const data = await getGroupAssign();
        setGroups(data1);
        setGroupAssign(data);
        groupAssign.map((val) => {
          setGroups((oldValue) => {
            return oldValue.filter((group) => group._id !== val);
          });
        });
        // console.log(groups);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups();
  }, [groups]);

  const handleYes = async (name, title) => {
    try {
      // console.log(name + " " + title);

      const data = await assignProject({
        name,
        title,
      });
      // console.log(data);
      if (data.message === "Saved") {
        setGroups((oldValue) => {
          return oldValue.filter((group) => group.name !== name);
        });
        setGroupEx(false);
      } else {
        // console.log("error");
        setErrorPro(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="project-sub-divup">
        {/* ProjectDetails */}
        <div>{project.title}</div>
        <div>{project.description}</div>
        {project.group_id === "null" ? (
          <>
            <div>
              <select
                name={project.title}
                id=""
                value={groupName}
                onChange={(e) => {
                  setGroupEx(true);

                  setGroupName(e.target.value);
                  setGroupTitle(e.target.name);
                }}
              >
                {groups.length > 0 ? (
                  <>
                    <option value="null">Assign Group</option>
                    {groups.map((val) => (
                      <option value={val.name}>Group {val.name}</option>
                    ))}
                  </>
                ) : (
                  <option> No Groups</option>
                )}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              {proGroup ? (
                <>
                  Group {proGroup.name}
                  Members:{" "}
                  {proGroup.members?.map((val) => (
                    <div>{val.first_name}</div>
                  ))}
                </>
              ) : null}
            </div>

            <h3>Documents</h3>
            {project.document?.map((val) => (
              <>
                <div>{val.fileName}</div>
                {/* <div
                  className="file-info3"
                  onClick={() => deletePdf(val.fileID)}
                >
                  Delete
                </div> */}
                <div className="file-info2" onClick={() => ViewPDf(val.fileID)}>
                  View
                </div>
                <h3>Remark</h3>
                {val.remark ? (
                  <>
                    <div>{val.remark}</div>
                  </>
                ) : (
                  <>
                    <div>
                      <textarea
                        placeholder="Add Remark..."
                        name="remark"
                        id=""
                        cols="80"
                        rows="8"
                        value={remark}
                        onChange={handleRemark}
                      ></textarea>
                      <button
                        onClick={() => postRemark(val.fileID, project._id)}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </>
            ))}
          </>
        )}

        {groupEx ? (
          <>
            <div className="expanded-div">
              <div className="event-detail">
                <button
                  className="close-btn-event"
                  onClick={() => setGroupEx(false)}
                >
                  <img
                    className="img-event"
                    src={cancel}
                    alt="close model box"
                  />
                </button>
                <div className="cnfrm-group">
                  <p className="pro-error">{errorPro}</p>
                  Confirm Group {groupName} for {groupTitle} ?
                  <button onClick={() => handleYes(groupName, groupTitle)}>
                    Yes
                  </button>
                  <button onClick={() => setGroupEx(false)}>No</button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProjectDetails;
