let config = {
    'ime_prezime': {
        required: true,
        minlength: 3,
        maxlength: 50
    },

    'korisnicko_ime': {
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },

    'broj_telefona': {
        required: false, //moze a i ne mora da se stavlja ako nije required
        minlength: 9,
        maxlength: 13
    },

    'lozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponovi_lozinku'
    },

    'ponovi_lozinku': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'lozinka'
    },

    'postanski_broj': {
        required: true,
        maxnumbers: 5,
        characters: 'numbers'
    }
};

let validator = new Validator(config); //u zagradi pisemo config da primi config sa script.js