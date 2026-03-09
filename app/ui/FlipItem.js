'use client'; // Required for Next.js app router

import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Flip, gsap } from './plugins';

// Register the plugin globally or within the hook
// It's good practice to register all required plugins in one place
gsap.registerPlugin(Flip); 

export default function FlipItem() {
  const container = useRef();
  const [isToggled, setIsToggled] = useState(false);
  const { contextSafe } = useGSAP(() => {}, { scope: container });
  const [selectItem, setSelectItem] = useState([]);
  
  // The function that changes the DOM structure/styling
  const toggleLayout = contextSafe(() => {
    // 1. Get the initial state (position, size, etc.) of the elements
    setSelectItem(Flip.getState(".my-element", { scope: container.current }));

    // 2. Make your DOM or styling changes (e.g., change state to trigger a different layout)
    setIsToggled(prev => !prev);
    // In a real application, changing the state here will cause a re-render.
    // The actual DOM update will happen when React re-renders. 
    // The useLayoutEffect or useGSAP with dependencies is where the animation runs.
  });

  // Use useLayoutEffect or useGSAP with dependencies to run the Flip.from() after the DOM updates
  useGSAP(() => {
    // 3. Animate from the initial state to the new state
    Flip.from(selectItem, {
      duration: 0.5,
      ease: "power1.inOut",
      // ... other Flip specific parameters
    });
  }, { dependencies: [isToggled], scope: container }); // The animation runs when isToggled changes

  return (
    <div ref={container} className="app-container">
      <button onClick={toggleLayout}>Toggle Layout</button>
      
      <div className={`layout-container ${isToggled ? 'toggled-style' : ''}`}>
        {/* Your elements that will be flipped */}
        <div className="my-element">Box</div>
      </div>
    </div>
  );
}
