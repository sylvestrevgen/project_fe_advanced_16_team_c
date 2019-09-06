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
const libBtnSection = document.querySelector('.section__library--btn');
const arrow = document.querySelector('.arrow');

// changed Andrey
const header = document.querySelector('.page-header');
// changed Andrey -END

const libBtns = {
  watchBtn: document.querySelector('[data-action="lib-watch-button"]'), // btn watch
  queueBtn: document.querySelector('[data-action="lib-queue-button"]'), // btn queue
};

function activeHomePage(){
  libBtnSection.classList.add('hidden');
  homePage.classList.remove('hidden');
  detail.classList.add('hidden');
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.add('hidden');
  
  linkHome.classList.add('link-active');
  linkLibrary.classList.remove('link-active');

  // changed Andrey
  refs.pagePlaginationContainer.removeEventListener('click', plaginationNavigation);
  pageBeginOptions();
  inputValue = '';
  // changed Andrey -END

  fetchPopularMoviesList();

  prev.addEventListener('click', plaginationNavigation);
  next.addEventListener('click', plaginationNavigation);

  linkHome.removeEventListener('click', activeHomePage);
  linkLibrary.addEventListener('click', activeLibraryPage);

};

function activeLibraryPage(){
  libBtnSection.classList.remove('hidden');
  homePage.classList.add('hidden');
  detail.classList.add('hidden');

  linkHome.classList.remove('link-active');
  linkLibrary.classList.add('link-active');

  showPageWatch();

  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);

  linkLibrary.removeEventListener('click', activeLibraryPage);
  linkHome.addEventListener('click', activeHomePage);
};

function showPageWatch(){
  libraryWatched.classList.remove('hidden');
  libraryQueue.classList.add('hidden');
  libBtnSection.classList.remove('hidden');
  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);
  drawWatchedFilmList();
};

function showPageQueue(){
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.remove('hidden');
  libBtnSection.classList.remove('hidden');
  libBtns.watchBtn.addEventListener('click', showPageWatch);
  libBtns.queueBtn.removeEventListener('click', showPageQueue);
  drawQueueFilmList();
};

function activeDetailsPage(movieId, itsLibraryFilm) {

  try {
    homePage.classList.add('hidden'); // HIDE - homePage
    detail.classList.remove('hidden'); // ACTIVE - detail
    libBtnSection.classList.add('hidden'); // HIDE - libBtnSection
    libraryWatched.classList.add('hidden'); // HIDE - libraryWatched
    libraryQueue.classList.add('hidden'); // HIDE - libraryQueue

    // changed Andrey || moviId --> Number(moviId)
    if (itsLibraryFilm) {
      let filmsArr = JSON.parse(localStorage.getItem('filmsQueue'));

      selectFilm = filmsArr.find(filmObj => filmObj.id === Number(movieId));

      if (selectFilm === undefined) {
        filmsArr = JSON.parse(localStorage.getItem('filmsWatched'));
        selectFilm = filmsArr.find(el => el.id === Number(movieId));
      }
      showDetails(selectFilm);
    } else {
      let array = renderFilms;
      selectFilm = array.find(el => el.id === Number(movieId));
      showDetails(selectFilm);
    }
    // changed Andrey -END

    AddToWatch.addEventListener('click', toggleToWatched);
    AddToQueue.addEventListener('click', toggleToQueue);

    // changed Andrey
    linkLibrary.addEventListener('click', activeLibraryPage);
    // changed Andrey -END
    
    detail.removeEventListener('click', activeDetailsPage);

  } catch (error) {
    console.log('activeDetailsPage', error);
  }
};

// changed Andrey
function arrowUp() {
  if(window.pageYOffset > 0) {
    window.scrollBy(0, -80);
  setTimeout(() =>arrowUp(), 20)
  }
}

function arrowUpShow() {
  setTimeout(() => {
    if(window.pageYOffset > 65) {
      arrow.classList.remove('hidden')
    } else if(window.pageYOffset <= 65) {
      arrow.classList.add('hidden')
    }
  }, 300);
}
// changed Andrey -END

linkHome.addEventListener('click', activeHomePage); // link home page
logo.addEventListener('click', activeHomePage); // logo home page
linkLibrary.addEventListener('click', activeLibraryPage); // link library page

arrow.addEventListener('click', arrowUp);

// changed Andrey
addEventListener('scroll', arrowUpShow);
// changed Andrey -END