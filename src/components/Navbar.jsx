import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import gsap from "gsap";
import { Footer } from "./Footer";

export const Navbar = ({ setbgColor, settextColor, primary, secondary }) => {
  const { id } = useParams();

  const link = useParams();
  // const router = useTrasitionRouter()
  // const pathname = usePathname()

  useEffect(() => {});

  //   const handlenavigation = (path) => (e) => {
  //     if ( path === pathname) {
  //       e.preventDefault();
  //       return
  //     }
  //   }
  // router.push(path,{
  //   onTransitionReady: triggerPageTransition,
  // })
  const value = Object.values(link)[0] === "" ? "home" : Object.values(link)[0];

  console.log(link);

  const [modal, setModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const overlayRef = useRef(null);
  const tl = useRef(null);

  // Menu dynamique
  const menuItems = [
    { title: "home", subtitle: "revenir à la page principale", link: "" },
    { title: "à propos", subtitle: "en savoir plus", link: "about" },
    // { title: "projet", subtitle: "voir mes projets",link:"#projet" },
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
      // autoAlpha: 0,
    });

    gsap.set(subtitleRefs.current, {
      y: 200,
      // autoAlpha: 0,
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
        // autoAlpha: 1,
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
        // autoAlpha: 1,
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
    <div
      className="fixed custom-selection w-full z-30"
      style={{
        "--selection-bg": textColor,
        "--selection-text": bgColor,
      }}
    >
      <nav className="w-full relative z-10 flex justify-between items-center p-8 md:p-12 ">
        <Link
          style={
            primary
              ? { color: modal ? bgColor : textColor }
              : { color: modal ? "white" : "" }
          }
          className="font-supply text-xs  "
          to={`/`}
        >
          <div 
           onClick={() => {
              settextColor("#2D2D2D");
                  setbgColor("#fff");
              }}
          className="group relative">
            <p
             
              className="uppercase transition-all"
            >
              index{" "}
            </p>
            <div
              className=" group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[1.5px] absolute"
              style={
                primary ? { backgroundColor: modal ? bgColor : textColor } : {}
              }
            ></div>
          </div>
        </Link>

        <button
          onClick={() => setModal(!modal)}
          style={
            primary
              ? {
                  backgroundColor: textColor,
                  color: modal ? textColor : bgColor,
                }
              : { backgroundColor: "white", color: modal ? textColor : bgColor }
          }
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
        style={
          primary
            ? {
                backgroundColor: textColor,
                color: bgColor,
              }
            : { color: "white" }
        }
        className="bg-[#2D2D2D] absolute top-0 pt-24 flex flex-col justify-between w-full h-screen"
      >
        <div className="flex justify-center h-full flex-col">
          {menuItems.map((item, i) => (
            <Link
                            to={`/${item.link}`}

              onClick={() => {
                if (item.title === "home") {
                  settextColor("#fff");
                  setbgColor("#2D2D2D");
                } else {
                  settextColor("#4C76E3");
                  setbgColor("#DBDDE2");
                }
              }}
              key={i}
              style={{ color: secondary }}
              className="px-12 group py-2 flex md:flex-row  flex-col gap-2 justify-between relative items-center"
            >
              <div
                className="font-ztbroskon relative group overflow-hidden group-hover:  z-10 uppercase"
              >
                <h3
                  ref={(el) => (titleRefs.current[i] = el)}
                  className={`group-hover:hidden text-[17vw]/[18vw] md:text-[190px]/[190px] h-[15vw] md:h-[180px]`}
                >
                  {item.title}
                </h3>
                <h3
                  // style={{cl}}
                  style={{ color: primary }}
                  className={`group-hover:block hidden text-[17vw]/[18vw] md:text-[190px]/[190px] h-[15vw] md:h-[180px]`}
                >
                  {item.title}
                </h3>
                {/* <div
                  className={`absolute top-[50%] transition-all h-2 ${
                    value == item.title
                      ? "-translate-x-0"
                      : "-translate-x-[50vw]"
                  }  w-full bg-red-600`}
                ></div> */}
              </div>
              <div className="h-fit z-10 overflow-hidden">
                <div
                  className="h-fit"
                  ref={(el) => (subtitleRefs.current[i] = el)}
                >
                  <p
                    style={{ color: primary }}
                    className="font-supply group-hover:block hidden  z-10 group-hover:  text-xs uppercase"
                  >
                    ({item.subtitle})
                  </p>
                  <p className="font-supply group-hover:hidden  z-10 group-hover:  text-xs uppercase">
                    ({item.subtitle})
                  </p>
                </div>
              </div>
              <div
                style={{ backgroundColor: bgColor }}
                className={`-translate-x-[100vw] bg-amber-400  group-hover:translate-x-0 h-full duration-700 transition-all inset-0 w-full absolute`}
              />
            </Link>
          ))}
        </div>

        <Footer primaryColor={secondary} secondaryColors={primary} />
      </div>
    </div>
  );
};
