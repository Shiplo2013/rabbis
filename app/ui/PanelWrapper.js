import { useEffect } from "react";

export default function PanelWrapper({children}) {
    useEffect(() => {
        console.log(children);
    }, []);
  return (
    <div id="panel-wrapper" className="w-screen h-screen">
        <div id="section-wrapper" className={`flex flex-nowrap flex-row-reverse w-[300vw] h-screen`}>
          {children}
        </div>
    </div>
  )
}
