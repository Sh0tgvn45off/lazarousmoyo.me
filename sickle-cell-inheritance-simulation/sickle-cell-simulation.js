/* sickle-cell-simulation.js */

// --- Data and Constants ---

const alleleOptions = ["AA", "AS", "SS"];
const arrowGifUrl = "arrow-icon.gif"; // Updated to local arrow filename
const iconBasePath = "./";

const defaultGrandparentAlleles = {
    grandparentA1: "AA",
    grandparentA2: "AS",
    grandparentB1: "AS",
    grandparentB2: "AA"
};


// --- HTML Element Selectors ---
let grandparentA1AlleleSelector;
let grandparentA2AlleleSelector;
let grandparentB1AlleleSelector;
let grandparentB2AlleleSelector;
let simulateButton;
let restartButton;
let simulationResultsDiv;
let childrenContainerDiv;
let numChildrenSelector;

// --- Simulation Functions ---

function initializeSimulation() {
    console.log("Simulation Initializing...");

    // Get HTML element references
    grandparentA1AlleleSelector = document.getElementById('grandparent-a1-allele');
    grandparentA2AlleleSelector = document.getElementById('grandparent-a2-allele');
    grandparentB1AlleleSelector = document.getElementById('grandparent-b1-allele');
    grandparentB2AlleleSelector = document.getElementById('grandparent-b2-allele');
    simulateButton = document.querySelector('.project-btn.simulate');
    restartButton = document.querySelector('.project-btn.restart');
    simulationResultsDiv = document.getElementById('simulation-results');
    childrenContainerDiv = document.getElementById('children-container');
    numChildrenSelector = document.getElementById('num-children');


    if (!grandparentA1AlleleSelector || !grandparentA2AlleleSelector || !grandparentB1AlleleSelector || !grandparentB2AlleleSelector || !simulateButton || !restartButton || !simulationResultsDiv || !childrenContainerDiv || !numChildrenSelector) {
        console.error("Error: Could not find all necessary HTML elements. Check your IDs and selectors.");
        return;
    }


    // Initialize allele selectors
    populateAlleleSelector(grandparentA1AlleleSelector, defaultGrandparentAlleles.grandparentA1);
    populateAlleleSelector(grandparentA2AlleleSelector, defaultGrandparentAlleles.grandparentA2);
    populateAlleleSelector(grandparentB1AlleleSelector, defaultGrandparentAlleles.grandparentB1);
    populateAlleleSelector(grandparentB2AlleleSelector, defaultGrandparentAlleles.grandparentB2);
    populateNumChildrenSelector(numChildrenSelector); // Populate number of children dropdown


    clearSimulationDisplay();
    displayGrandparentsInitial(defaultGrandparentAlleles);


    // Add event listeners to buttons
    simulateButton.addEventListener('click', handleSimulateClick);
    restartButton.addEventListener('click', handleRestartClick);

    console.log("Simulation Initialized.");
}

function populateNumChildrenSelector(selector) {
    if (!selector) return;
    for (let i = 1; i <= 4; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selector.appendChild(option);
    }
    selector.value = '4'; // Default to 4 children
}


function displayGrandparentsInitial(alleles) {
    displayGrandparent('grandparent-a1', 'Grandfather-A-icon.png', alleles.grandparentA1);
    displayGrandparent('grandparent-a2', 'Grandmother-A-icon.png', alleles.grandparentA2);
    displayGrandparent('grandparent-b1', 'Grandfather-B-icon.png', alleles.grandparentB1);
    displayGrandparent('grandparent-b2', 'Grandmother-B-icon.png', alleles.grandparentB2);
}

function displayGrandparent(grandparentIdPrefix, iconFilename, allele) {
    const iconPlaceholder = document.getElementById(`${grandparentIdPrefix}-icon`);
    const alleleSelectorElement = document.getElementById(`${grandparentIdPrefix}-allele`);

    if (iconPlaceholder && alleleSelectorElement) {
        iconPlaceholder.innerHTML = `<img src="${iconBasePath}${iconFilename}" alt="${grandparentIdPrefix} Icon">`;
         populateAlleleSelector(alleleSelectorElement, allele);
    }
}


function populateAlleleSelector(selector, defaultAllele) {
    if (!selector) return;

    alleleOptions.forEach(allele => {
        const option = document.createElement('option');
        option.value = allele;
        option.textContent = allele;
        selector.appendChild(option);
    });
    selector.value = defaultAllele;
}


function getGrandparentAlleles() {
    return {
        grandparentA1: grandparentA1AlleleSelector ? grandparentA1AlleleSelector.value : defaultGrandparentAlleles.grandparentA1,
        grandparentA2: grandparentA2AlleleSelector ? grandparentA2AlleleSelector.value : defaultGrandparentAlleles.grandparentA2,
        grandparentB1: grandparentB1AlleleSelector ? grandparentB1AlleleSelector.value : defaultGrandparentAlleles.grandparentB1,
        grandparentB2: grandparentB2AlleleSelector ? grandparentB2AlleleSelector.value : defaultGrandparentAlleles.grandparentB2
    };
}


function simulateInheritance(parent1Alleles, parent2Alleles) {
    const allele1FromParent1 = parent1Alleles[Math.floor(Math.random() * parent1Alleles.length)];
    const allele2FromParent2 = parent2Alleles[Math.floor(Math.random() * parent2Alleles.length)];
    const childGenotype =  [allele1FromParent1, allele2FromParent2].sort().join("");
    return childGenotype;
}


function generateParentsGenotypes(grandparentAllelesA, grandparentAllelesB) {
    const parentAGenotypeParts = [
        grandparentAllelesA.grandparentA1.split(""),
        grandparentAllelesA.grandparentA2.split("")
    ];

    const parentBGenotypeParts = [
        grandparentAllelesB.grandparentB1.split(""),
        grandparentAllelesB.grandparentB2.split("")
    ];

    const parentAAlleles = [parentAGenotypeParts[0][Math.floor(Math.random() * 2)], parentAGenotypeParts[1][Math.floor(Math.random() * 2)] ];
    const parentBAlleles = [parentBGenotypeParts[0][Math.floor(Math.random() * 2)], parentBGenotypeParts[1][Math.floor(Math.random() * 2)] ];

    const parentAGenotype = parentAAlleles.sort().join("");
    const parentBGenotype = parentBAlleles.sort().join("");

    return {
        parentA: parentAGenotype,
        parentB: parentBGenotype
    };
}


function generateChildrenGenotypes(parentGenotypes, numberOfChildren) {
    const childrenGenotypes = [];
    const parentAAlleles = parentGenotypes.parentA.split("");
    const parentBAlleles = parentGenotypes.parentB.split("");

    for (let i = 0; i < numberOfChildren; i++) {
        const childGenotype = simulateInheritance(parentAAlleles, parentBAlleles);
        childrenGenotypes.push(childGenotype);
    }
    return childrenGenotypes;
}

function displayFamilyTree(grandparentAlleles, parentGenotypes, childrenGenotypes, numberOfChildren) {
    clearSimulationDisplay();

    // --- Display Parents ---
    displayParent('parent-a',  Math.random() < 0.5 ? 'Father-A-icon.png' : 'Father-B-icon.png', parentGenotypes.parentA);
    displayParent('parent-b', Math.random() < 0.5 ? 'Mother-A-icon.png' : 'Mother-B-icon.png', parentGenotypes.parentB);


    // --- Display Children ---
    const childrenAreaDiv = document.getElementById('children-container');
    childrenAreaDiv.innerHTML = '';

    childrenGenotypes.forEach((genotype, index) => {
        const childDiv = document.createElement('div');
        childDiv.className = 'child';

        const childIconPlaceholder = document.createElement('div');
        childIconPlaceholder.className = 'icon-placeholder';
        childIconPlaceholder.id = `child-${index + 1}-icon`;

        const childAlleleDisplay = document.createElement('div');
        childAlleleDisplay.className = 'allele-display';
        childAlleleDisplay.id = `child-${index + 1}-allele-display`;

        childDiv.appendChild(childIconPlaceholder);
        childDiv.appendChild(childAlleleDisplay);
        childrenAreaDiv.appendChild(childDiv);


        const childIconFilename = (index % 2 === 0) ? (Math.random() < 0.5 ? 'Son-A-icon.png' : 'Son-B-icon.png') : (Math.random() < 0.5 ? 'Daughter-A-icon.png' : 'Daughter-B-icon.png');
        displayChild(`child-${index + 1}`, childIconFilename, genotype);
    });


    // --- Display simulation result text ---
    let resultsHTML = "<h3>Simulation Results:</h3><ul>";
    childrenGenotypes.forEach((genotype, index) => {
        const phenotypeText = predictPhenotype(genotype);
        resultsHTML += `<li>Child ${index + 1}: Genotype: ${genotype}, Phenotype: ${phenotypeText}</li>`;
    });
    resultsHTML += "</ul>";
    simulationResultsDiv.innerHTML = resultsHTML;

}

function displayParent(parentIdPrefix, iconFilename, allele) {
    const iconPlaceholder = document.getElementById(`${parentIdPrefix}-icon`);
    const alleleDisplayElement = document.getElementById(`${parentIdPrefix}-allele-display`);

    if (iconPlaceholder && alleleDisplayElement) {
        iconPlaceholder.innerHTML = `<img src="${iconBasePath}${iconFilename}" alt="${parentIdPrefix} Icon">`;
        displayAlleleLogo(alleleDisplayElement, allele);
    }
}

function displayChild(childIdPrefix, iconFilename, allele) {
    const iconPlaceholder = document.getElementById(`${childIdPrefix}-icon`);
    const alleleDisplayElement = document.getElementById(`${childIdPrefix}-allele-display`);

    if (iconPlaceholder && alleleDisplayElement) {
         iconPlaceholder.innerHTML = `<img src="${iconBasePath}${iconFilename}" alt="${childIdPrefix} Icon">`;
         displayAlleleLogo(alleleDisplayElement, allele);
    }
}


function displayAlleleLogo(alleleDisplayElement, allele) {
    let logoFilename = "";
    if (allele === "AA") {
        logoFilename = "AA-logo.png";
    } else if (allele === "AS") {
        logoFilename = "AS-logo.png";
    } else if (allele === "SS") {
        logoFilename = "SS-logo.png";
    }
     alleleDisplayElement.innerHTML = logoFilename ? `<img src="${iconBasePath}${logoFilename}" alt="${allele} Logo">` : allele;
}


function predictPhenotype(genotype) {
    if (genotype === "AA") {
        return "Normal";
    } else if (genotype === "AS") {
        return "Trait";
    } else if (genotype === "SS") {
        return "Sickle Cell Disease";
    } else {
        return "Unknown";
    }
}


function clearSimulationDisplay() {
    simulationResultsDiv.innerHTML = "";
    childrenContainerDiv.innerHTML = '';
}


function handleSimulateClick() {
    console.log("Simulate button clicked");

    const grandparentStartingAlleles = getGrandparentAlleles();
    console.log("Grandparent Alleles:", grandparentStartingAlleles);

    const parentAlleles = generateParentsGenotypes(
        { grandparentA1: grandparentStartingAlleles.grandparentA1, grandparentA2: grandparentStartingAlleles.grandparentA2 },
        { grandparentB1: grandparentStartingAlleles.grandparentB1, grandparentB2: grandparentStartingAlleles.grandparentB2 }
    );
    console.log("Parent Alleles:", parentAlleles);


    const numberOfChildren = parseInt(numChildrenSelector.value);
    const childrenAlleles = generateChildrenGenotypes(parentAlleles, numberOfChildren);
    console.log("Children Alleles:", childrenAlleles);


    displayFamilyTree(grandparentStartingAlleles, parentAlleles, childrenAlleles, numberOfChildren);
}


function handleRestartClick() {
    console.log("Restart button clicked");
    clearSimulationDisplay();
    displayGrandparentsInitial(defaultGrandparentAlleles);
    grandparentA1AlleleSelector.value = defaultGrandparentAlleles.grandparentA1;
    grandparentA2AlleleSelector.value = defaultGrandparentAlleles.grandparentA2;
    grandparentB1AlleleSelector.value = defaultGrandparentAlleles.grandparentB1;
    grandparentB2AlleleSelector.value = defaultGrandparentAlleles.grandparentB2;
    numChildrenSelector.value = '4'; // Reset children number to default
}


// --- Initialization on page load ---
document.addEventListener('DOMContentLoaded', initializeSimulation);
