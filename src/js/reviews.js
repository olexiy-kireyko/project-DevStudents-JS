import axios from 'axios';
import Swiper from 'swiper';

const BASE_URL = 'https://portfolio-js.b.goit.study';
const END_POINT = '/api/reviews';

const swiperList = document.querySelector('.reviews__swiper-list');
const btnPrev = document.querySelector('.swiper__button-prev');
const btnNext = document.querySelector('.swiper__button-next');

const swiper = new Swiper('.reviews__swiper', {
  speed: 400,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 300,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 300,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },
  on: {
    slideChange: () => {
      btnControl();
    },
  },
});

async function getReviews() {
  const { data } = await axios(BASE_URL + END_POINT);
  return data;
}

function markupReviews(arr) {
  return arr
    .map(
      ({ author, avatar_url, review }) =>
        `<li class="swiper-slide">
            <blockquote class="reviews__quote">
              <p class=".p-l">${review}</p>
            </blockquote>
          <div class="reviews__info">
            <div class="reviews__wrapper__img">
              <img src="${avatar_url}" alt="client" class="reviews__img">
            </div>
            <h3 class="reviews__name">${author}</h3>
          </div>
        </li>`
    )
    .join('');
}

function btnControl() {
  if (swiper.isBeginning) {
    btnPrev.dataset.action = false;
    btnNext.dataset.action = true;
  } else if (swiper.isEnd) {
    btnPrev.dataset.action = true;
    btnNext.dataset.action = false;
  } else if (swiper.isLocked) {
    btnPrev.dataset.action = false;
    btnNext.dataset.action = false;
  } else {
    btnPrev.dataset.action = true;
    btnNext.dataset.action = true;
  }
}

getReviews()
  .then(data => {
    btnControl();
    swiperList.innerHTML = markupReviews(data);
  })
  .catch(Error => {
    alert('Reviews not found');
    swiperList.innerHTML = `<p>Not found</p>`;
  });

btnNext.addEventListener('click', event => {
  swiper.slideNext();
});

btnPrev.addEventListener('click', event => {
  swiper.slidePrev();
});
