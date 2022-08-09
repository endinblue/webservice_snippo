import React from 'react';
import Responsive from '../components/common/Responsive';
import RaffleEditorContainer from '../containers/write/RaffleEditorContainer';
import WriteRaffleActionButtonsContainer from '../containers/write/WriteRaffleActionButtonsContainer';
import { Helmet } from 'react-helmet-async'


const RaffleWritePage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>응모 등록 - SNIPPO</title>
            </Helmet>
            <RaffleEditorContainer />
            <WriteRaffleActionButtonsContainer />
        </Responsive>
    );
};

export default RaffleWritePage;