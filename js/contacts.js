let contacts = [];
let letters = [];
let contactsRandomColor;
let lastSelectedContact;
let firstname;
let ID;
let mediaQuery = window.matchMedia("(max-width: 1050px)");
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function setItemContacts(contacts) {
    await setItem('contacts', JSON.stringify(contacts));
}

async function pushFirstLetter() {
    await loadContacts();
    letters = [];
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i]['firstname'];
        const firstLetter = name.charAt(0);

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

    // Sortiere das letters-Array alphabetisch
    letters.sort(function (a, b) {
        var letterA = a.toLowerCase();
        var letterB = b.toLowerCase();
        if (letterA < letterB) {
            return -1;
        }
        if (letterA > letterB) {
            return 1;
        }
        return 0;
    });
    renderLetters();
    createRandomColor();
}

function renderLetters() {
    let contactsList = document.getElementById('contact-list');
    contactsList.innerHTML = '';
    for (let j = 0; j < letters.length; j++) {
        const letter = letters[j];
        contactsList.innerHTML +=/*html*/`
        <div id="${letter}" class="flex-column width-500">
            <div class="first-letter">${letter}</div>
        </div>`;
        renderContacts(letter)
    }
}

async function renderContacts(id) {
    let letterBox = document.getElementById(`${id}`);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstName = contact['firstname'];
        const lastName = contact['lastname'];
        if (firstName.startsWith(id)) {
            letterBox.innerHTML += singleContactBoxTemplate(i, id, contact, firstName, lastName)
        }
    }
}
function openContact(id) {
    highlightSelectedContact(id)
    ID = id;
    let firstNames = contacts[id]['firstname'];
    const lastNames = contacts[id]['lastname'];
    let contactPopup = document.getElementById('card-popup');
    contactPopup.innerHTML = '';
    contactPopup.innerHTML += openContactTemplate(firstNames, lastNames, id);
    if (mediaQuery.matches) {///Responsive Design removed Buttons
        removeAndAddButtons();
    }
}
function removeAndAddButtons() {
    document.getElementById(`Create-Contact`).classList.add("d-none");
    document.getElementById('contact-card').classList.add('d-flex');
    document.getElementById('close-X').classList.add('d-flex');
    document.getElementById('edit-delete-box').classList.remove('d-none');
    document.getElementById('edit-delete-box').classList.add('d-flex');
    document.getElementById('edit-contact').classList.add('d-none');
}
function closeContactCard() {//Responisve Design function
    if (mediaQuery.matches) {
        document.getElementById(`Create-Contact`).classList.remove("d-none");
        document.getElementById('contact-card').classList.remove('d-flex');
        document.getElementById('close-X').classList.remove('d-flex');
        document.getElementById('edit-delete-box').classList.remove('d-flex');
    }
}
function highlightSelectedContact(id) {
    const currentContact = document.getElementById(`single-contact-box-${id}`);
    if (lastSelectedContact !== undefined) { //wenn lastselectedcontact nicht undefiniert wird von dem ausgewählten contact die hintergrundfarbe entfernt
        lastSelectedContact.classList.remove('bg-highlight');
    }
    currentContact.classList.add('bg-highlight');
    lastSelectedContact = currentContact;

}
function openCreateContact() {
    let popupBG = document.getElementById('create-contact-bg');
    let contactsForm = document.getElementById('contacts-popup');
    popupBG.classList.remove('d-none');
    contactsForm.classList.remove('move-out');
    contactsForm.classList.add('move-in');
    popupBG.classList.add('dark');
    popupBG.classList.remove('light');
}

function closeCreateContact() {
    let contactPopup = document.getElementById('contacts-popup');
    document.getElementById('create-contact-bg').classList.remove('dark');
    contactPopup.classList.remove('move-in')
    document.getElementById('create-contact-bg').classList.add('light');
    contactPopup.classList.add('move-out');
    setTimeout(function () {
        document.getElementById('create-contact-bg').classList.add('d-none');
    }, 1200);

}

async function createNewContact() {
    let Firstname = document.getElementById('contacts-firstname').value;
    Firstname = Firstname.charAt(0).toUpperCase() + Firstname.slice(1);
    let Lastname = document.getElementById('contacts-lastname').value;
    Lastname = Lastname.charAt(0).toUpperCase() + Lastname.slice(1);
    let Mail = document.getElementById('contacts-mail').value;
    let Phone = document.getElementById('contacts-phone').value;
    contacts.push(
        {
            'firstname': Firstname,
            'lastname': Lastname,
            'initials': Firstname.charAt(0) + Lastname.charAt(0),
            'mail': Mail,
            'phone': Phone,
            'color': contactsRandomColor
        }
    )

    await setItemContacts(contacts);
    closeCreateContact();
    pushFirstLetter();
    resetInputValue();
    createdSuccessfully();
    document.getElementById('contactsSelection').innerHTML = '';
    generateContacts();
}
function createdSuccessfully() {
    let banner = document.getElementById('created-successfully-logo');
    banner.innerHTML='Contact Successfully Created';
    banner.classList.remove('move-down', 'd-none');
    banner.classList.add('move-up');
    setTimeout(function () {
        banner.classList.remove('move-up');
        banner.classList.add('move-down');
    }, 1500);
    setTimeout(function () {
        banner.classList.add('d-none');
    }, 2000);

}
function resetInputValue() {
    let addContactForms = document.querySelectorAll('.add-contact-form');

    for (let i = 0; i < addContactForms.length; i++) {
        addContactForms[i].value = '';
    }

}
function openEditContact(id) {
    let editBG = document.getElementById('edit-contact-bg');
    let initalsCircle = document.getElementById('initials-circle');
    editBG.classList.remove('d-none', 'light');
    editBG.classList.add('dark');
    initalsCircle.style = `background-color:${contacts[id]['color']};`
    initalsCircle.innerHTML = contacts[id]['firstname'].charAt(0) + contacts[id]['lastname'].charAt(0);
    
    document.getElementById('edit-contact-popup').classList.remove('move-out');
    document.getElementById('edit-contact-popup').classList.add('move-in');
    document.getElementById('edit-firstname').value = contacts[id]['firstname'];
    firstname = contacts[id]['firstname'];
    document.getElementById('edit-lastname').value = contacts[id]['lastname'];
    document.getElementById('edit-mail').value = contacts[id]['mail'];
    document.getElementById('edit-phone').value = contacts[id]['phone'];
}
function closeEditContact() {
    document.getElementById('edit-contact-bg').classList.add('light');
    document.getElementById('edit-contact-bg').classList.remove('dark');
    document.getElementById('edit-contact-popup').classList.remove('move-in');
    document.getElementById('edit-contact-popup').classList.add('move-out');
    setTimeout(function () {
        document.getElementById('edit-contact-bg').classList.add('d-none');
    }, 1200);
}
async function deleteContactByFirstname(firstname) {
    if (!firstname) {
        firstname = contacts[ID]['firstname'];
    }
    try {
        let contacts = JSON.parse(await getItem('contacts'));
        let index = contacts.findIndex(contact => contact.firstname === firstname);

        if (index !== -1) {
            contacts.splice(index, 1);
            await setItem('contacts', JSON.stringify(contacts));
            alert(`Contact with firstname ${firstname} has been deleted.`);
        }
    } catch (e) {
        console.error('Deleting error:', e);
    }
    if (mediaQuery.matches) {
        closeContactCard();
    }
    document.getElementById('card-popup').innerHTML = '';
    loadContacts();
    closeEditContact();
    pushFirstLetter();
}

async function changeFirstname() {

    const newFirstname = document.getElementById('edit-firstname').value;
    await loadContacts();
    const index = contacts.findIndex(contact => contact.firstname === firstname);

    if (index !== -1) {
        contacts[index].firstname = newFirstname;
        contacts[index].lastname = document.getElementById('edit-lastname').value;
        contacts[index].mail = document.getElementById('edit-mail').value;
        contacts[index].phone = document.getElementById('edit-phone').value;

        await setItemContacts(contacts);
        alert(`Die Änderungen für den aufgerufenen Kontakt wurden erfolgreich gespeichert.`);
    }
    document.getElementById('card-popup').innerHTML = '';
    loadContacts();
    closeEditContact();
    pushFirstLetter();
}
