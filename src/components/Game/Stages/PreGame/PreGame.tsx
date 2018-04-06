import * as React from 'react';
import Menu from '../../../Menu/Menu';

import {CONTINUE_BUTTON, NEWGAME_BUTTON} from '../../../../constants/Stages';

const preGameData = {
    buttons: [
        CONTINUE_BUTTON,
        NEWGAME_BUTTON
    ]
};

export default class PreGame extends React.Component<any, any> {
    render() {
        return (
            <div className='preGame-stage'>
                <Menu {...preGameData} />
            </div>
        )
    }

    // getNewGameButton() {
    //     const buttons = this.menu.getElement().getElementsByClassName('button');
    //     return buttons[0];
    // }
    //
    // getContinueButton() {
    //     const buttons = this.menu.getElement().getElementsByClassName('button');
    //     return buttons[1];
    // }
}
