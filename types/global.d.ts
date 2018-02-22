interface EventTarget {
    addMultiEvents(events: string, handler: any, phase?: boolean): void;
}

interface Window {
    AudioContext: any;
    webkitAudioContext: any;
    webkitURL: any;
}

interface Element {
    name: string;
    value: any;
}

declare var require: any;
