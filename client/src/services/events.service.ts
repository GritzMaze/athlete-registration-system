import { BaseApiService } from './base-api.service';
import { httpService } from './http.service';
import { Event } from '../models/events';

class EventsService extends BaseApiService {
    constructor() {
        super('/events');
    }

    async getRegistrations(id: number) {
        const event = await httpService.get<Event>(`${this.endpoint}/${id}/registrations`);
        return event.Registrations;
    }
}

export const eventsService = new EventsService();