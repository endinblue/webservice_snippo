//useDispatch와 useSelector를 사용하여 리덕스와 컴포넌트를 연결
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    return <Header user= {user} onLogout={onLogout}/>;
};

export default HeaderContainer;