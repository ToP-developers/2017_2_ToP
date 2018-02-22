const cells = require('./Row.xml');
import TopComponent from '../../../TopComponent/TopComponent';

export default class TRow extends TopComponent {
    constructor(data: any, className = '') {
        super('tr', className ? {class: className} : {}, data);
        this._build();
    }

    private _build() {
        this._innerHTML(cells(this.getData()));
    }
}
