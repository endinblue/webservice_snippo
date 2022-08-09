import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditorBlock = styled(Responsive)`
    /* 페이지 위 아래 여백 지정 */
    padding-top: 5rem;
    padding-bottom: 5rem;
`;
const LinkInput = styled.input`
    font-size: 1rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
`;



const RaffleEditor = ({ store, model, country, pickUp, webApp, modelSuggestion, storeSuggestion, link, onChangeField }) => {
    const [raffleClose, setRaffleClose] = useState(new Date());

    const webApps = [
        { value: 'WEB', label: 'WEB' },
        { value: 'APP', label: 'APP' },
        { value: 'Social', label: 'Social' },
    ];

    const pickUps = [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
    ];

    const countries = [
        { value: 'Korea', label: 'Korea' },
        { value: 'United States', label: 'United States' },
        { value: 'Europe', label: 'Europe' },
        { value: 'International', label: 'International' },
    ];

    const storeSuggestionList = [];
    if (typeof storeSuggestion === "object") {
        for (var i = 0; i < storeSuggestion.length; i++) {
            const temp = {
                value: storeSuggestion[i].value,
                label: storeSuggestion[i].value,
            };
            storeSuggestionList.push(temp);
        }
    }

    const modelSuggestionList = [];
    if (typeof modelSuggestion === "object") {
        for (var i = 0; i < modelSuggestion.length; i++) {
            const temp = {
                value: modelSuggestion[i].value,
                label: modelSuggestion[i].value,
            };
            modelSuggestionList.push(temp);
        }
    }


    //Link 변경이벤트
    const onChangeLink = e => {
        onChangeField({ key: 'link', value: e.target.value });
    };

    const onChangeModel = selectedOptions => {
        const optionvalue = [];
        if (selectedOptions == null) {
            optionvalue.pop();
        }
        if (selectedOptions != null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({ key: 'model', value: optionvalue });
    }

    const onChangeStore = selectedOptions => {
        const optionvalue = [];
        if (selectedOptions == null) {
            optionvalue.pop();
        }
        if (selectedOptions != null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({ key: 'store', value: optionvalue });
    }


    const onChangeWebApp = selectedOptions => {
        const optionvalue = [];
        if (selectedOptions == null) {
            optionvalue.pop();
        }
        if (selectedOptions != null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({ key: 'webApp', value: optionvalue });
    }

    const onChangePickUp = selectedOptions => {
        const optionvalue = [];
        if (selectedOptions == null) {
            optionvalue.pop();
        }
        if (selectedOptions != null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({ key: 'pickUp', value: optionvalue });
    }

    const onChangeCountry = selectedOptions => {
        const optionvalue = [];
        if (selectedOptions == null) {
            optionvalue.pop();
        }
        if (selectedOptions != null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({ key: 'country', value: optionvalue });
    }

    const onChangeDate = raffleClose => {
        setRaffleClose(raffleClose);
        onChangeField({ key: 'raffleClose', value: raffleClose },
        );
    }
    var modelvalue = [];
    var storevalue = [];
    var webAppvalue = [];
    var pickUpvalue = [];
    var countryvalue = [];

    if (model != null) {
        for (var v = 0; v < model.length; v++) {
            modelvalue.push({ value: model[v], label: model[v] });
        }
    }
    if (store != null) {
        for (var v = 0; v < store.length; v++) {
            storevalue.push({ value: store[v], label: store[v] });
        }
    }
    if (webApp != null) {
        for (var v = 0; v < webApp.length; v++) {
            webAppvalue.push({ value: webApp[v], label: webApp[v] });
        }
    }
    if (pickUp != null) {
        for (var v = 0; v < pickUp.length; v++) {
            pickUpvalue.push({ value: pickUp[v], label: pickUp[v] });
        }
    }
    if (country != null) {
        for (var v = 0; v < country.length; v++) {
            countryvalue.push({ value: country[v], label: country[v] });
        }
    }
    return (
        <EditorBlock>
            <h2>Model</h2>
            <CreatableSelect
                defalutValue={modelvalue}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                isMulti
                name="model"
                options={modelSuggestionList}
                onChange={onChangeModel}
            />
            <h2>응모 종료일</h2>
            <DatePicker
                selected={raffleClose}
                onChange={onChangeDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            <h2>STORE</h2>
            <Select
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                defaultValue={storevalue}
                isMulti
                name="store"
                options={storeSuggestionList}
                onChange={onChangeStore}
            />
            <h2>WEB/APP</h2>
            <Select
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                defaultValue={webAppvalue}
                isMulti
                name="webApp"
                options={webApps}
                onChange={onChangeWebApp}
            />
            <h2>Pick-Up</h2>
            <Select
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                defaultValue={pickUpvalue}
                isMulti
                name="pickUp"
                options={pickUps}
                onChange={onChangePickUp}
            />
            <h2>Country</h2>
            <Select
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                defaultValue={countryvalue}
                isMulti
                name="country"
                options={countries}
                onChange={onChangeCountry}
            />
            <LinkInput
                placeholder="링크 입력"
                onChange={onChangeLink}
                value={link}
            />
        </EditorBlock>
    );
};

export default RaffleEditor;