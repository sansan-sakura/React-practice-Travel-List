
export default function Stats({items}){

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