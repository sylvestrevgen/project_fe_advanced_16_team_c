let selectFilm;

const logo = document.querySelector('.logo-home'); // logo
const linkHome = document.querySelector('.link-home'); // link-home
const linkLibrary = document.querySelector('.link-library'); // link-library
const homePage = document.querySelector('.home-page'); // (home page)
const prev = document.querySelector('.plaginator__btn--prev'); // prev
const next = document.querySelector('.plaginator__btn--next'); // next
const libraryWatched = document.querySelector('.library-watched'); // (watched page)
const libraryQueue = document.querySelector('.library-queue'); // (queue page)
const detail = document.querySelector('.film__container'); // (detali page)
const AddToWatch = document.querySelector('.button-watch'); // button AddToWatch
const AddToQueue = document.querySelector('.button-queue'); // button AddToQueue
const arrow = document.querySelector('.arrow');
const sectionLibBtn = document.querySelector('.section__library--btn');

const libBtns = {
  watchBtn: document.querySelector('[data-action="watch-button"]'), // btn watch
  queueBtn: document.querySelector('[data-action="queue-button"]'), // btn queue
};

function activeHomePage(){
  sectionLibBtn.classList.add('hidden');
  homePage.classList.remove('hidden');
  detail.classList.add('hidden');
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.add('hidden');

  fetchPopularMoviesList();
  prev.addEventListener('click', plaginationNavigation);
  next.addEventListener('click', plaginationNavigation);

  homePage.removeEventListener('click', activeHomePage);
};

function activeLibraryPage(){
  sectionLibBtn.classList.remove('hidden');
  homePage.classList.add('hidden');
  detail.classList.add('hidden');

  showPageWatch();

  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);

  linkLibrary.removeEventListener('click', activeLibraryPage);
  homePage.addEventListener('click', activeHomePage);
};

function showPageWatch(){
  libraryWatched.classList.remove('hidden');
  libraryQueue.classList.add('hidden');
  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);
  drawWatchedFilmList();
};

function showPageQueue(){
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.remove('hidden');
  libBtns.watchBtn.addEventListener('click', showPageWatch);
  libBtns.queueBtn.removeEventListener('click', showPageQueue);
  drawQueueFilmList();
};

function activeDetailsPage(movieId, itsLibraryFilm) {
  try {
    homePage.classList.add('hidden');
    detail.classList.remove('hidden');
    libraryWatched.classList.add('hidden');
    libraryQueue.classList.add('hidden');

    if (itsLibraryFilm) {
      let array = JSON.parse(localStorage.getItem('filmsQueue'));
      selectFilm = array.find(el => el.id === movieId);
      if (selectFilm === undenfined) {
        array = JSON.parse(localStorage.getItem('filmsWatched'));
        selectFilm = array.find(el => el.id === movieId);
      }
      showDetails(selectFilm);
    } else {
      let array = renderFilms;
      selectFilm = array.find(el => el.id === movieId);
      showDetails(selectFilm);
    }

    AddToWatch.addEventListener('click', toggleToWatched);
    AddToQueue.addEventListener('click', toggleToQueue);

    detail.removeEventListener('click', activeDetailsPage);
  } catch (error) {
    console.log(error);
  }
};

function arrowUp() {
  window.scrollBy(0, -8000);
}

linkHome.addEventListener('click', activeHomePage); // link home page
logo.addEventListener('click', activeHomePage); // logo home page
linkLibrary.addEventListener('click', activeLibraryPage); // link library page

arrow.addEventListener('click', arrowUp);