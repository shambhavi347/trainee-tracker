import useFormContext from "../hooks/useFormContext"
import '../index.css'

const PersonalInfo = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <>
            <div className="divUpper">
                <div className="main">
                {/* <h1 className="regHead">Register Yourself</h1> */}
                    <div className="regBox">
                        <form>
                            <input
                                className="form-element"
                                type="text"
                                id="perFirstName"
                                name="perFirstName"
                                placeholder="First Name"
                                pattern="([A-Z])[\w+.]{1,}"
                                value={data.perFirstName}
                                onChange={handleChange}
                            />
                                
                            <input
                                className="form-element"
                                type="text"
                                id="perLastName"
                                name="perLastName"
                                placeholder="Last Name"
                                pattern="([A-Z])[\w+.]{1,}"
                                value={data.perLastName}
                                onChange={handleChange}
                            />

                            {/* <label htmlFor="perFatherName">Last Name</label> */}
                            <input
                                className="form-element"
                                type="text"
                                id="perFatherName"
                                name="perFatherName"
                                placeholder="Father's Name"
                                pattern="([A-Z])[\w+.]{1,}"
                                value={data.perFatherName}
                                onChange={handleChange}
                            />

                            {/* <label htmlFor="perPhoneNo">Last Name</label> */}
                            <input
                                className="form-element"
                                type="text"
                                id="perPhoneNo"
                                name="perPhoneNo"
                                placeholder="Contact Number"
                                pattern="([A-Z])[\w+.]{1,}"
                                value={data.perPhoneNo}
                                onChange={handleChange}
                            />

                            {/* <label htmlFor="perDOB">Last Name</label> */}
                            <input
                                className="form-element"
                                type="date"
                                id="perDOB"
                                name="perDOB"
                                placeholder="DOB (dd/mm/yyyy)"
                                pattern="([A-Z])[\w+.]{1,}"
                                value={data.perDOB}
                                onChange={handleChange}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

    return content
}
export default PersonalInfo