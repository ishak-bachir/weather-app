import { useState } from "react";
function App() {
  const [finalCity,setFinalCity] = useState("Enter city");
  const [finalTemp,setFinalTemp] = useState();
  const [Humidity,setFinalHumidity] = useState();
  const [finaldis,setFinaldic] = useState();
  const [emoji,settEmoji] = useState();
  const emmoji = document.querySelector(".emojiDisplay");
  var api = "5ec61eff2ed83212f353d21ea2ff9d13";
  let city;
  async function getCityName(event) {
    event.preventDefault();
    document.querySelector(".card").style.display = "flex";
    city = document.getElementById("input").value;
    if(city == ""){
      throw new Error("you didn't enter anything");
    }
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
    try{
      var response = await fetch(apiUrl);
      if(response.ok != false){
        var data = await response.json();
        console.log(data)
        var name = data.name;
        setFinalCity(name);
        var temp = data.main.temp;
        setFinalTemp(`${(temp - 273.15).toFixed(1)}°C`)
        var humidity = data.main.humidity;
        setFinalHumidity(`Humidity : ${humidity}%`)      
        var dis = data.weather.description;
        setFinaldic(dis)
        var weatherId = data.weather[0].id;
        function setEmoji(id){
          switch(true){
            case(weatherId >=200 && weatherId<300):
             return "🌧";
            case(weatherId >=300 && weatherId<400):
             return "🌧";
            case(weatherId >=500 && weatherId<600):
             return "🌧";
            case(weatherId >=600 && weatherId<700):
             return "❄";
            case(weatherId >=700 && weatherId<800):
             return "🌫";
            case(weatherId==800):
             return "🌞";
            case(weatherId>=801 && weatherId<810):
             return "☁";
            default:
                return "❓";
      }
      }
      var emoji = setEmoji(weatherId);
      settEmoji(emoji);
      if(emoji == "☁"){
        emmoji.style.color = 'white';
      }
      }
      else{
        settEmoji("❓");
        setFinalCity("")
        setFinalHumidity("")
        setFinalTemp("")
        setFinaldic("")
      }
    }
    catch(error){
      console.error(error);
    }
}
  return (
    <>
      <form onSubmit={getCityName}>
        <input id="input" type="text" placeholder="Enter city name"></input>
        <button type="submit">Get Weather</button>
      </form>
      <div className="card">
          <h1 className="cityDisplay">{finalCity}</h1>
          <p className="tempDisplay">{finalTemp}</p>
          <p className="humidityDisplay">{Humidity}</p>
          <p className="disDisplay">{finaldis}</p>
          <p className="emojiDisplay">{emoji}</p>
          <p className="displayError"></p>
         </div>
    </>
  );
}
export default App;