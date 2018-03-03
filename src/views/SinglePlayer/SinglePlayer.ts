import TopView from '../../components/TopView/TopView';

import GameManager from '../../game/GameManager/GameManager';
import loading from '../../components/Loading/Loading';

import {SINGLEPLAYER} from '../../constants/Game';

export default class SinglePlayer extends TopView {
    private _gameManager: GameManager;

    constructor() {
        super({class: 'content__game'});
    }

    show() {
        if (this._gameManager) {
            this._gameManager.show();
        } else {
            this.build();
        }
    }

    hide() {
        loading.hide();
        if (this._gameManager) {
            this._gameManager.hide();
        }
    }

    build() {
        this.renderTo('content');
        this._gameManager = new GameManager(SINGLEPLAYER);
    }
}
