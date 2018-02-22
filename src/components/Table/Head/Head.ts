const head = require('./Head.xml');
import TopComponent from '../../TopComponent/TopComponent';

export default class THead extends TopComponent {
    constructor(data: any, className: string = '') {
        super('thead', className ? {class: className} : {}, data);
        this._build();
    }

    private _build() {
        this._innerHTML(head(this.getData()));
    }
}
