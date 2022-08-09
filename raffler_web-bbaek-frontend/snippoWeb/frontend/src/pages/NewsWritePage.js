import React from 'react';
import Responsive from '../components/common/Responsive';
import NewsEditorContainer from '../containers/write/NewsEditorContainer';
import WriteNewsActionButtonsContainer from '../containers/write/WriteNewsActionButtonsContainer';
import FileUploadBoxContainer from '../containers/write/FileUploadBoxContainer';
import { Helmet } from 'react-helmet-async'


const NewsWritePage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>뉴스 등록 - SNIPPO</title>
            </Helmet>
            <NewsEditorContainer />
            <FileUploadBoxContainer />
            <WriteNewsActionButtonsContainer />
        </Responsive>
    );
};

export default NewsWritePage;