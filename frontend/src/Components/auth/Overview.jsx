import {  useContext, } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import img1 from "../../assets/img1.avif";
import img2 from "../../assets/img3.webp";
import img3 from "../../assets/img4.webp";
import BikeSeatAdjustment from "../utility/BikeSeatAdjustmentChat";
import img4 from "../../assets/img5.webp";
import img5 from "../../assets/img3.webp";

const Overview = () => {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div className="bg-[#f9f9f9] h-full overflow-x-hidden">
     
      <div className="hero anim pt-[15rem] flex flex-col items-center justify-center text-black">
        <h1 className="text-2xl font-medium">Jarvis</h1>
        <div className="text-5xl text-center font-medium my-2">
          Get answers. Find inspiration. Be more productive.
        </div>
        <p className="mt-[1rem] text-center px-2">
          Free to use. Easy to try. Just ask and ChatGPT can help with writing,
          learning, brainstorming, and more.
        </p>
        <div className="start-now my-4">
          <Link
            to={isLoggedIn ? "/jarvis" : "/signin"}
            className="bg-[#080808] hover:opacity-70 duration-[400ms] flex items-center gap-2 rounded-3xl text-white px-3 py-2"
          >
            Start now{" "}
            <svg
              width="0.625rem"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9L9 1M9 1H2.5M9 1V7.22222"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="py-[10rem] flex flex-col gap-10 items-center">
        <div className="carousel flex flex-col gap-5">
          <div className="upper flex flex-row-reverse gap-5 overflow-hidden w-[80vw] text-black">
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Write a text asking a friend to be my plus-one at a wedding</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Test my knowledge on ancient civilizations</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>
                Write a message that goes with a kitten gif for a friend on a
                rough day
              </p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Help me study vocabulary for a college entrance exam</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Give me ideas for what to do with my kids&apos; art</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Write a text inviting my neighbors to a barbecue</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Tell me a fun fact about the Roman Empire</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Improve my essay writing ask me to outline my thoughts</p>
            </div>
          </div>
          <div className="middle flex flex-row-reverse gap-5 overflow-hidden w-[80vw] text-black">
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Help me pick an outfit that will look good on camera</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Write an email to request a quote from local plumbers</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Create a charter to start a film club</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>
                Write a Python script to automate sending daily email reports
              </p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>
                Create a personal webpage for me after asking me three questions
              </p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Create a morning routine to boost my productivity</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Plan a &apos;mental health day&apos; to help me relax</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Give me ideas about how to plan my New Years resolutions</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Help me pick an outfit that will look good on camera</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Write an email to request a quote from local plumbers</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Create a charter to start a film club</p>
            </div>
          </div>
          <div className="lower flex gap-5 overflow-hidden w-[80vw] text-black">
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>
                Suggest fun activities to help me make friends in a new city
              </p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Create a content calendar for a TikTok account</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Plan a trip to experience Seoul like a local</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Explain nostalgia to a kindergartener</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>
                Make up a story about Sharky, a tooth-brushing shark superhero
              </p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Design a programming game teach basics in a fun way</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Quiz me on world capitals to enhance my geography skills</p>
            </div>
            <div className="bg-[#ffffff] flex justify-center items-center p-5 rounded-lg min-w-[22rem]">
              <p>Make a sandwich using ingredients from my kitchen</p>
            </div>
          </div>
        </div>
        <div className="text-black flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center w-[40rem] font-medium">
            Writes, brainstorms, edits, and explores ideas with you
          </h1>
          <button className="flex mt-6 items-center justify-center hover:underline duration-300 transition-all">
            <p className="text-md duration-300 transition-all">
              Learn more about writing with ChatGPT
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-[-90deg] w-4 fill-current text-current"
              viewBox="0 0 14 8"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292892 0.292894C0.683416 -0.0976306 1.31658 -0.0976315 1.70711 0.292892L7.00002 5.58579L12.2929 0.292894C12.6834 -0.0976306 13.3166 -0.0976315 13.7071 0.292892C14.0976 0.683416 14.0976 1.31658 13.7071 1.70711L7.70713 7.70711C7.51959 7.89464 7.26524 8 7.00002 8C6.7348 8 6.48045 7.89464 6.29291 7.70711L0.292894 1.70711C-0.0976306 1.31658 -0.0976315 0.683419 0.292892 0.292894Z"
                className="fill-current"
              ></path>
            </svg>
          </button>
          <div className="w-3/4 rounded my-16 overflow-hidden">
            <img
              src="https://cdn.openai.com/ctf-cdn/01_edit_email_desktop_light.png"
              className="w-full h-full object-cover"
              alt="Edit Email"
              loading="lazy"
              width="1940"
              height={1212}
            />
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center w-[40rem] font-medium">
            Summarize meetings. Find new insights. Increase productivity.
          </h1>
          <div className="w-3/4 my-16 rounded overflow-hidden">
            <img
              alt="A conversation between a user and ChatGPT on an interface about summarizing meeting notes."
              loading="lazy"
              width="1940"
              height="1212"
              decoding="async"
              className="w-full h-auto"
              sizes="(min-width: 1728px) 1728px, 100vw"
              srcSet="
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=640&fm=webp 640w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=750&fm=webp 750w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=828&fm=webp 828w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=1080&fm=webp 1080w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=1200&fm=webp 1200w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=1920&fm=webp 1920w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=2048&fm=webp 2048w,
                    https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=3840&fm=webp 3840w
                "
              src="https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/668cbe2acdd27d36e8cbcd36538760a7/02_summarize_desktop_light.png?w=3840&fm=webp"
            />
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center w-[40rem] font-medium">
            Learn something new. Dive into a hobby. Answer complex questions.{" "}
          </h1>
          <div className="w-3/4 my-16 rounded overflow-hidden">
            <img
              alt="A conversation between a user and ChatGPT on an interface about gathering a list of things needed to start a herb garden."
              loading="lazy"
              width="1940"
              height="1212"
              decoding="async"
              className="w-full h-auto"
              sizes="(min-width: 1728px) 1728px, 100vw"
              srcSet="
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=640&fm=webp 640w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=750&fm=webp 750w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=828&fm=webp 828w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=1080&fm=webp 1080w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=1200&fm=webp 1200w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=1920&fm=webp 1920w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=2048&fm=webp 2048w,
                    https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=3840&fm=webp 3840w
                "
              src="https://images.ctfassets.net/kftzwdyauwt9/dj3TUYzcObBHupmeNKuoT/84827f81d82240279359525b3f988e50/04_learn_desktop_light.png?w=3840&fm=webp"
            />
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center w-[40rem] font-medium">
            Explore more features in ChatGPT
          </h1>
          <div className="w-3/4 my-16 flex items-center md:items-stretch lg:items-stretch md:flex-row lg:flex-row flex-col rounded-xl overflow-hidden">
            <div className="flex flex-col lg:gap-5 gap-6 w-3/4 lg:w-1/2 p-6 justify-center bg-white">
              <h1 className="font-semibold text-3xl">
                Type, talk, and use it your way
              </h1>
              <p>
                With ChatGPT, you can type or start a real-time voice
                conversation by tapping the soundwave icon in the mobile app.
              </p>
            </div>
            <div className="video w-3/4 lg:w-1/2 lg:W-fit">
              <img src={img1} width={500} alt="" />
            </div>
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <div className="w-3/4 my-16 flex items-center md:items-stretch lg:items-stretch md:flex-row lg:flex-row flex-col rounded-xl overflow-hidden">
            <div className="flex flex-col lg:gap-5 gap-6 w-3/4 lg:w-1/2 p-6 justify-center bg-white">
              <h1 className="font-semibold text-3xl">
                Analyze data and create charts
              </h1>
              <p>
                Upload a file and ask ChatGPT to help analyze data, summarize
                information or create a chart.
              </p>
            </div>
            <div className="video w-3/4 lg:w-1/2 lg:W-fit">
              <img src={img2} alt="" width={500} />
            </div>
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <div className="w-3/4 my-16 flex items-center md:items-stretch lg:items-stretch md:flex-row lg:flex-row flex-col rounded-xl overflow-hidden">
            <div className="flex flex-col lg:gap-5 gap-6 w-3/4 lg:w-1/2 p-6 justify-center bg-white">
              <h1 className="font-semibold text-3xl">
                Customize ChatGPT for work, daily tasks or inspiration with GPTs
              </h1>
              <p>
                Explore the GPT store and see what others have made. ChatGPT
                Plus users can also create their own custom GPTs.
              </p>
            </div>
            <div className="video">
              <div className="relative">
                <img className="" src={img3} alt="" width={500} />
                <div className="absolute h-full w-full top-0 z-50">
                  <div className="flex h-full justify-center items-center">
                    <div className="w-5/6 rounded-xl overflow-hidden">
                      <BikeSeatAdjustment />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <div className="w-3/4 my-16 flex items-center md:items-stretch lg:items-stretch md:flex-row lg:flex-row flex-col rounded-xl overflow-hidden">
            <div className="flex flex-col lg:gap-5 gap-6 w-3/4 lg:w-1/2 p-6 justify-center bg-white">
              <h1 className="font-semibold text-3xl">
                Customize ChatGPT for work, daily tasks or inspiration with GPTs
              </h1>
              <p>
                Explore the GPT store and see what others have made. ChatGPT
                Plus users can also create their own custom GPTs.
              </p>
            </div>
            <div className="video w-3/4 lg:w-1/2 lg:W-fit">
              <img src={img4} alt="" width={500} />
            </div>
          </div>
        </div>

        <div className="text-black flex flex-col justify-center items-center">
          <div className="w-3/4 my-16 flex items-center md:items-stretch lg:items-stretch md:flex-row lg:flex-row flex-col rounded-xl overflow-hidden">
            <div className="flex flex-col lg:gap-5 gap-6 w-3/4 lg:w-1/2 p-6 justify-center bg-white">
              <h1 className="font-semibold text-3xl">Apple & ChatGPT</h1>
              <p>
                At WWDC in June 2024, we announced a partnership with Apple to
                integrate ChatGPT into experiences within iOS, iPadOS, and
                macOS.
              </p>
            </div>
            <div className="video w-3/4 lg:w-1/2 lg:W-fit">
              <img src={img5} alt="" width={500} />
            </div>
          </div>
        </div>

        <div className="text-black flex flex-col w-3/4 my-16 p-32 rounded-xl bg-white">
          <h1 className="text-center text-3xl">
            Join hundreds of millions of users and try ChatGPT today.
          </h1>

          <div className="w-full flex justify-center my-4 ">
            <Link
              to={isLoggedIn ? "/jarvis" : "/signin"}
              className="bg-[#080808] hover:opacity-70 duration-[400ms] flex items-center gap-2 rounded-3xl text-white px-3 py-2"
            >
              Try Jarvis
              <svg
                width="0.625rem"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9L9 1M9 1H2.5M9 1V7.22222"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
