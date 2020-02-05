import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import 'react-vis/dist/style.css'
import { FlexibleWidthXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries, DiscreteColorLegend } from 'react-vis'
import Instructions from './instructions'
const GraphView = (props) => {
  const selected = props.projects.items.find( item => item.id === props.projects.selected )

  if( selected.history.length > 0 ){

    const xOffset = selected.history[0].timestamp
    const data = selected.history.map( (item) => { return { x:( (item.timestamp-xOffset)/3600000 ), y:item.content } } )

    const minimumWeight = selected.history[0].content - selected.project.carbondioxideToRelease
    const absoluteMinimumWeight = selected.history[0].content - selected.project.carbondioxideProductionTotal
    console.log( selected.project.carbondioxideToRelease )
    console.log( selected.project.carbondioxideProductionTotal )
    const maxTime = data.length > 1 ? data[ data.length -1 ].x : 24
    const carbondioxideLimit =  [{x:0, y: minimumWeight}, {x: maxTime, y: minimumWeight}]
    const carbondioxideAbsoluteLimit = [{x:0, y: absoluteMinimumWeight}, {x: maxTime, y: absoluteMinimumWeight}]
    
    return (
      <FlexibleWidthXYPlot height={400} yDomain={[absoluteMinimumWeight*0.99, selected.history[0].content*1.001]}>
        <HorizontalGridLines/>
        <MarkSeries data={data}/>
        <LineSeries color='blue' data={carbondioxideLimit} />
        <LineSeries color='red' data={carbondioxideAbsoluteLimit} />
        <XAxis title='Time [h]'/>
        <YAxis title='Weight [g]'/>
      </FlexibleWidthXYPlot>
    )
  }else return (
    <>
      <Instructions basic={true}/>
    </>
    
  )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, null)(GraphView)