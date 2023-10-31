const ItemCard = props => {
  const {details} = props
  const updatedDetails = {
    dishName: details.dish_name,
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
  } = updatedDetails
  const isCustomization = addOnCat.length === 0 ? 'false' : 'true'

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
            <button type="button">-</button>
            <button type="button">0</button>
            <button type="button">+</button>
          </div>
        )}
      </div>
      <div>
        <p>{dishCalories} calories</p>
      </div>
      <div>
        <img src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}
export default ItemCard
