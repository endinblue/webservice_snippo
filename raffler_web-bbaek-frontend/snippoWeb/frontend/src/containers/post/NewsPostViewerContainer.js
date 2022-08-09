import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readNewsPost, unloadNewsPost } from '../../modules/newsPost';
import NewsPostViewer from '../../components/post/NewsPostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalNewsPost } from '../../modules/writeNews';
import { removeNewsPost } from '../../lib/api/newsPosts';


const NewsPostViewerContainer = ({ match, history }) => {
    //처음 마운트 될 때 포스트 읽기 API요청
    const { newsPostId } = match.params;
    const dispatch = useDispatch();
    const { newsPost, error, loading, user } = useSelector(({ newsPost, loading, user }) => ({
        newsPost: newsPost.newsPost,
        error: newsPost.error,
        loading: loading['post/READ_NEWSPOST'],
        newsPostId: newsPost._id,
        user: user.user,
    }));

    useEffect(() => {
        dispatch(readNewsPost(newsPostId));
        //언마운트 될 때 리덕스에서 포스트 데이터 없애기
        console.log(readNewsPost);
        return () => {
            dispatch(unloadNewsPost());
        };
    }, [dispatch, newsPostId]);

    const onEdit = () => {
        dispatch(setOriginalNewsPost(newsPost));
        history.push('/newswrite');
    };

    const onRemove = async () => {
        try {
            await removeNewsPost(newsPostId);
            console.log(removeNewsPost);
            history.push('/'); //홈으로 이동
        } catch (e) {
            console.log(e);
        }
    };

    //어드민 게정만 수정 삭제 가능하게 하는 코드
    var admin = false;
    if (user != null && user.user != null) {
        admin = user.user.isAdmin
    }
    return (
        <NewsPostViewer
            newsPost={newsPost}
            loading={loading}
            error={error}
            actionButtons={
                admin && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
        />
    );
};

export default withRouter(NewsPostViewerContainer);