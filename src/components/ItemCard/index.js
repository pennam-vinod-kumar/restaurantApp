import {Component} from 'react'
import CartContext from '../../context/CartContext'

class ItemCard extends Component {
  state = {
    quantity: 0,
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {quantity} = this.state
        const {addCartItem} = value
        const {details} = this.props
        const updatedDetails = {
          dishName: details.dish_name,
          dishId: details.dish_id,
          dishPrice: details.dish_price,
          dishDescription: details.dish_description,
          dishCalories: details.dish_calories,
          dishImage: details.dish_image,
          dishCurrency: details.dish_currency,
          addOnCat: details.addonCat,
          dishAvailability: details.dish_Availability,
        }
        const {
          dishName,
          dishPrice,
          dishAvailability,
          dishDescription,
          dishCalories,
          dishImage,
          dishCurrency,
          addOnCat,
          dishId,
        } = updatedDetails

        const isCustomization = addOnCat.length === 0 ? 'false' : 'true'

        const onClickAddToCart = () => {
          addCartItem({...updatedDetails, quantity})
        }
        return (
          <li>
            <div>
              <h1>{dishName}</h1>
              <div>
                <p>
                  {dishCurrency} {dishPrice}
                </p>
              </div>
              <div>{dishDescription}</div>
              {isCustomization === 'true' && <p>Customizations available</p>}
              {dishAvailability === false ? (
                <p>Not available</p>
              ) : (
                <div>
                  <button type="button" onClick={this.onDecrementQuantity}>
                    -
                  </button>
                  <button type="button">{quantity}</button>
                  <button type="button" onClick={this.onIncrementQuantity}>
                    +
                  </button>
                  <button type="button" onClick={onClickAddToCart}>
                    ADD TO CART
                  </button>
                </div>
              )}
            </div>
            <div>
              <p>{dishCalories} calories</p>
              <p>{dishId}</p>
            </div>
            <div>
              <img src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderDetails()}</div>
  }
}
export default ItemCard
