import { useEffect, useRef, useState } from "react";

export default function EyeTrackingCharacter() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tearLevel, setTearLevel] = useState(0);
  const [blushLevel, setBlushLevel] = useState(0);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftTearRef = useRef<HTMLDivElement>(null);
  const rightTearRef = useRef<HTMLDivElement>(null);
  const leftBlushRef = useRef<HTMLDivElement>(null);
  const rightBlushRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Update eye and pupil position based on mouse
  const updateEyeAndPupilPosition = (
    eyeElement: HTMLElement | null,
    mouseX: number,
    mouseY: number,
    characterCenterX: number,
    characterCenterY: number,
  ) => {
    if (!eyeElement) return;

    const eyeRect = eyeElement.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate distance from mouse to character center
    const deltaX = mouseX - characterCenterX;
    const deltaY = mouseY - characterCenterY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    // Eye movement based on distance from character center
    const maxDistance = 300; // Maximum distance to consider
    const maxEyeMove = 15; // Maximum eye movement in pixels
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    const eyeMoveX = normalizedDistance * maxEyeMove * Math.cos(angle);

    // Allow more movement upward
    let eyeMoveY = normalizedDistance * maxEyeMove * Math.sin(angle);
    if (deltaY < 0) {
      // Moving upward
      eyeMoveY = normalizedDistance * (maxEyeMove * 4) * Math.sin(angle);
    }

    // Update eye position
    const eyeContainer = eyeElement.parentElement;
    if (eyeContainer) {
      eyeContainer.style.transform = `translate(calc(-50% + ${eyeMoveX}px), calc(-50% + ${eyeMoveY}px))`;
    }

    // Calculate pupil position relative to eye
    const pupilDeltaX = mouseX - eyeCenterX;
    const pupilDeltaY = mouseY - eyeCenterY;
    const pupilAngle = Math.atan2(pupilDeltaY, pupilDeltaX);
    const pupilDistance = Math.min(
      Math.sqrt(pupilDeltaX * pupilDeltaX + pupilDeltaY * pupilDeltaY),
      100,
    );

    const maxPupilMoveX = 20;
    const maxPupilMoveY = 35;
    const normalizedPupilDistance = pupilDistance / 100;

    const pupilX =
      normalizedPupilDistance * maxPupilMoveX * Math.cos(pupilAngle);
    const pupilY =
      normalizedPupilDistance * maxPupilMoveY * Math.sin(pupilAngle);

    const pupil = eyeElement.querySelector(".pupil") as HTMLElement;
    if (pupil) {
      pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Get character center position
    const characterElement = document.querySelector(
      ".character",
    ) as HTMLElement;
    if (characterElement) {
      const characterRect = characterElement.getBoundingClientRect();
      const characterCenterX = characterRect.left + characterRect.width / 2;
      const characterCenterY = characterRect.top + characterRect.height / 2;

      updateEyeAndPupilPosition(
        leftEyeRef.current,
        mousePosition.x,
        mousePosition.y,
        characterCenterX,
        characterCenterY,
      );
      updateEyeAndPupilPosition(
        rightEyeRef.current,
        mousePosition.x,
        mousePosition.y,
        characterCenterX,
        characterCenterY,
      );

      // Update tear animation based on mouse position
      const deltaY = mousePosition.y - characterCenterY;
      const distance = Math.abs(deltaY);
      const maxDistance = 150; // Increased to 300 for slower full fill
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      if (deltaY > 0) {
        // Mouse is below character (looking down)
        const newTearLevel = normalizedDistance * 250; // Tear level from 0 to 250 to fill entire eye
        setTearLevel(newTearLevel);
        setBlushLevel(0);
      } else {
        // Mouse is above character (looking up)
        setTearLevel(0);
        const newBlushLevel = normalizedDistance * 100; // Blush level from 0 to 100
        setBlushLevel(newBlushLevel);
      }
    }
  }, [mousePosition]);

  useEffect(() => {
    // Update tear position to fill from bottom to top
    if (leftTearRef.current && rightTearRef.current) {
      // Calculate tear position: from bottom (100%) to top (-150% to overflow and fill completely)
      const tearPosition = 95 - tearLevel * 1.0; // 0 to 250, with overflow

      leftTearRef.current.style.top = `${tearPosition}%`;
      rightTearRef.current.style.top = `${tearPosition}%`;

      if (tearLevel > 0) {
        leftTearRef.current.classList.add("active");
        rightTearRef.current.classList.add("active");
      } else {
        leftTearRef.current.classList.remove("active");
        rightTearRef.current.classList.remove("active");
      }
    }
  }, [tearLevel]);

  useEffect(() => {
    // Update blush opacity based on blush level
    if (leftBlushRef.current && rightBlushRef.current) {
      const blushOpacity = Math.min(blushLevel / 100, 1);
      
      leftBlushRef.current.style.opacity = `${blushOpacity}`;
      rightBlushRef.current.style.opacity = `${blushOpacity}`;
    }
  }, [blushLevel]);

  return (
    <div className="character">
      <div className="triangle-body">
        <svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 150 30 L 270 235 L 30 235 Z"
            fill="#33bb66"
            stroke="#33bb66"
            strokeWidth="20"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="eyes-container">
        <div className="eye" ref={leftEyeRef}>
          <div className="pupil">
            <div className="highlight"></div>
          </div>
          <div className="tear" ref={leftTearRef}>
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
          </div>
        </div>
        <div className="eye" ref={rightEyeRef}>
          <div className="pupil">
            <div className="highlight"></div>
          </div>
          <div className="tear" ref={rightTearRef}>
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
          </div>
        </div>
      </div>
      <div className="blush-container">
        <div className="blush blush-left" ref={leftBlushRef}></div>
        <div className="blush blush-right" ref={rightBlushRef}></div>
      </div>
    </div>
  );
}
