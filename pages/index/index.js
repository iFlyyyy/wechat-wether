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
    hourlyWeather: [],
    today_date:"",
    today_temp:""
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

      success: res => {
        console.log(res.data)
        //获取返回数据
        let result = res.data.result;
        this.now_weather(result);
        this.hourly_weather(result);
        this.today_weather(result);
        
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  //获取现在天气
  now_weather(result){
    let temp = result.now.temp;
    let weather = result.now.weather;
    console.log(temp, weather)
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather]
    })
    this.setData({
      nowtemp: temp + "°",
      nowweather: weatherMap[weather],
      nowweatherbackground: "/images/" + weather + "-bg.png",
    })
  },
  //设置预测天气
  hourly_weather(result){
    let forecast = result.forecast;
    let hourlyWeather = [];
    let nowHour = new Date().getHours();
    for (let i = 0; i < 24; i += 3) {
      hourlyWeather.push({
        time: (i + nowHour) % 24 + "时",
        icon: '/images/' + forecast[i / 3].weather + '-icon.png',
        temp: forecast[i / 3].temp + "°"
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  //获取today天气
  today_weather(result){
    let today_date = new Date().toLocaleDateString()
    let today_temp_max = result.today.maxTemp
    let today_temp_min = result.today.minTemp
    this.setData({
      today_date: "今天 " + today_date,
      today_temp: String(today_temp_min) + "°" + "~" + String(today_temp_max) + "°"
    })
  },
  next_page(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})