const poster = document.querySelector('film__list--img');
const title = document.querySelector('film__name');
const vote_average = document.querySelector('film--vote');
const popularity = document.querySelector('film--popularity');
const original_title = document.querySelector('film--or_title');
const genre = document.querySelector('film--genre');
const description = document.querySelector('film__about--description')

const monitorButtonStatusText = () => {
  try {

    const filmsQueueCheck = localStorage.get('filmsQueue');
    let filmsQueueCheckParse = JSON.parse(filmsQueueCheck);
    if (filmsQueueCheckParse) {
      refs.queueButton.textContent = 'Delete from queue';
      refs.queueButton.classList('button-toggle');
    } else {
      refs.queueButton.textContent = 'Add to queue';
      refs.queueButton.classList('button-queue');
    }

    const filmsWatchedCheck = localStorage.get('filmsWatched');
    const filmsWatchedCheckParse = JSON.parse(filmsWatchedCheck);
    if (filmsWatchedCheckParse) {
      refs.watchButton.textContent = 'Delete from watched';
      refs.watchButton.classList('button-toggle');
    } else {
      refs.watchButton.textContent = 'Add to watch';
      refs.queueButton.classList('button-watch');
    }

  } catch (error) {
    console.error(error)
  }
}

const toggleToQueue = () => {
  let queueArr = [];
  try {
    const queuedFilms = localStorage.getItem('filmsQueue');
    const queuedFilmsParsed = JSON.parse(queuedFilms);
    if (queuedFilmsParsed) {
      queueArr = [...queuedFilmsParsed];
    }
    if (queueArr.includes(selectFilm)) {
      queueArr = queueArr.filter(film => film !== selectFilm);
    } else {
      queueArr.push(selectFilm);
    }
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
  } catch (error) {
    console.error(error);
  }

  monitorButtonStatusText();
}

const toggleToWatched = () => {
  let watchedArr = [];
  try {
    const watchedFilms = localStorage.getItem('filmsWatched');
    const watchedFilmsParsed = JSON.parse(watchedFilms);
    if (watchedFilmsParsed) {
      watchedArr = [...watchedFilmsParsed];
    }
    if (watchedArr.includes(selectFilm)) {
      watchedArr = watchedArr.filter(film => film !== selectFilm);
    } else {
      watchedArr.push(selectFilm);
    }
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
  } catch (error) {
    console.error(error);
  }
  monitorButtonStatusText();

}

const showDetails = selectFilm => {

  poster.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;
  title.textContent = selectFilm.title;
  vote_average.textContent = selectFilm.vote_average;
  popularity.textContent = selectFilm.popularity;
  original_title.textContent = selectFilm.original_title;

  const ids = [...selectFilm.genre_ids];

  const actuallyGenresArr = genres.map(genre => {
    if (ids.includes(genre.id)) {
      return genre.name;
    };
  });

  const actuallyGenresStr = actuallyGenresArr.join(', ');

  genre.textContent = actuallyGenresStr;

  description.textContent = selectFilm.overview;

  monitorButtonStatusText();
}