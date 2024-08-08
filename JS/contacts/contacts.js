/**
 * Loads the URL and, once completed, renders the contact list.
 * This function assumes that `loadUrl` returns a promise that resolves when the URL loading is complete.
 * After the URL is loaded, it calls `renderListContact` to display the contact list.
 *
 * @returns {Promise<void>} A promise that resolves when the URL is loaded and the contact list is rendered.
 */
loadUrl().then(() => {
    renderListContact();
});

/**
 * Sorts the global `firebaseData` array of contact objects by their `name` property in ascending order.
 * This function modifies the `firebaseData` array in place.
 */
function sortContacts() {
    firebaseData.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generates a string of initials from a given name.
 * The initials are derived from the first letter of each word in the name and are returned in uppercase.
 * If the provided name is falsy (e.g., an empty string or `null`), an empty string is returned.
 *
 * @param {string} name - The full name from which to extract initials.
 * @returns {string} A string of uppercase initials derived from the name, or an empty string if the name is falsy.
 */
function renderEmblem(name) {
    if (!name) return ''; 
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase(); 
}

/**
 * Sorts the contacts alphabetically by name.
 * @param {Array} contacts - The array of contacts to sort.
 * @returns {Array} - The sorted array of contacts.
 */
function sortContacts(contacts) {
    return contacts.sort((a, b) => {
        const nameA = a.name ? a.name : '';
        const nameB = b.name ? b.name : '';
        return nameA.localeCompare(nameB);
    });
}

/**
 * Renders a single contact and adds it to the container.
 * @param {HTMLElement} container - The container element to add the contact to.
 * @param {Object} contact - The contact object to render.
 * @param {Set} displayedLetters - A set of displayed first letters.
 */
function renderContact(container, contact, displayedLetters) {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!displayedLetters.has(firstLetter)) {
        displayedLetters.add(firstLetter);
        const registerHtml = contactsRegisterTemplate({ name: firstLetter });
        container.innerHTML += registerHtml;
    }
    const contactHtml = contactsListContainerTemplate(contact);
    const contactContainer = document.createElement('div');
    contactContainer.innerHTML = contactHtml;
    container.appendChild(contactContainer.firstElementChild);
}

/**
 * Adds event listeners to contact cards.
 */
function addContactCardEventListeners() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function () {
            showDetailContact(this.dataset.email);
        });
    });
}

/**
 * Renders the list of contacts into the contact container.
 */
function renderListContact() {
    let container = document.getElementById('contactContainer');
    container.innerHTML = '';
    const displayedLetters = new Set();
    firebaseData.forEach(contacts => {
        let contactArray = Object.keys(contacts.dataExtracted).map(key => contacts.dataExtracted[key]);
        contactArray = sortContacts(contactArray);
        contactArray.forEach(contact => {
            if (contact.phone) {
                renderContact(container, contact, displayedLetters);
            }
        });
    });
    addContactCardEventListeners();
}

/**
 * Handles window resize events to adjust the styling of contact-related elements.
 * - When the window width is greater than 1050 pixels:
 *   - Removes the 'show-right-content' class from the contact container.
 *   - Removes the 'show' class from the right content element.
 *   - Resets the display and background color styles of the right content element.
 *   - Sets the overflow style of the contact detail container to 'hidden'.
 * - When the window width is 1050 pixels or less:
 *   - Resets the display style of the right content element.
 *   - Sets the overflow style of the contact detail container to 'visible'.
 *
 * @listens window#resize - This event listener is triggered whenever the window is resized.
 */
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

/**
 * Displays the "add contact" popup and an overlay.
 * - Sets the overflow style of the contacts body to 'hidden' to prevent scrolling.
 * - Sets the display style of the popup card to 'block' to make it visible.
 * - Adds the 'overlay' class to the overlay element to apply overlay styling.
 */
function addContact() {
    let card = document.querySelector(".add-contact-popup");
    let overlay = document.getElementById("overlay");
    document.getElementById("contactsBody").style.overflow = "hidden";
    card.style.display = "block";
    overlay.classList.add("overlay");
}

/**
 * Checks if the provided email is unique within the list of contacts.
 * Iterates through the `firebaseContacts` array and checks each contact group's email addresses to see if any match the provided email.
 *
 * @param {string} email - The email address to check for uniqueness.
 * @returns {boolean} Returns `true` if the email is unique (not found in any contact), otherwise `false`.
 */
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

/**
 * Retrieves the contact ID associated with the provided email.
 * Searches through the `firebaseContacts` array to find a contact whose email matches the provided email.
 * If a match is found, returns the contact's ID (key). If no match is found, returns `null`.
 *
 * @param {string} email - The email address to search for.
 * @returns {string|null} The contact ID if the email is found, otherwise `null`.
 */
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

/**
 * Updates a specific contact in the given contact group.
 * @param {Object} contactGroup - The group of contacts to update.
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} updatedContact - The updated contact data.
 * @returns {boolean} - Returns true if the contact was updated, otherwise false.
 */
function updateContactInGroup(contactGroup, contactId, updatedContact) {
    if (contactGroup[contactId]) {
        contactGroup[contactId] = {
            ...contactGroup[contactId],
            ...updatedContact
        };
        return true;
    }
    return false;
}

/**
 * Updates the local contact data in firebaseContacts and firebaseData.
 * @param {string} contactId - The ID of the contact to update.
 * @param {Object} updatedContact - The updated contact data.
 */
function updateLocalContactData(contactId, updatedContact) {
    for (let i = 0; i < firebaseContacts.length; i++) {
        if (updateContactInGroup(firebaseContacts[i].dataExtracted, contactId, updatedContact)) {
            break;
        }
    }
    for (let i = 0; i < firebaseData.length; i++) {
        if (updateContactInGroup(firebaseData[i].dataExtracted, contactId, updatedContact)) {
            break;
        }
    }
}

/**
 * Generates a random hexadecimal color code.
 * Constructs a color code by randomly selecting characters from '0123456789ABCDEF'.
 * The resulting color code starts with '#' followed by 6 random hexadecimal characters.
 *
 * @returns {string} A random hexadecimal color code in the format `#RRGGBB`.
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Generates an emblem from the provided name by extracting the initials.
 * - If the name is falsy (e.g., an empty string or `null`), returns an empty string.
 * - Otherwise, extracts the first letter of each word in the name, concatenates them, and returns them in uppercase.
 *
 * @param {string} name - The full name from which to generate the emblem.
 * @returns {string} The uppercase initials of the name or an empty string if the name is falsy.
 */
function generateEmblem(name) {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    return initials;
}

/**
 * Checks if the provided email is unique within the list of contacts.
 * Iterates through the `firebaseContacts` array and checks each contact's email address.
 * If a contact with the provided email is found, returns `false`; otherwise, returns `true`.
 *
 * @param {string} email - The email address to check for uniqueness.
 * @returns {boolean} `true` if the email is unique (not found in any contact), otherwise `false`.
 */
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

/**
 * Validates if the email is unique and shows an error message if not.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is unique, otherwise `false`.
 */
function validateEmail(email) {
    let emailError = document.getElementById("emailError");
    if (!isEmailUnique(email)) {
        emailError.style.display = "block";
        return false;
    }
    emailError.style.display = "none";
    return true;
}

/**
 * Creates a new contact object from the form values.
 * 
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email address.
 * @param {string} phone - The contact's phone number.
 * @returns {Object} The contact object with name, email, phone, color, and emblem.
 */
function createContactData(name, email, phone) {
    return {
        name: name,
        email: email,
        phone: phone,
        color: getRandomColor(),
        emblem: generateEmblem(name)
    };
}

/**
 * Handles the form submission to add a new contact.
 * 
 * @param {Event} event - The form submit event.
 * @returns {boolean} `true` if the contact was added successfully, otherwise `false`.
 */
async function addNewContact(event) {
    event.preventDefault();
    let name = getValue("contactNewName");
    let email = getValue("contactNewMail");
    let phone = getValue("contactNewPhone");
    if (!validateEmail(email)) {
        return false;
    }
    let extractedData = createContactData(name, email, phone);
    try {
        const response = await postData("contacts", extractedData);
        document.getElementById("newContactForm").reset();
        closeAddContact();
        setTimeout(() => {
            window.location.reload();
        }, 500);
    } catch (error) {
        return false;
    }
    return true;
}

/**
 * Sends a DELETE request to the specified path on the server to delete a resource.
 * - Constructs the URL by appending the provided path and the `.json` extension to the `BASE_URL`.
 * - Executes the DELETE request and waits for the server's response.
 * - Returns the response in JSON format.
 *
 * @param {string} [path=""] - The path of the resource to delete, appended to the `BASE_URL`. Defaults to an empty string.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 * @throws {Error} Throws an error if the fetch request fails or if the response cannot be parsed as JSON.
 */
async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return await response.json();
}

/**
 * Removes the contact data associated with the given contact ID from local data structures.
 * - Iterates through the `firebaseContacts` and `firebaseData` arrays.
 * - Deletes the contact with the specified ID from each contact group's `dataExtracted` property in both arrays.
 *
 * @param {string} contactId - The ID of the contact to remove from local data.
 */
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

/**
 * Retrieves the contact ID associated with the given email address.
 * - Iterates through the `firebaseContacts` array and searches each contact group's `dataExtracted` for a matching email.
 * - If a contact with the provided email is found, returns the associated contact ID (key).
 * - If no contact with the provided email is found, returns `null`.
 *
 * @param {string} email - The email address to search for.
 * @returns {string|null} The contact ID if found, otherwise `null`.
 */
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

/**
 * Renders the list of contacts in the contact container.
 * - Clears the existing content in the contact container.
 * - Processes contacts to display them, including setting up event listeners for contact cards.
 */
function renderListContact() {
    const container = document.getElementById('contactContainer');
    container.innerHTML = '';
    const displayedLetters = new Set();

    firebaseData.forEach(contacts => {
        const contactArray = getSortedContacts(contacts.dataExtracted);
        contactArray.forEach(contact => {
            if (contact.phone) {
                addContactHeaderIfNeeded(contact, displayedLetters, container);
                addContactToContainer(contact, container);
            }
        });
    });

    setupContactCardEventListeners();
}

/**
 * Converts contact data to an array and sorts it by contact name.
 * 
 * @param {Object} dataExtracted - The data extracted from a contact group.
 * @returns {Object[]} An array of contact objects, sorted by name.
 */
function getSortedContacts(dataExtracted) {
    return Object.values(dataExtracted).sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB);
    });
}

/**
 * Sets up event listeners for all contact cards to handle click events.
 */
function setupContactCardEventListeners() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function () {
            highlightSelectedContact(this);
            showDetailContact(this.dataset.email);
        });
    });
}