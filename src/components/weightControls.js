import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon, Input, Button, Radio, SegmentGroup } from 'semantic-ui-react'
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
import { addHistory } from './../reducers/projectsReducer'

let secretTime = 0;

const WeightControls = (props) => {
  const [selectedTime, setSelectedTime] = useState(moment())
  const [selectedWeight, setSelectedWeight] = useState('')

  const changeSelectedTime = (event) => {
    setSelectedTime(event)
    secretTime = event.valueOf()
  }
  const changeWeight = (event) => {
    setSelectedWeight(event.target.value)
  }
  const saveLog = () => {
    if( secretTime === 0){
      secretTime = selectedTime.valueOf()
    }
    if( selectedWeight !== '' && secretTime > 0 ){
      props.addHistory(props.projects.selected, secretTime, selectedWeight)
      props.setShowInstructions(false)
    }
  }

  return(
    <Segment style={{width:'100%', padding:'0.5em', margin:'0px'}}>
      <Header>Log time and weight:</Header>
      <Segment.Group horizontal>
        <Segment style={{width:'20%'}}>
          <TimePicker style={{width:100, padding:'0.5em'}} defaultValue={selectedTime} showSecond={false} onChange={changeSelectedTime}/><Icon name='clock' style={{marginLeft:'1em'}}/>
        </Segment>
        <Segment>
          <Input
            label={{ basic: true, content: 'g' }}
            labelPosition='right'
            value={selectedWeight}
            placeholder='Enter weight..'
            onChange={changeWeight}
            fluid
          />
        </Segment>
      </Segment.Group>
      <Segment style={{width:'100%', padding:'0.5em', margin:'0px'}} basic>
        <Button color='red' content='Log weight' labelPosition='left' icon='save' primary style={{width:'100%'}} onClick={saveLog}/>
      </Segment>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return{
    projects:state.projects
  }
}

export default connect(mapStateToProps,{addHistory})(WeightControls)