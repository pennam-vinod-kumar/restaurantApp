const TabItem = props => {
  const {details, changeActiveId} = props
  const {menuCategory, menuCategoryId} = details

  const onChangeId = () => {
    changeActiveId(menuCategoryId)
  }

  return (
    <li>
      <button type="button" onClick={onChangeId}>
        {menuCategory}
      </button>
    </li>
  )
}
export default TabItem
