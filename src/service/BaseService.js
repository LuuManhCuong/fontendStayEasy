export class BaseService {
    get = async (url) => {
        try {
          const response = await fetch(`http://localhost:8080/api/property${url}`, {
            method: 'GET',
          });
      
          
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const jsonData = await response.json();
          
      
          return jsonData;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
    }
}