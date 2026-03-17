import ReactECharts from 'echarts-for-react';

const Realtime = () => {
   const option = {
    title: { text: '销量统计' },
    xAxis: { type: 'category', data: ['衬衫', '羊毛衫', '雪纺衫'] },
    yAxis: {},
    series: [{ data: [5, 20, 36], type: 'bar' }]
  };

  return <ReactECharts option={option} style={{ height: 400 }} />
}

 
export default Realtime