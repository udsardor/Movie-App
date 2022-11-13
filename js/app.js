window.addEventListener("DOMContentLoaded", () => {
  // Swipper
let swiper = new Swiper(".popular-content", {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    510: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    758: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }
});

// APIs

const API_KEY = '80bd6ae7-63fc-4756-9a69-a0f37595d632';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(API_URL_POPULAR);

async function getMovies(url){
const resp = await fetch(url, {
  headers: {
    "Content-type": "application/json",
    "X-API-KEY": API_KEY
  }
})
const respData = await resp.json()
showMovies(respData)
showMoviesAll(respData)
}


function showMovies(data){
  const moviesEl = document.querySelector(".swiper-wrapper")
  data.films.forEach(movie => {
      const movieEl = document.createElement("div")
      movieEl.classList.add("swipper-slide")
      movie.rating > 6 ? 
      movieEl.innerHTML = `
        <div class="swiper-slide">
          <div class="movie-box">
              <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie-box-img">
              <div class="box-text">
                  <h2 class="movie-title">${movie.nameEn ? movie.nameEn : movie.nameRu}</h2>
                  <span class="movie-type">${movie.genres.map(
                    (genre) => `${genre.genre}`
                  )}</span>
                  <a href="#" class="watch-btn play-btn">
                      <i class="bx bx-right-arrow"></i>
                  </a>
              </div>
          </div>
        </div>
      ` : ""
      moviesEl.appendChild(movieEl)
  });
  
}

function showMoviesAll(data){
const moviesEl = document.querySelector("section.movies")
data.films.forEach(movie => {
    const movieEl = document.createElement("div")
    movieEl.classList.add("movies-content")
    movieEl.innerHTML = `
    <div class="movie-box">
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie-box-img">
        <div class="box-text">
            <h2 class="movie-title">${movie.nameRu}</h2>
            <span class="movie-type">${movie.genres.map(
              (genre) => `${genre.genre}`
              )}</span>
            <a href="play-page.html" class="watch-btn play-btn">
                <i class="bx bx-right-arrow"></i>
            </a>
        </div>
      </div>
      
    `
    moviesEl.appendChild(movieEl)
});

}
})