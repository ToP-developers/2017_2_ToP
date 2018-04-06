import * as React from 'react';

import './Loading.scss';

class Loading extends React.Component<any, any> {
    private static __instance: Loading;

    constructor(props: any) {
        super(props);
        if (Loading.__instance) {
            return Loading.__instance;
        }

        Loading.__instance = this;
    }

    render() {
        return (
            <div className='loading'>
                <div className='loading__element'/>
                <div className='loading__text'>Загрузка</div>
            </div>
        )
    }
}

const loading = <Loading />;

export default loading;
