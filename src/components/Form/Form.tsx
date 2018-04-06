import * as React from 'react';
import BackButton from '../BackButton/BackButton';

import UserService from '../../services/UserService/UserService';

import Transport from '../../modules/Transport/Transport';
import Validation from '../../modules/Validator/index';
import router from '../../modules/Router/Router';

import './Form.scss';

interface Field {
    type: string,
    name: string,
    placeholder: string,
    class: string
}

interface Submit {
    class: string,
    text: string,
    url?: string
}

interface Props {
    title?: string,
    icon: string,
    back?: any,
    method: string,
    name: any,
    fields: Field[],
    submit: Submit,
}

export default class FormView extends React.Component<Props, any> {
    private formBox: any;

    constructor(props: any) {
        super(props);

        this.state = {errors: {}};
    }

    render() {
        return (
            <div
                className='form-box'
                ref={(formBox: any) => {
                    this.formBox = formBox
                }}>
                {
                    this.props.title ?
                        <div className='form-box__top'>
                            <div className='form-box__top-left'>
                                <h3>{this.props.title}</h3>
                                <p>Заполните следующие поля:</p>
                            </div>
                            <div className="form-box__top-right">
                                <i className="{json.icon}"/>
                            </div>
                        </div> : ''
                }

                <div className={`form-box__bottom ${this.props.back ? '' : 'form-box__end'}`}>
                    <form role='form' action='' method={this.props.method} name={this.props.name}>
                        <div className='error serverError'>{this.state.errors.serverError}</div>
                        {
                            [this.props.fields.map(field => {
                                return (
                                    [
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className={`${field.class} ${this.state.errors[field.name] ? 'input-error' : ''}`}
                                        />,
                                        <div className={`error ${this.state.errors[field.name] ? 'active' : ''}`}>
                                            {this.state.errors[field.name]}
                                        </div>
                                    ]
                                )
                            }),
                                <div
                                    className={`form__button ${this.props.submit.class}`}
                                    data-url={this.props.submit.url}>
                                    {this.props.submit.text}
                                </div>
                            ]
                        }
                    </form>
                </div>
                {
                    this.props.back ?
                        <div className='form-box__end'>
                            <BackButton/>
                        </div> : ''
                }
            </div>
        );
    }

    componentDidMount() {
        this._validation();
    }

    private _resetErrors() {
        this.setState({errors: {}});
    }

    private _isValid() {
        let valid = true;
        Object.values(this.state.errors).forEach(error => {
            if (error) {
                valid = false;
            }
        });
        return valid;
    }

    private _validation() {
        const formElements = [...this.formBox.getElementsByClassName(this.props.fields[0].class)];
        const submitButton = this.formBox.querySelector(`.${this.props.submit.class}`);

        this._resetErrors();

        const submit = () => {
            const values: any = {};

            formElements.forEach(element => {
                values[element.name] = element;
            });

            this.setState({
                errors: Validation(values, this.state.errors)
            });

            if (this._isValid()) {
                this._submit();
            }
        };

        submitButton.addEventListener('click', submit);
        this.formBox.addEventListener('keydown', (e: any) => {
            if (e.keyCode === 13) {
                submit();
            }
        });

        formElements.forEach(element => {
            element.addEventListener('blur', () => {
                const values: any = {};
                values[element.name] = element;

                if (element.name === 'repeatPassword') {
                    values.password = formElements.find(element => element.name === 'password');
                }

                this.setState({
                    errors: Validation(values, this.state.errors)
                });
            });
        });
    }

    private _submit() {
        const form = document.forms[this.props.name];
        const url = `/${this.props.name}`;
        const fields = form.elements;

        const data = Object.values(fields).map(field => {
            return field.name !== 'repeatPassword' ? {
                [field.name]: field.value
            } : {};
        });

        if (this.props.method === 'post') {
            Transport.post(url, data)
                .then((response: any) => {
                    UserService.user = response;

                    const route = router.getRoute('');
                    if (!route.view) {
                        route.createView();
                    }
                    route.view.rerender();
                    router.go('/');
                })
                .catch(async (response: any) => {
                    if (!response.json) {
                        console.log(response);
                        return;
                    }
                    const json = await response.json();

                    this.setState({
                        errors: this.state.errors.concat({serverError: json.message})
                    });
                });
        }
    }
}
