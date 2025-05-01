import { ClipLoader } from "react-spinners";
export const ButtonLoader = ()=> {
    return(
        <div>
            <ClipLoader
                color="#fff"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  
        </div>
    )
}