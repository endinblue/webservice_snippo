import client from './client';

export const writeRafflePost = ({ model, store, raffleClose, country, webApp, pickUp, image_urls, link }) =>
    client.post('/raffle/addRaffle', { model, store, raffleClose, country, webApp, pickUp, image_urls, link });

export const uploadImagesAPI = (formData) =>
    client.post('/raffle/images', formData);


export const readRafflePost = (rafflePostId) => client.get('/raffle/getDetailById', {
    headers: { _id: rafflePostId }
});

export const listRafflePosts = () => {
    return client.get('/raffle/getDataAll');
};


export const modelListSuggestion = () => client.get('/admin/listTag', { headers: { tagtype: "model" } });

export const storeListSuggestion = () => client.get('/admin/listTag', { headers: { tagtype: "store" } });

export const updateRafflePost = ({ id, model, store, raffleClose, country, link, webApp, pickUp, image_urls }) =>
    client.patch(`/raffle/getDataAll/${id}`, {
        model,
        store,
        raffleClose,
        country,
        link,
        webApp,
        pickUp,
        image_urls,
    });

export const removeRafflePost = (rafflePostId) => client.post('/raffle/deleteRaffle', { _id: rafflePostId });