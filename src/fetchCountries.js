import Notiflix from 'notiflix';

function fetchCountries(name) {
    return fetch(
        `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    ).then((responce) => {
        if (!responce.ok) {
            throw new Error(
                Notiflix.Notify.failure('Oops, there is no country with that name')
            );
        }
        return responce.json()
    });
}


export { fetchCountries };