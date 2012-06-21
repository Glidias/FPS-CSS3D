CSS 3d FPS Experiments
--------------------

A prototype repository testbed to help create relatively advanced 3d scenes and animations (particularly VR experiences in first-person view) in pure CSS on an HTML page using just the DOM, for targetting platforms on webkit browers such as Chrome and Safari, on both desktop and mobile platforms. 

Features include:

1) Viewport/camera setup, with frustum/portal culling support to draw only what is visible within the scene.
2) Integration with legacy Alternativa3D version 7 engine on Flash platform to facilitate importing, previewing, managing and assembling of 3d scenes and animations that can be exported to HTML/CSS format.
3) Some viable old legacy Flash/Alternativa3D 7 code to port over to HTML/CSS for viewing on mobile broswers, mainly to support 3d environment procedural generation.

Currently, these versions are meant to work only on Google Chrome Canary Browser and Safari (for both Mobile and Desktop). Firefox is possible but not supported, since performance on that browser is abysmal. 
The current official chrome version has near-clipping vanishing issues with camera, which I hope they fix in future releases.

For desktop platforms, Flash as a fallback is still a consideration (especially with Molehill 3D support, player runtime, and more mature 3d libraries), so some code (particularly model/controller aspects) is built in Haxe to support both platforms.

WebGL (especially with THREE.JS) is also a target to seriously consider as well.