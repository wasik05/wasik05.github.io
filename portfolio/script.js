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

// Dodanie funkcji do galerii
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');

    // Lista grafik do zaimportowania
    const images = [
        { src: 'images/001.PNG', alt: 'Graphic 1', description: 'Opis grafiki 1' },
        { src: 'images/002.PNG', alt: 'Graphic 2', description: 'Opis grafiki 2' },
        { src: 'images/003.PNG', alt: 'Graphic 3', description: 'Opis grafiki 3' }
    ];

    // Generowanie elementów galerii
    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        
        const description = document.createElement('p');
        description.textContent = image.description;
        
        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(description);
        
        gallery.appendChild(galleryItem);
    });
});