import React, { Component } from 'react'
import ErrorBox from './../components/ErrorBox'

export default class Test extends Component {
  render () {
    return (
      <main>
        <ErrorBox colour="red">Not Found</ErrorBox>
      </main>
    )
  }
}
