import { FC } from "react";
import { 
  AccumulationChartComponent, 
  AccumulationSeriesCollectionDirective, 
  AccumulationSeriesDirective, 
  Inject, 
  AccumulationDataLabel,
  AccumulationDataLabelSettingsModel,
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip
} from'@syncfusion/ej2-react-charts';
import { ChartData } from "../HodlApp/HodlApp";
import { ClipLoader } from 'react-spinners';



interface Props {
  chartData: ChartData[];
  loadingStats: boolean;
}


const PieChart: FC<Props> = ({ chartData, loadingStats }) => {

  
  return (
    <>
      <div className="flex items-center min-w-[200px] justify-center">

        {chartData.length === 0 || loadingStats ? (
          <>
            <ClipLoader size="2rem" color="white" />
          </>
        ) : (
        <AccumulationChartComponent 
          id='charts'
          legendSettings={{ visible: true, background: 'transparent', textStyle: { color: 'white'} }}
          height={'200px'}
          background={'transparent'}
        >
          <Inject services={[ PieSeries, AccumulationDataLabel, AccumulationTooltip]} />


          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective 
              dataSource={chartData} 
              xName='name' 
              yName='value' 
              innerRadius='40%'
              

              startAngle={0}
              endAngle={360}
              radius="70%"
              explode
              explodeOffset="10%"
              explodeIndex={2}
              dataLabel={{

                visible: true,
                name: 'text',
                position: 'Outside',
                // @ts-ignore
                // template: label,
                font: {
                  fontWeight: '600',
                  color: '#fff',
                  size: '.9rem'
                },
              }}
            >
            </AccumulationSeriesDirective>

          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
        )}

      </div>
    </>
  )
}

export default PieChart;