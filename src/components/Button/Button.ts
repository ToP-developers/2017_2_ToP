import TopComponent from '../TopComponent/TopComponent';

export default class Button extends TopComponent {
    constructor({text, url = '', class: className = 'button'}: { text: string, url: string, class: string }) {
        super('div', {class: className, 'data-url': url});
        this.setText(text);
    }
}
