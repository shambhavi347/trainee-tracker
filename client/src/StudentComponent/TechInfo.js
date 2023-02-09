import useFormContext from "../hooks/useFormContext"
import Select from 'react-select';
// import Multiselect from "multiselect-react-dropdown";
// import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import "../CSS/Trainee/RegStudent.css";

const TechInfo = () => {
    const { data, handleChange } = useFormContext()

    const tech = [
        {value: 1, label: 'HTML'},{value: 2, label: 'CSS'},
        {value: 3, label: 'JavaScript'},{value: 4, label: 'ES6'},
        {value: 5, label: 'Typescript'},{value: 6, label: 'Angular JS'},
        {value: 7, label: 'Vue JS'},{value: 8, label: 'Jquery'},
        {value: 9, label: 'React JS'},{value: 10, label: 'P5 js'},
        {value: 11, label: 'PHP'},{value: 12, label: 'Node.js'},
        {value: 13, label: 'Python'},{value: 14, label: 'Ruby'},
        {value: 15, label: 'Java'},{value: 16, label: 'Golag'},
        {value: 17, label: 'Django'},{value: 18, label: 'Flask'},
        {value: 19, label: 'Django'},{value: 20, label: 'Flask'},
    ];

// c#
// MySQL
// MongoDB
// PostgreSQL
// MariaDB
// C++
// C
// Machine Learning
// Deep Learning
// NLP
// Artificial Intelligence
// Data Science
// Cloud Computing
// DevOps
// UI/UX
// CyberSecurity
// Full Stack Web Development
// Salesforce
// Product Management
// Business Analytics

    const content = (
        <>
            <div className="divUpper">
                <div className="main">
                    <div className="regBox">
                        <form>
                            <label htmlFor="techFamiliar">Familiar Technology</label>
                            <Select
                                type="text"
                                id="techFamiliar"
                                name="techFamiliar"
                                options={tech}
                                placeholder="Select options"
                                value={data.techFamiliar}
                                onChange={handleChange}
                                isSearchable={true}
                                isMulti={true}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

    return content
}
export default TechInfo
