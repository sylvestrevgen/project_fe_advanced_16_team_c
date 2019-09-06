'use strict';

const list = document.querySelector('.main__block');
let renderFilms;
let genres;
let pageNumber = 1;

const createCardFunc = function (imgPath, filmTitle, movieId) {
    const listItem = document.createElement('li');
    const wrapperBlock = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const overlay = document.createElement('div');
    listItem.classList.add('film__block');
    wrapperBlock.classList.add('film__block--wrapper');
    p.classList.add('film__block--name');
    overlay.classList.add('overlay');
    listItem.dataset.id = movieId;

    // changed Andrey
    img.classList.add('film__block--img')
    if(imgPath){
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`);
    } else {
        imgPath = '../images/image-not-found.png';
        img.setAttribute('src', `${imgPath}`);
        img.classList.remove('film__block--img');
        img.classList.add('film__block--img-not-find');
    }
    // changed Andrey -END

    img.setAttribute('alt', filmTitle);
    p.textContent = `${filmTitle}`;
    listItem.append(wrapperBlock);
    wrapperBlock.append(img);
    wrapperBlock.append(p);
    wrapperBlock.append(overlay);
    listItem.addEventListener('click', e => activeDetailsPage(movieId, false));
    return listItem;
}

const fetchPopularMoviesList = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US&page=${pageNumber}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        })
        .then(data => {
            list.innerHTML = '';
            const popular = data.results;
            const filmList = popular.map(el => {
                return createCardFunc(el.backdrop_path, el.title, el.id)
            });
            list.append(...filmList);
            renderFilms = popular;
        })
        .catch(error => console.log(error));
}

const fetchGenres = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        })
        .then(data => {
            const genresArr = data.genres;
            genres = genresArr;
        })
        .catch(error => console.log(error));
}

fetchPopularMoviesList();
fetchGenres();