import { useEffect, useRef } from 'react';
import TWEEN from '@tweenjs/tween.js';

const CameraTransition = ({ camera, cameraTarget, onComplete }) => {
  const { position, cameraPosition } = cameraTarget;
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!camera || !cameraTarget) return;

    // Set up tween with increased duration
    const tweenCamera = new TWEEN.Tween(camera.position)
      .to(cameraPosition, 2000) // Increased duration for slower movement
      .easing(TWEEN.Easing.Quadratic.InOut) // Smooth easing function
      .onUpdate(() => {
        camera.lookAt(position);
      })
      .onComplete(() => {
        if (onComplete) onComplete();
      })
      .start();

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      TWEEN.update();
    };
    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      tweenCamera.stop();
    };
  }, [camera, cameraTarget, cameraPosition, position, onComplete]);

  return null;
};

export default CameraTransition;
