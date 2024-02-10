function toggleEditForm() {
    var editForm = document.getElementById('editForm');
    editForm.style.display = (editForm.style.display === 'none') ? 'block' : 'none';
}

function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
}

function saveContent() {
    // Get the edited values
    let editedTerm = document.getElementById('editedTerm').value;
    let editedPos = document.getElementById('editedPos').value;
    let editedDefinitions = document.getElementById('editedDefinitions').value.split('\n');
    let editedRelatedTerms = document.getElementById('editedRelatedTerms').value;

    // Send the edited data to the server (backend)
    fetch('/save-content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            term: editedTerm,
            pos: editedPos,
            definitions: editedDefinitions,
            related_terms: editedRelatedTerms,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the UI with the edited values
            document.getElementById('editableContent').style.display = 'block';
            document.getElementById('editForm').style.display = 'none';

            // Update existing content with new data
            document.querySelector('.Word').innerText = editedTerm;
            document.querySelector('.pos').innerText = editedPos;

            let definitionContainer = document.querySelector('.field3');
            definitionContainer.innerHTML = '';
            editedDefinitions.forEach((def, index) => {
                definitionContainer.innerHTML += `<div class="definition"><p>${index + 1}. ${def.trim()}</p></div>`;
            });

            document.querySelector('.related-terms-list').innerText = editedRelatedTerms;
        }
    });
}




