// index.js
import "./styles.css";
import { createTask } from "./form.js";
import { taskDisplayer, projectDisplayer, cleanTasksFromDom} from "./dom.js";
import { createProject} from "./project.js";
import { isThisISOWeek, isToday} from "date-fns";


const tasksArray = [];
const projectArray = [];

//create task
const add_task = document.querySelector(".add-task");
// const main = document.querySelector("-main");
let itemindex = 0;
add_task.addEventListener("click", () => {
    add_task.setAttribute("disabled", "");
    createTask();
    const form = document.querySelector("form");
    const form_div = document.querySelector(".form");
    form.addEventListener("submit", function(e) {
            add_task.removeAttribute("disabled", "");
            e.preventDefault();
            const element = document.getElementById("titleProject");
            if(element !== null) {
                const project_title = document.querySelector(".title").innerHTML;
                const data = new FormData(form);
                data.append("project", project_title);
                tasksArray.push(data);
                saveToDoLocalStorage(data);
                taskDisplayer(data);
                deleteTask();
            } else {
                const data = new FormData(form);
                data.append("project", "default");
                tasksArray.push(data);
                saveToDoLocalStorage(data);
                taskDisplayer(data);
                deleteTask();
            }
            while (form.firstChild) {
                form.removeChild(form.lastChild);
            }
            form.parentNode.removeChild(form);
            form_div.parentNode.removeChild(form_div)
            console.log(tasksArray);
        });
});

const add_project = document.querySelector(".add-project");
add_project.addEventListener("click", () => {
    add_project.setAttribute("disabled", "");
    createProject();
    const form = document.querySelector("form");
    const form_div = document.querySelector(".form");
    form.addEventListener("submit", function(e) {
        add_project.removeAttribute("disabled", "");
        e.preventDefault();
        const data = new FormData(form);
        projectArray.push(data);
        saveProjectLocalStorage(data);
        while (form.firstChild) {
            form.removeChild(form.lastChild);
        }
        form.parentNode.removeChild(form);
        form_div.parentNode.removeChild(form_div)
        projectDisplayer(data, tasksArray);
        console.log(projectArray);
    });
})

const today_tag = document.querySelector(".today");
today_tag.addEventListener("click", ()=> {
    cleanTasksFromDom();
    tasksArray.forEach(task => {
        const task_date = task.get("date");
        if (isToday(task_date)) {
            taskDisplayer(task);
        }
    });
})

const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", ()=> {
    cleanTasksFromDom();
    tasksArray.forEach(task => {
        taskDisplayer(task);
    })
})

const week = document.querySelector(".week");
week.addEventListener("click", ()=> {
    cleanTasksFromDom();
    tasksArray.forEach(task => {
        const task_date = task.get("date")
        if (isThisISOWeek(task_date)) {
            taskDisplayer(task);
        }
    });
})

let arrayoftasks = [];
let arrayofprojects = [];
function saveToDoLocalStorage(data) {
    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));
    arrayoftasks.push(formDataObj);
    console.log(arrayoftasks);
    localStorage.setItem("todos", JSON.stringify(arrayoftasks));
}

function saveProjectLocalStorage(data) {
        const formDataObj = {};
        data.forEach((value, key) => (formDataObj[key] = value));
        arrayofprojects.push(formDataObj);
        console.log("array of projects");
        console.log(arrayofprojects);
        localStorage.setItem("projects", JSON.stringify(arrayofprojects));
}

function whenPageIsRefreshed() {
    const todo_objArray = JSON.parse(localStorage.getItem("todos"));
    if (todo_objArray) {
        todo_objArray.forEach(obj => {
            const data = getFormData(obj);
            tasksArray.push(data);
            arrayoftasks.push(obj);
            taskDisplayer(data);
        })    
    }
    const project_objArray = JSON.parse(localStorage.getItem("projects"));
    if (project_objArray) {
        project_objArray.forEach(obj => {
            const data = getFormData(obj);
            projectArray.push(data);
            arrayofprojects.push(obj);
            projectDisplayer(data, tasksArray);
        })
    }

    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    console.log(tasksArray);

}

whenPageIsRefreshed();


deleteTask();

function deleteTask() {
    const bin = document.querySelectorAll(".task img");
    bin.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentElement.innerText;
            const regex = /title:\s*(.*?)\s*description:/s;
            const resultado = parent.match(regex);
            for (let i = 0; i < tasksArray.length; i++ ) {
                const task_title = tasksArray[i].get("title");
                if (task_title === resultado[1]) {
                    tasksArray.splice(i, 1);
                }
            }
            for (let i = 0; i < arrayoftasks.length; i++ ) {
                const task_title = arrayoftasks[i]["title"];
                if (task_title === resultado[1]) {
                    arrayoftasks.splice(i, 1);
                }
            }
            console.log(tasksArray);
            button.parentElement.remove(button);
            console.log(arrayoftasks);
            localStorage.setItem("todos", JSON.stringify(arrayoftasks));
        })
    });
}
deleteProject();

function deleteProject() {
    const bin = document.querySelectorAll(".specific_project img");
    bin.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentElement.innerText;

            for (let i = 0; i < projectArray.length; i++ ) {
                const project_title = projectArray[i].get("title");
                if (project_title === parent) {
                    projectArray.splice(i, 1);
                }
            }
            for (let i = 0; i < arrayofprojects.length; i++ ) {
                const project_title = arrayofprojects[i]["title"];
                if (project_title === parent) {
                    arrayofprojects.splice(i, 1);
                }
            }
            console.log(projectArray);
            button.parentElement.remove(button);
            console.log(arrayofprojects);
            localStorage.setItem("projects", JSON.stringify(arrayofprojects));
        })
    });
}