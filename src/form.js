export function createTask() {
    const main = document.querySelector(".main");
    const form_div = document.createElement("div");
    form_div.setAttribute("class", "form");
    const form = document.createElement("form");
    //form title
    const hfrom = document.createElement("h3");
    hfrom.innerHTML = "My form";
    //title
    const label_title = document.createElement("label");
    label_title.setAttribute("for", "title");
    label_title.innerHTML = "Title of the task: ";
    const input_title = document.createElement("input");
    input_title.setAttribute("type", "text");
    input_title.setAttribute("name", "title");
    input_title.setAttribute("id", "title");
    input_title.setAttribute("required","");
    //description
    const label_description = document.createElement("label");
    label_description.setAttribute("for", "description");
    label_description.innerHTML = "Description: ";
    const input_description = document.createElement("input");
    input_description.setAttribute("type", "text");
    input_description.setAttribute("name", "description");
    input_description.setAttribute("id", "description");
    //date
    const label_date = document.createElement("label");
    label_date.innerHTML = "Due to: ";
    const input_date = document.createElement("input");
    input_date.setAttribute("type", "date");
    input_date.setAttribute("id", "date");
    input_date.setAttribute("name", "date");
    label_date.setAttribute("for", "date");
    input_date.setAttribute("required","");
    //listbox
    const label_priority = document.createElement("label");
    label_priority.innerHTML = "Priority: ";
    label_priority.setAttribute("for", "priority");
    const input_priority = document.createElement("input");
    input_priority.setAttribute("id", "priority");
    input_priority.setAttribute("name", "priority");
    input_priority.setAttribute("list", "priority");
    const datalist_priority = document.createElement("datalist");
    datalist_priority.setAttribute("id", "priority");
    const option1 = document.createElement("option");
    option1.setAttribute("value", "Low");
    const option2 = document.createElement("option");
    option2.setAttribute("value", "Medium");
    const option3 = document.createElement("option");
    option3.setAttribute("value", "High");
    datalist_priority.appendChild(option1);
    datalist_priority.appendChild(option2);
    datalist_priority.appendChild(option3);
    //submit
    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");  
    form_div.appendChild(hfrom);
    form.appendChild(label_title);
    form.appendChild(input_title);
    form.appendChild(label_description);
    form.appendChild(input_description);
    form.appendChild(label_date);
    form.appendChild(input_date);
    form.appendChild(label_priority);
    form.appendChild(input_priority);
    form.appendChild(datalist_priority);
    form.appendChild(submit);
    form_div.appendChild(form);
    main.appendChild(form_div);
}