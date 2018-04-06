import * as React from 'react';

import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameInput from '../../GameInput/GameInput';
import Button from '../../../Button/Button';

import {LISTENING_TEXT1, LISTENING_TEXT2, TITLE_INPUT, SEND_BUTTON} from '../../../../constants/Stages';

import './Listening.scss';

const textData = {
    fields: [TITLE_INPUT]
};

export default class Listening extends React.Component<any,any> {
    private _components: React.Component[];
    private gameInput: HTMLElement;
    private submitButton: HTMLElement;

    render() {
        return (
            <div className='listening-stage'>
                <GameText text={LISTENING_TEXT1} />
                <AudioPlayer {...this.props} />
                <GameText text={LISTENING_TEXT2} />
                <GameInput {...textData} ref={(gameInput: any) => this.gameInput = gameInput}/>
                <Button {...SEND_BUTTON} ref={(submitButton:any) => this.submitButton = submitButton} />
            </div>
        )
    }

    componentDidMount() {
        this.gameInput.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.submitButton.click();
            }
        });
    }

    // getUserInput() {
    //     return this.gameInput.querySelector('.game-input__form_song-input').value;
    // }
    //
    // getSubmitButton() {
    //     return this.submitButton;
    // }
    //
    // stopPlayer() {
    //     this._components[1].remove();
    // }
}