/* variables */

const taskInput = document.querySelector(".task-input input"),
	filters = document.querySelectorAll(".filters span"),
	clearAll = document.querySelector(".clear-btn"),
	taskBox = document.querySelector(".task-box");

let editId,
	isEditedTask = false;
/* getting localsorage todo-list */
let todos = JSON.parse(localStorage.getItem("todo-list"));

/* FILTERS */

filters.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		showTodo(btn.id);
	});
});

/* SHOW-TODO Function */

function showTodo(filter) {
	let li = "";
	if (todos) {
		todos.forEach((todo, id) => {
			/* if todo status is completed, set the is completed value to checked */
			let isCompleted = todo.status == "completed" ? "checked" : "";
			if (filter == todo.status || filter == "all") {
				li += `
				<li class="task">
					<label for="${id}">
						<input onclick="updateStatus(this)"  type="checkbox" id="${id}" ${isCompleted}>
						<p class="${isCompleted}">${todo.name}</p>
					</label>
					<div class="settings">
						<i onclick="showMenu(this)" class="bx bx-dots-horizontal-rounded"></i>
						<ul class="task-menu">
							<li onclick="editTask(${id},'${todo.name}')"><i class="bx bx-edit">Edit</i></li>
							<li onclick="deleteTask(${id})"><i class="bx bx-trash-alt">Delete</i></li>
						</ul>
					</div>
				</li>`;
			}
		});
	}
	/* if li isn't empty, insert this value inside taskbox else insert span */
	taskBox.innerHTML = li || `<span>You don't have any task here </span>`;
	
}
showTodo("all");

/* SHOW-MENU Function  */

function showMenu(selectedTask) {
	/* getting task menu div */
	let taskMenu = selectedTask.parentElement.lastElementChild;
	taskMenu.classList.add("show");
	document.addEventListener("click", (e) => {
		/* removing show class from the task menu on the document click */
		if (e.target.tagName != "I" || e.target != selectedTask) {
			taskMenu.classList.remove("show");
		}
	});
}

/* EDIT-TASK Function  */

function editTask(taskId, taskName) {
	editId = taskId;
	isEditedTask = true;
	taskInput.value = taskName;
}

/* DELETE-TASK Function  */

function deleteTask(deleteId) {
	/* removing selected task from array/todos */
	todos.splice(deleteId, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo("all");
}

/* CLEAR-ALL */

clearAll.addEventListener("click", () => {
	/* removing all items of array/todos */
	todos.splice(0, todos.length);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo("all");
});

/* UPDATE-STATUS Function  */

function updateStatus(selectedTask) {
	/* getting paragraph tath contains task name */
	let taskName = selectedTask.parentElement.lastElementChild;
	if (selectedTask.checked) {
		taskName.classList.add("checked");
		/* Updating the status of selected task to completed */
		todos[selectedTask.id].status = "completed";
	} else {
		taskName.classList.remove("checked");
		/* Updating the status of selected task to pending */
		todos[selectedTask.id].status = "pending";
	}
	localStorage.setItem("todo-list", JSON.stringify(todos));
}

/* INSTERT-TASK  */

taskInput.addEventListener("keyup", (e) => {
	let userTask = taskInput.value.trim();
	if (e.key == "Enter" && userTask) {
		/* if isEditTask isn't true */
		if (!isEditedTask) {
			/* if todos isn't exist, pass an empty array to todos */
			if (!todos) {
				todos = [];
			}
			let taskInfo = {
				name: userTask,
				status: "pending",
			};
			/* adding new task to todos */
			todos.push(taskInfo);
		} else {
			isEditedTask = false;
			todos = [editId].name = userTask;
		}
		taskInput.value = "";
		localStorage.setItem("todo-list", JSON.stringify(todos));
		showTodo("all");
	}
});
