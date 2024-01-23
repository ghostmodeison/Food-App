import { useEffect, useState } from "react";

function useOnlineStatus(){
    const[isOnline, setIsOnline] = useState(true);
    useEffect(()=>{
        status();
    },[]);
    
    const status = async()=>{
        window.addEventListener("offline",()=>{
            setIsOnline(false);
        });
        window.addEventListener("online",()=>{
            setIsOnline(true);
        });
    }
    return isOnline;
}
export default useOnlineStatus;