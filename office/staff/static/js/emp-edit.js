// Minified emp-edit.js
// Main initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements for Update Modal
  const e = document.getElementById("updateEmployeeModal"), // Update modal container
    t = document.getElementById("updateEmployeeForm"), // Update form element
    n = document.getElementById("cancelUpdate"); // Cancel button

  // Function to show error message for form fields
  function o(e, t) {
    const n = e.parentElement,
      o = n.querySelector(".error-message") || document.createElement("div");
    (o.className = "error-message"),
      (o.textContent = t),
      n.querySelector(".error-message") || n.appendChild(o),
      (o.style.display = "block"),
      e.classList.add("error");
  }

  // Function to clear error message for form fields
  function l(e) {
    const t = e.parentElement.querySelector(".error-message");
    t && (t.style.display = "none"), e.classList.remove("error");
  }

  // Function to show success message
  function a(e) {
    const t = document.getElementById("successPopup");
    (document.getElementById("successMessage").textContent = e),
      (t.style.display = "block"),
      setTimeout(() => {
        (t.style.animation = "slideOut 0.5s ease-out"),
          setTimeout(() => {
            (t.style.display = "none"),
              (t.style.animation = "slideIn 0.5s ease-out");
          }, 500);
      }, 2500);
  }

  // Function to close update modal and reset form
  function r() {
    (e.style.display = "none"),
      (document.body.style.overflow = "auto"),
      t.reset();
  }

  // Function to validate update form fields
  function d() {
    let e = !0;
    const n = t.querySelectorAll("input, select");
    return (
      n.forEach((e) => l(e)),
      n.forEach((t) => {
        if (t.value.trim())
          switch (t.id) {
            case "update_email":
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value) ||
                (o(t, "Please enter a valid email address"), (e = !1));
              break;
            case "update_phone":
              /^\d{10}$/.test(t.value) ||
                (o(t, "Please enter a valid 10-digit phone number"), (e = !1));
              break;
            case "update_salary":
              parseInt(t.value) < 1e3 &&
                (o(t, "Salary must be at least $1000"), (e = !1));
              break;
            case "update_bonus":
              parseInt(t.value) < 500 &&
                (o(t, "Bonus must be at least $500"), (e = !1));
              break;
            case "update_date_hire":
              new Date(t.value) > new Date() &&
                (o(t, "Hire date cannot be in the future"), (e = !1));
          }
        else
          o(
            t,
            `${t.previousElementSibling.textContent.replace(
              ":",
              ""
            )} is required`
          ),
            (e = !1);
      }),
      e
    );
  }

  // Event listeners for closing update modal
  e.querySelector(".close").addEventListener("click", r),
    n.addEventListener("click", r),
    window.addEventListener("click", (t) => {
      t.target === e && r();
    }),
    // Event listeners for edit buttons
    document.querySelectorAll(".btn-edit").forEach((t) => {
      t.addEventListener("click", function () {
        // Get the current row and employee ID
        const t = this.closest("tr"),
          n = t.querySelector(".empid").textContent;

        // Populate form with current employee data
        (document.getElementById("update_employee_id").value = n),
          (document.getElementById("update_first_name").value =
            t.children[1].textContent),
          (document.getElementById("update_last_name").value =
            t.children[2].textContent),
          (document.getElementById("update_email").value =
            t.children[7].textContent),
          (document.getElementById("update_phone").value =
            t.children[8].textContent),
          (document.getElementById("update_salary").value =
            t.children[5].textContent.replace("$", "")),
          (document.getElementById("update_bonus").value =
            t.children[6].textContent.replace("$", "")),
          (document.getElementById("update_date_hire").value =
            t.children[9].textContent);

        // Set department and role values
        const o = document.getElementById("update_dept"),
          l = document.getElementById("update_role"),
          a = t.children[3].textContent,
          r = t.children[4].textContent;

        // Find and set the correct department option
        Array.from(o.options).forEach((e) => {
          e.text === a && (o.value = e.value);
        }),
          // Find and set the correct role option
          Array.from(l.options).forEach((e) => {
            e.text === r && (l.value = e.value);
          }),
          // Show modal and prevent body scroll
          (e.style.display = "block"),
          (document.body.style.overflow = "hidden");
      });
    }),
    // Event listener for update form submission
    t.addEventListener("submit", function (e) {
      if ((e.preventDefault(), !d())) return;
      const t = new FormData(this);
      t.append(
        "csrfmiddlewaretoken",
        document.querySelector("[name=csrfmiddlewaretoken]").value
      ),
        // Send update request to server
        fetch("/update_employee", {
          method: "POST",
          body: t,
          headers: {
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
              .value,
          },
        })
          .then((e) => e.json())
          .then((e) => {
            if (e.success) {
              // Find the row to update
              const n = t.get("employee_id"),
                o = document.querySelectorAll("tr");
              let l = null;
              for (const e of o) {
                const t = e.querySelector(".empid");
                if (t && t.textContent === n) {
                  l = e;
                  break;
                }
              }

              // Update the row with new data
              l &&
                ((l.children[1].textContent = e.employee.first_name),
                (l.children[2].textContent = e.employee.last_name),
                (l.children[3].textContent = e.employee.dept),
                (l.children[4].textContent = e.employee.role),
                (l.children[5].textContent = `$${e.employee.salary}`),
                (l.children[6].textContent = `$${e.employee.bonus}`),
                (l.children[7].textContent = e.employee.email),
                (l.children[8].textContent = e.employee.phone),
                (l.children[9].textContent = e.employee.date_hire)),
                a(e.message),
                r();
            } else a(e.message || "Error updating employee");
          })
          .catch((e) => {
            console.error("Error:", e),
              a("Error updating employee. Please try again.");
          });
    }),
    // Add real-time validation for form fields
    document
      .querySelectorAll("#updateEmployeeForm input, #updateEmployeeForm select")
      .forEach((e) => {
        e.addEventListener("input", function () {
          l(this), d();
        });
      });
});
