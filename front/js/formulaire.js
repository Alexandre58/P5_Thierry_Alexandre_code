//class for validation form
class Form {
    constructor() {
        this.firstName = document.getElementById('firstName').value;
        this.lastName = document.getElementById('lastName').value;
        this.adress = document.getElementById('address').value;
        this.city = document.getElementById('city').value;
        this.email = document.getElementById('email').value;
    }
}
export function userInputVerification() {
    const userForm = new Form();
    //verif name
    function firstNameValid() {
        const userFirstName = userForm.firstName;
        const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        if (
            /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(userFirstName)
        ) {
            firstNameErrorMsg.innerText = '';
            return true;
        } else {
            firstNameErrorMsg.innerText =
                'Votre prénom ne peut contenir que des lettres, de 3 à 20 caractères.';
        }
    }

    function lastNameValid() {
        const userLastName = userForm.lastName;
        const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        if (/^[A-Za-z]{2,20}$/.test(userLastName)) {
            lastNameErrorMsg.innerText = '';
            return true;
        } else {
            lastNameErrorMsg.innerText =
                'Votre nom ne peut contenir que des lettres, de 2 à 20 caractères.';
        }
    }

    function adressValid() {
        const userAdress = userForm.adress;
        const addressErrorMsg = document.getElementById('addressErrorMsg');
        if (/[^§]{5,50}$/.test(userAdress)) {
            addressErrorMsg.innerText = '';
            return true;
        } else {
            addressErrorMsg.innerText = "L'adresse semble incorrect.";
        }
    }

    function cityValid() {
        const userCity = userForm.city;
        const cityErrorMsg = document.getElementById('cityErrorMsg');
        if (/^(.){4,128}$/.test(userCity)) {
            cityErrorMsg.innerText = '';
            return true;
        } else {
            cityErrorMsg.innerText =
                'La ville ne peut contenir que des lettres, de 2 à 20 caractères.';
        }
    }

    function emailValid() {
        const userEmail = userForm.email;
        const emailErrorMsg = document.getElementById('emailErrorMsg');
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
            emailErrorMsg.innerText = '';
            return true;
        } else {
            emailErrorMsg.innerText =
                'Il faut renseigner une adresse email valide.';
        }
    }

    if (
        firstNameValid() &&
        lastNameValid() &&
        adressValid() &&
        cityValid() &&
        emailValid()
    ) {
        return true;
    } else {
        console.log('Unvalid form input.');
    }
}
//End form