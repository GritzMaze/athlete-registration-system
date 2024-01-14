import { Registration } from '../models/registration';

class RegistrationContextService {
    private _registrationContext: Registration;

    public get registrationContext(): Registration {
        return this._registrationContext;
    }

    public set registrationContext(registration: Registration) {
        this._registrationContext = registration;
    }
}

export const registrationContextService = new RegistrationContextService();