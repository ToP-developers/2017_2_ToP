import TopComponent from '../../../TopComponent/TopComponent';
import cells from './Row.xml';

export default class TRow extends TopComponent {
    constructor(data: any, className = '') {
        super('tr', className ? {class: className} : {}, data);
        this._build();
    }

    private _build() {
        this._innerHTML(cells(this.getData()));
    }
}
