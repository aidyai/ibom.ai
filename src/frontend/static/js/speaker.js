document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Check if text is not empty
    if (textInput.trim() !== '') {
        // Change the icon to the loading spinner immediately
        document.getElementById('speakerIcon').src = 'frontend/static/img/sp3inner.gif';
        document.getElementById('speakerIcon').classList.add('loading');

        // Send the text to your API endpoint
        fetch('https://aidyai--api-tts-api.modal.run/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove the loading class and change the icon to the speaker
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/play.gif';

            // Decode base64 and create an audio element dynamically
            var audioData = atob(data.audio_base64);
            var audioArrayBuffer = new ArrayBuffer(audioData.length);
            var audioView = new DataView(audioArrayBuffer);

            for (var i = 0; i < audioData.length; i++) {
                audioView.setUint8(i, audioData.charCodeAt(i));
            }

            var audioBlob = new Blob([audioArrayBuffer], { type: 'audio/wav' });
            var audioUrl = URL.createObjectURL(audioBlob);

            var audioPlayer = new Audio(audioUrl);

            // Play the audio
            audioPlayer.play();

            // Change the icon back to static microphone when audio is done
            audioPlayer.addEventListener('ended', function() {
                document.getElementById('speakerIcon').src = 'frontend/static/img/play.png';
            });
        })
        .catch(error => {
            console.error('Error:', error);

            // Remove the loading class and change the icon back to static microphone in case of an error
            document.getElementById('speakerIcon').classList.remove('loading');
            document.getElementById('speakerIcon').src = 'frontend/static/img/play.png';
        });
    }
});
