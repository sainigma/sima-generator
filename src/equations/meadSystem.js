import { acidityByPressure, kPaToAtm, atmTokPa, molarmass } from './chemistry'

export const meadSystem = (waterVolume, maxPressureKPa, alcoholByVolume, releasedCarbon) => {

  const waterN = waterVolume * 1000 / molarmass.water
  let basemoles = 0.01 * alcoholByVolume * waterN * molarmass.water / (
    4 * molarmass.ethanol * (1 - 0.01 * alcoholByVolume) + 0.01 * alcoholByVolume * molarmass.water
  )

  if( releasedCarbon > 0 ){
    basemoles = releasedCarbon / (4*molarmass.carbondioxide)
  }

  const sucroseN = basemoles
  const ethanolN = 4 * basemoles
  let carbondioxideN = 4 * basemoles
  let dissolvedCarbondioxideN = carbondioxideN / (1 + 3.36E-2)

  let currentPressure = atmTokPa(dissolvedCarbondioxideN * 29.76)
  let carbondioxideToReleaseN = 0
  if (currentPressure > maxPressureKPa) {
    const maxDissolvedCarbondioxideN = kPaToAtm(maxPressureKPa) / 29.76
    const maxCarbondioxideN = maxDissolvedCarbondioxideN * (1 + 1 / 29.76)
    currentPressure = maxPressureKPa
    carbondioxideToReleaseN = carbondioxideN - maxCarbondioxideN

    carbondioxideN = maxCarbondioxideN
    dissolvedCarbondioxideN = maxDissolvedCarbondioxideN
  }
  const acidity = acidityByPressure(kPaToAtm(currentPressure))

  const currentMeadSystem = {
    initialSugar: sucroseN * molarmass.sucrose,
    pressure: currentPressure,
    acidity: acidity,
    carbondioxideToRelease: carbondioxideToReleaseN * molarmass.carbondioxide,
    carbondioxideProductionTotal: carbondioxideN * molarmass.carbondioxide,
    composition: {
      water: (waterN - basemoles) * molarmass.water,
      ethanol: ethanolN * molarmass.ethanol,
      carbondioxide: dissolvedCarbondioxideN * molarmass.carbondioxide
    }
  }

  return currentMeadSystem
}