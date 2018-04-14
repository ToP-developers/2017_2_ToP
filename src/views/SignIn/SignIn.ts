import TopView from '../../components/TopView/TopView';
import Form from '../../components/Form/Form';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

const data = {
    title: 'Авторизация',
    icon: 'fa fa-lock',
    method: 'post',
    name: 'signin',
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин...',
            class: 'loginput'
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль...',
            class: 'loginput'
        }
    ],
    submit: {
        class: 'loginSubmit',
        text: 'Войти'
    },
    back: {}
};

export default class SignIn extends TopView {
    constructor() {
        super({class: 'content__signin'}, data);
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

