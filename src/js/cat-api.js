export { CatAPI };

class CatAPI {
    static API_URL = 'https://api.thecatapi.com/v1';
    static API_KEY = 'live_GYGgMcHHNkd9gW51QzpeWfE9IqgKu8oK27C2IYbrtfbBWKvcPJoAJlK0Ig0chd0L';
    static option = {
        headers:
        {
            'x-api-key': CatAPI.API_KEY,
        }
    };

    fetchBreeds() {
        const url = `${CatAPI.API_URL}/breeds`
        return fetch(url, CatAPI.option)
            .then(result => {   
                return result.json()
            })
            .finally()
    }

    fetchCatByBreed(breedId) {
        const url = `${CatAPI.API_URL}/images/search?breed_ids=${breedId}`;
        return fetch(url, CatAPI.option)
            .then(result => {
                return result.json()
            })
            .finally()
    }

    createMarkup(obj) {
        return `
      <div class="cat-info__image-thumb">
        <img
          class="cat-info__image"
          width="300px"
          src="${obj.url}"
          alt="${obj.breeds[0].name} cat"
        />
      </div>

      <div class="cat-info__info-thumb">
        <h2 class="cat-info__title">${obj.breeds[0].name}</h2>
        <p class="cat-info__description">
          ${obj.breeds[0].description}
        </p>
        <p class="cat-info__temperament"><span class="cat-info__temperament--bold">Temperament:</span> ${obj.breeds[0].temperament}</p>
      </div>`
    }
}