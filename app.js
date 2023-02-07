// Selector
let toDoContainer = document.querySelector('.todo-container')
let toDo = document.querySelector('.todo-list');
let toDoInput = document.querySelector('.todo-input')
let toDoBtn = document.querySelector('.todo-button')
const filterOption = document.querySelector(".filter-todo");
//Add event listener 
document.addEventListener('DOMContentLoaded',getLocalToDo)
toDoBtn.addEventListener('click', addToDo);
toDo.addEventListener('click',deleteToDO);
filterOption.addEventListener("click", filterTodo);

// function
function  addToDo(e){
    console.log('to do list');
    // prevent browser load
    e.preventDefault();
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    let itemli = document.createElement('li');
    itemli.textContent=toDoInput.value;
    //local storage
    saveLocalsToDo(toDoInput.value);
    todoDiv.appendChild(itemli)
    let check = document.createElement('button');
    check.classList.add('check-btn');
    check.innerHTML='<i class="fa-solid fa-check"></i>'
    todoDiv.appendChild(check)
    let trash = document.createElement('button');
    trash.classList.add('trash-btn');
    trash.innerHTML='<i class="fa-solid fa-trash"></i>'
    todoDiv.appendChild(trash)
    toDo.appendChild(todoDiv)
    // set input type value back empty
    toDoInput.value = ""
    // cant add if not content

}
function deleteToDO(e){
    // e.target take element in the parent element
 const item = e.target;
 // item.classList( find item have class and find first class)
if(item.classList[0] ==='trash-btn'){
    const todo = item.parentElement;
    deleteLocalToDo(todo);
    todo.remove();
}
if(item.classList[0] ==='check-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('complete');
}
}

function filterTodo(e) {
    const todos = toDo.childNodes;
    console.log(todos);
    todos.forEach(todo =>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
            break;
            case 'uncompleted':
                if(!todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
            break;
        }
    })
   
  }

  function saveLocalsToDo(todo){
    let todos;
    // check already have something on localStorage
    if(localStorage.getItem('todos') === 'null'){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //push argument to todos
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  //get to do from local storage
  function getLocalToDo(){
    let todos;
    // chek already have something on local storage
    if(localStorage.getItem('todos') === 'null'){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //get to do to local storage to appeare
    todos.forEach(todo =>{
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        let itemli = document.createElement('li');
        itemli.textContent=todo;
        //local storage
        todoDiv.appendChild(itemli)
        let check = document.createElement('button');
        check.classList.add('check-btn');
        check.innerHTML='<i class="fa-solid fa-check"></i>'
        todoDiv.appendChild(check)
        let trash = document.createElement('button');
        trash.classList.add('trash-btn');
        trash.innerHTML='<i class="fa-solid fa-trash"></i>'
        todoDiv.appendChild(trash)
        toDo.appendChild(todoDiv)
        // set input type value back empty
        toDoInput.value = ""
    })
    
  }

  // delete local storage
  function deleteLocalToDo(todo){
    let todos;
    // chek already have something on local storage
    if(localStorage.getItem('todos') === 'null'){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // take  first inner test of todo
    let de = todo.children[0].innerText;
    // take index of local storage from (de)
    let localDe = todos.indexOf(de);
    // remove from local storage
    todos.splice(localDe,1);
    console.log(todos);
    // set back to local storage
    localStorage.setItem('todos',JSON.stringify(todos))
  }