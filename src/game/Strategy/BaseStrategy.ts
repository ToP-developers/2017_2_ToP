import GameScene from '../GameScene/GameScene';
import TopComponent from "../../components/TopComponent/TopComponent";

const PATH = 'apoj.herokuapp.com/mechanic';

export default class BaseStrategy {
    protected socket: WebSocket;
    protected stage: any;
    protected stages: any;
    private _scene: GameScene;

    constructor(mode?: string) {
        const protocol = 'wss:';
        this.socket = new WebSocket(`${protocol}//${PATH}`);

        this.socket.onopen = () => {
            console.log('opened');
            this.send({
                mode
            });
        };

        this.stage = null;
        this.stages = [];
        this._scene = new GameScene();
        this._scene.setStage(null);
    }

    pause() {
        if (!this.isFinished()) {
            this._scene.pause();
        }
    }

    resume() {
        this._scene.resume();
    }

    isFinished() {
        return !this._scene;
    }

    protected send(data: object) {
        this.socket.send(JSON.stringify(data));
    }

    protected next() {
        this.stage = this.stages.shift();
        this._scene.setStage(this.stage);
    }

    protected finish() {
        this._scene.destroy();
        delete this._scene;
        if (this.socket) {
            this.socket.close();
        }
    }

    protected init() {

    }
}
