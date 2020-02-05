import React from 'react'
import { Container, Header, Segment, List } from 'semantic-ui-react'

const Instructions = (props) => {

  const InstructionNotes = (props) => {

    const ignore = props.ignore ? props.ignore : 'null'
    const notes = [
      {key:'0RecipeNote', ignore:'yes', content:"[0] The instructions will be visible in the project view as well!"},
      {key:'1RecipeNote', ignore:'yes', content:"[1] PET bottles can handle values greater than 1000kPa, but using such high values isn't advised. Even if the vessel can handle the pressure, the mixture will violently decarbonize and escape when the vessel is opened."},
      {key:'2RecipeNote', ignore:'no', content:"[2] Alternatively you can use honey, use slightly larger amount since only ~70% of it is sugar."},
      {key:'3RecipeNote', ignore:'no', content:"[3] An airtight seal is required, since fermentation occurs only in anaerobic conditions."},
      {key:'4RecipeNote', ignore:'no', content:"[4] These equations presume 100% conversion of sugar. This will make for a really bad mead, so retard the process before all sugar is gone!"}
    ]

    return (
      <>
      <Header>Notes</Header>
      <List>
        {notes.filter( note => note.ignore != ignore ).map( note => <List.Item key={note.key}>{note.content}</List.Item> )}
      </List>
      </>
    )
  }

  const InstructionHeader = () => {
    return (
      <>
      <p>Drag the sliders to your liking to get the initial water and sugar amounts.</p>

      <p>For the max pressure, <b>250 kPa</b> is a general good value. Generic glass bottles can handle about 300kPa of overpressure, while champagne bottles can handle up to 600kPa[1].</p>
      </>
    )
  }

  const InstructionList = () => {
    return (
      <List>
        <List.Item>1. Bring the water to a boil, mix in the sugar[2] and lemon slices. Wait for the mixture's temperature to drop to the yeast's activation temperature.</List.Item>
        <List.Item>2. Pour the mixture to the container or final vessel and log the weight in the project view. Mix in the yeast.</List.Item>
        <List.Item>3. Close[3] the container or vessel and periodically release the pressure and log the new weight. Alternatively use a fermentation lock. </List.Item>
        <List.Item>4. Once the weight has dropped the required amount, filter out the lemon slices and pour the container to the final vessel. Add raisins to your liking. Seal the vessel.</List.Item>
        <List.Item>5. Make an estimation based on the project view's graph on when to retard the process[4].</List.Item>
        <List.Item>6. Retard the process by placing the vessel in fridge.</List.Item>
        <List.Item>7. Klara vappen!</List.Item>
      </List>
    )
  }

  if( props.basic != null ){return(
    <Segment>
      <Header>Instructions</Header>
      <InstructionList/>
      <InstructionNotes ignore={"yes"}/>
    </Segment>
  )} else return(
    <Segment>
      <Header>Instructions[0]</Header>
      <InstructionHeader/>
      <InstructionList/>
      <InstructionNotes/>
    </Segment>
  )
}

export default Instructions