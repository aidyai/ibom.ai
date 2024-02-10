
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the value from the search input
    const query = document.getElementById('search-input').value;

    // Send a GET request to the FastAPI endpoint
    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the response from the server
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error as needed
        });
});

