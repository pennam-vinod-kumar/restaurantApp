const TabItem = props => {
  const details = props
  console.log(details)
  const {menuCategory} = details
  console.log(menuCategory)

  return (
    <li>
      <p>{menuCategory}</p>
    </li>
  )
}
export default TabItem
