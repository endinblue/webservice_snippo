import client from './client';

export const writeNewsPost = ({ title, brand, model, releaseDate, content, source, image_urls, username }) =>
    client.post('/news/addNews', { title, brand, model, releaseDate, content, source, image_urls, username })

export const uploadImagesAPI = (formData) =>
    client.post('/news/images', formData);


export const readNewsPost = (newsPostId) => client.get('/news/getDetailById', {
    headers: { _id: newsPostId }
});

export const listNewsPosts = () => {
    return client.get('/news/selectDataAll');
};

export const brandListSuggestion = () => client.get('/admin/listTag', { headers: { tagtype: "brand" } });

export const modelListSuggestion = () => client.get('/admin/listTag', { headers: { tagtype: "model" } });

export const updateNewsPost = ({ _id, title, brand, model, releaseDate, content, source, image_urls }) =>
    client.post('/news/updateNews', { _id, title, brand, model, releaseDate, content, source, image_urls })

export const removeNewsPost = (newsPostId) => client.post('/news/deleteNews', { _id: newsPostId });