import AsyncStorage from "@react-native-async-storage/async-storage";
export const FormatDate = (prop_date) => {
    const date=new Date(prop_date)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = date.getFullYear();
    const day = date.getDate();
    return `${day}-${month[date.getMonth()]}-${year}`
}
export const getMerchantSession=async()=>{
    let merchant_session = await AsyncStorage.getItem('merchant_status_data')
    merchant_session = JSON.parse(merchant_session)
    return merchant_session

}

export function convertRupeesToPaise(rupees) {
    return String(parseFloat(rupees) * 100);
  }

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const fetchWithTimeout = async (url, options, timeout = 120000) => {
    try {
      const response = await Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject({
                success: false,
                error: 'Request timeout',
                status: 408, // HTTP Status Code for Request Timeout
              }),
            timeout
          )
        ),
      ]);
  
      // If fetch resolves successfully, return the Response object
      return response;
    } catch (error) {
      // Return a fake Response-like object with a json() method for timeouts or errors
      return {
        json: async () => ({
          success: false,
          obj: 'API timeout please try again later !',
          status:408 , // Default to 500 for unexpected errors
        }),
      };
    }
  };

  export function formatDateWithAmPm(dateString) {
    const date = new Date(dateString);
  
    if (isNaN(date)) {
      return "Invalid date";
    }
  
    // Use UTC methods to ensure the time is correctly parsed in UTC
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC', // Ensure UTC time zone is used
    };
  
    return date.toLocaleString('en-US', options);
  }
  