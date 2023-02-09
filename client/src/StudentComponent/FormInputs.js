import PersonaInfo from "./PersonaInfo"
import TechInfo from "./TechInfo"
import AcademicInfo from "./AcademicInfo"
import useFormContext from "../hooks/useFormContext"

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <PersonaInfo />,
        1: <AcademicInfo />,
        2: <TechInfo />
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs