import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "../../CSS/Trainee/RegStudent.css";
import { validEmail, validPassword} from "../../components/Regex";

const TraineeReg = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        const {
          email,
          password,
        } = user;
    
        const res = await fetch("/trainee-reg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
    
        const data = await res.json();
        console.log(data);
    
        if (!validEmail.test(email)) {
          window.alert("Fill the correct Email ID !!");
          console.log("Invalid Email ID !!");
        }
        else if (!validPassword.test(password)) {
            window.alert("Min 8 letter password, with at least a symbol, upper and lower case letters and a number !!");
            console.log("Make the Password Strong !!");
        }
        else if (data.error) {
          window.alert("Invalid Registration, " + data.error);
          console.log("Invalid Regestration");
        } 
        else {
          window.alert("Registration Successfully");
          console.log("Successfull Regestration");
        }
    };
    

  return (
    <>
        <NavBar2 />
        <div className="DivUpper">
            <div className="main">
                <br />
                <br />
                <h1 className="regHead">Register Yourself</h1>
                <br />
                <div className="regBox">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                        className="form-element form-email"
                        type="email"
                        name="email"
                        placeholder="Registered Email"
                        value={user.email}
                        autoComplete="off"
                        onChange={handleChange}
                        />
                        <input
                            className="form-element form-password"
                            type="password"
                            name="password"
                            value={user.password}
                            placeholder="Set Password"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <br/>
                        <button className="btn-form" onClick={postData}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default TraineeReg
