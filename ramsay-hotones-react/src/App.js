import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import ReactGA from 'react-ga';

const data = require("./data/data.json");

ReactGA.initialize('UA-132982105-2')
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  state = {
    datapoints: [],
    hots: [],
    shits: [],
    fucks: [],
  }

  componentDidMount() {

    const datapoint = {
      ts: null,
      text: ""
    };

    const records = [];

    // Parse data
    data.timedtext.body.p.forEach((part, i) => {
      if (part.s) {
        let beginningTS = +part["_t"];
        if (part.s.forEach) {
          part["s"].forEach(string => {
            records.push({
              ...datapoint,
              ts: string["_t"] ? beginningTS + Number(string["_t"]) : beginningTS,
              text: string["__text"]
            });
          });
        } else {
          records.push({
            ...datapoint,
            ts: part.s["_t"] ? beginningTS + Number(part.s["_t"]) : beginningTS,
            text: part.s["__text"]
          });
        }
      }
    });

    const shits = records.reduce(function (result, point) {
      if (point.text.includes('shit')) {
        result.push(result[result.length - 1] + 1)
      } else {
        result.push(result[result.length - 1])
      }

      return result
    }, [0]);

    const fucks = records.reduce(function (result, point) {
      if (point.text.includes('fuck')) {
        result.push(result[result.length - 1] + 1)
      } else {
        result.push(result[result.length - 1])
      }

      return result
    }, [0]);

    const hots = records.reduce(function (result, point) {
      if (point.text.includes('hot')) {
        result.push(result[result.length - 1] + 1)
      } else {
        result.push(result[result.length - 1])
      }

      return result
    }, [0]);

    // const wordcounts = this.state.datapoints.reduce(function (result, point) {
    //   if (result[point.text]) {
    //     result[point.text] += 1
    //   } else {
    //     result[point.text] = 1
    //   }

    //   return result
    // }, {})

    // const sortedWordCount = Object.entries(wordcounts).sort((entryA, entryB) => {
    //   if (entryA[1] > entryB[1]) {
    //     return -1
    //   }
    //   if (entryA[1] < entryB[1]) {
    //     return 1
    //   }
    //   return 0;
    // })

    // if (this.state.datapoints.length === 0) {
    //   return null
    // }

    this.setState({
      fucks,
      shits,
      hots,
      datapoints: records,
    })
  }

  render() {

    const swearWordOptions = {
      title: {
        text: 'Gordon Ramsay Hot Ones',
        // textAlign: 'center',
        textStyle: {
          fontSize: 36,
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        name: 'Timestamp',
        nameLocation: 'middle',
        nameGap: 20,
        type: 'category',
        axisLabel: {
          show: true,
          inside: false,
          // formatter: d => d.ts
        },
        boundaryGap: false,
        data: this.state.datapoints.map(point => point.ts) || [],
      },
      yAxis: {
        type: 'value',
        name: 'swear count',
        nameLocation: 'center',
        nameGap: 20,
      },
      series: [
        {
          name: 'shits',
          type: 'line',
          data: this.state.shits,
        },
        {
          name: 'fucks',
          type: 'line',
          data: this.state.fucks,
        },
        {
          name: 'hots',
          type: 'line',
          data: this.state.hots,
        }
      ]
    }

    return (
      <div className="App">
        <ReactECharts option={swearWordOptions} />
      </div>
    );
  }
}

export default App;
