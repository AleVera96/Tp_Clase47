window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Realizar la solicitud fetch para obtener datos de películas
  fetch('http://localhost:3031/api/movies')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data = data.data
      data.forEach(movie => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
      
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
      
        const pRating = document.createElement("p");
        pRating.textContent = `Rating: ${movie.rating}`;
      
        const pDuration = document.createElement("p");
        pDuration.textContent = `Duración: ${movie.length}`;
      
        const pGenre = document.createElement("p");
        pGenre.textContent = `Género: ${movie.genre ? movie.genre.name : 'Desconocido'}`;
      
        const starIcon = document.createElement("span");
        starIcon.setAttribute("class", "favorite-icon");
        starIcon.innerHTML = "&#9734;";
      
        // Agregar evento click para guardar la película favorita
        starIcon.addEventListener("click", () => {
          // Guardar el ID de la película en localStorage al hacer clic en la estrella
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          if (!favorites.includes(movie.id)) {
            favorites.push(movie.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`¡"${movie.title}" agregada a favoritos!`);
            window.location.href = 'home.html';
          } else {
            alert(`¡"${movie.title}" ya está en favoritos!`);
          }
        });
      
        card.appendChild(h1);
        card.appendChild(pRating);
        card.appendChild(pDuration);
        card.appendChild(pGenre);
        card.appendChild(starIcon);
      
        container.appendChild(card);
      });

      // Actualizar dinámicamente el botón de "Mis Películas Favoritas"
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoritesButton = document.createElement('button');
      favoritesButton.setAttribute('id', 'favorites-button');
      favoritesButton.textContent = 'Mis Películas Favoritas';
      favoritesButton.style.cssText = "position: absolute; top: 14%; right: 45%; background-color: gold; color: black; display: none;";
      
      if (favorites.length > 0) {
        favoritesButton.style.display = 'block';
      }
      
      favoritesButton.addEventListener('click', () => {
        window.location.href = 'favoritas.html';
      });

      app.appendChild(favoritesButton);

    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
};