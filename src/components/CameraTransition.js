import { useEffect } from 'react';
import TWEEN from '@tweenjs/tween.js';

const CameraTransition = ({ camera, cameraTarget, onComplete }) => {
  const { position, cameraPosition } = cameraTarget;

  useEffect(() => {
    if (!camera || !cameraTarget) return;

    const tweenCamera = new TWEEN.Tween(camera.position)
      .to(cameraPosition, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.lookAt(position);
      })
      .onComplete(() => {
        if (onComplete) onComplete();
      })
      .start();

    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    animate();

    return () => {
      tweenCamera.stop();
    };
  }, [camera, cameraTarget, cameraPosition, position, onComplete]);

  return null;
};

export default CameraTransition;
