let GraphTemp = document.getElementById("GraphTemp")
let Switch = true
let Time = new Date();
let TimeWrite = document.querySelectorAll("#TimeLine li")
let Hour = Time.setHours(Time.getHours());
let a = 1
let q = 0
x = 3
let TempRange =[]  
let TempRangeMax
let TempRangeMin
let date1 = new Date();
     
function getGeoLocation() {
    // Navigator is your browser. 
  navigator.geolocation.getCurrentPosition(success => {
    let { latitude, longitude } = success.coords;
    console.log(latitude, longitude)
    getWeatherData(latitude, longitude)
    // Navigator can give you alot of different information about what browser the user is using(What is he using too navigate the web)
    console.log(navigator.platform + " " + navigator.userAgent) //This will give us the machine the user is on.
  });
}

getGeoLocation()

// FETCH
let errorCountAmountOfTryies = 0;

async function getWeatherData(latitude, longitude) {
  // &units=metric
  const unit = "metric";
  const API_KEY = "dcf74a579d1a7bdab77b86e3da8f7ac3";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=${unit}&appid=${API_KEY}`;
  
  try {
    const response = await fetch(apiUrl);
    const Weather = await response.json();
    const labels = [date1.getHours()+":00"]
    for (let i = 0; i < 7; i++) {
    //  console.log(Weather.hourly[q].temp)
     date1.setHours(date1.getHours()+2);
     Add0 = date1.getHours()
     Add0 = Add0.toString().length

     if(Add0 == 1){
        console.log("0"+date1.getHours()+":00")
        labels.push("0"+date1.getHours()+":00")
     }
     else{
        console.log(date1.getHours()+":00")
        labels.push(date1.getHours()+":00")
     }
     
    q = q + 2
    }
    for (let i = 0; i < 11; i++) {
      TempRange.push(Weather.hourly[i].temp)
      console.log(TempRange)
      }
      TempRange.sort(function(a, b){return a - b});
      console.log(TempRange)
      TempRangeMax = TempRange[TempRange.length-1]
      TempRangeMin = TempRange[TempRange.length-TempRange.length]
      console.log("Max Temp today: "+TempRangeMax)
      console.log("Min Temp today: "+TempRangeMin)

    
const ctx = document.getElementById("TempChart").getContext("2d")
let Gradient = ctx.createLinearGradient(0,0,0, 220)
Chart.defaults.font.size = 20;
Chart.defaults.color = "#ffffff";


switch (true) {
  case (TempRangeMax <= 3):
      Gradient.addColorStop(0, "rgba(131,238,255,0.9)")
      Gradient.addColorStop(0.9, "rgba(131,238,255,0.8)")
      Gradient.addColorStop(1, "rgba(255,255,255,0.7)")
        break;
    case (TempRangeMax <= 10):
      Gradient.addColorStop(0, "rgba(255,255,51,0.9)")
      Gradient.addColorStop(0.7, "rgba(255,255,51,0.8)")
      Gradient.addColorStop(1, "rgba(131,238,255,0.7)")
        break;
    case (TempRangeMax <= 16):
      Gradient.addColorStop(0, "rgba(253, 147, 8,0.9)")
      Gradient.addColorStop(0.6, "rgba(255,255,51,0.8)")
      Gradient.addColorStop(1, "rgba(255,255,51,0.7)")
        break;
    case (TempRangeMax <= 32):
      Gradient.addColorStop(0, "rgba(252, 87, 94,0.9)")
      Gradient.addColorStop(0.7, "rgba(247, 180, 44,0.8)")
      Gradient.addColorStop(1, "rgba(253, 147, 8,0.7)")
        break;
        case (TempRangeMax <= 60):
          Gradient.addColorStop(0, "rgba(252, 87, 94,0.9)")
          Gradient.addColorStop(0.5, "rgba(252, 87, 94,0.8)")
          Gradient.addColorStop(1, "rgba(228,0,120,0.7)")
          break;
    default:
      Gradient.addColorStop(0, "rgba(253, 147, 8,0.9)")
      Gradient.addColorStop(0.6, "rgba(255,255,51,0.8)")
      Gradient.addColorStop(1, "rgba(255,255,51,0.7)")
        break;
}







const Temps = {
    labels,
    datasets: [{
        data: [Weather.hourly[0].temp,Weather.hourly[2].temp,Weather.hourly[4].temp,Weather.hourly[6].temp,Weather.hourly[8].temp,Weather.hourly[10].temp,Weather.hourly[12].temp,Weather.hourly[14].temp]
        
    }]
}


const chart = new Chart(ctx, {
  type: 'line',
  data: Temps,
  options: {
    responsive:false,
    lineTension: 0.4,
    fill: true,
    backgroundColor: Gradient,
    plugins: {
      legend: {
        display: false
      }
    },
      scales: {
        x: {
          grid: {
            display:false
          }
        },
          y: {
            beginAtZero: true,
            grid: {
              display:false
            },
              ticks: {
                  callback: function(value, index, ticks) {
                      return  value + ' °C';
                  }
              }
          }
      }
  }
});

for (let i = 0; i < 6; i++) {
document.getElementById("Day"+i).setAttribute("href", "#"+Weather.daily[i].weather[0].main);
console.log(Weather.daily[i].weather[0].main)
}



  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getWeatherData();
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}



