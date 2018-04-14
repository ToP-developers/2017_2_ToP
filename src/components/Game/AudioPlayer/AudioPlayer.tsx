import * as React from 'react';
import {b64toBlob} from '../../../modules/Base64Converter/Base64Converter';

import './AudioPlayer.scss';

export default class AudioPlayer extends React.Component<any, any> {
    private audio: HTMLAudioElement;
    private audioContext: AudioContext;
    private button: HTMLElement;
    private pauseButton: HTMLElement;
    private playButton: HTMLElement;
    private canvas: HTMLCanvasElement;
    private canvasContext: any;
    private src: any;
    private animation: any;

    private player: HTMLElement;

    constructor(props: any) {
        super(props);

        this.state = {
            musicSource: props.musicSource,
            isPlaying: false,
            playButtonStyle: {},
            pauseButtonStyle: {}
        };
    }

    render() {
        return (
            <div className='audio-player' ref={(player: any) => this.player = player}>
                <div className='audio-player__button'>
                    <div className='audio-player__button_play' style={this.state.playButtonStyle}>
                        <i className='fa fa-play'/>
                    </div>
                    <div className='audio-player__button_pause' style={this.state.pauseButtonStyle}>
                        <i className='fa fa-pause'/>
                    </div>
                </div>
                <canvas className='audio-player__visualizer'/>
            </div>
        )
    }

    componentDidMount() {
        this._init();
    }

    getButton() {
        return this.button;
    }

    setSource(src: string) {
        this.audio.src = src;
    }

    release() {
        this.audioContext.close();
    }

    stop() {
        if (!this.state.isPlaying) {
            return;
        }

        this.audio.pause();

        this.setState({
            isPlaying: false,
            pauseButtonStyle: {display: 'none'},
            playButtonStyle: {display: 'block'}
        });
    }

    remove() {
        this.stop();
        this.audioContext.close();
    }

    start() {
        this.setState({
            isPlaying: true,
            pauseButtonStyle: {display: 'block'},
            playButtonStyle: {display: 'none'}
        });

        this.audio.play();
    }

    _initAudio() {
        this.audio.addEventListener('ended', () => {
            this.setState({
                isPlaying: false,
                pauseButtonStyle: {display: 'none'},
                playButtonStyle: {display: 'block'}
            });
        });
    }

    _init() {
        this.button = this.player.querySelector('.audio-player__button');
        this.canvas = this.player.querySelector('.audio-player__visualizer');
        this.playButton = this.player.querySelector('.audio-player__button_play');
        this.pauseButton = this.player.querySelector('.audio-player__button_pause');
        this.canvasContext = this.canvas.getContext('2d');
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.src = undefined;

        this.audio = new Audio();

        if (!this.state.musicSource) {
            const blob = b64toBlob(this.props.musicBase64, 'audio/wav');
            this.setState({musicSource: (window.URL || window.webkitURL).createObjectURL(blob)});
        }

        this.audio.src = this.state.musicSource;

        this._initAudio();

        this.button.addMultiEvents('click touchend', () => {
            const analyser = this.audioContext.createAnalyser();

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const width = this.canvas.width;
            const height = this.canvas.height;

            let barWidth = (width / bufferLength) * 20;
            let barHeight;

            const renderFrame = () => {
                this.canvasContext.clearRect(0, 0, width, height);
                this.animation = requestAnimationFrame(renderFrame);

                let x = 0;

                analyser.getByteFrequencyData(dataArray);

                this.canvasContext.fillStyle = 'rgba(200, 200, 200, 0)';
                this.canvasContext.fillRect(0, 0, width, height);

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
                    this.canvasContext.fillRect(
                        x,
                        height - (barHeight / 2),
                        barWidth, barHeight / 2
                    );

                    x += barWidth + 1;
                }
            };

            if (this.state.isPlaying) {
                this.stop();

                cancelAnimationFrame(this.animation);
                return;
            }

            if (this.src === undefined) {
                this.src = this.audioContext.createMediaElementSource(this.audio);
            }

            this.src.connect(analyser);
            analyser.connect(this.audioContext.destination);

            analyser.fftSize = 256;

            this.start();
            renderFrame();
        });
    }
}
