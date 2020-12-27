window.addEventListener('DOMContentLoaded', (event) => {
  const id = new URLSearchParams(window.location.search).get('id');
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=00a40d32da148e834ad60e85aa769f38&language=en-US`;

  function getCast(data) {
    const actors = [];
    const actorName = data.cast.filter((name) => name.known_for_department == 'Acting');
    actors.push(actorName);
    for (let i = 0; i < 3; i += 1) {
      const name = document.createElement('SPAN');
      const actName = document.createTextNode(actors[0][i].name);
      name.appendChild(actName);
      document.querySelector('.stars').appendChild(name);
    }
    const director = [];
    const dirName = data.crew.filter((name) => name.job == 'Director');
    director.push(dirName);
    for (let i = 0; i < director.length; i += 1) {
      const name = document.createElement('SPAN');
      const directorName = document.createTextNode(director[0][i].name);
      name.appendChild(directorName);
      document.querySelector('.director').appendChild(name);
    }
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getCast(data);
    });
});
