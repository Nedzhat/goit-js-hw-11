import axios from 'axios';

const DEFAULT_PAGE = 1;

let page = DEFAULT_PAGE;

export const resetPage = () => {
  page = DEFAULT_PAGE;
};

export const fetchPhotos = async photoName => {
  const searchParams = new URLSearchParams({
    key: '28330557-4596cce085de9890ceef06ea6',
    q: photoName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    page += 1;
    console.log(response);

    return response;
  } catch (error) {
    console.log('ОШИБКА');
  }

  return response;
};
