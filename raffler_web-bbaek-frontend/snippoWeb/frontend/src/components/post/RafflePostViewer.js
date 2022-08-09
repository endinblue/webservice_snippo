import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import StoreTags from '../common/TagsAndLinks/StoreTags';
import CountryTags from '../common/TagsAndLinks/CountryTags';
import WebAppTags from '../common/TagsAndLinks/WebAppTags';
import PickUpTags from '../common/TagsAndLinks/PickUpTags';
import { ExternalLink } from 'react-external-link';
import { Helmet } from 'react-helmet-async'
import { backURL } from '../../config/config'

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;
const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;
const SourceBlock = styled.div`
    margin-top: 0.5rem;
    .source{
        display: inline-block;
        margin-right: 1rem;
    }
    .tag {
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        padding-bottom: 1rem;
        &:hover {
            color: ${palette.cyan[6]};
        }
    }
`;

const RafflePostViewer = ({ rafflePost, error, loading, actionButtons }) => {
    //에러 발생 시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>
    }

    //로딩 중이거나 아직 포스트 데이터가 없을 때
    if (loading || !rafflePost) {
        return null;
    }

    const { model, store, image_urls, createdAt, link, url, country, username, source, webApp, pickUp } = rafflePost.data;

    return (
        <PostViewerBlock>
            <Helmet>
                <title>{model}</title>
            </Helmet>
            <PostHead>
                <h2>{model}</h2>
                <SubInfo
                    username={username}
                    publishedDate={createdAt}
                    hasMarginTop
                />
            </PostHead>
            {actionButtons}
            <StoreTags store={store} />
            <CountryTags country={country} />
            <WebAppTags webApp={webApp} />
            <PickUpTags pickUp={pickUp} />
            <SourceBlock>
                <h4 className="source">Link </h4>
                <ExternalLink href={link} className="tag" >{link}</ExternalLink>
            </SourceBlock>
            {image_urls.map((v) => {
                return (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={ v } alt="thumbnail" style={{ margin: '0 auto', width: '100%' }} />
                    </a>
                )
            })
            }
        </PostViewerBlock>
    );
};

export default RafflePostViewer;