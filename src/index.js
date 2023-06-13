import { CatAPI } from "./js/cat-api";
import getRefs from "./js/get-refs";

const refs = getRefs();
const myCat = new CatAPI();

enableElement(refs.loader)

myCat.fetchBreeds()
    .then((res) => {
        addSelectOptions(res)
        enableElement(refs.select)
    })
    .catch((err) => {
        console.log(`Error cought = ` + err)
        enableElement(refs.error)
    })
    .finally(() => {
        disableElement(refs.loader)
    })

refs.select.addEventListener('change', onChange)

function onChange(e) {
    enableElement(refs.loader)
    myCat.fetchCatByBreed(e.target.value)
    .then(picture => {
        refs.container.innerHTML = myCat.createMarkup(picture[0]);
    })
        .catch((err) => {
            console.log(`Error cought = ` + err)
            enableElement(refs.error)
        })
    .finally(()=> disableElement(refs.loader))
}    

function addSelectOptions(array) {
    refs.select.innerHTML = '<option value="">Select option...</option>';
    array.forEach(obj => {
        const option = document.createElement('option');
        option.value = obj.id;
        option.textContent = obj.name;
        refs.select.appendChild(option);
    });

    /************************ */
    const option = document.createElement('option');
    option.value = 'asdfghjkl';
    option.textContent = 'Wrong option'
    refs.select.appendChild(option);
    /************************ */
}

function disableElement(element) {
    element.classList.add('disable-js');
}

function enableElement(element) {
    element.classList.remove('disable-js');
}