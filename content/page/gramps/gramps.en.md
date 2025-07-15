---
title: "GRAMPS"
description: "Online personal app"
slug: "gramps"
comments: false
sitemapExclude: true
---

{{< rawhtml >}}
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

<div class="container mt-4">
    <div class="row">
        <div class="col-12">
            <h1 class="text-center mb-4">
                <i class="fas fa-users me-2"></i>
                Gramps Family Surnames
            </h1>
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-md-6 mx-auto">
            <div class="card surname-card stats-card">
                <div class="card-body text-center">
                    <h5 class="card-title">
                        <i class="fas fa-chart-bar me-2"></i>
                        Statistics
                    </h5>
                    <div class="row">
                        <div class="col-6">
                            <h3 id="totalSurnames">-</h3>
                            <p class="mb-0">Total Surnames</p>
                        </div>
                        <div class="col-6">
                            <h3 id="totalPersons">-</h3>
                            <p class="mb-0">Total Persons</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 mx-auto">
            <div class="input-group search-box">
                <span class="input-group-text">
                    <i class="fas fa-search"></i>
                </span>
                <input type="text" class="form-control" id="searchInput" placeholder="Search surnames...">
            </div>
        </div>
    </div>
    <div class="row loading-spinner" id="loadingSpinner">
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading surnames...</p>
        </div>
    </div>
    <div class="row error-message" id="errorMessage">
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Error!</strong> <span id="errorText"></span>
            </div>
        </div>
    </div>
    <div class="row" id="tableContainer" style="display: none;">
        <div class="col-12">
            <div class="card surname-card">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="fas fa-table me-2"></i>
                        Surnames Directory
                    </h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-container">
                        <table class="table table-striped table-hover mb-0">
                            <thead class="table-dark sticky-top">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">
                                        <i class="fas fa-signature me-1"></i>
                                        Surname
                                    </th>
                                    <th scope="col" class="text-center">
                                        <i class="fas fa-users me-1"></i>
                                        Persons
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="surnamesTableBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-12 text-center">
            <button class="btn btn-primary" id="refreshBtn">
                <i class="fas fa-sync-alt me-2"></i>
                Refresh Data
            </button>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script src="/js/gramps.js"></script>
{{< /rawhtml >}}