import { createContext, useState, useEffect } from "react"

const FormContext = createContext({})

export const FormProvider = ({ children }) => {

    const title = {
        0: 'Personal Info',
        1: 'Academic Info',
        2: 'Technology Info'
    }

    const [page, setPage] = useState(0)

    const [data, setData] = useState({
        perFirstName: "",
        perLastName: "",
        perFatherName: "",
        perPhoneNo: "",
        perDOB: "",

        acadCourse: "",
        acadStream: "",
        acadSemester: "",
        acadCGPA: "",
        acadPassoutYear: "",

        techFamiliar: "",
        // techIntrested: ""
    })


    const handleChange = e => {

        const name = e.target.name
        const value = e.target.value
        console.log(name);
        console.log(value);
        setData({ ...data, [name]:value});
    }

    const {
        optInNews,
        ...requiredInputs } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('per'))
        .map(key => data[key])
        .every(Boolean)

    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('acad'))
        .map(key => data[key])
        .every(Boolean)

    const canNextPage3 = Object.keys(data)
    .filter(key => key.startsWith('tech'))
    .map(key => data[key])
    .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext 