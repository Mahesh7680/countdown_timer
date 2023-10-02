// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    userInput: 25,
    formattedTime: '',
    timerRunning: false,
  }

  timerId

  onReset = () => {
    const {minutes, seconds, formattedTime} = this.state
    this.setState({
      userInput: 25,
      minutes: 25,
      seconds: 0,
      formattedTime: `${String(25).padStart(2, '0')}:${String(0).padStart(
        2,
        '0',
      )}`,
      timerRunning: false,
    })
    clearInterval(this.timerId)
  }

  onMinutesDecrement = () => {
    const {userInput, timerRunning} = this.state
    if (timerRunning === false) {
      this.setState(prevState => ({
        userInput: prevState.userInput - 1,
        minutes: prevState.minutes - 1,
        timerRunning: false,
        formattedTime: `${String(userInput - 1).padStart(2, '0')}:${String(
          0,
        ).padStart(2, '0')}`,
      }))
      clearInterval(this.timerId)
    } else {
      this.setState(prevState => ({userInput: prevState.userInput - 1}))
    }
  }

  onMinutesIncrement = () => {
    const {userInput, timerRunning} = this.state
    if (timerRunning === false) {
      this.setState(prevState => ({
        userInput: prevState.userInput + 1,
        minutes: prevState.minutes + 1,
        timerRunning: false,
        formattedTime: `${String(userInput + 1).padStart(2, '0')}:${String(
          0,
        ).padStart(2, '0')}`,
      }))
      clearInterval(this.timerId)
    } else {
      this.setState(prevState => ({userInput: prevState.userInput + 1}))
    }
  }

  updateTimer = () => {
    const {minutes, seconds} = this.state
    this.setState({
      formattedTime: `${String(minutes).padStart(2, '0')}:${String(
        seconds,
      ).padStart(2, '0')}`,
    })
  }

  countDown = () => {
    console.log('countdown called')
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState({timerRunning: false})
      alert('Countdown finished!')
    } else {
      this.setState({timerRunning: true})
      if (seconds === 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 59,
        }))
      } else {
        this.setState({
          seconds: seconds - 1,
        })
      }
      this.updateTimer()
    }
  }

  startTimer = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      timerRunning: true,
      minutes: prevState.userInput,
      seconds: 0,
    }))
    this.timerId = setInterval(this.countDown, 1000)
    console.log('start')
  }

  stopTimer = () => {
    clearInterval(this.timerId)
    this.setState({timerRunning: false})
    console.log('pause')
  }

  componentDidMount = () => {
    this.updateTimer()
  }

  render() {
    const {timerRunning, userInput, formattedTime} = this.state

    return (
      <div className="timer-container">
        <div className="counter-background">
          <div className="timer-to-display">
            <h1>{formattedTime}</h1>
            <p>{timerRunning ? 'Running' : 'Paused'}</p>
          </div>
        </div>
        <div className="user-handling-container">
          <div className="play-reset-buttons-container">
            {timerRunning ? (
              <button type="button" onClick={this.stopTimer}>
                <img
                  alt="pause icon"
                  src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                />
                Pause
              </button>
            ) : (
              <button type="button" onClick={this.startTimer}>
                <img
                  alt="play icon"
                  src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
                />
                Start
              </button>
            )}
            <button type="button" onClick={this.onReset}>
              <img
                alt="reset icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              />
              Reset
            </button>
          </div>
          <p>Set Timer Limit</p>

          <div className="control-input-container">
            <button type="button" onClick={this.onMinutesDecrement}>
              -
            </button>
            <p className="main-minutes-input">{userInput}</p>
            <button type="button" onClick={this.onMinutesIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

/* <button type="button">{timerRunning ? 'Pause' : 'Start'}</button> */
