import axios from 'axios';

const searchItems = (queryString: string) => {
  return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${queryString}`)
    .then(res => res.data.results)
    .catch(error => {
      throw error;
    });
}

const getItem = (itemId: string) => {
  return axios.get(`https://api.mercadolibre.com/items/${itemId}`)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
}

const getItemDescription = (itemId: string) => {
  return axios.get(`https://api.mercadolibre.com/items/${itemId}/description`)
    .then(res => res.data.plain_text)
    .catch(error => {
      throw error;
    });
}

export {
  searchItems,
  getItem,
  getItemDescription,
};
