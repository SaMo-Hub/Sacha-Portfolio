import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import gsap from "gsap";

export const Navbar = ({ primary, secondary }) => {
  const { id } = useParams();
  const link = useParams()
  // const router = useTrasitionRouter()
  // const pathname = usePathname()

  useEffect(()=>{
   
  })

//   const handlenavigation = (path) => (e) => {
//     if ( path === pathname) {
//       e.preventDefault();
//       return
//     }
//   }
// router.push(path,{
//   onTransitionReady: triggerPageTransition,
// })
 const value = Object.values(link)[0] ==='' ? "home" : Object.values(link)[0];

 console.log( link);
  
  const [modal, setModal] = useState(false);

  const overlayRef = useRef(null);
  const tl = useRef(null);
  
  // Menu dynamique
  const menuItems = [
    { title: "home", subtitle: "revenir à la page principale",link:"" },
    { title: "about", subtitle: "en savoir plus",link:'about' },
    { title: "projet", subtitle: "voir mes projets",link:"#projet" },
  ];
  
  // Refs dynamiques
  const titleRefs = useRef([]);
  const subtitleRefs = useRef([]);
  
  // Colors
  const textColor = primary ? primary : "";
  const bgColor = primary ? secondary : "";
  
  useEffect(() => {
    // Set initial state
    gsap.set(overlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });

    gsap.set(titleRefs.current, {
      y: 200,
      autoAlpha: 0,
    });

    gsap.set(subtitleRefs.current, {
      y: 200,
      autoAlpha: 0,
    });

    // Timeline
    tl.current = gsap.timeline({ paused: true });

    // Overlay ouverture
    tl.current.to(overlayRef.current, {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    });

    // Animation titres
    tl.current.to(
      titleRefs.current,
      {
        duration: 0.8,
        y: 0,
        autoAlpha: 1,
        ease: "power4.out",
        stagger: 0.2, // délai entre chaque titre
      },
      "-=0.6"
    );

    // Animation sous-titres
    tl.current.to(
      subtitleRefs.current,
      {
        duration: 0.8,
        y: 0,
        autoAlpha: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.8" // pour qu'ils arrivent un peu après les titres
    );
  }, []);

  useEffect(() => {
    if (modal) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [modal]);

  return (
    <div className="fixed custom-selection w-full z-30"
    style={{
        "--selection-bg": textColor,
        "--selection-text": bgColor,
      }}
    >
      <nav
      className="w-full relative z-10 flex justify-between items-center p-12">
        <Link
                style={primary ? { color: modal ? bgColor : textColor } : {color:modal ? 'white' : ''}}

          className="font-supply text-xs  "
          to={`/`}
        >
          <div className="group relative">
            <p className="uppercase transition-all">index  </p>
            <div
              className=" group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[1.5px] absolute"
              style={primary ? { backgroundColor: modal ? bgColor : textColor } : {}}
            ></div>
          </div>
        </Link>
        {/* <button
          onClick={() => setModal(!modal)}
          
          style={id ?{
            backgroundColor: bgColor,
            color: modal ? textColor : textColor,
          } : {  backgroundColor: "white",
            color: "#2D2D2D"}}
          className="group cursor-pointer gap-2 items-center p-2 flex overflow-hidden relative rounded-sm uppercase font-supply text-xs"
        >
          <div className="w-6 h-6 relative z-10 flex flex-col justify-center items-center gap-[6px]">
            <div
              className={`h-[1.5px] w-4 bg-current transition-all duration-500 origin-center ${
                modal ? "rotate-45 translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor:  textColor }}
            />
            <div
              className={`h-[1.5px]  w-4 bg-current transition-all duration-500 origin-center ${
                modal ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
              style={{ backgroundColor: textColor }}
            />
          </div>

          <p className="relative z-10">menu</p>
          <div
            style={{ backgroundColor: bgColor, color: textColor }}
            className={`${
              modal ? "translate-y-0 " : "-translate-y-11"
            } h-full duration-700 transition-all inset-0 w-full absolute`}
          ></div>
        </button> */}
        <button
          onClick={() => setModal(!modal)}
          
          style={primary ?{
            backgroundColor: textColor,
            color: modal ? textColor : bgColor,
          } : {  backgroundColor: "white",
            color: modal ? textColor : bgColor,}}
          className="group cursor-pointer gap-2 items-center p-2 flex overflow-hidden relative rounded-sm uppercase font-supply text-xs"
        >
          <div className="w-6 h-6 relative z-10 flex flex-col justify-center items-center gap-[6px]">
            {/* Barre 1 */}
            <div
              className={`h-[1.5px] w-4 bg-current transition-all duration-500 origin-center ${
                modal ? "rotate-45 translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor: modal ? textColor : bgColor }}
            />
            {/* Barre 2 */}
            <div
              className={`h-[1.5px]  w-4 bg-current transition-all duration-500 origin-center ${
                modal ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
              style={{ backgroundColor: modal ? textColor : bgColor }}
            />
          </div>

          <p className="relative z-10">menu</p>
          <div
            style={{ backgroundColor: bgColor, color: textColor }}
            className={`${
              modal ? "translate-y-0 " : "-translate-y-11"
            } h-full duration-700 transition-all inset-0 w-full absolute`}
          ></div>
        </button>
      </nav>

      <div
        ref={overlayRef}
        style={primary ?{
          backgroundColor: textColor,
          color: bgColor,
        }: {color : 'white'}}
        className="bg-[#2D2D2D] absolute top-0 pt-24 flex flex-col justify-between w-full h-screen"
      >
        <div className="flex flex-col">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="px-12 group py-2 flex justify-between relative items-center"
            >
              <Link
                                            to={`/${item.link} `}

              className="font-ztbroskon relative group overflow-hidden group-hover: text-white z-10 uppercase text-[20vw]">
                <h3
                  ref={(el) => (titleRefs.current[i] = el)}
                  className={` text-[17vw]/[18vw] h-[15vw]`}
                >
                  {item.title}
                </h3>
                <div className={`absolute top-[50%] transition-all h-2 ${value == item.title ? "-translate-x-0" : "-translate-x-[50vw]"}  w-full bg-red-600`}>

                </div>
              </Link>
              <div className="h-fit z-10 overflow-hidden">
                <p
                  ref={(el) => (subtitleRefs.current[i] = el)}
                  className="font-supply z-10 group-hover: text-white text-xs uppercase"
                >
                  ({item.subtitle})
                </p>
              </div>
              <div
                style={{ backgroundColor: bgColor }}
                className={`-translate-x-[100vw] bg-amber-400  group-hover:translate-x-0 h-full duration-700 transition-all inset-0 w-full absolute`}
              />
            </div>
          ))}
        </div>

        <footer className="z-10 relative mx-12 py-12 border-t flex justify-between font-supply items-end text-xs uppercase">
          <div className="flex items-end gap-12">
            <ul>
              <li>home</li>
              <li>about</li>
              <li>portfolio</li>
            </ul>
            <ul>
              <li>instagram</li>
              <li>linkedin</li>
            </ul>
          </div>
          <Link to={"mailto:smoricet.contact@gmail.com"}>
            smoricet.contact@gmail.com
          </Link>
        </footer>
      </div>
    </div>
  );
};
