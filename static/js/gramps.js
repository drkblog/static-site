const DRK_COM_AR_GRAMPS_ENDPOINT = 'https://gramps.drk.com.ar'; 

let allSurnames = [];

// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const tableContainer = document.getElementById('tableContainer');
const surnamesTableBody = document.getElementById('surnamesTableBody');
const refreshBtn = document.getElementById('refreshBtn');
const searchInput = document.getElementById('searchInput');
const totalSurnames = document.getElementById('totalSurnames');
const totalPersons = document.getElementById('totalPersons');

// Show loading state
function showLoading() {
    loadingSpinner.style.display = 'block';
    errorMessage.style.display = 'none';
    tableContainer.style.display = 'none';
    refreshBtn.disabled = true;
}

// Show error state
function showError(message) {
    loadingSpinner.style.display = 'none';
    errorMessage.style.display = 'block';
    tableContainer.style.display = 'none';
    errorText.textContent = message;
    refreshBtn.disabled = false;
}

// Show success state
function showSuccess() {
    loadingSpinner.style.display = 'none';
    errorMessage.style.display = 'none';
    tableContainer.style.display = 'block';
    refreshBtn.disabled = false;
}

// Format surname for display
function formatSurname(surname) {
    if (!surname || surname === '') {
        return '<em class="text-muted">(No surname)</em>';
    }
    if (surname === '<Unknown>') {
        return '<em class="text-muted">Unknown</em>';
    }
    return surname;
}

// Create surname URL
function createSurnameUrl(surname) {
    if (!surname || surname === '') {
        return `/gramps/surname/no-surname`;
    }
    return `/gramps/surname/${encodeURIComponent(surname)}`;
}

// Update statistics
function updateStats(surnames) {
    totalSurnames.textContent = surnames.length;
    const total = surnames.reduce((sum, item) => sum + item.count, 0);
    totalPersons.textContent = total;
}

// Render surnames table
function renderSurnames(surnames) {
    surnamesTableBody.innerHTML = '';
    
    surnames.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatSurname(item.lastname)}</td>
            <td class="text-center">
                <a href="${createSurnameUrl(item.lastname)}" class="count-link">
                    ${item.count}
                </a>
            </td>
        `;
        surnamesTableBody.appendChild(row);
    });
}

// Filter surnames based on search
function filterSurnames(searchTerm) {
    if (!searchTerm.trim()) {
        renderSurnames(allSurnames);
        return;
    }
    
    const filtered = allSurnames.filter(item => 
        item.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderSurnames(filtered);
}

// Fetch surnames from API
async function fetchSurnames() {
    showLoading();
    
    try {
        const response = await fetch(DRK_COM_AR_GRAMPS_ENDPOINT + '/surnames', { credentials: 'include' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.items || !Array.isArray(data.items)) {
            throw new Error('Invalid data format received from server');
        }
        
        // Sort surnames alphabetically, but put empty and unknown at the end
        allSurnames = data.items.sort((a, b) => {
            if (!a.lastname || a.lastname === '') return 1;
            if (!b.lastname || b.lastname === '') return -1;
            if (a.lastname === '<Unknown>') return 1;
            if (b.lastname === '<Unknown>') return -1;
            return a.lastname.localeCompare(b.lastname);
        });
        
        updateStats(allSurnames);
        renderSurnames(allSurnames);
        showSuccess();
        
    } catch (error) {
        console.error('Error fetching surnames:', error);
        showError(`Failed to load surnames: ${error.message}`);
    }
}

// Event listeners
refreshBtn.addEventListener('click', fetchSurnames);

searchInput.addEventListener('input', (e) => {
    filterSurnames(e.target.value);
});

// Initial load
fetchSurnames();
