import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserDataToStarage=async(user:Object)=>{
       try {
            const jsonVal = JSON.stringify(user)
            await AsyncStorage.setItem("@user",jsonVal);
       } catch (error) {
         console.log(error)
       } 
}
