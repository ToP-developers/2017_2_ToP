import * as React from 'react';

interface Props {
    columns: any;
}

export default class THead extends React.Component<Props, any> {
    render() {
        return (
            <thead>
            <tr>
                <th>#</th>
                {
                    this.props.columns.map((column: any) => <th>{column}</th>)
                }
            </tr>
            </thead>
        )
    }

}
