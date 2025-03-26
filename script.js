// Ukrycie ekranu ładowania po 2 sekundach
setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('fade-out');
    document.querySelector('.container').classList.add('fade-in');
    document.querySelector('.header').classList.remove('hidden'); // Usunięcie klasy hidden
    document.querySelector('.header').classList.add('fade-in'); // Dodanie klasy fade-in
}, 2000);

// Funkcja do pobrania URL webhooka z pliku
function fetchWebhookURL() {
    return fetch('webhook.txt')  // Pobieramy token z pliku
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd pobierania tokenu');
            }
            return response.text();
        })
        .then(token => {
            const baseURL = 'https://discord.com/api/webhooks/876214675040268329/';
            return baseURL + token.trim(); // Sklejamy pełny URL
        });
}

// Funkcja do pobrania adresu IP klienta
function fetchClientIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

// Funkcja wysyłająca wiadomość do webhooka Discorda
function sendWebhookMessage(webhookURL, clientIP) {
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
                text: `wasik05.pl - IP: ${clientIP}`
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

// Kod do obsługi OneSignal
(function() {
    var onesignalScript = document.createElement('script');
    onesignalScript.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    onesignalScript.defer = true;
    document.head.appendChild(onesignalScript);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
            appId: "42f49d05-bd92-4a8e-a44d-ab1afb4f81ff",
            safari_web_id: "web.onesignal.auto.049ba086-b9bb-478c-827f-71a35c67ecc8",
            notifyButton: {
                enable: true,
            },
        });
    });
})();