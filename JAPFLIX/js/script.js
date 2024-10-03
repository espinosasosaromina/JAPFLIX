let movies = [];
const lista = document.getElementById('lista');

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
        })
        .catch(error => console.log('Error al cargar las películas:', error));
});


document.getElementById('btnBuscar').addEventListener('click', () => {
    const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
    lista.innerHTML = '';  //limpia la list

    let resultados;

    if (inputBuscar) {
        resultados = movies.filter(pelicula =>
            pelicula.title.toLowerCase().includes(inputBuscar) ||
            pelicula.tagline.toLowerCase().includes(inputBuscar) ||
            pelicula.genres.some(genero => genero.name.toLowerCase().includes(inputBuscar))
        );
    } else {
        resultados = movies;//sino se filtra que muestra todas las pelis
    }

    mostrarPeliculas(resultados);//muestra las filtradas sino todas
});


function mostrarPeliculas(listaPeliculas) {
    listaPeliculas.forEach(pelicula => {
        const itemLista = document.createElement('li');
        itemLista.className = "list-group-item bg-dark text-light";
        itemLista.innerHTML = `
            <h5>${pelicula.title}</h5>
            <p>${pelicula.tagline}</p>
            <p>Rating: ${generarEstrellas(pelicula.vote_average)}</p>
        `;
        lista.appendChild(itemLista);
        itemLista.addEventListener('click', () => { //evento click para mostrar detalles
            mostrarDetalles(pelicula);
        });
    });
}

function generarEstrellas(voto) {
    const estrellasTotales = 5;
    const estrellas = Math.round(voto / 2); //trate de mapear la calificacion de 0 a 10 a un rango de estrella de 0 a 5
    let estrellasHtml = '';

    for (let i = 1; i <= estrellasTotales; i++) {
        if (i <= estrellas) {
            estrellasHtml += '<span class="fa fa-star checked"></span>';  //estrella llena
        } else {
            estrellasHtml += '<span class="fa fa-star"></span>';  //estrella vacia
        }
    }
    return estrellasHtml;
}


function mostrarDetalles(pelicula) {//muestra lo detalles de las pelis
    document.getElementById('movieTitle').textContent = pelicula.title;
    document.getElementById('movieOverview').textContent = pelicula.overview;
    document.getElementById('movieGenres').textContent = pelicula.genres.map(genero => genero.name).join(' - ');
    document.getElementById('movieReleaseYear').textContent = `Year: ${pelicula.release_date.split('-')[0]}`;
    document.getElementById('movieDuration').textContent = `Runtime: ${pelicula.runtime} minutos`;
    document.getElementById('movieBudget').textContent = `Budget: $${pelicula.budget}`;
    document.getElementById('movieRevenue').textContent = `Revenue: $${pelicula.revenue}`;

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('movieDetails'));
    offcanvas.show();
}