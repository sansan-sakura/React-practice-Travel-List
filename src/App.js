import { useState } from "react";

export default function App(){
  const [item,setItem]=useState([])


function handleAddItem(item){
  setItem(items=>[...items,item])
}

function handleDeleteItem (id){
  setItem(items=>items.filter(item=>item.id !==id))
}

function handleToggleItem(id){
setItem(items=>items.map(item=>item.id===id?{...item,packed:!item.packed}:item))
}

return(
  <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItem}/>
    <PackingList items={item} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
    <Stats items={item}/>
  </div>
)
}

function Logo(){
  return <h1> 💼 Far Away 🪱</h1>
}


function Form({onAddItems}){
const [description,setDescription]=useState("")
const [quantity,setQuantity]=useState(1)


  function handleSubmit(e){
    e.preventDefault()
    if(!description) return
   const newItem={description,quantity,packed:false,id:Date.now()}
   onAddItems(newItem)
setDescription('')
setQuantity(1)
  }
return (<form className="add-form" onSubmit={handleSubmit}>
  <h3>What do you need for your 😍 trip?</h3>
  <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
    {Array.from({length:20},(_,i)=>i+1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <option value={1}></option>
    <input type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button>Add</button>

</form>)
}

function PackingList({items,onDeleteItem,onToggleItem}){
  const [sortBy,setSortBy]=useState("input")
  let sortedItems;
  if(sortBy==="input") sortedItems=items
  if(sortBy==="description") sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description))
  if(sortBy==="packed") sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  return (
    <div className="list">
  <ul >
    {sortedItems.map(item=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>)}
  </ul>
  <div className="actions">
    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
      <option value="input">Sort by input order
      </option>
      <option value="description">Sort by description</option>
      <option value="packed">Sort by packed status</option>
    </select>

  </div>
  </div>)
}

function Item({item,onDeleteItem,onToggleItem}){
  return(
    <li> 
      <input type="checkbox" value={item.packed} onChange={()=>onToggleItem(item.id)}/>
      <span style={item.packed?{textDecoration:"line-through"}:{}}>
      {item.quantity} 

       {item.description}
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>❌</button></li>
  )
}

function Stats({items}){

  if(!items.length){
    return (
      <footer className="stats">
        <em>Start addting some items to your packing list</em>
      </footer>
    )
  }
  
  const numItems=items.length
  const numPacked=items.filter(item=>item.packed).length
  const percentage=Math.round((numPacked/numItems)*100)
  return (

    <footer className="stats">
    <em>{percentage===100? " You got everything! Ready to travel ‼️ ": `You have ${numItems} items on your list, adnd you already packed ${numPacked} (${percentage}%)`}</em>
     
    </footer>
  )
}