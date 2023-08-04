# CG Lab Project

Submission template for the CG lab project at the Johannes Kepler University Linz.

### Explanation

This `README.md` needs to be pushed to Github for each of the 3 delivery dates.
For every submission change/extend the corresponding sections by replacing the *TODO* markers. Make sure that you push everything to your Github repository before the respective deadlines. For more details, see the Moodle page.

## Concept submission due on 31.03.2023

### Group Members

|               | Student ID    | First Name  | Last Name      | E-Mail                     |
|---------------|---------------|-------------|----------------|----------------------------|
| **Student 1** | 12102754      | Michael     | Reinegger      | michael-reinegger@tuta.io  |
| **Student 2** | 00256733      | Stanislaus  | Silber         | nedwalain@yahoo.de         |

### Concept Submission due on 31.03.2023

Scene 1:
Video starts with a person (handmade Object) sitting in a room on a couch watching tv (spot light). There is a Plant in the room and the room has a window.

He stands up and goes to the next room (camera follows him) and in the kitchen he opens the fridge and stares at it angryly for a bit.

Scene 2:
After a few seconds the Person takes out a portal gun (like Rick and Morty and has a light source on it that moves with the gun) and creates a Portal on a wall.

Scene 3:
Now the person runs through the Portal and we switch the scene to a strange Planet (red Terrain generated with a height map).

Walks to ice cream stand and gets ice. Walks back through a second portal. (changed because otherwise to complex)

Scene4:
Back in the room. Portal opens above couch he falls down into the seat holding an ice cream.

He starts eating and the ice falls to the floor.

He looks at the camera angryly.

The End?


(Explain the basic story of your movie, i.e., planned scenes, what happens, which objects are used, etc.)

### Special Effects

Selected special effects must add up to exactly 30 points. Replace yes/no with either yes or no.

| Selected | ID | Name                                  | Points |
|----------|----|---------------------------------------|--------|
| no       | S1 | Multi texturing                       | 15     |  
| no       | S2 | Level of detail                       | 15     |
| no       | S3 | Billboarding                          | 15     |
| yes      | S4 | Terrain from heightmap                | 30     |
| no       | S5 | Postprocessing shader                 | 30     |
| no       | S6 | Animated water surface                | 30     |
| no       | S7 | Minimap                               | 30     |
| no       | S8 | Particle system (rain, smoke, fire)   | 30     |
| no       | S9 | Motion blur                           | 30     |
| no       | SO | Own suggestion (preapproved by email) | TODO   |

## Intermediate Submission due on 29.04.2023

Prepare a first version of your movie that:
 * is 30 seconds long,
 * contains animated objects, and
 * has an animated camera movement. 

Push your code on the day of the submission deadline. 
The repository needs to contain:
  * code/ Intermediate code + resources + libs
  * video/ A screen recording of the intermediate result

Nothing to change here in `README` file.

**Note:** You don’t need to use any lighting, materials, or textures yet. This will be discussed in later labs and can be added to the project afterwards!

## Final Submission due on 20.06.2023

The repository needs to contain:
  * code/ Documented code + resources + libs
  * video/ A screen recording of the movie
  * README.md


### Workload

| Student ID     | Workload (in %) |
| ---------------|-----------------|
| 12102754       | 70%             |
| 00256733       | 30%             |

Workload has to sum up to 100%.

### Effects

Select which effects you have implemented in the table below. Replace yes/no/partial with one of the options.
Mention in the comments column of the table where you have implemented the code and where it is visible (e.g., spotlight is the lamp post shining on the street). 

| Implemented    | ID | Name                                                                                                   | Max. Points | Issues/Comments |
|----------------|----|--------------------------------------------------------------------------------------------------------|-------------|-----------------|
| yes            | 1a | Add at least one manually composed object that consists of multiple scene graph nodes.                 | 6           | Person and Lamp |
| yes            | 1b | Animate separate parts of the composed object and also move the composed object itself in the scene.   | 4           | walking animation, portal gun animation, ice eat animation |
| yes            | 1c | Use at least two clearly different materials for the composed object.                                  | 3           | Yes different material nodes where used for textured parts and for the shoes |
| yes            | 1d | Texture parts of your composed object by setting proper texture coordinates.                           | 5           | everthing except head, ice cream, portla gun |
| yes            | 2a | Use multiple light sources.                                                                            | 5           | 2 spot lights (tv and portal gun), 2 normal lights (lamp in kitchen and "sun" on planet) |
| yes            | 2b | One light source should be moving in the scene.                                                        | 3           | "sun" moving on planet, spotlight on gun |
| yes            | 2c | Implement at least one spot-light.                                                                     | 10          | tv and portal gun |
| yes            | 2d | Apply Phong shading to all objects in the scene.                                                       | 4           | exept Portals for unnatural effect |
| yes            | 3  | The camera is animated 30 seconds without user intervention. Animation quality and complexity of the camera and the objects influence the judgement. | 10           |                 |
| yes            | S4 | Terrain from heightmap                                                                                 | 30        | terrain on planet in scene 2 |
| yes/no/partial | Sy | TODO Special Effect Name                                                                               | TODO        |                 |
| yes            | SE | Special effects are nicely integrated and well documented                                              | 20          |                 |

### Special Effect Description

Describe how the effects work in principle and how you implemented them. If your effect does not work but you tried to implement it, make sure that you explain this. Even if your code is broken do not delete it (e.g., keep it as a comment). If you describe the effect (how it works, and how to implement it in theory), then you will also get some points. If you remove the code and do not explain it in the README this will lead to 0 points for the effect and the integration SE.

#### Height Data
The height of the terrain is randomized by a seed using the seedrandom library.
This random height is pushed with the index i and j of the nested for loop into a position array. We also included a way to generate a flat side that just sets the height for x amount of loop iterations to a set height.

#### Indices
The indices are as simple as taking the i * (m+1) + j index, this index plus 1 and this index plus m. So, we have [i*(m+1)+j,  i*(m+1)+j+1,  i*(m+1)+j+1+m] as an index as well as  [i*(m+1)+j,  i*(m+1)+j+1,  i*(m+1)+j+2+m]. This is done  for each cell in the height map (excluding the last row and column), two triangles are created by connecting the current vertex with its adjacent vertices.

#### Normal Vectors
 We iterate over each cell in the heightmap and calculate the cross product of two vectors formed by its vertices. The resulting normal vectors are added to the corresponding vertices in the normal array. This is done by first getting the 3 vertices of a cell and calculating the vectors formed by them and using them to calculate the cross product. The resulting vector is then the normal vector of the plane formed by the 3 vertices. ([Helpful Resource](https://math.stackexchange.com/questions/2686606/equation-of-a-plane-passing-through-3-points)) This vector gets normalized and than we need to add the vector to the corresponding vertices.

#### Texture coordinates
Texture coordinates are rather trivial, as we just use the x and y coordinates of the grid and normalize them with the width and height to stay within 0-1.

