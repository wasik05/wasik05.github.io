// Dodanie biblioteki CryptoJS
(function() {
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
    document.head.appendChild(script);
})();

// Ukrycie ekranu ładowania po 2 sekundach
setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('fade-out');
    document.querySelector('.container').classList.add('fade-in');
    document.querySelector('.header').classList.remove('hidden'); // Usunięcie klasy hidden
    document.querySelector('.header').classList.add('fade-in'); // Dodanie klasy fade-in
}, 2000);

// Funkcja do pobrania URL webhooka z pliku i odszyfrowania tokena
function fetchWebhookURL() {
    return fetch('webhook.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd pobierania tokenu');
            }
            return response.text();
        })
        .then(encryptedToken => {
            const secretKey = CryptoJS.enc.Base64.parse('wObKSxwr3RX6EMW3B9rBHCIxWYsTGj7majhEnja3FRx7esP2clEPausP7nANqNHPIzz6tpB7F9eKWk2OXAjQ5JvCKi5rhxJPunYJbnjt8AM='); // Wprowadź tutaj swój klucz szyfrowania w Base64
            const iv = CryptoJS.enc.Hex.parse('your-128-bit-iv-here'); // Wprowadź tutaj swój Initialization Vector w Hex
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            const token = bytes.toString(CryptoJS.enc.Utf8);
            const baseURL = 'https://discord.com/api/webhooks/876214675040268329/';
            return baseURL + token.trim();
        });
}

// Funkcja do pobrania adresu IP klienta
function fetchClientIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

// Funkcja do wykrywania szczegółów urządzenia
function getDeviceDetails() {
    const userAgent = navigator.userAgent;
    return userAgent;
}

// Funkcja wysyłająca wiadomość do webhooka Discorda
function sendWebhookMessage(webhookURL, clientIP) {
    const deviceDetails = getDeviceDetails();
    const message = {
        username: "wasik05.pl",  // Dodanie nazwy
        avatar_url: 'https://wasik05.github.io/avatar.png',  // Dodanie URL do avatara
        embeds: [{
            description: "Strona została odwiedzona!",
            color: 16777215, // Biały kolor
            thumbnail: {
                url: 'https://wasik05.github.io/webhook-visit.qr'
            },
            footer: {
                text: `wasik05.pl - IP: ${clientIP} - Device: ${deviceDetails}`
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

// Pobranie URL webhooka i adresu IP klienta, a następnie wysłanie wiadomości po załadowaniu strony
window.onload = function() {
    Promise.all([fetchWebhookURL(), fetchClientIP()])
        .then(([webhookURL, clientIP]) => sendWebhookMessage(webhookURL, clientIP));
};

// Funkcja do przełączania menu
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.remove('finished'); // Usunięcie klasy finished na początku animacji
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        navList.classList.add('inactive');
        navList.addEventListener('transitionend', () => {
            if (navList.classList.contains('inactive')) {
                navList.style.display = 'none';
                navList.classList.remove('inactive'); // Usunięcie klasy inactive po zakończeniu animacji
                navList.classList.add('finished'); // Dodanie klasy finished po zakończeniu animacji
            }
        }, { once: true });
    } else {
        navList.style.display = 'flex';
        setTimeout(() => {
            navList.classList.add('active');
            navList.addEventListener('transitionend', () => {
                navList.classList.add('finished'); // Dodanie klasy finished po zakończeniu animacji
            }, { once: true });
        }, 0);
    }
}