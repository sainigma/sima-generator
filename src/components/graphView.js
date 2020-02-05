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
    const maxTime = data.length > 1 ? data[ data.length -1 ].x : 24
    const carbondioxideLimit =  [{x:0, y: minimumWeight}, {x: maxTime, y: minimumWeight}]
    console.log(maxTime)

    return (
      <FlexibleWidthXYPlot height={400} yDomain={[minimumWeight*0.99, selected.history[0].content*1.01]}>
        <HorizontalGridLines/>
        <MarkSeries data={data}/>
        <LineSeries color='red' data={carbondioxideLimit} />
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