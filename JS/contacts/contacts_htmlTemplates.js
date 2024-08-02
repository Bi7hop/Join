/**
 * Generates the HTML template for a contact card.
 *
 * @param {Object} contact - The contact object containing contact details.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.email - The email address of the contact.
 * @param {string} contact.color - The background color for the contact icon.
 * @param {string} contact.emblem - The emblem or initial to display in the contact icon.
 * @returns {string} The HTML string representing the contact card.
 */
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

/**
 * Generates an HTML template for displaying detailed contact information.
 *
 * @param {Object} contact - The contact information to be displayed.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.email - The email address of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @param {string} contact.color - The background color for the emblem.
 * @param {string} contact.emblem - The emblem text or icon for the contact.
 * 
 * @returns {string} The HTML template as a string.
 */
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

/**
 * Generates an HTML template for displaying a contact's register letter and separator.
 *
 * @param {Object} contact - The contact information used to generate the template.
 * @param {string} contact.name - The name of the contact. The first letter of this name is used for display.
 * 
 * @returns {string} The HTML template as a string.
 */
function contactsRegisterTemplate(contact) {
    return `
    <span class="register-letter">${contact.name.charAt(0).toUpperCase()}</span>
    <div class="contactsSepperatorContainer">
        <div class="contactsSepperator"></div>
    </div>
    `;
}
