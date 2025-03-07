const events = [
    { name: "Anniversary Event", timestamp: 1742273999, type: "event" },
    { name: "New Banner Release", timestamp: 1742273999, type: "event" },
    { name: "New LR Card", timestamp: "2025-06-01T00:00:00Z", type: "card" }
];

function updateCountdowns(filter = "all") {
    const container = document.getElementById("countdowns");
    container.innerHTML = "";

    events
        .filter(event => filter === "all" || event.type === filter)
        .forEach(event => {
            let eventTime;

            if (!isNaN(event.timestamp)) {
                eventTime = Number(event.timestamp) * 1000; // UNIX timestamp en segundos -> milisegundos
            } else {
                eventTime = new Date(event.timestamp).getTime(); // Fecha en string
            }

            const now = new Date().getTime();
            const timeLeft = eventTime - now;

            if (timeLeft < 0) return; // Evita mostrar eventos expirados

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            const eventElement = document.createElement("div");
            eventElement.classList.add("countdown-container");
            eventElement.innerHTML = `
                <h2>${event.name}</h2>
                <div class="timer">${days}d ${hours}h ${minutes}m ${seconds}s</div>
            `;
            container.appendChild(eventElement);
        });
}

setInterval(updateCountdowns, 1000);
updateCountdowns();