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

const StoreTags = ({ store }) => {
    if (store !== undefined )     
        return (
        <TagsBlock>
            <h4 className="tag">STORE</h4>
            {store.map( storeTag => (
                <Link className="tag" to={`/?store=${storeTag}`} key={storeTag}>
                    {storeTag}
                </Link>
            ))}
        </TagsBlock>
    );
    else return(
        <TagsBlock></TagsBlock>
    )
};

export default StoreTags;