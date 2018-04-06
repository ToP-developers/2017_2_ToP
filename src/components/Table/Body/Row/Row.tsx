import * as React from 'react';

export default class TRow extends React.Component<any, any> {
    render() {
        return (
            <tr>
                {this.props.cells.map((cell: any) => <td>{cell}</td>)}
            </tr>
        )
    }
}
