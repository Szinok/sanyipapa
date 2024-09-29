let hayOriginalPosition = { left: 0, top: 0 };
let scissorsOriginalPosition = { left: 0, top: 0 };
let isHayMoving = false; // Nyomon követi, hogy a széna mozog-e
let isScissorsMoving = false; // Nyomon követi, hogy az olló mozog-e
let totalSheep = 14; // Összes birka száma
let shearedSheepCount = 0; // Nyírt birkák száma

window.onload = function() {
    const hay = document.getElementById('hay');
    const scissors = document.getElementById('scissors');
    
    const hayRect = hay.getBoundingClientRect();
    const scissorsRect = scissors.getBoundingClientRect();
    
    hayOriginalPosition = { left: hayRect.left, top: hayRect.top };
    scissorsOriginalPosition = { left: scissorsRect.left, top: scissorsRect.top };
};

function handleSheepClick(sheep) {
    const hay = document.getElementById('hay');
    const scissors = document.getElementById('scissors');

    // Ellenőrizzük, hogy a széna és az olló nincs-e mozgásban
    if (isHayMoving || isScissorsMoving) {
        return; // Ha bármelyik mozog, nem történik semmi
    }

    // Ellenőrizzük, hogy a birka nyírt-e
    if (sheep.dataset.sheared === "true") {
        // Széna teleportálása a nyírt birkához, ha nem mozog
        isHayMoving = true;
        const sheepRect = sheep.getBoundingClientRect();
        
        hay.style.position = 'absolute';
        hay.style.left = `${sheepRect.left}px`;
        hay.style.top = `${sheepRect.top}px`;

        // 2 másodperc után visszaviszi a szénát az eredeti helyére
        setTimeout(() => {
            hay.style.left = `${hayOriginalPosition.left}px`;
            hay.style.top = `${hayOriginalPosition.top}px`;
            isHayMoving = false; // Széna visszaért
        }, 2000);

        // A birka visszanöveszti a gyapját
        sheep.src = sheep.src.includes('fekete_birka') ? 'images/fekete_birka.png' : 'images/birka.png';
        sheep.dataset.sheared = "false"; // Már nem nyírt
    } else {
        // Olló teleportálása gyapjas birkához, ha nem mozog
        isScissorsMoving = true;
        const sheepRect = sheep.getBoundingClientRect();
        
        scissors.style.position = 'absolute';
        scissors.style.left = `${sheepRect.left}px`;
        scissors.style.top = `${sheepRect.top}px`;

        // 1 másodperc után visszaviszi az ollót az eredeti helyére
        setTimeout(() => {
            scissors.style.left = `${scissorsOriginalPosition.left}px`;
            scissors.style.top = `${scissorsOriginalPosition.top}px`;
            isScissorsMoving = false; // Olló visszaért

            // Nyírt állapot beállítása a birkára és eltűntetése 1 mp után
            sheep.src = sheep.src.includes('fekete_birka') ? 'images/fekete_birka_nyirt.png' : 'images/birka_nyirt.png';
            sheep.dataset.sheared = "true"; // Most nyírt

            // 1 másodperc múlva a birka eltűnik
            setTimeout(() => {
                sheep.style.visibility = 'hidden'; // Láthatatlanná tesszük
                shearedSheepCount++; // Növeljük a nyírt birkák számát

                // Ellenőrizzük, hogy az összes birkát megnyírtuk-e
                if (shearedSheepCount === totalSheep) {
                    showBirthdayMessage(); // Üzenet megjelenítése
                }
            }, 1000);
        }, 1000);
    }
}

function showBirthdayMessage() {
    const message = document.createElement('div');
    message.innerText = "BOLDOG SZÜLETÉSNAPOT SANYIPAPA!";
    message.style.position = 'absolute';
    message.style.left = '50%';
    message.style.top = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '40px'; // Kiindulási méret
    message.style.color = 'blue'; // Szín
    document.body.appendChild(message);

    // Lüktetés animáció
    let growing = true; // Nyomon követi a méretet
    setInterval(() => {
        const currentSize = parseInt(message.style.fontSize);
        message.style.fontSize = growing ? `${currentSize + 2}px` : `${currentSize - 2}px`;
        if (currentSize >= 60) growing = false;
        if (currentSize <= 40) growing = true;
    }, 100); // Frissítés gyakorisága

    // Eltüntetjük az eszközöket
    const hay = document.getElementById('hay');
    const scissors = document.getElementById('scissors');
    hay.style.visibility = 'hidden'; // Széna eltüntetése
    scissors.style.visibility = 'hidden'; // Olló eltüntetése
}
