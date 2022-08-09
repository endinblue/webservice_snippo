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

const BrandTags = ({ brand }) => {
    if (brand !== undefined )     
        return (
        <TagsBlock>
            <h4 className="tag">BRAND</h4>
            {brand.map( brandTag => (
                <Link className="tag" to={`/?brand=${brandTag}`} key={brandTag}>
                    {brandTag}
                </Link>
            ))}
        </TagsBlock>
    );
    else return(
        <TagsBlock></TagsBlock>
    )
};

export default BrandTags;