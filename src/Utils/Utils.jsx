import { ClipLoader } from "react-spinners";
export const ButtonLoader = ( { size } )=> {
    return(
        <div>
            <ClipLoader
                color="#fff"
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />  
        </div>
    )
}