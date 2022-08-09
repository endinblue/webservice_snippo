import React, { useRef, useEffect, useCallback, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
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
const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;
const SourceInput = styled.input`
    font-size: 1rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
`;
const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        padding-top: 0.5rem;
        margin-top: 1rem;
        border: 1px solid ${palette.gray[4]};
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-black::before {
        left: 0px;
    }
`;

const NewsEditor = ({ title, model,brand,content, source, onChangeField, brandSuggestion, modelSuggestion }) => {
    const [releaseDate, setReleaseDate] = useState(new Date());

    const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
    const quillInstance = useRef(null); // Quill 인스턴스를 설정

    const brandSuggestionList = [];
    if (typeof brandSuggestion === "object") {
        for (var i = 0; i < brandSuggestion.length; i++) {

            const temp = {
                value: brandSuggestion[i].value,
                label: brandSuggestion[i].value,
            };
            brandSuggestionList.push(temp);
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

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                //더 많은 옵션 => https://quilljs.com/docs/modules/toolbar/ 참고해서 수정
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                ],
            },
        });

        //quill에 text-change 이벤트 핸들러 등록 (참고: https://quilljs.com/docs/api/#events)
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({key: 'content', value: quill.root.innerHTML});
            }
        });
    }, [onChangeField]);

    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = content;
    }, [content]);

    //Title 변경이벤트
    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value});
    };
    //Source 변경이벤트
    const onChangeSource = e => {
        onChangeField({key: 'source', value: e.target.value});
    };

    const onChangeBrand = selectedOptions => {
        const optionvalue = [];
        if(selectedOptions==null){
            optionvalue.pop();
        }
        if(selectedOptions!=null) {
            for (var i = 0; i < selectedOptions.length; i++) {
                optionvalue.push(selectedOptions[i].value);
            }

        }
        onChangeField({key: 'brand', value: optionvalue});
    }

    const onChangeModel = selectedOptions => {
        const optionvalue = [];
        if(selectedOptions==null){
            optionvalue.pop();
        }
        if (selectedOptions != null) {

        for (var i = 0; i < selectedOptions.length; i++) {
            optionvalue.push(selectedOptions[i].value);
        }

        }
        onChangeField({key: 'model', value: optionvalue});
    }

    const onChangeDate = releaseDate => {
        setReleaseDate(releaseDate);
        onChangeField({key: 'releaseDate', value: releaseDate},
        );
    }

  //


    var brandvalue=[];
    var modelvalue=[];
    if(brand!=null) {
        for (var v = 0; v < brand.length; v++) {
            brandvalue.push({value: brand[v], label: brand[v]});
        }
    }
    if(model!=null) {
        for (var v = 0; v < model.length; v++) {
            modelvalue.push({value: model[v], label: model[v]});
        }
    }


    return (
        <EditorBlock>
            <TitleInput
                placeholder="제목을 입력하세요"
                onChange={onChangeTitle}
                value={title}
            />
            <h2>브랜드</h2>
            <Select
                defaultValue={brandvalue}
                isMulti
                name="brand"
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                options={brandSuggestionList}
                onChange={onChangeBrand}
            />
            <h2>모델</h2>
            <CreatableSelect
                defaultValue={modelvalue}
                getOptionLabel={opt => opt.label}
                getOptionValue={opt => opt.value}
                isMulti
                name="model"
                options={modelSuggestionList}
                onChange={onChangeModel}
            />
            <h2>발매일</h2>
            <DatePicker
                selected={releaseDate}
                onChange={onChangeDate}
            />
            <QuillWrapper>
                <div ref={quillElement}/>
            </QuillWrapper>
            <SourceInput
                placeholder="출처를 입력하세요"
                onChange={onChangeSource}
                value={source}
            />
        </EditorBlock>
    );

};

export default NewsEditor;