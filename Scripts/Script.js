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
            dots: false,
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
  const topId = [];
  const topTitle = [];
  const topAvg = [];
  const topPoster = [];
  const topRelease = [];
  function getTopRated(data) {
    for (let i = 0; i < data.results.length; i += 1) {
      topId.push(data.results[i].id);
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
      const anchor = document.createElement('A');
      anchor.setAttribute('href', `movie.html?id=${topId[i]}`);
      anchor.classList.add('movie-title');
      const title = document.createElement('P');
      const movieName = document.createTextNode(`${topTitle[i]}`);
      title.appendChild(movieName);
      anchor.appendChild(title);
      div.appendChild(anchor);
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

  const search = document.querySelector('.hidden-header-search');
  const element = document.querySelector('.hidden-search-icon');
  const search2 = document.querySelector('#search2');
  element.addEventListener('click', event => {
    search.classList.add('mobile-search');
    search2.style.display = 'initial';
    element.style.display = 'none';
  });

  search2.addEventListener('click', event => {
    search.classList.remove('mobile-search');
    element.style.display = 'initial';
    search2.style.display = 'none';
  })

  const list = document.querySelector('.header-list');
  const hamburger = document.querySelector('.hamburger');
  const hamburger2 = document.querySelector('#hamburger2');
  hamburger.addEventListener('click', event => {
    list.classList.add('header-list-shown');
    hamburger2.style.display = 'initial';
    hamburger.style.display = 'none';
  })

  hamburger2.addEventListener('click', event => {
    list.classList.remove('header-list-shown');
    hamburger.style.display = 'initial';
    hamburger2.style.display = 'none';
  })
});
