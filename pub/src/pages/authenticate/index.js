import SignIn from "components/sign-in";
import SignUp from "components/sign-up";
import {useState} from "react";
import {STEP_SIGN_IN, STEP_SIGN_UP} from "pages/authenticate/config";

const renderComponent = (currentStep, setCurrentStep) => {
    if (currentStep === STEP_SIGN_UP) {
        return <SignUp setCurrentStep={setCurrentStep} />
    } else {
        return <SignIn setCurrentStep={setCurrentStep} />
    }
}

const Authenticate = () => {
    const [currentStep, setCurrentStep] = useState(STEP_SIGN_IN);
    return (
        <div className={'Authenticate'}>
            { renderComponent(currentStep, setCurrentStep) }
        </div>
    )
}

export default Authenticate;