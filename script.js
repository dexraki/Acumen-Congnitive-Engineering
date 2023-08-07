const categoryInput = document.getElementById('categoryInput');
const searchButton = document.getElementById('searchButton');
const gallery = document.getElementById('gallery');
const API_KEY = 'kvIz_RTYgTnkOmdHIW5LkGhJiMj0usctaV-LuFpWobQ';

searchButton.addEventListener('click', () => {
    const category = categoryInput.value;
    fetchImages(category);
});

async function fetchImages(category) {
    gallery.innerHTML = '';
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();

        if (data.results) {
            const images = data.results;
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.urls.regular;
                imgElement.alt = image.alt_description;

                const authorInfo = document.createElement('p');
                authorInfo.innerText = `Author: ${image.user.name}`;

                const description = document.createElement('p');
                description.innerText = image.description;

                const link = document.createElement('a');
                link.href = image.links.html;
                link.target = '_blank';
                link.innerText = 'View on Unsplash';

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                imageContainer.appendChild(imgElement);
                imageContainer.appendChild(authorInfo);
                imageContainer.appendChild(description);
                imageContainer.appendChild(link);

                gallery.appendChild(imageContainer);
            });
        } else {
            console.error('No images found in the API response');
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }


}
