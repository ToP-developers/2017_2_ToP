import Form from '../../components/Form/Form';
import TopView from '../../components/TopView/TopView';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

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
    buttons: [
        {
            class: 'registrationSubmit',
            name: 'submitButton',
            text: 'Создать аккаунт'
        }
    ],
    back: {}
};

export default class SignUp extends TopView {
    constructor() {
        super({class: 'content__signup'}, data);
    }

    show() {
        if (UserService.isLoggedIn()) {
            router.go('/');
            return;
        }

        super.show();
    }

    build() {
        if (UserService.isLoggedIn()) {
            router.go('/');
        } else {
            this._components = [
                new Form(this.getData())
            ];
            super.build();
        }
    }
}
