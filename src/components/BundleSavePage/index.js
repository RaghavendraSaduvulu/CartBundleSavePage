import {Component} from 'react'
import {AiOutlineCopyright} from 'react-icons/ai'
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
  state = {activeId: offerList[1].id, isSubmit: false}

  onChangeRadioOffers = id => {
    this.setState({activeId: id})
  }

  clearTime = id => {
    clearTimeout(id)
  }

  setTimedOut = () => {
    const intervalId = setTimeout(() => {
      this.setState(
        preState => ({isSubmit: !preState.isSubmit}),
        this.clearTime(intervalId),
      )
    }, 2000)
  }

  onClickBtn = () => {
    this.setState(
      preState => ({isSubmit: !preState.isSubmit}),
      this.setTimedOut,
    )
  }

  render() {
    const {activeId, isSubmit} = this.state
    const details = offerList.find(eachItem => eachItem.id === activeId)
    const numArr = [...Array(activeId)].map((_, i) => i + 1)

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
              const activeInput = activeId === id && 'active-radio'
              const second = activeId === 2
              const third = activeId === 3
              return (
                <li key={id} className={`list-item ${bg}`}>
                  <div className="list-content">
                    <input
                      onChange={onChangeRadio}
                      id="radioInput"
                      className={`radio-input ${activeInput}`}
                      type="radio"
                      name="offer"
                      checked={activeId === id}
                    />
                    <div className="list-item-content">
                      <div className="pair-and-price">
                        <p className="pair">
                          {id} {id > 1 ? 'pairs' : 'pair'}
                        </p>
                        <p className="price">DKK: {DKK}.00</p>
                      </div>
                      {second === true && activeId === id && (
                        <p className="not-price">DKK 195.00</p>
                      )}
                      {third === true && activeId === id && (
                        <p className="not-price">DKK 345.00</p>
                      )}
                      <div>
                        {second === true && activeId === id && (
                          <p className="popular">Most Popular</p>
                        )}
                        <p className="offer">{offer}% OFF</p>
                      </div>
                    </div>
                  </div>
                  {activeId === id && (
                    <div className="titles">
                      <p className="size-title">Size</p>
                      <p className="colour-title">Colour</p>
                    </div>
                  )}
                  {activeId === id && (
                    <ul className="features-list">
                      {numArr.map(num => (
                        <li className="item" key={num}>
                          <p className="serial-number">#{num}</p>
                          <select className="dropdown">
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                          </select>
                          <select className="dropdown">
                            <option>Colour</option>
                            <option>Red</option>
                            <option>Black</option>
                          </select>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="more-details">
            <p className="shipping">Free 2 Days Shipping</p>
            <p className="amount">Total : DKK {details.DKK}.00</p>
          </div>
          <button onClick={this.onClickBtn} className="btn" type="button">
            + Add to Cart
          </button>
          <p className="copyright">
            <AiOutlineCopyright /> Powered by Pumper
          </p>
          {isSubmit && (
            <p className="success">Successfully added to your Cart</p>
          )}
        </div>
      </div>
    )
  }
}

export default BundleSavePage
