// pages/list/list.js
const dayMap={
  1:"一",
  2:"二",
  3:"三",
  4:"四",
  5:"五",
  6:"六",
  0:"日"
}
Page({
  data:{
    seven_day_weather:[1,2,3,4,5,6,7],
  },
  onPullDownRefresh() {
    this.get_sevenday(() => { wx.stopPullDownRefresh() })
  },
  onLoad(){
    this.get_sevenday()
  },
  get_sevenday(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city:'广州市',
        time:+new Date()},
      success: res => {
        console.log(res.data);
        let result=res.data.result;
        this.set_sevenday_weather(result)
        },
      complete:()=>{
        callback && callback()
      }
      })
  },
  set_sevenday_weather(result){
    let day = new Date;
    let today_week = day.getDate();
    let date = day.toLocaleDateString()

    for (let i = 0; i < 7; i++) {
      let getday = dayMap[(today_week + i) % 7]
      result[i].day = getday
      result[i].date = date.replace(/\//g, '-')
    }
    result[0].day += "(今)"
    this.setData({
      seven_day_weather: result
    });
  }

})