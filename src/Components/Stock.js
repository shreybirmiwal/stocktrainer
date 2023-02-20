import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";


function Stock() {
  const [series, setSeries] = useState([])
  const [nextTen, setNextTen] = useState([])

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

          const min = 0;
          const max = 70;
          const rand = min + Math.random() * (max - min);
          console.log(rand)

          var x = 100 //100 being most recent, 0 being 100 days old
          for (var key in data['Time Series (Daily)']) {
            
            var temp = []
            temp.push((x))
            temp.push(Number(data['Time Series (Daily)'][key]['1. open']))
            temp.push(Number(data['Time Series (Daily)'][key]['2. high']))
            temp.push(Number(data['Time Series (Daily)'][key]['3. low']))
            temp.push(Number(data['Time Series (Daily)'][key]['4. close']))
            
            if(x >= rand && x <= (rand+20)){
              Tempseries[0].data.push(temp)
            } else if( x <= (rand + 30)) {
              var tempx = nextTen
              tempx.push(Number(data['Time Series (Daily)'][key]['1. open']))
              setNextTen(tempx)
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
          width="500"/>


      </div>
    )
  
}

export default Stock;