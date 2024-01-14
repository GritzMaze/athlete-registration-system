import { BaseApiService } from './base-api.service';

class EventsService extends BaseApiService {
    constructor() {
        super('/events');
    }
}

export const eventsService = new EventsService();