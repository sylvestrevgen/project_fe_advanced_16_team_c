const poster = document.querySelector('.film__list--img');
const title = document.querySelector('.film__name');
const vote_average = document.querySelector('.film--vote');
const popularity = document.querySelector('.film--popularity');
const original_title = document.querySelector('.film--or_title');
const genre = document.querySelector('.film--genre');
const description = document.querySelector('.film__about--description')

// const monitorButtonStatusText = () => {
//   try {

//     const filmsQueueCheck = localStorage.getItem('filmsQueue');
//     let filmsQueueCheckParse = JSON.parse(filmsQueueCheck);
//     if (filmsQueueCheckParse.title  === event.target.title) {
//       libBtns.queueBtn.textContent = 'Delete from queue';
//       libBtns.queueBtn.classList.toggle('button-toggle');
//     } else {
//       libBtns.queueBtn.textContent = 'Add to queue';
//       libBtns.queueBtn.classList.toggle('button-queue');
//     }

//     const filmsWatchedCheck = localStorage.getItem('filmsWatched');
//     const filmsWatchedCheckParse = JSON.parse(filmsWatchedCheck);
//     if (filmsWatchedCheckParse) {
//       libBtns.watchBtn.textContent = 'Delete from watched';
//       libBtns.watchBtn.classList.toggle('button-toggle');
//       libBtns.watchBtn.classList.toggle('button-watch');

//     } else {
//       libBtns.watchBtn.textContent = 'Add to watch';
//       libBtns.watchBtn.classList.toggle('button-watch');
//     }

//   } catch (error) {
//     console.error(error)
//   }
// }

// const toggleToQueue = () => {
//   let queueArr = [];
//   try {
//     const queuedFilms = localStorage.getItem('filmsQueue');
//     const queuedFilmsParsed = JSON.parse(queuedFilms);
//     if (queuedFilmsParsed) {
//       queueArr = [...queuedFilmsParsed];
//     }
//     if (queueArr.includes(selectFilm)) {
//       queueArr = queueArr.filter(film => film !== selectFilm);
//     } else {
//       queueArr.push(selectFilm);
//     }
//     localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
//   } catch (error) {
//     console.error(error);
//   }

//   monitorButtonStatusText();
// }

// const toggleToWatched = () => {
//   let watchedArr = [];
//   try {
//     const watchedFilms = localStorage.getItem("filmsWatched");
//     const watchedFilmsParsed = JSON.parse(watchedFilms);
//     if (watchedFilmsParsed) {
//       watchedArr = watchedFilmsParsed;
//     }
//     if (watchedArr.includes(selectFilm)) {
//       watchedArr = watchedArr.filter(film => film !== selectFilm);
//     } else {
//       watchedArr.push(selectFilm);
//       localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
//     }
//     // console.log("pc", watchedArr);
//     // localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
//   } catch (error) {
//     console.error(error);
//   }
//   monitorButtonStatusText();

// }

// const showDetails = selectFilm => {

//   poster.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;
//   title.textContent = selectFilm.title;
//   vote_average.textContent = selectFilm.vote_average;
//   popularity.textContent = selectFilm.popularity;
//   original_title.textContent = selectFilm.original_title;

//   const ids = [...selectFilm.genre_ids];

//   const actuallyGenresArr = genres.filter(genre => ids.includes(genre.id));
  
//   const actuallyGenresNames = actuallyGenresArr.map(genre => genre.name);

//   const actuallyGenresStr = actuallyGenresNames.join(', ');

//   genre.textContent = actuallyGenresStr;

//   description.textContent = selectFilm.overview;

//   monitorButtonStatusText();
// }

function toggleToQueue() {
  let filmsQueueArr = [];
  let localStorageData = localStorage.getItem('filmsQueue');
  if (localStorageData !== null) {
    filmsQueueArr.push(...JSON.parse(localStorageData));
  }
  if (filmsQueueArr.find(el => el.id === selectFilm.id)) {
    filmsQueueArr = filmsQueueArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsQueueArr.push(selectFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
  monitorButtonStatusText();
};

function toggleToWatched() {
  let filmsWatchedArr = [];
  let localStorageData = localStorage.getItem('filmsWatched');
  if (localStorageData !== null) {
    filmsWatchedArr.push(...JSON.parse(localStorageData));
  }
  if (filmsWatchedArr.find(el => el.id === selectFilm.id)) {
    filmsWatchedArr = filmsWatchedArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsWatchedArr.push(selectFilm);
  }
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
  monitorButtonStatusText();
};

const showDetails = selectFilm => {

  poster.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;
  title.textContent = selectFilm.title;
  vote_average.textContent = selectFilm.vote_average;
  popularity.textContent = selectFilm.popularity;
  original_title.textContent = selectFilm.original_title;

  const ids = [...selectFilm.genre_ids];

  const actuallyGenresArr = genres.filter(genre => ids.includes(genre.id));
  
  const actuallyGenresNames = actuallyGenresArr.map(genre => genre.name);

  const actuallyGenresStr = actuallyGenresNames.join(', ');

  genre.textContent = actuallyGenresStr;

  description.textContent = selectFilm.overview;

  monitorButtonStatusText();
}

function monitorButtonStatusText() {
  let localStorageFilmsQueue = localStorage.getItem('filmsQueue');
  localStorageFilmsQueue === null ? AddToQueue.textContent = "Add to queue" : JSON.parse(localStorageFilmsQueue).find(el => el.id === selectFilm.id) ? AddToQueue.textContent = "Delete from queue" : AddToQueue.textContent = "Add to queue";

  let localStorageFilmsWatched = localStorage.getItem('filmsWatched');
  localStorageFilmsWatched === null ? AddToWatch.textContent = "Add to watched" : JSON.parse(localStorageFilmsWatched).find(el => el.id === selectFilm.id) ? AddToWatch.textContent = "Delete from watched" : AddToWatch.textContent = "Add to watched";
}