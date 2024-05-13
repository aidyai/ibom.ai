document.addEventListener('DOMContentLoaded', function() {
    // Get all spinner icons
    const spinnerIcons = document.querySelectorAll('.spinner-icon');

    // Add click event listener to each spinner icon
    spinnerIcons.forEach(spinnerIcon => {
        spinnerIcon.addEventListener('click', function() {
            // Start the spinning animation
            this.src = "frontend/static/img/spnr.gif";
            this.style.pointerEvents = 'none'; // Disable clicking on the spinner while spinning
            
            // Extract the text from the paragraph
            const sentenceText = this.parentNode.textContent.trim().replace(/^\d+\.\s*/, ''); // Remove the leading number and space

            // Send the text to your API endpoint for text-to-speech
            fetchTextToSpeech(sentenceText)
                .then(audioUrl => {
                    // Stop the spinning animation and enable clicking on the spinner
                    this.src = 'https://img.icons8.com/ios-glyphs/30/speaker.png';
                    this.style.pointerEvents = 'auto';
                    
                    // Create an audio element dynamically
                    const audioPlayer = new Audio(audioUrl);

                    // Play the audio
                    audioPlayer.play();
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Stop the spinning animation and enable clicking on the spinner
                    this.src = 'https://img.icons8.com/ios-glyphs/30/speaker.png';
                    this.style.pointerEvents = 'auto';
                    
                    // Handle error here if needed
                });
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