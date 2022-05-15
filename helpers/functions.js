import localforage from 'localforage';
export const saveNotes = (notes) => {
    localforage.setItem('notes', notes).then(function (value) {
        console.log(value);
    }).catch(function(err) {
        console.log(err);
    });
}
export const loadNotes = () => {
    let data = [];
    localforage.getItem('notes').then(function(value) {
    data = value;

    }).catch(function(err) {
        console.log(err);
        data = [];
    });
    const result =  data || [];
    console.log(result);
    return result;
}
