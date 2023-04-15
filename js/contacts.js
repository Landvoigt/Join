let contacts = [{
    'firstname':'Anton',
    'lastname':'Mayer',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'green'
},{
    'firstname':'Julia',
    'lastname':'Roberts',
    'mail':'juliar@gmx.com',
    'phone':'01234567',
    'color':'red'
},{
    'firstname':'Jonathan',
    'lastname':'Wick',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'blue'
},{
    'firstname':'Alfred',
    'lastname':'Niebuhr',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'purple'
},{
    'firstname':'Carlos',
    'lastname':'Sanros',
    'mail':'anton-mayer@gmx.com',
    'phone':'01234567',
    'color':'grey'
},{
    'firstname':'Carmen',
    'lastname':'Müller',
    'mail':'Müller.C@gmx.com',
    'phone':'01234567',
    'color':'black'
},{
    'firstname':'Sven',
    'lastname':'Siebert',
    'mail':'Sven.T@live.de',
    'phone':'01786965354',
    'color':'cyan'
},{
    'firstname':'Sanya',
    'lastname':'Kilic',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Sanya',
    'lastname':'Kilic',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Sanya',
    'lastname':'Kilic',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
},{
    'firstname':'Sanya',
    'lastname':'Kilic',
    'mail':'Sven.T@live.de',
    'phone':'01234567',
    'color':'brown'
}
];  
let letters =[];

function pushFirstLetter(){
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i]['firstname'];
        const firstLetter = name.charAt(0);
        
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }
    
    // Sortiere das letters-Array alphabetisch
    letters.sort(function(a, b){
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
    
}

function renderLetters(){
    let contactsList = document.getElementById('contact-list');
    contactsList.innerHTML='';
    for (let j = 0; j < letters.length; j++) {
        const element = letters[j];
        contactsList.innerHTML+=/*html*/`
        <div id="${element}" class="flex-column">
            <div class="first-letter">${element}</div>
        </div>`;
        renderContacts(element)
    }
}

function renderContacts(id){
    let letterBox = document.getElementById(`${id}`);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstName = contact['firstname'];
        const lastName = contact['lastname'];
        if (firstName.includes(id)) {
             letterBox.innerHTML+=/*html*/`
            <div class="single-contact-box" id="single-contact-box-${i}" onclick="openContact(${i})">
                <div id="initials-${i}" style="background-color:${contact['color']};" class="initials">
                    ${id}${lastName.charAt(0)}
                </div>
                <div class="contact-names">
                    ${contact.firstname} ${contact.lastname} <br>
                    <a  href="mailto:${contact['mail']}">${contact['mail']}</a>

                </div>
            </div>
        `;
        }
        
    }
}

function openContact(id){
    let firstNames = contacts[id]['firstname'];
    const lastNames = contacts[id]['lastname'];
    let contactPopup = document.getElementById('card-popup');
        contactPopup.innerHTML='';
        contactPopup.innerHTML+=/*html*/`
        <div class="d-flex">
             <div style="background-color:${contacts[id]['color']};" id="initialen-${id}" class="initials-big">
                ${firstNames.charAt(0)}${lastNames.charAt(0)}
            </div>
            <div class="card-headline flex-column">
               ${firstNames} ${lastNames}
               <div onclick="showAddTaskWindow()" class="add-task-btn"> <img src="./img/plus_lightblue.png" alt=""> Add Task</div>
            </div>
        </div>
        <div class="contact-infos">
                    Contact Information    <span style="font-size:16px; "><img src="./img/pencil.png" alt=""> Edit Task</span>
        </div>
        <div class="card-mail flex-column">
            <b>Email</b>
            <a href="mailto:${contacts[id]['mail']}">${contacts[id]['mail']}</a>
        </div>
        <div style="font-size:16px; gap:15px; margin-top:22px" class="flex-column">
            <b style="font-weight:700;">Phone</b>
            <span>${contacts[id]['phone']}</span>
        </div> `;
   
}
