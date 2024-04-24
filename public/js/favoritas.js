document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');

  // Obtener IDs de películas favoritas del localStorage
  const favoriteMovieIds = JSON.parse(localStorage.getItem('favorites')) || [];

  // Fetch para obtener todas las películas desde el servidor
  fetch('http://localhost:3031/api/movies')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const movies = data.data; // Obtener el array de películas

      // Filtrar las películas para obtener solo las favoritas
      const favoriteMoviesToShow = movies.filter(movie => favoriteMovieIds.includes(movie.id));

      // Verificar si hay películas favoritas para mostrar
      if (favoriteMoviesToShow.length > 0) {
        // Crear elementos HTML para mostrar las películas favoritas
        favoriteMoviesToShow.forEach(movie => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.textContent = movie.title;

          const pRating = document.createElement('p');
          pRating.textContent = `Rating: ${movie.rating}`;

          const duracion = document.createElement('p');
          duracion.textContent = `Duración: ${movie.length}`;

          const pGenero = document.createElement('p');
          pGenero.textContent = `Género: ${movie.genre ? movie.genre.name : 'Desconocido'}`;

          card.appendChild(h1);
          card.appendChild(pRating);
          card.appendChild(duracion);
          card.appendChild(pGenero);

          container.appendChild(card);
        });
      } else {
        // Mostrar mensaje si no hay películas favoritas
        const message = document.createElement('p');
        message.textContent = 'Aún no tienes películas favoritas.';
        container.appendChild(message);
      }
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
    const clearFavoritesButton = document.createElement('button');
    clearFavoritesButton.textContent = 'Limpiar Películas Favoritas';
    container.appendChild(clearFavoritesButton);
    clearFavoritesButton.addEventListener('click', () => {
      localStorage.removeItem('favorites'); // Eliminar las películas favoritas del localStorage
      container.innerHTML = ''; // Limpiar el contenido del contenedor
      const message = document.createElement('p');
      message.textContent = 'Todas las películas favoritas han sido eliminadas.';
      window.location.href = 'home.html';
      container.appendChild(message);
    });
  
  
});