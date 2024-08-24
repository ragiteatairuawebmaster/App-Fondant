// Fonction pour ajouter une ligne au tableau
function addRowToTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.facebook}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td>${data.hours}</td>
        <td>${data.day}</td>
        <td>${data.quantity}</td>
        <td>${data.paid}</td>
        <td><button class="delete-button">Supprimer</button></td> <!-- Bouton de suppression -->
    `;

    // Ajouter l'événement de suppression au bouton
    row.querySelector('.delete-button').addEventListener('click', function() {
        row.remove();
        saveTableData(); // Sauvegarder les données après suppression
    });

    tableBody.appendChild(row);
}

// Fonction pour gérer la soumission du formulaire
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const formData = {
        name: document.getElementById('name').value,
        facebook: document.getElementById('facebook').value || '-',
        phone: document.getElementById('phone').value || '-',
        address: document.getElementById('address').value || '-',
        hours: document.getElementById('hours').value || '-',
        day: document.getElementById('day').value,
        quantity: document.getElementById('quantity').value,
        paid: document.getElementById('paid').value || '-'
    };

    // Ajouter les données au tableau
    addRowToTable(formData);

    // Réinitialiser le formulaire
    document.getElementById('myForm').reset();

    // Sauvegarder les données du tableau
    saveTableData();
});

// Fonction pour sauvegarder les données du tableau dans le localStorage
function saveTableData() {
    const table = document.querySelector('#dataTable tbody');
    const rows = table.querySelectorAll('tr');
    const data = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            name: cells[0].textContent,
            facebook: cells[1].textContent,
            phone: cells[2].textContent,
            address: cells[3].textContent,
            hours: cells[4].textContent,
            day: cells[5].textContent,
            quantity: cells[6].textContent,
            paid: cells[7].textContent
        };
    });

    localStorage.setItem('tableData', JSON.stringify(data));
}

// Fonction pour charger les données du tableau depuis le localStorage
function loadTableData() {
    const data = localStorage.getItem('tableData');
    if (data) {
        const rows = JSON.parse(data);
        rows.forEach(rowData => {
            addRowToTable(rowData);
        });
    }
}

// Fonction pour nettoyer les entrées non numériques du champ téléphone
function cleanPhoneInput(event) {
    const input = event.target;
    const cleanedValue = input.value.replace(/\D/g, ''); // Enlève les caractères non numériques
    if (cleanedValue.length > 8) {
        input.value = cleanedValue.slice(0, 8); // Limite à 8 chiffres
    } else {
        input.value = cleanedValue;
    }
}

// Charger les données du tableau lors du chargement de la page
window.addEventListener('load', loadTableData);

// Événement pour nettoyer l'entrée du téléphone
document.getElementById('phone').addEventListener('input', cleanPhoneInput);
