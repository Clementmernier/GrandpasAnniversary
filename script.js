/*
 * ============================================================
 *  CONFIGURATION DU JEU
 * ============================================================
 *
 *  IMPORTANT :
 *  Les énigmes elles-mêmes ne sont volontairement PAS présentes
 *  dans le HTML. Seules les réponses attendues sont stockées ici.
 *
 *  Modifie uniquement les valeurs ci-dessous.
 */

const CONFIG = {
  answers: {
    1: ["MERNIER"],
    2: ["MAISON"],
    3: ["Clément"]
  },

  /*
   * Le message qui apparaît lorsque les 3 réponses sont trouvées.
   * Tu peux utiliser du HTML simple : <strong>, <br>, etc.
   */
  finalMessage: `
    <h2>Félicitations ! 🎉</h2>
    <p>
      <strong>Vous l'aurez deviné, c'était les trois petits messages de Clément !</strong>
    </p>
    <p>
      Je vous fais un énorme bisou ! Vous êtes les meilleurs grands parents et vous allez bien me manquer pendant ces 6 mois au Vietnam !
      Je vous dit "à la revoyure !" qui sera probablement pendant les vacances de Toussaint !
    </p>
  `,

  /*
   * Change cette valeur si tu veux repartir de zéro avec une nouvelle
   * version du jeu. Exemple : "anniversaire-60-v2".
   */
  storageKey: "anniversaire-60-ans-progression-v1"
};


/* ============================================================
 *  FONCTION DE NORMALISATION DES RÉPONSES
 * ============================================================ */

function normalizeAnswer(value) {
  return value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}


/* ============================================================
 *  MÉMOIRE DE LA PROGRESSION
 * ============================================================ */

function loadProgress() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);

    if (!saved) {
      return {
        1: false,
        2: false,
        3: false
      };
    }

    const progress = JSON.parse(saved);

    return {
      1: Boolean(progress[1]),
      2: Boolean(progress[2]),
      3: Boolean(progress[3])
    };
  } catch (error) {
    console.warn("Impossible de lire la progression :", error);

    return {
      1: false,
      2: false,
      3: false
    };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(progress));
  } catch (error) {
    console.warn("Impossible de sauvegarder la progression :", error);
  }
}


/* ============================================================
 *  INTERFACE
 * ============================================================ */

let progress = loadProgress();

function isCorrect(id, value) {
  const normalized = normalizeAnswer(value);

  return CONFIG.answers[id].some(
    answer => normalizeAnswer(answer) === normalized
  );
}

function updateProgressUI(id) {
  const box = document.getElementById(`box-${id}`);
  const input = document.getElementById(`answer-${id}`);
  const button = box.querySelector("button");
  const feedback = document.getElementById(`feedback-${id}`);
  const progressCircle = document.getElementById(`progress-${id}`);

  if (progress[id]) {
    box.classList.add("solved");
    progressCircle.classList.add("solved");

    input.disabled = true;
    button.disabled = true;
    button.textContent = "✓ Trouvée";
    feedback.textContent = "Énigme résolue !";
    feedback.className = "feedback success";
  } else {
    box.classList.remove("solved");
    progressCircle.classList.remove("solved");

    input.disabled = false;
    button.disabled = false;
    button.textContent = "Valider";
  }
}

function checkFinalMessage() {
  const allSolved = progress[1] && progress[2] && progress[3];
  const finalMessage = document.getElementById("final-message");
  const finalContent = document.getElementById("final-content");

  if (allSolved) {
    finalContent.innerHTML = CONFIG.finalMessage;
    finalMessage.hidden = false;
  } else {
    finalMessage.hidden = true;
  }
}

function validate(id) {
  if (progress[id]) {
    return;
  }

  const input = document.getElementById(`answer-${id}`);
  const feedback = document.getElementById(`feedback-${id}`);
  const value = input.value;

  if (!value.trim()) {
    feedback.textContent = "Entrez une réponse.";
    feedback.className = "feedback error";
    input.focus();
    return;
  }

  if (isCorrect(id, value)) {
    progress[id] = true;
    saveProgress(progress);
    updateProgressUI(id);
    checkFinalMessage();

    if (progress[1] && progress[2] && progress[3]) {
      document.getElementById("final-message").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  } else {
    feedback.textContent = "Ce n'est pas la bonne réponse. Essayez encore !";
    feedback.className = "feedback error";

    input.select();
  }
}


/* ============================================================
 *  INITIALISATION
 * ============================================================ */

document.querySelectorAll(".answer-box button").forEach(button => {
  button.addEventListener("click", () => {
    validate(button.dataset.id);
  });
});

document.querySelectorAll(".answer-box input").forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      const id = input.id.replace("answer-", "");
      validate(id);
    }
  });
});

/*
 * On restaure l'état sauvegardé lorsque la page est ouverte.
 */
[1, 2, 3].forEach(id => updateProgressUI(id));
checkFinalMessage();
