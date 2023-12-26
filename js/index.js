document.addEventListener('DOMContentLoaded',()=>{
    const n=50 //number of animals to be displayed  
    let a=0;
    let b=n;
  //create the function that will request and display the monsters in a monter array
    function showNMonsters(a,b){
        fetch('http://localhost:3000/monsters')
        .then((r)=>r.json())
        .then(handleMonster)

        //creates a function that will handle the monster array requested from the server
        function handleMonster(monsterArray){
            let monsterContainer = document.querySelector('#monster-container')// grab the container 

            monsterArray.slice(a,b).forEach(monsterObj=>{
                let name = document.createElement('h2');
                name.textContent= monsterObj.name;
                let age = document.createElement('h4');
                age.textContent= monsterObj.age;
                let bio = document.createElement('p');
                bio.textContent= monsterObj.description;
                monsterContainer.append(name,age,bio)
                }
            )
        }
    }
    showNMonsters(a,b)

    const form = document.querySelector('#monster-form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        //creates a monster object
        const monsterObj={
            name:e.target.name.value,
            age:e.target.age.value,
            description:e.target.description.value
        }
        //send the new monster data to the server
        fetch('http://localhost:3000/monsters',{
            method: "POST",
            headers:{'Content-Type':"application/JSON"},
            body:JSON.stringify(monsterObj)
        })
        .then((r)=>r.json())
        .then((newMonster)=>console.log(newMonster))
   })
   //assign names to back and forward buttons
    const forward = document.querySelector('#forward')
    const back = document.querySelector('#back')
    //displays the next n monsters
    forward.addEventListener('click',()=>{
        const currentPage=document.querySelector('#monster-container')
        while(currentPage.firstChild){
          currentPage.removeChild(currentPage.firstChild)
        }
        a=b;
        b=b+n;
        //console.log(a,b)
        showNMonsters(a,b)
    })
    //displays the previous n monsters
    back.addEventListener('click',()=>{
        const currentPage=document.querySelector('#monster-container')
        if(a>=n){
            while(currentPage.firstChild){
            currentPage.removeChild(currentPage.firstChild)}
            b=a;
            a=a-n;
            //console.log(a,b)
            showNMonsters(a,b)
        }
    })
})


