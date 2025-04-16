import axios from "axios";
const fetchHomeAPI = async () => {
    try {
      const response = await fetch('https://backend-k9x3.onrender.com/api/v1/home-page', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTAyODk4MDg5ZDBiMTAxYzYwMzJhYyIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoic2FsdmluQGV4YW1wbGUuY29tIiwicGhvbmVudW1iZXIiOiIwMTIzNDU2Nzg5IiwidHlwZSI6bnVsbCwiaXNOZXciOnRydWUsImlhdCI6MTcxMzE4NzI1MCwiZXhwIjoxNzEzMjczNjUwfQ.8r0WWvG3kbE772xfGR-QfqQy2WDBmVwiGoFqaDlP0fQ'
      }
    });
      jsonData = await response.json();
     return jsonData;
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

export default fetchHomeAPI;