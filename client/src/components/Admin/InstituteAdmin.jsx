import React, { useState, useEffect } from "react";
import "../../CSS/Admin/InstituteAdmin.css";
import { arrowDown, arrowLeft, cancel } from "../../Images/Images";
import { getInstitutes, getInstAccept } from "../../service/api";
import PendingInst from "./PendingInst";

const InstituteAdmin = () => {
  const itype = [
    "Central University",
    "State University",
    "Private Institution",
    "Deemed University",
    "Autonomous College",
    "Affiliated College",
  ];

  const imonth = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const iduration = ["3 Months", "6 Months"];

  const naac = ["A++", "A+", "A", "B++", "B+", "B", "C", "D"];

  let countSort = 0;
  let original = [];
  let countSrch = 0;
  let org = [];

  const [sortdrop, setSortdrop] = useState(false);

  const [sortvalue, setSortvalue] = useState("Sort By NAAC Ratings");

  const [filterdrop, setFilterdrop] = useState({
    "Institute Type": false,
    "Internship Start Month": false,
    "Internship Duration": false,
    "NAAC Rating": false,
  });

  const [appliedfilter, setAppliedfilter] = useState([]);

  const [instInfo, setInstInfo] = useState([
    {
      name: " IIT Delhi",
      month: "September",
      duration: "3 Months",
      rating: "A++",
      rvalue: 8,
      type: "Central University",
      email: "iitdelhi@gmail.com",
      street: "",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "201012",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
    {
      name: " IIM Ahemdabad",
      month: "December",
      duration: "6 Months",
      rating: "A",
      rvalue: 6,
      type: "Central University",
      email: "iitAhemdabad@gmail.com",
      street: "",
      city: "Ahemdabad",
      state: "Gujrat",
      country: "India",
      zipCode: "201012",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
    {
      name: " GGSIPU",
      month: "July",
      duration: "6 Months",
      rating: "A+",
      rvalue: 7,
      type: "Private Institution",
      email: "iitdelhi@gmail.com",
      street: "",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "201012",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
    {
      name: " Bansathli Vidyapith",
      month: "January",
      duration: "6 Months",
      rating: "A++",
      rvalue: 8,
      type: "Deemed University",
      email: "iitdelhi@gmail.com",
      street: "",
      city: "Newai, Tonk",
      state: "Rajasthan",
      country: "India",
      zipCode: "304022",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
    {
      name: " Amity University",
      month: "May",
      duration: "3 Months",
      rating: "C",
      rvalue: 2,
      type: "Private Institution",
      email: "iitdelhi@gmail.com",
      street: "Amity Road",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "201012",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
    {
      name: "JNU",
      month: "July",
      duration: "3 Months",
      rating: "B+",
      rvalue: 4,
      type: "Central University",
      email: "iitdelhi@gmail.com",
      street: "JNU Road",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "201012",
      phone: "987654321",

      coordName: "Mr. Vas dsds ",
      coordEmail: "iitdelhicoord@gmail.com",
      coordPhone: "987654333",
    },
  ]);

  // const [instInfo, setInstInfo] = useState([{}]);
  const [insti, setInsti] = useState([]);

  const [institute, setInstitute] = useState([]);

  const [text, setText] = useState("");
  const [acceptList, setAcceptList] = useState([]);
  const [disAccept, setDisAccept] = useState("none");

  // const [expnd, setExpnd] = useState("none");

  const [inst, setInst] = useState([]);

  const [sendEmail, setSendEmail] = useState("");

  // const callInst = async () => {
  //   try {
  //     const res = await fetch("/get-pending-institute", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       Credential: "include ",
  //     });
  //     const data = await res.json();
  //     setInstitute(data);
  //     console.log(data);
  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // navigate("/");
  //   }
  // };

  // instInfo.map((val, key) => {
  //   console.log(val);
  // });
  // console.log(institute);
  // useEffect(() => {
  //   callInst();
  // }, []);
  let data1 = [];
  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstitutes();
      // console.log("dta " + data);
      setInstitute(data);
      // console.log(inst);
    };
    fetchData();
  }, [institute]);
  console.log(institute);
  // useEffect(() => {
  const handleAcceptList = async () => {
    // setDisAccept("block");
    const data = await getInstAccept();
    setInstitute(data);
    // setAcceptList(data);
    // setDisAccept("block");
  };
  //   handleAcceptList();
  // }, []);

  const handleChange = (e) => {
    // callInst();
    let value = e.target.value;
    // let name = e.target.name;
    if (e.target.checked) {
      //so duplicate values are not added
      if (appliedfilter.includes(value) === false)
        setAppliedfilter([...appliedfilter, value]);
    } else {
      setAppliedfilter((oldValues) => {
        return oldValues.filter((appliedfilter) => appliedfilter !== value);
      });
    }
  };

  if (institute.length == 0) setInstitute(instInfo);
  useEffect(() => {
    // callInst();
    appliedfilter.length > 0
      ? appliedfilter.map((val) => {
          if (itype.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.type === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.type === val;
                  });
            setInstitute(newItem);
          } else if (imonth.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.month === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.month === val;
                  });
            setInstitute(newItem);
          } else if (iduration.includes(val)) {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.duration === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.duration === val;
                  });
            setInstitute(newItem);
          } else {
            const newItem =
              institute.length > 0
                ? institute.filter((newVal) => {
                    return newVal.rating === val;
                  })
                : instInfo.filter((newVal) => {
                    return newVal.rating === val;
                  });
            setInstitute(newItem);
          }
        })
      : setInstitute(instInfo);
  }, [appliedfilter]);

  useEffect(() => {
    // callInst();
    let strDescending = [];
    // original = institute;
    // setInstitute(strDescending);
    // if (countSort == 1) original = institute;
    // countSort += 1;
    // console.log(original);
    if (sortvalue === "Highest to Lowest") {
      strDescending = [...institute].sort((a, b) => b.rvalue - a.rvalue);
      setInstitute(strDescending);
      // console.log(institute);
      //console.log(strDescending);
    } else if (sortvalue === "Lowest to Highest") {
      strDescending = [...institute].sort((a, b) => a.rvalue - b.rvalue);
      setInstitute(strDescending);
      // console.log(institute);
    } else {
      // setInstitute(original);
    }
    // setInstitute(strDescending);
  }, [sortdrop]);

  useEffect(() => {
    // callInst();
    let filteredData1 = "";
    // if (countSrch == 1) org = institute;
    // countSrch += 1;
    // console.log("prev" + org);
    if (text.length == 0) {
      setInstitute(org);
    } else {
      filteredData1 = institute.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setInstitute(filteredData1);
    }
  }, [text]);

  // const handleAccept = async () => {
  //   try {
  //     // console.log(email);
  //     await getInstAccept({ email: sendEmail });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="divBdy">
        <div className="filter-panel">
          <div className="btns-inst">
            <button
              className="accepted-btn"
              onClick={() => {
                // setDisAccept("block");
                handleAcceptList();
              }}
            >
              Accepted List
            </button>
            <button className="rejected-btn">Rejected List</button>
          </div>
          <div className="search-bar">
            <input
              className="search-text"
              type="text"
              name=""
              id=""
              placeholder="Search by name..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />

          <div className="sort-div">
            {sortvalue}
            <button
              className="down-btn"
              onClick={() => {
                sortdrop ? setSortdrop(false) : setSortdrop(true);
              }}
            >
              <img className="downarrow-img " src={arrowDown} alt="" />
            </button>
            {sortdrop ? (
              <>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Highest to Lowest");
                    setSortdrop(false);
                  }}
                >
                  Highest to Loweset
                </ul>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Lowest to Highest");
                    setSortdrop(false);
                  }}
                >
                  Lowset to Highest
                </ul>
                <ul
                  className="sort-menu-list"
                  onClick={() => {
                    setSortvalue("Sort by NAAC Ratings");
                    setSortdrop(false);
                  }}
                >
                  None
                </ul>
              </>
            ) : null}
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />
          <div className="filter-div">
            <div className="filter-name">
              Institute Type
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Institute Type"]
                    ? setFilterdrop({ "Institute Type": false })
                    : setFilterdrop({ "Institute Type": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Institute Type"] ? (
                <>
                  {itype.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="radio"
                          name="type"
                          id=""
                          value={val}
                          // checked={() => setChecked(!checked)}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Insternship Start Month
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Insternship Start Month"]
                    ? setFilterdrop({ "Insternship Start Month": false })
                    : setFilterdrop({ "Insternship Start Month": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Insternship Start Month"] ? (
                <>
                  {imonth.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="radio"
                          name="month"
                          id=""
                          value={val}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Insternship Duration
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Insternship Duration"]
                    ? setFilterdrop({ "Insternship Duration": false })
                    : setFilterdrop({ "Insternship Duration": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Insternship Duration"] ? (
                <>
                  {iduration.map((val) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="radio"
                          name="duartion"
                          id=""
                          value={val}
                          // checked={() => setChecked(!checked)}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
            <div className="filter-name">
              Institute Rating
              <button
                className="down-btn"
                onClick={() => {
                  filterdrop["Institute Rating"]
                    ? setFilterdrop({ "Institute Rating": false })
                    : setFilterdrop({ "Institute Rating": true });
                }}
              >
                <img className="downarrow-img " src={arrowDown} alt="" />
              </button>
              {filterdrop["Institute Rating"] ? (
                <>
                  {naac.map((val, key) => (
                    <>
                      <br />
                      <label className="container">
                        {val}
                        <input
                          type="radio"
                          name="rating"
                          id=""
                          value={val}
                          onChange={handleChange}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </>
                  ))}
                </>
              ) : null}
            </div>
          </div>
          <hr style={{ backgroundColor: "#393e46", opacity: "0.2" }} />

          {Object.keys(appliedfilter).length === 0 ? null : (
            <>
              <h4>Applied Filter</h4>
              <div className="applied-filter">
                {appliedfilter.map((key) => (
                  <>
                    <div className="filter">
                      <div className="cancel-text">{key}</div>
                      <button
                        className="cancel-btn"
                        onClick={() => {
                          setAppliedfilter((oldValues) => {
                            return oldValues.filter(
                              (appliedfilter) => appliedfilter !== key
                            );
                          });
                        }}
                      >
                        <img className="cancel-img" src={cancel} alt="" />
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="institute-panel">
          {/* {acceptList?.map((val) => (
            <div className="accept-bdy" style={{ display: disAccept }}>
              <button>
                <img src={arrowLeft} alt="" onClick={setDisAccept("none")} />
                <h3>Accepted Institute List</h3>
              </button>
              <PendingInst inst={val} />
            </div>
          ))} */}

          {/* // ) : institute ? ( // institute.map((inst, key) =>{" "}
          <PendingInst inst={inst} />) // ) : ( // <>No Application as of yet</>
          // )} */}

          {institute ? (
            institute.map((inst, key) => <PendingInst inst={inst} />)
          ) : (
            <>No Application as of yet</>
          )}
        </div>
      </div>
    </>
  );
};

export default InstituteAdmin;
