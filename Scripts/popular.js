window.addEventListener('DOMContentLoaded', (event) => {
  let pageNum = 1;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US&page=${pageNum}`;

  

  function getPopular(data) {
  	const popId = [];
    const title = [];
    const avg = [];
    const poster = [];
    const release = [];
    for (let i = 0; i < data.results.length; i += 1) {
    	popId.push(data.results[i].id);
      title.push(data.results[i].title);
      avg.push(data.results[i].vote_average);
      poster.push(data.results[i].poster_path);
      release.push(data.results[i].release_date);
    }
    // Append movies
    for (let i = 0; i < data.results.length; i += 1) {
      const div = document.createElement('DIV');
      div.classList.add('popular-items');
      //   append rating
      const rating = document.createElement('SPAN');
      const movieRating = document.createTextNode(`${avg[i]}`);
      rating.appendChild(movieRating);
      div.appendChild(rating);
      //   append poster
      const moviePoster = document.createElement('IMG');
      moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w185${poster[i]}`);
      div.appendChild(moviePoster);
      //   append title
      const anchor = document.createElement('A');
      anchor.setAttribute('href', `movie.html?id=${popId[i]}`);
      anchor.classList.add('movie-title');
      const movieTitle = document.createElement('P');
      const movieName = document.createTextNode(`${title[i]}`);
      movieTitle.appendChild(movieName);
      anchor.appendChild(movieTitle);
      div.appendChild(anchor);
      //   append movie icon
      const movieIcon = document.createElement('SPAN');
      movieIcon.innerHtml = '<span class="material-icons">play_circle_outline</span>';
      movieIcon.classList.add('movie-icon');
      div.appendChild(movieIcon);
      //   append release date
      const relDate = document.createElement('SPAN');
      const date = document.createTextNode(`${release[i]}`);
      relDate.appendChild(date);
      div.appendChild(relDate);
      if (`${avg[i]}` < 7) {
        div.firstChild.classList.add('low-ratings');
      } else {
      	div.firstChild.classList.add('ratings');
      }
      div.lastChild.classList.add('rel-date');
      document.querySelector('.popular').appendChild(div);
    }
    pageNum++;
  }

	fetch(url)
    	.then((response) => response.json())
    	.then((data) => {
     	 getPopular(data);
   	 });

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US&page=${pageNum}`)
        .then((response) => response.json())
        .then((data) => {
          getPopular(data);
        });
    }
  });
});
