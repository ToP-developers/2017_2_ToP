import * as React from 'react';

import './VideoPlayer.scss';

export default class VideoPlayer extends React.Component<any, any> {
    private video: HTMLVideoElement;

    constructor(props: any) {
        super(props);

        this.state = {};
        this._hide = this._hide.bind(this);
        this._show = this._show.bind(this);
    }

    render() {
        return (
            <div className='video-player' style={this.state}>
                <video autoPlay className='video' ref={(video: any) => this.video = video}>
                    <source src={this.props.src} type={this.props.type} onEnded={this._hide} onCanPlay={this._show}/>
                </video>
            </div>
        )
    }

    private _show() {
        setTimeout(() => {
            this.video.pause();
            this.setState({
                opacity: '1',
                maxHeight: '1000px'
            });

            setTimeout(() => {
                this.video.play();
            }, 700);
        }, 500);
    }

    private _hide() {
        this.setState({
            opacity: '0',
            maxHeight: '0px'
        });

        setTimeout(() => {
            this.setState({display: 'none'})
        }, 700);
    }
}
