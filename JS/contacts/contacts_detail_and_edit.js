/**
 * Removes classes and hides overflow for elements when closing the contact window.
 */
function hideContactElements() {
    const contactContainer = document.getElementById('contact-container');
    const rightContent = document.querySelector('.right-content');
    const contactDetailContainer = document.querySelector('.contact-detail-container');
    contactContainer.classList.remove('show-right-content');
    rightContent.classList.remove('show');
    contactDetailContainer.style.overflow = 'hidden';
}

/**
 * Handles the fly-out animations for edit and add contact popups.
 */
function handleFlyOutAnimations() {
    const editContactPopup = document.querySelector(".edit-contact-popup");
    const addContactPopup = document.querySelector(".add-contact-popup");
    if (editContactPopup.style.display === 'block') {
        editContactPopup.style.animation = "fly-out 0.1s forwards";
    }
    if (addContactPopup.style.display === 'block') {
        addContactPopup.style.animation = "fly-out 0.1s forwards";
    }
}

/**
 * Resets styles and hides elements after a delay when closing the contact window.
 */
function resetStylesAfterTimeout() {
    const editContactPopup = document.querySelector(".edit-contact-popup");
    const addContactPopup = document.querySelector(".add-contact-popup");
    const overlay = document.getElementById('overlay');
    const contactOptions = document.getElementById('contact-options');
    setTimeout(() => {
        editContactPopup.style.animation = '';
        addContactPopup.style.animation = '';
        overlay.classList.remove("overlay");
        editContactPopup.style.display = 'none';
        addContactPopup.style.display = 'none';
        document.getElementById("contactsBody").style.overflow = '';
    }, 200);
}

/**
 * Closes the contact window, hides elements, handles animations, and resets styles.
 */
function closeContactWindow() {
    hideContactElements();
    handleFlyOutAnimations();
    const contactOptions = document.getElementById('contact-options');
    if (contactOptions.classList.contains('active')) {
        contactOptions.classList.remove('active');
    }
    resetStylesAfterTimeout();
}

/**
 * Toggles the visibility of the contact options and the active state of the more-vert button.
 *
 * This function toggles the 'active' class on the element with the ID 'contact-options'
 * and the element with the ID 'more-vert-button'. This is typically used to show or hide
 * contact options and indicate the active state of the button.
 */
function toggleContactOptions() {
    const contactOptions = document.getElementById('contact-options');
    const moreVertButton = document.getElementById('more-vert-button');
    contactOptions.classList.toggle('active');
    moreVertButton.classList.toggle('active');
}

/**
 * Closes the edit contact popup with animations and restores the page layout.
 */
function closeEditContact() {
    let card = document.querySelector(".edit-contact-popup");
    let overlay = document.getElementById("overlay");
    if (card) {
        card.style.animation = "fly-out 0.1s forwards";
    }
    if (overlay) {
        overlay.style.animation = "fade-out 0.2s forwards";
    }
    setTimeout(() => {
        if (card) {
            card.style.animation = '';
            card.style.display = "none";
        }
        if (overlay) {
            overlay.style.animation = '';
            overlay.classList.remove("overlay");
        }
        document.getElementById("contactsBody").style.overflow = '';
    }, 200);
}

/**
 * Closes the edit contact popup and restores the page layout.
 */
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

/**
 * Opens the edit contact popup for a given email.
 * @param {string} email - The email of the contact to edit.
 */
function openEditContact(email) {
    const contact = findContactByEmail(email);
    if (contact) {
        populateEditForm(contact);
        showEditPopup();
    } else {
        console.error("Contact not found.");
    }
}

/**
 * Finds a contact by email.
 * @param {string} email - The email of the contact to find.
 * @returns {Object|null} - The contact object if found, otherwise null.
 */
function findContactByEmail(email) {
    return firebaseContacts.flatMap(contactsGroup => 
        Object.values(contactsGroup.dataExtracted)
    ).find(contact => contact.email === email);
}

/**
 * Populates the edit form with contact details.
 * @param {Object} contact - The contact object containing the details to populate.
 */
function populateEditForm(contact) {
    const { name, email, phone, color } = contact;
    document.querySelector(".edit-contact-popup input[placeholder='Name']").value = name;
    document.querySelector(".edit-contact-popup input[placeholder='Email']").value = email;
    document.querySelector(".edit-contact-popup input[placeholder='Phone']").value = phone;
    document.getElementById("originalContactEmail").value = email;
    const emblemElement = document.querySelector(".edit-contact-popup .profile-img");
    emblemElement.style.backgroundColor = color;
    emblemElement.innerHTML = `<span class="emblem-text">${renderEmblem(name)}</span>`;
}

/**
 * Shows the edit contact popup.
 */
function showEditPopup() {
    const card = document.querySelector(".edit-contact-popup");
    const overlay = document.getElementById("overlay");
    document.getElementById("contactsBody").style.overflow = "hidden";
    card.style.display = "block";
    overlay.classList.add("overlay");
}

/**
 * Shows the detailed contact information for a given email.
 * @param {string} contactEmail - The email of the contact to display.
 */
function showDetailContact(contactEmail) {
    const contact = getContactByEmail(contactEmail);
    if (contact && contact.phone) {
        updateContactDetailSection(contact);
        animateContactDetail();
        handleResponsiveDesign();
    }
}

/**
 * Retrieves a contact from firebaseData by email.
 * @param {string} email - The email of the contact to retrieve.
 * @returns {Object|null} - The contact object if found, otherwise null.
 */
function getContactByEmail(email) {
    for (const contacts of firebaseData) {
        for (const key in contacts.dataExtracted) {
            if (contacts.dataExtracted.hasOwnProperty(key)) {
                const contact = contacts.dataExtracted[key];
                if (contact.email === email) {
                    return contact;
                }
            }
        }
    }
    return null;
}

/**
 * Updates the contact detail section with the provided contact information.
 * @param {Object} contact - The contact object containing the details to display.
 */
function updateContactDetailSection(contact) {
    const contactDetail = document.getElementById('contactDetail');
    contactDetail.innerHTML = '';
    contactDetail.style.transition = 'none';
    contactDetail.style.transform = 'translateX(100%)';
    const contactHtml = detailContactHtmlTemplate(contact);
    const createdDiv = document.createElement('div');
    createdDiv.innerHTML = contactHtml;
    contactDetail.appendChild(createdDiv.firstElementChild);
}

/**
 * Animates the contact detail section into view.
 */
function animateContactDetail() {
    const contactDetail = document.getElementById('contactDetail');
    requestAnimationFrame(() => {
        contactDetail.style.transition = 'transform 0.5s ease';
        contactDetail.style.transform = 'translateX(0)';
    });
}

/**
 * Adjusts the UI for different screen widths to ensure proper display.
 */
function handleResponsiveDesign() {
    const contactContainer = document.getElementById('contact-container');
    const rightContent = document.querySelector('.right-content');
    const contactDetailContainer = document.querySelector('.contact-detail-container');
    if (window.innerWidth <= 1050) {
        contactContainer.classList.add('show-right-content');
        rightContent.classList.add('show');
        contactDetailContainer.style.overflow = 'visible';
    }
}

/**
 * Main function to save the edited contact.
 */
async function saveEditContact() {
    const { nameElement, emailElement, phoneElement, originalEmailElement, emailErrorElement } = getInputElements();
    if (!nameElement || !emailElement || !phoneElement || !originalEmailElement) {
        console.error("One or more input elements are missing.");
        return;
    }
    const { name, email, phone, originalEmail } = getUpdatedContactInfo(nameElement, emailElement, phoneElement, originalEmailElement);
    emailErrorElement.style.display = 'none';
    if (!validateEmail(email, originalEmail, emailErrorElement)) {
        return;
    }
    const contactId = getContactIdByEmail(originalEmail);
    if (contactId) {
        const updatedContact = { name, email, phone };
        await updateContactData(contactId, updatedContact);
    } else {
        console.error("Contact not found.");
    }
}

/**
 * Retrieves and validates the presence of required input elements.
 * @returns {Object} - The input elements.
 */
function getInputElements() {
    return {
        nameElement: document.getElementById('editContactName'),
        emailElement: document.getElementById('editContactEmail'),
        phoneElement: document.getElementById('editContactPhone'),
        originalEmailElement: document.getElementById('originalContactEmail'),
        emailErrorElement: document.getElementById('eError')
    };
}

/**
 * Retrieves updated contact information from the input elements.
 * @param {HTMLElement} nameElement 
 * @param {HTMLElement} emailElement 
 * @param {HTMLElement} phoneElement 
 * @param {HTMLElement} originalEmailElement 
 * @returns {Object} - The updated contact information.
 */
function getUpdatedContactInfo(nameElement, emailElement, phoneElement, originalEmailElement) {
    return {
        name: nameElement.value,
        email: emailElement.value,
        phone: phoneElement.value,
        originalEmail: originalEmailElement.value
    };
}

/**
 * Validates the uniqueness of the email.
 * @param {string} email 
 * @param {string} originalEmail 
 * @param {HTMLElement} emailErrorElement 
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function validateEmail(email, originalEmail, emailErrorElement) {
    if (email !== originalEmail && !isEmailUnique(email)) {
        emailErrorElement.style.display = 'inline';
        return false;
    }
    return true;
}

/**
 * Updates the contact data and handles UI updates.
 * @param {string} contactId 
 * @param {Object} updatedContact 
 */
async function updateContactData(contactId, updatedContact) {
    try {
        await patchData(`/contacts/${contactId}`, updatedContact);
        updateLocalContactData(contactId, updatedContact);
        handleSuccessfulUpdate(updatedContact.email);
    } catch (error) {
        console.error("Error updating contact:", error);
    }
}

/**
 * Handles UI updates after a successful contact update.
 * @param {string} email 
 */
function handleSuccessfulUpdate(email) {
    closeEditContact();
    renderListContact();
    showDetailContact(email);
}

/**
 * Adds the contact header for the first letter if it has not been displayed yet.
 * 
 * @param {Object} contact - The contact object.
 * @param {Set} displayedLetters - A set of displayed letters to check for duplicates.
 * @param {HTMLElement} container - The container element to which the header will be added.
 */
function addContactHeaderIfNeeded(contact, displayedLetters, container) {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!displayedLetters.has(firstLetter)) {
        displayedLetters.add(firstLetter);
        const registerHtml = contactsRegisterTemplate({ name: firstLetter });
        container.innerHTML += registerHtml;
    }
}

/**
 * Creates and appends the HTML for a contact to the container.
 * 
 * @param {Object} contact - The contact object.
 * @param {HTMLElement} container - The container element to which the contact will be added.
 */
function addContactToContainer(contact, container) {
    const contactHtml = contactsListContainerTemplate(contact);
    const contactContainer = document.createElement('div');
    contactContainer.innerHTML = contactHtml;
    container.appendChild(contactContainer.firstElementChild);
}

/**
 * Highlights the selected contact by adding the 'selected-contact' class to it.
 * - Removes the 'selected-contact' class from all contact cards.
 * - Adds the 'selected-contact' class to the specified selected card.
 *
 * @param {HTMLElement} selectedCard - The contact card element to be highlighted.
 */
function highlightSelectedContact(selectedCard) {
    document.querySelectorAll('.contact-card').forEach(card => 
        card.classList.remove('selected-contact')
    );
    selectedCard.classList.add('selected-contact');
}

/**
 * Deletes a contact based on the provided email address.
 * - Retrieves the contact ID associated with the email.
 * - Prompts the user for confirmation before proceeding with the deletion.
 * - If confirmed, deletes the contact from the server, removes the local contact data, and updates the contact list display.
 * - Clears the contact detail view.
 * 
 * @param {string} contactEmail - The email address of the contact to be deleted.
 * @returns {Promise<void>} A promise that resolves when the contact has been successfully deleted or rejects if an error occurs.
 */
async function deleteContact(contactEmail) {
    const contactId = getContactIdByEmail(contactEmail);
    if (!contactId) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    try {
        await deleteData(`/contacts/${contactId}`);
        removeLocalContactData(contactId);
        renderListContact();

        if (window.innerWidth <= 1050) {
            closeContactWindow();
        } else {
            document.getElementById('contactDetail').innerHTML = '';
        }
    } catch (error) {
        console.error("Fehler beim Löschen des Kontakts:", error);
    }
}



/**
 * Closes the "add contact" popup and removes the overlay with animations.
 * - Applies an animation to the popup card to make it "fly out".
 * - Applies an animation to the overlay to make it "fade out".
 * - After the animations complete (200ms), removes the overlay class, hides the popup card, and restores the overflow style of the contacts body.
 */
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