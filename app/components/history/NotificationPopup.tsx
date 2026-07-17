import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import { gsap, useGSAP } from "@/app/ui/plugins";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function NotificationPopup() {
  const pathname = usePathname();
  const { openNotificationPopup, setOpenNotificationPopup, notificationData } =
    useAppState();
  useGSAP(() => {
    const popup = document.getElementById("notification-popup");

    if (popup) {
      gsap.set(popup, { autoAlpha: 0 });

      const showPopup = () => {
        const show = gsap.to(popup, {
          autoAlpha: 1,
          duration: 0.2,
          delay: 0,
        });
      };

      const hidePopup = () => {
        const hide = gsap.to(popup, {
          autoAlpha: 0,
          duration: 0.2,
          delay: 0,
        });
      };
      openNotificationPopup ? showPopup() : hidePopup();
    }
  }, [openNotificationPopup]);

  useEffect(() => {
    console.log("Notification Data:", notificationData);
  }, [notificationData]);

  return (
    <div
      id="notification-popup"
      className="notification-popup bg-[#5A7C4E] fixed top-0 left-0 w-full h-full z-999 py-[5vh] px-[5vw] flex items-center justify-center opacity-0 invisible"
    >
      <div
        onClick={() => setOpenNotificationPopup(false)}
        className="close-notification w-15 h-15 border border-white rounded-full flex items-center justify-center absolute top-5 right-5 cursor-pointer z-50"
      >
        <CloseIcon2 />
      </div>
      <div className="popup-wrapper flex items-center justify-center h-full w-full max-w-250 gap-x-[4vw]">
        <div className="notification-content w-[60%]  bg-[#5A7C4E] text-[#F8F8F8] text-[20px] leading-[150%] flex flex-col items-start justify-start gap-y-[2.5vh] pl-[2vw]">
          {parse(notificationData?.content ? notificationData?.content : "")}
        </div>
        <div className="divider w-px h-[80%] bg-white opacity-50"></div>
        <div className="notification-heading w-[40%]">
          <h3 className="text-[70px] leading-[70%] text-black">
            {parse(notificationData?.title ? notificationData?.title : "")}
          </h3>
        </div>
      </div>
    </div>
  );
}
