loadUrl().then(() => {
    renderListContact();
});

function sortContacts() {
    firebaseData.sort((a, b) => a.name.localeCompare(b.name));
}

function renderEmblem(name) {
    if (!name) return ''; 
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase(); 
}

function renderListContact() {
    // Get the container element and clear its content
    let container = document.getElementById('contactContainer');
    container.innerHTML = '';

    // A set to keep track of already displayed starting letters
    const displayedLetters = new Set();

    // Assuming firebaseData has the structure like [{ id: 'key', dataExtracted: { key1: { title: 'Task Title 1' }, key2: { title: 'Task Title 2' }, ... } }]
    firebaseData.forEach(contacts => {
        // Convert the contacts.dataExtracted object into an array
        let contactArray = Object.keys(contacts.dataExtracted).map(key => contacts.dataExtracted[key]);

        // Sort the contactArray by name, ensuring that name exists and is a string
        contactArray.sort((a, b) => {
            const nameA = a.name ? a.name : ''; // Default to empty string if name is undefined
            const nameB = b.name ? b.name : ''; // Default to empty string if name is undefined
            return nameA.localeCompare(nameB);
        });

        contactArray.forEach(contact => {
            if (contact.phone) {
                // Check if the starting letter has already been displayed
                const firstLetter = contact.name.charAt(0).toUpperCase();
                if (!displayedLetters.has(firstLetter)) {
                    // Add the starting letter to the set of displayed letters
                    displayedLetters.add(firstLetter);

                    // Create and append the starting letter HTML
                    const registerHtml = contactsRegisterTemplate({ name: firstLetter });
                    container.innerHTML += registerHtml;
                }

                // Create the contact HTML using contactsListContainerTemplate
                const contactHtml = contactsListContainerTemplate(contact);

                // Create a temporary container to hold the contact HTML
                const contactContainer = document.createElement('div');
                contactContainer.innerHTML = contactHtml;

                // Append the contact to the main container
                container.appendChild(contactContainer.firstElementChild);
            }
        });
    });
    
    // Add event listeners for contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function () {
            showDetailContact(this.dataset.email);
        });
    });
}


function contactsListContainerTemplate(contact) {
    return `
        <div class="contact-card-container">
            <div class="contact-card" id="contactListContainer" data-email="${contact.email}">
                <div class="contact-icon-container"> 
                    <div class="contact-icon" style="background-color: ${contact.color}">
                        <span>${contact.emblem}</span>
                    </div>
                </div>
                <div class="contact">
                    <span class="name">${contact.name}</span>
                    <div class="contactEmailContainer">${contact.email}</div>
                </div>
            </div>
        </div>
    `;
}

function showDetailContact(contactEmail) {
    firebaseData.forEach(contacts => {
        Object.keys(contacts.dataExtracted).forEach(key => {
            const contact = contacts.dataExtracted[key];
            if (contact.email === contactEmail && contact.phone) {
                const contactDetailContainer = document.querySelector('.contact-detail-container');
                const rightContent = document.querySelector('.right-content');
                const contactContainer = document.getElementById('contactContainer');
                const contactDetail = document.getElementById('contactDetail');

                // Clear previous content
                contactDetail.innerHTML = '';
                contactDetail.style.transition = 'none';
                contactDetail.style.transform = 'translateX(100%)';

                const contactHtml = detailContactHtmlTemplate(contact);
                const createdDiv = document.createElement('div');
                createdDiv.innerHTML = contactHtml;
                contactDetail.appendChild(createdDiv.firstElementChild);

                requestAnimationFrame(() => {
                    contactDetail.style.transition = 'transform 0.5s ease';
                    contactDetail.style.transform = 'translateX(0)';
                });

                if (window.innerWidth <= 1050) {
                    contactContainer.classList.add('show-right-content');
                    rightContent.classList.add('show');
                    contactDetailContainer.style.overflow = 'visible';
                }
            }
        });
    });
}

function detailContactHtmlTemplate(contact) {
    return `
        <div>
        <div class="headline-contact">
            <div class="emblem-info" id="emblem" style="background-color:${contact.color}">${contact.emblem}</div>
            <div class="name-contact">
                ${contact.name}
                <div class="contact-a-name" id="nameContact">
                    <a class="contact-name-btn" onclick="openEditContact('${contact.email}')">
                        <img class="img-btn" src="./img/contacts/edit.png"> Edit
                    </a>
                    <a class="contact-name-btn" onclick="deleteContact('${contact.email}')">
                        <img class="img-btn" src="./img/contacts/delete.png"> Delete
                    </a>
                </div>
            </div>
        </div>
        <div class="info">Contact Information</div>
        <div class="contact-information">
            <div><b>Email</b></div>
            <a href="mailto:${contact.email}" id="email_contact">${contact.email}</a>
            <div><b>Phone</b></div>
            <div id="phone_contact">${contact.phone}</div>
            <div class="mobile-contact" onclick="openMobileDialog('${contact.email}')"></div>
        </div>
        <div class="btnBox">
            <div id="more-vert-button" class="more-vert-button" onclick="toggleContactOptions('${contact.email}')">
                <img src="./img/contacts/mobileMenu.png" alt="">
            </div>
            <div id="contact-options" class="contact-options">
                <div class="edit-button" onclick="openEditContact('${contact.email}')">
                    <img src="./img/contacts/editMobile.png" alt="edit">edit
                </div>
                <div class="delete-button" onclick="deleteContact('${contact.email}')">
                    <img src="./img/contacts/deleteMobile.png" alt="delete">delete
                </div>
            </div>
        </div>
        </div>
    `;
}


function contactsRegisterTemplate(contact) {
    return `
    <span class="register-letter">${contact.name.charAt(0).toUpperCase()}</span>
    <div class="contactsSepperatorContainer">
        <div class="contactsSepperator"></div>
    </div>
    `
}



function closeContactWindow() {
    let contactContainer = document.getElementById('contact-container');
    let rightContent = document.querySelector('.right-content');
    let contactDetailContainer = document.querySelector('.contact-detail-container');
    let overlay = document.getElementById('overlay');

    contactContainer.classList.remove('show-right-content');
    rightContent.classList.remove('show');
    contactDetailContainer.style.overflow = 'hidden';

    let editContactPopup = document.querySelector(".edit-contact-popup");
    let addContactPopup = document.querySelector(".add-contact-popup");
    let contactOptions = document.getElementById('contact-options');

    if (editContactPopup.style.display === 'block') {
        editContactPopup.style.animation = "fly-out 0.1s forwards";
    }
    if (addContactPopup.style.display === 'block') {
        addContactPopup.style.animation = "fly-out 0.1s forwards";
    }
    if (contactOptions.classList.contains('active')) {
        contactOptions.classList.remove('active');
    }

    setTimeout(() => {
        editContactPopup.style.animation = '';
        addContactPopup.style.animation = '';
        overlay.classList.remove("overlay");
        editContactPopup.style.display = 'none';
        addContactPopup.style.display = 'none';
        document.getElementById("contactsBody").style.overflow = '';
    }, 200);
}

function toggleContactOptions() {
    const contactOptions = document.getElementById('contact-options');
    const moreVertButton = document.getElementById('more-vert-button');
    contactOptions.classList.toggle('active');
    moreVertButton.classList.toggle('active');
}

window.addEventListener('resize', () => {
    let contactContainer = document.getElementById('contact-container');
    let rightContent = document.querySelector('.right-content');
    let contactDetailContainer = document.querySelector('.contact-detail-container');

    if (window.innerWidth > 1050) {
        contactContainer.classList.remove('show-right-content');
        rightContent.classList.remove('show');
        rightContent.style.display = '';
        rightContent.style.backgroundColor = '';
        contactDetailContainer.style.overflow = 'hidden';
    } else {
        rightContent.style.display = '';
        contactDetailContainer.style.overflow = 'visible';
    }
});

// document.addEventListener('DOMContentLoaded', (event) => {
//     renderListContact();
// });

function openEditContact(email) {
    const card = document.querySelector(".edit-contact-popup");
    const overlay = document.getElementById("overlay");
    
    const contact = firebaseContacts.flatMap(contactsGroup => 
        Object.values(contactsGroup.dataExtracted)
    ).find(contact => contact.email === email);

    if (contact) {
        const { name, email, phone, color } = contact;
        document.querySelector(".edit-contact-popup input[placeholder='Name']").value = name;
        document.querySelector(".edit-contact-popup input[placeholder='Email']").value = email;
        document.querySelector(".edit-contact-popup input[placeholder='Phone']").value = phone;

        const emblemElement = document.querySelector(".edit-contact-popup .profile-img");
        emblemElement.style.backgroundColor = color;
        emblemElement.innerHTML = `<span class="emblem-text">${renderEmblem(name)}</span>`;

        document.getElementById("contactsBody").style.overflow = "hidden";
        card.style.display = "block";
        overlay.classList.add("overlay");
    } else {
        console.error("Contact not found.");
    }
}



function closeEditContact() {
    let card = document.querySelector(".edit-contact-popup");
    let overlay = document.getElementById("overlay");

    card.style.animation = "fly-out 0.1s forwards";
    overlay.style.animation = "fade-out 0.2s forwards";
    setTimeout(() => {
        card.style.animation = '';
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
        card.style.display = "none";
        document.getElementById("contactsBody").style.overflow = '';
    }, 200);
}

function addContact() {
    let card = document.querySelector(".add-contact-popup");
    let overlay = document.getElementById("overlay");

    document.getElementById("contactsBody").style.overflow = "hidden";
    card.style.display = "block";
    overlay.classList.add("overlay");
}

function closeAddContact() {
    let card = document.querySelector(".add-contact-popup");
    let overlay = document.getElementById("overlay");

    card.style.animation = "fly-out 0.1s forwards";
    overlay.style.animation = "fade-out 0.2s forwards";
    setTimeout(() => {
        card.style.animation = '';
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
        card.style.display = "none";
        document.getElementById("contactsBody").style.overflow = '';
    }, 200);
}





// Edit Contact 


function getContactIdByEmail(email) {
    for (let i = 0; i < firebaseContacts.length; i++) {
        let contactGroup = firebaseContacts[i].dataExtracted;
        for (let key in contactGroup) {
            if (contactGroup[key].email === email) {
                return key; 
            }
        }
    }
    return null; 
}

async function saveEditContact() {
    let nameElement = document.getElementById('editContactName');
    let emailElement = document.getElementById('editContactEmail');
    let phoneElement = document.getElementById('editContactPhone');
    let originalEmailElement = document.getElementById('originalContactEmail');

    if (!nameElement || !emailElement || !phoneElement || !originalEmailElement) {
        console.error("One or more input elements are missing.");
        return;
    }

    let name = nameElement.value;
    let email = emailElement.value;
    let phone = phoneElement.value;
    let originalEmail = originalEmailElement.value;

    let contactId = getContactIdByEmail(originalEmail);

    if (contactId) {
        let updatedContact = {
            name: name,
            email: email,
            phone: phone
        };

        try {
            await patchData(`/contacts/${contactId}`, updatedContact);
            updateLocalContactData(contactId, updatedContact);
            closeEditContact(); 
            renderListContact(); 
            showDetailContact(email);
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    } else {
        console.error("Contact not found.");
    }
}

function updateLocalContactData(contactId, updatedContact) {
    for (let i = 0; i < firebaseContacts.length; i++) {
        let contactGroup = firebaseContacts[i].dataExtracted;
        if (contactGroup[contactId]) {
            contactGroup[contactId] = {
                ...contactGroup[contactId], 
                ...updatedContact 
            };
            break;
        }
    }
    for (let i = 0; i < firebaseData.length; i++) {
        let contactsGroup = firebaseData[i].dataExtracted;
        if (contactsGroup[contactId]) {
            contactsGroup[contactId] = {
                ...contactsGroup[contactId], 
                ...updatedContact 
            };
            break;
        }
    }
}

function closeEditContact() {
    let card = document.querySelector(".edit-contact-popup");
    let overlay = document.getElementById("overlay");

    if (card) {
        card.style.display = "none";
    }
    if (overlay) {
        overlay.classList.remove("overlay");
    }

    document.getElementById("contactsBody").style.overflow = '';
}

function openEditContact(email) {
    let card = document.querySelector(".edit-contact-popup");
    let overlay = document.getElementById("overlay");
    
    let contact = firebaseContacts.flatMap(contactsGroup => 
        Object.values(contactsGroup.dataExtracted)
    ).find(contact => contact.email === email);

    if (contact) {
        const { name, email, phone, color } = contact;
        document.querySelector(".edit-contact-popup input[placeholder='Name']").value = name;
        document.querySelector(".edit-contact-popup input[placeholder='Email']").value = email;
        document.querySelector(".edit-contact-popup input[placeholder='Phone']").value = phone;
        
        
        document.getElementById("originalContactEmail").value = email;

        const emblemElement = document.querySelector(".edit-contact-popup .profile-img");
        emblemElement.style.backgroundColor = color;
        emblemElement.innerHTML = `<span class="emblem-text">${renderEmblem(name)}</span>`;

        document.getElementById("contactsBody").style.overflow = "hidden";
        card.style.display = "block";
        overlay.classList.add("overlay");
    } else {
        console.error("Contact not found.");
    }
}

function showDetailContact(contactEmail) {
    firebaseData.forEach(contacts => {
        Object.keys(contacts.dataExtracted).forEach(key => {
            const contact = contacts.dataExtracted[key];
            if (contact.email === contactEmail && contact.phone) {
                const contactDetailContainer = document.querySelector('.contact-detail-container');
                const rightContent = document.querySelector('.right-content');
                const contactContainer = document.getElementById('contactContainer');
                const contactDetail = document.getElementById('contactDetail');

                contactDetail.innerHTML = '';
                contactDetail.style.transition = 'none';
                contactDetail.style.transform = 'translateX(100%)';

                const contactHtml = detailContactHtmlTemplate(contact);
                const createdDiv = document.createElement('div');
                createdDiv.innerHTML = contactHtml;
                contactDetail.appendChild(createdDiv.firstElementChild);

                requestAnimationFrame(() => {
                    contactDetail.style.transition = 'transform 0.5s ease';
                    contactDetail.style.transform = 'translateX(0)';
                });

                if (window.innerWidth <= 1050) {
                    contactContainer.classList.add('show-right-content');
                    rightContent.classList.add('show');
                    contactDetailContainer.style.overflow = 'visible';
                }
            }
        });
    });
}


// ADD Contact



// Funktion zum Generieren einer zufälligen Farbe in Hexadezimalformat
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funktion zum Generieren des Emblems basierend auf dem Namen
function generateEmblem(name) {
    if (!name) return ''; 
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase(); 
}

// Funktion zum Überprüfen, ob eine E-Mail-Adresse bereits existiert
function isEmailUnique(email) {
    for (let i = 0; i < firebaseContacts.length; i++) {
        let contactGroup = firebaseContacts[i].dataExtracted;
        for (let key in contactGroup) {
            if (contactGroup[key].email === email) {
                return false;
            }
        }
    }
    return true; 
}

async function addNewContact() {
    let emailError = document.getElementById("emailError");
    emailError.style.display = "none"; 

    let name = getValue("contactNewName");
    let email = getValue("contactNewMail");
    let phone = getValue("contactNewPhone");

    if (!isEmailUnique(email)) {
        emailError.style.display = "block";
        return; 
    }

    let color = getRandomColor();
    let emblem = generateEmblem(name);

    let extractedData = {
        name: name,
        email: email,
        phone: phone,
        color: color,
        emblem: emblem
    };

    try {
        const response = await postData("contacts", extractedData);
        console.log("Kontakt erfolgreich hinzugefügt:", response);

        document.getElementById("newContactForm").reset();

        closeAddContact();

        window.location.reload(); 
    } catch (error) {
        console.error("Fehler beim Hinzufügen des Kontakts:", error);
    }
}




// Delete Contact

async function deleteContact(contactEmail) {
    let contactId = getContactIdByEmail(contactEmail);

    if (contactId) {
        let confirmation = confirm("Möchten Sie diesen Kontakt wirklich löschen?");
        if (confirmation) {
            try {
                await deleteData(`/contacts/${contactId}`);
               
                removeLocalContactData(contactId);
                renderListContact();
                
                document.getElementById('contactDetail').innerHTML = '';
            } catch (error) {
                console.error("Fehler beim Löschen des Kontakts:", error);
            }
        }
    } else {
        console.error("Kontakt nicht gefunden.");
    }
}

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return await response.json();
}

function removeLocalContactData(contactId) {
    firebaseContacts = firebaseContacts.map(contactGroup => {
        delete contactGroup.dataExtracted[contactId];
        return contactGroup;
    });

    firebaseData = firebaseData.map(contactGroup => {
        delete contactGroup.dataExtracted[contactId];
        return contactGroup;
    });
}

function getContactIdByEmail(email) {
    for (let i = 0; i < firebaseContacts.length; i++) {
        let contactGroup = firebaseContacts[i].dataExtracted;
        for (let key in contactGroup) {
            if (contactGroup[key].email === email) {
                return key; 
            }
        }
    }
    return null; 
}



