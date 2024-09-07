// data.js
export const modelPaths = {
    office: '/models/office/scene.gltf',
    room: '/models/room/scene.gltf',
    house: '/models/house/house.glb',
    restaurant: '/models/restaurant/scene.gltf',
  };
  
  export const markerPositions = [
    [1.5, -0.8, 0],
    [1.5, -0.8, -3.5],
    [-1.5, -0.8, -3.5],
    [-1.5, -0.8, 0.5],
    [-1.5, -0.8, 3.5],
    [2, -1.5, 2],
  ];
  
  export const markerLabels = [
    "2. Table",
    "3. Office 1",
    "5. Office 2",
    "4. Conference hall",
    "6. Washroom",
    "1. Main Room",
  ];
  
  export const markerInfos = [
    "ⓘ Info \n-----------------------\nThis is a table used for meetings.",
    "ⓘ Info \n-----------------------\nOffice 1 is for the manager.",
    "ⓘ Info \n-----------------------\nOffice 2 is for the team lead.",
    "ⓘ Info \n-----------------------\nThe conference hall can seat up to 50 people.",
    "ⓘ Info \n-----------------------\nThe washroom is located here.",
    "ⓘ Info \n-----------------------\nThe main room serves as the reception area.",
  ];
  
  export const cameraPositions = [
    [2.5, 0, 3],
    [3, -0.8, -4.5],
    [-6, 0, -3],
    [-5, 0, 2],
    [-4, 0, 6],
    [0, 0, 6],
  ];
  
  export const modelConfigurations = {
    office: {
      planeGeometry: { args: [20, 20], position: [0, -2, 0] },
      camera: { position: [0, 0, 10], fov: 75 },
    },
    room: {
      planeGeometry: { args: [800, 800], position: [0, -130, 0] },
      camera: { position: [0, 0, 400], fov: 75 },
    },
    house: {
      planeGeometry: { args: [30, 30], position: [0, -2.7, 0] },
      camera: { position: [-12, 0, 0], fov: 75 },
    },
    restaurant: {
      planeGeometry: { args: [40, 40], position: [0, -6, 0] },
      camera: { position: [0, 0, 20], fov: 75 },
    },
  };
