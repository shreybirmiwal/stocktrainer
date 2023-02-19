import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

function Stock() {

  var options = {
    yaxis:{
      labels:{
        show:false
      }
    },
    xaxis:{
      labels:{
        show:false
      }
    },
    tooltip:{
      enabled:false
    }
  }
  const [series, setSeries] = useState([])
  
  var Tempseries = [{
    data: [

    ]
  }]


  useEffect(()=>{
    fetchStock()
  }, [])

  const fetchStock = () => {

    fetch('/dummydata.json')
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {

          var x = 100
          for (var key in data['Time Series (Daily)']) {
            
            var temp = []
            temp.push((x))
            temp.push(Number(data['Time Series (Daily)'][key]['1. open']))
            temp.push(Number(data['Time Series (Daily)'][key]['2. high']))
            temp.push(Number(data['Time Series (Daily)'][key]['3. low']))
            temp.push(Number(data['Time Series (Daily)'][key]['4. close']))
            
            if(Tempseries[0].data.length < 50){
              Tempseries[0].data.push(temp)
            } else{
              break
            }
            x--
          }
        
          setSeries(Tempseries)

        }
      )
  }

    return (
      <div>
            <Chart
              options={options}
              series={series}
              type="candlestick"
              width="500"
            />
      </div>
    )
  
}

export default Stock;