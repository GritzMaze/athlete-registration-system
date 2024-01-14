import { BaseApiService } from './base-api.service';

class RegistrationService extends BaseApiService {
    constructor() {
        super('/registrations');
    }
}

export const registrationService = new RegistrationService();