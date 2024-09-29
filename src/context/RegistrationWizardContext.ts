import {createContext} from "react";

interface IRegistrationSharedData {
    emailCheckedAction: any | null;
}

const RegistrationWizardContext = createContext({
    registrationData: null as IRegistrationSharedData | null,
    setRegistrationData: null as any,
});

export default RegistrationWizardContext;
