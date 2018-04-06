import * as React from 'react';

import MyButton from '../Button/Button';
import UserService from '../../services/UserService/UserService';
// import router from '../../modules/Router/Router';

import './Menu.scss';

interface MenuButton {
    text: string,
    class: string,
    url: string,
    name?: string
}

interface Props {
    buttons: MenuButton[],
    login?: string
}

export default class Menu extends React.Component<any, any> {
    private menu: any;

    render() {
        return (
            <div className='menu' ref={(menu: any) => {this.menu = menu}}>
                <div className='menu__buttons'>
                    {this.props.buttons.map((button: any) => {
                        const {text, class:className, url}:any = button;
                        return <MyButton text={text} class={className} url={url}/>
                    })}
                </div>
                <div className='menu__circle'/>
                <div className='menu__rotate'>
                    <div className='menu__rotate_image'/>
                </div>
            </div>
        );
        }

    componentDidMount() {
        this._logout();
    }

    private _logout() {
        const logoutButton = this.menu.querySelector('[data-url="/"]');
        if (logoutButton) {
            logoutButton.addMultiEvents('click touchend', () => {
                UserService.logout()
                    .then(() => {
                        ///router.getRoute('').view.rerender();
                        //router.go('/');
                    })
                    .catch((response: any) => {
                        response.json().then((json: any) => {
                            console.log(`${response.status}: ${response.statusText}\n${json.message}`);
                        });
                    });
            });
        }
    }
}
