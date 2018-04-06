import * as React from 'react';
import Theming from '../../modules/Theming/Theming';

import './TopImage.scss';

export default class TopImage extends React.Component<any, any> {
    public theming: Theming;
    public image: HTMLImageElement;

    constructor(props: any) {
        super(props);

        this.state = {boxStyle: {}, imgStyle: {}};
    }

    render() {
        return (
            <div className='image' style={this.state.style}>
                <img src={this.props.src} ref={(image: any) => this.image = image}/>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.theming) {
            this._initTheming();
        }

        this.image.addEventListener('load', () => {
            setTimeout(() => {
                const newBoxStyle = {
                    maxHeight: `${this.image.height || 500}px`,
                    maxWidth: '95%'
                };

                const newImgStyle = {
                    maxWidth: '95%'
                };

                this.setState({
                    boxStyle: Object.assign(this.state.boxStyle, newBoxStyle),
                    imgStyle: Object.assign(this.state.imgStyle, newImgStyle)
                });
            }, 500);
        });
    }

    _initTheming() {
        this.theming = new Theming();

        const newStyle = {
            width: '50px',
            height: '50px'
        };

        this.setState({
            boxStyle: Object.assign(this.state.boxStyle, newStyle),
            imgStyle: Object.assign(this.state.imgStyle, newStyle)
        });

        this.image.parentElement.addMultiEvents('click touchend', () => {
            this.theming.changeTheme();
        });
    }
}
