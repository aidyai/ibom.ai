
// your_script.js
document.getElementById('speakerIcon').addEventListener('click', function() {
    // Get the text input
    var textInput = document.getElementById('textInput').value;

    // Check if text is not empty
    if (textInput.trim() !== '') {
        // Change the icon to the loading spinner immediately
        document.getElementById('speakerIcon').src = 'frontend/static/img/sp3inner.gif';
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
            document.getElementById('speakerIcon').src = 'frontend/static/img/play.gif';

            // Create a Blob URL from the received blob and cache it
            var audioUrl = URL.createObjectURL(blob);

            // Create an audio element dynamically
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
            document.getElementById('speakerIcon').src = 'frontend//img/play.png';
        });
    }
});