//useDispatch와 useSelector를 사용하여 리덕스와 컴포넌트를 연결
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
//import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history} ) => {
    const [error, setError] = useState( null );
    const dispatch = useDispatch();
    const { form, auth, authError /*user*/ } = useSelector(({ auth }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,

    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            })
        );
    };
    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { email, username, password, passwordConfirm } = form;
        
        //하나라도 비어있다면
        if([email, username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력 해 주세요.');
            return;
        }
        //비밀번호가 일치하지 않는다면
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({ form: 'register', key: 'password', value: '' }));
            dispatch(
              changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
            );
            return;
        }
        dispatch(register({ email, username, password }));
    };

    // 컴포넌트가 처음 렌더링 될 떄 form 을 초기화 함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // 회원가입 성공 / 실패 처리
    useEffect(() => {
        if (authError) {
            //계정명이 이미 존재할때
            /*if (authError.response.status === 409) {
                setError('이미 존재하는 계정명 입니다.');
                return;
            }*/
            console.log(authError.msg);
            //기타 이유
            setError('회원가입 실패');
            return;
        }
        else if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            //setError('회원가입성공.');
            history.push('/');
        }
    }, [auth, authError, dispatch,history]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);