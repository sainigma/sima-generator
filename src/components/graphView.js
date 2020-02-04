import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import 'react-vis/dist/style.css'
import { FlexibleWidthXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis'

const GraphView = (props, ignores) => {

  useEffect( ()=>{
    console.log( props.projects.items[0].project.carbondioxideToRelease )
  },[])

  const data = [
    {x: 0, y: 1500},
    {x: 24, y: 1423},
    {x: 48, y: 1200}
  ]

  const carbondioxideLimit = [
    {x: 0, y: 1350},
    {x: 48, y: 1350}
  ]

  return (
    <FlexibleWidthXYPlot height={480}>
      <HorizontalGridLines/>
      <LineSeries data={data} />
      <LineSeries data={carbondioxideLimit} />
      <XAxis />
      <YAxis />
    </FlexibleWidthXYPlot>
  )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, null)(GraphView)