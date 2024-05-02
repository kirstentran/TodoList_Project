const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    //Take the value that user entered
    let userEnteredValue = inputBox.value;
    
    //If condition (if user inout is not a space)
    if(userEnteredValue.trim() != 0){
        //The the add button will be bright(on)
        //In case, user input are all several spaces, the add button will be bright(not on)
        addBtn.classList.add("active");
    }
    else {
        //In the opposite case, the add button will not be bright(not on)
        addBtn.classList.remove("active");
    }
}
showTasks();

//Function that will operate behind the Add button
addBtn.onclick =() => {
    //when user click on the Add button
    //Get the value that the user entered in the input box
    let userEnteredValue = inputBox.value;
    
    //Get the LocalStorage 
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null) {
        //if the LocalStorage == null, we will create an empty array
        listArray =[];
    }
    else { 
        // else, we will change JSON from string type to object type
        listArray = JSON.parse(getLocalStorageData);
    }
    //Using the .push() function to add new value from user to the empty array
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify (listArray)); //Change JSON from Object type to string type
    showTasks();
    addBtn.classList.remove("active");

}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New todo");
    if (getLocalStorageData == null){
        //if the LocalStorage == null, we will create an empty array
        listArray =[];
    }
    else { 
        // else, we will change JSON from string type to object type
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; 
    if(listArray.length > 0){ 
      deleteAllBtn.classList.add("active"); 
    }else{
      deleteAllBtn.classList.remove("active"); 
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; 
    inputBox.value = ""; 
  }
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); 
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
  }
  
  deleteAllBtn.onclick = ()=>{
    listArray = []; 
    localStorage.setItem("New todo", JSON.stringify(listArray)); 
    showTasks(); 
  }