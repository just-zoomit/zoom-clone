import axios from 'axios';

export const handleError = (error) => {
  if (error.response) {
    // handle specific error codes
    switch (error.response.status) {
      case 401:
        // handle unauthorized
        console.log("Unauthorized");
        break;
      case 404:
        console.log("Not Found");
        // handle not found
        break;
      default:
        console.log("Error");
        // handle general error
    }
  } else {
    console.log("Network Error");
    // handle network error
  }
}