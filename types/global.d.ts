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

declare module '*.xml' {
    export default function(params?:object): string;
}
