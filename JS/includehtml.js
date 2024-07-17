async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
        element.removeAttribute('w3-include-html');
    }
    attachToggleEvent();
}

function attachToggleEvent() {
    let toggleButton = document.getElementById('toggleDropDown');
    let overlayHeader = document.getElementById('overlayHeader');

    if (toggleButton && overlayHeader) {
        toggleButton.addEventListener('click', function (event) {
            overlayHeader.classList.toggle('hidden');
            event.stopPropagation();  
        });

        document.addEventListener('click', function (event) {
            if (!overlayHeader.classList.contains('hidden') && !overlayHeader.contains(event.target) && event.target !== toggleButton) {
                overlayHeader.classList.add('hidden');
            }
        });
    }
}


includeHTML();
