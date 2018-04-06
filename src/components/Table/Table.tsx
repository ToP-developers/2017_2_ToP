import * as React from 'react';

import THead from './Head/Head';
import TBody from './Body/Body';

export default class Table extends React.Component<any, any> {
    public body: TBody;

    addRow(rows: any[]) {
        rows.forEach(rowData => {
            this.body.addRow(rowData);
        });
    }

    render() {
        return (
            <table className={this.props.className ? this.props.className : ''}>
                <THead columns={this.props.head}/>
                <TBody rows={this.props.body}/>
            </table>
        )
    }
}
