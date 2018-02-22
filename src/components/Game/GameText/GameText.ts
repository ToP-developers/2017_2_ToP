const gameText = require('./GameText.xml');
import TopComponent from '../../TopComponent/TopComponent';

import './GameText.scss';

export default class GameText extends TopComponent {
    constructor(data: any) {
        super('div', {class: 'game-text'}, data);

        this.setText(this.getData());
    }

    setText(text: any) {
        this.getElement().innerHTML = gameText(text);
    }
}
