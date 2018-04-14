import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import UserService from '../../services/UserService/UserService';

import * as React from 'react';

const unlogged = {
    buttons: [
        {
            text: 'Играть',
            class: 'button-main',
            url: '/singleplayer'
        },
        {
            text: 'Об игре',
            class: 'button-main',
            url: '/about'
        },
        {
            text: 'Войти',
            class: 'button-second',
            url: '/signin'
        },
        {
            text: 'Регистрация',
            class: 'button-second',
            url: '/signup'
        }
    ]
};

const logged = {
    buttons: [
        {
            name: 'multiplayer',
            text: 'Играть',
            class: 'button-main',
            url: '/multiplayer'
        },
        {
            name: 'singleplayer',
            text: 'Тренировка',
            class: 'button-main',
            url: '/singleplayer'
        },
        {
            name: 'settings',
            text: 'Профиль',
            class: 'button-second',
            url: '/settings'
        },
        {
            name: 'scoreboard',
            text: 'Таблица лидеров',
            class: 'button-second',
            url: '/scoreboard'
        },
        {
            name: 'logout',
            text: 'Выйти',
            class: 'button-second',
            url: '/'
        }
    ],
    login: ''
};

export default class Main extends React.Component<any,any> {
    constructor(props:any) {
        super(props);

        this.state = unlogged;
    }

    render() {
        // if (UserService.isLoggedIn()) {
        //     logged.login = UserService.getLogin();
        //     this.setState(logged);
        // } else {
        //     this.setState(unlogged);
        // }

        return(
            <div className='content__main'>
                <Menu {...this.state} />
                <Footer/>
            </div>
        )
    }
}
