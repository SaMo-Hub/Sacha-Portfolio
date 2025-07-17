import React, { useEffect, useRef, useState } from "react";
import { projectList } from "../projectList";
import { Link, useParams } from "react-router";
import { div } from "framer-motion/client";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import MatterCubes from "../components/MatterCubes";
import { Navbar2 } from "../components/Navbar2";
import gsap from "gsap";
import { Transition } from "../components/Transition";
import RevealText from "../components/TextReveal";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollTop";

export const PageProjet = () => {
  const { id } = useParams(); // Récupérer l'id de l'URL
  const numericId = parseInt(id);
  const [modalImage, setModalImage] = useState(null);

  const item = projectList.find((p) => p.id === parseInt(id));
  const nextProjectColors = projectList.find((p) => p.id === numericId + 1);
  const prevProjectColors = projectList.find((p) => p.id === numericId - 1);
  const [bgColor, setbgColor] = useState(item.backgroundColor);
  const [textColor, settextColor] = useState(item.textColor);
  console.log(nextProjectColors, "gg");
  const list = ["ggg", "fff"];
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const projetNumberRef = useRef(null);
  useEffect(() => {
    window;
  });

  useEffect(() => {
    if (titleRef.current && dateRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 1000, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0,
          delay: 0.3,
        }
      );
      gsap.fromTo(
        [projetNumberRef.current, dateRef.current],
        { y: 1000, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.2,
          delay: 0.2,
        }
      );
    }
  }, [item]);

  return (
    <div
      className="custom-selection"
      style={{
        "--selection-bg": item.textColor,
        "--selection-text": item.backgroundColor,
      }}
    >
      <Transition primaryColor={textColor} secondaryColor={bgColor} />
      <RevealText /> {/* Initialise les animations au mount */}
      <ScrollToTop />
      <Navbar
        setbgColor={setbgColor}
        settextColor={settextColor}
        primary={item.textColor}
        secondary={item.backgroundColor}
      />
      <div
        style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
        className=""
      >
        <div
          style={{
            backgroundColor: item.backgroundColor,
            color: item.textColor,
          }}
          className="h-screen px-8 md:px-12  w-full flex justify-between items-center"
        >
          <div className="overflow-hidden">
            <p ref={projetNumberRef} className="font-supply text-xs ">
              ({item.id}/{projectList.length})
            </p>
          </div>
          <div className="bg-amber-5 h-[14.6vw] flex items-start justify-baseline   wf overflow-hidden">
            <h1 ref={titleRef} className="text-[14vw]/[14vw]   font-ztbroskon ">
              {item.title}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p ref={dateRef} className="font-supply text-xs ">
              {item.date}
            </p>
          </div>
        </div>
        {modalImage && (
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={() => setModalImage(null)}
          >
            <div
              className="max-w-[90vw] r max-h-[90vh] overflow-scroll"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImage}
                alt="Image zoom"
                className="w-full h-auto r"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-12 md:grid  grid-cols-12  md:gap-0 relative px-8 md:px-12 ">
          <div className="md:sticky  md:top-24 col-start-1 col-end-5 row-start-1 row-end-2 text-xs font-supply self-start">
            <div>
              <div className="uppercase flex flex-col gap-5">
                <p className="reveal-line">(role)</p>
                <div className="flex flex-col gap-">
                  {item.categorie.map((cat, index) => (
                    <p className="reveal-line" key={index}>
                      /{cat}
                    </p>
                  ))}
                </div>
              </div>
              <div className=" mt-12 flex flex-col gap-8">
                {item.description.map((item, index) => (
                  <p id={index} className="reveal-line ">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            {item.link && (
              <Link
                to={item.link}
                // target="_blank"
                style={{
                  backgroundColor: item.textColor,
                  color: item.backgroundColor,
                }}
                className="bg-black group overflow-hidden flex flex-col items-center mt-4 text-xs w-fit uppercase  text-white rounded-sm p-2"
              >
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>

                  <p className="ml-2 reveal-line">site live</p>
                </div>

                <div className=" h-full w-full overflow-hidden">
                  <div
                    style={{ backgroundColor: item.backgroundColor }}
                    className="h-[1.5px] -translate-x-[90px] duration-300  transition-all  group-hover:-translate-x-[0px]  w-full"
                  ></div>
                </div>
              </Link>
            )}
            <div className="gap-2 uppercase flex mt-42">
              <Link
                onClick={() => {
                  settextColor(prevProjectColors.textColor),
                    setbgColor(prevProjectColors.backgroundColor);
                }}
                style={{ borderColor: item.textColor, color: item.textColor }}
                className={`flex border relative items-center group overflow-hidden z-20 w-fit p-2 rounded-sm ${
                  id <= 1 ? "hidden" : "block"
                }  `}
                to={`/projets/${parseInt(id) - 1}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="square"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                <p>
                  {id <= 1
                    ? ""
                    : projectList.find((p) => p.id === parseInt(id - 1)).title}
                </p>
                <div
                  style={{ backgroundColor: item.textColor }}
                  className=" absolute  duration-300 transition-all  h-full translate-x-[140px]  w-full opacity-15 group-hover:-translate-x-[0px]  left-0 top-0"
                ></div>
              </Link>

              <Link
                onClick={() => {
                  settextColor(nextProjectColors.textColor),
                    setbgColor(nextProjectColors.backgroundColor);
                }}
                style={{ borderColor: item.textColor, color: item.textColor }}
                className={`overflow-hidden group border flex items-center relative z-20 w-fit p-2 rounded-sm ${
                  id >= projectList.length ? "hidden" : "block"
                }  `}
                to={`/projets/${parseInt(id) + 1}`}
              >
                <p>
                  {id >= projectList.length
                    ? ""
                    : projectList.find((p) => p.id === parseInt(id) + 1).title}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="square"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                <div
                  style={{ backgroundColor: item.textColor }}
                  className=" absolute duration-300   transition-all  h-full -translate-x-[140px]  w-full opacity-15 group-hover:-translate-x-[0px]  left-0 top-0"
                ></div>
              </Link>
            </div>
          </div>

          {/* Partie scrollable à côté */}
          <div className="col-start-6 col-end-13 row-start-1 row-end-2">
            <div className="flex flex-col gap-4">
              {item.listImage.map((image, imgIndex) => (
                <div key={imgIndex}>
                  {image.grid && (
                    <div className={`${image.gridName} grid gap-4`}>
                      {image.grid.map((gridImg, index) => (
                        <img
                          key={`grid-${imgIndex}-${index}`}
                          src={gridImg}
                          alt=""
                        />
                      ))}
                    </div>
                  )}

                  {image.img && (
                    <img
                      key={`img-${imgIndex}`}
                      className="w-full rounded-sm cursor-pointer"
                      src={image.img}
                      alt={`Illustration ${imgIndex + 1}`}
                      onClick={() => setModalImage(image.img)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer
          primaryColor={item.textColor}
          secondaryColor={item.backgroundColor}
        />
      </div>
    </div>
  );
};
