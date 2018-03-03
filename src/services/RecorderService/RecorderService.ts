import Recorder from '../../modules/Recorder/Recorder';

class RecordService {
    private context: any;
    private audioRecorder: Recorder = new Recorder();
    private hasMedia: boolean;

    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();

        this.hasMedia = false;

        this.initAudio();
    }

    start() {
        if (!this.audioRecorder) {
            return;
        }
        this.audioRecorder.clear();
        this.audioRecorder.record();
    }

    stop(reverse: boolean) {
        this.audioRecorder.stop();

        this.audioRecorder.exportWAV(Recorder.setupDownload, reverse);
    }

    gotStream(stream: any) {
        const inputPoint = this.context.createGain();
        const audioInput = this.context.createMediaStreamSource(stream);
        audioInput.connect(inputPoint);

        this.audioRecorder.init(audioInput);
    }

    initAudio() {
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
        }

        if (!navigator.getUserMedia) {
            return;
        }

        //constraints: MediaStreamConstraints =
        // {
        //     'audio': {
        //     'mandatory': {
        //         'googEchoCancellation': 'false',
        //             'googAutoGainControl': 'false',
        //             'googNoiseSuppression': 'false',
        //             'googHighpassFilter': 'false'
        //     },
        //     'optional': []
        // }

        navigator.getUserMedia({
            audio: true
            }
        , this.gotStream.bind(this), (e: any) => {
            console.log(e);
        });

        this.hasMedia = true;
    }

    getMusicURL(): string {
        return this.audioRecorder.getMusicURL();
    }

    getMusicBlob(): Blob {
        return this.audioRecorder.getMusicBlob();
    }
}

const recordService = new RecordService();
export default recordService;
