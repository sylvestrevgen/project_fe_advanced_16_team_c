//import { selectFilm  } from "./3navigation";

// const refs = {
//   watchButton: document.querySelector('button[data-action="watch-button"]'),
//   queueButton: document.querySelector('button[data-action="queue-button"]')
// }



const monitorButtonStatusText = ( filmsQueue, filmsWatched ) => {
  try{
    const filmsQueueCheck = localStorage.get(filmsQueue);
    const filmsQueueCheckParse = JSON.parse(filmsQueueCheck) ? null : refs.queueButton.textContent = 'Delete from queue';

    const filmsWatchedCheck = localStorage.get(filmsWatched);
    const filmsWatchedCheckParse = JSON.parse(filmsWatchedCheck) ? null : refs.watchButton.textContent = 'Delete from watched';
    
    // if(filmsQueueCheck){
    //   refs.queueButton.textContent = 'Delete from queue';
    // }else{

    // }
    // const filmsWatchedCheck = localStorage.get(filmsWatched);
    // if(filmsWatchedCheck){
    //   refs.watchButton.textContent = 'Delete from watched'
    // }
    
  }catch(error){
    console.error(error)
  }
  
  // if(getKey){
  //   refs.watchButton.textContent = 'Delete from queue';
  // }
}

const toggleToQueue = (filmsQueue, selectFilm) => {
  let queueArr = [];
  try {
    const queuedFilms = localStorage.getItem(filmsQueue);
    const queuedFilmsParsed = JSON.parse(queuedFilms);
    if (queuedFilmsParsed) {
      queueArr = [...queuedFilmsParsed];
    }
    if (queueArr.includes(selectFilm)) {
      queueArr = queueArr.filter(film => film !== selectFilm);
    } else {
      queueArr.push(selectFilm);
    }
    localStorage.setItem(filmsQueue, JSON.stringify(queueArr));
  } catch (error) {
    console.error(error);
  }

  monitorButtonStatusText();
}

const toggleToWatched = (filmsWatched, selectFilm) => {
  let watchedArr = [];
  try {
    const watchedFilms = localStorage.getItem(filmsWatched);
    const watchedFilmsParsed = JSON.parse(watchedFilms);
    if (watchedFilmsParsed) {
      watchedArr = [...watchedFilmsParsed];
    }
    if (watchedArr.includes(selectFilm)) {
      watchedArr = watchedArr.filter(film => film !== selectFilm);
    } else {
      watchedArr.push(selectFilm);
    }
    localStorage.setItem(filmsWatched, JSON.stringify(watchedArr));
  } catch (error) {
    console.error(error);
  }
  monitorButtonStatusText();

}


const showDetails = selectFilm => {
  // запустить monitorButtonStatusText
}

