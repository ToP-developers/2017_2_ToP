export default function multiEventsRegister() {
    EventTarget.prototype.addMultiEvents = function addMultiEvents(events: string, handler: any, phase = false): void {
        events.split(' ').forEach(event => {
            this.addEventListener(event, handler, phase);
        });
    };
}
