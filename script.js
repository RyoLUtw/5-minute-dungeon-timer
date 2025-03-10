/**********************
 * Sidebar Navigation *
 **********************/
const sidebar = document.getElementById("sidebar");
const expandSidebarButton = document.getElementById("expandSidebarButton");
const stepContents = document.querySelectorAll(".step-content");
const sidebarItems = document.querySelectorAll("#sidebar li");

// Initially, show "Choose Encounter"
document.getElementById("step-choose-encounter").style.display = "block";
expandSidebarButton.style.display = "block";

sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        const step = item.getAttribute("data-step");
        switchStep(step);
    });
});

function resetGameUI() {
    document.getElementById("startReconButton").style.display = "block";
    document.getElementById("phase1").style.display = "none";
    document.getElementById("phase2").style.display = "none";
    document.getElementById("newRoundButton").style.display = "none";
}

function switchStep(step) {
    stepContents.forEach(content => content.style.display = "none");
    document.getElementById("step-" + step).style.display = "block";
    sidebar.style.display = "none";
    expandSidebarButton.style.display = "block";
    if (step === "start-game") {
        resetGameUI();
    }
}

expandSidebarButton.addEventListener("click", () => {
    sidebar.style.display = "block";
    expandSidebarButton.style.display = "none";
});

/**************************************
 * Step 1: Choose Encounter Logic *
 **************************************/
let encounterList = [
    { name: "AMBUSH!", type: "event" },
    { name: "A BOO-BOO", type: "event" },
    { name: "CONFUSION", type: "event" },
    { name: "DUNGEON ERROR IN YOUR FAVOR", type: "event" },
    { name: "GIMME A HAND!", type: "event" },
    { name: "LOCKED DOOR!", type: "event" },
    { name: "YET MORE SPIKES!", type: "event" },
    { name: "SUDDEN ILLNESS", type: "event" },
    { name: "TRAP DOOR", type: "event" },
    { name: "AN UNGODLY AMOUNT OF PORCUPINES", type: "event" },
    { name: "DAS BOOT!", type: "mini-boss" },
    { name: "THE DREADED TRI-BREAD", type: "mini-boss" },
    { name: "GIANT ENEMY CRAB", type: "mini-boss" },
    { name: "THE GOBLIN KING", type: "mini-boss" },
    { name: "A LOW-TECH MECH", type: "mini-boss" },
    { name: "A VERY MINI MINI-BOSS", type: "mini-boss" },
    { name: "A MINIATURE T-REX", type: "mini-boss" },
    { name: "THE RAT KING", type: "mini-boss" },
    { name: "THE COLLECTOR", type: "mini-boss" },
    { name: "A WIZARD OF ILL REPUTE", type: "mini-boss" },
    { name: "A RATHER UNPLEASANT PHEASANT", type: "monster" },
    { name: "ADORABLE SLIME", type: "monster" },
    { name: "A CACTUS THAT WANTS A HUG", type: "monster" },
    { name: "THE DUCK OF CANTERBURY", type: "monster" },
    { name: "EEEEWWWWWWW", type: "monster" },
    { name: "A GAB-ERWOCKY ... GET IT? YOU GOT IT", type: "monster" },
    { name: "GORBLIN", type: "monster" },
    { name: "GRIFFIN-DOOR", type: "monster" },
    { name: "LOTS AND LOTS OF ZOMBIES", type: "monster" },
    { name: "A ROSETTA STONE GOLEM", type: "monster" },
    { name: "SHARK WITH LEGS!!", type: "monster" },
    { name: "SIR FUZZYLUMPS", type: "monster" },
    { name: "A STRAIGHT-UP GHOST", type: "monster" },
    { name: "A SUSPICIOUS LOOKING CRATE", type: "monster" },
    { name: "THE CHROMICORN", type: "monster" },
    { name: "A TIMBER-WOLF", type: "monster" },
    { name: "A CREATURE OF UNFATHOMABLE EVIL", type: "monster" },
    { name: "UUGGHH... BOOTS", type: "monster" },
    { name: "A DEFINITELY NOT BOOBY-TRAPPED CHEST", type: "obstacle" },
    { name: "BOTTOMLESS PIT", type: "obstacle" },
    { name: "JUST A BUNCH OF STAIRS", type: "obstacle" },
    { name: "THE CARPAL TUNNEL", type: "obstacle" },
    { name: "A CHAIR THAT IS VERY UNCOMFORTABLE", type: "obstacle" },
    { name: "COLLAPSED CEILING", type: "obstacle" },
    { name: "A DEADLY GAME OF HOPSCOTCH", type: "obstacle" },
    { name: "DISAPPEARING BLOCKS", type: "obstacle" },
    { name: "INVISIBLE WALL", type: "obstacle" },
    { name: "JACK THE RIPPER IN A BOX", type: "obstacle" },
    { name: "A LITERAL STRAWMAN", type: "obstacle" },
    { name: "LIVING VINES", type: "obstacle" },
    { name: "A VERY LONG LOADING SCREEN", type: "obstacle" },
    { name: "QUICKSAND", type: "obstacle" },
    { name: "SHORTCUT", type: "obstacle" },
    { name: "A SURPRISE DODGEBALL TOURNAMENT", type: "obstacle" },
    { name: "A LUDICROUSLY TALL WALL OF ICE", type: "obstacle" },
    { name: "WALL OF SPIKES", type: "obstacle" },
    { name: "JACKED O'LANTERNS", type: "person" },
    { name: "ONE GUY, TWO-BOWS", type: "person" },
    { name: "TWO GUYS, ONE BOW", type: "person" },
    { name: "7 UNHELPFUL DWARFS", type: "person" },
    { name: "EXACTLY 26 NINJAS", type: "person" },
    { name: "AN ARM DEALER", type: "person" },
    { name: "BARBER-ARIAN", type: "person" },
    { name: "AN OVERLY-DRAMATIC MONOLOGUE", type: "person" },
    { name: "A GHOST", type: "person" },
    { name: "GROZZNAK THE TALL", type: "person" },
    { name: "MASSIVE PAULDRONS", type: "person" },
    { name: "AN OVERPRICED MERCHANT", type: "person" },
    { name: "A TERRIBLE, NO-GOOD, AWFUL PUPPET SHOW", type: "person" },
    { name: "A GAGGLE OF SCREAMING CHILDREN", type: "person" },
    { name: "A SLEEPING GIANT", type: "person" },
    { name: "SQUIRE NEDWARD", type: "person" },
    { name: "STEVE", type: "person" },
    { name: "THE NECROBOUNCER", type: "person" },
    { name: "A WARRIOR PRINCESS", type: "person" }
];
// Global selection state (map: "name-type" => boolean)
let selectedEncounterMap = {};
encounterList.forEach(enc => {
    const key = enc.name + "-" + enc.type;
    selectedEncounterMap[key] = false;
});
// Render encounter sections
function renderEncounterSections() {
    const encounterTypes = ["event", "mini-boss", "monster", "obstacle", "person"];
    const searchQuery = document.getElementById("encounterSearchInput").value.toLowerCase();
    encounterTypes.forEach(type => {
        const sectionContent = document.querySelector(`.encounter-section[data-type="${type}"] .section-content`);
        const filtered = encounterList
            .filter(enc => enc.type === type && enc.name.toLowerCase().includes(searchQuery))
            .sort((a, b) => a.name.localeCompare(b.name));
        let html = "";
        filtered.forEach(enc => {
            const key = enc.name + "-" + enc.type;
            const checked = selectedEncounterMap[key] ? "checked" : "";
            html += `<div>
                 <label>
                   <input type="checkbox" class="encounterCheckbox" data-key="${key}" ${checked}>
                   ${enc.name}
                 </label>
               </div>`;
        });
        sectionContent.innerHTML = html;
    });
    document.querySelectorAll(".encounterCheckbox").forEach(cb => {
        cb.addEventListener("change", (e) => {
            const key = e.target.getAttribute("data-key");
            selectedEncounterMap[key] = e.target.checked;
            const section = e.target.closest('.encounter-section');
            const type = section.getAttribute("data-type");
            updateToggleButton(type);
        });
    });
}



function updateToggleButton(sectionType) {
    const checkboxes = document.querySelectorAll(`.encounter-section[data-type="${sectionType}"] .encounterCheckbox`);
    let allChecked = true;
    checkboxes.forEach(cb => { if (!cb.checked) allChecked = false; });
    const btn = document.querySelector(`.encounter-section[data-type="${sectionType}"] .toggle-select-btn`);
    btn.textContent = allChecked ? "Select None" : "Select All";
}





document.querySelectorAll(".toggle-select-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const type = btn.getAttribute("data-type");
        const checkboxes = document.querySelectorAll(`.encounter-section[data-type="${type}"] .encounterCheckbox`);
        let allChecked = true;
        checkboxes.forEach(cb => { if (!cb.checked) allChecked = false; });
        const newState = !allChecked;
        checkboxes.forEach(cb => {
            cb.checked = newState;
            const key = cb.getAttribute("data-key");
            selectedEncounterMap[key] = newState;
        });
        btn.textContent = newState ? "Select None" : "Select All";
    });
});
document.getElementById("encounterSearchInput").addEventListener("input", renderEncounterSections);
document.getElementById("presetButton").addEventListener("click", () => {
    showLocalStorageModal("use");
});


// Helper function to generate a default selection name using local time for Save Selection & Next.
function getDefaultSelectionName() {
    const now = new Date();
    // Use toLocaleString() to get local time, then replace non-alphanumeric characters with underscores.
    return "Selection_" + now.toLocaleString().replace(/[^0-9a-zA-Z]/g, '_');
}

function formatTimestampForDisplay(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `Selection_${year}/${month}/${day}_${hour}:${minute}`;
}

// For export file name (file-name safe)
function formatTimestampForFilename(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `Selection_${year}-${month}-${day}_${hour}-${minute}.json`;
  }


// Save Selection & Next: Save to localStorage and switch step
document.getElementById("saveEncounterSelection").addEventListener("click", () => {
    const selectedEncounters = encounterList.filter(enc => {
        const key = enc.name + "-" + enc.type;
        return selectedEncounterMap[key];
    });
    selectedEncountersGlobal = selectedEncounters;
    availableEncounters = [...selectedEncountersGlobal];

    // Use our helper function to get a default name based on local time.
    const newSelection = {
        name: getDefaultSelectionName(),
        data: selectedEncounters,
        timestamp: Date.now()
    };

    let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
    savedSelections.push(newSelection);

    function attemptSave(selections) {
        try {
            localStorage.setItem("encounterSelections", JSON.stringify(selections));
            return true;
        } catch (e) {
            if (e.name === "QuotaExceededError") {
                return false;
            } else {
                throw e;
            }
        }
    }

    // If saving fails, remove the oldest selection until successful.
    while (!attemptSave(savedSelections) && savedSelections.length > 0) {
        savedSelections.sort((a, b) => a.timestamp - b.timestamp);
        savedSelections.shift();
    }

    if (savedSelections.length === 0) {
        localStorage.removeItem("encounterSelections");
    } else {
        localStorage.setItem("encounterSelections", JSON.stringify(savedSelections));
    }

    switchStep("game-settings");
});

document.getElementById("manageLocalStorageButton").addEventListener("click", () => {
    showLocalStorageModal("manage");
});
renderEncounterSections();
/***********************************
 * Step 2: Game Settings Logic *
 ***********************************/
document.getElementById("challengeModeToggle").addEventListener("change", (e) => {
    document.getElementById("challengeModeSettings").style.display = e.target.checked ? "block" : "none";
});
let penaltyTime = 10;
let challengeModeEnabled = false;
let challengePhase1Duration = 10;
document.getElementById("saveSettingsButton").addEventListener("click", () => {
    let pVal = parseInt(document.getElementById("penaltyTimeInput").value);
    if (!isNaN(pVal)) penaltyTime = pVal;
    if (document.getElementById("challengeModeToggle").checked) {
        let tVal = parseInt(document.getElementById("phase1TimerInput").value);
        if (!isNaN(tVal)) challengePhase1Duration = tVal;
        challengeModeEnabled = true;
    } else {
        challengeModeEnabled = false;
    }
    switchStep("start-game");
});
/******************************
 * Step 3: Start Game Logic *
 ******************************/
let timerDuration = 300;
let remainingTime = timerDuration;
let timerInterval = null;
let phase1ChallengeTimerRemaining = 0;
let phase1ChallengeInterval = null;
let isPaused = false;
const timerDisplay = document.getElementById("timerDisplay");
const reconTimerDisplay = document.getElementById("reconTimerDisplay");
const penaltyWarning = document.getElementById("penaltyWarning");
const encounterNameElem = document.getElementById("encounterName");
const startReconButton = document.getElementById("startReconButton");
const startEncounterButton = document.getElementById("startEncounterButton");
const completeEncounterButton = document.getElementById("completeEncounterButton");
const penaltyButton = document.getElementById("penaltyButton");
const cancelPenaltyButton = document.getElementById("cancelPenaltyButton");
selectedEncountersGlobal = encounterList.filter(enc => {
    const key = enc.name + "-" + enc.type;
    return selectedEncounterMap[key];
});
let availableEncounters = [...selectedEncountersGlobal];
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}
function updateEncounterTimerDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
    if (remainingTime <= 0) document.body.style.backgroundColor = "red";
}
function updateReconTimerDisplay() {
    reconTimerDisplay.textContent = phase1ChallengeTimerRemaining + " sec";
}
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateEncounterTimerDisplay();
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        }
    }, 1000);
}
function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
}
function initReconPhase() {
    stopTimer();
    if (availableEncounters.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableEncounters.length);
        const encounter = availableEncounters.splice(randomIndex, 1)[0];
        encounterNameElem.textContent = encounter.name;
    } else {
        encounterNameElem.textContent = "No more encounters!";
    }
    penaltyWarning.style.display = "none";
    penaltyWarning.textContent = "";
    if (challengeModeEnabled) {
        phase1ChallengeTimerRemaining = challengePhase1Duration;
        updateReconTimerDisplay();
        document.getElementById("reconTimerBar").style.display = "flex";
        if (phase1ChallengeInterval) clearInterval(phase1ChallengeInterval);
        phase1ChallengeInterval = setInterval(() => {
            phase1ChallengeTimerRemaining--;
            updateReconTimerDisplay();
            if (phase1ChallengeTimerRemaining <= 0) {
                clearInterval(phase1ChallengeInterval);
                remainingTime = Math.max(0, remainingTime - penaltyTime);
                updateEncounterTimerDisplay();
                document.getElementById("reconTimerBar").style.display = "none";
                penaltyWarning.textContent = "Time expired, penalty applied.";
                penaltyWarning.style.display = "block";
            }
        }, 1000);
    } else {
        document.getElementById("reconTimerBar").style.display = "none";
    }
}
function goToEncounterPhase() {
    document.getElementById("phase1").style.display = "none";
    document.getElementById("phase2").style.display = "block";
    startTimer();
}
function completeEncounter() {
    stopTimer();
    document.getElementById("phase2").style.display = "none";
    document.getElementById("phase1").style.display = "block";
    initReconPhase();
}
function applyPenalty() {
    remainingTime = Math.max(0, remainingTime - penaltyTime);
    updateEncounterTimerDisplay();
}
function cancelPenalty() {
    remainingTime = Math.min(timerDuration, remainingTime + penaltyTime);
    updateEncounterTimerDisplay();
}
function pauseCurrentTimer() {
    if (document.getElementById("phase1").style.display === "block" && challengeModeEnabled && phase1ChallengeInterval) {
        clearInterval(phase1ChallengeInterval);
        phase1ChallengeInterval = null;
    } else if (document.getElementById("phase2").style.display === "block" && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
function resumeCurrentTimer() {
    if (document.getElementById("phase1").style.display === "block" && challengeModeEnabled) {
        phase1ChallengeInterval = setInterval(() => {
            phase1ChallengeTimerRemaining--;
            updateReconTimerDisplay();
            if (phase1ChallengeTimerRemaining <= 0) {
                clearInterval(phase1ChallengeInterval);
                remainingTime = Math.max(0, remainingTime - penaltyTime);
                updateEncounterTimerDisplay();
                document.getElementById("reconTimerBar").style.display = "none";
                penaltyWarning.textContent = "Time expired, penalty applied.";
                penaltyWarning.style.display = "block";
            }
        }, 1000);
    } else if (document.getElementById("phase2").style.display === "block") {
        startTimer();
    }
}
document.getElementById("startReconButton").addEventListener("click", () => {
    document.getElementById("expandSidebarButton").style.display = "none";
    document.getElementById("startReconButton").style.display = "none";
    document.getElementById("phase1").style.display = "block";
    initReconPhase();
    document.getElementById("newRoundButton").style.display = "block";
});
document.getElementById("startEncounterButton").addEventListener("click", () => {
    if (challengeModeEnabled && phase1ChallengeInterval) {
        clearInterval(phase1ChallengeInterval);
        phase1ChallengeInterval = null;
    }
    document.getElementById("reconTimerBar").style.display = "none";
    penaltyWarning.style.display = "none";
    goToEncounterPhase();
});
document.getElementById("completeEncounterButton").addEventListener("click", completeEncounter);
penaltyButton.addEventListener("click", applyPenalty);
cancelPenaltyButton.addEventListener("click", cancelPenalty);
document.getElementById("pauseResumeButton").addEventListener("click", () => {
    if (!isPaused) {
        pauseCurrentTimer();
        document.getElementById("pauseResumeButton").textContent = "▶";
        isPaused = true;
    } else {
        resumeCurrentTimer();
        document.getElementById("pauseResumeButton").textContent = "⏸";
        isPaused = false;
    }
});
document.getElementById("newRoundButton").addEventListener("click", () => {
    if (confirm("New Round Starting! Are you sure?")) {
        remainingTime = timerDuration;
        clearInterval(timerInterval);
        timerInterval = null;
        phase1ChallengeTimerRemaining = challengeModeEnabled ? challengePhase1Duration : 0;
        clearInterval(phase1ChallengeInterval);
        phase1ChallengeInterval = null;
        isPaused = false;
        updateEncounterTimerDisplay();
        switchStep("choose-encounter");
    }
});
updateEncounterTimerDisplay();
/***************************************
 * Local Storage Management Functions *
 ***************************************/
let localStorageMode = "manage"; // "manage" or "use"

// Show the local storage modal in a given mode
function showLocalStorageModal(mode) {
    localStorageMode = mode;
    if (mode === "manage") {
        document.getElementById("localStorageModalTitle").textContent = "Manage Selections";
        document.getElementById("localStorageManageButtons").style.display = "block";
        document.getElementById("localStorageUseButtons").style.display = "none";
        // In manage mode, hide default selections and upload/upload file elements
        document.getElementById("defaultSelectionsSection").style.display = "none";
        document.getElementById("userSelectionsSection").style.display = "block";
    } else if (mode === "use") {
        document.getElementById("localStorageModalTitle").textContent = "Select Preset Selection(s)";
        document.getElementById("localStorageManageButtons").style.display = "none";
        document.getElementById("localStorageUseButtons").style.display = "block";
        // In use mode, show both user and default selections
        document.getElementById("userSelectionsSection").style.display = "block";
        document.getElementById("defaultSelectionsSection").style.display = "block";
    }
    populateLocalStorageLists();
    document.getElementById("localStorageModal").style.display = "block";
}

// Populate user selections and default selections (for preset mode)
function populateLocalStorageLists() {
    // Populate user selections from localStorage
    let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
    const userListDiv = document.getElementById("userLocalStorageList");
    userListDiv.innerHTML = "";
    savedSelections.forEach((sel, index) => {
        const div = document.createElement("div");
        let displayName = sel.name;
        if (sel.name.startsWith("Selection_") && sel.timestamp) {
            displayName = formatTimestampForDisplay(sel.timestamp);
        }
        div.innerHTML = `<input type="checkbox" class="savedSelectionCheckbox" data-index="${index}" /> 
                 <span>${displayName}</span>`;
        userListDiv.appendChild(div);

    });
    // In "use" mode, also fetch default selections from subfolder
    if (localStorageMode === "use") {
        // Fetch a list of JSON file names from a file (e.g., "selection_presets/list.json")
        fetch("selection_presets/list.json")
            .then(response => response.json())
            .then(fileList => {
                const defaultListDiv = document.getElementById("defaultLocalStorageList");
                defaultListDiv.innerHTML = "";
                let defaultSelectionsArray = [];
                let fetchPromises = fileList.map(fileName => {
                    return fetch(`selection_presets/${fileName}`)
                        .then(response => response.json())
                        .then(data => {
                            // Use the file name as the selection name
                            data.name = fileName;
                            defaultSelectionsArray.push(data);
                            const div = document.createElement("div");
                            div.innerHTML = `<input type="checkbox" class="defaultSelectionCheckbox" data-index="${defaultSelectionsArray.length - 1}" /> 
                               <span>${fileName}</span>`;
                            defaultListDiv.appendChild(div);
                        });
                });
                Promise.all(fetchPromises).then(() => {
                    window.defaultSelections = defaultSelectionsArray;
                });
            })
            .catch(err => {
                console.error("Error loading default selections:", err);
                document.getElementById("defaultLocalStorageList").innerHTML = "No default selections available.";
            });
    }

}

document.getElementById("closeLocalStorageModal").addEventListener("click", () => {
    document.getElementById("localStorageModal").style.display = "none";
});

document.getElementById("renameSelectionButton").addEventListener("click", () => {
    const selectedIndexes = Array.from(document.querySelectorAll(".savedSelectionCheckbox"))
        .filter(cb => cb.checked)
        .map(cb => parseInt(cb.getAttribute("data-index")));
    if (selectedIndexes.length !== 1) {
        alert("Please select exactly one selection to rename.");
        return;
    }
    const newName = prompt("Enter new name:");
    if (newName) {
        let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
        savedSelections[selectedIndexes[0]].name = newName;
        localStorage.setItem("encounterSelections", JSON.stringify(savedSelections));
        populateLocalStorageLists();
    }
});

document.getElementById("deleteSelectionButton").addEventListener("click", () => {
    const selectedIndexes = Array.from(document.querySelectorAll(".savedSelectionCheckbox"))
        .filter(cb => cb.checked)
        .map(cb => parseInt(cb.getAttribute("data-index")));
    if (selectedIndexes.length === 0) {
        alert("Please select at least one selection to delete.");
        return;
    }
    if (!confirm("Are you sure you want to delete the selected selection(s)?")) return;
    let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
    selectedIndexes.sort((a, b) => b - a);
    selectedIndexes.forEach(idx => {
        savedSelections.splice(idx, 1);
    });
    localStorage.setItem("encounterSelections", JSON.stringify(savedSelections));
    populateLocalStorageLists();
});

// Converts a stored selection name (e.g., "Selection_2023/02/24_15:37")
// to a safe export filename (e.g., "Selection_2023-02-24_15-37.json")
function convertSelectionNameToExportFilename(selectionName) {
    return selectionName.replace(/\//g, '-').replace(/:/g, '-') + ".json";
  }


  document.getElementById("exportSelectionButton").addEventListener("click", () => {
    const selectedIndexes = Array.from(document.querySelectorAll(".savedSelectionCheckbox"))
      .filter(cb => cb.checked)
      .map(cb => parseInt(cb.getAttribute("data-index")));
    if (selectedIndexes.length === 0) {
      alert("Please select at least one selection to export.");
      return;
    }
    let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
    let selectionsToExport = selectedIndexes.map(idx => savedSelections[idx]);
    if (selectionsToExport.length > 1) {
      const combine = confirm("Export combined selection? Click OK to combine (duplicates removed) or Cancel to export individually.");
      if (combine) {
        const combined = combineSelections(selectionsToExport);
        const json = JSON.stringify(combined, null, 2);
        // Use the first selection's timestamp as the base (fallback to current time)
        const ts = selectionsToExport[0].timestamp || Date.now();
        const filename = formatTimestampForFilename(ts);
        downloadJSON(json, filename);
      } else {
        selectionsToExport.forEach(sel => {
          const json = JSON.stringify(sel, null, 2);
          const ts = sel.timestamp || Date.now();
          const filename = formatTimestampForFilename(ts);
          downloadJSON(json, filename);
        });
      }
    } else {
      const json = JSON.stringify(selectionsToExport[0], null, 2);
      const ts = selectionsToExport[0].timestamp || Date.now();
      const filename = formatTimestampForFilename(ts);
      downloadJSON(json, filename);
    }
  });
  

  function downloadJSON(json, filename) {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }
  

// Upload Selection button logic
document.getElementById("uploadSelectionButton").addEventListener("click", () => {
    document.getElementById("uploadFileInput").click();
});
document.getElementById("uploadFileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
        try {
            const uploadedSelection = JSON.parse(evt.target.result);
            // Use the file name as the default selection name
            let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
            const defaultName = file.name; // <-- changed here
            savedSelections.push({ name: defaultName, data: uploadedSelection.data || uploadedSelection });
            localStorage.setItem("encounterSelections", JSON.stringify(savedSelections));
            alert("Selection uploaded and saved.");
            populateLocalStorageLists();
        } catch (err) {
            alert("Error parsing JSON file.");
        }
    };
    reader.readAsText(file);
});


document.getElementById("useSelectionButton").addEventListener("click", () => {
    // Get selected user and default selections from the modal
    const userIndexes = Array.from(document.querySelectorAll(".savedSelectionCheckbox"))
        .filter(cb => cb.checked)
        .map(cb => parseInt(cb.getAttribute("data-index")));
    const defaultIndexes = Array.from(document.querySelectorAll(".defaultSelectionCheckbox"))
        .filter(cb => cb.checked)
        .map(cb => parseInt(cb.getAttribute("data-index")));

    let savedSelections = JSON.parse(localStorage.getItem("encounterSelections") || "[]");
    let selectionsToUse = [];
    userIndexes.forEach(idx => { selectionsToUse.push(savedSelections[idx]); });
    if (window.defaultSelections && defaultIndexes.length > 0) {
        defaultIndexes.forEach(idx => { selectionsToUse.push(window.defaultSelections[idx]); });
    }
    if (selectionsToUse.length === 0) {
        alert("Please select at least one selection to use.");
        return;
    }
    let combined = selectionsToUse.length === 1 ? selectionsToUse[0].data : combineSelections(selectionsToUse);

    // Check if there's an existing selection (if any checkbox is checked)
    const currentSelectionExists = Object.values(selectedEncounterMap).some(val => val === true);
    if (currentSelectionExists) {
        if (!confirm("This will overwrite your current selection. Continue?")) {
            return;
        }
    }

    // Overwrite the current selection:
    // 1. Reset all checkboxes in the global selection map to false.
    for (let key in selectedEncounterMap) {
        selectedEncounterMap[key] = false;
    }
    // 2. Mark as true those encounters in the combined selection.
    combined.forEach(enc => {
        const key = enc.name + "-" + enc.type;
        selectedEncounterMap[key] = true;
    });
    // 3. Update all checkbox elements accordingly.
    document.querySelectorAll(".encounterCheckbox").forEach(cb => {
        const key = cb.getAttribute("data-key");
        cb.checked = !!selectedEncounterMap[key];
    });
    // Update the toggle buttons for each section.
    ["event", "mini-boss", "monster", "obstacle", "person"].forEach(type => {
        updateToggleButton(type);
    });

    // Close the modal without switching steps.
    document.getElementById("localStorageModal").style.display = "none";
});


function combineSelections(selections) {
    let combined = [];
    let seen = {};
    selections.forEach(sel => {
        (sel.data || sel).forEach(enc => {
            const key = enc.name + "-" + enc.type;
            if (!seen[key]) {
                seen[key] = true;
                combined.push(enc);
            }
        });
    });
    return combined;
}

/***************************************
 * End of Local Storage Management *
 ***************************************/
window.onbeforeunload = function () {
    return "Warning: Resetting the timer!";
};
/***********************
 * End of Script *
 ***********************/
