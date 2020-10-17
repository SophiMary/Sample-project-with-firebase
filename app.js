const cafeList = document.querySelector('.cafe-list');
const form = document.querySelector(".add-cafe-form");

//render element
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let price = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('doc-id', doc.id);
    name.textContent = `Name: ${doc.data().name}`;
    city.textContent = `City: ${doc.data().city}`;
    price.textContent = `Price: ${doc.data().price}`;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(price);
    li.appendChild(cross)

    cafeList.appendChild(li);
    //delete element
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('doc-id');
        db.collection('cafes').doc(id).delete();
    })
}

//real-time
db.collection('cafes')
    .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added') {
                renderCafe(change.doc);
            }
            else if(change.type == 'removed') {   
                let itemToRemove = cafeList.querySelector(`[doc-id =  ${change.doc.id}]`);
                cafeList.removeChild(itemToRemove);
            }
        });
    });

//save data
form.addEventListener('submit', (event) =>{
    event.preventDefault()
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value,
        price: form.price.value
    });
    form.name.value='';
    form.city.value = "";
    form.price.value = "";
})


