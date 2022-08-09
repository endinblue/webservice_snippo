import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const ImgUploadsBlock = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            color: ${palette.cyan[6]};
        }
    }
`;

const ImgUploads = ({ brand }) => {
    return (
        <TagsBlock>
            {brand.map( brandTag => (
                <Link className="brandTag" to={`/?brand=${brandTag}`} key={brandTag}>
                    {brandTag}
                </Link>
            ))}
        </TagsBlock>
    );
};

export default Tags;