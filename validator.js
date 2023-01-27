class Validator { 
    constructor(config) { // u zagradi pisemo config da primi config sa script.js
        this.elementsConfig = config; // config ubacujemo u elementsConfig
        this.errors = {}; // prazan objekat za greske
        
        this.generateErrorObject(); // funkcija koja ce se dole ispod napraviti
        this.inputListener(); // listener kada nesto napisemo da dobijemo povratnu informaciju, dole kreiramo
    }

    generateErrorObject() { // u class-i ne mora se stavljati function ispred kreiranja funkcije
        for(let field in this.elementsConfig) {
            this.errors[field] = []; // za svako polje pravimo u objektu da ima niz, objekat je napravljen od svakog polja, a za svako polje [] imamo prazan niz u koji cemo smjestiti greske

        }
    }
    inputListener() {
        let inputSelector = this.elementsConfig; // elementsConfig uzimamo zato sto su u njega upisani svi nazivi ovih polja, pa cemo preko petlje proci kroz sve nazive polja i da napravimo listener za svaku od njih
        for (let field in inputSelector) {
            let el = document.querySelector(`input[name="${field}"]`);

            el.addEventListener('input', this.validate.bind(this)); // input nije naziv html taga nego event listener kao click, scroll itd. Validate je funkcija koja ce da validira inpute
        }
    }

    // gore smo je ubacili u this.validate.bind pa je ovdje sada kreiramo. validate je glavna funkcija u ovoj class-i. "e" nam je za element koji smo kada upisemo u prazno polje znali koje je to polje u koje je nesto upisano. Za to smo koristili bind(this) gore.
    validate(e) {
        let elFields = this.elementsConfig; // uzimamo sva polja

        let field = e.target; // uzimamo trenutno polje u koje smo nesto upisali, njega validiramo
        let fieldName = field.getAttribute('name'); // uzimamo od trenutnog polja field name
        let fieldValue = field.value; // od trenutnog polja uzimamo value

        this.errors[fieldName] = []; // this.errors je gore upisano na pocetku, i tu cemo upisati greske(errors) za svaki field name, ako imamo error

        if(elFields[fieldName].required) { //required smo podesili u config u script.js, kasnije cemo tako pisati minlength, maxlength itd
        if(fieldValue === '') { // ako je polje prazno, onda cemo da napisemo gresku
            this.errors[field.fieldName].push('Polje je prazno'); // [field.fieldName] tacno za polje tj field name koji nam treba
        }
    } 

        if(elFields[fieldName].email) { // da vidimo da li je polje e-mail (u script.js u config email: true;)
            if(!this.validateEmail(fieldValue)) { //validateEmail funkciju pravimo tek dole. !this znaci ako je NETACNO
                this.errors[fieldName].push('Neispravna email adresa');
            }
        }
        // ako je vrijednost polja koji su upisali manje od minlength to ce biti greska, a isto tako ne smije biti vec od max. || znaci ili
        if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) { 
            this.errors[fieldName].push(`Polje mora imati minimalno ${elFields[fieldName].minlength} i maksimalno ${elFields[fieldName].maxlength} karaktera`);
        }
        if(elFields[fieldName].matching) { // validacija da li se lozinke poklapaju
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"`);
            if(fieldValue !== matchingEl.value) { // !== znaci razlicito od necega. Ako je razlicito od onog elementa od onog kojeg smo stavili da se poklapa onda je to greska
                this.errors[fieldName].push(`Lozinke se ne poklapaju`);
            } 
            if(this.errors[fieldName].length === 0) { // da bi sprijecili konflikte da se stalno jedan sa drugim uporedjuju
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            } 
        }

        if(fieldValue.length > elFields[fieldName].maxnumbers) {
            this.errors[fieldName].push(`Polje moze imati maksimalno ${elFields[fieldName].maxnumbers} brojeva`);
        }

        if(!this.validateZipCode(fieldValue)) {
            this.errors[fieldName].push('Postanski broj moze da sadrzi samo brojeve')
        }

        this.populateErrors(this.errors); // na kraju treba da ispisemo greske, kad zavrsi validacija odredjenog polja greska se treba ispisati 
    }

    
    populateErrors(errors) {
        for(const elem of document.querySelectorAll('ul')) { // uzimamo listu i brisemo 
            elem.remove();
        }
      for(let key of Object.keys(errors)) { // prolazimo kroz greske
        let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);
        
        errors[key].forEach(error => { //sada ispisujemo sve greske ovog ul
            let li = document.createElement('li');
            li.innerText = error;
            
            errorsElement.appendChild(li)
        });
      }
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return (true)
    }
        return false;
}

    validateZipCode(postanski_broj) {
        if (/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(postanski_broj)) {
            return (true)
        }
        return false;
    }
}