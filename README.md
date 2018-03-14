# demo-html5ui-for-cpp
The demo collection I used in my talk at "italian C++ day 2017" about
adding a html5 GUI to a C++ application.

## Content
The repository contains 4 main directories:
* src_low_level_proto: a sample with a websocket protocol based on UI events and commands
* src_high_level_proto: a sample with a websocket protocol based on domain model events and commands 
* demo_1: the compiled sample
* demo_2: the compiled sample packed with a shell script to start the application

The sources come with a visual studio project.
To compile the projects, you have to export environment variable BOOST and build with Visual Studio.
Anyway, you can use any decent modern C++ compiler (windows or linux) to compile the only source file
(main.cpp) providing the boost library path.

To start demo_1, you must launch ui_websocket.exe and then open index.html with the browser.

To start demo_2, it's enough to start softphone.cmd. When you close the UI, the server will be close automatically.

## Dependencies
The library depends on boost

## Contacts
You can use issues in the github project at http://github.com/daniele77/demo-html5ui-for-cpp
or contact me via twitter at @DPallastrelli