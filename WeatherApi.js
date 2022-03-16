let GraphTemp = document.getElementById("GraphTemp")
let Switch = true
let Time = new Date();
let TimeWrite = document.querySelectorAll("#TimeLine li")
let Hour = Time.getHours()
let a = 1
let q = 0
x = 3
let TempRange =[]  

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
    const data = await response.json();
    for (let i = 0; i < 8; i++) {
     document.getElementById("Temp"+i).innerHTML = Math.round(data.hourly[q].temp)+"°C"
     document.getElementById("Temp"+i).style.top = TempRange[Math.round(data.hourly[q].temp)*8]-55+"px"

    q = q + 2
    }

    let TL = 500
    for (let i = -200; i < 0; i++) {
      TempRange[i] = TL--
    }



      console.log("Hello: " + TempRange[Math.round(data.hourly[0].temp)*9] + " " + TempRange[Math.round(data.hourly[2].temp)*9] + " " + TempRange[Math.round(data.hourly[4].temp)*9])

    
    GraphTemp.setAttribute("d","M0,300 L0,"+TempRange[Math.round(data.hourly[0].temp)*9]+" L467.5,"+TempRange[Math.round(data.hourly[2].temp)*9]+"L935,"+TempRange[Math.round(data.hourly[4].temp)*9]+" L1402,"+TempRange[Math.round(data.hourly[6].temp)*9]+" L1870,"+TempRange[Math.round(data.hourly[8].temp)*9]+" L2337.5,"+TempRange[Math.round(data.hourly[10].temp)*9]+" L2805,"+TempRange[Math.round(data.hourly[12].temp)*9]+" L3272.5,"+TempRange[Math.round(data.hourly[14].temp)*9]+" L3740,"+TempRange[Math.round(data.hourly[16].temp)*9]+" L3740,300 z") 

  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getWeatherData();
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}

