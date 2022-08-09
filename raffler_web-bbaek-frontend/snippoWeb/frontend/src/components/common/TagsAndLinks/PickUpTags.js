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

const PickUpTags = ({ pickUp }) => {
    if (pickUp !== undefined)
        return (
            <TagsBlock>
                <h4 className="tag">PICK-UP</h4>
                {pickUp.map(pickUpTag => (
                    <Link className="tag" to={`/?pickUp=${pickUpTag}`} key={pickUpTag}>
                        {pickUpTag}
                    </Link>
                ))}
            </TagsBlock>
        );
    else return (
        <TagsBlock></TagsBlock>
    )
};

export default PickUpTags;