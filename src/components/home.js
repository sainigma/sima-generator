import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'

const Home = (props) => {

  if( props.projects.selected === 'home' ){
    return(
      <Segment.Group horizontal style={{width:'100%',border:'none',borderRadius:'1.5em', boxShadow:'none', opacity:'0.9'}}>
        <Segment basic style={{width:'50%',border:'none'}}/>
        <Segment style={{borderTopRightRadius: '1.5em',borderBottomRightRadius: '1.5em',width:'50%', boxShadow:'10px 10px 20px black'}}>
          <Header>Sima Generator</Header>
          <p>Use this site to log your sima fermentation projects. The site provides a scatter plot logger and a chemical equation solver that generates a recipe to follow, based on your target volume size, alcohol content and the material properties of the fermentation vessel.</p>
          <p>All projects are saved in browser's local storage, so export your projects before clearing cookies!</p>
          <Header>Explosions?</Header>
          <p>Fermentation takes in sucrose and water and produces ethanol and carbondioxide. The pressure surrounding the liquid determines how much carbondioxide will dissolve to the liquid, thus when carbondioxide is forced to the liquid in a closed container, the surrounding pressure will increase. If left unattended, this pressure will quickly rise to conditions that will shatter the bottle.</p>
          <p>This site will solve the maximum amount of carbondioxide produced by the initial conditions and tell you how much carbondioxide to dissipate before sealing the fermentation vessel.</p>
          <p>( Note. The equations presume 100% fermentation, which is insane when making sima. Use this knowledge to adjust the sweetness of your sima. Eg. Seal the container before reaching the safe limit. Also retarding will lower the pressure significantly )</p>
          <Header>Pressure</Header>
          <p>A basic plastic bottle is your best bet if you're afraid of explosions. They can handle up to 1MPa of overpressure and the pressure required for that nice fizziness is ~120kPa at 4°C, ~250kPa at 20°C</p>
          <p>Glass bottles can hold about 300kPa, so it'll be a close one if you do most of the fermentation in room temperature. Fermentation will occur after retarding as well, but it'll take longer and is harder to estimate, since you can't use the logged data in this case to guess the actual progress of the process.</p>
          <p>Also if you plan on making extremely pressurised sima, do note that you won't be getting just fizzy sima, you'll be getting sparkling sima or "menthos in a coke bottle" sima.</p>
          <Header>What is sima?</Header>
          <p>Sima is a traditional finnish mead made from water, sugar and brown sugar or honey, yeast, citrus juice and raisins. It's as delicious as it's easy to make. </p>
          <p>It's russian relative kvas(квас) is pretty similar, just replace some of the sugars with burnt bread.</p>
        </Segment>
      </Segment.Group>

    )
  }else return( <></> )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps,null)(Home)