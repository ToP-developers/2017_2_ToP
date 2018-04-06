import * as React from 'react';
import './GameInput.scss';

interface Field {
    type: string,
    placeholder: string,
    class: string
}

interface Props {
    method?: string,
    fields: Field[]
}

export default class GameInput extends React.Component<Props, any> {
    render() {
        return (
            <div className='game-input'>
                <form role='form' className='game-input__form' action='' method={this.props.method || 'post'}>
                    {
                        this.props.fields.map((field: Field) => {
                            return <input type={field.type} placeholder={field.placeholder}
                                          className={`game-input__form_${field.class}`}/>
                        })
                    }
                </form>
            </div>
        )
    }
}