import Image from "next/image";
import HomeNavbar from "./components/HomeNavbar";
import main from './icons/main.gif'
import Brain from "./icons/Brain";
import HomeFooter from "./components/HomeFooter";

export default function Home() {

  return (
    <div className="flex flex-col justify-between bg-purple-300 h-screen w-screen overflow-auto text-black">
      <div>
        <HomeNavbar />
        <div className="flex flex-wrap-reverse sm:justify-evenly justify-center items-center mt-16 px-5 gap-14">
          <div className=" flex flex-col gap-6">
            <div className="sm:text-3xl text-2xl font-mono sm:p-5 p-2 font-medium flex gap-2">
              <Brain size="size-10"/>
              The One and Only place to store your go to links😀
            </div>
            <div className="sm:text-3xl text-2xl font-mono sm:p-5 p-2 font-medium flex gap-2">
               <Brain size="size-10"/>
              Add Tweets/Youtube Links to visit later.✅
            </div>
            <div className="sm:text-3xl text-2xl font-mono sm:p-5 p-2 font-medium flex gap-2">
               <Brain size="size-10"/>
              Share your brain with others with just a click.😮
            </div>
            <div className="sm:text-3xl text-2xl font-mono sm:p-5 p-2 font-medium flex gap-2">
               <Brain size="size-10"/>
              Sign Up with ease as we don't like paperwork either.😉
            </div>
          </div>
          <div className="p-10">
            <Image className="w-96" src={main} alt='home image' />
          </div>
        </div>
      </div>
        <HomeFooter/>
    </div>
  );
}