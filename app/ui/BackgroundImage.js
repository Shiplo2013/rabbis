import Image from "next/image";
export default function BackgroundImage(props) {
  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black z-10`}>
        <Image
          className="w-full object-cover object-center h-full"
          src={props?.bgImage?.src}
          width="1920"
          height="1080"
          blurDataURL={props?.bgImage?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
      </div>
  )
}
