import * as React from 'react';

import './BackButton.scss';

interface Props {
    url?: string;
    text?: string;
}

export default class BackButton extends React.Component<Props,any> {
    render() {
        return (
            <div className="back-button">
                <div className="back-button__url" data-url={this.props.url || '/'}>
                    {this.props.text || 'На главную'}
                </div>
            </div>
        )
    }
}
