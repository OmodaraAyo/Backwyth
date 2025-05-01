import { ClipLoader } from "react-spinners";
export const ButtonLoader = ()=> {
    return(
        <div className="mt-2">
            <ClipLoader
                color="#fff"
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  
        </div>
    )
}