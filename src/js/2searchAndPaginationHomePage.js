let inputValue;

const refs = {
    formSearch: document.querySelector('form.form__search'),
    btnPrev: document.querySelector('.plaginator__btn--prev'),
    btnNext: document.querySelector('.plaginator__btn--next'),
    pageContainer: document.querySelector('ul.main__block'),
    searchErrMessage: document.querySelector('.form__error--paragraf'),
    pagePlaginationContainer: document.querySelector('.plaginator__container'),
    pageNumber: document.querySelector('[data-info="page-number-box"]')
}

const fetchFilms = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=be5814d92900bfa53e515c0fd30f3d51&language=en-US&page=${pageNumber}&query=${inputValue}&include_adult=false`).then(response => {
        if(response.ok){
            return response.json();
        }

        throw new Error('Error fetching')
    })
    .then(responsObj => {
        const filmsArr = responsObj.results;
        const filmsListArr = filmsArr.map(filmObj => createCardFunc(filmObj.backdrop_path, filmObj.title, filmObj.id));
        refs.pageContainer.innerHTML = '';
        refs.pageContainer.append(...filmsListArr);
        renderFilms = filmsArr;
    })
    .catch(err => {
        refs.searchErrMessage.classList.toggle('hidden');
        refs.searchErrMessage.textContent = err;
    })
}

const searchFilms = () => {
    event.preventDefault();
    inputValue = document.querySelector('.form__search .form__input').value;
    fetchFilms();
    refs.formSearch.reset();
}

const plaginationNavigation = event => {
    if(event.target.dataset.action === 'button-prev'){
        if(pageNumber <= 1) {
            refs.btnPrev.classList.add('plaginator__btn--opacity');
            return
        };

        pageNumber -= 1;
        refs.pageNumber.textContent = pageNumber;

        if(inputValue) {
            fetchFilms();

        } else {
            fetchPopularMoviesList();
            inputValue = '';
        }
        
        if(pageNumber <= 1) {
            refs.btnPrev.classList.add('plaginator__btn--opacity');
            return
        };
    }

    if(event.target.dataset.action === 'button-next'){
        pageNumber += 1;
        refs.pageNumber.textContent = pageNumber;
        refs.btnPrev.classList.remove('plaginator__btn--opacity');

        if(inputValue) {
            fetchFilms()
        } else {
            fetchPopularMoviesList();
            inputValue = '';
        }
    }
}

refs.pageNumber.textContent = pageNumber;
refs.btnPrev.classList.add('plaginator__btn--opacity');

// handlers
refs.formSearch.addEventListener('submit', searchFilms);
refs.pagePlaginationContainer.addEventListener('click', plaginationNavigation);
// handlers -END