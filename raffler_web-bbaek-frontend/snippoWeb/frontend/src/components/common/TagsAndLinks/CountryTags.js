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

const CountryTags = ({ country }) => {
    if (country !== undefined )     
        return (
        <TagsBlock>
            <h4 className="tag">COUNTRY</h4>
            {country.map( countryTag => (
                <Link className="tag" to={`/?country=${countryTag}`} key={countryTag}>
                    {countryTag}
                </Link>
            ))}
        </TagsBlock>
    );
    else return(
        <TagsBlock></TagsBlock>
    )
};

export default CountryTags;