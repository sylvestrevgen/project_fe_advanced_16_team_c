'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var list = document.querySelector('.main__block');
var renderFilms;
var genres;
var pageNumber = 1;

var createCardFunc = function createCardFunc(imgPath, filmTitle, movieId) {
  var listItem = document.createElement('li');
  var wrapperBlock = document.createElement('div');
  var img = document.createElement('img');
  var p = document.createElement('p');
  var overlay = document.createElement('div');
  listItem.classList.add('film__block');
  wrapperBlock.classList.add('film__block--wrapper');
  p.classList.add('film__block--name');
  overlay.classList.add('overlay');
  listItem.dataset.id = movieId; // changed Andrey

  img.classList.add('film__block--img');

  if (imgPath) {
    img.setAttribute('src', "https://image.tmdb.org/t/p/w500/".concat(imgPath));
  } else {
    imgPath = '../images/image-not-found.png';
    img.setAttribute('src', "".concat(imgPath));
    img.classList.remove('film__block--img');
    img.classList.add('film__block--img-not-find');
  } // changed Andrey -END


  img.setAttribute('alt', filmTitle);
  p.textContent = "".concat(filmTitle);
  listItem.append(wrapperBlock);
  wrapperBlock.append(img);
  wrapperBlock.append(p);
  wrapperBlock.append(overlay);
  listItem.addEventListener('click', function (e) {
    return activeDetailsPage(movieId, false);
  });
  return listItem;
};

var fetchPopularMoviesList = function fetchPopularMoviesList() {
  fetch("https://api.themoviedb.org/3/movie/popular?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US&page=".concat(pageNumber)).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  }).then(function (data) {
    list.innerHTML = '';
    var popular = data.results;
    var filmList = popular.map(function (el) {
      return createCardFunc(el.backdrop_path, el.title, el.id);
    });
    list.append.apply(list, _toConsumableArray(filmList));
    renderFilms = popular;
  })["catch"](function (error) {
    return console.log(error);
  });
};

var fetchGenres = function fetchGenres() {
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US").then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  }).then(function (data) {
    var genresArr = data.genres;
    genres = genresArr;
  })["catch"](function (error) {
    return console.log(error);
  });
};

fetchPopularMoviesList();
fetchGenres();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var inputValue;
var refs = {
  formSearch: document.querySelector('form.form__search'),
  btnPrev: document.querySelector('.plaginator__btn--prev'),
  btnNext: document.querySelector('.plaginator__btn--next'),
  pageContainer: document.querySelector('ul.main__block'),
  searchErrMessage: document.querySelector('.form__error--paragraf'),
  pagePlaginationContainer: document.querySelector('.plaginator__container'),
  pageNumber: document.querySelector('[data-info="page-number-box"]')
};

var fetchFilms = function fetchFilms() {
  fetch("https://api.themoviedb.org/3/search/movie?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US&page=".concat(pageNumber, "&query=").concat(inputValue, "&include_adult=false")).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Error fetching');
  }).then(function (responsObj) {
    var _refs$pageContainer;

    var filmsArr = responsObj.results;
    var filmsListArr = filmsArr.map(function (filmObj) {
      return createCardFunc(filmObj.backdrop_path, filmObj.title, filmObj.id);
    });
    refs.pageContainer.innerHTML = '';

    (_refs$pageContainer = refs.pageContainer).append.apply(_refs$pageContainer, _toConsumableArray(filmsListArr));

    renderFilms = filmsArr;
  })["catch"](function (err) {
    refs.searchErrMessage.classList.toggle('hidden');
    refs.searchErrMessage.textContent = err;
  });
};

var pageBeginOptions = function pageBeginOptions() {
  pageNumber = 1;
  refs.pageNumber.textContent = pageNumber;
  refs.btnPrev.classList.add('plaginator__btn--opacity');
};

var changePage = function changePage(requestFunc) {
  requestFunc();
  setTimeout(function () {
    window.scrollBy(0, -8000);
    refs.pageNumber.textContent = pageNumber;
  }, 0);
};

var searchFilms = function searchFilms() {
  event.preventDefault();
  inputValue = document.querySelector('.form__search .form__input').value;
  fetchFilms();
  pageBeginOptions();
  refs.formSearch.reset();
};

var plaginationNavigation = function plaginationNavigation(event) {
  if (event.target.dataset.action === 'button-prev') {
    if (pageNumber <= 1) {
      refs.btnPrev.classList.add('plaginator__btn--opacity');
      return;
    }

    ;
    pageNumber -= 1;

    if (inputValue) {
      changePage(fetchFilms);
    } else {
      inputValue = '';
      changePage(fetchPopularMoviesList);
    }

    if (pageNumber <= 1) {
      refs.btnPrev.classList.add('plaginator__btn--opacity');
      return;
    }

    ;
  }

  if (event.target.dataset.action === 'button-next') {
    pageNumber += 1;
    setTimeout(function () {
      return refs.btnPrev.classList.remove('plaginator__btn--opacity');
    }, 300);

    if (inputValue) {
      changePage(fetchFilms);
    } else {
      inputValue = '';
      changePage(fetchPopularMoviesList);
    }
  }
};

refs.pageNumber.textContent = pageNumber;
refs.btnPrev.classList.add('plaginator__btn--opacity'); // handlers

refs.formSearch.addEventListener('submit', searchFilms);
refs.pagePlaginationContainer.addEventListener('click', plaginationNavigation); // handlers -END
"use strict";

var selectFilm;
var logo = document.querySelector('.logo-home'); // logo

var linkHome = document.querySelector('.link-home'); // link-home

var linkLibrary = document.querySelector('.link-library'); // link-library

var homePage = document.querySelector('.home-page'); // (home page)

var prev = document.querySelector('.plaginator__btn--prev'); // prev

var next = document.querySelector('.plaginator__btn--next'); // next

var libraryWatched = document.querySelector('.library-watched'); // (watched page)

var libraryQueue = document.querySelector('.library-queue'); // (queue page)

var detail = document.querySelector('.film__container'); // (detali page)

var AddToWatch = document.querySelector('.button-watch'); // button AddToWatch

var AddToQueue = document.querySelector('.button-queue'); // button AddToQueue

var libBtnSection = document.querySelector('.section__library--btn');
var arrow = document.querySelector('.arrow'); // changed Andrey

var header = document.querySelector('.page-header'); // changed Andrey -END

var libBtns = {
  watchBtn: document.querySelector('[data-action="lib-watch-button"]'),
  // btn watch
  queueBtn: document.querySelector('[data-action="lib-queue-button"]') // btn queue

};
var footerWord = document.querySelector('.footer-word'); // link on developers

var pageDevelopers = document.querySelector('.page-developers'); // page with page developers

function activeHomePage() {
  libBtnSection.classList.add('hidden');
  homePage.classList.remove('hidden');
  detail.classList.add('hidden');
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.add('hidden');
  pageDevelopers.classList.add('hidden');
  linkHome.classList.add('link-active');
  linkLibrary.classList.remove('link-active'); // changed Andrey

  refs.pagePlaginationContainer.removeEventListener('click', plaginationNavigation);
  pageBeginOptions();
  inputValue = ''; // changed Andrey -END

  fetchPopularMoviesList();
  prev.addEventListener('click', plaginationNavigation);
  next.addEventListener('click', plaginationNavigation);
  linkHome.removeEventListener('click', activeHomePage);
  linkLibrary.addEventListener('click', activeLibraryPage);
}

;

function activeLibraryPage() {
  libBtnSection.classList.remove('hidden');
  homePage.classList.add('hidden');
  detail.classList.add('hidden');
  pageDevelopers.classList.add('hidden');
  linkHome.classList.remove('link-active');
  linkLibrary.classList.add('link-active');
  showPageWatch();
  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);
  linkLibrary.removeEventListener('click', activeLibraryPage);
  linkHome.addEventListener('click', activeHomePage);
}

;

function showPageWatch() {
  libraryWatched.classList.remove('hidden');
  libraryQueue.classList.add('hidden');
  libBtnSection.classList.remove('hidden');
  libBtns.watchBtn.removeEventListener('click', showPageWatch);
  libBtns.queueBtn.addEventListener('click', showPageQueue);
  pageDevelopers.classList.add('hidden');
  drawWatchedFilmList();
}

;

function showPageQueue() {
  libraryWatched.classList.add('hidden');
  libraryQueue.classList.remove('hidden');
  libBtnSection.classList.remove('hidden');
  libBtns.watchBtn.addEventListener('click', showPageWatch);
  libBtns.queueBtn.removeEventListener('click', showPageQueue);
  pageDevelopers.classList.add('hidden');
  drawQueueFilmList();
}

;

function activeDetailsPage(movieId, itsLibraryFilm) {
  try {
    homePage.classList.add('hidden'); // HIDE - homePage

    detail.classList.remove('hidden'); // ACTIVE - detail

    libBtnSection.classList.add('hidden'); // HIDE - libBtnSection

    libraryWatched.classList.add('hidden'); // HIDE - libraryWatched

    libraryQueue.classList.add('hidden'); // HIDE - libraryQueue

    pageDevelopers.classList.add('hidden'); // changed Andrey || moviId --> Number(moviId)

    if (itsLibraryFilm) {
      var filmsArr = JSON.parse(localStorage.getItem('filmsQueue'));
      selectFilm = filmsArr.find(function (filmObj) {
        return filmObj.id === Number(movieId);
      });

      if (selectFilm === undefined) {
        filmsArr = JSON.parse(localStorage.getItem('filmsWatched'));
        selectFilm = filmsArr.find(function (el) {
          return el.id === Number(movieId);
        });
      }

      showDetails(selectFilm);
    } else {
      var array = renderFilms;
      selectFilm = array.find(function (el) {
        return el.id === Number(movieId);
      });
      showDetails(selectFilm);
    } // changed Andrey -END


    AddToWatch.addEventListener('click', toggleToWatched);
    AddToQueue.addEventListener('click', toggleToQueue); // changed Andrey

    linkLibrary.addEventListener('click', activeLibraryPage); // changed Andrey -END

    detail.removeEventListener('click', activeDetailsPage);
  } catch (error) {
    console.log('activeDetailsPage', error);
  }
}

; // changed Andrey

function arrowUp() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(function () {
      return arrowUp();
    }, 20);
  }
}

function arrowUpShow() {
  setTimeout(function () {
    if (window.pageYOffset > 65) {
      arrow.classList.remove('hidden');
    } else if (window.pageYOffset <= 65) {
      arrow.classList.add('hidden');
    }
  }, 300);
} // changed Andrey -END


linkHome.addEventListener('click', activeHomePage); // link home page

logo.addEventListener('click', activeHomePage); // logo home page

linkLibrary.addEventListener('click', activeLibraryPage); // link library page

arrow.addEventListener('click', arrowUp); // changed Andrey

addEventListener('scroll', arrowUpShow); // changed Andrey -END

function showDevelopers() {
  homePage.classList.add('hidden'); // HIDE - homePage

  detail.classList.add('hidden'); // ACTIVE - detail

  libBtnSection.classList.add('hidden'); // HIDE - libBtnSection

  libraryWatched.classList.add('hidden'); // HIDE - libraryWatched

  libraryQueue.classList.add('hidden'); // HIDE - libraryQueue

  pageDevelopers.classList.remove('hidden');
  linkHome.addEventListener('click', activeHomePage); // link home page

  logo.addEventListener('click', activeHomePage); // logo home page

  linkLibrary.addEventListener('click', activeLibraryPage); // link library page

  linkLibrary.removeEventListener('click', showDevelopers);
}

footerWord.addEventListener('click', showDevelopers); // link footer
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var poster = document.querySelector('.film__list--img');
var title = document.querySelector('.film__name');
var vote_average = document.querySelector('.film--vote');
var popularity = document.querySelector('.film--popularity');
var original_title = document.querySelector('.film--or_title');
var genre = document.querySelector('.film--genre');
var description = document.querySelector('.film__about--description');

var monitorButtonStatusText = function monitorButtonStatusText() {
  try {
    var filmsQueueCheck = localStorage.getItem('filmsQueue'); // changed Andrey
    // if (filmsQueueCheck === null) {
    //   // AddToQueue.textContent = 'Add to queue';
    //   // AddToQueue.classList.add('button-queue')
    // } else 
    // changed Andrey -END

    if (JSON.parse(filmsQueueCheck).find(function (film) {
      return film.id === selectFilm.id;
    })) {
      AddToQueue.textContent = 'Delete from queue'; // AddToQueue.classList.toggle('button-toggle_q')
    } else {
      AddToQueue.textContent = 'Add to queue'; // AddToQueue.classList.add('button-queue')
    }

    var filmsWatchedCheck = localStorage.getItem('filmsWatched');

    if (filmsWatchedCheck === null) {
      AddToWatch.textContent = 'Add to watch';
    } else if (JSON.parse(filmsWatchedCheck).find(function (film) {
      return film.id === selectFilm.id;
    })) {
      AddToWatch.textContent = 'Delete from watched';
    } else {
      AddToWatch.textContent = 'Add to watch';
    }
  } catch (error) {
    console.error('monitorButtonStatusText', error);
  }
};

var toggleToQueue = function toggleToQueue() {
  var queueArr = [];

  try {
    var queuedFilms = localStorage.getItem('filmsQueue');

    if (queuedFilms !== null) {
      var _queueArr;

      (_queueArr = queueArr).push.apply(_queueArr, _toConsumableArray(JSON.parse(queuedFilms)));
    }

    if (queueArr.find(function (film) {
      return film.id === selectFilm.id;
    })) {
      queueArr = queueArr.filter(function (film) {
        return film.id !== selectFilm.id;
      });
    } else {
      queueArr.push(selectFilm);
    }

    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
    monitorButtonStatusText();
  } catch (error) {
    console.error('toggleToQueue', error);
  }
};

var toggleToWatched = function toggleToWatched() {
  try {
    var watchedArr = [];
    var watchedFilms = localStorage.getItem("filmsWatched");

    if (watchedFilms !== null) {
      var _watchedArr;

      (_watchedArr = watchedArr).push.apply(_watchedArr, _toConsumableArray(JSON.parse(watchedFilms)));
    }

    if (watchedArr.find(function (film) {
      return film.id === selectFilm.id;
    })) {
      watchedArr = watchedArr.filter(function (film) {
        return film.id !== selectFilm.id;
      });
    } else {
      watchedArr.push(selectFilm);
    }

    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
    monitorButtonStatusText();
  } catch (error) {
    console.error('toggleToWatched', error);
  }
};

var showDetails = function showDetails(selectFilm) {
  poster.src = "https://image.tmdb.org/t/p/w500".concat(selectFilm.poster_path);
  title.textContent = selectFilm.title;
  vote_average.textContent = selectFilm.vote_average;
  popularity.textContent = selectFilm.popularity;
  original_title.textContent = selectFilm.original_title;

  var ids = _toConsumableArray(selectFilm.genre_ids);

  var actuallyGenresArr = genres.filter(function (genre) {
    return ids.includes(genre.id);
  });
  var actuallyGenresNames = actuallyGenresArr.map(function (genre) {
    return genre.name;
  });
  var actuallyGenresStr = actuallyGenresNames.join(', ');
  genre.textContent = actuallyGenresStr;
  description.textContent = selectFilm.overview;
  monitorButtonStatusText();
};
"use strict";

//-----Добавляем селекторы (классы) объектов библиотеки в переменные-----//
var libQueueClass = "library-queue"; //section

var libWatchedClass = "library-watched"; //section

var libFilmsContainerClass = "__films-container"; //ul

var libFilmClass = "__films-container--film"; //li

var libFilmImgClass = "__films-container--film-img"; //img

var libFilmNameClass = "__films-container--film-name"; //p-name

var libFilmRateClass = "__films-container--film-rate"; //p-rate
//-----Ищем контейнеры для списка фильмов-----\\

var libQueueFilmsContainer = document.querySelector('.library-queue__films-container');
var libWatchedFilmsContainer = document.querySelector('.library-watched__films-container'); //-------Функции-------\\
//--------Слушатель на ul-------------------\\

libQueueFilmsContainer.addEventListener('click', addLibUlListener);
libWatchedFilmsContainer.addEventListener('click', addLibUlListener);

function addLibUlListener(event) {
  var target = event.target;

  if (target.nodeName === "LI") {
    activeDetailsPage(target.dataset.id, true);
  }

  if (target.nodeName === "IMG") {
    activeDetailsPage(target.parentNode.dataset.id, true);
  }
}

; //-------Создать карточку библиотечного фильма------------\\

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  var pTitle = document.createElement('p');
  var pRate = document.createElement('p');
  li.dataset.id = movieId;
  img.src = "https://image.tmdb.org/t/p/w500/".concat(imgPath);
  pTitle.textContent = filmTitle;
  pRate.textContent = voteAverage;
  li.appendChild(img);
  li.appendChild(pTitle);
  li.appendChild(pRate);
  return li;
} //createLibraryCardFunc
//-----Отрисовать список фильмов, которые в очереди просмотра-----//


function drawQueueFilmList() {
  var filmsJSON = localStorage.getItem("filmsQueue");
  var filmsParsed = JSON.parse(filmsJSON);
  libQueueFilmsContainer.innerHTML = '';

  if (filmsParsed !== [] && filmsParsed !== "" && filmsParsed !== null) {
    filmsParsed.forEach(function (film) {
      var li = createLibraryCardFunc(film.backdrop_path, film.title, film.id, film.vote_average);
      addClassesForLibListLi("library-watched", li);
      libQueueFilmsContainer.appendChild(li);
    });
  } else {
    libQueueFilmsContainer.innerHTML = "You don't have queue movies to watch. Add them.";
  }

  libBtns.queueBtn.classList.add('library__btn--active');
  libBtns.watchBtn.classList.remove('library__btn--active');
} //drawQueueFilmList
//-----Отрисовать список фильмов, которые уже просмотрены-----//


function drawWatchedFilmList() {
  var filmsJSON = localStorage.getItem("filmsWatched");
  var filmsParsed = JSON.parse(filmsJSON);
  libWatchedFilmsContainer.innerHTML = '';

  if (filmsParsed !== [] && filmsParsed !== "" && filmsParsed !== null) {
    filmsParsed.forEach(function (film) {
      var li = createLibraryCardFunc(film.backdrop_path, film.title, film.id, film.vote_average);
      addClassesForLibListLi("library-queue", li);
      libWatchedFilmsContainer.appendChild(li);
    });
  } else {
    libWatchedFilmsContainer.innerHTML = "You haven't watched any movies. Add them.";
  }

  libBtns.queueBtn.classList.remove('library__btn--active');
  libBtns.watchBtn.classList.add('library__btn--active');
} //drawWatchedFilmList
//-----Добавить селекторы (классы) каждому "__films-container--film"элементу карточки фильма-----//


function addClassesForLibListLi(libClass, li) {
  li.classList.add(libClass + "__films-container--film");
  var img = li.querySelector('img');
  img.classList.add(libClass + "__films-container--film-img");
  var p = li.querySelectorAll('p');
  p[0].classList.add(libClass + "__films-container--film-name");
  p[1].classList.add(libClass + "__films-container--film-rate");
}