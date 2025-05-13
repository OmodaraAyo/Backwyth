import { ClipLoader } from "react-spinners";
export const ButtonLoader = ()=> {
    return(
        <div>
            <ClipLoader
                color="#fff"
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  
        </div>
    )
}

export const PageLoader = () => {
    return(
        <div className="flex justify-center h-full">
            <ClipLoader
                color="#fff"
                size={24}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  
        </div>
    )
}