interface EventTarget {
    addMultiEvents(events: string, handler: any, phase = false): void;
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

interface Navigator {
    webkitGetUserMedia: any;
    mozGetUserMedia: any;
    msGetUserMedia: any;
}

declare var require: any;
