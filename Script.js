window.addEventListener('DOMContentLoaded', (event) => {
  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US&page=1')
    .then((response) => response.json())
    .then((data) => {
      getTopRated(data);
    });

  const topTitle = [];
  const topAvg = [];
  const topPoster = [];
  const topRelease = [];

  function getTopRated(data) {
    for (let i = 0; i < 5; i += 1) {
      topTitle.push(data.results[i].original_title);
      topAvg.push(data.results[i].vote_average);
      topPoster.push(data.results[i].poster_path);
      topRelease.push(data.results[i].release_date);
    }
    // Append movies
    for (let i = 0; i < 5; i += 1) {
      const div = document.createElement('DIV');
      //   append rating
      const rating = document.createElement('SPAN');
      const movieRating = document.createTextNode(`${topAvg[i]}`);
      rating.appendChild(movieRating);
      div.appendChild(rating);
      //   append poster
      const poster = document.createElement('IMG');
      poster.setAttribute('src', `https://image.tmdb.org/t/p/w185${topPoster[i]}`);
      div.appendChild(poster);
      //   append title
      const title = document.createElement('P');
      const movieName = document.createTextNode(`${topTitle[i]}`);
      title.appendChild(movieName);
      div.appendChild(title);
      //   append release date
      const relDate = document.createElement('SPAN');
      const date = document.createTextNode(`${topRelease[i]}`);
      relDate.appendChild(date);
      div.appendChild(relDate);
      document.querySelector('.top-movies').appendChild(div);
      console.log(poster);
    }
  }

  console.log(topTitle);
  console.log(topAvg);
  console.log(topPoster);
  console.log(topRelease);
});
