const todoList = [{
    name: 'dasad',
    duedate: '20-12-2024'
    },{
        name: 'asdasdad',
    duedate: '19-12-2025'}
];
renderTodolist();
function renderTodolist(){
    let todolisthtml= '';

    for (let i=0; i< todoList.length;i++){
        const todoObject=todoList[i];
        //const name  = todoObject.name;
        //const duedate=todoObject.duedate;
        const {name,duedate}=todoObject;
        const html = 
        `<p>
        ${name} ${duedate}
        <button onclick="
        todoList.splice(${i},1);
        renderTodolist();
        ">Delete</button>
        </p>`;
        todolisthtml +=html;
    }
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