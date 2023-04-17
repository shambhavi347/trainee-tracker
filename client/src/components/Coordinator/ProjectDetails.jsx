import React, { useEffect, useState } from "react";
import { getGroupAssign, getGroups, assignProject } from "../../service/api";
import { cancel } from "../../Images/Images";

const ProjectDetails = ({ project }) => {
  const [groups, setGroups] = useState([]);
  const [groupAssign, setGroupAssign] = useState([]);
  const [groupEx, setGroupEx] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [errorPro, setErrorPro] = useState("");
  const [proGroup, setProGroup] = useState([]);

  useEffect(() => {
    groups.map((val) => {
      if (project.group_id === val._id) setProGroup(val);
    });
    console.log(proGroup);
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
      console.log(name + " " + title);

      const data = await assignProject({
        name,
        title,
      });
      console.log(data);
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
      <div>
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
