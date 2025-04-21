const todoList = [{
    name: 'make dinner',
    duedate: '20-12-2024'
    },{
        name: 'wash dishes',
    duedate: '19-12-2025'}
];
renderTodolist();
function renderTodolist(){
    let todolisthtml= '';

    todoList.forEach(function(todoObject,index){
            //const name  = todoObject.name;
            //const duedate=todoObject.duedate;
            const {name,duedate}=todoObject;
            const html = 
            `<p>
            ${name} ${duedate}
            <button onclick="
            todoList.splice(${index},1);
            renderTodolist();
            ">Delete</button>
            </p>`;
            todolisthtml +=html;

    });


    
    console.log(todolisthtml);

    document.querySelector('.js-todo-list')
    .innerHTML=todolisthtml;
}
function addTodo(){
    const inputEle=document.querySelector('.js-name-input');
    const name = inputEle.value;

    const dateInput=document.querySelector('.js-date');
    const dueDate=dateInput.value


    todoList.push({
    name: name,
    duedate: dueDate,
    //name,
    //dueDate
    });
    console.log(todoList);

    inputEle.value='';
    renderTodolist();

}