
// your_script.js
document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Check if text is not empty
    if (textInput.trim() !== '') {
        // Change the icon to the loading spinner immediately
        document.getElementById('speakerIcon').src = 'frontend/static/img/spiin.gif';
        document.getElementById('speakerIcon').classList.add('loading');

        // Send the text to the backend endpoint
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Remove the loading class and change the icon to the speaker
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.gif';

            // Create a Blob URL from the received blob and cache it
            var audioUrl = URL.createObjectURL(blob);

            // Create an audio element dynamically
            var audioPlayer = new Audio(audioUrl);

            // Play the audio
            audioPlayer.play();

            // Change the icon back to static microphone when audio is done
            audioPlayer.addEventListener('ended', function() {
                document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
            });
        })
        .catch(error => {
            console.error('Error:', error);

            // Remove the loading class and change the icon back to static microphone in case of an error
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
        });
    }
});



document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Check if text is not empty
    if (textInput.trim() !== '') {
        // Change the icon to the loading spinner immediately
        document.getElementById('speakerIcon').src = 'frontend/static/img/spiin.gif';
        document.getElementById('speakerIcon').classList.add('loading');

        // Send the text to your API endpoint
        fetch('https://aidyai--api-tts-api.modal.run/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Remove the loading class and change the icon to the speaker
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.gif';

            // Create an audio element dynamically
            var audioUrl = URL.createObjectURL(blob);
            var audioPlayer = new Audio(audioUrl);

            // Play the audio
            audioPlayer.play();

            // Change the icon back to static microphone when audio is done
            audioPlayer.addEventListener('ended', function() {
                document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
            });
        })
        .catch(error => {
            console.error('Error:', error);

            // Remove the loading class and change the icon back to static microphone in case of an error
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
        });
    }
});



document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the term from the result dynamically
    var term = document.querySelector('.Word').textContent.trim();

    // Check if term is not empty
    if (term !== '') {
        // Change the icon to the loading spinner immediately
        var iconElement = document.getElementById('speakerIcon');
        iconElement.src = 'frontend/static/img/spiin.gif';
        iconElement.classList.add('loading');

        // Send the term to your API endpoint for text-to-speech
        fetch('https://aidyai--api-tts-api.modal.run/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: term }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Remove the loading class and change the icon to the speaker
            iconElement.classList.remove('loading');
            iconElement.src = 'frontend/static/img/aud.gif';

            // Create an audio element dynamically
            var audioUrl = URL.createObjectURL(blob);
            var audioPlayer = new Audio(audioUrl);

            // Play the audio
            audioPlayer.play();

            // Change the icon back to static microphone when audio is done
            audioPlayer.addEventListener('ended', function() {
                iconElement.src = 'frontend/static/img/aud.png';
            });
        })
        .catch(error => {
            console.error('Error:', error);

            // Remove the loading class and change the icon back to static microphone in case of an error
            iconElement.classList.remove('loading');
            iconElement.src = 'frontend/static/img/aud.png';
        });
    }
});



// Add event listeners to all speaker icons with the 'icon' class
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // Find the corresponding term for this icon (in the same parent container)
        var term = this.parentElement.querySelector('.Word').textContent.trim();

        // Check if term is not empty
        if (term !== '') {
            // Change the icon to the loading spinner immediately
            var iconElement = this;
            iconElement.src = 'frontend/static/img/spiin.gif';
            iconElement.classList.add('loading');

            // Send the term to your API endpoint for text-to-speech
            fetch('https://aidyai--api-tts-api.modal.run/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: term }),
            })
            .then(response => response.blob())
            .then(blob => {
                // Remove the loading class and change the icon to the speaker
                iconElement.classList.remove('loading');
                iconElement.src = 'frontend/static/img/aud.gif';

                // Create an audio element dynamically
                var audioUrl = URL.createObjectURL(blob);
                var audioPlayer = new Audio(audioUrl);

                // Play the audio
                audioPlayer.play();

                // Change the icon back to static microphone when audio is done
                audioPlayer.addEventListener('ended', function() {
                    iconElement.src = 'https://img.icons8.com/ios-filled/30/high-volume--v2.png';
                });
            })
            .catch(error => {
                console.error('Error:', error);

                // Remove the loading class and change the icon back to static microphone in case of an error
                iconElement.classList.remove('loading');
                iconElement.src = 'frontend/static/img/aud.png';
            });
        }
    });
});












document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Check if text is not empty
    if (textInput.trim() !== '') {
        // Change the icon to the loading spinner immediately
        document.getElementById('speakerIcon').src = 'frontend/static/img/spiin.gif';
        document.getElementById('speakerIcon').classList.add('loading');

        // Send the text to your API endpoint
        fetch('https://aidyai--api-tts-api.modal.run/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Remove the loading class and change the icon to the speaker
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.gif';

            // Create an audio element dynamically
            var audioUrl = URL.createObjectURL(blob);
            var audioPlayer = new Audio(audioUrl);

            // Play the audio
            audioPlayer.play();

            // Change the icon back to static microphone when audio is done
            audioPlayer.addEventListener('ended', function() {
                document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
            });
        })
        .catch(error => {
            console.error('Error:', error);

            // Remove the loading class and change the icon back to static microphone in case of an error
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/aud.png';
        });
    }
});