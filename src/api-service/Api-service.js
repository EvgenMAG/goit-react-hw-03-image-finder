import axios from 'axios';

const KEY = '19688352-7c772d0e763de7aee127ab308';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = (query, page) => {
  let paramUrl = `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(paramUrl).then(({ data }) => data);
};

export default getImages;
