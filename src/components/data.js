export const modelPaths = {
  office: '/models/office/scene.gltf',
  room: '/models/room/scene.gltf',
  house: '/models/house/house-water.glb',
  restaurant: '/models/restaurant/scene.gltf',
  house1: '/models/house/house-water-transformed.glb',
};

// Define markers, labels, infos, and camera positions for each model type
export const modelData = {
  office: {
    markerPositions: [
      [2, -1.5, 2],
      [1.5, -0.8, 0],
      [1.5, -0.8, -3.5],
      [-1.5, -0.8, -3.5],
      [-1.5, -0.8, 0.5],
      [-1.5, -0.8, 3.5],
    ],
    markerLabels: [
      "1. Main Room",
      "2. Table",
      "3. Office 1",
      "5. Office 2",
      "4. Conference hall",
      "6. Washroom",
    ],
    markerInfos: [
      "ⓘ Info \n-----------------------\nThe main room serves as the reception area.",
      "ⓘ Info \n-----------------------\nThis is a table used for meetings.",
      "ⓘ Info \n-----------------------\nOffice 1 is for the manager.",
      "ⓘ Info \n-----------------------\nOffice 2 is for the team lead.",
      "ⓘ Info \n-----------------------\nThe conference hall can seat up to 50 people.",
      "ⓘ Info \n-----------------------\nThe washroom is located here.",
    ],
    cameraPositions: [
      [0, 0, 6],
      [2.5, 0, 3],
      [3, -0.8, -4.5],
      [-6, 0, -3],
      [-5, 0, 2],
      [-4, 0, 6],
    ],
  },
  room: {
    markerPositions: [
      [0, 0, 0],
      [70, 0, -100],
      [0, 70 , 100],
    ],
    markerLabels: [
      "Room Table",
      "Room Sofa",
      "new",
    ],
    markerInfos: [
      "ⓘ Info \n-----------------------\nThis is a table in the room.",
      "ⓘ Info \n-----------------------\nThis is a sofa in the room.",
      "ⓘ Info \n-----------------------\nThis is a new in the room.",
    ],
    cameraPositions: [
      [50, 0, 50],
      [70, -10, -50],
      [50, 120 , 150],
    ],
  },
  house: {
    markerPositions: [
      [1, 0, 1],
      [2, -0.5, -2],
    ],
    markerLabels: [
      "House Kitchen",
      "House Living Room",
    ],
    markerInfos: [
      "ⓘ Info \n-----------------------\nThis is the kitchen in the house.",
      "ⓘ Info \n-----------------------\nThis is the living room in the house.",
    ],
    cameraPositions: [
      [5, 1, 5],
      [3, 0, -5],
    ],
  },
  restaurant: {
    markerPositions: [
      [0, -1, 0],
      [2, 0, 2],
    ],
    markerLabels: [
      "Restaurant Table",
      "Restaurant Bar",
    ],
    markerInfos: [
      "ⓘ Info \n-----------------------\nThis is a table in the restaurant.",
      "ⓘ Info \n-----------------------\nThis is the bar area in the restaurant.",
    ],
    cameraPositions: [
      [5, 0, 5],
      [6, -1, -6],
    ],
  },
};

export const modelConfigurations = {
  office: {
    planeGeometry: { args: [20, 20], position: [0, -2, 0] },
    camera: { position: [0, 0, 10], fov: 75 },
    sphereSize: 0.06,
  },
  room: {
    planeGeometry: { args: [800, 800], position: [0, -130, 0] },
    camera: { position: [0, 0, 400], fov: 75 },
    sphereSize: 4,
  },
  house: {
    planeGeometry: { args: [30, 30], position: [0, -2.7, 0] },
    camera: { position: [-12, 0, 0], fov: 75 },
    sphereSize: 0.06,
  },
  restaurant: {
    planeGeometry: { args: [40, 40], position: [0, -6, 0] },
    camera: { position: [0, 0, 20], fov: 75 },
    sphereSize: 0.06,
  },
};

