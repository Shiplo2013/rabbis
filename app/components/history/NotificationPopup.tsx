import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import { gsap, useGSAP } from "@/app/ui/plugins";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
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

  return (
    <div
      id="notification-popup"
      className="notification-popup bg-[#5A7C4E] fixed top-0 left-0 w-full h-full z-999 py-[7vh] px-[8vw] lg:px-[5vw] flex items-center justify-center opacity-0 invisible"
    >
      <div
        onClick={() => setOpenNotificationPopup(false)}
        className="close-notification w-12 h-12 p-3.5 lg:p-0 lg:w-15 lg:h-15 border border-white rounded-full flex items-center justify-center absolute top-5 right-5 cursor-pointer z-50"
      >
        <CloseIcon2 />
      </div>
      <div className="popup-wrapper flex items-center justify-center h-full w-full max-w-300 gap-x-[4vw] gap-y-[4vw] flex-col-reverse lg:flex-row overflow-auto">
        <div className="notification-content w-full lg:w-[55%]  bg-[#5A7C4E] text-[#F8F8F8] text-[20px] leading-[150%] flex flex-col items-start justify-start gap-y-[2.5vh] pl-[2vw]">
          {parse(notificationData?.content ? notificationData?.content : "")}
        </div>
        <div className="divider w-full h-px lg:w-px lg:h-[80%] bg-white opacity-50"></div>
        <div className="notification-heading w-full lg:w-[45%]">
          <h3 className="text-[35px] sm:text-[50px] lg:text-[70px] leading-[0.8em] lg:leading-[70%] text-black">
            {parse(notificationData?.title ? notificationData?.title : "")}
          </h3>
        </div>
      </div>
    </div>
  );
}
