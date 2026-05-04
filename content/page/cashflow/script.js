// Cashflow App JavaScript
class CashflowApp {
  constructor() {
    this.apiBase = 'https://cashflow.drkbugs.workers.dev';
    this.entries = [];
    this.categories = [];
    this.currentEditId = null;
    this.init();
  }

  async init() {
    // Check authentication first
    try {
      const response = await fetch(`${this.apiBase}/health`);
      if (!response.ok) {
        throw new Error('API not available');
      }
      
      // Try to access a protected endpoint to check authentication
      const authResponse = await fetch(`${this.apiBase}/api/cashflow/summary`);
      if (authResponse.status === 401) {
        // Not authenticated, redirect to root
        window.location.href = '/';
        return;
      }
      
      if (!authResponse.ok) {
        throw new Error('Authentication check failed');
      }
      
      // Authenticated, initialize the app
      await this.loadApp();
    } catch (error) {
      console.error('Initialization error:', error);
      this.showError('Failed to initialize app. Please try again later.');
    }
  }

  async loadApp() {
    try {
      // Load data in parallel
      const [entriesResponse, summaryResponse, categoriesResponse] = await Promise.all([
        fetch(`${this.apiBase}/api/cashflow`),
        fetch(`${this.apiBase}/api/cashflow/summary`),
        fetch(`${this.apiBase}/api/cashflow/categories`)
      ]);

      const [entries, summary, categories] = await Promise.all([
        entriesResponse.json(),
        summaryResponse.json(),
        categoriesResponse.json()
      ]);

      this.entries = entries;
      this.categories = categories;
      
      this.updateSummary(summary);
      this.populateCategories();
      this.renderEntries();
      this.hideLoading();
      this.setupEventListeners();
      
      // Set today's date as default
      document.getElementById('date').valueAsDate = new Date();
    } catch (error) {
      console.error('Error loading app data:', error);
      this.showError('Failed to load data. Please refresh the page.');
    }
  }

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
  }

  showError(message) {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.innerHTML = `
      <div class="error-state">
        <p style="color: #ef4444;">${message}</p>
        <button class="btn btn-primary" onclick="location.reload()">Retry</button>
      </div>
    `;
  }

  updateSummary(summary) {
    document.getElementById('total-income').textContent = `$${summary.total_income.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `$${summary.total_expenses.toFixed(2)}`;
    document.getElementById('net-cashflow').textContent = `$${summary.net_cashflow.toFixed(2)}`;
    
    // Update net cashflow color based on value
    const netElement = document.getElementById('net-cashflow');
    netElement.className = summary.net_cashflow >= 0 ? 'positive' : 'negative';
  }

  populateCategories() {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    
    this.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  renderEntries(entriesToRender = this.entries) {
    const tbody = document.getElementById('entries-tbody');
    const noEntries = document.getElementById('no-entries');
    
    if (entriesToRender.length === 0) {
      tbody.innerHTML = '';
      noEntries.style.display = 'block';
      return;
    }
    
    noEntries.style.display = 'none';
    tbody.innerHTML = entriesToRender.map(entry => `
      <tr>
        <td>${this.formatDate(entry.date)}</td>
        <td>${this.escapeHtml(entry.description)}</td>
        <td>${this.escapeHtml(entry.category)}</td>
        <td>
          <span class="type-badge ${entry.type}">${entry.type}</span>
        </td>
        <td class="amount-${entry.type}">
          ${entry.type === 'income' ? '+' : '-'}$${entry.amount.toFixed(2)}
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-sm btn-success" onclick="app.editEntry(${entry.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="app.deleteEntry(${entry.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupEventListeners() {
    // Add entry button
    document.getElementById('add-entry-btn').addEventListener('click', () => {
      this.showModal();
    });

    // Modal controls
    document.getElementById('close-modal').addEventListener('click', () => {
      this.hideModal();
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
      this.hideModal();
    });

    // Form submission
    document.getElementById('entry-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEntry();
    });

    // Delete modal
    document.getElementById('close-delete-modal').addEventListener('click', () => {
      this.hideDeleteModal();
    });

    document.getElementById('cancel-delete').addEventListener('click', () => {
      this.hideDeleteModal();
    });

    document.getElementById('confirm-delete').addEventListener('click', () => {
      this.confirmDelete();
    });

    // Type filter change - update categories
    document.getElementById('type').addEventListener('change', (e) => {
      this.updateCategoriesForType(e.target.value);
    });

    // Filters
    document.getElementById('apply-filters').addEventListener('click', () => {
      this.applyFilters();
    });

    // Close modal on outside click
    document.getElementById('entry-modal').addEventListener('click', (e) => {
      if (e.target.id === 'entry-modal') {
        this.hideModal();
      }
    });

    document.getElementById('delete-modal').addEventListener('click', (e) => {
      if (e.target.id === 'delete-modal') {
        this.hideDeleteModal();
      }
    });
  }

  showModal(entryId = null) {
    const modal = document.getElementById('entry-modal');
    const form = document.getElementById('entry-form');
    const title = document.getElementById('modal-title');
    
    form.reset();
    this.currentEditId = entryId;
    
    if (entryId) {
      title.textContent = 'Edit Entry';
      const entry = this.entries.find(e => e.id === entryId);
      if (entry) {
        document.getElementById('amount').value = entry.amount;
        document.getElementById('description').value = entry.description;
        document.getElementById('type').value = entry.type;
        this.updateCategoriesForType(entry.type);
        document.getElementById('category').value = entry.category;
        document.getElementById('date').value = entry.date;
      }
    } else {
      title.textContent = 'Add New Entry';
      document.getElementById('date').valueAsDate = new Date();
    }
    
    modal.style.display = 'flex';
  }

  hideModal() {
    document.getElementById('entry-modal').style.display = 'none';
    this.currentEditId = null;
  }

  async saveEntry() {
    const formData = new FormData(document.getElementById('entry-form'));
    const data = {
      amount: parseFloat(formData.get('amount')),
      description: formData.get('description'),
      type: formData.get('type'),
      category: formData.get('category'),
      date: formData.get('date')
    };

    try {
      let response;
      if (this.currentEditId) {
        response = await fetch(`${this.apiBase}/api/cashflow/${this.currentEditId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        response = await fetch(`${this.apiBase}/api/cashflow`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      const savedEntry = await response.json();
      
      if (this.currentEditId) {
        const index = this.entries.findIndex(e => e.id === this.currentEditId);
        this.entries[index] = savedEntry;
      } else {
        this.entries.unshift(savedEntry);
      }

      await this.refreshData();
      this.hideModal();
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  }

  editEntry(entryId) {
    this.showModal(entryId);
  }

  deleteEntry(entryId) {
    this.currentDeleteId = entryId;
    document.getElementById('delete-modal').style.display = 'flex';
  }

  hideDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    this.currentDeleteId = null;
  }

  async confirmDelete() {
    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/${this.currentDeleteId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      this.entries = this.entries.filter(e => e.id !== this.currentDeleteId);
      await this.refreshData();
      this.hideDeleteModal();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
    }
  }

  async updateCategoriesForType(type) {
    if (!type) {
      this.populateCategories();
      return;
    }

    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/categories?type=${type}`);
      const categories = await response.json();
      
      const categorySelect = document.getElementById('category');
      categorySelect.innerHTML = '<option value="">Select Category</option>';
      
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  applyFilters() {
    const type = document.getElementById('type-filter').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    let filteredEntries = this.entries;
    
    if (type) {
      filteredEntries = filteredEntries.filter(entry => entry.type === type);
    }
    
    if (startDate) {
      filteredEntries = filteredEntries.filter(entry => entry.date >= startDate);
    }
    
    if (endDate) {
      filteredEntries = filteredEntries.filter(entry => entry.date <= endDate);
    }
    
    this.renderEntries(filteredEntries);
  }

  async refreshData() {
    try {
      const [entriesResponse, summaryResponse] = await Promise.all([
        fetch(`${this.apiBase}/api/cashflow`),
        fetch(`${this.apiBase}/api/cashflow/summary`)
      ]);

      const [entries, summary] = await Promise.all([
        entriesResponse.json(),
        summaryResponse.json()
      ]);

      this.entries = entries;
      this.updateSummary(summary);
      this.renderEntries();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CashflowApp();
});
