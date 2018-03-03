import router from '../Router/Router';
import {appendChilds} from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';
import Loading from '../../components/Loading/Loading';

export default function RouterRegister(className: string, componentsRoutes: any[], defaultComponents: any[]) {
    appendChilds(className, defaultComponents);
    componentsRoutes.forEach(route => router.use(route.path, route.component));
    router.connectRouting(window);

    UserService.getData()
        .catch((response: any) => {
        })
        .then(() => {
            Loading.hide();
            router.start();
        });
}
