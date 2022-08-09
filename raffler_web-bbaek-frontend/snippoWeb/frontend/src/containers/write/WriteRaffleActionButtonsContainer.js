import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeRafflePost, updateRafflePost } from '../../modules/writeRaffle';

const WriteRaffleActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { model, store, raffleClose, country, webApp, pickUp, image_urls, rafflePost, rafflePostError, originalRafflePostId, link,
    } = useSelector(({ writeRaffle }) => ({
        model: writeRaffle.model,
        store: writeRaffle.store,
        raffleClose: writeRaffle.raffleClose,
        country: writeRaffle.country,
        webApp: writeRaffle.webApp,
        pickUp: writeRaffle.pickUp,
        link: writeRaffle.link,
        image_urls: writeRaffle.image_urls,
        rafflePost: writeRaffle.rafflePost,
        rafflePostError: writeRaffle.rafflePostError,
        originalRafflePostId: writeRaffle.originalRafflePostId,
    }),
    );

    const { username } = useSelector(({ user }) => ({
    
        username: user.user.user.username,
    }),
    );

    // 포스트 등록
    const onPublish = () => {
        if (originalRafflePostId) {
            dispatch(
                updateRafflePost({
                    model,
                    store,
                    raffleClose,
                    country,
                    webApp,
                    pickUp,
                    image_urls,
                    link,
                    _id: originalRafflePostId,
                }));
            return;
        }
        dispatch(
            writeRafflePost({
                model,
                store,
                raffleClose,
                country,
                webApp,
                pickUp,
                image_urls,
                link,
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
        if (rafflePost) {
            const { _id, user } = rafflePost;
            // history.push(`news/@${user.username}/${_id}`);
            history.push('/raffle');
        }
        if (rafflePostError) {
            console.log(rafflePostError);
        }
    }, [history, rafflePost, rafflePostError]);


    return (
        <WriteActionButtons
            onPublish={onPublish}
            onCancel={onCancel}
            isEdit={!!originalRafflePostId}
        />
    );
};

export default withRouter(WriteRaffleActionButtonsContainer);