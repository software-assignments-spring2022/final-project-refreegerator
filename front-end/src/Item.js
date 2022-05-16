import "./Item.css"

const Item = props => {
    return (
      <article className="Item">
      <h1 className="Name">{props.name}</h1>
        <div className="Item-details">
          <p className="Quantity">
            <div id = "quantity1">Quantity</div>
            <div id="quantity2">{props.quantity}</div>
          </p>
          <div id="notes">
            <b>Notes</b>
            <p>{props.details}</p>
          </div>
        </div>
      </article>
  )
}

export default Item