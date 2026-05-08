// Cashflow App JavaScript
class CashflowApp {
  constructor() {
    this.apiBase = 'https://cashflow.drk.com.ar';
    this.entries = [];
    this.categories = [];
    this.currentEditId = null;
    this.init();
  }

  async init() {
    // Check authentication first
    try {
      const response = await fetch(`${this.apiBase}/health`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('API not available');
      }
      
      // Try to access a protected endpoint to check authentication
      const authResponse = await fetch(`${this.apiBase}/api/cashflow/summary`, { credentials: 'include' });
      if (authResponse.status === 401 || authResponse.status === 403) {
        // Not authenticated or forbidden, redirect to root
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
      // Get current time mode
      const timeMode = document.getElementById('time-mode').value || 'current_month';
      
      // Build API URL with time mode parameters
      let apiUrl = `${this.apiBase}/api/cashflow`;
      const params = new URLSearchParams();
      
      if (timeMode === 'current_month') {
        // Default to current month - no params needed
      } else if (timeMode === 'previous_month') {
        params.append('time_mode', 'previous_month');
      } else if (timeMode === 'all_time') {
        params.append('time_mode', 'all_time');
      } else if (timeMode === 'custom_range') {
        params.append('time_mode', 'custom_range');
        const startDate = document.getElementById('custom-start-date').value;
        const endDate = document.getElementById('custom-end-date').value;
        if (startDate && endDate) {
          params.append('start_date', startDate);
          params.append('end_date', endDate);
        }
      }
      
      if (params.toString()) {
        apiUrl += '?' + params.toString();
      }
      
      // Load data in parallel
      const [entriesResponse, summaryResponse, categoriesResponse] = await Promise.all([
        fetch(apiUrl, { credentials: 'include' }),
        fetch(`${this.apiBase}/api/cashflow/summary`, { credentials: 'include' }),
        fetch(`${this.apiBase}/api/cashflow/categories`, { credentials: 'include' })
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
      option.value = category.name || category; // fallback for backward compatibility
      option.textContent = category.name || category;
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

  handleTimeModeChange() {
    const timeMode = document.getElementById('time-mode').value;
    const dateFilters = document.getElementById('date-filters');
    const customRangeControls = document.getElementById('custom-range-controls');
    
    if (timeMode === 'custom_range') {
      dateFilters.style.display = 'none';
      customRangeControls.style.display = 'block';
    } else {
      dateFilters.style.display = 'block';
      customRangeControls.style.display = 'none';
    }
    
    // Reload data with new time mode
    this.loadApp();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupEventListeners() {
    // Time mode change
    document.getElementById('time-mode').addEventListener('change', () => {
      this.handleTimeModeChange();
    });

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

    // Categories management
    document.getElementById('manage-categories-btn').addEventListener('click', () => {
      this.showCategoriesModal();
    });

    document.getElementById('close-categories-modal').addEventListener('click', () => {
      this.hideCategoriesModal();
    });

    document.getElementById('add-category-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addCategory();
    });

    // Category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchCategoryTab(e.target.dataset.type);
      });
    });

    // Close categories modal on outside click
    document.getElementById('categories-modal').addEventListener('click', (e) => {
      if (e.target.id === 'categories-modal') {
        this.hideCategoriesModal();
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
          body: JSON.stringify(data),
          credentials: 'include'
        });
      } else {
        response = await fetch(`${this.apiBase}/api/cashflow`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include'
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
        method: 'DELETE',
        credentials: 'include'
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
      const response = await fetch(`${this.apiBase}/api/cashflow/categories?type=${type}`, { credentials: 'include' });
      const categories = await response.json();
      
      const categorySelect = document.getElementById('category');
      categorySelect.innerHTML = '<option value="">Select Category</option>';
      
      // Handle new API response format (objects with name property)
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name || category; // fallback for backward compatibility
        option.textContent = category.name || category;
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
        fetch(`${this.apiBase}/api/cashflow`, { credentials: 'include' }),
        fetch(`${this.apiBase}/api/cashflow/summary`, { credentials: 'include' })
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

  // Categories Management Methods
  async showCategoriesModal() {
    await this.loadCategories();
    document.getElementById('categories-modal').style.display = 'flex';
    this.renderCategoriesList('all');
  }

  hideCategoriesModal() {
    document.getElementById('categories-modal').style.display = 'none';
  }

  async loadCategories() {
    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/categories`, { credentials: 'include' });
      if (response.ok) {
        this.categories = await response.json();
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  renderCategoriesList(filterType = 'all') {
    const categoriesList = document.getElementById('categories-list');
    let filteredCategories = this.categories;

    if (filterType !== 'all') {
      filteredCategories = this.categories.filter(cat => cat.type === filterType);
    }

    if (filteredCategories.length === 0) {
      categoriesList.innerHTML = '<p class="no-categories">No categories found for this type.</p>';
      return;
    }

    categoriesList.innerHTML = filteredCategories.map(category => `
      <div class="category-item" data-id="${category.id}">
        <div class="category-info">
          <span class="category-name">${this.escapeHtml(category.name)}</span>
          <span class="category-type type-badge ${category.type}">${category.type}</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-sm btn-warning" onclick="app.editCategory(${category.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="app.deleteCategory(${category.id})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  switchCategoryTab(type) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Render filtered categories
    this.renderCategoriesList(type);
  }

  async addCategory() {
    const formData = new FormData(document.getElementById('add-category-form'));
    const data = {
      name: formData.get('name'),
      type: formData.get('type')
    };

    if (!data.name || !data.type) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      // Reset form
      document.getElementById('add-category-form').reset();
      
      // Reload and render categories
      await this.loadCategories();
      this.renderCategoriesList(document.querySelector('.tab-btn.active').dataset.type);
      
      // Update main app categories
      this.populateCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  }

  editCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;

    const newName = prompt('Edit category name:', category.name);
    if (newName && newName.trim() && newName !== category.name) {
      this.updateCategory(categoryId, { name: newName.trim() });
    }
  }

  async updateCategory(categoryId, data) {
    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      // Reload and render categories
      await this.loadCategories();
      this.renderCategoriesList(document.querySelector('.tab-btn.active').dataset.type);
      
      // Update main app categories
      this.populateCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category. Please try again.');
    }
  }

  deleteCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;

    if (confirm(`Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`)) {
      this.confirmDeleteCategory(categoryId);
    }
  }

  async confirmDeleteCategory(categoryId) {
    try {
      const response = await fetch(`${this.apiBase}/api/cashflow/categories/${categoryId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // Reload and render categories
      await this.loadCategories();
      this.renderCategoriesList(document.querySelector('.tab-btn.active').dataset.type);
      
      // Update main app categories
      this.populateCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CashflowApp();
});
