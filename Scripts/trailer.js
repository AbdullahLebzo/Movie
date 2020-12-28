window.addEventListener('DOMContentLoaded', (event) => {
  const id = new URLSearchParams(window.location.search).get('id');
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US`;

  function getTrailer(data) {
    const trailerKey = [];
    const key = data.results.filter((name) => name.type == 'Trailer');
    trailerKey.push(key[0].key);
    console.log(trailerKey);
    const frame = document.createElement('IFRAME');
    frame.setAttribute('src', `https://www.youtube.com/embed/${trailerKey[0]}`);
    frame.setAttribute('width', '561');
    frame.setAttribute('height', '408');
    frame.setAttribute('allowfullscreen', '');
    frame.classList.add('video');
    document.querySelector('.trailer').appendChild(frame);
  }
  document.querySelector('.trailer-icon').addEventListener('click', event => {
    document.querySelector('.video').style.display = 'initial';
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getTrailer(data);
    });
});

{ /* <iframe width="561" height="408" src="https://www.youtube.com/embed/K_tLp7T6U1c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */ }
