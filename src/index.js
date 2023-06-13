import { CatAPI } from "./js/cat-api";
import getRefs from "./js/get-refs";
import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = getRefs();
const myCat = new CatAPI();
let select;

disableElement(refs.select);
enableElement(refs.loader);

myCat.fetchBreeds()
    .then(fillSelect)
    .catch(handleError)
    .finally(handleFinally)
        
function fillSelect(r) {
    select = new SlimSelect({
        select: refs.select,
        settings: {
            showSearch: false,
        },
        events: {
            beforeChange: onChange,
        },
    })
    
    select.setData(addSelectOptions(r))
}

function onChange(e) {
    enableElement(refs.loader);
    refs.container.innerHTML = '';

    myCat.fetchCatByBreed(e[0].value)
        .then(catInfo => {
            refs.container.innerHTML = myCat.createMarkup(catInfo[0]);
        })
        .catch(handleError)
        .finally(handleFinally)
}    

function addSelectOptions(array) {
    const optionsArray = [];
    optionsArray.push({
        ['text']: 'Choose one of...',
        ['value']: '',
        ['disabled']: true,
        ['display']: false,

    })
    array.forEach(obj => {
        const pair = {
            ['text']: obj.name,
            ['value']: obj.id,
        };
        optionsArray.push(pair);
    });
    return optionsArray;
}

function disableElement(element) {
    element.classList.add('disable-js');
}

function enableElement(element) {
    element.classList.remove('disable-js');
}

function handleError(err) {
    select.destroy();
    Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Reload!',
        function () {
            window.location.reload();
        }
    );
    console.log('Error caught: ' + err);
}

function handleFinally() {
    disableElement(refs.loader);
} 