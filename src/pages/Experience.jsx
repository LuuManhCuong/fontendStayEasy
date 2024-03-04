import React, { useState } from "react";
import CommonHeader from "../components/header/CommonHeader";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Experience() {
  const slides = [
    {url:'https://a0.muscache.com/im/pictures/e35bb307-05f4-48a4-bdc5-3b2198bb9451.jpg', title: 'Most popular around the world', redirect:'/'},
    {url:'https://a0.muscache.com/im/pictures/2fe40f4f-5ea3-432f-9fbd-e2ce3c6c3855.jpg', title: 'Easy for itinerary planning', redirect:'/'},
    {url:'https://a0.muscache.com/im/pictures/58819d01-2a71-441d-b3bc-baae0cd64da1.jpg', title: 'Great for team building', redirect:'/'},
    {url:'https://a0.muscache.com/im/pictures/bcbd20bb-1654-4ea2-a86c-2cf25666f3b6.jpg', title: 'Fun for the family', redirect:'/'}
  ];

  const navCat = [
    {title: 'Great for groups', redirect:'/'},
    {title: 'Family friendly', redirect:'/'},
    {title: 'Animals', redirect:'/'},
    {title: 'Arts & writing', redirect:'/'},
    {title: 'Baking', redirect:'/'},
    {title: 'Cooking', redirect:'/'},
    {title: 'Dance', redirect:'/'},
    {title: 'Drinks', redirect:'/'},
    {title: 'Entertainment', redirect:'/'},
    {title: 'Fitness', redirect:'/'},
    {title: 'History & culture', redirect:'/'},
    {title: 'Magic', redirect:'/'},
    {title: 'Music', redirect:'/'},
    {title: 'Social impact', redirect:'/'},
    {title: 'Wellness', redirect:'/'},
    {title: 'Olympians & Paralympians', redirect:'/'},
    {title: 'Designed for accessibility', redirect:'/'},
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= slides.length - 2;
  const isAtStartNav = currentNavIndex === 0;
  const isAtEndNav = currentNavIndex === 2;
  const itemsPerPage = 3;
  const totalItems = slides.length;
  const itemsToMove = 1; // Số lượng ảnh sẽ di chuyển mỗi lần click

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - itemsToMove, 0));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + itemsToMove, totalItems - itemsPerPage + 1));
  };

  const goToPreviousNav = () => {
    setCurrentNavIndex(prevIndex => Math.max(prevIndex - itemsToMove, 0));
  };

  const goToNextNav = () => {
    setCurrentNavIndex(prevIndex => Math.min(prevIndex + itemsToMove, totalItems - itemsPerPage + 1));
  };


  return (
    <>
      <CommonHeader padding="32"/>
        <div className="mt-[10.6rem] pb-10">
          <div className="flex justify-between items-center px-32">
            <h1 className="text-[3.2rem] font-bold">New this week</h1>
            {/* Nút điều hướng */}
            <div className="flex items-center justify-center gap-2 mr-5 mt-2">
              <button onClick={goToPrevious} className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={isAtStart}>
              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
              </button>
              <button onClick={goToNext} className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={isAtEnd}>
              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              </button>
            </div>
          </div>
          {/* code slide */}
          <div className={isAtStart?"overflow-hidden mt-12 pl-32 ":isAtEnd?"overflow-hidden mt-12 pr-32":"overflow-hidden mt-12"}>
            <div className="flex gap-4 transition-transform duration-700 ease-in-out" style={{ width: `${100 * (totalItems / itemsPerPage)}%`, transform: `translateX(-${(100 / totalItems) * currentIndex}%)` }}>
              {slides.map((slide, index) => (
                <div className="w-full" >
                  <img key={index} src={slide.url} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-3xl " />
                  <div className="relative w-[59.18rem]">
                    <p className="absolute text-white text-[1.3rem] bottom-[28rem] left-9">Collection</p>
                    <h1 className="absolute text-start w-[26rem] text-white text-[2.7rem] -top-[29rem] left-9">{slide.title}</h1>
                    <button className="absolute text-black text-[1.4rem] font-medium bottom-10 left-9 bg-white py-[0.7rem] px-4 rounded-xl hover:bg-black">Show all</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* navbar */}
          <div className="py-8 mb-7 px-32">
            <div className="flex">
              <div className="flex gap-2 pr-6 border-r-2" style={{ maxWidth: 'fit-content', whiteSpace: 'nowrap' }}>
                <button className="text-2xl py-2 px-3 border border-black rounded-full">Dates</button>
                <button className="text-2xl py-2 px-3 border border-black rounded-full">Group size</button>
                <button className="text-2xl py-2 px-3 border border-black rounded-full">More filters</button>
              </div>
              <div className="flex overflow-hidden pl-6">
                <button onClick={goToPreviousNav} className={`flex items-center justify-center px-3 border border-black rounded-full text-black cursor-pointer ${isAtStartNav ? 'hidden' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <div className="overflow-hidden">
                  <div className="flex gap-4 transition-transform duration-700 ease-in-out" style={{maxWidth: 'fit-content', whiteSpace: 'nowrap', width: `${100 * (totalItems / itemsPerPage)}%`, transform: `translateX(-${(155 / totalItems) * currentNavIndex}%)` }}>
                    {navCat.map((item, index) => (
                        <button className="text-2xl text-black py-2 px-4 bg-[#f2f2f2] rounded-full">{item.title}</button>
                    ))}
                  </div>
                </div>
                <button onClick={goToNextNav} className={`flex items-center justify-center px-3 border border-black rounded-full text-black cursor-pointer ${isAtEndNav ? ' hidden' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="py-8 px-32">
            <div className="flex justify-between">
              <h2 className="text-4xl">Plan a trip with help from local Hosts around the world</h2>
              <div className="flex gap-3">
                <button className="underline font-medium">Show (9)</button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
            <div className="py-8">
              <CardListVertical />
            </div>
          </div>
          <div className="py-8 px-32">
            <div className="flex justify-between">
              <h2 className="text-4xl">Best sellers</h2>
              <div className="flex gap-3">
                <button className="underline font-medium">Show (9)</button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
            <div className="py-8">
              <CardListVertical />
            </div>
          </div>
          <div className="py-8 px-32">
            <div className="flex justify-between">
              <h2 className="text-4xl">Starting in the next 6 hours</h2>
              <div className="flex gap-3">
                <button className="underline font-medium">Show (9)</button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
            <div className="py-8">
              <CardListHorizontal />
            </div>
          </div>
          <div className="py-8 px-32">
            <div className="flex justify-between">
              <h2 className="text-4xl">Great for groups</h2>
              <div className="flex gap-3">
                <button className="underline font-medium">Show (9)</button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
            <div className="py-8">
              <CardListVertical />
            </div>
          </div>
          <div className="py-8 px-32">
            <div className="flex justify-between">
              <h2 className="text-4xl">Make plans this weekend</h2>
              <div className="flex gap-3">
                <button className="underline font-medium">Show (9)</button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <button onClick="" className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-black rounded-full text-black cursor-pointer ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </button>
              </div>
            </div>
            <div className="py-8">
              <CardListVertical />
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

const CardVertical = ({ imageUrl, text }) => {
  return (
    <div className="w-[15.7%]">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="relative">
          <img className="w-full" src={imageUrl} alt="Card Image"/>
          <button className="absolute top-5 right-10">
            <FontAwesomeIcon
              className="like-icon"
              icon={icon({ name: "heart", family: "classic", style: "solid" })}
            />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="block h-4 w-4 mb-3 text-current"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
            <p className="text-xl">4.91<span className="text-gray-500">(322) · </span></p>
            <p className="text-gray-500 text-xl"> India</p>
          </div>
          <div className="">
            <p className="">{text}</p>
          </div>
          <div className="">
            <p className=""><span className="font-medium">From $46</span> / person</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const CardListVertical = () => {
  const cards = [
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
  ];
  
  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card, index) => (
        <CardVertical key={index} imageUrl={card.imageUrl} text={card.text} />
        ))}
    </div>
  );
};

const CardHorizontal = ({ imageUrl, text }) => {
  return (
    <div className="w-[32.5%]">
      <div className="bg-white rounded-3xl border border-black overflow-hidden">
        <div className="flex justify-between p-4">
          <img className="w-[28%] rounded-2xl mr-8" src={imageUrl} alt="Card Image"/>
          <div className="w-[70%] flex flex-col justify-start">
            <div className="flex justify-end">
              <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="text-transparent h-9 w-9 stroke-[var(--f-k-smk-x)] stroke-[2.4px] overflow-visible"><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg></button>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="block h-4 w-4 mb-3 text-current"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
              <p className="text-xl">4.91<span className="text-gray-500">(322) · </span></p>
              <p className="text-gray-500 text-xl"> India</p>
            </div>
            <p className="text-gray-800 text-2xl">Walk in to the Taj Mahal with a professional Tour Guide</p>
            <p><span className="font-medium text-2xl">From $15 </span>/ person</p>
            <div className=" flex gap-3">
              <button className="border border-black py-[0.5rem] px-3 rounded-xl text-xl font-medium">3:30 PM</button>
              <button className="border border-black py-[0.5rem] px-3 rounded-xl text-xl font-medium">4:30 PM</button>
              <button className="border border-black py-[0.5rem] px-3 rounded-xl text-xl font-medium">5:30 PM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardListHorizontal = () => {
  const cards = [
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
    { imageUrl: "https://a0.muscache.com/im/pictures/lombard/MtTemplate-1670646-media_library/original/4bca84f9-2a4b-460c-bafc-c7523075f788.jpeg?im_w=720", text: "Plan the perfect Customised Japan Trip with Local Expert" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card, index) => (
        <CardHorizontal key={index} imageUrl={card.imageUrl} text={card.text} />
      ))}
    </div>
  );
};


export default Experience;