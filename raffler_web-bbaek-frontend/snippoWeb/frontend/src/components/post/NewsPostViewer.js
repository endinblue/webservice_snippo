import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import BrandTags from '../common/TagsAndLinks/BrandTags';
import { ExternalLink } from 'react-external-link';
import { Helmet } from 'react-helmet-async'
import ModelTags from '../common/TagsAndLinks/ModelTags';
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

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const TagsBlock = styled.div`
    .tag {
        display: inline-block;
        text-decoration: none;
        margin-right: 0.5rem;
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

const NewsPostViewer = ({ newsPost, error, loading, actionButtons, user }) => {
    //에러 발생 시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>
    }

    //로딩 중이거나 아직 포스트 데이터가 없을 때
    if (loading || !newsPost) {
        return null;
    }

    const { title, model, releaseDate, content, image_urls, url, createdAt, brand, username, source } = newsPost.data;

    return (
        <PostViewerBlock>
            <Helmet>
                <title>{title} - SNIPPO</title>
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={username}
                    publishedDate={createdAt}
                    hasMarginTop
                />
                <BrandTags brand={brand} />
                <ModelTags model={model} />
                <TagsBlock>
                    <h4 className="tag">발매일</h4>
                    <div className="tag"> {new Date(releaseDate).toLocaleDateString()}</div>
                </TagsBlock>

            </PostHead>
            {actionButtons}
            <PostContent
                dangerouslySetInnerHTML={{ __html: content }} //dangerouslySetInnerHTML= HTML태그 적용 시 사용
            />
            <SourceBlock>
                <h4 className="source">관련 링크</h4>
                {source.map(source => (
                    <ExternalLink className="tag" href={source} key={source}>
                        {source}
                    </ExternalLink>
                ))}
            </SourceBlock>
            {image_urls.map((v, index) => {
                return (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={index}>
                        <img src={ v } alt="thumbnail" style={{ margin: '0 auto', width: '100%' }} />
                    </a>
                )
            })
            }
        </PostViewerBlock>
    );
};

export default NewsPostViewer;