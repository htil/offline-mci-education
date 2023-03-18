import React from 'react'
import { Line } from '@nivo/line'
import _ from 'lodash'
import { stopSpinner } from './Spinner';


export default class LinearLineGraph extends React.Component {
    render(){
        const commonProperties = {
            width: 900,
            height: 400,
            margin: { top: 20, right: 20, bottom: 60, left: 80 },
            animate: true,
            enableSlices: 'x',
          
        }

        return(
            <Line
            {...commonProperties}
            curve="monotoneX"
            data={[
                {
                    id: 'signal',
                    data: this.props.data,
                },
            ]}
            yScale={{
                type: 'linear',
                max: 'auto',
                min: 'auto'
            }}
            xScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
            }}
            axisLeft={{
                legend: 'µV',
                legendOffset: 12,
            }}
            axisBottom={{
                legend: 'samples',
                legendOffset: -12,
            }}
            layers={[
                "grid",
                "axes",
                "lines",
                () => {
                    console.log("done drawing")
                }
            ]}
        />
        )
    }
}