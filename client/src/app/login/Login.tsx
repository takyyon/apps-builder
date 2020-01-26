import React, { useState } from 'react';
import { Card, FormTextInput, Button } from 'tabler-react';
import { Form } from 'formik';
import LoadingComponent from '../../utility/components/LoadingComponent';
import AuthService from './Auth.service';
import decode from "jwt-decode";
import { navigate } from '@reach/router';

interface LoginProps {
    path: string;
    setUser: (user) => void;
}

const Login: React.FC<LoginProps> = props => {
    const { path, setUser } = props;
    const [values, setValues] = useState({email: '', password: ''});
    const [errors, setErrors] = useState<{email: string, password: string} | undefined>(undefined);
    const [logging, setLogging] = useState(false);

    const run = async () => {
        validate();
        if(!!errors) {
            // errors shown
            return;
        }
        setLogging(true);
        const loginResponse = await AuthService.login(values.email, values.password);
        if(loginResponse.status === 200) {
            navigate(path);
            const token = loginResponse.data.token;
            AuthService.setToken(token);
            localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
            setUser({...loginResponse.data.user});
        }
        setLogging(false);
    };

    const onChange = (e: any) => {
        if(!!e) {
            const value = e.target.value;
            const oldValues = values;
            oldValues[e.target.name] = value;
            setValues({...values});
        }
    };

    const validate = () => {
        let errors = {email: '', password: ''};
        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }
        if(!values.password) {
            errors.password = 'Required';
        }
        setErrors({...errors});
    }

    return (
        <div className="page">
            {logging && <LoadingComponent />}
            <div className="page-single">
                <div className="container">
                    <div className="row">
                        <div className="col col-login mx-auto">
                            <Card>
                                <Card.Body className="p-6">
                                        <div>
                                            <FormTextInput
                                                name="email"
                                                type="email"
                                                label={''}
                                                placeholder={'Enter email'}
                                                onChange={onChange}
                                                value={values && values.email}
                                                error={errors && errors.email}
                                            />
                                            <FormTextInput
                                                name="password"
                                                type="password"
                                                label={''}
                                                placeholder={'Enter password'}
                                                onChange={onChange}
                                                value={values && values.password}
                                                error={errors && errors.password}
                                            />
                                        </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type="button" color="primary" block={true} onClick={run}>Login</Button>
                                </Card.Footer>
                            </Card>      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;