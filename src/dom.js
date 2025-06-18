import inboxIcon from './images/bin.svg';
export function taskDisplayer(data) {
    const tasks = document.querySelector(".tasks");
    const task = document.createElement("div");
    task.setAttribute("class", "task");
    const box = document.createElement("p");
    const delete_img = document.createElement("img");
    delete_img.src = inboxIcon;
    for (let element of data) {
        let key = element[0];
        let value = element[1];
        box.innerHTML += key + ": "  + value + "<br>";
    }

    task.appendChild(box);
    task.appendChild(delete_img);
    tasks.appendChild(task);
}

export function projectDisplayer(data, tasksArray) {
    const project_div = document.querySelector(".projects-list");
    const project_div1 = document.createElement("div");
    project_div1.setAttribute("class", "specific_project");
    const title = document.createElement("button");
    title.setAttribute("class", "project");
    title.innerHTML = data.get("title");
    const delete_img = document.createElement("img");
    delete_img.src = inboxIcon;
    // 
    title.addEventListener("click", () => {
        //clean default tasks, display project tasks
        cleanTasksFromDom();
        const element = document.getElementById("titleProject");
        const title_project = document.querySelectorAll(".title");

        if(element !== null) {
            element.remove();
            cleanTasksFromDom();
            tasksArray.forEach(task => {
                task.forEach(entry => {
                    if(entry === "default") {
                        taskDisplayer(task);
                    }
                })
            });
        } else {
            displayProjectTitle(title.innerHTML);
            tasksArray.forEach(task => {
                task.forEach(entry => {
                    if(entry === title.innerHTML) {
                        taskDisplayer(task);
                    }
                })
            });
        }
    })
    project_div1.appendChild(title);
    project_div1.appendChild(delete_img);
    project_div.appendChild(project_div1);
}

export function displayProjectTitle(title) {
    const element = document.getElementById("titleProject");
    if(element !== null) {
        return;
    } else {
        const main = document.querySelector(".main");
        const divTitle = document.createElement("div");
        divTitle.setAttribute("id", "titleProject");
        const h1 = document.createElement("h1");
        h1.setAttribute("class", "title");
        h1.innerText = title;
        divTitle.appendChild(h1);
        main.prepend(divTitle);
    }

}

export function cleanTasksFromDom() {
    const tasks = document.querySelector(".tasks");
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
}

