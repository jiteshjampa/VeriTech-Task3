var input = document.querySelector("#taskInput");
var d;
var flag = false;
var c = 0;

// Load tasks from localStorage when the page loads
window.addEventListener("load", function () {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    addTask(task.text, task.checked);
  });

  // Update checkboxes and apply line-through style
  updateCheckboxes();
});

input.addEventListener("change", function (e) {
  d = e.target.value;
});

function addTask(taskText, checked) {
  c = c + 1;
  var ew = document.createElement("li");
  ew.classList.add("list" + c);

  var task = taskText || d; // Use provided task text or input value

  if (task) {
    ew.innerHTML += `<input type="checkbox" class="checkbox" ${
      checked ? "checked" : ""
    } /><p>${task}</p> <div class="todo"><button class="del"><img src="./images/bin.png" alt="Delete" /></button> <button class="edit"><img src="./images/pen.png" alt="Edit" /></button></div>`;
    var ul = document.querySelector("#taskList");
    ul.appendChild(ew);
    input.value = "";
    d = "";
    flag = true;

    updateLocalStorage(); // Update localStorage after adding task

    // Add event listeners for edit and delete buttons
    ew.querySelector(".del").addEventListener("click", function () {
      ew.remove();
      updateLocalStorage(); // Update localStorage after deleting task
    });

    ew.querySelector(".edit").addEventListener("click", function () {
      var taskText = ew.querySelector("p");
      var editInput = document.createElement("input");
      editInput.style.padding = "10px 20px";
      editInput.style.outline = "none";
      editInput.style.border = "none";
      editInput.style.borderRadius = "12px";
      editInput.type = "text";
      editInput.value = taskText.textContent;
      ew.replaceChild(editInput, taskText); // Replace task text with input field

      editInput.addEventListener("focusout", function (e) {
        taskText.textContent = editInput.value;
        ew.replaceChild(taskText, editInput);
        updateLocalStorage(); // Update localStorage after editing task
      });
    });

    var checkbox = ew.querySelector(".checkbox");
    checkbox.addEventListener("change", function () {
      var paragraph = ew.querySelector("p");
      if (this.checked) {
        paragraph.style.textDecoration = "line-through";
      } else {
        paragraph.style.textDecoration = "none";
      }
      updateLocalStorage(); // Update localStorage after changing checked status
    });
  }
}

function updateLocalStorage() {
  var tasks = [];
  document.querySelectorAll("li").forEach(function (item) {
    tasks.push({
      text: item.querySelector("p").textContent,
      checked: item.querySelector(".checkbox").checked,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCheckboxes() {
  var checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(function (checkbox) {
    var paragraph = checkbox.parentNode.querySelector("p");
    if (checkbox.checked) {
      paragraph.style.textDecoration = "line-through";
    } else {
      paragraph.style.textDecoration = "none";
    }
  });
}
