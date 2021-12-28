const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");


const todosLS = JSON.parse(localStorage.getItem("todos"));

if(todosLS) {
    todosLS.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});


function addTodo(todo) {
    let todoText = input.value;

    // if a todo already exists in localStorage

    if(todo) {
        todoText = todo.text;
    }


    if(todoText) {
        const todoEl = document.createElement('li');
        todoEl.classList.add("todo");

        if(todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerHTML = `
            <div class="todo-wrap">
                <p>${todoText}</p>
            </div>
        `;
        todos.appendChild(todoEl);
        input.value = "";


        //the first child deletes all the list, error. 
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle('completed');

            updateLS();
        });

        todos.appendChild(todoEl);
        input.value = "";

        updateLS();
    }
}




function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed'),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}