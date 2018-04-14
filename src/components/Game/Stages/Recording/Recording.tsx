import * as React from 'react';
import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import RecordPlayer from '../../RecordPlayer/RecordPlayer';
import Button from '../../../Button/Button';

import {RECORDING_TEXT1, RECORDING_TEXT2, SEND_BUTTON} from '../../../../constants/Stages';

import './Recording.scss';

//TODO: нормально переделать

export default class Recording extends React.Component<any, any> {
    private _components: any[];
    private autoreverse: boolean;

    constructor(props: any) {
        super(props);
        this.autoreverse = props.autoreverse || false;
    }

    getMusicURL() {
        return this._components[3].getMusicURL();
    }

    getMusicBlob() {
        return this._components[3].getMusicBlob();
    }

    getSubmitButton() {
        return this._components[4].getElement();
    }

    stopPlayer() {
        this._components[1].remove();
        this._components[3].stop();
    }

    haveRecord() {
        return this._components[3].haveRecord;
    }

    getMusic() {
        this._components[1].setSource(this.props.musicSource);
    }

    getButton() {

    }

    render() {
        this._components = [
            new GameText({text: RECORDING_TEXT1}),
            new AudioPlayer(this.props),
            new GameText({text: RECORDING_TEXT2}),
            new RecordPlayer({autorevere: this.autoreverse}),
            new Button(SEND_BUTTON)
        ];

        return (
            <div className='recording-stage'>
                <GameText />
                {this._components.map(component => component.render())}
            </div>
        )
    }

    componentDidMount() {
        this.getMusic();
        this._initPlayers();
        this._initButton();
    }

    _initPlayers() {
        const audioButton = this._components[1].getButton();
        const recordButton = this._components[3].getButton();

        audioButton.addMultiEvents('click touchend', () => {
            this._components[3].stop();
        });

        recordButton.addMultiEvents('click touchend', () => {
            this._components[1].stop();
        });
    }

    _initButton() {
        const submitButton = this.getSubmitButton();
        submitButton.addMultiEvents('click touchend', (event: Event) => {
            if (!this.haveRecord()) {
                submitButton.classList.remove('button-error');
                setTimeout(() => {
                    submitButton.classList.add('button-error');
                }, 10);

                event.stopImmediatePropagation();
            }
        }, true);
    }
}
