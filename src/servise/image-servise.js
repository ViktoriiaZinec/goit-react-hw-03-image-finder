import axios from 'axios';

const API = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36254227-b1cc2f8da5f48ab7368a52fdf',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  },
});

export async function fetchPhotos(input, index) {
  //   console.log(input);
  return await API.get('', { params: { q: input, page: index } }).then(
    response => {
      return response.data;
    }
  );
}
