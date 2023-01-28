# _todo-list-app_

## _Description_
>Este proyecto representa una lista de tareas, compuesta por funciones como insertar una tarea, eliminar una tarea,editarla, borrar todas, para la persistencia de datos se usa localstorage

## _View Deployment_
[Go to the site](https://fernandomoyano.github.io/todo-list-app/)

>GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

## _Languages_


<link rel="stylesheet" href="devicon.min.css">

<div "style=inline_block"><br>


  <img width="50px" height="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" />
  <img width="50px" height="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" />
  <img width="50px" height="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
 
 </div>
 
## _Resources_
[Box-Icons](https://boxicons.com/)
>High Quality Web Icons
Simple Open Source icons carefully crafted for designers & developers

## _Some Functions_

``` javascript
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
```

``` javascript
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
```

