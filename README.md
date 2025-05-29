# Project Documentation

## Overview

This is a portfolio project that definitely got away from me somewhat. I wanted to create a visually exciting experience that was still accessible and navigable with keypresses. I learned how to use GSAP animation timelines for sectional navigation (which should work on mobile too! I've done a lot of testing.)

I've selected the character Seth Milchick from Severance as my profile subject, which provided me a great deal to draw from that feels corporate while also being entertaining. There are some small easter eggs hidden around the page.

Using the Severance Wiki, I was able to define a root style guide to format my css with. I tweaked the values of Brass and Timber from their originals for readability on the webpage. 

## Features

### 1. Section Navigation

- **ScrollTrigger Integration**: Utilizes GSAP's ScrollTrigger to pin sections and enable smooth, scroll-based transitions between content blocks.
- **Gesture & Keyboard Support**: Listens for wheel events, touch gestures, and standard keyboard inputs (arrow keys and PageUp/PageDown) to trigger navigational actions.
- **Adaptive Control**: Navigation behavior adapts based on device type and orientation, ensuring a consistent experience across platforms. 

### 2. Home Button

- **Context-Sensitive Visibility**: The home button appears only when needed (for instance, after navigating away from the top of the page) and is designed responsively to work well on mobile devices.
- **Ease of Access**: Provides a quick way for users to reset the view and jump back to the top section of the application.

### 3. Modal Functionality

- **Portfolio Detail View**: Clicking on a portfolio item summons a modal window that reveals detailed information about the project.
- **Keyboard Accessibility**: The modal is accessible via keyboard controls—pressing the Enter key activates selections, making it easier for users who rely on assistive technologies.
- **Animations**: Fade-in and scale animations, powered by GSAP, enhance the modal’s entrance and exit, providing a polished look and feel.

### 4. Responsive Carousel

- **Team Cards Grid**: A horizontally scrollable carousel that houses team cards. On larger screens, multiple cards are visible, while on mobile devices, the layout automatically adjusts so that only one card is displayed at a time.
- **Mobile Optimization**: Ensures optimal display by scaling text and images dynamically, along with padding adjustments that maintain layout clarity regardless of screen size.
- **User Interaction**: Smooth transitions and snapping ensure a pleasant experience when browsing through team profiles.


## Technologies Used

- **HTML**: Structures the content and lays out the web pages.
- **CSS**: Delivers styling focused on making the layout responsive and visually appealing.
- **JavaScript**: Drives the interactivity and behavior of the carousel, modal, and navigation.
- **GSAP (GreenSock Animation Platform)**: Powers advanced animations and smooth transitions.
- **ScrollTrigger**: Enhances scrolling effects with pinning and advanced scroll-based triggers.

## File Structure

Below is an overview of the project's file structure to help you navigate the codebase:

```
├── index.html         # Main HTML file
├── package.json       # Project metadata and dependency list
├── README.md          # Project documentation
├── script.js          # Main JavaScript file handling interactivity and animations
├── style.css          # Custom CSS for styling and responsive design
└── images/            # Assets used in the project
    ├── commitment.webp
    ├── dance_party.webp
    ├── dedication.webp
    ├── dylandistress.webp
    ├── DylanG.png
    ├── engagement.webp
    ├── hellydistress.webp
    ├── HellyR.png
    ├── IrvingB.png
    ├── irvingdistress.webp
    ├── markdistress.webp
    ├── MarkS.png
    ├── milchick.png
    ├── MilchickBalloons.png
    ├── morale_adjustments.webp
    ├── onboarding.webp
    ├── protocols.webp
    ├── team_building.webp
    ├── team-milchick-camera.png
    ├── test.mp4
    └── workflow.webp
```

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd UX_UI_FINAL
   ```

3. **Install dependencies** (if applicable):

   ```bash
   npm install
   ```

   > **Note:** If you have specific build tools or bundlers, please add those instructions here.

## Usage

Once installed, you can run the application as follows:

1. **Open the Application**:  
   Open the `index.html` file in your preferred web browser to see the application in action.

2. **Navigation and Interaction**:  
   - Explore sections using mouse scroll, touch gestures, or keyboard controls (arrow keys, PageUp/PageDown).
   - Interact with the carousel to view team cards.
   - Click on any portfolio item to open the modal and view additional details.

3. **Customizing and Testing**:  
   Modify the HTML, CSS, or JavaScript files as needed. Refresh your browser to see updates in real time.

## Detailed Code Documentation

*If you have specific functions in your JavaScript or notable sections of your CSS styling, please share them, and I can include detailed inline documentation here. For example:*
- **Carousel Functionality**: Description of how you handle the responsive behavior, event listeners, and animation triggers.
- **Modal Behavior**: Explanation of the modal open/close functions, keyboard event handlers, and GSAP powered animations.
- **Scroll and Navigation**: Insight into the use of ScrollTrigger and how you manage the section pinning and gesture recognition.

Feel free to share these segments so that the documentation can include code snippets, enhanced explanations, or usage examples.

## Contributing

We welcome contributions to improve this project. Follow these guidelines to contribute effectively:

1. **Fork the Repository**:  
   Click on the fork button to create your own copy.
   
2. **Create a Feature Branch**:

   ```bash
   git checkout -b feature-name
   ```

3. **Commit Your Changes**:

   ```bash
   git commit -m "Add feature-name"
   ```

4. **Push to Your Branch**:

   ```bash
   git push origin feature-name
   ```

5. **Open a Pull Request**:  
   Provide a detailed description of your changes in the pull request.

## License

This project is licensed under the MIT License. For more details, please refer to the LICENSE file included in the repository.

## Credits & Acknowledgements

- **Images**: All images are stored in the `images/` directory.
- **GSAP & ScrollTrigger**: Special thanks to the creators of these libraries for the powerful animation capabilities.

## Contact
For questions or feedback, no thank you. Don't contact me. :3