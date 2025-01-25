

//get total

let title =document.getElementById('title')
let price =document.getElementById('price')
let texes =document.getElementById('texes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let submit =document.getElementById('submit')
let showinput =document.getElementById('show-input')
 let input1 = document.getElementById('input1')
 let background = document.getElementById('background')
let dell = document.getElementById('dell')
let content2 = document.getElementById('content')


 //btton change scroll
 
 let scrollwin = document.getElementById('scrool-window')

 window.onscroll = function(){
    
    if(scrollY >= 200){
        scrollwin.style.scale = '1'

    }else{
        scrollwin.style.scale = '0'
    }
 }
 scrollwin.onclick = function (){
window.scroll({

    top: 0,
    behavior: 'smooth'

})
 }


//theme
 
 
let dark = document.getElementById('dark')
let light = document.getElementById('light')
 
let body = document.body;
 
dark.onclick=function  (){
  content2.style.backgroundColor='#6E8387'
  body.style.backgroundColor='#242F40'
   body.style.color=' #F8F1FF'
  dark.style.scale='0'
  light.style.scale='1'
}
light.onclick=function  (){
    content2.style.backgroundColor='#CED0CE'
   body.style.color=' black'
  body.style.backgroundColor='#E6E8E6'
  dark.style.scale='1'
  light.style.scale='0'
}

 //create
 input1.style.scale='0'
let isabout = false;

showinput.addEventListener('click', () => {
   isabout = !isabout;   
   
   input1.style.scale   = isabout ? '1' : '0';
   input1.style. height   = isabout ? 'auto' : '0px ';
    
});
 
 
 
function  clik(){
  showinput.click()
}



//delete btn 

 
  function delshow(){
  content2.style.scale='1'
}
  function delhide(){
  content2.style.scale='0'
}






let mood = 'create';
let tmp ;

 function gettotal(){
  if(price.value  != ''){
let result = (+price.value + +ads.value + +texes.value) - +discount.value
total.innerHTML = result
total.style.backgroundColor = 'green'
  }
  else{
    total.innerHTML = '';
total.style.backgroundColor = 'red'
  }
 }

//create prodact
//save lovalstorage
let datapro = [];
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product)
}else{
let datapro = [];
 }

submit.onclick = function(){
  
let newpro = {
  title: title.value,
  price: price.value,
  texes: texes.value,
  ads: ads.value,
  discount: discount.value,
  total: total.innerHTML,
  count: count.value,
  category: category.value,
}

//count
if(title.value != '' && price.value != '' && category.value != '' && newpro.count < 100){
  if(mood=== 'create'){
  
if(newpro.count > 1){
  for(let i = 0; i < newpro.count; i++){
    datapro.push(newpro);
  }
}  
else{
    datapro.push(newpro);
  }

}
else{
  datapro[ tmp   ] = newpro
 
  count.style.display = 'inline'
  submit.innerHTML ='create'
  mood = 'create';
}
cleardata()
}
  localStorage.setItem ('product' , JSON.stringify(datapro));
showdata()
}

//clear inputs
function cleardata (){
  title.value = '';
  price.value = '';
  texes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}
    //read
    window.onload = function(){ showdata() }
    function showdata(){
gettotal()
    let table ='';
    for(let i =0 ; i < datapro.length ; i++){
 table +=   `
 
  <tr> 
            <th>${i+1}</th>
            <th>${datapro[i].title}</th>
            <th>${datapro[i].price}</th>
            <th>${datapro[i].texes}</th>
            <th>${datapro[i].ads}</th>
            <th>${datapro[i].discount}</th>
            <th>${datapro[i].total}</th>
            <th> ${datapro[i].category} </th>
            <th><button onclick="updatedata( ${i} ) ,clik()  " id="update">update</button> </th>
            <th><button onclick="deletedata( ${i} ) , showdata()" id="delete">delete</button></th>
            </tr> 
 
 `
     } // deleteall() ,showdata()
    
    document.getElementById('tbody').innerHTML = table

 let btndelete =document.getElementById('deleteall')
 
 if(datapro.length > 0){
  btndelete.innerHTML = `
 <button onclick="delshow() ">delete all (${datapro.length})</button> 
 `
 }
 else{
   btndelete.innerHTML = ``;
 }

    }

//delete
function deletedata(i)
{
datapro.splice(i,1)
localStorage.product= JSON.stringify(datapro) 

}
function deleteall(){
 localStorage.clear()

datapro.splice(0)
}

//update
function updatedata(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  ads.value = datapro[i].ads;
  texes.value = datapro[i].texes;
  category.value = datapro[i].category;
  discount.value = datapro[i].discount; 
 
   gettotal()
  count.style.display = 'none'
  submit.innerHTML ='update'
  mood = 'update';
scroll({
  top: 0,
  behavior: 'smooth'
})

  tmp= i;
}

//search
let searchmood = 'title'
function getsearchmood(id){
  let search = document.getElementById('search')
 if(id == 'searchtitle'){
  searchmood = 'title'
  
 }
 else if(id == 'searchprice'){
  searchmood = 'price'
   

 }
 else{
  searchmood = 'category'

 }
   search.placeholder ='search by ' + searchmood 
search.focus()
 search.value=''
 showdata()
}
function searchdata(value){

  let table='';
  for( let i =0 ; i<datapro.length;i ++){
  if(searchmood == 'title'){

  if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
    table +=   `
 
    <tr> 
              <th>${i}</th>
              <th>${datapro[i].title}</th>
              <th>${datapro[i].price}</th>
              <th>${datapro[i].texes}</th>
              <th>${datapro[i].ads}</th>
              <th>${datapro[i].discount}</th>
              <th>${datapro[i].total}</th>
              <th> ${datapro[i].category} </th>
              <th><button onclick="updatedata( ${i} )  " id="update">update</button> </th>
              <th><button onclick="deletedata( ${i} ) , showdata()" id="delete">delete</button></th>
              </tr> 
   
   `
  

}
  }

  else if(searchmood == 'price'){
    
      if(datapro[i]. price.toLowerCase().includes(value.toLowerCase())){
        table +=   `
     
        <tr> 
                  <th>${i}</th>
                  <th>${datapro[i].title}</th>
                  <th>${datapro[i].price}</th>
                  <th>${datapro[i].texes}</th>
                  <th>${datapro[i].ads}</th>
                  <th>${datapro[i].discount}</th>
                  <th>${datapro[i].total}</th>
                  <th> ${datapro[i].category} </th>
                  <th><button onclick="updatedata( ${i} )  " id="update">update</button> </th>
                  <th><button onclick="deletedata( ${i} ) , showdata()" id="delete">delete</button></th>
                  </tr> 
       
       `}
    
  } 
  else if(searchmood == 'category'){
   
      if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
        table +=   `
     
        <tr> 
                  <th>${i}</th>
                  <th>${datapro[i].title}</th>
                  <th>${datapro[i].price}</th>
                  <th>${datapro[i].texes}</th>
                  <th>${datapro[i].ads}</th>
                  <th>${datapro[i].discount}</th>
                  <th>${datapro[i].total}</th>
                  <th> ${datapro[i].category} </th>
                  <th><button onclick="updatedata( ${i} )  " id="update">update</button> </th>
                  <th><button onclick="deletedata( ${i} ) , showdata()" id="delete">delete</button></th>
                  </tr> 
       
       `
      }
    
    
  }
  }

  document.getElementById('tbody').innerHTML = table
}

 










