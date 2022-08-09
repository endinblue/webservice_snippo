import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readRafflePost, unloadRafflePost } from '../../modules/rafflePost';
import RafflePostViewer from '../../components/post/RafflePostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalRafflePost } from '../../modules/writeRaffle';
import { removeRafflePost } from '../../lib/api/rafflePosts';


const RafflePostViewerContainer = ({ match, history}) => {
    //처음 마운트 될 때 포스트 읽기 API요청
    const { rafflePostId } = match.params;
    const dispatch = useDispatch();
    const { rafflePost, error, loading } = useSelector(({ rafflePost, loading, /*user*/}) => ({
        rafflePost: rafflePost.rafflePost,
        error: rafflePost.error,
        loading: loading['post/READ_RAFFLEPOST'],
        rafflePostId : rafflePost._id,
       // user: user.user
    }));

    useEffect(() => {
        dispatch(readRafflePost(rafflePostId));
        //언마운트 될 때 리덕스에서 포스트 데이터 없애기
        console.log(readRafflePost);
        return() => {
            dispatch(unloadRafflePost());
        };
    }, [dispatch, rafflePostId]);

    const onEdit = () => {
        dispatch(setOriginalRafflePost(rafflePost));
        history.push('/rafflewrite');
    };

    const onRemove = async () => {
        try {
            await removeRafflePost(rafflePostId);
            console.log(removeRafflePost);
            history.push('/raffle'); 
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <RafflePostViewer 
            rafflePost={rafflePost} 
            loading={loading} 
            error={error} 
            actionButtons={
                <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
            />
    );
};

export default withRouter(RafflePostViewerContainer);