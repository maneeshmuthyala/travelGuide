import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
}

class Travel extends Component {
  state = {apiStatus: apiConstants.initial, da: []}

  componentDidMount() {
    this.getData()
  }

  format = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.getSuccess()
      case apiConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getData = async () => {
    this.setState({apiStatus: apiConstants.in_progress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updated = data.packages.map(each => this.format(each))
    this.setState({apiStatus: apiConstants.success, da: updated})
  }

  getSuccess = () => {
    const {da} = this.state
    return (
      <ul className="cont">
        {da.map(each => (
          <li key={each.id}>
            <img src={each.imageUrl} alt={each.name} className="img" />
            <h1 className="head">{each.name}</h1>
            <p>{each.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="main-cont">
        <h1 className="header">Travel Guide</h1>
        <hr className="line" />
        <div>{this.renderAll()}</div>
      </div>
    )
  }
}
export default Travel
