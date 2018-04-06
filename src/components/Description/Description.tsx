const description = require('./Description.xml');
import * as React from 'react';

import './Description.scss';

interface Props {
    login?: string;
}

export default class Description extends React.Component<Props, any> {
    render() {
        return (
            <div className='description'>
                <div className='description__text'>
                    <p>Описание нашей <strong>захватывающей</strong> игры</p>
                    {this.props.login ? <p>Привет {this.props.login}!</p> : ''}
                </div>
            </div>
        )
    }
}
