import Form from '../../components/Form/Form';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

import * as React from 'react';

const data = {
    title: 'Регистрация',
    icon: 'fa fa-pencil',
    method: 'post',
    name: 'signup',
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин...',
            class: 'reginput'
        },
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email...',
            class: 'reginput'
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль...',
            class: 'reginput'
        },
        {
            type: 'password',
            name: 'repeatPassword',
            placeholder: 'Повторите пароль...',
            class: 'reginput'
        }
    ],
    submit: {
        class: 'registrationSubmit',
        name: 'submitButton',
        text: 'Создать аккаунт'
    },
    back: {}
};

export default class SignUp extends React.Component<any, any> {
    // show() {
    //     if (UserService.isLoggedIn()) {
    //         router.go('/');
    //         return;
    //     }
    //
    //     super.show();
    // }
    //
    // build() {
    //     if (UserService.isLoggedIn()) {
    //         router.go('/');
    //     } else {
    //         this._components = [
    //             new Form(this.getData())
    //         ];
    //         super.build();
    //     }
    // }

    render() {
        return (
            <div className='content__signup'>
                <Form {...data} />
            </div>
        )
    }
}
