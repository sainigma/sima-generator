import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { meadSystem } from './../equations/meadSystem'
import { addProject } from './../reducers/projectsReducer'

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

  useEffect( ()=>{
    updateMead()
  },[])

  const updateMead = () => {
    const currentMeadSystem = meadSystem(waterVolume, containerPressure, alcoholByVolume, 0)
    setSystem(currentMeadSystem)
  }

  const addNewProject = () => {
    const currentMeadSystem = meadSystem(waterVolume, containerPressure, alcoholByVolume, 0)
    props.addProject( currentMeadSystem, 0 )
    props.history.push("/project")
  }

  const modifyField = (event) => {
    const value = event.target.value
    switch (event.target.name) {
      case 'V': setWaterVolume(value); break
      case 'P': setContainerPressure(value); break
      case 'ABV': setAlcoholByVolume(value); break
      default: break
    }
    updateMead()
  }

  const setSystem = (currentMeadSystem) => {

    setWater(currentMeadSystem.composition.water)
    setEthanol(currentMeadSystem.composition.ethanol)
    setCarbondioxide(currentMeadSystem.composition.carbondioxide)
    setTruePressure(currentMeadSystem.pressure)

    setSugar(currentMeadSystem.initialSugar)
    setCarbondioxideToRelease(currentMeadSystem.carbondioxideToRelease)
  }

  return (
    <div>
      <h1>Init view</h1>
      <label>Container volume: <input type="range" name='V' min="0.3" max="2" step="0.1" value={waterVolume} onChange={modifyField}></input> {waterVolume} litres </label><br />
      <label>Container max pressure: <input type="range" name='P' min="200" max="1280" value={containerPressure} onChange={modifyField}></input> {containerPressure} KPa </label><br />
      <label>Alcohol by volume: <input type="range" min="0.1" max="4" step="0.1" name='ABV' value={alcoholByVolume} onChange={modifyField}></input> {alcoholByVolume} %</label><br />
      <br />
      <h3>Recipe</h3>
      <li>water: {water} g</li>
      <li>sugar: {sugar} g</li>
      <li>carbondioxide to release before bottling: {carbondioxideToRelease} g</li>
      <h3>Final composition</h3>
      <li>pressure: {truePressure} kPa</li>
      <li>water: {water} g</li>
      <li>ethanol: {ethanol} g</li>
      <li>carbondioxide+acids: {carbondioxide} g</li>
      <input type="button" value="save" onClick={addNewProject}></input>
    </div>
  )
}

export default connect(null, {addProject})(InitializeMead)