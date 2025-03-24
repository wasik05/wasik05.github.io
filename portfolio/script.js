document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');

    // Lista grafik do zaimportowania
    const images = [
        { src: 'images/IMG_7738.jpeg', alt: 'Graphic 1', description: 'Opis grafiki 1' },
        { src: 'images/IMG_7737.png', alt: 'Graphic 2', description: 'Opis grafiki 2' }
        // Dodaj więcej elementów według potrzeb
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

function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('open');
}
