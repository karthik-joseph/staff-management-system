document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("staffSearch");
  const deptFilter = document.getElementById("deptFilter");
  const sortBy = document.getElementById("sortBy");
  const tableRows = document.querySelectorAll("table tr:not(:first-child)");

  // Create and add the message element
  const messageDiv = document.createElement("div");
  messageDiv.id = "filter-message";
  messageDiv.style.textAlign = "center";
  messageDiv.style.padding = "1rem";
  messageDiv.style.color = "#666";
  messageDiv.style.display = "none";
  document
    .querySelector("table")
    .parentNode.insertBefore(
      messageDiv,
      document.querySelector("table").nextSibling
    );

  // Function to update visibility and message
  function updateVisibilityAndMessage(visibleRows, filterType, filterValue) {
    const hasVisibleRows = visibleRows > 0;
    messageDiv.style.display = hasVisibleRows ? "none" : "block";
    messageDiv.textContent = hasVisibleRows
      ? ""
      : `No employees found in ${filterType}: "${filterValue}"`;
  }

  // Function to sort table rows
  function sortTable(column, type) {
    const tbody = document.querySelector("table tbody");
    const rows = Array.from(tableRows);

    rows.sort((a, b) => {
      let aValue = a.children[column].textContent.trim();
      let bValue = b.children[column].textContent.trim();

      if (type === "date") {
        // Convert date strings to Date objects for comparison
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (type === "number") {
        // Convert strings to numbers for numerical comparison
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else {
        // Default string comparison
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    // Remove existing rows
    rows.forEach((row) => row.remove());

    // Append sorted rows
    rows.forEach((row) => tbody.appendChild(row));
  }

  // Sort event listener
  sortBy.addEventListener("change", function () {
    const value = this.value;
    switch (value) {
      case "name":
        sortTable(1, "string"); // Assuming name is in column 1
        break;
      case "id":
        sortTable(0, "number"); // Assuming ID is in column 0
        break;
      case "dept":
        sortTable(3, "string"); // Assuming department is in column 3
        break;
      case "date":
        sortTable(5, "date"); // Assuming hire date is in column 5
        break;
    }
  });

  // Search functionality
  searchInput.addEventListener("keyup", function () {
    const searchTerm = this.value.toLowerCase();
    let visibleRows = 0;

    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    updateVisibilityAndMessage(visibleRows, "search", this.value);
  });

  // Department filter
  deptFilter.addEventListener("change", function () {
    const filterValue = this.value.toLowerCase();
    let visibleRows = 0;

    if (filterValue === "") {
      tableRows.forEach((row) => (row.style.display = ""));
      messageDiv.style.display = "none";
      return;
    }

    tableRows.forEach((row) => {
      const dept = row.children[3].textContent.toLowerCase();
      if (dept.includes(filterValue)) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    updateVisibilityAndMessage(visibleRows, "department", this.value);
  });

  // Role filter
  roleFilter.addEventListener("change", function () {
    const filterValue = this.value.toLowerCase();
    let visibleRows = 0;

    if (filterValue === "") {
      tableRows.forEach((row) => (row.style.display = ""));
      messageDiv.style.display = "none";
      return;
    }

    tableRows.forEach((row) => {
      const role = row.children[4].textContent.toLowerCase();
      if (role.includes(filterValue)) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    updateVisibilityAndMessage(visibleRows, "role", this.value);
  });

  // Action buttons handlers
  document.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const empId = row.querySelector(".empid").textContent;
      alert(`View details for employee #${empId}`);
    });
  });

  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const empId = row.querySelector(".empid").textContent;
      alert(`Edit employee #${empId}`);
    });
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const empId = row.querySelector(".empid").textContent;
      if (confirm(`Are you sure you want to delete employee #${empId}?`)) {
        alert(`Employee #${empId} deleted`);
        row.remove();
      }
    });
  });

  // Pagination handlers
  document.querySelectorAll(".pagination a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".pagination a")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
