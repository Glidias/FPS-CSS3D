/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * If it is not possible or desirable to put the notice in a particular file, then You may include the notice in a location (such as a LICENSE file in a relevant directory) where a recipient would be likely to look for such a notice.
 * You may add additional accurate notices of copyright ownership.
 *
 * It is desirable to notify that Covered Software was "Powered by AlternativaPlatform" with link to http://www.alternativaplatform.com/ 
 * */

package a3d;

	//import alternativa.engine3d.core.Camera3D;
	//import alternativa.engine3d.core.Object3D;

	import jeash.geom.Matrix3D;
	import jeash.geom.Point;
	import jeash.geom.Vector3D;
	
	import glidias.TypeDefs;


	/**
	 * Object3D controller WITHOUT input view 
	 */
	class SimpleObjectController {
	
	/**
		 * Speed.
		 */
		public var speed:Float;
		
		/**
		 * Speed multiplier for acceleration mode.
		 */
		public var speedMultiplier:Float;
		
		private var mouseLook:Bool;
		
		/**
		 * Mouse sensitivity.
		 */
		public var mouseSensitivity:Float;
		
		/**
		 * The maximal slope in the vertical plane in radians.
		 */
		public var maxPitch:Float;
		
		/**
		 * The minimal slope in the vertical plane in radians.
		 */
		public var minPitch:Float;

		private var _object:Object3D;
	
		public var _up:Bool;
		public var _down:Bool;
		public var _forward:Bool;
		public var _back:Bool;
		public var _left:Bool;
		public var _right:Bool;
		public var _accelerate:Bool;
	
		private var displacement:Vector3D;

		private var objectTransform:Vector<Vector3D>;
		
		public var eventSource:Dynamic;
		public var mousePoint:Point;
		
		private var _vin:Vector<Float>;  // todo: get correct size of array
		private var _vout:Vector<Float>;
		
		
	
	
		public function new(object:Object3D, speed:Float=16, speedMultiplier:Float = 3, mouseSensitivity:Float = 1) {
			eventSource = { };
			maxPitch = 1e+22;
			minPitch = -1e+22;
			
			mousePoint = new Point();
			
			_vin = [.0, .0, .0];
			_vout = [.0,.0,.0];
		
			_up = false;
			_down = false;
			_forward = false;
			_back = false;
			_left = false;
			_right = false;
			_accelerate = false;
				
			mouseLook = true;
			
			displacement = new Vector3D();
			
			this._object = object;
			this.speed = speed;
			this.speedMultiplier = speedMultiplier;
			this.mouseSensitivity = mouseSensitivity;
	
		}
	
		
	
	
	
		/**
		 * Enables mouse look mode.
		 */
		public function startMouseLook():Void {
			mousePoint.x = eventSource.mouseX;
			mousePoint.y = eventSource.mouseY;
			mouseLook = true;
		}
	
		/**
		 * Disables mouse look mode.
		 */
		public function stopMouseLook():Void {
			mouseLook = false;
		}
	
		
		/**
		 * Target of handling.
		 */
		public function getObject():Object3D {
			return _object;
		}
	
		/**
		 * @private
		 */
		public function setObject(value:Object3D):Void {
			_object = value;
			updateObjectTransform();
		}
	
		/**
		 * Refreshes controller state from state of handled object. Should be called if object was moved without the controller (i.e. <code>object.x = 100;</code>).
		 */
		public function updateObjectTransform():Void {
			if (_object != null) objectTransform = _object.matrix.decompose();
		}
	
		/**
		 * Calculates and sets new object position.
		 */
		public function update(frameTime:Float):Void {
			if (_object == null) return;
	
		
			var moved:Bool = false;
	
			if (mouseLook) {
				var dx:Float = eventSource.mouseX - mousePoint.x;
				var dy:Float = eventSource.mouseY - mousePoint.y;
				mousePoint.x = eventSource.mouseX;
				mousePoint.y = eventSource.mouseY;
				var v:Vector3D = objectTransform[1];
				v.x -= dy*Math.PI/180*mouseSensitivity;
				if (v.x > maxPitch) v.x = maxPitch;
				if (v.x < minPitch) v.x = minPitch;
				v.z -= dx*Math.PI/180*mouseSensitivity;
				moved = true;
			}
	
			displacement.x = _right ? 1 : (_left ? -1 : 0);
			displacement.y = _forward ? 1 : (_back ? -1 : 0);
			displacement.z = _up ? 1 : (_down ? -1 : 0);
			if (displacement.lengthSquared > 0) {
				//if (_object is Camera3D) {
					var tmp:Float = displacement.z;
					displacement.z = displacement.y;
					displacement.y = -tmp;
				//}
				deltaTransformVector(displacement);
				if (_accelerate) displacement.scaleBy(speedMultiplier*speed*frameTime/displacement.length);
				else displacement.scaleBy(speed*frameTime/displacement.length);
				objectTransform[0].incrementBy(displacement);
				moved = true;
			}
	
			if (moved) {
				var m:Matrix3D = new Matrix3D();
				m.recompose(objectTransform);
				_object.matrix = m;
			}
		}
	
		/**
		 * Sets object at given position.
		 * @param pos The position.
		 */
		public function setObjectPos(pos:Vector3D):Void {
			if (_object != null) {
				var v:Vector3D = objectTransform[0];
				v.x = pos.x;
				v.y = pos.y;
				v.z = pos.z;
			}
		}
	
		/**
		 * Sets object at given position.
		 * @param x  X.
		 * @param y  Y.
		 * @param z  Z.
		 */
		public function setObjectPosXYZ(x:Float, y:Float, z:Float):Void {
			if (_object != null) {
				var v:Vector3D = objectTransform[0];
				v.x = x;
				v.y = y;
				v.z = z;
			}
		}
	
		/**
		 * Sets direction of Z-axis of handled object to pointed at given place. If object is a camera, it will look to this direction.
		 * @param point Point to look at.
		 */
		public function lookAt(point:Vector3D):Void {
			lookAtXYZ(point.x, point.y, point.z);
		}
	
		/**
		 * Sets direction of Z-axis of handled object to pointed at given place. If object is a camera, it will look to this direction.
		 * @param x  X.
		 * @param y  Y.
		 * @param z  Z.
		 */
		public function lookAtXYZ(x:Float, y:Float, z:Float):Void {
			if (_object == null) return;
			var v:Vector3D = objectTransform[0];
			var dx:Float = x - v.x;
			var dy:Float = y - v.y;
			var dz:Float = z - v.z;
			v = objectTransform[1];
			v.x = Math.atan2(dz, Math.sqrt(dx*dx + dy*dy));
			//if (_object is Camera3D) 
					v.x -= 0.5*Math.PI;
			v.y = 0;
			v.z = -Math.atan2(dx, dy);
			var m:Matrix3D = _object.matrix;
			m.recompose(objectTransform);
			_object.matrix = m;
		}
	

	
		private function deltaTransformVector(v:Vector3D):Void {
			_vin[0] = v.x;
			_vin[1] = v.y;
			_vin[2] = v.z;
			_object.matrix.transformVectors(_vin, _vout);
			var c:Vector3D = objectTransform[0];
			v.x = _vout[0] - c.x;
			v.y = _vout[1] - c.y;
			v.z = _vout[2] - c.z;
		}
		
	
		/**
		 * Starts and stops move forward according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveForward(value:Bool):Void {
			_forward = value;
		}

		/**
		 * Starts and stops move backward according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveBack(value:Bool):Void {
			_back = value;
		}

		/**
		 * Starts and stops move to left according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveLeft(value:Bool):Void {
			_left = value;
		}

		/**
		 * Starts and stops move to right according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveRight(value:Bool):Void {
			_right = value;
		}

		/**
		 * Starts and stops move up according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveUp(value:Bool):Void {
			_up = value;
		}

		/**
		 * Starts and stops move down according to  <code>true</code> or <code>false</code> was passed.
		 * @param value Action switcher.
		 */
		public inline function moveDown(value:Bool):Void {
			_down = value;
		}
	
		/**
		 * Switches acceleration mode.
		 * @param value <code>true</code> turns acceleration on, <code>false</code> turns off.
		 */
		public inline function accelerate(value:Bool):Void {
			_accelerate = value;
		}
	
}
