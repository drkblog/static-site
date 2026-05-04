---
title: Cashflow Manager
description: Manage your personal finances with our modern cashflow tracking tool
slug: "cashflow"
comments: false
sitemapExclude: true
layout: "single"
---

{{< rawhtml >}}
<link rel="stylesheet" href="./style.css">

<div id="cashflow-app" class="cashflow-container">
  <!-- Loading State -->
  <div id="loading" class="loading-state">
    <div class="spinner"></div>
    <p>Loading your cashflow data...</p>
  </div>

  <!-- Main App (Hidden Initially) -->
  <div id="app-content" class="app-content" style="display: none;">
    <!-- Header with Summary -->
    <header class="app-header">
      <div class="header-content">
        <h1>Cashflow Manager</h1>
        <div class="summary-cards">
          <div class="summary-card income">
            <h3>Total Income</h3>
            <p id="total-income">$0.00</p>
          </div>
          <div class="summary-card expense">
            <h3>Total Expenses</h3>
            <p id="total-expenses">$0.00</p>
          </div>
          <div class="summary-card net">
            <h3>Net Cashflow</h3>
            <p id="net-cashflow">$0.00</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Controls Section -->
    <section class="controls">
      <div class="controls-row">
        <button id="add-entry-btn" class="btn btn-primary">
          <span class="icon">+</span> Add Entry
        </button>
        <div class="filter-controls">
          <select id="type-filter" class="filter-select">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input type="date" id="start-date" class="filter-input">
          <input type="date" id="end-date" class="filter-input">
          <button id="apply-filters" class="btn btn-secondary">Apply Filters</button>
        </div>
      </div>
    </section>

    <!-- Entries Table -->
    <main class="entries-section">
      <div class="table-container">
        <table id="entries-table" class="entries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="entries-tbody">
            <!-- Entries will be populated here -->
          </tbody>
        </table>
        <div id="no-entries" class="no-entries" style="display: none;">
          <p>No entries found. Start by adding your first cashflow entry!</p>
        </div>
      </div>
    </main>
  </div>

  <!-- Add/Edit Entry Modal -->
  <div id="entry-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Add New Entry</h2>
        <button class="close-btn" id="close-modal">&times;</button>
      </div>
      <form id="entry-form" class="entry-form">
        <div class="form-group">
          <label for="amount">Amount *</label>
          <input type="number" id="amount" name="amount" step="0.01" min="0.01" required>
        </div>
        <div class="form-group">
          <label for="description">Description *</label>
          <input type="text" id="description" name="description" required>
        </div>
        <div class="form-group">
          <label for="type">Type *</label>
          <select id="type" name="type" required>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div class="form-group">
          <label for="category">Category *</label>
          <select id="category" name="category" required>
            <option value="">Select Category</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Date *</label>
          <input type="date" id="date" name="date" required>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary" id="save-btn">Save Entry</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div id="delete-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Confirm Delete</h2>
        <button class="close-btn" id="close-delete-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this entry? This action cannot be undone.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-secondary" id="cancel-delete">Cancel</button>
        <button class="btn btn-danger" id="confirm-delete">Delete Entry</button>
      </div>
    </div>
  </div>
</div>


<script src="./script.js"></script>
{{< /rawhtml >}}
