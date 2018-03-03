import Route from './Route';
import TopComponent from "../../components/TopComponent/TopComponent";
import TopView from "../../components/TopView/TopView";

/**
 * Класс роутера
 * @module Router
 */
class Router {
    private routes: Route[] = [];
    private static __instance: Router;

    /**
     * @constructor
     * @return {Router|*}
     */
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    /**
     * Устанавливает вьюшку для path
     * @param {string} path - путь
     * @param {TopComponent} view
     * @return {Router}
     */
    use(path: string, view: TopView): Router {
        const route = new Route(path, view);
        this.routes.push(route);

        return this;
    }

    /**
     * Начинает работу роутеров
     */
    start() {
        window.addEventListener('popstate', () => this._onRoute());

        this._onRoute();
    }

    /**
     * Находит роут для путя
     * @param {string} path
     * @return {Route}
     */
    getRoute(path: string): Route {
        return this.routes.find(route => route.isThisPath(path));
    }

    /**
     * Возвращает текущий path
     * @return {string}
     */
    static getPath(): string {
        const currentPath = window.location.pathname.toString().toLowerCase();

        return currentPath[currentPath.length - 1] === '/' ? currentPath.slice(0, -1) : currentPath;
    }

    /**
     * Осуществляет переключение вьюшки без перезагрузки страницы
     * @param path
     */
    go(path: string) {
        window.history.pushState({}, '', path);
        this._onRoute();
    }

    /**
     * Прячет все вьюшки
     */
    hideAll() {
        this.routes.forEach(route => {
            if (route.view) {
                route.view.hide();
            }
        });
    }

    /**
     * Создает события перехода по нажатию на элемент
     * @param {EventTarget} objectListener
     */
    connectRouting(objectListener: EventTarget) {
        objectListener.addMultiEvents('click touchend', (event: any) => {
            const url = event.target.getAttribute('data-url');

            if (!url || url === '') {
                return;
            }
            this.go(url);
        });
    }

    /**
     * Осуществляет переключение вьюшки по текущему пути
     * @private
     */
    private _onRoute() {
        const route = this.getRoute(Router.getPath());

        if (!route) {
            return;
        }

        this.hideAll();
        route.createView();
    }
}

const router = new Router();

export default router;
