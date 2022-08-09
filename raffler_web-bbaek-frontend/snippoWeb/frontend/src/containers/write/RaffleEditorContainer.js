//useDispatch와 useSelector를 사용하여 리덕스와 컴포넌트를 연결
import React, { useEffect, useCallback } from 'react';
import RaffleEditor from '../../components/write/RaffleEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize, loadingModelSuggestion, loadingStoreSuggestion } from '../../modules/writeRaffle';

const RaffleEditorContainer = () => {
    const dispatch = useDispatch();
    const { model,store, raffleClose, country, link, webApp, pickUp, image_urls } = useSelector(({ writeRaffle }) => ({
        model: writeRaffle.model,
        store: writeRaffle.store,
        raffleClose: writeRaffle.raffleClose,
        country: writeRaffle.country,
        link: writeRaffle.link,
        webApp: writeRaffle.webApp,
        pickUp: writeRaffle.pickUp,
        image_urls: writeRaffle.image_urls,
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
        dispatch(loadingModelSuggestion());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadingStoreSuggestion());
    }, [dispatch]);


    const { modelSuggestion } = useSelector(({ writeRaffle }) => ({
        modelSuggestion: writeRaffle.modelSuggestion,
    }));

    const { storeSuggestion } = useSelector(({ writeRaffle }) => ({
        storeSuggestion: writeRaffle.storeSuggestion,
    }));


    return <RaffleEditor
        onChangeField={onChangeField}
        model={model}
        store={store}
        raffleClose={raffleClose}
        country={country}
        link={link}
        webApp={webApp}
        pickUp={pickUp}
        image_urls={image_urls}
        modelSuggestion={modelSuggestion.data}
        storeSuggestion={storeSuggestion.data}
    />;
};

export default RaffleEditorContainer;