// Ukrycie ekranu ładowania po 2 sekundach
setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('fade-out');
    document.querySelector('.container').classList.add('fade-in');
    document.querySelector('.header').classList.remove('hidden'); // Usunięcie klasy hidden
    document.querySelector('.header').classList.add('fade-in'); // Dodanie klasy fade-in
}, 2000);

// Funkcja do pobrania URL webhooka z pliku
function fetchWebhookURL() {
    return fetch('webhook.txt')
        .then(response => response.text())
        .then(url => url.trim());
}

// Funkcja wysyłająca wiadomość do webhooka Discorda
function sendWebhookMessage(webhookURL) {
    const message = {
        embeds: [{
            description: "Strona została odwiedzona!",
            color: 16777215, // Biały kolor
            thumbnail: {
                url: 'https://wasik05.github.io/webhook-visit.qr'
            },
            footer: {
                text: "wasik05.pl"
            }
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Wiadomość wysłana pomyślnie.');
        } else {
            console.error('Nie udało się wysłać wiadomości.');
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
}

// Pobranie URL webhooka i wysłanie wiadomości po załadowaniu strony
window.onload = function() {
    fetchWebhookURL().then(sendWebhookMessage);
};

// Funkcja do przełączania menu
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        navList.classList.add('inactive');
        navList.addEventListener('transitionend', () => {
            if (navList.classList.contains('inactive')) {
                navList.style.display = 'none';
                navList.classList.remove('inactive'); // Usunięcie klasy inactive po zakończeniu animacji
            }
        }, { once: true });
    } else {
        navList.style.display = 'flex';
        setTimeout(() => {
            navList.classList.add('active');
        }, 10); // Dodanie małego opóźnienia, aby zapewnić, że display: flex zostanie zastosowane przed rozpoczęciem animacji
    }
}