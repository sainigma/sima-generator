import React, { useEffect, useState } from 'react'
import { Container, Segment, Header, Icon, List, Button } from 'semantic-ui-react'

const Recipe = (props) => {
  return (
    <>
    <Segment>
      <Header>Recipe:</Header>
      <List>
        <List.Item>Water: {props.water.toPrecision(4)} grams</List.Item>
        <List.Item>Sugar: {props.sugar.toPrecision(3)} grams</List.Item>
        <List.Item>Lemons: {(props.water*0.4*0.001).toPrecision(2)}</List.Item>
        <List.Item>Raisins to taste</List.Item>
      </List>
      <Header>Final composition:</Header>
      <List>
        <List.Item>CO2 + acids: {props.carbondioxide.toPrecision(2)} grams</List.Item>
        <List.Item>Ethanol: {props.ethanol.toPrecision(3)} grams</List.Item>
      </List>
      <Header>Other:</Header>
      <List>
        <List.Item>CO2 to release: {props.carbondioxideToRelease.toPrecision(3)} grams</List.Item>
      </List>
      </Segment>
    </>
  )
}

export default Recipe