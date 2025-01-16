
const teams = []

// création de mon fetch API
async function fetchTeams() { 
    try {
        const response = await fetch('database.json')
        const data = await response.json()
        teams.length = 0
        teams.push(...data)
        loadData()
        updateRanks()
        displayRank()
    } catch (error) {
        alert('Erreur lors du chargement des données :', error)
    }
}

// Fonction pour trier les équipes par points et mettre à jour leurs rangs
function updateRanks() {
    teams.sort((a, b) => b.points - a.points); // Tri décroissant par points
    teams.forEach((team, index) => {
        team.rank = index + 1; // Mise à jour du rang
    });
}

function storeData() { // fonction qui permet d'enregistrer chaque fois que le clic sur une équipe donne un like supp 
    teams.forEach((team) => {
        localStorage.setItem(`${team.name} points`, `${team.points}`)
    }) 
    if (points) {
    } 
}

function loadData() { //permet de retrouver dans le stockage local le nb de likes de chaques .forEach équipe
    teams.forEach((team) => {
        const storedPoints = localStorage.getItem(`${team.name} points`)
        if (storedPoints) {
            team.points = parseInt(storedPoints)
        }
    })
}

// Fonction pour afficher les équipes et leurs rangs
function displayRank() {
    const equipes = document.querySelector(".equipes");
    equipes.innerHTML = ""; // Efface le contenu précédent

    teams.forEach((team) => { //ajout du paramètre team pour pouvoir connecter avec la suite de la fonction anonyme
        let displayedTeam = document.createElement("div");
        displayedTeam.className = "team";
        let spanTeam = document.createElement("span")
        spanTeam.className = "team-rank-name"
        displayedTeam.appendChild(spanTeam)
        spanTeam.textContent = `${team.rank} - ${team.name}`;

        // ajout d'un logo
        let logoTeam = document.createElement("img")
        logoTeam.className = "logo-team"
        logoTeam.src = `${team.logo}`
        logoTeam.onerror = () => {
            logoTeam.src = "images/default-logo.jpg"
        }
        displayedTeam.appendChild(logoTeam)

        // Ajout des points
        let displayedPoints = document.createElement("span");
        displayedPoints.className = "points";
        displayedPoints.textContent = ` Likes : ${team.points}`;
        displayedTeam.appendChild(displayedPoints);

        // Bouton Like
        let likeBtn = document.createElement("button");
        likeBtn.className = "like-btn"
        likeBtn.innerHTML = `<img class="like-img" src="images/like.svg" alt="Like"> Like`
        likeBtn.addEventListener("click", () => { // le listener doit être dans le mm bloc de code que sa création comme il est créé dynamiquement
            team.points++;
            updateRanks();
            storeData();
            displayRank(); // Rafraîchit l'affichage

        });
        displayedTeam.appendChild(likeBtn);

        equipes.appendChild(displayedTeam);
    });
}

async function init() {
    await fetchTeams()
    updateRanks()
    displayRank()
}

// Initialisation
init();





