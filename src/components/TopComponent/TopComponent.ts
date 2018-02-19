/**
 * Базовый класс компоненты
 * @module TopComponent
 */
export default class TopComponent {
    private _component: HTMLElement;
    private _data: any;
    /**
     * @param {string} [tagName='div'] - tagName элемента
     * @param {*} [attrs={}] - объект с атрибутами элемента
     * @param {*} [data={}] - объект с данными элемента
     * @constructor
     */
    constructor(tagName = 'div', attrs:any = {}, data = {}) {
        this._component = document.createElement(tagName);

        (Object.keys(attrs) || []).forEach(name => this._component.setAttribute(name, attrs[name]));

        this.setData(data);
    }

    /**
     * Устанавливает данные элемента
     * @param {*} data -  объект с данными
     */
    setData(data: any) {
        this._data = data;
    }

    /**
     * Возвращает данные элемента
     */
    getData() {
        return this._data;
    }

    /**
     * Устанавливает новый текст для элемента
     * @param {string} text - устанавливаем текст
     */
    setText(text: string) {
        this._component.textContent = text;
    }

    /**
     * Прячет элемент
     */
    hide() {
        this._component.style.display = 'none';
    }

    /**
     * Отображает элемент
     */
    show() {
        this._component.style.display = 'block';
    }

    /**
     * Возвращает элемент
     * @returns {HTMLElement}
     */
    render() {
        return this.getElement();
    }

    /**
     * Удаляет элемент
     */
    remove() {
        this._component.parentElement.removeChild(this._component);
    }

    /**
     * Возвращает компоненту
     * @returns {HTMLElement}
     */
    getElement() {
        return this._component;
    }

    /**
     * Вставляет компоненту в элемент класса className
     * @param className
     */
    renderTo(className: string) {
        document.getElementsByClassName(className)[0].appendChild(this.render());
    }

    /**
     * Вставляет в себя элемент
     * @param {HTMLElement} element
     */
    append(element: HTMLElement) {
        this.getElement().appendChild(element);
    }

    /**
     * Очищает себя
     */
    clear() {
        while (this._component.firstChild) {
            this._component.removeChild(this._component.firstChild);
        }
    }

    /**
     * Устанавливает в себя разметку
     * @param template
     * @private
     */
    protected _innerHTML(template: any) {
        this._component.innerHTML = template;
    }
}

/**
 * Вставляет в paernt несколько копонент
 * @param {string} parentName - имя класса родителя
 * @param {TopComponent[]} childComponents - массив компонентов
 */
export function appendChilds(parentName: string, childComponents: TopComponent[]) {
    childComponents.forEach(child => child.renderTo(parentName));
}
