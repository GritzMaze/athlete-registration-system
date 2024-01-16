import { BaseApiService } from './base-api.service';
import { httpService } from './http.service';

class RegistrationService extends BaseApiService {
    constructor() {
        super('/registrations');
    }

    async confirm(id: number) {
        return await httpService.post(`${this.endpoint}/${id}/confirm`);
    }
}

export const registrationService = new RegistrationService();