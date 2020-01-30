import React, { useEffect, useState } from 'react'
import { acidityByPressure, kPaToAtm, atmTokPa, molarmass } from './../equations/chemistry'
import { meadSystem } from './../equations/meadSystem'

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

  const updateMead = async() => {
    const currentMeadSystem = await meadSystem(waterVolume, containerPressure, alcoholByVolume, 0)
    setSystem(currentMeadSystem)
    console.log(currentMeadSystem)
  }

  const modifyField = async (event) => {
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
      <form>
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
        <input type="button" value="save"></input>
      </form>
    </div>
  )
}

export default InitializeMead