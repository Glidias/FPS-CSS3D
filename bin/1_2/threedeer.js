/**
 * ...
 * @author Glidias
 */

function CSS3D() {

        var camera, scene;
		this.getCamera = function() {
			return camera;
		};
		var _preRender= function() {};
       this.preRender = function(val) {
		  _preRender = val;
	   }
        var controls;
         var clock = new THREE.Clock();
		 
        var screenWidth, screenHeight;

        //CSS3D vars:
        var screenWhalf, screenHhalf;
        var divCSSWorld, divCSSCamera;
        var divCube;
        var fovValue;

		this.getFocalLength = function() {
			return fovValue;
		}

        function start() {
            init();
            initCSS3D();
            render();
        }
		this.start = start;

        function init() {

            screenWidth = 900;
            screenHeight = 600;

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(55, screenWidth / screenHeight, 1, 10000);
            camera.position.set(0, -150, 220);
            scene.add(camera);

            //Camera Controls
			///*
            controls = new THREE.FirstPersonNavigationControls(camera);
			
			
			var browser=navigator.appName;


var navindex=navigator.userAgent.indexOf('Safari');
var ffindex = navigator.userAgent.indexOf('Chrome');
var ffindex2 = navigator.userAgent.indexOf('Firefox');
//if (ffindex==-1 && ffindex2 == -1 && (navindex != -1 || browser=='Safari')) { document.getElementById("FPSWorld").style.display = "none"; document.getElementById("FPSWorld_NoShade").style.display = "block";  }
//else {  document.getElementById("FPSWorld").style.display = "block"; document.getElementById("FPSWorld_NoShade").style.display = "none";  }
        
			
		//	*/
		}
		
		function render() {
			requestAnimationFrame( render );
			
			var delta = clock.getDelta();
			controls.update(delta);
			
			camera.updateMatrixWorld();
			camera.matrixWorldInverse.getInverse( camera.matrixWorld );
        
			
			_preRender();
            setCSSCamera(camera, fovValue);
        }
		
		
        /************************************************************************/
        /* Initialized some variables for CSS, and also it computes the initial

        position for the CSS cube based on the Three Cube */
        /************************************************************************/
        function initCSS3D() {
            screenWhalf = screenWidth / 2;
            screenHhalf = screenHeight / 2;

            divCSSWorld = document.getElementById('css-world');
            divCSSCamera = document.getElementById('css-camera');
           // divCube = document.getElementById('shape');

            fovValue = 0.5 / Math.tan(camera.fov * Math.PI / 360) * screenHeight;
			setCSSWorld();

           // setDivPosition(divCube, glCube);
		//   setDefaultDivPosition(divCube);
        }

        /************************************************************************/
        /* Applies CSS3 styles to the css-world div                             */
        /************************************************************************/
        function setCSSWorld() {
            divCSSWorld.style.WebkitPerspective = fovValue + "px";
            divCSSWorld.style.WebkitPerspectiveOrigin = "50% 50%";
            divCSSWorld.style.MozPerspective = fovValue + "px";
            divCSSWorld.style.MozPerspectiveOrigin = "50% 50%";
        }

        /************************************************************************/
        /*  Applies CSS3 styles to css-camera div                               */
        /************************************************************************/
        function setCSSCamera(camera, fovValue) {
            var cameraStyle = getCSS3D_cameraStyle(camera, fovValue);
            divCSSCamera.style.WebkitTransform = cameraStyle;
            divCSSCamera.style.MozTransform = cameraStyle;
        }

        /************************************************************************/
        /* Return the CSS3D transformations from the Three camera               */
        /************************************************************************/
        function getCSS3D_cameraStyle(camera, fov) {
            var cssStyle = "";
            cssStyle += "translate3d(0,0," + epsilon(fov) + "px) ";
            cssStyle += toCSSMatrix(camera.matrixWorldInverse, false);
            cssStyle += " translate3d(" + screenWhalf + "px," + screenHhalf + "px, 0)";
            return cssStyle;
        }

        /************************************************************************/
        /* Fixes the difference between WebGL coordinates to CSS coordinates    */
        /************************************************************************/
        function toCSSMatrix(threeMat4, b) {
            var a = threeMat4, f;
            if (b) {
                f = [a.n11, -a.n21, a.n31, a.n41, a.n12, -a.n22, a.n32, a.n42, a.n13, -a.n23, a.n33, a.n43, a.n14, -a.n24, a.n34, a.n44, ]
            } else {
                f = [a.n11, a.n21, a.n31, a.n41, a.n12, a.n22, a.n32, a.n42, a.n13, a.n23, a.n33, a.n43, a.n14, a.n24, a.n34, a.n44, ]
            }
            for (var e in f) {
                f[e] = epsilon(f[e])
            }
            return "matrix3d(" + f.join(",") + ")"
        }

        /************************************************************************/
        /* Computes CSS3D transformations based on a Three Object                */
        /************************************************************************/
        function setDivPosition(cssObject, glObject) {
            var offset = 400; //value to offset the cube
            glObject.updateMatrix();
            cssObject.style.position = "absolute";
            //Webkit:
            cssObject.style.WebkitTransformOrigin = "50% 50%";
            cssObject.style.WebkitTransform = CSStransform(200 + offset, 200, glObject.matrix);
            //Mozilla:
            cssObject.style.MozTransformOrigin = "50% 50%";
            cssObject.style.MozTransform = CSStransform(200 + offset, 200, glObject.matrix);
        }
		
		function setDefaultDivPosition(cssObject) {
			var z = -fovValue;  // away from camera
			var y = 0;  // screenHhalf up
			var x= 0; // screenWhalf right
			cssObject.setAttribute("style", "position: absolute; -webkit-transform-origin: 50% 50%; -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, "+x+", "+y+", "+z+", 1)"); 
		}

        /************************************************************************/
        /* Helper function to convert to CSS3D transformations                  */
        /************************************************************************/
        function CSStransform(width, height, matrix) {
            var scale = 1.0;
            return [toCSSMatrix(matrix, false),
            "scale3d(" + scale + ", -" + scale + ", " + scale + ")",
            "translate3d(" + epsilon(-0.5 * width) + "px," + epsilon(-0.5 * height) + "px,0)"].join(" ");
        }

        /************************************************************************/
        /* Rounding error                                                       */
        /************************************************************************/
        function epsilon(a) {
            if (Math.abs(a) < 0.000001) {
                return 0
            }
            return a;
        }
	
}