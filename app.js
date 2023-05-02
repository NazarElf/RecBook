//Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm)
document.querySelector('ul').addEventListener('click', handleUlClick)

//EventHandlers
function handleUlClick(e)
{
    if(e.target.name === "delete-button")
    {
        deleteElement(e);
    }
}
function handleSubmitForm(e)
{
    e.preventDefault();
    let input =document.querySelector('input')
    if(input.value != '')
    {
        addElement(input.value)
    }
    input.value = ''
}

//Functions
function addElement(str)
{
    let ul = document.querySelector('ul')
    let li = document.createElement('li')
    li.classList.add("list-item")
    
    li.innerHTML=`
        <span class="item">${str}</span>
        <button name="delete-button">Delete</button>
    `
    ul.appendChild(li)
    for(let i=0; i< ul.childElementCount; i++)
    {
        console.log((ul.children[i].classList))
    }
}

function deleteElement(e)
{
    let item = e.target.parentNode
    console.log(item)
    item.style.opacity = 0
    item.style.marginTop = `-${item.offsetHeight}px`
    item.style.transform = "translateY(80px)"
    item.addEventListener('transitionend', function(e){item.remove()})
}