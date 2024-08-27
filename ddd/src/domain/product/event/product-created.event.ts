import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurred: string;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date().toISOString();
        this.eventData = eventData;
    }


}