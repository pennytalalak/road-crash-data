import React, { Component } from 'react'

const elevationScale = { min: 1, max: 20 }

export default class Animation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elevationScale: elevationScale.min,
    }

    this.startAnimationTimer = null
    this.intervalTimer = null

    this._startAnimate = this._startAnimate.bind(this)
    this._animateHeight = this._animateHeight.bind(this)
  }

  componentDidMount() {
    this._animate()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data &&
      this.props.data &&
      nextProps.data.length !== this.props.data.length
    ) {
      this._animate()
    }
  }

  componentWillUnmount() {
    this._stopAnimate()
  }

  _animate() {
    this._stopAnimate()

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500)
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20)
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer)
    window.clearTimeout(this.intervalTimer)
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate()
    } else {
      this.setState({ elevationScale: this.state.elevationScale + 1 })
    }
  }
}
