document.addEventListener('DOMContentLoaded', function () {
    var textDiv = document.querySelector('.text');
    var dropdownCheckbox = document.getElementById('dropdown');

    // Function to handle changes to the dropdown state
    function handleDropdownChange() {
        textDiv.style.visibility = dropdownCheckbox.checked ? 'hidden' : 'visible';
    }

    // Check the initial state of the dropdown on page load
    handleDropdownChange();

    // Listen for the change event on the dropdown
    dropdownCheckbox.addEventListener('change', handleDropdownChange);

    // Listen for the pagehide event to handle navigation away from the page
    window.addEventListener('pagehide', function () {
        // Reset the dropdown state
        dropdownCheckbox.checked = false;
        // Update the display of the textDiv accordingly
        handleDropdownChange();
    });
});