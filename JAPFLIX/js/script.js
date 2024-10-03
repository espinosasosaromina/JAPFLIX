
let movies = [];
const lista = document.getElementById('lista');

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
            mostrarPeliculas(movies);  //muestra todas las peliss
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
        resultados = movies;//sino se filtra que muestre todas las pelis
    }

    mostrarPeliculas(resultados);//muestra las filtradas sino todas
});