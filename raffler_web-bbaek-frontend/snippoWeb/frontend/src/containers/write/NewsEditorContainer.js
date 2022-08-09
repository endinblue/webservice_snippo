//useDispatch와 useSelector를 사용하여 리덕스와 컴포넌트를 연결
import React, { useEffect, useCallback } from 'react';
import NewsEditor from '../../components/write/NewsEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize, loadingBrandSuggestion, loadingModelSuggestion } from '../../modules/writeNews';



const NewsEditorContainer = () => {
    const dispatch = useDispatch();
    const { title, content, source, image_urls, brand, model, releaseDate } = useSelector(({ writeNews }) => ({
        title: writeNews.title,
        brand: writeNews.brand,
        model: writeNews.model,
        releaseDate: writeNews.releaseDate,
        content: writeNews.content,
        image_urls: writeNews.image_urls,
        source: writeNews.source,
    }));
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ]);

    //언마운트 될 때 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);

    useEffect(() => {

        dispatch(loadingBrandSuggestion());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadingModelSuggestion());
    }, [dispatch]);


    const { brandSuggestion } = useSelector(({ writeNews }) => ({
        brandSuggestion: writeNews.brandSuggestion,
    }));

    const { modelSuggestion } = useSelector(({ writeNews }) => ({
        modelSuggestion: writeNews.modelSuggestion,
    }));

    return <NewsEditor
        onChangeField={onChangeField}
        title={title}
        brand={brand}
        model={model}
        releaseDate={releaseDate}
        content={content}
        source={source}
        image_urls={image_urls}
        brandSuggestion={brandSuggestion.data}
        modelSuggestion={modelSuggestion.data}
    />;
};

export default NewsEditorContainer;