import Transport from '../../modules/Transport/Transport';

class UserService {
    private static __instance: UserService;
    private _user: any = null;

    constructor() {
        if (UserService.__instance) {
            return UserService.__instance;
        }

        UserService.__instance = this;
    }

    logout(): any {
        return Transport.post('/logout')
            .then(() => { this._user = null; });
    }

    getLogin(): string {
        return this._user.login;
    }

    isLoggedIn(): boolean {
        return !!this._user;
    }

    getData(): any {
        return Transport.get('/user')
            .then((userdata: any) => {
                this._user = userdata;
                return userdata;
            });
    }

    setScore(type: string, score: number) {
        if (type === 'singleplayer') {
            this._user.sscore = score;
        } else if (type === 'multiplayer') {
            this._user.mscore = score;
        }
    }

    getScore(type: string): number {
        return type === 'singleplayer' ? this._user.sscore : this._user.mscore;
    }

    set user(newUser: any) {
        this._user = newUser;
    }
}

const userService = new UserService();

export default userService;
