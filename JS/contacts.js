let contacts = [
    { name: 'Anton Meyer', email: 'anton@gmail.com', phone: '123456789', color: '#ff5733', emblem: 'AM' },
    { name: 'Bernd Bauer', email: 'bernd@gmail.com', phone: '987654321', color: '#33ff57', emblem: 'BB' },
    { name: 'Clara Schmidt', email: 'clara@gmail.com', phone: '456789123', color: '#3357ff', emblem: 'CS' },
    { name: 'David Müller', email: 'david@gmail.com', phone: '789123456', color: '#ff33a1', emblem: 'DM' },
    { name: 'Eva Braun', email: 'eva@gmail.com', phone: '321456987', color: '#a133ff', emblem: 'EB' },
    { name: 'Fritz Weber', email: 'fritz@gmail.com', phone: '654789321', color: '#33ffa1', emblem: 'FW' },
    { name: 'Gisela Hofmann', email: 'gisela@gmail.com', phone: '987321654', color: '#ff7f33', emblem: 'GH' },
    { name: 'Hanna Schuster', email: 'hanna@gmail.com', phone: '321987654', color: '#33b5ff', emblem: 'HS' },
    { name: 'Ingrid König', email: 'ingrid@gmail.com', phone: '654123789', color: '#ff3357', emblem: 'IK' },
    { name: 'Jakob Fischer', email: 'jakob@gmail.com', phone: '123789456', color: '#57ff33', emblem: 'JF' },
    { name: 'Klaus Schneider', email: 'klaus@gmail.com', phone: '789654123', color: '#33ffb5', emblem: 'KS' },
    { name: 'Lena Wagner', email: 'lena@gmail.com', phone: '456123789', color: '#ff5733', emblem: 'LW' },
    { name: 'Martin Becker', email: 'martin@gmail.com', phone: '321789456', color: '#a1ff33', emblem: 'MB' },
    { name: 'Nina Krause', email: 'nina@gmail.com', phone: '654987321', color: '#ff33d7', emblem: 'NK' },
    { name: 'Olaf Zimmermann', email: 'olaf@gmail.com', phone: '987456123', color: '#337fff', emblem: 'OZ' },
    { name: 'Petra Neumann', email: 'petra@gmail.com', phone: '123654789', color: '#ff5733', emblem: 'PN' },
    { name: 'Quirin Lang', email: 'quirin@gmail.com', phone: '456987321', color: '#33ff57', emblem: 'QL' },
    { name: 'Rita Schulz', email: 'rita@gmail.com', phone: '789321654', color: '#ff33b5', emblem: 'RS' },
    { name: 'Stefan Wolf', email: 'stefan@gmail.com', phone: '321456789', color: '#33a1ff', emblem: 'SW' },
    { name: 'Tina Maier', email: 'tina@gmail.com', phone: '654789123', color: '#ff5733', emblem: 'TM' },
    { name: 'Uwe Krüger', email: 'uwe@gmail.com', phone: '987123456', color: '#a1ff57', emblem: 'UK' },
    { name: 'Vera Frank', email: 'vera@gmail.com', phone: '123456987', color: '#ff7f57', emblem: 'VF' },
];

function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function renderEmblem(name) {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials;
}

function renderListContact() {
    let contentList = document.getElementById('contactContainer');
    contentList.innerHTML = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (
            i == 0 ||
            contact.name.charAt(0) != contacts[i - 1].name.charAt(0)
        ) {
            contentList.innerHTML += `<span class="register-letter">${contact.name.charAt(0).toUpperCase()}</span>`;
        }
        contentList.innerHTML += `
            <div class="contact-card" id="contactListContainer${i}" onclick="showDetailContact(${i})">
                <div class="contact-icon" style="background-color: ${contact.color}">
                    <span>${renderEmblem(contact.name)}</span>
                </div>
                <div class="contact">
                    <span class="name">${contact.name}</span>
                    <a href="mailto:${contact.email}">${contact.email}</a>
                </div>
            </div>
        `;
    }
}

function showDetailContact(index) {
    let contact = contacts[index];
    let contactDetail = document.getElementById('contactDetail');

    contactDetail.style.transition = 'none';
    contactDetail.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
        contactDetail.style.transition = 'transform 0.5s ease';
        contactDetail.innerHTML = `
            <div class="headline-contact">
                <div class="emblem-info" id="emblem" style="background-color: ${contact.color}">${renderEmblem(contact.name)}</div>
                <div class="name-contact">
                    ${contact.name}
                    <div class="contact-a-name" id="nameContact">
                        <a class="contact-name-btn" onclick="openDialog(false, ${index})"><img class="img-btn" src="./img/contacts/edit.png"> Edit</a>
                        <a class="contact-name-btn" onclick="deleteContact(${index})"><img class="img-btn" src="./img/contacts/delete.png"> Delete</a>
                    </div>
                </div>
            </div>
            <div class="info">Contact Information</div>
            <div class="contact-information">
                <div><b>Email</b></div>
                <a href="mailto:${contact.email}" id="email_contact">${contact.email}</a>
                <div><b>Phone</b></div>
                <div id="phone_contact">${contact.phone}</div>
                <div class="mobile-contact" onclick="openMobileDialog()">
                </div>
            </div>
        `;
        requestAnimationFrame(() => {
            contactDetail.style.transform = 'translateX(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    renderListContact();
});
