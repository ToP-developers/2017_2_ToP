import TopView from "../../components/TopView/TopView";

/**
 * Класс роута
 * @module Route
 */
export default class Route {
    /**
     * @param {string} path - путь
     * @param {TopComponent} view - вьюшка
     */
    private _path: string;
    private _view: TopView;
    private _viewType: any;

    /**
     * @constructor
     */
    constructor(path: string, view: TopView) {
        this._path = path;
        this._view = null;
        this._viewType = view;
    }

    /**
     * Отрисовывает вьюшку
     */
    createView() {
        if (!this._view) {
            this._view = new this._viewType();
            this._view.build();
        } else {
            this._view.show();
        }
    }

    /**
     * Возвращает вьюшку
     * @return {TopComponent}
     */
    get view(): TopView {
        return this._view;
    }

    /**
     * Проверяет равен ли путь роута === path
     * @param path - сравниваемый путь
     * @return {boolean}
     */
    isThisPath(path: string): boolean {
        return this._path === path;
    }
}