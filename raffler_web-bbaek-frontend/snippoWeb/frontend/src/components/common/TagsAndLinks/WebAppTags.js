import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        text-decoration: none;
        margin-right: 0.5rem;
    }
`;

const WebAppTags = ({ webApp }) => {
    if (webApp !== undefined)
        return (
            <TagsBlock>
                <h4 className="tag">WEB or APP</h4>
                {webApp.map(webAppTag => (
                    <Link className="tag" to={`/?webApp=${webAppTag}`} key={webAppTag}>
                        {webAppTag}
                    </Link>
                ))}
            </TagsBlock>
        );
    else return (
        <TagsBlock></TagsBlock>
    )
};

export default WebAppTags;