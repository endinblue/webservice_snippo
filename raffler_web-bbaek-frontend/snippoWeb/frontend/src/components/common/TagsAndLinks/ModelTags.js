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

const ModelTags = ({ model }) => {
    if (model !== undefined)
        return (
            <TagsBlock>
                <h4 className="tag">MODEL</h4>
                {model.map(modelTag => (
                    <Link className="tag" to={`/?model=${modelTag}`} key={modelTag}>
                        {modelTag}
                    </Link>
                ))}
            </TagsBlock>
        );
    else return (
        <TagsBlock></TagsBlock>
    )
};

export default ModelTags;