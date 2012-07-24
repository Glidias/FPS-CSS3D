/**
 * ...
 * @author Glidias
 */

function CSS3D() {

        var camera, scene;
		this.getCamera = function() {
			return camera;
		};
		this.getCamWorldMatrix = function() {
			return _camWorldMatrix;
		}
		var _preRender= function() {};
       this.preRender = function(val) {
		  _preRender = val;
	   }
	   var _postUpdate= function() {};
	    this.postUpdate = function(val) {
		  _postUpdate = val;
	   }
	   var _preUpdate= function() {};
	    this.preUpdate = function(val) {
		  _preUpdate = val;
	   }
        var controls;
		this.getControls = function() {
				return controls;
			};
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
		
		this.getFrustum = function() {
			return _frustum;
		};

        function init() {

            screenWidth = parseInt( $(document.getElementById("main-container")).css("width") ); 

            screenHeight = parseInt( $(document.getElementById("main-container")).css("height") ); 

			_frustum =  glidias.Frustum.create6();

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
		

		var _camWorldMatrix =  new Float32Array( 16 );
		var _frustum;
		
		function render() {
			requestAnimationFrame( render );
			
			var delta = clock.getDelta();
			
			_preUpdate();
			controls.update(delta);
			_postUpdate();
			
			// required before rendering
			camera.updateMatrixWorld();
			camera.matrixWorldInverse.getInverse( camera.matrixWorld );
			
			// calculate world frustum
			camera.matrixWorld.flattenToArray( _camWorldMatrix);
			
			
			//setup6FromWorldMatrix(te:Array<Float>, screenWhalf:Float, screenHhalf:Float, focalLength:Float, near:Float=0, far:Float=9999999999):Void {
	
			//
//var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
//var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
//var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
//var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

//21, 22, 23,24
			//	f = [a.n11, -a.n21, a.n31, a.n41, a.n12, -a.n22, a.n32, a.n42, a.n13, -a.n23, a.n33, a.n43, a.n14, -a.n24, a.n34, a.n44, ]
		//	_camWorldMatrix[1] = -_camWorldMatrix[1];
		//	_camWorldMatrix[5] = -_camWorldMatrix[5];
		//	_camWorldMatrix[9] = -_camWorldMatrix[9];
			//_camWorldMatrix[13] = -_camWorldMatrix[13];
			
			
			
			_frustum.setup6FromWorldMatrix( _camWorldMatrix, screenWhalf, screenHhalf, fovValue, 1, 99999999999 );
			//_frustum.calculateFrustum6( _camWorldMatrix, screenWhalf, screenHhalf, fovValue, 1, 99999999999 );
			
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