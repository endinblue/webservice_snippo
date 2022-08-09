import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import { Helmet } from 'react-helmet-async'

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>로그인 - SNIPPO</title>
            </Helmet>
            <AuthTemplate>
                <LoginForm />
            </AuthTemplate>
        </>
    );
};

export default LoginPage;