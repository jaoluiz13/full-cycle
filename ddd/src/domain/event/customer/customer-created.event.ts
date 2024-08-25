import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurred: string;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date().toISOString();
        this.eventData = eventData;
    }


}