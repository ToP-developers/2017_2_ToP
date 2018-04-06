import * as React from 'react';

import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameText from '../../GameText/GameText';
import Button from '../../../Button/Button';

import {READY_BUTTON} from '../../../../constants/Stages';

import './Waiting.scss';

//TODO: поменять всё нахрен
export default class Waiting extends React.Component<any,any> {
    private status: GameText;
    private _components: React.Component[];
    private resultButton: Button;


    constructor(props: any) {
        super(props);

        this.status = null;
        this.state = {
            text: props,
            components: []
        }
    }

    render() {
        return (
            <div className='waiting-stage'>
                <GameText text={this.state} />
                {
                    this.state.components
                }
            </div>
        )
    }

    //TODO: setState?
    addAudio(data: any, text: string) {
        this.state.components.push(
            <GameText text={text} />,
            <AudioPlayer musicBase64={data} />
        );
    }

    setStatus(text: string) {
        this.setState({text})
    }

    ready() {
        // this.resultButton = <Button {...READY_BUTTON} />;
        this.state.push(<Button {...READY_BUTTON} />);
    }

    getResultButton() {
        // return this.resultButton.getElement();
    }
}
