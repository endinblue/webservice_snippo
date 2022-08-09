import React from 'react';
import { Route } from 'react-router-dom';
import NewsPostListPage from './pages/NewsPostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewsWritePage from './pages/NewsWritePage';
import NewsPostPage from './pages/NewsPostPage';
import HeaderContainer from './containers/common/HeaderContainer';
import RaffleWritePage from './pages/RaffleWritePage';
import RafflePostPage from './pages/RafflePostPage';
import RafflePostListPage from './pages/RafflePostListPage';
import { Helmet } from 'react-helmet-async';


// messaging.getToken().then((currentToken) => {
//     if (currentToken) {
//         sendTokenToServer(currentToken);
//         updateUIForPushEnabled(currentToken);
//     } else {
//         // Show permission request.
//         console.log('No Instance ID token available. Request permission to generate one.');
//         // Show permission UI.
//         updateUIForPushPermissionRequired();
//         setTokenSentToServer(false);
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     showToken('Error retrieving Instance ID token. ', err);
//     setTokenSentToServer(false);
// });

const App = () => {
  return (
    <>
      <Helmet>
        <title>SNIPPO</title>
      </Helmet>
      <HeaderContainer />
      <Route component={NewsPostListPage} path={['/news', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={NewsWritePage} path="/newswrite" />
      <Route component={NewsPostPage} path="/news/:newsPostId" />
      <Route component={RaffleWritePage} path="/rafflewrite" />
      <Route component={RafflePostListPage} path="/raffle" exact />
      <Route component={RafflePostPage} path="/raffle/:rafflePostId" />
    </>
  )
}

export default App;
