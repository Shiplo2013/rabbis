import Image from "next/image";
import Border from "../assets/images/quote-border.png";

interface QuoteSectionProps {
  extraClass?: string;
  data: string;
}

export default function QuoteSection(props: QuoteSectionProps) {
  return (
    <div className={`content-quote py-12.5 px-10 relative ${props.extraClass}`}>
      <div className="border border-dashed border-[#C3A13F] absolute top-0 left-22 right-22 z-10"></div>
      <div className="border border-dashed border-[#C3A13F] absolute left-0 top-15 bottom-15 z-10"></div>
      <div className="quote-border w-27.5 h-20 absolute top-0 right-0 -mt-7 -mr-6 z-20">
        <Image
          className="w-full h-full object-cover object-center"
          src={Border.src}
          width={110}
          height={80}
          alt={`Border`}
          blurDataURL={Border.blurDataURL}
          placeholder="blur"
          loading="lazy"
        />
      </div>
      <div className="quote-border w-27.5 h-20 absolute top-0 left-0 -mt-7.5 -ml-6 z-20 rotate-y-180">
        <Image
          className="w-full h-full object-cover object-center"
          src={Border.src}
          width={110}
          height={80}
          alt={`Border`}
          blurDataURL={Border.blurDataURL}
          placeholder="blur"
          loading="lazy"
        />
      </div>
      <blockquote className="relative z-40">
        <h5 className="text-[#57717A] text-[71px] leading-[80%]">
          {props.data}
        </h5>
      </blockquote>
      <div className="quote-border w-27.5 h-20 absolute bottom-0 left-0 -mb-7.5 -ml-6 z-20 rotate-180">
        <Image
          className="w-full h-full object-cover object-center"
          src={Border.src}
          width={110}
          height={80}
          alt={`Border`}
          blurDataURL={Border.blurDataURL}
          placeholder="blur"
          loading="lazy"
        />
      </div>
      <div className="quote-border w-27.5 h-20 absolute bottom-0 right-0 -mb-7 -mr-6 z-20 rotate-x-180">
        <Image
          className="w-full h-full object-cover object-center"
          src={Border.src}
          width={110}
          height={80}
          alt={`Border`}
          blurDataURL={Border.blurDataURL}
          placeholder="blur"
          loading="lazy"
        />
      </div>
      <div className="border border-dashed border-[#C3A13F] absolute right-0 top-15 bottom-15 z-10"></div>
      <div className="border border-dashed border-[#C3A13F] absolute bottom-0 left-22 right-22 z-10"></div>
    </div>
  );
}
