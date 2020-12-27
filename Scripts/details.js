window.addEventListener('DOMContentLoaded', (event) => {
  const id = new URLSearchParams(window.location.search).get('id');

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US`;

  function getDetails(data) {
    // POSTERS
    const backgroundImg = [];
    backgroundImg.push(data.poster_path);
    const img = document.createElement('IMG');
    const image = document.createElement('IMG');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w300${backgroundImg[0]}`);
    image.setAttribute('src', `https://image.tmdb.org/t/p/w300${backgroundImg[0]}`);
    document.querySelector('.wrapper').appendChild(img);
    img.classList.add('background-img');
    document.querySelector('.poster').appendChild(image);
    // Title
    const movieName = [];
    movieName.push(data.title);
    const name = document.createElement('P');
    const mName = document.createTextNode(`${movieName[0]}`);
    name.appendChild(mName);
    name.classList.add('title-of-movie');
    document.querySelector('.movie-title').appendChild(name);
    // RUNTIME and release date
    const duration = [];
    duration.push(data.release_date);
    duration.push(data.runtime);
    const run = document.createElement('P');
    const play = document.createElement('P');
    const dateAndTime = document.createTextNode(`${duration[0]}`);
    const time = document.createTextNode(`${duration[1]} MINS`);
    run.appendChild(dateAndTime);
    play.appendChild(time);
    document.querySelector('.movie-duration').appendChild(run);
    document.querySelector('.movie-duration').appendChild(play);
    // OVERVIEW
    const details = [];
    details.push(data.overview);
    const overview = document.createElement('P');
    const movieDetails = document.createTextNode(`${details[0]}`);
    overview.appendChild(movieDetails);
    document.querySelector('.movie-details').appendChild(overview);
    // GENRES
    const genre = [];
    genre.push(data.genres);
    for (let i = 0; i < genre[0].length; i += 1) {
      const genreName = document.createElement('SPAN');
      const genreType = document.createTextNode(`${genre[0][i].name}`);
      genreName.appendChild(genreType);
      document.querySelector('.genre').appendChild(genreName);
    }
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getDetails(data);
    });
});
