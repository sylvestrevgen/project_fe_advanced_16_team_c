const poster = document.querySelector('.film__list--img');
const title = document.querySelector('.film__name');
const vote_average = document.querySelector('.film--vote');
const popularity = document.querySelector('.film--popularity');
const original_title = document.querySelector('.film--or_title');
const genre = document.querySelector('.film--genre');
const description = document.querySelector('.film__about--description')

const monitorButtonStatusText = () => {
  try {

    const filmsQueueCheck = localStorage.getItem('filmsQueue');
    
    // changed Andrey

    // if (filmsQueueCheck === null) {
    //   // AddToQueue.textContent = 'Add to queue';
    //   // AddToQueue.classList.add('button-queue')
    // } else 
        // changed Andrey -END
        
    if(JSON.parse(filmsQueueCheck).find(film => film.id === selectFilm.id)) {
      AddToQueue.textContent = 'Delete from queue';
      // AddToQueue.classList.toggle('button-toggle_q')
    }else{
      AddToQueue.textContent = 'Add to queue';
      // AddToQueue.classList.add('button-queue')
    }

    const filmsWatchedCheck = localStorage.getItem('filmsWatched');
  
    if (filmsWatchedCheck === null) {
      AddToWatch.textContent = 'Add to watch';
    } else if(JSON.parse(filmsWatchedCheck).find(film=> film.id === selectFilm.id)) {
      AddToWatch.textContent = 'Delete from watched';
    }else{
      AddToWatch.textContent = 'Add to watch';
    }
  } catch (error) {
    console.error('monitorButtonStatusText', error)
  }
}


const toggleToQueue = () => {

  let queueArr = [];
  try {
    const queuedFilms = localStorage.getItem('filmsQueue');
   
    if (queuedFilms !==null) {
      queueArr.push(...JSON.parse(queuedFilms));
    } 
    if (queueArr.find(film => film.id === selectFilm.id)) {
      queueArr = queueArr.filter(film => film.id !== selectFilm.id);
    } else {
      queueArr.push(selectFilm);
    }
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
    monitorButtonStatusText();
  } catch (error) {
    console.error('toggleToQueue', error);
  }
}

const toggleToWatched = () => {

  try {
    let watchedArr = [];
    let watchedFilms = localStorage.getItem("filmsWatched");

    if (watchedFilms !== null) {
      watchedArr.push(...JSON.parse(watchedFilms));
    }
    if (watchedArr.find(film => film.id === selectFilm.id)) {
      watchedArr = watchedArr.filter(film => film.id !== selectFilm.id);
    } else {
      watchedArr.push(selectFilm);
    }
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
    monitorButtonStatusText();
  } catch (error) {
    console.error('toggleToWatched',error);
  }
}

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
