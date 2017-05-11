$(function() {
  let chart = LineChart()

  chart.xTitle('Hour of day')
  chart.yTitle('Avg Global PSP (therm-zen cor) [W/m^2]')
  let date = '1/1/2011'


  let width = 900
  let height = 500

  let svg = d3.select('#vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

  let dateOpts = d3.select('#dates')

  d3.csv('data/wether.csv', (err, rows) => {
    let data = _.map(rows, (row) => {
      return {
        id: row.DATE,
        x: row['HOUR-MST'],
        y: row['Avg Global PSP (therm-zen cor) [W/m^2]']
      } 
    })

    let dates = _.groupBy(data, 'id')

    _.each(dates, (date, key) => {
      dateOpts.append('option')
        .attr('value', key)
        .text(key)
    })

    draw(dates[date])

    dateOpts.on('change', function() {
      date = $(this).val()
      draw(dates[date])
    })
  })

  function draw(data) {
    console.log(data)
    svg.data([data])
      .call(chart)
  }
})