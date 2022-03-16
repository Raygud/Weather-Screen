let GraphTemp = document.getElementById("GraphTemp")
let Switch = true
let Time = new Date();
let TimeWrite = document.querySelectorAll("#TimeLine li")
let Hour = Time.setHours(Time.getHours());
let a = 1
let q = 0
x = 3
let TempRange =[]  

var date1 = new Date();
     

for (let i = 0; i < 300; i++) {
  TempRange.push(300-i)
  }

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
        console.log("0"+date1.getHours()+":"+date1.getMinutes())
        labels.push("0"+date1.getHours()+":"+date1.getMinutes())
     }
     else{
        console.log(date1.getHours()+":"+date1.getMinutes())
        labels.push(date1.getHours()+":00")
     }
     
    q = q + 2
    }
    
const ctx = document.getElementById("TempChart").getContext("2d")

const Temps = {
    labels,
    datasets: [{
        data: [Weather.hourly[0].temp,Weather.hourly[2].temp,Weather.hourly[4].temp,Weather.hourly[6].temp,Weather.hourly[8].temp,Weather.hourly[10].temp,Weather.hourly[12].temp,Weather.hourly[14].temp,]
    }]
}

const config ={
    type: "line",
    data: Temps,
    options:{
        responsive:true,
        lineTension: 0.4
    },
}

const myChart = new Chart(ctx, config)



  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getWeatherData();
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}



