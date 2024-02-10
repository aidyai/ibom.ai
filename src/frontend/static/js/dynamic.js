document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-content li');
    const card = document.getElementById('card');
    const dropdownCheckbox = document.getElementById('dropdown');
  
    // Show the card by default
    card.style.display = 'block';
  
    dropdownItems.forEach(function (item) {
      item.addEventListener('click', function () {
        // Fold back the dropdown when a dropdown item is clicked
        dropdownCheckbox.checked = false;
  
        // Hide the card
        card.style.display = 'none';
  
        // Get the text content of the clicked dropdown item
        const dropdownText = item.querySelector('a').textContent;
  
        // Check the text content and show the card if needed
        if (dropdownText === 'WORDS' || dropdownText === 'AUDIO' || dropdownText === 'FILES' || dropdownText === 'SUGGEST') {
          card.style.display = 'block';
        }
      });
    });
  
    // Handle the dropdown label click to hide the card
    const dropdownLabel = document.querySelector('.dropdown-btn');
    dropdownLabel.addEventListener('click', function () {
      card.style.display = 'none';
    });
  });
  

  
