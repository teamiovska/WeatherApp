
const weatherData = {
	'tempUnit': '℃',
	'windSpeedUnit': 'm/s',
	'rainUnit': '%',
	'days': [
		{ 'day': 'Wen 10', 'temp': 8,  'windDirection': 'south-east', 'windSpeed': 0.5  , 'type':'rainy' , 'percentRain': 54 },
		{ 'day': 'Thu 11', 'temp': 10, 'windDirection': 'north-west', 'windSpeed': 1.38 , 'type':'cloudy', 'percentRain': 49 },
		{ 'day': 'Fri 12', 'temp': 14, 'windDirection': 'south-east', 'windSpeed': 1.38 , 'type':'cloudy', 'percentRain': 56 },
		{ 'day': 'Sat 13', 'temp': 17, 'windDirection': 'south-west', 'windSpeed': 1.6  , 'type':'sunny' , 'percentRain': 2 },
		{ 'day': 'Sun 14', 'temp': 10, 'windDirection': 'north-east', 'windSpeed': 1.6  , 'type':'cloudy', 'percentRain': 58 },
		{ 'day': 'Mon 15', 'temp': 15, 'windDirection': 'south-west', 'windSpeed': 2.7  , 'type':'rainy' , 'percentRain': 64 },
		{ 'day': 'Tue 16', 'temp': 12, 'windDirection': 'north-west', 'windSpeed': 3.6  , 'type':'rainy' , 'percentRain': 65 },
	]
}

let days = weatherData.days;

window.addEventListener('load', function () {
let items = document.getElementById('weather_menu');

  for (let day in weatherData.days){
  	items.innerHTML += 
  	`
  		<div class="item" onclick="detailsItem(${day})">
			<h1>${days[day].temp} ${weatherData.tempUnit}</h1>
			<p>${days[day].day}</p>
		</div>
  	`;
  }

detailsItem();
  
}, false);

function detailsItem(id=0){
	let details = document.querySelector('#details');
	let date = document.querySelector('.date');
	let items = document.querySelectorAll('.item');
	removeClass(items);
	items[id].classList.add('item_active');

	date.innerHTML = days[id].day;

	details.innerHTML = 
	`
		<div class="details_item">
			<h1 id="celsius" onclick="convertDegrees()" data-temp="${days[id].temp}" data-unit="${weatherData.tempUnit}">
				${days[id].temp} ${weatherData.tempUnit}
			</h1>
			<p>${days[id].type}</p>
		</div>
		<div class="details_item">
			<span>Rain</span> 
			<p> ${days[id].percentRain} ${weatherData.rainUnit} </p>
		</div>
		<div class="details_item">
			<span>Wind</span> 
			<p id="metric" onclick="convertMetric()" data-speed="${days[id].windSpeed}" data-unit="${weatherData.windSpeedUnit}"> 
				${days[id].windSpeed} ${weatherData.windSpeedUnit}
			</p>
		</div>
		<div class="details_item">
			<span>Direction</span> 
			<p> ${days[id].windDirection}</p>
			
		</div>
	`
}

function removeClass(items){
	items.forEach(function(val,index) { 
   		val.classList.remove('item_active');
	})  
}

function convertDegrees(){
	const degreeValue = 273.15;
	let celsius = document.querySelector('#celsius');
	let unit = '';
	let temp = 0;

	if (celsius.dataset.unit === weatherData.tempUnit){
		temp = +celsius.dataset.temp + degreeValue;
		unit = 'K';
	} else {
		temp = +celsius.dataset.temp - degreeValue;
		unit = weatherData.tempUnit;
	}

	celsius.innerHTML = `${temp} ${unit}`;
	celsius.dataset.unit = unit;
	celsius.dataset.temp = temp;
}

function convertMetric(){
	const metricValue = 3.6;
	let metric = document.querySelector('#metric');
	let unit = '';
	let speed = 0;

	if (metric.dataset.unit === weatherData.windSpeedUnit){
		speed = +metric.dataset.speed * metricValue;
		unit = 'km/h';
	} else {
		speed = +metric.dataset.speed / metricValue;
		unit = weatherData.windSpeedUnit;
	}

	metric.innerHTML = `${Math.round(speed)} ${unit}`;
	metric.dataset.unit = unit;
	metric.dataset.speed = speed;


}