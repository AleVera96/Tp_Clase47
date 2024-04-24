window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');


if (movieId) {
  fetch(`http://localhost:3031/api/movies/${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(movie => {
        const idInput = document.querySelector('input[name="id"]');
        const titleInput = document.querySelector('input[name="title"]');
        const ratingInput = document.querySelector('input[name="rating"]');
        const awardsInput = document.querySelector('input[name="awards"]');
        const releaseDateInput = document.querySelector('input[name="release_date"]');
        const lengthInput = document.querySelector('input[name="length"]');

        if (idInput) idInput.value = movie.data.id;
        if (titleInput) titleInput.value = movie.data.title;
        if (ratingInput) ratingInput.value = movie.data.rating;
        if (awardsInput) awardsInput.value = movie.data.awards;
        if (releaseDateInput) releaseDateInput.value = movie.data.release_date;
        if (lengthInput) lengthInput.value = movie.data.length;
    
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });
}

document.querySelector('.formulario').addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const movieId = formData.get('id');
  
    fetch(`http://localhost:3031/api/movies/update/${movieId}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert('Película modificada exitosamente');
    
        window.location.href = 'home.html';
      })
      .catch(error => {
        console.error('Error updating movie:', error);
      });
  });


  document.querySelector('.formulario').addEventListener('submit', event => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
  
    fetch('http://localhost:3031/api/movies/create', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert('Película creada exitosamente');
    
        window.location.href = 'home.html';
      })
      .catch(error => {
        console.error('Error creating movie:', error);
      });
  });
}