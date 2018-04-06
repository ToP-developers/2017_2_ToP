import * as React from 'react';

import GameText from '../../GameText/GameText';
import TopImage from '../../../TopImage/TopImage';
import BackButton from '../../../BackButton/BackButton';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';

import {LOSE, NEW_SCORE, WIN, WIN_OFFLINE, WIN_VIDEO} from '../../../../constants/Stages';

import './Ending.scss';

export default class Ending extends React.Component<any, any> {
    render() {
        return (
            <div className='ending-stage'>
                <div className='ending-stage__content'>
                    {
                        this.props.isWin ? [
                            <GameText text={WIN} title={true}/>,
                            <VideoPlayer {...WIN_VIDEO} />,
                            <GameText text={this.props.isOffline ? WIN_OFFLINE : NEW_SCORE + this.props.score}/>
                        ] : [
                            <GameText text={LOSE} title={true}/>,
                            <TopImage src={`../static/img/results/${Math.floor((Math.random() * 5) + 1)}.png`}/>
                        ]
                    }
                </div>
                <BackButton />
            </div>
        )
    }

    // TODO:
    // getBackButton() {
    //     return this.getElement().querySelector('.back-button');
    // }
}
