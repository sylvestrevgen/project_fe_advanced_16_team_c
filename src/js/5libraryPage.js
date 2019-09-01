//-----Добавляем селекторы (классы) объектов библиотеки в переменные-----//

const libQueueClass = "library-queue";                   //section
const libWatchedClass = "library-watched";               //section

const libFilmsContainerClass = "__films-container";       //ul
const libFilmClass = "__films-container--film";           //li
const libFilmImgClass = "__films-container--film-img";    //img
const libFilmNameClass = "__films-container--film-name";  //p-name
const libFilmRateClass = "__films-container--film-rate";  //p-rate

//-----Ищем контейнеры для списка фильмов-----\\

const libQueueFilmsContainer = document.querySelector('.library-queue__films-container');
const libWatchedFilmsContainer = document.querySelector('.library-watched__films-container');

//-------Функции-------\\

//--------Слушатель на ul-------------------\\

libQueueFilmsContainer.addEventListener('click', addLibUlListener);
libWatchedFilmsContainer.addEventListener('click', addLibUlListener);

function addLibUlListener(event) {
  const target = event.target;
  if(target.nodeName === "LI"){
    activeDetailsPage(target.dataset.id, true);
  }
  if(target.nodeName === "IMG"){
    activeDetailsPage(target.parentNode.dataset.id, true);
  }
};

//-------Создать карточку библиотечного фильма------------\\

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  
  const li = document.createElement('li');
  const img = document.createElement('img');
  const pTitle = document.createElement('p');
  const pRate = document.createElement('p');

  li.dataset.id = movieId;
  img.src = imgPath;
  pTitle.textContent = filmTitle;
  pRate.textContent = voteAverage;

  li.appendChild(img);
  li.appendChild(pTitle);
  li.appendChild(pRate);

  return li;
}//createLibraryCardFunc

//-----Отрисовать список фильмов, которые в очереди просмотра-----//

function drawQueueFilmList() {
  
  let filmsQueue = JSON.parse(localStorage.getItem("filmsQueue"));
  libQueueFilmsContainer.innerHTML = '';
  
  if(filmsQueue.length !== 0 && filmsQueue !== "") {

    filmsQueue.forEach(film => {
      let liQueue = createLibraryCardFunc(film.poster_path, film.title, film.id, film.vote_average);
      addClassesForLibListLi("library-watched", liQueue);
      libQueueFilmsContainer.appendChild(liQueue);
    });
  }
  else {
    libQueueFilmsContainer.innerHTML = "You don't have queue movies to watch. Add them.";
  }
  libBtns.queueButton.classList.remove('link-active');
  libBtns.watchButton.classList.add('link-active');
}//drawQueueFilmList

//-----Отрисовать список фильмов, которые уже просмотрены-----//

function drawWatchedFilmList() {
  
  let filmsW = JSON.parse(localStorage.getItem("filmsWatched"));
  libWatchedFilmsContainer.innerHTML = '';
  
  if(filmsW.length !== 0 && filmsW !== "") {
    
    filmsW.forEach(film => {
      let liW = createLibraryCardFunc(film.imgPath, film.filmTitle, film.movieId, film.voteAverage);
      addClassesForLibListLi("library-queue", liW);
      libWatchedFilmsContainer.appendChild(liW);
    });
  }
  else {
    libWatchedFilmsContainer.innerHTML = "You haven't watched any movies. Add them.";
  }
  libBtns.queueBtn.classList.add('link-active');
  libBtns.watchBtn.classList.remove('link-active');
}//drawWatchedFilmList

//-----Добавить селекторы (классы) каждому "__films-container--film"элементу карточки фильма-----//

function addClassesForLibListLi(libClass, li) {

  li.classList.add(libClass + "__films-container--film");

  const img = li.querySelector('img');
  img.classList.add(libClass + "__films-container--film-img");

  const p = li.querySelectorAll('p');
  p[0].classlist.add(libClass + "__films-container--film-name");
  p[1].classList.add(libClass + "__films-container--film-rate");
}
