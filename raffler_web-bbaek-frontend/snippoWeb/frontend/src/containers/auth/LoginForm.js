//useDispatch와 useSelector를 사용하여 리덕스와 컴포넌트를 연결
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check, login } from '../../modules/user';

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, loginError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        loginError: user.loginError,
        user: user.user,
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };
    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = form;
        dispatch(login({ email, password }));
    };

    // 컴포넌트가 처음 렌더링 될 떄 form 을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (loginError) {
            console.log('오류발생');
            console.log(loginError);
            setError('로그인 실패');
            return;
        }
        if (user) {
            console.log("로그인성공");

            const token = user.token;
            dispatch(check({ token }));
            console.log(user);

        }
        else {
            console.log("this is else");
        }
    }, [user, loginError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                //localStorage.setItem('token',JSON.stringify(user.token));
                localStorage.setItem('token', JSON.stringify(user.token));
            } catch (e) {
                console.log('localStorage is now working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);