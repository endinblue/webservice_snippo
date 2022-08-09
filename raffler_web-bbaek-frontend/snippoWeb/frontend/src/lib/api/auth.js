import client from './client';

//로그인
export const login = ({ email, password }) =>
    client.post('/users/login', { email, password});

//회원가입
export const register = ({email, username, password}) =>
    client.post('/users/register', {email, username,password});

//로그인 상태 확인

export const check = ({token}) => client.get('/users/check',client.defaults.headers.common['Authorization'] = token);

//로그아웃
export const logout = () => client.post('/users/logout');

export const SetPushToken = ({pushtoken, userinfo}) => client.post('/users/setPushToken',{pushtoken, userinfo});