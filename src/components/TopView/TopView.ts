import TopComponent from '../TopComponent/TopComponent';

export default class TopView extends TopComponent {
    protected components: TopComponent[];

    constructor(attrs: any = {}, data: any = {}) {
        super('div', attrs, data);
    }

    protected get _components(): TopComponent[] {
        return this.components;
    }

    protected set _components(components: TopComponent[]) {
        this.components = components;
    }

    build() {
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }

    removeComponents() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
    }

    rerender() {
        this.removeComponents();
        this.build();
    }
}