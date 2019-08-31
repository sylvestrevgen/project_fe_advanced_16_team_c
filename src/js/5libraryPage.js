//-----Добавляем селекторы (классы) объектов библиотеки в переменные-----//

const libQueueClass = ".library-queue";                   //section
const libWatchedClass = ".library-watched";               //section

const libFilmsContainerClass = "__films-container";       //ul
const libFilmClass = "__films-container--film";           //li
const libFilmImgClass = "__films-container--film-img";    //img
const libFilmNameClass = "__films-container--film-name";  //p-name
const libFilmRateClass = "__films-container--film-rate";  //p-rate

//-------Ищем контейнеры для списка фильмов-------//

const libQueueFilmsContainer = document.querySelector(librQueueClass + libFilmsContainerClass);
const libWatchedFilmsContainer = document.querySelector(libWatchedClass + libFilmsContainerClass);

//-------Функции-------//

//-------Создать карточку библиотечного фильма------------//

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  
  const li = document.createElement('li');
  const img = document.createElement('img');
  const pTitle = document.createElement('p');
  const pRate = document.createElement('p');

  img.src = imgPath;
  pTitle.textContent = filmTitle;
  pRate.textContent = voteAverage;

  li.addEventListener('click', (event) => activeDetailsPage(movieId, true) );
  li.appendChild(img);
  li.appendChild(pName);
  li.appendChild(pRate);

  return li;
}//createLibraryCardFunc

//-----Отрисовать список фильмов, которые в очереди просмотра-----//

function drawQueueFilmList() {
  
  let filmsQ = JSON.parse(localStorage.getItem("filmsQueue"));
  libQueueFilmsContainer.innerHTML = '';
  
  if(filmsQ.length !== 0 && filmsQ !== "") {

    filmsQ.forEach(film => {
      let liQ = createLibraryCardFunc(film.imgPath, film.filmTitle, film.movieId, film.voteAverage);
      addClassesForLibListLi(libQueueClass, liQ);
      libQueueFilmsContainer.appendChild(liQ);
    });
  }
  else {
    libQueueFilmsContainer.innerHTML = "You don't have queue movies to watch. Add them.";
  }
  refs.queueButton.active = false;
  refs.watchButton.active = true;
}//drawQueueFilmList

//-----Отрисовать список фильмов, которые уже просмотрены-----//

function drawWatchedFilmList() {
  
  let filmsW = JSON.parse(localStorage.getItem("filmsWatched"));
  libWatchedFilmsContainer.innerHTML = '';
  
  if(filmsW.length !== 0 && filmsW !== "") {
    
    filmsW.forEach(film => {
      let liW = createLibraryCardFunc(film.imgPath, film.filmTitle, film.movieId, film.voteAverage);
      addClassesForLibListLi(libWachedClass, liW);
      libWatchedFilmsContainer.appendChild(liW);
    });
  }
  else {
    libWatchedFilmsContainer.innerHTML = "You haven't watched any movies. Add them.";
  }
  refs.queueButton.active = true;
  refs.watchButton.active = false;
}//drawWatchedFilmList

//-----Добавить селекторы (классы) каждому элементу карточки фильма-----//

function addClassesForLibListLi(libClass, li) {

  li.classList.add(libClass + libFilmClass);

  const img = li.querySelector('img');
  img.classList.add(libClass + libFilmImgClass);

  const p = li.querySelectorAll('p');
  p[0].classlist.add(libClass + libFilmNameClass);
  p[1].classList.add(libClass + libFilmRateClass);
}
