import client from './client';

export const writeCommunityPost = ({ title, brand, content, image_urls}) =>
    client.post('/news/addNews', {title, brand, content, image_urls})

export const readCommunityPost = id => client.get(`/community/selectCommunityAll/${id}`);

export const listCommunityPosts = () => {
    return client.get(`/community/selectCommunityAll`);
};
export const listSuggestion =()=> client.get('/news/listSuggestion');


export const updateCommunityPost = ({ id, title, brand, content, image_urls}) =>
    client.patch(`/community/selectCommunityAll/${id}`, {
        title,
        brand,
        content,
        image_urls,
    });

export const removeCommunityPost = id => client.delete(`/community/selectCommunityAll/${id}`);