import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import StoreTags from '../common/TagsAndLinks/StoreTags';
import CountryTags from '../common/TagsAndLinks/CountryTags';
import WebAppTags from '../common/TagsAndLinks/WebAppTags';
import PickUpTags from '../common/TagsAndLinks/PickUpTags';
import { backURL } from '../../config/config';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    display: block;
    padding-top: 3rem;
    padding-bottom: 3rem;
    /* 맨 위 포스트는 padding-top 없음 */
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2{
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
    .wrapper {
        width: 120%;
        margin: 0 auto;
        display: block;
    }
    .thumbnail {
        display: inline-block;
        margin-right: 0.5rem;
        img {
            display: block;
            width: 200px;
            height: 130px;
        }
    }
`;

const TagsBlock = styled.div`
    .tag {
        display: inline-block;
        text-decoration: none;
        margin-right: 0.5rem;
    }
`;

const RafflePostItem = ({ rafflePost }) => {
    const { createdAt, username, store, model, url, raffleClose, image_urls, country, webApp, pickUp, _id } = rafflePost;

    return (
        <PostItemBlock>
            <div className="wrapper">
                {image_urls.map((v) => {
                    return (
                        <div className="thumbnail">
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <img src={ v } alt="thumbnail" />
                            </a>
                        </div>
                    )
                })
                }
            </div>
            <h2>
                <Link to={`raffle/${_id}`}>{model}</Link>
            </h2>
            <SubInfo
                username={username}
                publishedDate={new Date(createdAt)}
            />
            <StoreTags store={store} />
            <CountryTags country={country} />
            <WebAppTags webApp={webApp} />
            <PickUpTags pickUp={pickUp} />
            <TagsBlock>
                <h4 className="tag">응모 기간</h4>
                <div className="tag"> {new Date(raffleClose).toLocaleString()} 까지</div>
            </TagsBlock>
        </PostItemBlock>
    );
};

const RafflePostList = ({ rafflePosts, loading, error, showWriteButton }) => {
    //에러 발생 시
    if (error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }



    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                    <Button cyan to="/rafflewrite">
                        새 글 작성하기
                </Button>
                )}
            </WritePostButtonWrapper>
            {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
            {!loading && rafflePosts && (
                <div>
                    {rafflePosts.data.map(rafflePost => (
                        <RafflePostItem rafflePost={rafflePost} key={rafflePost._id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default RafflePostList;