import Form from "./StudentComponent/Form"
import { FormProvider } from './context/FormContext'

function StudentApp() {

  return (
    <FormProvider>
      <Form />
    </FormProvider>
  )

}

export default StudentApp;
