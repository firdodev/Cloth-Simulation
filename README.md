# Cloth Simulation

![](.git-assets/1.gif)

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Introduction

The cloth simulation in JavaScript implementation that simulates the behavior of a cloth in a virtual environment. It uses a combination of point masses and constraints to create the cloth-like movement and interactions.

## Usage

To use the cloth simulation, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/your-username/cloth-simulation.git
```
2. Open the index.html file in a web browser.

3. Interact with the cloth simulation by clicking and dragging the mouse.

## Configuration
The cloth simulation can be customized using the configuration options available. These options allow you to adjust various parameters of the simulation to achieve the desired behavior. The configuration options include:

* physics_accuracy: The accuracy of the physics simulation.
* mouse_influence: The influence of the mouse interaction on the cloth.
* mouse_cut: The distance at which the cloth is cut when the mouse interaction occurs.
* gravity: The strength of the gravitational force.
* cloth_height: The height of the cloth.
* cloth_width: The width of the cloth.
* start_y: The starting position of the cloth along the y-axis.
* spacing: The spacing between the points of the cloth.
* tear_distance: The maximum distance between points before the cloth tears.

You can modify these options in the `config.js` file to customize the behavior of the cloth simulation.

## License
The cloth simulation is licensed under the MIT License. You are free to use, modify, and distribute the code in accordance with the terms of the license.
