import TopComponent from '../TopComponent/TopComponent';

import THead from './Head/Head';
import TBody from './Body/Body';

export default class Table extends TopComponent {
    public head: THead;
    public body: TBody;

    constructor(data: any, className: string = '') {
        super('table', className ? {class: className} : {}, data);
        this._build();
    }

    addRow(rows: any[]) {
        rows.forEach(rowData => {
            this.body.addRow(rowData);
        });
    }

    _build() {
        this.head = new THead(this.getData().head);
        this.body = new TBody(this.getData().body);
        this.append(this.head.render());
        this.append(this.body.render());
    }
}
