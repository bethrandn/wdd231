const membersURL = 'data/members.json';

async function getMembers() {
    const response = await fetch(membersURL);
    const data = await response.json();

    displayMembers(data);
}

function displayMembers(members) {
    const membersContainer = document.querySelector('#members');
    membersContainer.classList.add('grid-view');

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        const image = document.createElement('img');
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business image`;
        image.loading = 'lazy';

        const name = document.createElement('h3');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const website = document.createElement('a');
        website.textContent = 'Visit Website';
        website.href = member.website;
        website.target = '_blank';

        const membership = document.createElement('p');
        if (member.membership === 1) {
            membership.textContent = 'Membership: Member';
        } else if (member.membership === 2) {
            membership.textContent = 'Membership: Silver Member';
        } else if (member.membership === 3) {
            membership.textContent = 'Membership: Gold Member';
        }

        const description = document.createElement('p');
        description.textContent = member.description;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        card.appendChild(description);

        membersContainer.appendChild(card);
    });
}

getMembers();

const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const membersContainer = document.querySelector('#members');

gridButton.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
});

listButton.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
});