import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TabItem from '../TabItem'
import ItemCard from '../ItemCard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    foodData: {},
    activeId: '11',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFoodData()
  }

  getFoodData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const foodData = await fetch(apiUrl)
    if (foodData.ok === true) {
      const fetchedData = await foodData.json()
      const updatedData = {
        restaurantName: fetchedData[0].restaurant_name,
        tableMenuList: fetchedData[0].table_menu_list.map(each => ({
          menuCategory: each.menu_category,
          menuCategoryId: each.menu_category_id,
          menuCategoryImage: each.menu_category_image,
          categoryDishes: each.category_dishes,
        })),
      }
      this.setState({
        foodData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  changeActiveId = id => {
    this.setState({activeId: id})
  }

  renderSuccessView = () => {
    const {foodData, activeId} = this.state
    const {tableMenuList} = foodData
    const filteredItem = tableMenuList.filter(
      each => each.menuCategoryId === activeId,
    )
    return (
      <div>
        <ul className="tabs-container">
          {tableMenuList.map(each => (
            <TabItem
              key={each.menuCategoryId}
              details={each}
              changeActiveId={this.changeActiveId}
            />
          ))}
        </ul>
        <ul className="items-container">
          {filteredItem[0].categoryDishes.map(each => (
            <ItemCard key={each.dish_id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {foodData} = this.state

    return (
      <div>
        <Header name={foodData.restaurantName} />
        {this.renderDetails()}
      </div>
    )
  }
}
export default Home
