import React, {useState} from 'react';
import NavBar2 from "../NavBar2";
import "../../CSS/RegInstitute.css";
import { start } from '@popperjs/core';
function RegInstitute() {
  const [userRegistration, setUserRegistration] = useState({
    instname:"",
    insttype:"",
    email:"",
    intprog:"",
    startmon:"",
    naac:"",
    street:"",
    state:"",
    city:"",
    state:"",
    country:"",
    zipcode:""
  })

  const [record, setRecord] = useState([]);
  const handlechange = (e) => {
      const name=e.target.name;
      const value=e.target.value;
      console.log(name , value);

      setUserRegistration({...userRegistration, [name]:value})
  }

   const handleSubmit = (e) => {
      e.preventDefault();
        const newRecord = {...userRegistration, id: new Date().getTime().toString()};
        setRecord([...record, newRecord])
   }

    const [insttype, setinsttype] = useState(["Central University", "State University", "Deemed University","Private Institute" , "Affiliated College", "Autonomous College"])
    const Add1 = insttype.map(Add1 => Add1)
    const handleInstType = (e) => console.log((insttype[e.target.value]))

    const [startmon, setstartmon] = useState(["January", "February", "March", "April", "May", "June", "July" , "August", "September", "October" , "November", "December"])
    const Add2 = startmon.map(Add2 => Add2)
    const handleStartMon = (e) => console.log((startmon[e.target.value]))

    return(
    <>
    <NavBar2 />
      <div class="divUpper">
            <div className="body">
                <div className="main">
                    <h1 className="regHead">Register Yourself</h1>
                     <div className="regbox">
                       <form action="" className="form-body" onSubmit={handleSubmit}>
                          <div className="instname">
                           <input className="form__input" type="text"  autoComplete='off' value={userRegistration.instname} onChange={handlechange} name="instName" id="instName" placeholder="Institute Name" />
                          </div>
                          <select
                                onChange={e => handleInstType(e)}
                                className="drop-down" >
                                {
                                    Add1.map((institute, key) => <option value={key}>{institute}</option>)
                                }
                            </select>
                          
                          <div className="email">
                            <input className="form__input" type="email"  autoComplete='off' value={userRegistration.email}onChange={handlechange} name="email" id="email" placeholder="Email" />
                          </div>
                          <div className="intprog">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.intprog} onChange={handlechange} name="intprog" id="intprog" placeholder="Internship Program" />
                          </div>
                          <select
                                onChange={e => handleStartMon(e)}
                                className="drop-down" >
                                {
                                    Add2.map((month, key) => <option value={key}>{month}</option>)
                                }
                            </select>
                          
                          <div className="naac">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.naac} onChange={handlechange} name="naac" id="naac" placeholder="NAAC Rating" />
                          </div>
                          <div className="street">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.street} onChange={handlechange} name="street" id="street" placeholder="Street" />
                          </div>

                          <div className="city">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.city} onChange={handlechange} name="city" id="city" placeholder="City" />
                          </div>

                          <div className="state">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.state} onChange={handlechange} name="state" id="state" placeholder="State" />
                          </div>

                          <div className="country">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.country} onChange={handlechange} name="country" id="country" placeholder="Country" />
                          </div>

                          <div className="zipcode">
                            <input className="form__input" type="text"  autoComplete='off' value={userRegistration.zipcode} onChange={handlechange} name="zipcode" id="zipcode" placeholder="Zipcode" />
                          </div>
                          <div className="footer">
                            <button type="submit" className="btn">Register</button>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>     
    )       
}
export default RegInstitute;
