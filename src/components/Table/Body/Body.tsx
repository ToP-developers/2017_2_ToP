import * as React from 'react';
import Row from './Row/Row';

export default class TBody extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {rows: []};

        this._build();
    }

    addRow(rowData: any) {
        const row = <Row cells={[this.state.rows.length + 1, ...rowData]}/>;
        this.setState({
            rows: this.state.rows.concat(row)
        });
    }

    render() {
        return (
            <tbody>
            {this.state.rows}
            </tbody>
        )
    }

    private _build() {
        this.props.rows.forEach((rowData: any) => {
            this.addRow(rowData);
        });
    }
}
