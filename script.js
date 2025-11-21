// --- IMAGE CAROUSEL ---
const images = document.querySelectorAll('.carousel img');
let index = 0;

function showImage(i) {
  images.forEach(img => img.classList.remove('active'));
  images[i].classList.add('active');
}

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  showImage(index);
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

// Auto-slide every 3 seconds
setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 30000);


// --- WEATHER API ---
const apiKey = "3dba7cfcf5c83e448e347a44d8654cd9"; // Your API key

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  const result = document.getElementById('weatherResult');
  
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  result.innerHTML = "⏳ Fetching weather data...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("API Response Data:", data);

      if (data.cod != 200) {
        result.innerHTML = "❌ City not found or invalid API key!";
      } else {
        result.innerHTML = `
          🌍 <strong>${data.name}</strong><br>
          🌡️ Temperature: ${data.main.temp} °C<br>
          ☁️ Condition: ${data.weather[0].description}<br>
          💧 Humidity: ${data.main.humidity}%<br>
          🌬️ Wind: ${data.wind.speed} m/s
        `;
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      result.innerHTML = "⚠️ Error fetching weather data. Check console for details.";
    });
});
