const inputElem = document.querySelector("input");
const todoSubmit = document.getElementById("todoBtn");
const todoFeaturesBtn = Array.from(document.querySelectorAll('.todo-feature-btn'));
const form = document.querySelector('form');

const todoTaskListElm = document.querySelector(".todo-list");
const doneListElem = document.querySelector('.done-list');
const pendingListElm = document.querySelector('.pending-list')

let todoListArray = [];
let doneListArray = [];
let pendingListArray = [];


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const type = e.target.getAttribute('data-type');
    if(type !== 'Edit' && inputElem.value){

        todoListArray.push({
            value:inputElem.value
        })
        removeTask(todoListArray,'todo-wrapper');
        showTodoList();
        inputElem.value = '';
    }else{

    }
});

function removeTask(list,classType){
    list.forEach((todo,index)=>{
        const div = document.querySelector(`.${classType}`);
        div && div.remove();
    })
  
}

function showTodoList() {
  todoListArray.forEach((elem,index)=>{
    const wrapperElm = createElement('div','todo-wrapper');
    wrapperElm.classList.add('wrapper');

    const taskElm = createElement('div','task');
    taskElm.textContent = elem.value;

    const featureElm = createElement('div','feature');

    const todoEdit = createButton('edit','common-btn','edit');
    const todoDone = createButton('done','common-btn','done');
    const todoPending = createButton('pending','common-btn','pending');
    const todoDelete = createButton('delete','common-btn','delete');

    featureElm.appendChild(todoEdit);
    featureElm.appendChild(todoDelete);
    featureElm.appendChild(todoDone);
    featureElm.appendChild(todoPending);

    wrapperElm.appendChild(taskElm);
    wrapperElm.appendChild(featureElm);

    todoTaskListElm.appendChild(wrapperElm);

    [todoEdit,todoDone,todoDelete,todoPending].forEach(
        (todoBtn)=>{
            todoBtn.addEventListener('click',(e)=>{
                const type = e.target.getAttribute('data-type');
                switch(type){
                    case 'delete':
                        console.log('delete pressed')
                        removeTask(todoListArray,'todo-wrapper');
                        todoListArray.splice(index,1);
                        showTodoList();
                        break;
                    
                    case 'edit':
                        todoSubmit.setAttribute('data-type','edit');
                        todoSubmit.value = 'Edit'
                        inputElem.value = elem.value;
                        break;

                    case 'done':
                        doneListArray.push(elem);
                        removeTask(todoListArray,'todo-wrapper');
                        removeTask(doneListArray,'done-wrapper');
                        todoListArray.splice(index,1);
                        showDoneList();
                        showTodoList();
                        break;
                    
                    case 'pending':
                        pendingListArray.push(elem);
                        removeTask(pendingListArray,'pending-wrapper');
                        removeTask(todoListArray,'todo-wrapper');
                        todoListArray.splice(index,1);
                        showTodoList();
                        showPendingList();
                }
            })
        }
    )

  });
}


function showDoneList(){
    doneListArray.forEach((elem,index)=>{
        const wrapperElm = createElement('div','done-wrapper');
        wrapperElm.classList.add('wrapper');
    
        const taskElm = createElement('div','task');
        taskElm.textContent = elem.value;
    
        const featureElm = createElement('div','feature');
    
        // const todoEdit = createButton('edit','common-btn','edit');
        // const todoPending = createButton('pending','common-btn','pending');
        const todoDelete = createButton('delete','common-btn','delete');
    
        // featureElm.appendChild(todoEdit);
        // featureElm.appendChild(todoPending);

        featureElm.appendChild(todoDelete);
    
        wrapperElm.appendChild(taskElm);
        wrapperElm.appendChild(featureElm);
    
        doneListElem.appendChild(wrapperElm);
    
        [todoDelete].forEach(
            (todoBtn)=>{
                todoBtn.addEventListener('click',(e)=>{
                    const type = e.target.getAttribute('data-type');
                    switch(type){
                        case 'delete':
                            console.log('done delete pressed')
                            removeTask(doneListArray,'done-wrapper');
                            doneListArray.splice(index,1);
                            showDoneList();
                            break;

                    }
                })
            
            }
        )
    
      });
}

function showPendingList(){
    pendingListArray.forEach((elem,index)=>{
        const wrapperElm = createElement('div','pending-wrapper');
        wrapperElm.classList.add('wrapper');
    
        const taskElm = createElement('div','task');
        taskElm.textContent = elem.value;
    
        const featureElm = createElement('div','feature');
    
        // const todoEdit = createButton('edit','common-btn','edit');
        // const todoPending = createButton('pending','common-btn','pending');
        const todoDone = createButton('done','common-btn','done');
    
        // featureElm.appendChild(todoEdit);
        // featureElm.appendChild(todoPending);
        featureElm.appendChild(todoDone);
    
        wrapperElm.appendChild(taskElm);
        wrapperElm.appendChild(featureElm);
    
        pendingListElm.appendChild(wrapperElm);
    
        [todoDone].forEach(
            (todoBtn)=>{
                todoBtn.addEventListener('click',(e)=>{
                    const type = e.target.getAttribute('data-type');
                    switch(type){
                        case 'done':
                            doneListArray.push(elem)

                            removeTask(pendingListArray,'pending-wrapper');
                            removeTask(doneListArray,'done-wrapper');
                            pendingListArray.splice(index,1);
                            showDoneList();
                            showPendingList();  
                            break;
                    }
                })
            
            }
        )
    
      });
}



function createElement(elementType,className){
    
    const elem = elementType && document.createElement(`${elementType}`);
    className && elem.classList.add(`${className}`);
    return elem

}

function createButton(value,className,dataAttributeType) {
    const btn = document.createElement('button');
    btn.classList.add(`${className}`);
    btn.setAttribute('data-type',`${dataAttributeType}`)
    btn.textContent = value;
    return btn;
}

 
 