document.addEventListener('DOMContentLoaded', function() {
    // Get all speaker icons (assuming they have the class 'speakerIcon')
    const speakerIcons = document.querySelectorAll('.speakerIcon');

    // Add click event listener to each speaker icon
    speakerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const term = this.dataset.term; // Get the term associated with the icon

            // Check if term is not empty
            if (term.trim() !== '') {
                // Change the icon to the loading spinner immediately
                icon.src = 'frontend/static/img/spiin.gif';
                icon.classList.add('loading');

                // Send the text to your API endpoint for text-to-speech
                fetchTextToSpeech(term)
                    .then(audioUrl => {
                        // Remove the loading class and change the icon to the play icon
                        icon.classList.remove('loading');
                        icon.src = 'frontend/static/img/aud.gif';

                        // Create an audio element dynamically
                        const audioPlayer = new Audio(audioUrl);

                        // Play the audio
                        audioPlayer.play();

                        // Change the icon back to static microphone when audio is done
                        audioPlayer.addEventListener('ended', function() {
                            icon.src = 'frontend/static/img/aud.png';
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);

                        // Remove the loading class and change the icon back to static microphone on error
                        icon.classList.remove('loading');
                        icon.src = 'frontend/static/img/aud.png';
                    });
            }
        });
    });

    // Function to fetch audio URL from the API
    async function fetchTextToSpeech(text) {
        const apiUrl = 'https://aidyai--api-tts-api.modal.run/';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        };

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
});
