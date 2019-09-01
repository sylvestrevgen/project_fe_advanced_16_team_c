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
  img.src = `https://image.tmdb.org/t/p/w500/${imgPath}`;
  pTitle.textContent = filmTitle;
  pRate.textContent = voteAverage;

  li.appendChild(img);
  li.appendChild(pTitle);
  li.appendChild(pRate);

  return li;
}//createLibraryCardFunc

//-----Отрисовать список фильмов, которые в очереди просмотра-----//

function drawQueueFilmList() {
  
  const filmsJSON = localStorage.getItem("filmsQueue")
  let filmsParsed = JSON.parse(filmsJSON);
  libQueueFilmsContainer.innerHTML = '';
  
  if(filmsParsed !== [] && filmsParsed !== "" && filmsParsed !== null) {

    filmsParsed.forEach(film => {
      let li = createLibraryCardFunc(film.backdrop_path, film.title, film.id, film.vote_average);
      addClassesForLibListLi("library-watched", li);
      libQueueFilmsContainer.appendChild(li);
    });
  }
  else {
    libQueueFilmsContainer.innerHTML = "You don't have queue movies to watch. Add them.";
  }
  libBtns.queueBtn.classList.remove('library__btn--active');
  libBtns.watchBtn.classList.add('library__btn--active');
}//drawQueueFilmList

//-----Отрисовать список фильмов, которые уже просмотрены-----//

function drawWatchedFilmList() {
  const filmsJSON = localStorage.getItem("filmsWatched")
  let filmsParsed = JSON.parse(filmsJSON);
  console.log(filmsParsed)
  libWatchedFilmsContainer.innerHTML = '';
  
  if(filmsParsed !== [] && filmsParsed !== "" && filmsParsed !== null) {
    
    filmsParsed.forEach(film => {
      let li = createLibraryCardFunc(film.backdrop_path, film.title, film.id, film.vote_average);
      addClassesForLibListLi("library-queue", li);
      libWatchedFilmsContainer.appendChild(li);
    });
  }
  else {
    libWatchedFilmsContainer.innerHTML = "You haven't watched any movies. Add them.";
  }
  libBtns.queueBtn.classList.add('library__btn--active');
  libBtns.watchBtn.classList.remove('library__btn--active');
}//drawWatchedFilmList

//-----Добавить селекторы (классы) каждому "__films-container--film"элементу карточки фильма-----//

function addClassesForLibListLi(libClass, li) {

  li.classList.add(libClass + "__films-container--film");

  const img = li.querySelector('img');
  img.classList.add(libClass + "__films-container--film-img");

  const p = li.querySelectorAll('p');
  p[0].classList.add(libClass + "__films-container--film-name");
  p[1].classList.add(libClass + "__films-container--film-rate");
}
