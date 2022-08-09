import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeNewsPost, updateNewsPost } from '../../modules/writeNews';

const WriteNewsActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, brand, model, releaseDate, content, source, image_urls, newsPost, newsPostError, originalNewsPostId, 
    } = useSelector(({ writeNews }) => ({
        title: writeNews.title,
        brand: writeNews.brand,
        model: writeNews.model,
        releaseDate: writeNews.releaseDate,
        content: writeNews.content,
        source: writeNews.source,
        image_urls: writeNews.image_urls,
        newsPost: writeNews.newsPost,
        newsPostError: writeNews.newsPostError,
        originalNewsPostId: writeNews.originalNewsPostId,
    }),
    );

    
    const { username } = useSelector(({ user }) => ({
    
        username: user.user.user.username,
    }),
    );


    // 포스트 등록
    const onPublish = () => {
        if (originalNewsPostId) {
            dispatch(
                updateNewsPost({ 
                    title, 
                    brand, 
                    model, 
                    releaseDate,
                    content, 
                    source, 
                    image_urls, 
                    _id: originalNewsPostId,
                   
                 }));
            return;
        }

        dispatch(
            writeNewsPost({
                title,
                brand,
                model,
                releaseDate,
                content,
                source,
                image_urls,
                username,
            
            }),
        );
    };

    // 취소
    const onCancel = () => {
        history.goBack();
    };

    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        if (newsPost) {
            const { _id, user } = newsPost;
            // history.push(`news/@${user.username}/${_id}`);
            history.push('/');
        }
        if (newsPostError) {
            console.log(newsPostError);
        }
    }, [history, newsPost, newsPostError]);


    return (
        <WriteActionButtons
            onPublish={onPublish}
            onCancel={onCancel}
            isEdit={!!originalNewsPostId}
        />
    );
};

export default withRouter(WriteNewsActionButtonsContainer);