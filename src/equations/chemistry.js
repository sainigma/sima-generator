export const molarmass = {
  water: 18.01528,
  carbondioxide: 44.009,
  ethanol: 46.069,
  sucrose: 342.30,
}

export const acidityByPressure = ( pressure ) => {
  const CO2aqPerCO2gasEqC = 29.76
  const H2CO3PerCO2EqC = 1.7E-3
  const H2CO3DisC = 2.5E-4
  return Math.log10( 1 / Math.sqrt( 10E-14 + pressure * H2CO3PerCO2EqC * H2CO3DisC / CO2aqPerCO2gasEqC ) )
}

export const kPaToAtm = ( pressure ) => {
  return pressure * 0.00986923
}

export const atmTokPa = ( pressure ) => {
  return pressure * 101.325
}