import FormInputs from './FormInputs'
import useFormContext from "../hooks/useFormContext"
import NavBar2 from '../components/NavBar2'
import "../CSS/Trainee/RegStudent.css";

const Form = () => {

    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data))
    }


    const content = (
        <div className="divUpper">
            <NavBar2 />
            <div className="main">
                <h1 className="regHead">{title[page]}</h1>
                    <div className="regBox">
                        <form onSubmit={handleSubmit}>
                        <FormInputs />
                        <button type="button" className={`btn ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>
                        <button type="button" className={`btn ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>
                        <button type="submit" className={`btn ${submitHide}`} disabled={!canSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
    return content
}
export default Form