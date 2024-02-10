let bouton = document.querySelector('.btn');
let content = document.querySelector('.content');
let particule = 13;
var part;
var compt = 0;

bouton.addEventListener('click',()=>{
    if(compt <13)
    {
        for(let i=0;i<particule;i++)
        {
           part =  document.createElement('span');
           part.classList.add('perticles-circle');
           content.appendChild(part);
           compt++
        }
    }
    else if(compt >13)
    {
        compt = 0 
    }
    content.classList.add('active')
        setTimeout(() => {
            content.classList.remove('active')
        }, 1800);
       
       
   
   
    
})


document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-content li');
    const card = document.getElementById('card');
    const text = document.querySelector('.text');
    const dropdownCheckbox = document.getElementById('dropdown');
    const showTextKey = 'showText';

    // Check if the showText flag is set in localStorage
    const shouldShowText = localStorage.getItem(showTextKey) !== 'false';

    // Show or hide the text based on the localStorage flag
    text.style.display = shouldShowText ? 'block' : 'none';
    card.style.display = shouldShowText ? 'none' : 'block';

    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Fold back the dropdown when a dropdown item is clicked
            dropdownCheckbox.checked = false;

            // Hide the card
            card.style.display = 'none';

            // Set the showText flag to false in localStorage
            localStorage.setItem(showTextKey, 'false');

            // Reload the page to apply changes
            location.reload();
        });
    });

    // Handle the dropdown label click to hide the card
    const dropdownLabel = document.querySelector('.dropdown-btn');
    dropdownLabel.addEventListener('click', function () {
        // Set the showText flag to false in localStorage
        localStorage.setItem(showTextKey, 'false');

        // Reload the page to apply changes
        location.reload();
    });
});

  



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

