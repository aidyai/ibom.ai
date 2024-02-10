const randomTexts = [
    "The sunsets over the horizon in a blaze of orange and pink",
    "Coffee beans release a rich aroma as they grind in the morning",
    "The old bookshelf creaks under the weight of well-worn novels",
    "Laughter echoes through the park as children play on the swings",
    "Raindrops tap rhythmically on the windowpane, creating a soothing melody",
    "A curious cat peers out from behind the curtains, watching the world go by",
    "The city skyline glows with the lights of a thousand buildings",
    "Warmth radiates from the fireplace, creating a cozy atmosphere",
    "Waves crash against the shore, leaving behind a trail of foamy bubbles",
    "The mountain peak is shrouded in mist, creating an air of mystery",
    "Delicate petals unfurl as a new flower blooms in the garden",
    "Street vendors offer a colorful array of fruits and spices in the market",
    "The scent of pine fills the air as a gentle breeze rustles through the forest",
    "A lone wolf howls at the moon in the quiet of the night",
    "Footsteps crunch on fallen leaves during a leisurely autumn stroll",
    "The distant hum of traffic fades away as nature takes center stage",
    "Stars twinkle in the midnight sky, forming constellations of stories",
    "A violinist plays a haunting melody in the dimly lit jazz club",
    "Clouds drift lazily across the sky, creating ever-changing patterns",
    "The aroma of freshly baked bread wafts from the neighborhood bakery",
    "Hikers trek through a sun-dappled forest, exploring hidden trails",
    "A rainbow arcs across the sky after a passing rain shower",
    "The old lighthouse stands tall, guiding ships safely to shore",
    "Butterflies flutter around a vibrant garden in the afternoon sun",
    "A street artist creates a masterpiece with vibrant strokes of color",
    "The air is filled with the sizzle of a barbecue on a summer evening",
    "Whispers of a gentle breeze carry the sweet fragrance of cherry blossoms",
    "A campfire crackles, casting dancing shadows on the tent walls",
    "Bubbles rise to the surface as a scuba diver explores an underwater world",
    "The moon reflects on a calm lake, creating a mirror-like surface",
    "A wise owl perches on a branch, observing the nocturnal activities",
    "The pages of an old journal are filled with handwritten memories",
    "The first snowfall blankets the landscape in a pristine layer of white"
];


let currentIndex = 0;

function displayRandomText() {
    const randomTextElement = document.getElementById('randomText');
    const userInputElement = document.getElementById('user-input');
    const successMessageElement = document.getElementById('successMessage');

    // Display random text
    randomTextElement.innerText = randomTexts[currentIndex];

    // Show the user input and button, hide the success message
    userInputElement.style.display = 'block';
    successMessageElement.style.display = 'none';

    // Increment index for the next random text
    currentIndex = (currentIndex + 1) % randomTexts.length;
}

function submitFeedback() {
    const userInputElement = document.getElementById('user-input');
    const successMessageElement = document.getElementById('successMessage');

    // Check if user input is not empty
    if (userInputElement.value.trim() !== '') {
        // Hide user input and button, show success message
        userInputElement.style.display = 'none';
        successMessageElement.style.display = 'block';

        // Automatically load another random text after a delay (0.5 seconds)
        setTimeout(displayRandomText, 500);
    } else {
        alert('Please provide feedback before submitting.');
    }
}

// Initial display
displayRandomText();