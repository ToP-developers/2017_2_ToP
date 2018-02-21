const description = require('./Description.xml');
import TopComponent from '../TopComponent/TopComponent';

import './Description.scss';

export default class Description extends TopComponent {
    constructor(data: any) {
        super('div', {'class': 'description'}, data);

        this.getElement().innerHTML = description(this.getData());
    }
}
