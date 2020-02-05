import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon, List, Button } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
import { meadSystem } from './../equations/meadSystem'
import { addProject } from './../reducers/projectsReducer'
import Instructions from './instructions'
import Recipe from './recipe'

const InitializeMead = (props) => {

  const [waterVolume, setWaterVolume] = useState(1)
  const [containerPressure, setContainerPressure] = useState(250)
  const [alcoholByVolume, setAlcoholByVolume] = useState(2)

  const [sugar, setSugar] = useState(0)
  const [carbondioxideToRelease, setCarbondioxideToRelease] = useState(0)

  const [water, setWater] = useState(0)
  const [ethanol, setEthanol] = useState(0)
  const [carbondioxide, setCarbondioxide] = useState(0)
  const [truePressure, setTruePressure] = useState(0)

  const updateMead = (newWater,newPressure,newABV) => {
    const currentMeadSystem = meadSystem(newWater, newPressure, newABV, 0)
    setSystem(currentMeadSystem)
  }

  useEffect( ()=>{
    updateMead( waterVolume, containerPressure, alcoholByVolume )
  },[])

  const addNewProject = () => {
    const currentMeadSystem = meadSystem(waterVolume, containerPressure, alcoholByVolume, 0)
    props.addProject( currentMeadSystem, 0 )
  }

  const setSystem = (currentMeadSystem) => {

    setWater(currentMeadSystem.composition.water)
    setEthanol(currentMeadSystem.composition.ethanol)
    setCarbondioxide(currentMeadSystem.composition.carbondioxide)
    setTruePressure(currentMeadSystem.pressure)

    setSugar(currentMeadSystem.initialSugar)
    setCarbondioxideToRelease(currentMeadSystem.carbondioxideToRelease)
  }

  if( props.selected === 'new' ){
    return(
      <Segment.Group horizontal style={{width:'100%',border:'none',borderRadius:'1.5em', boxShadow:'10px 10px 20px black', opacity:'0.9'}}>

        <Instructions/>

        <Segment inverted color='orange' style={{borderTopRightRadius: '1.5em',borderBottomRightRadius: '1.5em',width:'50%'}}>
          <Header>Initialize new project</Header>
          <Segment.Group >
              <Segment basic>
                <Header as='h4' floated='left'>Container volume</Header>
                <Header as='h4' floated='right'>{waterVolume.toPrecision(2)} litres</Header>
              </Segment>
              <Segment basic>
                <Slider value={waterVolume} settings={ { start: waterVolume, min: 0.3, max: 10, step:0.1, onChange: value => { setWaterVolume(value); updateMead(value,containerPressure,alcoholByVolume) } } }/>
              </Segment>

              <Segment basic>
                <Header as='h4' floated='left'>Bottle max pressure</Header>
                <Header as='h4' floated='right'>{containerPressure} kPa</Header>
              </Segment>
              <Segment basic>
                <Slider value={containerPressure} settings={ { start: containerPressure, min: 200, max: 600, step:1, onChange: value => { setContainerPressure(value); updateMead(waterVolume,value,alcoholByVolume) } } }/>
              </Segment>

              <Segment basic>
                <Header as='h4' floated='left'>Alcohol by volume</Header>
                <Header as='h4' floated='right'>{alcoholByVolume.toPrecision(2)} %</Header>
              </Segment>
              <Segment basic>
                <Slider value={alcoholByVolume} settings={ { start: alcoholByVolume, min: 0.1, max: 4, step:0.1, onChange: value => { setAlcoholByVolume(value); updateMead(waterVolume,containerPressure,value) } } }/>
              </Segment>
          </Segment.Group>
          <Recipe water={water} sugar={sugar} ethanol={ethanol} carbondioxide={carbondioxide} carbondioxideToRelease={carbondioxideToRelease}/>
          <Button color='red' content='Add Project' labelPosition='left' icon='save' primary onClick={addNewProject}/>
        </Segment>
      </Segment.Group>
    )
  }else return (<></>)

}

const mapStateToProps = (state) => {
  return {
    selected: state.projects.selected
  }
}

export default connect(mapStateToProps, {addProject})(InitializeMead)