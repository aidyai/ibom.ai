////////////////////////

//////////////////////////
const texts = [
    "Hello, World!",
    "This is a random text.",
    "Programming is fun!",
    "You're doing great!",
    "Random text generator.",
    "Web development is exciting."
];

function displayRandomText() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const randomIndex = Math.floor(Math.random() * texts.length);
    const randomText = texts[randomIndex];

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "16px Arial";
    context.fillText(randomText, 10, 30);

    document.getElementById("displayText").textContent = randomText;
}

// Update canvas size based on text length
function updateCanvasSize() {
    const canvas = document.getElementById("canvas");
    const text = document.getElementById("displayText").textContent;
  
    // Adjust canvas width based on text length
    canvas.width = text.length * 15; // You can adjust the multiplier for spacing
  
    // Redraw text on canvas
    drawStringOnCanvas(text);
  }
  
  // Call updateCanvasSize when window is resized
  window.addEventListener("resize", updateCanvasSize);

  




let rec;
let audioChunks = [];
let startTime;
let isRecording = false;

function toggleRecording() {
    let counterElement = document.getElementById("counter");
    let recordIcon = document.getElementById("recordIcon");

    if (!isRecording) {
        // Request microphone permission
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                // Start recording
                counterElement.textContent = "0:00";
                startTime = Date.now();
                isRecording = true;

                recordIcon.classList.remove("fa-microphone");
                recordIcon.classList.add("fa-stop");

                document.getElementById("audioElement").style.display = "none";

                // Start the counter
                updateCounter();

                // Start recording audio
                startRecording();
            })
            .catch((error) => {
                console.error("Error accessing microphone:", error);
                // Handle error (e.g., display a message to the user)
            });
    } else {
        // Stop recording
        stopRecording();

        recordIcon.classList.remove("fa-stop");
        recordIcon.classList.add("fa-microphone");

        isRecording = false;
    }
}

function startRecording() {
    try {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                rec = new MediaRecorder(stream);

                rec.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                rec.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // Display the audio in the <audio> element
                    document.getElementById('audioElement').src = audioUrl;

                    // Clear recordedChunks for the next recording
                    audioChunks = [];

                    // Show the audio element after stopping
                    document.getElementById('audioElement').style.display = 'block';
                };

                rec.start();
            })
            .catch((error) => {
                console.error("Error accessing microphone:", error);
                // Handle error (e.g., display a message to the user)
            });
    } catch (error) {
        console.error("Error accessing microphone:", error);
        // Handle error (e.g., display a message to the user)
    }
}

function stopRecording() {
    if (rec && rec.state !== 'inactive') {
        rec.stop();
    }
}

function updateCounter() {
    if (isRecording) {
        const elapsedMilliseconds = Date.now() - startTime;
        const seconds = Math.floor(elapsedMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Display the counter
        document.getElementById('counter').innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

        // Update the counter every second
        setTimeout(updateCounter, 1000);
    }
}

