import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RafflePostList from '../../components/posts/RafflePostList';
import { listRafflePosts } from '../../modules/rafflePosts';

const RafflePostListContainer = ({ location }) => {
    const dispatch = useDispatch();
    const { rafflePosts, error, loading, user } = useSelector(({ rafflePosts, loading, user }) => {
        return ({ 
            rafflePosts: rafflePosts.rafflePosts,
            error: rafflePosts.error,
            loading: loading['posts/LIST_RAFFLEPOSTS'],
            user: user.user,
        })
    });
    console.log(loading);
    console.log(rafflePosts);

    var showbutton = false;

    if (user == null || user.user == null)
        showbutton = false;
    else if (user.user.isAdmin)
        showbutton = true;


    useEffect(() => {
        const { store, username, page  } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listRafflePosts({ store, username, page }));
    }, [dispatch, location.search]);

    return (
        <RafflePostList
            loading={loading}
            error={error}
            rafflePosts={rafflePosts}
            showWriteButton={showbutton}
        />
    );
};

export default withRouter(RafflePostListContainer);