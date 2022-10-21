import { RegEX } from "../constants/AppContants"

export const validator=(email:string,password:string,name:string)=>{
    
    if(email)
        {
            const test = RegEX.EMAIL_REGEX.test(email)
           if(!test)
              return({val:false,msg:"Enter A Valid Email"})  
        }
    else if(password)
        {
            const test = RegEX.PASS_REGEX.test(password)
           if(!test)
              return({val:false,msg:"Password should be strong and of 8 min char"})  
        }
    else if(name)
        {
            const test = name.length > 0
           if(!test)
              return({val:false,msg:"Name should not be Empty"})  
        }
        return {val:true,msg:""}      
}