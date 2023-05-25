# MP-1_ToList-azure

# MP - My Project
I attempted to create the projectors on my own without any tutorial assistance. Okay, it's my first spaghetti project. It didn't take much time or effort to convince my colleagues that we can use this application at work :)

# Installation
Make sure you have NODE.js installed. The project is configured using Gulp.

1. In the terminal, install the plugins with the command npm -i.
2. The command gulp createFoldersStructure creates folders (not necessary).
3. The command gulp runs all the necessary files, applies the required plugins, and launches the application in the web browser.

# How to Use
I believe it is quite straightforward to use the application. The buttons are clear and there is also a "Descriptions" section that provides a brief description of the application interface.

# Impressions
I decided to create a to-do list based on <div> elements instead of the <ul> and <li> structure, which led to unexpected complications, especially when referencing elements.
This resulted in a certain mess in the code. There is some uncertainty regarding the separation of preperDomEvents from the rest of the code, which was done somewhat clumsily. There are also errors that I completely don't understand, and yet, fixing them seems to break the functionality.
The project was not fully designed from start to finish. Many CSS class names were created improvisationally. Several functionalities were added along the way, such as the ability to save the to-do list as a JSON file and load it back. This taught me the importance of creating a separate CSS file for organizing repetitive elements like buttons, paragraphs, etc.
I created the function responsible for creating and loading the JSON file using GPT chat.