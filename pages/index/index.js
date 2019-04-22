const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
Page({
  onPullDownRefresh() {
    this.getnow(()=>{wx.stopPullDownRefresh()})
  },
  data: {
    nowtemp: "",
    nowweather: "",
    nowweatherbackground:"",
    hourlyWeather: []
  },
  onLoad() {
    this.getnow()
  },
  getnow(callback) {
    //请求数据
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '贵阳市'
      },

      //成功后返回
      success: res => {
        console.log(res.data)
        let result = res.data.result;
        let temp= result.now.temp;
        let weather = result.now.weather;
        console.log(temp,weather)
        
        //设置导航栏颜色
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        })

        //设置预测天气
        let forecast=result.forecast;
        let hourlyWeather = [];
        let nowHour = new Date().getHours();
        for (let i = 0; i < 24; i += 3) {
          hourlyWeather.push({
            time: (i + nowHour) % 24 + "时",
            icon: '/images/'+forecast[i/3].weather+'-icon.png',
            temp: forecast[i/3].temp
          })
        }
        hourlyWeather[0].time = '现在'

        //设置动态数据的值
        this.setData({
          nowtemp: temp + "°",
          nowweather: weatherMap[weather],
          nowweatherbackground: "/images/" + weather + "-bg.png",
          hourlyWeather: hourlyWeather
        })
      },
      complete: ()=>{
        callback && callback()
      }
    })
  } 
})