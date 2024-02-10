function addInput(containerId) {
    const container = document.getElementById(containerId);
    const inputType = containerId.includes('definitions') ? 'definitionInput' :
        (containerId.includes('englishSentences') ? 'englishSentenceInput' : 'frenchSentenceInput');
    
    const newInput = document.createElement('textarea');
    newInput.classList.add(inputType);
    newInput.placeholder = container.children.length + 1 + '. New Entry';
    container.insertBefore(newInput, container.lastChild);
}