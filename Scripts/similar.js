window.addEventListener('DOMContentLoaded', (event) => {
  const id = new URLSearchParams(window.location.search).get('id');

  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US&page=1`

  $(() => {
    $('.similar').slick({
      dots: false,
      infinite: false,
      prevArrow: false,
      nextArrow: false,
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
    });
  });

  const simId = [];
  const simPoster = [];
  function getSimilar(data) {
    for (let i = 0; i < data.results.length; i += 1) {
      simId.push(data.results[i].id);
      simPoster.push(data.results[i].poster_path);
    }

    for (let i = 0; i < data.results.length; i += 1) {
      const link = document.createElement('A');
      const poster = document.createElement('IMG');
      poster.setAttribute('src', `https://image.tmdb.org/t/p/w185${simPoster[i]}`);
      link.setAttribute('href', `movie.html?id=${simId[i]}`);
      link.appendChild(poster);
      document.querySelector(`.similar${i}`).appendChild(link);
    }
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getSimilar(data);
    });




})