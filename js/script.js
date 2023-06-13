// GLOBAL VARIABLES
// targeting the div with the class overview
const overview = document.querySelector(".overview");
// other variables
const username = "kerdaino";
const repoList = document.querySelector(".repo-list");


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
    repo();
};

const repo = async function () {
    const getRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const returnGetRepo = await getRepo.json();
    // console.log(returnGetRepo);
    displayRepoList(returnGetRepo);
};

// repo();

const displayRepoList = function (repos) {
    for (const repo of repos) {
        const repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoListItem);
    };
};