// Minified JS
document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("staffSearch"),
    t = document.getElementById("deptFilter"),
    n = document.getElementById("sortBy"),
    o = document.querySelectorAll("table tr:not(:first-child)"),
    l = document.createElement("div");
  function s(e, t, n) {
    const o = e > 0;
    (l.style.display = o ? "none" : "block"),
      (l.textContent = o ? "" : `No employees found in ${t}: "${n}"`);
  }
  function r(e, t) {
    const n = document.querySelector("table tbody"),
      l = Array.from(o);
    l.sort((n, o) => {
      let l = n.children[e].textContent.trim(),
        s = o.children[e].textContent.trim();
      return (
        "date" === t
          ? ((l = new Date(l)), (s = new Date(s)))
          : "number" === t
          ? ((l = parseInt(l)), (s = parseInt(s)))
          : ((l = l.toLowerCase()), (s = s.toLowerCase())),
        l < s ? -1 : l > s ? 1 : 0
      );
    }),
      l.forEach((e) => e.remove()),
      l.forEach((e) => n.appendChild(e));
  }
  (l.id = "filter-message"),
    (l.style.textAlign = "center"),
    (l.style.padding = "1rem"),
    (l.style.color = "#666"),
    (l.style.display = "none"),
    document
      .querySelector("table")
      .parentNode.insertBefore(l, document.querySelector("table").nextSibling),
    n.addEventListener("change", function () {
      switch (this.value) {
        case "name":
          r(1, "string");
          break;
        case "id":
          r(0, "number");
          break;
        case "dept":
          r(3, "string");
          break;
        case "date":
          r(5, "date");
      }
    }),
    e.addEventListener("keyup", function () {
      const e = this.value.toLowerCase();
      let t = 0;
      o.forEach((n) => {
        n.textContent.toLowerCase().includes(e)
          ? ((n.style.display = ""), t++)
          : (n.style.display = "none");
      }),
        s(t, "search", this.value);
    }),
    t.addEventListener("change", function () {
      const e = this.value.toLowerCase();
      let t = 0;
      if ("" === e)
        return (
          o.forEach((e) => (e.style.display = "")),
          void (l.style.display = "none")
        );
      o.forEach((n) => {
        n.children[3].textContent.toLowerCase().includes(e)
          ? ((n.style.display = ""), t++)
          : (n.style.display = "none");
      }),
        s(t, "department", this.value);
    }),
    roleFilter.addEventListener("change", function () {
      const e = this.value.toLowerCase();
      let t = 0;
      if ("" === e)
        return (
          o.forEach((e) => (e.style.display = "")),
          void (l.style.display = "none")
        );
      o.forEach((n) => {
        n.children[4].textContent.toLowerCase().includes(e)
          ? ((n.style.display = ""), t++)
          : (n.style.display = "none");
      }),
        s(t, "role", this.value);
    });
  const a = document.getElementById("addEmployeeModal"),
    d = document.getElementById("openAddModal"),
    c = document.querySelector(".close"),
    i = document.getElementById("cancelAdd"),
    u = document.getElementById("addEmployeeForm");
  function m() {
    (a.style.display = "none"),
      (document.body.style.overflow = "auto"),
      u.reset();
  }
  function y(e, t) {
    const n = e.parentElement,
      o = n.querySelector(".error-message") || document.createElement("div");
    (o.className = "error-message"),
      (o.textContent = t),
      n.querySelector(".error-message") || n.appendChild(o),
      (o.style.display = "block"),
      e.classList.add("error");
  }
  function p(e) {
    const t = e.parentElement.querySelector(".error-message");
    t && (t.style.display = "none"), e.classList.remove("error");
  }
  function f() {
    let e = !0;
    const t = document
      .getElementById("addEmployeeForm")
      .querySelectorAll("input, select");
    return (
      t.forEach((e) => p(e)),
      t.forEach((t) => {
        if (t.value.trim())
          switch (t.id) {
            case "email":
              (o = t.value),
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o) ||
                  (y(t, "Please enter a valid email address"), (e = !1));
              break;
            case "phone":
              (n = t.value),
                /^\d{10}$/.test(n) ||
                  (y(t, "Please enter a valid 10-digit phone number"),
                  (e = !1));
              break;
            case "salary":
              parseInt(t.value) < 1e3 &&
                (y(t, "Salary must be at least $1000"), (e = !1));
              break;
            case "bonus":
              parseInt(t.value) < 500 &&
                (y(t, "Bonus must be at least $500"), (e = !1));
              break;
            case "date_hire":
              new Date(t.value) > new Date() &&
                (y(t, "Hire date cannot be in the future"), (e = !1));
          }
        else
          y(
            t,
            `${t.previousElementSibling.textContent.replace(
              ":",
              ""
            )} is required`
          ),
            (e = !1);
        var n, o;
      }),
      e
    );
  }
  function h(e) {
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
  d.addEventListener("click", function () {
    (a.style.display = "block"), (document.body.style.overflow = "hidden");
  }),
    c.addEventListener("click", m),
    i.addEventListener("click", m),
    window.addEventListener("click", function (e) {
      e.target === a && m();
    }),
    u.addEventListener("submit", function (e) {
      if ((e.preventDefault(), !f())) return;
      const t = new FormData(this);
      fetch(this.action, {
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
            h(e.message), m();
            const t = document.querySelector("table tbody"),
              n = document.createElement("tr");
            (n.innerHTML = `\n          <td class="empid">${e.employee.id}</td>\n          <td>${e.employee.first_name}</td>\n          <td>${e.employee.last_name}</td>\n          <td>${e.employee.dept}</td>\n          <td>${e.employee.role}</td>\n          <td>$${e.employee.salary}</td>\n          <td>$${e.employee.bonus}</td>\n          <td>${e.employee.email}</td>\n          <td>${e.employee.phone}</td>\n          <td>${e.employee.date_hire}</td>\n          <td class="actions">\n            <button class="btn-icon btn-edit" title="Edit">\n              <i class="fas fa-edit"></i>\n            </button>\n            <button class="btn-icon btn-delete" title="Delete">\n              <i class="fas fa-trash"></i>\n            </button>\n          </td>\n        `),
              t.appendChild(n),
              this.reset();
          } else alert(e.message || "Error adding employee");
        })
        .catch((e) => {
          console.error("Error:", e), alert("Error adding employee");
        });
    });
  document
    .querySelectorAll("#addEmployeeForm input, #addEmployeeForm select")
    .forEach((e) => {
      e.addEventListener("input", function () {
        p(this), f();
      });
    }),
    document.querySelectorAll(".btn-view").forEach((e) => {
      e.addEventListener("click", function () {
        const e = this.closest("tr").querySelector(".empid").textContent;
        alert(`View details for employee #${e}`);
      });
    }),
    document.querySelectorAll(".btn-edit").forEach((e) => {
      e.addEventListener("click", function () {
        const e = this.closest("tr").querySelector(".empid").textContent;
        alert(`Edit employee #${e}`);
      });
    });
  const E = document.getElementById("deleteConfirmModal"),
    v = document.getElementById("deleteConfirmMessage"),
    b = document.getElementById("confirmDelete"),
    g = document.getElementById("cancelDelete");
  function L() {
    (E.style.display = "none"), (document.body.style.overflow = "auto");
  }
  E.querySelector(".close").addEventListener("click", L),
    g.addEventListener("click", L),
    window.addEventListener("click", function (e) {
      e.target === E && L();
    }),
    document.querySelectorAll(".btn-delete").forEach((e) => {
      e.addEventListener("click", function () {
        const e = this.closest("tr"),
          t = e.querySelector(".empid").textContent,
          n = `${e.children[1].textContent} ${e.children[2].textContent}`;
        (v.textContent = `Are you sure you want to delete employee ${n}?`),
          (E.style.display = "block"),
          (document.body.style.overflow = "hidden"),
          (E.dataset.employeeId = t),
          (E.dataset.rowElement = e.outerHTML);
      });
    }),
    b.addEventListener("click", function () {
      const e = E.dataset.employeeId,
        t = new FormData();
      t.append("employee_id", e),
        t.append(
          "csrfmiddlewaretoken",
          document.querySelector("[name=csrfmiddlewaretoken]").value
        ),
        fetch("/delete_employee", {
          method: "POST",
          body: t,
          headers: {
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
              .value,
          },
        })
          .then(
            (e) => (
              console.log("Response status:", e.status),
              e.ok ? e.json() : e.json().then((e) => Promise.reject(e))
            )
          )
          .then((t) => {
            if ((console.log("Response data:", t), t && t.success)) {
              h(t.message || "Employee deleted successfully!");
              const n = document.querySelectorAll("tr");
              for (const t of n) {
                const n = t.querySelector(".empid");
                if (n && n.textContent === e) {
                  t.remove();
                  break;
                }
              }
            } else h(t.message || "Error deleting employee");
            L();
          })
          .catch((e) => {
            console.error("Error details:", e),
              e.message
                ? h(e.message)
                : h("Error deleting employee. Please try again."),
              L();
          });
    }),
    document.querySelectorAll(".pagination a").forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault(),
          document
            .querySelectorAll(".pagination a")
            .forEach((e) => e.classList.remove("active")),
          this.classList.add("active");
      });
    });
});
