/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=a71a92ef075740c3172ffe8d10859096&units=metric';


  // Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e){
    let newZip =  document.getElementById('zip').value; 
    
    getWeatherData(baseURL,newZip,apiKey)
   
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL,zip,apiKey)=>{
    let feelings = document.getElementById('feelings').value; 
    const res = await fetch(baseURL+zip+apiKey)
    if(res.status==200){
       try {
        const data = await res.json()
        .then(function(data){
            // Add data
         console.log(data);
         postData('/addData', {date:newDate, temp: data.main.temp, content:feelings} )
         updateUI();})
       
      }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      }}
      else{
          alert('Enter the correct zipcode!!')
      }
   
}
/* Function to POST data */
const postData = async ( url ='', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }

}


/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = `${allData.temp} °C`;
      document.getElementById('content').innerHTML = allData.content;

  
    }catch(error){
      console.log("error", error);
    }
  }