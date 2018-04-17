import React, { Component } from 'react'
import Sortable, { SortableContainer } from 'react-anything-sortable'
import 'react-anything-sortable/sortable.css'
import PropTypes from 'prop-types'

import config from './../config.json'

export default class ImageDrag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arr: []
    }

    this.handleSort = this.handleSort.bind(this)
    this.handleAddElement = this.handleAddElement.bind(this)
    this.handleRemoveElement = this.handleRemoveElement.bind(this)
  }

  componentWillMount () {
    this.setState({
      arr: this.props.items || []
    })
  }

  handleSort (sortedArray) {
    this.setState({
      arr: sortedArray
    })
    if (this.props.onChange) this.props.onChange(this.state.arr)
  }

  handleAddElement () {
    this.setState({
      arr: this.state.arr.concat(Math.round(Math.random() * 1000))
    })
    if (this.props.onChange) this.props.onChange(this.state.arr)
  }

  handleRemoveElement (index) {
    const newArr = this.state.arr.slice()
    newArr.splice(index, 1)

    this.setState({
      arr: newArr
    })
    if (this.props.onChange) this.props.onChange(this.state.arr)
  }

  render () {
    const renderItem = (num, index) => {
      return (
        <SortableContainer className="image-drag-item" key={num} sortData={num}>
          <img className="image-drag-image" src={config.CDN_URI + num + '.png'} key={index}/>
          <span
            className="image-drag-delete"
            onClick={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
        </SortableContainer>
      )
    }

    return (
      <div>
        {/* <button onClick={this.handleAddElement}>Add 1 element</button> */}
        <Sortable className="image-drag" onSort={this.handleSort} dynamic>
          {this.state.arr.map(renderItem, this)}
        </Sortable>
      </div>
    )
  }
}

ImageDrag.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}
