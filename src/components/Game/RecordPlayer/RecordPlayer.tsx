import * as React from 'react';
import RecordService from '../../../services/RecorderService/RecorderService';

import './RecordPlayer.scss';

function pad0(value: any, count: number) {
    let result = value.toString();
    for (; result.length < count; --count) {
        result = `0${result}`;
    }
    return result;
}

function format(times: number[]) {
    return `\
            ${pad0(times[0], 2)}:\
            ${pad0(Math.floor(times[1]), 2)}`;
}

export default class RecordPlayer extends React.Component<any, any> {
    private autoreverse: boolean;
    private haveRecord: boolean;
    private button: HTMLElement;
    private time: number;
    private times: number[];
    private startButton: HTMLElement;
    private stopButton: HTMLElement;
    private timeElement: HTMLElement;
    private isRecording: boolean;
    private running: boolean;

    private player: HTMLElement;

    constructor(props:any) {
        super(props);
        this.autoreverse = props.autoreverse || false;
        this.haveRecord = false;

        this.state = {
            startButtonStyle: {},
            stopButtonStyle: {},
            timeStyle: {},
            time: format([0, 0])
        };
    }

    render() {
        return (
            <div className='record-player' ref={(player: any) => this.player = player}>
                <div className="record-player__button">
                    <div className="record-player__button_start" style={this.state.startButtonStyle}>
                        <i className="fa fa-circle"/>
                    </div>
                    <div className="record-player__button_stop" style={this.state.stopButtonStyle}>
                        <i className="fa fa-stop"/>
                    </div>
                </div>
                <div className="record-player__time-box">
                    <div className="record-player__time" style={this.state.timeStyle}>{this.state.time}</div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._init();
    }

    getMusicURL() {
        return RecordService.getMusicURL();
    }

    getMusicBlob() {
        return RecordService.getMusicBlob();
    }

    getButton() {
        return this.button;
    }

    resetTimer() {
        this.times = [0, 0];
    }

    startTimer() {
        if (!this.time) {
            this.time = performance.now();
        }
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        }

        this.isRecording = false;

        this.setState({
            stopButtonStyle: {display: 'none'},
            startButtonStyle: {display: 'block'}
        });

        this.stopTimer();
        RecordService.stop(this.autoreverse);
    }

    start() {
        this.isRecording = true;
        this.haveRecord = true;

        this.setState({
            stopButtonStyle: {display: 'block'},
            startButtonStyle: {display: 'none'},
            timeStyle: {opacity: '1'}
        });

        if (this.time === null) {
            this.resetTimer();
        }

        this.startTimer();
        RecordService.start();
    }

    stopTimer() {
        this.running = false;
        this.time = null;
    }

    step(timestamp: number) {
        if (!this.running) {
            return;
        }
        this.calculate(timestamp);
        this.time = timestamp;
        this.printTimer();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp: number) {
        const diff = timestamp - this.time;
        // Hundreds of a second
        this.times[1] += diff / 10;
        // Seconds
        if (this.times[1] >= 100) {
            this.times[0] += 1;
            this.times[1] -= 100;
        }
    }

    printTimer() {
        this.setState({
            time: format(this.times)
        });
    }

    private _init() {
        this.button = this.player.querySelector('.record-player__button');
        this.startButton = this.player.querySelector('.record-player__button_start');
        this.stopButton = this.player.querySelector('.record-player__button_stop');
        this.timeElement = this.player.querySelector('.record-player__time');

        this.isRecording = false;
        this.running = false;

        this.resetTimer();
        this.printTimer();

        this.button.addMultiEvents('click touchend', () => {
            if (this.isRecording) {
                this.stop();
                return;
            }

            this.start();
        });
    }
}
