import * as React from 'react';

import './Header.scss';

export default class Header extends React.Component<any, any> {
    render() {
        return (
            <div className='header'>
                <div className='header__logo' data-url='/'/>
            </div>
        )
    }
}
