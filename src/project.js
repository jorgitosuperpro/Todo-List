export function createProject() {
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
    label_title.innerHTML = "Title of the Project: ";
    const input_title = document.createElement("input");
    input_title.setAttribute("type", "text");
    input_title.setAttribute("name", "title");
    input_title.setAttribute("id", "title");
    input_title.setAttribute("required","");
    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");  
    form_div.appendChild(hfrom);
    form.appendChild(label_title);
    form.appendChild(input_title);
    form.appendChild(submit);
    form_div.appendChild(form);
    main.appendChild(form_div);
}
