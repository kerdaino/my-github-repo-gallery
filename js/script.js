// GLOBAL VARIABLES
// targeting the div with the class overview
const overview = document.querySelector(".overview");
// other variables
const username = "kerdaino";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


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

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //    console.log(repoName);
        specificRepo(repoName);
    };
});

const specificRepo = async function (repoName) {
    const repo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // console.log(languages);
    displaySpecificRepo(repoInfo, languages);
};

const displaySpecificRepo = function (repoInfo, languages) {
    repoData.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
};