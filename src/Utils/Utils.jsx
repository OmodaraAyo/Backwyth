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