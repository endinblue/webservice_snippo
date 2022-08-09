import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../modules/writeNews';


const FileUploadBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;

    h4 {
        color: ${palette.gray[8]}
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const FileUploadForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 500px;
    border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
    input,
    button {
        outline: none;
        border: none;
        font-size: 0.875rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;
    }

    button {
        cursor: pointer;
            padding-right: 1rem;
            padding-left: 1rem;
            border: none;
            background: ${palette.gray[8]};
            color: white;
            font-weight: bold;
            &:hover {
                background: ${palette.gray[6]};
            }
    }
`;

const FileUpload = styled.div`
    margin-right: 0.5rem;
    margin-top: 1rem;
    img {
        display: block;
        width: 200px;
        height: 130px;

    }
`;

const FileUploadListBlock = styled.div`
    display: flex;
    width: 200px;
    height: 100%;
`;


const FileUploadBoxContainer = () => {
    const dispatch = useDispatch();
    const { image_urls } = useSelector(state => state.writeNews);
    const imageInput = useRef();

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append("image", f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        });
    }, []);

    return (
        <FileUploadBoxBlock>
            <h2>이미지 업로드</h2><hr />
            <FileUploadForm encType="multipart/form-data" >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={imageInput}
                    onChange={onChangeImages}
                />
            </FileUploadForm>

            <FileUploadListBlock>
                {image_urls.map((v, i) => (
                    <FileUpload key={v}>
                        <img src={v} alt={v} />
                        <button onClick={onRemoveImage(i)}> 제거 </button>
                    </FileUpload>
                ))}
            </FileUploadListBlock>


        </FileUploadBoxBlock>

    )
};

export default FileUploadBoxContainer;

