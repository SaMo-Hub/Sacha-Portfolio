import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const BalanceSimulator = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [poids, setPoids] = useState(0);
  const [prix, setPrix] = useState(0);
  const engineRef = useRef(null);
  const objetsDansBalanceRef = useRef(new Map());

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.offsetWidth;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width,
        height: 600,
        background: "transparent",
        wireframes: false,
      },
    });

    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);

    // Sol et structure
    const balanceTextWidth = 200; // replace with actual value
    const sacBase = Matter.Bodies.rectangle(width / 2, 490, balanceTextWidth, 26, {
      isStatic: true,
      render: { visible: false },
    });

    const balanceGround = Matter.Bodies.rectangle(width / 1.5, 440, 300, 25, {
      isStatic: true,
      render: { fillStyle: "#2F2D62" },
    });

    const balance = Matter.Bodies.rectangle(width / 1.5, 465, 90, 25, {
      isStatic: true,
      render: { fillStyle: "#8B8AA8" },
    });

    const balanceSensor = Matter.Bodies.rectangle(width / 1.5, 388, 300, 80, {
      isStatic: true,
      isSensor: true,
      render: { visible: true, fillStyle: "#0000001c" },
    });

    // Souris
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.World.add(world, [
      sacBase,
      balanceGround,
      balance,
      balanceSensor,
      mouseConstraint,
    ]);

    render.mouse = mouse;
    engine.gravity.y = 4;

    const pastilles = ["blue", "red", "orange", "vert"];
    const prixParKg = { blue: 40, red: 20, orange: 60, vert: 30 };

    // Collisions
    Matter.Events.on(engine, "collisionStart", function (event) {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        const sensor = balanceSensor;
        const obj = bodyA === sensor ? bodyB : bodyA;
        if (obj.isMainObject) {
          objetsDansBalanceRef.current.set(obj.objectId, obj);
        }
      });
    });

    Matter.Events.on(engine, "collisionEnd", function (event) {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        const sensor = balanceSensor;
        const obj = bodyA === sensor ? bodyB : bodyA;
        if (obj.objectId && objetsDansBalanceRef.current.has(obj.objectId)) {
          objetsDansBalanceRef.current.delete(obj.objectId);
        }
      });
    });

    const updateUI = () => {
      const objetsUniques = Array.from(objetsDansBalanceRef.current.values());

      const poidsParCouleur = Object.fromEntries(
        pastilles.map((couleur) => {
          const poids = objetsUniques
            .filter((item) => item.pastille === couleur)
            .reduce((sum, item) => sum + (item.kg || 0), 0);
          return [couleur, poids];
        })
      );

      const totalPoids = pastilles.reduce(
        (sum, couleur) => sum + poidsParCouleur[couleur],
        0
      );

      const totalPrix = pastilles.reduce(
        (sum, couleur) => sum + poidsParCouleur[couleur] * prixParKg[couleur],
        0
      );

      setPoids(totalPoids.toFixed(2));
      setPrix(totalPrix.toFixed(2));

      if (totalPoids >= 10) {
        alert("Poids maximum atteint ! Redirection...");
        setTimeout(() => {
          window.location.href = "./error404.html";
        }, 1000);
      }
    };

    Matter.Events.on(engine, "afterUpdate", updateUI);

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      canvas.width = newWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      Matter.Render.lookAt(render, null);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas ref={canvasRef} id="world" />
      <div className="absolute top-0 left-0 p-2 text-white">
        <p>Poids total : {poids} kg</p>
        <p>Prix total : {prix} €</p>
      </div>
    </div>
  );
};

export default MatterCubes;
