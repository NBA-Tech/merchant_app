import AsyncStorage from "@react-native-async-storage/async-storage";
export const FormatDate = (date) => {
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