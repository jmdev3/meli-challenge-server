import axios from 'axios';

/**
 * @param queryString representa el string a buscar
 * devuelve una lista de items matcheados o lista vacía
 */
const searchItems = (queryString: string) => {
  return axios.get(`${process.env.MELIURL}sites/MLA/search?q=:${queryString}`)
    .then(res => res.data.results)
    .catch(error => {
      throw error;
    });
}

/**
 * @param itemId representa el id del item para solicitar su información
 * devuelve el item o falla en caso de no encontrarlo
 */
const getItem = (itemId: string) => {
  return axios.get(`${process.env.MELIURL}items/${itemId}`)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
}

/**
 * @param itemId representa el id del item para solicitar la descripción
 * devuelve la descripción del item o falla en caso de no encontrarlo
 */
const getItemDescription = (itemId: string) => {
  return axios.get(`${process.env.MELIURL}items/${itemId}/description`)
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
