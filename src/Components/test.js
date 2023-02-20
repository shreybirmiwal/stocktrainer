import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-dragdata";

const UserDraw = props => {
  console.log("PROPS:", props.data);
  const state = {
    dataSet: [
      [50, 50, 50, 50, 50, 50, 50],
      props.data
    ],
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    options: {
      tooltips: { enabled: true },
      scales: {
        xAxes: [
          {
            gridLines: { display: false, color: "grey" },
            ticks: { fontColor: "#3C3C3C", fontSize: 14 }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Color Strength",
              fontSize: 14
            },
            ticks: {
              display: true,
              min: -5,
              max: 100,
              scaleSteps: 50,
              scaleStartValue: -50,
              maxTicksLimit: 4,
              fontColor: "#9B9B9B",
              padding: 30,
              callback: point => (point < 0 ? "" : point)
            },
            gridLines: {
              display: false,
              offsetGridLines: true,
              color: "3C3C3C",
              tickMarkLength: 4
            }
          }
        ]
      },
      legend: {
        display: true
      },
      dragData: true,
      dragOptions: {
        showTooltip: true
      },
      dragDataRound: 1,
      onDragStart: function(e) {
        console.log("Start:", e);
      },
      onDrag: function(e, datasetIndex, index, value) {
        console.log("Drag:", datasetIndex, index, value);
      },
      onDragEnd: function(e, datasetIndex, index, value) {
        console.log("End:", datasetIndex, index, value, this.state);
        // const set = this.state.dataSet;
        // set[datasetIndex][index] += 5;
        // setState({
        //   dataSet: set
        // });
      }.bind(this)
    }
  };

  console.log("RENDER");
  const data = {
    labels: state.labels,
    datasets: [
      {
        label: "Predict",
        data: state.dataSet[0],
        lineTension: 0,
        borderColor: "9B9B9B",
        borderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "cyan",
        pointBorderWidth: 0,
        spanGaps: false
      },

    ]
  };
  return (
    <div>
      <Line data={data} options={state.options} />
    </div>
  );
};

export default UserDraw;
