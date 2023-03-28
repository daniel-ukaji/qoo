import { useState } from "react";
import { useRouter } from "next/router";
import Icon from "../pages/images/Icon.png"
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../utils/hooks/useAuth";
import { useApi } from "../utils/hooks/useApi";
import { verifyuser } from "../utils/api/user/verifyUser";


export default function FormPage() {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");

    const user = useAuth();

    const userProfile = user.user.userId;

    const CreateVerify = useApi(verifyuser)

    const verifyData = {
        userId: userProfile,
        userIdType: router.query.option,
        reference: "uiyuiyuiyui8980",
        userIdNumber: text,
      }
  
      const handleSubmit = async (event) => {
      event.preventDefault();
      console.log({
        option: router.query.option,
        image,
        text,
      });

      const response = await CreateVerify.request(verifyData);

      console.log(response)



    };
  
    const handleImageChange = (event) => {
      setImage(URL.createObjectURL(event.target.files[0]));
    };
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <Link href="/" className="">
            <div>
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>
        </Link>
      
        <div className='border max-w-lg flex flex-col items-center'>
                <div className='flex flex-col items-center mt-16 mb-16'>
                    <Image src={Icon}/>
                    <h1 className='font-bold mt-5 text-xl'>Drag your photos here</h1>
                    <p className='mt-1 text-gray-500'>Add atleast 5 images</p>
                    <div className="mt-3 flex flex-col items-center justify-center">
                        <label htmlFor="imageInput"  className="">Upload from your device</label>
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                        {image && <img src={image} alt="Selected Image" />}
                    </div>
                </div>
                    
        </div>

        <div>
                    <label htmlFor="text mt-3 ">ID Number</label>
                    <input 
                    className="rounded-lg px-4 py-3 ml-3 outline-none h-12 border border-gray-200 w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;" 
                    type="text" 
                    id="text"
                    name="text" 
                    value={text}
                    onChange={handleTextChange} />
                </div>

        <div className="flex space-x-2">
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200`}
            disabled={!handleSubmit}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        
        
      </div>

    </Layout>
  );
}
