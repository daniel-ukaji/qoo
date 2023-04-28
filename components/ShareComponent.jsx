import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { GlobalContext } from "../context/GlobalState";
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
import { AiFillFacebook, AiFillTwitterCircle, AiOutlineCopy } from "react-icons/ai";
import { RiDiscordFill, RiWhatsappFill } from "react-icons/ri";
import { BsMessenger, BsTelegram } from "react-icons/bs";
const ShareComponent = ({ onClick }) => {
  const { booking } = useContext(GlobalContext);

  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const title = "Check out this amazing property!";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative p-6 bg-white rounded-lg w-11/12 xl:w-1/3">
      <div className="text-center mb-5">
        <h1 className="text-xs xl:text-base font-bold text-secondary">Share this property</h1>
      </div>
      <button onClick={onClick} className="absolute mb-5 flex items-center justify-center bg-gray-100 rounded-full top-6 right-2 xl:right-6 w-7 h-7">
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <div className="">
        <main className="grid grid-cols-2 gap-2 xl:grid-cols-3 xl:gap-6 ">
            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <AiFillTwitterCircle className="w-10 h-10" round={true} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`, "_blank")} />
                <p className="text-sm xl:text-md">Twitter</p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <AiFillFacebook className="w-10 h-10" round={true} onClick={() => window.open(`https://www.facebook.com/sharer.php?u=${shareUrl}&quote=${title}`, "_blank")} />
                <p className="text-sm xl:text-md">Facebook</p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <RiDiscordFill className="w-10 h-10" round={true} onClick={() => window.open(`https://discord.com/api/oauth2/authorize?client_id=903798912721766401&redirect_uri=${shareUrl}&response_type=code&scope=identify%20guilds.join`, "_blank")} />
                <p className="text-sm xl:text-md">Discord</p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <RiWhatsappFill className="w-10 h-10" round={true} onClick={() => window.open(`https://wa.me/?text=${title} ${shareUrl}`, "_blank")} />
                <p className="text-sm xl:text-md">Whatsapp</p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <BsTelegram className="w-10 h-10" round={true} onClick={() => window.open(`https://telegram.me/share/url?url=${shareUrl}&text=${title}`, "_blank")} />
                <p className="text-sm xl:text-md">Telegram</p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <BsMessenger className="w-10 h-10" round={true} onClick={() => window.open(`fb-messenger://share?link=${shareUrl}&app_id=123456789`, "_blank")} />
                <p className="text-sm xl:text-md">Messenger</p>
            </div>
        </main>
        <div className="mt-5">
          <h1 className="text-sm xl:text-md">Campaign Link</h1>
          <div className="flex justify-between items-center w-full border bg-[#EAECF0] rounded-md p-2">
            <p className="w-1/2 xl:w-full text-xs xl:text-md" >{shareUrl}</p>
            {copied ? (
                  <span className="text-green-500 text-sm xl:text-md font-bold">Copied!</span>
                ) : (
                    <AiOutlineCopy onClick={handleCopy} className="w-6 h-6 cursor-pointer" />                
                )}
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;
