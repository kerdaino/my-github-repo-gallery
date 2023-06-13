// GLOBAL VARIABLES
// targeting the div with the class overview
const overview = document.querySelector(".overview");
// other variables
const username = "kerdaino";


const gith = async function () {
    const user = await fetch(`https://api.github.com/users/${username}`);
    const users = await user.json();
    // console.log(users);
    displayGithInfo(users);
};

gith();

const displayGithInfo = function (users) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${users.avatar_url}/>
    </figure>
    <div>
        <p><strong>Name:</strong> ${users.name}</p->
        <p><strong>Bio:</strong> ${users.bio}</p>
        <p><strong>Location:</strong> ${users.location}</p>
        <p><strong>Number of public repos:</strong> ${users.public_repos}</p>
    </div>`;
    overview.append(div);
};