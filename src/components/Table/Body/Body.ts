import TopComponent from '../../TopComponent/TopComponent';
import Row from './Row/Row';

export default class TBody extends TopComponent {
    private rows: any[];

    constructor(data: any, className = '') {
        super('tbody', className ? {class: className} : {}, data);
        this.rows = [];
        this._build();
    }

    addRow(rowData: any) {
        const row = new Row([this.rows.length + 1, ...rowData]);
        this.rows.push(row);
        this.append(row.render());
    }

    private _build() {
        this.getData().forEach((rowData: any) => {
            this.addRow(rowData);
        });
    }
}
