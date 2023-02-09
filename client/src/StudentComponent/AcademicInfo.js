import useFormContext from "../hooks/useFormContext"
import "../CSS/Trainee/RegStudent.css";

const AcademicInfo = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <>
            <div className="divUpper">
                <div className="main">
                {/* <h1 className="regHead">Register Yourself</h1> */}
                    <div className="regBox">
                        <form>
                            
                            {/* <label htmlFor="acadCourse">Course</label> */}
                            <select
                                className="drop-down"
                                id="acadCourse"
                                name="acadCourse"
                                value={data.acadCourse}
                                onChange={handleChange}
                            >
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                                <option value="BTech">BTech</option>
                                <option value="MTech">MTech</option>
                            </select>
                            <br />
                            {/* <label htmlFor="acadStream">Stream</label> */}
                            <select
                                className="drop-down1"
                                id="acadStream"
                                name="acadStream"
                                value={data.acadStream}
                                onChange={handleChange}
                            >
                                <option value="AE">Aeronautical Engineering</option>
                                <option value="AE">Automobile Engineering</option>
                                <option value="BIO">Biotechnology</option>
                                <option value="CE">Civil Engineering</option>
                                <option value="CA">Computer Application</option>
                                <option value="E&C">Electronics & Communication</option>
                                <option value="ME">Mechanical Engineering</option>
                                <option value="E&E">Electrical and Electronics Engineering</option>
                                <option value="CSE">Computer Science and Engineering</option>
                            </select>
                            <br />
                                {/* <label htmlFor="acadCGPA">CGPA</label> */}
                                <input
                                    className="drop-down1"
                                    type="number"
                                    id="acadCGPA"
                                    name="acadCGPA"
                                    placeholder="CGPA"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    autoComplete="off"
                                    value={data.acadCGPA}
                                    onChange={handleChange}
                                />
                                <br />
                                {/* <label htmlFor="acadSemester">Semester</label> */}
                                <input
                                    className="drop-down1"
                                    type="number"
                                    id="acadSemester"
                                    name="acadSemester"
                                    placeholder="Semester"
                                    step="1"
                                    min="0"
                                    max="8"
                                    autoComplete="off"
                                    value={data.acadSemester}
                                    onChange={handleChange}
                                />
                                <br />
                                {/* <label htmlFor="acadPassoutYear">Passout Year</label> */}
                                <input
                                    className="drop-down1"
                                    type="number"
                                    id="acadPassoutYear"
                                    name="acadPassoutYear"
                                    placeholder="Passout Year"
                                    step="1"
                                    min="1990"
                                    max="4000"
                                    autoComplete="off"
                                    value={data.acadPassoutYear}
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
export default AcademicInfo