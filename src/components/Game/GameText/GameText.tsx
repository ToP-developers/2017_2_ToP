import * as React from 'react';

import './GameText.scss';

export default class GameText extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            text: props.text
        }
    }

    // setText(text: any) {
    //     this.getElement().innerHTML = gameText(text);
    // }

    render() {
        return (
            <div className='game-text'>
                <div className='game-text__text'>
                    {
                        this.props.title ? <h2><strong>{this.state.text}></strong></h2> : <p>{this.state.text}</p>
                    }
                </div>
            </div>
        )
    }
}
