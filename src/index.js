import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchPhotos, resetPage } from './fetchPhotos.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnRef = document.querySelector('.load-more');

let dataSearchPhoto = '';

formRef.addEventListener('submit', searchPhotos);
btnRef.addEventListener('click', addedMarkup);

function searchPhotos(e) {
  e.preventDefault();
  dataSearchPhoto = formRef.elements.searchQuery.value;
  galleryRef.innerHTML = '';
  resetPage();
  btnRef.classList.remove('is-visible');
  fetchPhotos(dataSearchPhoto)
    .then(photos => {
      const photoData = photos.data.hits;
      if (photoData.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(photoData);
      btnRef.classList.add('is-visible');
      Notify.success(`Hooray! We found ${photos.data.totalHits} images`);
    })
    .catch(error => {
      console.log(error);
    });
}

function createMarkup(photo) {
  galleryRef.innerHTML = photo
    .map(
      photo => `<a class="gallery__item"><div class="photo-card">
        <img class="gallery__image"src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">Likes
            <b>${photo.likes}</b>
          </p>
          <p class="info-item">Views
            <b>${photo.views}</b>
          </p>
          <p class="info-item">Comments
            <b>${photo.comments}</b>
          </p>
          <p class="info-item">Downloads
            <b>${photo.downloads}</b>
          </p>
        </div>
      </div></a>`
    )
    .join('');
}

function addedMarkup(photo) {
  fetchPhotos(dataSearchPhoto).then(dataPhoto => {
    galleryRef.insertAdjacentHTML(
      'beforeend',
      dataPhoto.data.hits
        .map(
          photo => `<a class="gallery__item"><div class="photo-card">
        <img class="gallery__image"src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">Likes
            <b>${photo.likes}</b>
          </p>
          <p class="info-item">Views
            <b>${photo.views}</b>
          </p>
          <p class="info-item">Comments
            <b>${photo.comments}</b>
          </p>
          <p class="info-item">Downloads
            <b>${photo.downloads}</b>
          </p>
        </div>
      </div></a>`
        )
        .join('')
    );
  });
}

// const gallery = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   captionPosition: 'bottom',
//   captionSelector: 'img',
//   captionsData: 'alt',
// });
