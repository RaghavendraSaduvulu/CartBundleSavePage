import {Component} from 'react'
import './index.css'

const offerList = [
  {
    id: 1,
    offer: 50,
    DKK: 195,
  },
  {
    id: 2,
    offer: 40,
    DKK: 345,
  },
  {
    id: 3,
    offer: 60,
    DKK: 528,
  },
]

class BundleSavePage extends Component {
  state = {activeId: offerList[1].id}

  onChangeRadioOffers = id => {
    this.setState({activeId: id})
  }

  renderTable = id => (
    <tr>
      <td>
        <p>#{id}</p>
      </td>
      <td>
        <select className="dropdown">
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </td>
      <td>
        <select className="dropdown">
          <option default>Colour</option>
          <option>Black</option>
          <option>Blue</option>
          <option>Red</option>
        </select>
      </td>
    </tr>
  )

  renderSwitch = id => {
    switch (id) {
      case 1:
        return this.renderTable(id)
      case 2:
        return (
          <>
            {this.renderTable(id - 1)}
            {this.renderTable(id)}
          </>
        )
      default:
        return (
          <>
            {this.renderTable(id - 2)}
            {this.renderTable(id - 1)}
            {this.renderTable(id)}
          </>
        )
    }
  }

  render() {
    const {activeId} = this.state
    const details = offerList.find(eachItem => eachItem.id === activeId)

    return (
      <div className="page-container">
        <div className="page-content">
          <div className="title-container">
            <hr className="line1" />
            <h1 className="title">Bundle & Save</h1>
            <hr className="line2" />
          </div>
          <ul className="offer-list">
            {offerList.map(eachItem => {
              const {id, offer, DKK} = eachItem
              const onChangeRadio = () => {
                this.onChangeRadioOffers(id)
              }
              const bg = activeId === id && 'active-bg'
              const renderSizeAndColour = () => {
                this.renderSwitch(id)
              }
              return (
                <li key={id} className={`list-item ${bg}`}>
                  <div className="list-content">
                    <input
                      onChange={onChangeRadio}
                      className="radio-input"
                      type="radio"
                      name="offer"
                      checked={activeId === id}
                    />
                    <div className="list-item-content">
                      <div className="pair-and-price">
                        <p className="pair">{id} pair</p>
                        <p className="price">DKK: {DKK}.00</p>
                      </div>
                      <p className="offer">{offer}% OFF</p>
                    </div>
                  </div>
                  {activeId === id && (
                    <table>
                      <tr>
                        <th>{}</th>
                        <th>
                          <p className="size-title">Size</p>
                        </th>
                        <th>
                          <p className="colour-title">Colour</p>
                        </th>
                      </tr>
                      {renderSizeAndColour}
                    </table>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="more-details">
            <p className="shipping">Free 2 Days Shipping</p>
            <p className="amount">Total:{details.DKK}.00</p>
          </div>
          <button className="btn" type="button">
            + Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

export default BundleSavePage
