const menu = require('./Menu.xml');
import TopComponent from '../TopComponent/TopComponent';
import Button from '../Button/Button';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

import './Menu.scss';

export default class Menu extends TopComponent {
    constructor(data: any) {
        super('div', {class: 'menu'}, data);

        this.getElement().innerHTML = menu();
    }

    render() {
        this.getData().buttons.forEach((el: any) => {
            const button = new Button(el);
            this.getElement().querySelector('.menu__buttons').appendChild(button.render());
        });
        this._logout();
        return this.getElement();
    }

    private _logout() {
        const main = this.getElement();
        const logoutButton = main.querySelector('[data-url="/"]');
        if (logoutButton) {
            logoutButton.addMultiEvents('click touchend', () => {
                UserService.logout()
                    .then(() => {
                        router.getRoute('').view.rerender();
                        router.go('/');
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
