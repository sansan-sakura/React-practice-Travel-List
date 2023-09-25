import { useState } from "react";
import Logo from "./Logo"
import Form from "./Form"
import Stats from "./Stats"
import PackingList from "./PackingList"

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

function handleClearList(){
const confirmed=window.confirm("Are you sure you want to delete all items?")
  confirmed && setItem([])
}

return(
  <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItem}/>
    <PackingList items={item} onDeleteItem={handleDeleteItem}  onClearList={handleClearList} onToggleItem={handleToggleItem}/>
    <Stats items={item}/>
  </div>
)
}







