// Identification du formulaire
const form = document.querySelector("form");

// On réunit tous les inputs dans 1 variable
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
);
// On vérifie que c'est bien le cas
// console.log(inputs);

// Identification de la progressBar
const progressBar = document.getElementById("progress-bar");

// Variables pour stocker ce que l'utilisateur rentre dans les inputs
let pseudo, email, password, confirmPassword;

// Fonctions qui contrôle les inputs
/* 1ère possibilité => pas top car on se répète beaucoup
const pseudoChecker = (value) => { 
    const pseudoContainer = document.querySelector(".pseudo-container");
    const errorDisplay = document.querySelector(".pseudo-container > span");

    // Si la valeur est supérieure à 0 ET (la valeur est inférieure à 3 OU la valeur est supérieure à 20)
    // Alors on ajoute la classe 'error' à pseudo-container
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        pseudoContainer.classList.add("error");
        errorDisplay.textContent =
            "Le pseudo doit faire entre 3 et 20 caractères";

        // Sinon si dans la valeur rentrée il y a autre chose que ce qu'il y a dans la Regex
    } else if (!value.match(/^[a-zA-Z0-9_.-]+$/)) {
        // Regex qui vérifie s'il y a des lettres en minuscule, en majuscule, des chiffres, underscore, point, tiret. Le reste (caractères spéciaux) n'est pas autorisé
        pseudoContainer.classList.add("error");
        errorDisplay.textContent =
            "Le pseudo ne doit pas contenir de caractères spéciaux";

        // Sinon je retire l'erreur
    } else {
        pseudoContainer.classList.remove("error");
        errorDisplay.textContent = "";
    }
};
*/

// 2ème possibilité : coder une fonction d'affichage
const errorDisplay = (tag, message, valid) => {
    // Grâce aux paramètres dynamiques, on crée 2 variables qui permettent de sélectionner 8 balises (pseudo-container, email-container etc...)
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    // Condition si c'est valide ou non
    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
    }
};

const pseudoChecker = (value) => {
    // Si la valeur est supérieure à 0 ET (la valeur est inférieure à 3 OU la valeur est supérieure à 20)
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        // Alors on ajoute la classe 'error' à pseudo-container
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        // "pseudo" : correspond au paramètre "tag" de la fonction errorDisplay
        // "Le pseudo doit faire..." : correspond au paramètre "message"
        // On ne met pas le 3e paramètre "valid" parce qu'il ne sera pas true, donc c'est ok

        // Ne stocke pas le pseudo si la valeur n'est pas valide
        pseudo = null;

        // Sinon si dans la valeur rentrée il y a autre chose que ce qu'il y a dans la Regex
    } else if (!value.match(/^[a-zA-Z0-9_.-]+$/)) {
        // Regex qui vérifie s'il y a des lettres en minuscule, en majuscule, des chiffres, underscore, point, tiret. Le reste (caractères spéciaux) n'est pas autorisé
        errorDisplay(
            "pseudo",
            "Le pseudo ne doit pas contenir de caractères spéciaux"
        );

        // Ne stocke pas le pseudo si la valeur n'est pas valide
        pseudo = null;

        // Sinon je retire l'erreur
    } else {
        // pseudo : toujours pointer la balise pour savoir de qui on parle,
        // message : pas de message d'erreur a afficher
        // true : pour dire que la condition est valide, donc on retire la classe "error"
        errorDisplay("pseudo", "", true);

        // On stocke le pseudo dans la variable
        pseudo = value;
    }
};

const emailChecker = (value) => {
    if (
        !value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    // Pour éviter d'empiler les classes les unes sur les autres
    progressBar.classList = "";

    if (
        !value.match(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
    ) {
        errorDisplay(
            "password",
            "8 caractères minimum, une majuscule, un chiffre et un caractère spécial"
        );
        progressBar.classList.add("progressRed");

        password = null;

        // Sinon si la condition est bonne mais qu'on n'est pas au max de la sécurité (matérialisée par la progressBar)
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");

        // password : toujours pointer la balise pour savoir de qui on parle,
        // message : pas de message d'erreur a afficher,
        // true : pour dire que la condition est valide
        errorDisplay("password", "", true);

        password = value;

        // Sinon, toutes les conditions sont remplies
    } else {
        progressBar.classList.add("progressGreen");

        errorDisplay("password", "", true);

        password = value;
    }

    // Vérification si mdp ok, confirm mdp ok puis réécrit dans mdp, il faut que confirm le soit à nouveau
    if (confirmPassword) {
        confirmChecker(confirmPassword);
    }
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPassword = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPassword = true;
    }
};

// Pour chaque input dans inputs: j'écoute l'évènement de type input, et je joue la fonction suivante avec event comme paramètre
inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        // console.log(e.target.id); => Renvoie le nom de l'input dans lequel est tapé qq chose

        // Pour chaque cas/input, en ciblant leur nom (event.target.id), j'applique la logique suivante
        switch (event.target.id) {
            case "pseudo":
                // event.target.value renvoie les caractères qui sont tapés dans les inputs
                pseudoChecker(event.target.value);
                break;

            case "email":
                emailChecker(event.target.value);
                break;

            case "password":
                passwordChecker(event.target.value);
                break;

            case "confirm":
                confirmChecker(event.target.value);
                break;

            default:
                null;
        }
    });
});

// Validation du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Si toutes les conditions sont valides, alors on stocke tout dans 1 objet
    if (pseudo && email && password && confirmPassword) {
        const data = {
            // Rappel : dans 1 objet lorsque la propriété est identique à la valeur, on a la version raccourcie pseudo: pseudo, équivalent à pseudo,
            pseudo,
            email,
            password,
            confirmPassword,
        };
        console.log(data);

        // Vide les inputs après validation
        inputs.forEach((input) => {
            input.value = "";
        });

        // Retire la progressBar après validation
        progressBar.classList = "";

        // Tout remettre à zéro, ce qui évite que l'utilisateur renvoie 1 2e fois le form
        pseudo = null;
        email = null;
        password = null;
        confirmPassword = null;

        alert("Inscription validée !");
    } else {
        alert("Veuillez remplir tous les champs");
    }
});

function handleFormSubmit(event) {
    event.preventDefault();

    // Récupère les données du formulaire
    const formData = new FormData(form);

    // Envoie les données au backend
    fetch('/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Une erreur est survenue');
        }
        return response.json();
    })
    .then(data => {
        // Gère la réponse du backend
        console.log(data);
        // Redirige l'utilisateur vers une autre page
        window.location.href = 'http://www.example.com/success';
    })
    .catch(error => {
        // Gère les erreurs
        console.error(error);
    });
}

// Écoute l'événement de soumission du formulaire
form.addEventListener('submit', handleFormSubmit);
