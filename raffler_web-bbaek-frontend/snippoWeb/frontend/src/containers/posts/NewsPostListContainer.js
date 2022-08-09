import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewsPostList from '../../components/posts/NewsPostList';
import { listNewsPosts } from '../../modules/newsPosts';

const NewsPostListContainer = ({ location }) => {
    const dispatch = useDispatch();
    const { newsPosts, error, loading, user } = useSelector(({ newsPosts, loading, user }) => {
        return ({
            newsPosts: newsPosts.newsPosts,
            error: newsPosts.error,
            loading: loading['posts/LIST_NEWSPOSTS'],
            user: user.user,
        })
    });
    var showbutton = false;

    if (user == null || user.user == null)
        showbutton = false;
    else if (user.user.isAdmin)
        showbutton = true;

        //여기서 렌더링
    useEffect(() => {
        const { brand, username, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listNewsPosts({ brand, username, page }));
    }, [dispatch, location.search]);

    return (
        <NewsPostList
        loading={loading}
        error={error}
        newsPosts={newsPosts}
        showWriteButton={showbutton}
        />
        
    );
};

export default withRouter(NewsPostListContainer);