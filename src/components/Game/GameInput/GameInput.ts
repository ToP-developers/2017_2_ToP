const gameInput = require('./GameInput.xml');
import TopComponent from '../../TopComponent/TopComponent';

import './GameInput.scss';

export default class GameInput extends TopComponent {
    constructor(data: any) {
        super('div', {class: 'game-input'}, data);

        this.getElement().innerHTML = gameInput(this.getData());
    }
}