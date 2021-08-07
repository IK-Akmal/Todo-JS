const form = document.querySelector('.todo-form')
const todoList = document.querySelector('.todo-list')
const todoItems = document.getElementsByClassName('todo-list__item')

const modal = document.querySelector(".modal");
const modalclose = document.querySelector(".close");
const modalBtnEdit = document.querySelector("#modalBtnEdit");
const modalBtnCancel = document.querySelector("#modalBtnCancel");
const modalInputText = document.querySelector("#modalInputText");
function newEl(tag) {
    return document.createElement(tag)
}


form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (form.name.value.trim().length > 0)
        addTodo(form.name.value)

    form.name.value = ''
})

let id = 1

function addTodo(name) {

    const li = newEl('li')
    li.classList.add('todo-list__item')
    li.setAttribute('id', `item-${id}`)
    
    const input = newEl('input')
    input.classList.add('todo-list__checkbox')
    input.setAttribute('id', `item-checkbox-${id}`)
    input.setAttribute('type', 'checkbox')
    li.append(input)

    const label = newEl('label')
    label.classList.add('todo-list__label')
    label.setAttribute('for', `item-checkbox-${id}`)
    label.addEventListener("click", function () {
        this.parentNode.classList.toggle("textDecoration");
    }) 
    li.append(label)
    let text = newEl('span');
    text.textContent = name;
    text.setAttribute("id",`span-${id}`)
    li.append(text)

    const editTodo = newEl('button')
    editTodo.classList.add('btn', 'btn-primary', 'todo-list__edit')
    editTodo.setAttribute('id', `item-edit-${id}`)

    editTodo.addEventListener("click", function () {
        modal.style.display = "block";

        const obj = this;
        modalInputText.value = this.parentNode.childNodes[2].innerHTML;
        modalBtnEdit.onclick =  function() 
        {
            if (modalInputText.value.trim().length != 0) {
                obj.parentNode.childNodes[2].innerHTML = modalInputText.value;
                modal.style.display = "none";
            }
        };
    });

    const editIcon = newEl('i')
    editIcon.classList.add('far', 'fa-edit')
    editTodo.append(editIcon)
    li.append(editTodo)

    const deleteTodo = newEl('button')
    deleteTodo.classList.add('btn', 'btn-danger', 'todo-list__delete')
    deleteTodo.setAttribute('id', `item-delete-${id}`)
    deleteTodo.addEventListener("click", function (event) {
        this.parentNode.remove();
    })

    const deleteIcon = newEl('i')
    deleteIcon.classList.add('far', 'fa-trash-alt')
    deleteTodo.append(deleteIcon)
    li.append(deleteTodo)

    todoList.prepend(li)
    id++;
}



modalBtnCancel.addEventListener("click", () => {
    modal.style.display = "none";
});

modalclose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

