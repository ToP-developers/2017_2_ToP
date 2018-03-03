import BasicValidation from './BasicValidation/BasicValidation';

function repeatPassword(password1: string, password2: string, errors: any) {
    if (password1 !== password2) {
        errors.repeatPassword = 'Пароли не совпадают!';
    }
}

const Validation = (values: any, errors: any): number => {
    (Object.keys(values) || []).forEach(value => BasicValidation(values[value], errors));

    if (values.repeatPassword) {
        repeatPassword(values.password.value, values.repeatPassword.value, errors);
    }

    return errors;
};

export default Validation;
