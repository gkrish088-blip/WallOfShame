import { useEffect , useState } from "react";
import { getIdentity } from "../utils/identity.js";

const Navbar= ()=>{
    const [user,userSetter] = useState(null)

    useEffect(()=>{
        const identity = getIdentity()
        console.log(identity)
        userSetter(identity)
    }, [])

    return (
        <nav
        className="w-full flex items-center justify-between px-6 md:px-8 py-4 relative"
        style={{
            backgroundColor : 'rgba(20,10,4,0.85)',
            borderBottom : "1px solid rgba(200,169,126,0.2)"

        }} 
        >

        {/* expty space*/ }
        <div className="w-10"></div>

        {/*title */}
        <h1 
        className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl tracking-widest"
        style={{
            color : "#c8a97e",
            fontFamily : "Playfair Display , serif"

        }}
        >
            WallOfShame
        </h1>
        <div className="flex justify-center gap-3 ml-auto" >

        
            {user && (
                <>
                <span
                className="hidden text-sm sm:block"
                style={{
                    color :"#c8a97e",
                    fontFamily : "JetBrains Mono , monospace"
                }}
                >
                    {user.user_alias}
                
                </span>
                
                <img src={user.user_avatar} alt={`Avatar of ${user.user_alias}`}
                
                className="w-8 h-8 rounded-full md:w-9"
                style={{border :'2px solid  #c8a97e'}}
                
                />
               
            
                </>
            
            )}
        </div>

        </nav>
    )

}



export default Navbar