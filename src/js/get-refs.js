export default function getRefs() {
    return {
        select: document.querySelector('.breed-select'),
        loader: document.querySelector('.loader'),
        error: document.querySelector('.error'),
        container: document.querySelector('.cat-info'),
    }
}