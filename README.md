# ArchViz 3D Viewer

Welcome to the ArchViz 3D Viewer, a web-based application for exploring and interacting with stunning 3D architecture models. This project uses React, Three.js, and React Three Fiber to render 3D models in a browser environment, offering an intuitive and engaging experience.

## Project Overview

This application allows users to:

- View and explore 3D architectural models.
- Interact with specific points of interest using clickable markers.
- Experience smooth camera transitions to different areas of the model.

## Features

- **Responsive Design:** The application adapts to different screen sizes and devices.
- **Interactive Markers:** Clickable spheres highlight key areas within the 3D model.
- **Smooth Camera Transitions:** The camera smoothly transitions to different positions upon interacting with markers.
- **Dark Mode:** A sleek, modern dark-themed UI.

## Live Demo

Check out the live version of the project: [ArchViz 3D Viewer]
https://arch-viz.vercel.app

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sidan54/ArchViz.git
   cd ArchViz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

4. Open your browser and visit `http://localhost:3000` to see the app in action.

### Deployment

This project is deployed on Vercel. You can easily deploy it yourself by following these steps:

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy the project:

   ```bash
   vercel
   ```

3. Follow the on-screen instructions to complete the deployment.

## Project Structure

- `src/`
  - `components/`
    - `Home.js` - The landing page of the application.
    - `ThreeModel.js` - Handles rendering of the 3D scene and interactive elements.
  - `App.js` - Main application file.
  - `index.js` - Entry point of the application.
- `public/`
  - `models/` - Contains 3D model files.
  - `textures/` - Contains texture files.

## Technologies Used

- **React** - A JavaScript library for building user interfaces.
- **Three.js** - A 3D library that makes WebGL easier to use.
- **React Three Fiber** - A React renderer for Three.js.
- **Vercel** - A platform for frontend developers, providing the best workflow to deploy and host your application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Three.js](https://threejs.org/) - The powerful 3D library that made this project possible.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - For bridging the gap between React and Three.js.
- [Vercel](https://vercel.com/) - For providing an easy deployment solution.

---

**Note:** For any issues or suggestions, feel free to open an issue or submit a pull request.

Enjoy exploring the 3D world of architecture!
```

You can copy this markdown content into your `README.md` file for your GitHub repository.
