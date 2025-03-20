document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("staffSearch");
  const deptFilter = document.getElementById("deptFilter");
  const sortBy = document.getElementById("sortBy");
  const tableRows = document.querySelectorAll("table tr:not(:first-child)");

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

  // Modal elements
  const modal = document.getElementById("addEmployeeModal");
  const openModalBtn = document.getElementById("openAddModal");
  const closeModalBtn = document.querySelector(".close");
  const cancelBtn = document.getElementById("cancelAdd");
  const addEmployeeForm = document.getElementById("addEmployeeForm");

  // Open modal
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  // Close modal functions
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
    addEmployeeForm.reset(); // Reset form
  }

  // Close modal when clicking the X button
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking the Cancel button
  cancelBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Form validation functions
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv =
      formGroup.querySelector(".error-message") ||
      document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    if (!formGroup.querySelector(".error-message")) {
      formGroup.appendChild(errorDiv);
    }
    errorDiv.style.display = "block";
    input.classList.add("error");
  }

  function hideError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.style.display = "none";
    }
    input.classList.remove("error");
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  function validateForm() {
    let isValid = true;
    const form = document.getElementById("addEmployeeForm");
    const inputs = form.querySelectorAll("input, select");

    // Reset all errors
    inputs.forEach((input) => hideError(input));

    // Validate each field
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        showError(
          input,
          `${input.previousElementSibling.textContent.replace(
            ":",
            ""
          )} is required`
        );
        isValid = false;
      } else {
        switch (input.id) {
          case "email":
            if (!validateEmail(input.value)) {
              showError(input, "Please enter a valid email address");
              isValid = false;
            }
            break;
          case "phone":
            if (!validatePhone(input.value)) {
              showError(input, "Please enter a valid 10-digit phone number");
              isValid = false;
            }
            break;
          case "salary":
            if (parseInt(input.value) < 1000) {
              showError(input, "Salary must be at least $1000");
              isValid = false;
            }
            break;
          case "bonus":
            if (parseInt(input.value) < 500) {
              showError(input, "Bonus must be at least $500");
              isValid = false;
            }
            break;
          case "date_hire":
            const hireDate = new Date(input.value);
            const today = new Date();
            if (hireDate > today) {
              showError(input, "Hire date cannot be in the future");
              isValid = false;
            }
            break;
        }
      }
    });

    return isValid;
  }

  /// Function to show success message
  function showSuccessMessage(message) {
    const popup = document.getElementById("successPopup");
    const messageSpan = document.getElementById("successMessage");
    messageSpan.textContent = message;
    popup.style.display = "block";

    // Add slide-out animation after 2.5 seconds
    setTimeout(() => {
      popup.style.animation = "slideOut 0.5s ease-out";
      setTimeout(() => {
        popup.style.display = "none";
        popup.style.animation = "slideIn 0.5s ease-out";
      }, 500);
    }, 2500);
  }
  // Handle form submission
  addEmployeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Create FormData object
    const formData = new FormData(this);

    // Send POST request
    fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
          .value,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Show success message
          showSuccessMessage(data.message);
          closeModal();
          // Add the new row to the table
          const tbody = document.querySelector("table tbody");
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
          <td class="empid">${data.employee.id}</td>
          <td>${data.employee.first_name}</td>
          <td>${data.employee.last_name}</td>
          <td>${data.employee.dept}</td>
          <td>${data.employee.role}</td>
          <td>$${data.employee.salary}</td>
          <td>$${data.employee.bonus}</td>
          <td>${data.employee.email}</td>
          <td>${data.employee.phone}</td>
          <td>${data.employee.date_hire}</td>
          <td class="actions">
            <button class="btn-icon btn-edit" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon btn-delete" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
          tbody.appendChild(newRow);
          // Reset form
          this.reset();
        } else {
          // Show error message
          alert(data.message || "Error adding employee");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding employee");
      });
  });

  // Real-time validation
  const formInputs = document.querySelectorAll(
    "#addEmployeeForm input, #addEmployeeForm select"
  );
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      hideError(this);
      validateForm();
    });
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

  // Delete confirmation modal elements
  const deleteModal = document.getElementById("deleteConfirmModal");
  const deleteMessage = document.getElementById("deleteConfirmMessage");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");
  const deleteModalCloseBtn = deleteModal.querySelector(".close");

  // Function to close delete modal
  function closeDeleteModal() {
    deleteModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Close delete modal when clicking the X button
  deleteModalCloseBtn.addEventListener("click", closeDeleteModal);

  // Close delete modal when clicking the Cancel button
  cancelDeleteBtn.addEventListener("click", closeDeleteModal);

  // Close delete modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === deleteModal) {
      closeDeleteModal();
    }
  });

  // Delete button click handler
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const empId = row.querySelector(".empid").textContent;
      const firstName = row.children[1].textContent;
      const lastName = row.children[2].textContent;
      const employeeName = `${firstName} ${lastName}`;

      // Show delete confirmation modal
      deleteMessage.textContent = `Are you sure you want to delete employee ${employeeName}?`;
      deleteModal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Store the row and employee ID for later use
      deleteModal.dataset.employeeId = empId;
      deleteModal.dataset.rowElement = row.outerHTML; // Store the row HTML
    });
  });

  // Handle delete confirmation
  confirmDeleteBtn.addEventListener("click", function () {
    const empId = deleteModal.dataset.employeeId;

    // Create FormData object
    const formData = new FormData();
    formData.append("employee_id", empId);
    formData.append(
      "csrfmiddlewaretoken",
      document.querySelector("[name=csrfmiddlewaretoken]").value
    );

    // Send POST request
    fetch("/delete_employee", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
          .value,
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data && data.success) {
          // Show success message
          showSuccessMessage(data.message || "Employee deleted successfully!");
          // Remove the row from the table
          const rows = document.querySelectorAll("tr");
          for (const row of rows) {
            const empIdCell = row.querySelector(".empid");
            if (empIdCell && empIdCell.textContent === empId) {
              row.remove();
              break;
            }
          }
        } else {
          // Show error message from server
          showSuccessMessage(data.message || "Error deleting employee");
        }
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Error details:", error);
        // Check if we have a specific error message from the server
        if (error.message) {
          showSuccessMessage(error.message);
        } else {
          showSuccessMessage("Error deleting employee. Please try again.");
        }
        closeDeleteModal();
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
      // Here you would normally load the corresponding page data
    });
  });
});
