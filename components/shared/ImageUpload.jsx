'use client'
import { CldUploadWidget } from "next-cloudinary";


const ImageUpload = ({button,imagehandler}) => {
   
    function handleuplaod(info){
    imagehandler({url:info.secure_url,resource_type:info.resource_type});
    }
  return (
    <div>
        <CldUploadWidget onUpload={(result)=>{handleuplaod(result.info)}} uploadPreset='rfahuwwl'>
        
          {({ open }) => {
            const onClick = () => {
              open();
            };
          
            return (
              <button 
                type="button" 
                variant="secondary" 
                onClick={onClick}
              >
                {
                    button
                }
              </button>
            );
          }}
          
          </CldUploadWidget>
    </div>
  )
}

export default ImageUpload