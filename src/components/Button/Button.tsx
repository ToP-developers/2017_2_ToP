import * as React from 'react';

interface Props {
    text: string,
    url?: string,
    class?: string
}

export default class Button extends React.Component<Props, any> {
    render() {
        return (
            <div className={this.props.class} data-url={this.props.url || ''}>
                {this.props.text}
            </div>
        )
    }
}
