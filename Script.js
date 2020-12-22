window.addEventListener('DOMContentLoaded', (event) => {
  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US&page=1')
    .then((response) => response.json())
    .then((data) => {
      getTopRated(data);
    });

  $(() => {
    $('.slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      prevArrow: '<span class="material-icons arrows priv-arrow">arrow_back</span>',
      nextArrow: '<span class="material-icons arrows next-arrow">arrow_forward</span>',
    });
  });

  const topTitle = [];
  const topAvg = [];
  const topPoster = [];
  const topRelease = [];

  function getTopRated(data) {
    for (let i = 0; i < data.results.length; i += 1) {
      topTitle.push(data.results[i].title);
      topAvg.push(data.results[i].vote_average);
      topPoster.push(data.results[i].poster_path);
      topRelease.push(data.results[i].release_date);
    }
    // Append movies
    for (let i = 0; i < data.results.length; i += 1) {
      const div = document.createElement('DIV');
      div.classList.add('items');
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
      //   append movie icon
      const movieIcon = document.createElement('SPAN');
      movieIcon.innerHtml = '<span class="material-icons">play_circle_outline</span>';
      movieIcon.classList.add('movie-icon');
      div.appendChild(movieIcon);
      //   append release date
      const relDate = document.createElement('SPAN');
      const date = document.createTextNode(`${topRelease[i]}`);
      relDate.appendChild(date);
      div.appendChild(relDate);
      div.firstChild.classList.add('ratings');
      div.lastChild.classList.add('rel-date');
      document.querySelector(`.slider-item${i}`).appendChild(div);
    }
  }

  // console.log(topTitle);
  // console.log(topAvg);
  // console.log(topPoster);
  // console.log(topRelease);
});
