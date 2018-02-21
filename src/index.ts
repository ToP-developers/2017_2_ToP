import Main from './views/Main/Main.js';
import SignUp from './views/SignUp/SignUp.js';
import SignIn from './views/SignIn/SignIn.js';
import Scoreboard from './views/Scoreboard/Scoreboard.js';
import SinglePlayer from './views/SinglePlayer/SinglePlayer.js';
import MultiPlayer from './views/MultiPlayer/MultiPlayer.js';

import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import TopComponent from './components/TopComponent/TopComponent';

import RouterRegister from './modules/RouterRegister/RouterRegister.js';
import MultiEventsRegister from './modules/MultiEvents/MultiEvents.js';
import ServiceWorkerRegister from './services/ServiceWorker/ServiceWorker.js';


ServiceWorkerRegister();
MultiEventsRegister();

RouterRegister('main', [
    {
        path: '',
        component: Main
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/signin',
        component: SignIn
    },
    {
        path: '/singleplayer',
        component: SinglePlayer
    },
    {
        path: '/multiplayer',
        component: MultiPlayer
    },
    {
        path: '/scoreboard',
        component: Scoreboard
    }
], [new Header(), Loading, new TopComponent('div', {class: 'content'})]);
