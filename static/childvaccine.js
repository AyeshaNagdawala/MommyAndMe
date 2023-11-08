const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");





let editId;
let isEditedTask = false;

const predefinedTasks = [
  { 
    name: "BCG Vaccine", 
    status: "pending", 
    description: "(Tuberculosis)At time of birth or till the age of 1 year" 
  },
  { 
    name: "Hepatitis B Vaccine", 
    status: "pending", 
    description: "(Hepatitis B) At birth" 
  },
  { 
    name: "Oral Polio Vaccine", 
    status: "pending", 
    description: "(Poliomyelithis) At birth, 6, 10 and 14 weeks" 
  },
  { 
    name: "Pentavalent Vaccine", 
    status: "pending", 
    description: "(Diphtheria, Pertussis, Tetanus, Hepatitis B and Hib) 6, 10 and 14 weeks" 
  },
  { 
    name: "Rotavirus Vaccine", 
    status: "pending", 
    description: "(Rotavirus diarrhoea) 6, 10 and 14 weeks" 
  },
  { 
    name: "FIPV Vaccine", 
    status: "pending", 
    description: "(Poliomyelithis) 6 and 14 weeks" 
  },
  { 
    name: "Measles Rubella", 
    status: "pending", 
    description: "(Measles & Rubella) At the age of 9- 12 months" 
  },

];


let todos = JSON.parse(localStorage.getItem("todo-list"));

if (todos) {
  todos = [...predefinedTasks, ...todos];
} else {
  todos = predefinedTasks;
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);

  });

});

function showTodo(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task flex">
                <label for="${id}">
                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                  <div class="task-details">
                    <p>${todo.name}</p>
                    <p>${todo.description}</p>
                  </div>
                </label>
                <div class="settings">
                  <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                  <ul class="task-menu">
                    <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen">Edit</i></li>
                    <li onclick="deleteTask(${id})"><i class="uil uil-trash-alt">Delete</i></li>
                  </ul>
                </div>
              </li>`;
      }
    });
  }

  taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}



showTodo("all");

function showMenu(selectedTask){
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", e =>{
    if(e.target.tagName != "I" || e.target != selectedTask){
      taskMenu.classList.remove("show");
    }
  });

}

function editTask(taskId, taskName){
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}

function deleteTask(deleteId){
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
}

clearAll.addEventListener("click", () =>{
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
})

function updateStatus(selectedTask){
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    taskName.classList.add("checked");
    todos[selectedTask.id]. status = "completed";
  }else{
    taskName.classList.remove("checked");
    todos[selectedTask.id]. status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e =>{
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask){
    if(!isEditedTask){
      if(!todos){
        todos = [];
      }
      let taskInfo = {name : userTask, status: "pending"};
      todos.push(taskInfo);
    } else{
      isEditedTask = false;
      todos[editId].name = userTask;
    }
    //let todos = JSON.parse(localStorage.getItem("todo-list"));
    taskInput.value = " ";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }

});