package wonderfl.utils 
{
	import alternativa.engine3d.core.Camera3D;
	import alternativa.engine3d.core.Face;
	import alternativa.engine3d.core.Object3D;
	import alternativa.engine3d.core.Object3DContainer;
	import alternativa.engine3d.alternativa3d;
	import alternativa.engine3d.core.Vertex;
	import alternativa.engine3d.core.Wrapper;
	import alternativa.engine3d.materials.FillMaterial;
	import alternativa.engine3d.materials.Material;
	import alternativa.engine3d.materials.TextureMaterial;
	import alternativa.engine3d.objects.Mesh;
	import flash.geom.Matrix3D;
	import flash.geom.Vector3D;
	use namespace alternativa3d;
	/**
	 * ...
	 * @author Glenn Ko
	 */
	public class A3DToCSSUtil 
	{
		private var targetRootSpace:Object3DContainer = null;
		private static const MATRIX_FIX:Matrix3D = new Matrix3D(new <Number>[-1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1]);
		public var imgUrlPrefix:String = "";
		
		/**
		 * Use this method to extract out the full HTML! 
		 * @param	scene
		 * @return Raw HTML output of entire scene
		 */
		public function getHTML(scene:Object3DContainer):String {
			targetRootSpace = scene;
		
			// look for camera
			//
			var sceneXML:XML = processList(scene);
			 sceneXML["@class"] = "root Object3DContainer Object3D";
			// sceneXML.@style = "";// getMatrixStyle(precisionMatrix(MATRIX_FIX));
			 delete sceneXML.@style;
			return sceneXML.toXMLString().split("/>").join("></div>");
		}
		
		private function processList(list:Object3DContainer):XML 
		{
			var holder:XML = <div class="Object3DContainer Object3D" style={getObjStyle(list)}></div>;
			processXMLObj(list, holder);
			
			for (var c:Object3D = list.childrenList; c != null; c = c.next) {
				if (c is Object3DContainer) {
					holder.appendChild( processList(c as Object3DContainer) );
				}
				else if (c is Mesh) {
					
					holder.appendChild( processMesh(c as Mesh) );
				}
				else if (c is Camera3D) {
					
				}
				else {
					//throw new Error("A"+c);
				}
			}
			
			return holder;
		}
		
		private function getObjStyle(list:Object3D):String 
		{
			var mat:Matrix3D = list.matrix;
			//return  getMatrixStyle(convertNestedObjMatrix(mat) ) + ");";
			return  getMatrixStyle(list._parent == targetRootSpace ? convertPlaneMatrix(mat) : convertNestedObjMatrix(mat) ) + ");";
		}
		
		private function processXMLObj(obj:Object3D, xml:XML):void {
			var split:Array;
			if (obj.name != null) {
				if (obj.name.charAt(0) != "#") {
					xml["@class"] = obj.name.split(".").join(" ") + " " +String( xml["@class"] );
				}
				else {
					split = obj.name.slice(1).split(".");
					xml.@id = split[0];
					split.shift();
					if (split.length > 0) {
						xml["@class"] =split.join(" ") + " " +String( xml["@class"] );
					}
				}
			}
		}
		
		private function processMesh(mesh:Mesh):XML {
			var holder:XML = <div class="Mesh Object3D" style={getObjStyle(mesh)}></div>;
			processXMLObj(mesh, holder);
			var divArr:Array = [];
			var arr:Array = getMeshPlanes(mesh);
			for (var i:int = 0; i < arr.length; i++) { 
				var obj:Object = arr[i];
				var xmler:XML =<div class="plane" style={getCSSStyle(obj)}></div>;
				holder.appendChild(xmler);
				//var xmlStr:String = xmler.toXMLString();
				//divArr.push(xmlStr.slice(0,xmlStr.length -2)+"></div>");
			}
			return holder;
		}
		
		private function getCSSStyle(obj:Object):String {
			return getMaterialPrefix(obj) + "width:" + obj.matWidth + "px; height:" + obj.matHeight + "px; -webkit-transform:matrix3d("+(obj.matrix2 as Matrix3D).rawData.join(",") + ");";
		}
		
		private function getMatrixStyle(rawData:Vector.<Number>):String {
			return "-webkit-transform:matrix3d(" + rawData.join(",");
		}
		
		private function getMaterialPrefix(obj:Object):String {
			return ( obj.material is TextureMaterial ? "background-image:url(" + imgUrlPrefix+obj.material.diffuseMapURL + "); background-position:" + (obj.uOffset || "0") + "px " + (obj.vOffset || "0") + "px; "  : obj.material is FillMaterial ? getFillMaterialPrefix(obj.material as FillMaterial)  : ""  );
		}
		
		private function getFillMaterialPrefix(mat:FillMaterial):String {
			var str:String = "background-color:#" + getNumberAsHexString(mat.color) + ";"
			if (mat.lineThickness >= 0) {
				str += "border-color:#" + getNumberAsHexString(mat.lineColor) + ";"
				str += "border-thickness:#" + precision(mat.lineThickness, 1) + ";"
			}	
			return str;
		}
		
		 private function getNumberAsHexString(number:uint, minimumLength:uint = 1):String {
                // The string that will be output at the end of the function.
                var string:String = number.toString(16).toUpperCase();
                
                // While the minimumLength argument is higher than the length of the string, add a leading zero.
                while (minimumLength > string.length) {
                        string = "0" + string;
                }
   
                return string;
        }
		
		
		
		// Iterates through mesh geometry, assuming all faces of the mesh are plane quads, and 
		// prepares a data-format list of planes based on those faces, that can be used in CSS or A3D.
		private function getMeshPlanes(mesh:Mesh, uvThreshold:Number=0.001):Array {
			var vec:Vector3D = new Vector3D();
			var vec2:Vector3D = new Vector3D();
			var arr:Array = [];
		
			
			var av:Vector3D = new Vector3D();
			var av2:Vector3D = new Vector3D();

			for (var f:Face = mesh.faceList; f != null; f = f.next) {
				//if (f.vertices.length != 4) throw new Error("Need to be a quad!");
				var w:Wrapper;
				var v:Vertex;
				var e1:Vertex = null;
				var e2:Vertex= null;
				var e3:Vertex= null;
				var e4:Vertex = null;
				
				var lastV:Vertex = f.wrapper.vertex;
				
				for ( w = f.wrapper.next; w != null; w = w.next) {
					v = w.vertex;
					if (Math.abs(lastV.v - v.v) > uvThreshold) { // v coordinate mainly to get image height res
						// found edge
						e3 = v;
						e4 = lastV;
						
					}
					if (Math.abs(lastV.u - v.u) > uvThreshold) {  // this wont account for flipped u coordinate cases
						// found top edge
						e1 = v;
						e2 = lastV;
					}
					if (e1!=null && e3 != null) break;
					lastV = v;
				}
				if (e1 == null || e3 == null) throw new Error("Could not find edges:"+e1 + ", "+e3);
			
				var pos:Boolean;
				var matWidth:Number; 
				var matHeight:Number;
				
				
				
				var posVertex:Vertex = e1;
				vec.x =e1.x - e2.x;
				vec.y =e1.y - e2.y;
				vec.z =e1.z - e2.z;
				var planeWidth:Number = vec.length;
			
			
				vec.normalize();
				vec2.x = f.normalX;
				vec2.y = f.normalY;
				vec2.z = f.normalZ;
				
				
				var vec3:Vector3D = vec.crossProduct(vec2);
				
				av.x = e3.x;
				av.y = e3.y;
				av.z = e3.z;
				
				av2.x = e4.x;
				av2.y = e4.y;
				av2.z = e4.z;
				
				
				//pos = e4.v > e3.v;
				var planeHeight:Number = av2.subtract(av).length;
				
				
				vec.negate();
				
				// align center doesn't work too well with CSS due to scale to screen pixel inaccruacies
				/*
				var newVert:Vertex = new Vertex();
				var uDir:Vector3D = vec.clone(); 
				var vDir:Vector3D = vec3.clone();
				uDir.scaleBy(planeWidth*.5);
				vDir.scaleBy(-planeHeight*.5);
				
				newVert.x = posVertex.x + uDir.x + vDir.x;
				newVert.y = posVertex.y + uDir.y + vDir.y;
				newVert.z = posVertex.z + uDir.z + vDir.z;
				posVertex = newVert;
				*/
				
				var a3dMatrix:Matrix3D = createMatrixA3D(vec, vec3, vec2, posVertex);
				var cssMatrix:Matrix3D =  new Matrix3D(convertNestedObjMatrix(a3dMatrix));
				

			
			var data:Vector.<Number> = cssMatrix.rawData;
			data[8] = -data[8];
			data[9] = -data[9];
			data[10] = -data[10];
			cssMatrix.rawData = data;
			
				//mesh._parent == targetRootSpace ?  new Matrix3D(convertPlaneMatrix(a3dMatrix)) : new Matrix3D(convertNestedObjMatrix(a3dMatrix));
				
				if (f.material is TextureMaterial) {
					if ( (f.material as TextureMaterial)._texture) { 
						matWidth = (f.material as TextureMaterial)._texture.width;
						matHeight = (f.material as TextureMaterial)._texture.height;
					
					}
					else {
						throw new Error("Texture Material not loaded yet! Can't find width and height");
						matWidth = planeWidth;
						matHeight = planeHeight;
					}
				}
				else {
					matWidth = planeWidth;
					matHeight = planeHeight;
				}
				
				//var uRes:Number = matWidth / planeWidth / (e2.u - e1.u);
				//var vRes:Number = matHeight / planeHeight / (e4.v - e3.v);  
				
				matWidth = Math.round( Math.abs(e2.u - e1.u) * matWidth);
				matHeight = Math.round(Math.abs(e4.v - e3.v) * matHeight);
				
				//cssMatrix.prependTranslation( matWidth * .5 * planeWidth/matWidth, matHeight * .5*planeHeight / matHeight, 0);
				cssMatrix.prependScale(planeWidth/matWidth, 1, 1);
				cssMatrix.prependScale(1, planeHeight / matHeight, 1);
				
				
				
			
				var lineThickness:Number = f.material is FillMaterial ? (f.material as FillMaterial).lineThickness : 0;
				lineThickness = lineThickness > 0 ? lineThickness : 0;
				
				arr.push( { matrix:a3dMatrix,  matrix2:cssMatrix, matWidth: matWidth - lineThickness, matHeight:matHeight - lineThickness, width:planeWidth, height:planeHeight, material:f.material, uOffset:-e1.u*matWidth, vOffset:-e3.v*matHeight } );
			}
		
			return arr;
		}
		
		// convert centered origin plane primitive to top left plane primitive
		private function leftTopPlane(plane:Mesh):void {
			
			
			dummy.matrix = new Matrix3D();
			dummy.x = plane.boundMaxX;
			dummy.y = -plane.boundMaxY;
			
			dummy.composeMatrix();
			TransformMacros.transformMesh(plane, dummy);
		}
		
		private function createMatrixA3D(right:Vector3D, up:Vector3D, look:Vector3D, translation:Vertex = null):Matrix3D {
	translation = translation || new Vertex();
	var data:Vector.<Number> = new Vector.<Number>(16, true);
			data[0] = right.x;  data[4] = up.x;  data[8] = look.x;   data[12] = 0;
			data[1] = right.y; data[5] = up.y;   data[9] = look.y;   data[13] = 0;
			data[2] = right.z; data[6] = up.z;   data[10] = look.z;   data[14] = 0;
			data[3] = 0; data[7] = 0 ;  data[11] =0;   data[15] =1;
			
			var mat:Matrix3D = new Matrix3D();
			mat.rawData = data;	
			mat.appendTranslation(translation.x, translation.y, translation.z);
			
			return mat;
}
		
		private var dummy:Object3D = new Object3D();
		private function convertPlaneMatrix(matrix:Matrix3D):Vector.<Number> {
			
			
			dummy.matrix = matrix;
			
			// Flip euler y and z values first for left-handed coordinate system
			dummy.rotationY *= -1;
			dummy.rotationZ *= -1;
			dummy.y *= -1;
			dummy.z *= -1;
			
			 // append matrix rotation fix to new matrix
			var mat:Matrix3D = dummy.matrix;
		
			mat.append(MATRIX_FIX); 
			return precisionMatrix(mat);
			
		}
		private function convertPlane(plane:Object3D):Vector.<Number> {
			return convertPlaneMatrix(plane.matrix);
		}
		
		private function convertNestedObjMatrix(matrix:Matrix3D):Vector.<Number> {
			dummy.matrix = matrix;
			dummy.rotationY *= -1;
			dummy.rotationZ *= -1;
			dummy.y *= -1;
			dummy.z *= -1;
			
			return precisionMatrix(dummy.matrix);
		}
		private function convertNestedObj(plane:Object3D):Vector.<Number> {
			return convertNestedObjMatrix(plane.matrix);
		}
		
		private function precisionMatrix(mat:Matrix3D):Vector.<Number> {
			var data:Vector.<Number>  = mat.rawData;
			const PRECISION_AMT:uint = 4;
			for (var i:int = 0; i < 16; i++) {
				data[i] = precision( data[i], PRECISION_AMT );
			}
			return data.concat();
		}
		private  function precision(val:Number, decimalPlaces:uint):Number{
            var multiplier:uint = Math.pow(10, decimalPlaces);
            var truncatedVal:Number = val*multiplier;

            if (truncatedVal > int.MAX_VALUE){

                       return Number(truncatedVal.toFixed(decimalPlaces));
            }              
            return int(truncatedVal)/multiplier;

		}
		
	}

}

import alternativa.engine3d.core.Object3D;
	import alternativa.engine3d.alternativa3d;
	import alternativa.engine3d.core.Vertex;
	import alternativa.engine3d.objects.Joint;
	import alternativa.engine3d.objects.Mesh;
	import alternativa.engine3d.objects.Skin;
	import flash.geom.Matrix3D;
	import flash.geom.Vector3D;

	use namespace alternativa3d;
	/**
	 * Use alternativa3d v7 routines for transformations
	 * @author Glidias
	 */
	 class TransformMacros 
	{
		//private static const DUMMY:Object3D = new Object3D();
		
		public static function calculateLocalToGlobalJ(local:Joint):void {
		
			local.composeMatrix();
			var p:Joint = local._parentJoint;
			
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parentJoint;
			}
			
		}
		
		public static function calculateLocalToGlobalJ3(local:Joint, skin:Skin, parent:Object3D):void {
		
			local.composeMatrix();
			var p:Object3D = local._parentJoint;
			
			while (p != null && p != parent ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = (p is Joint) ? (p as Joint)._parentJoint || skin : p._parent;
			}
			
		}
		
		public static function transformPositions(list:Object3D, transform:Object3D):void {
			while (list != null) {
				var x:Number = list.x;
				var y:Number = list.y;
				var z:Number = list.z;
				list.x = list.x * transform.ma + list.y * transform.mb + list.z * transform.mc + transform.md;
				list.y = list.x * transform.me + list.y * transform.mf + list.z * transform.mg + transform.mh;
				list.z = list.x * transform.mi + list.y * transform.mj + list.z * transform.mk + transform.ml;
				list = list.next;
			}
		}
		
		public static function transformPosition(pos:Vector3D, transform:Object3D):void {
			var x:Number = pos.x;
			var y:Number = pos.y;
			var z:Number = pos.z;
			pos.x = x * transform.ma + y * transform.mb + z * transform.mc + transform.md;
				pos.y = x * transform.me + y * transform.mf +z * transform.mg + transform.mh;
				pos.z = x * transform.mi + y * transform.mj + z * transform.mk + transform.ml;
		}
		
		public static function calculateLocalToGlobalJ3_2(local:Joint, skin:Skin, nullSpace:Object3D):void {
		
			local.composeMatrix();
			var p:Object3D = local._parentJoint;
			
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = (p is Joint) ? (p as Joint)._parentJoint || skin : p._parent;
			}
			nullSpace.composeMatrix();
			local.appendMatrix(nullSpace);
		}
		
		public static function copyTransform(copier:Object3D, target:Object3D):void {
			copier.ma = target.ma;
			copier.mb = target.mb;
			copier.mc = target.mc;
			copier.md = target.md;
			copier.me = target.me;
			copier.mf = target.mf;
			copier.mg = target.mg;
			copier.mh = target.mh;
			copier.mi = target.mi;
			copier.mj = target.mj;
			copier.mk = target.mk;
			copier.ml = target.ml;
		}
		
		private static const MATRIX:Matrix3D = new Matrix3D();
		private static const RAW_DATA:Vector.<Number> = (new Matrix3D()).rawData;
		
		public static function getMatrix3D(transform:Object3D):Matrix3D {
			/*
			transform = new Object3D();  // for testing only
			transform.rotationX = 1.4;
			transform.rotationY = .2;
			transform.rotationZ = .4;
			transform.x = 19950;
			transform.y = 29930;
			transform.z = 39990;
			transform.composeMatrix();
			*/
			
			const data:Vector.<Number> = RAW_DATA;
			///*
			data[0] =  transform.ma;  data[1] = transform.me;  data[2] = transform.mi;   data[3] = 0;
			data[4] =  transform.mb;  data[5] = transform.mf;   data[6] = transform.mj;   data[7] = 0;
			data[8] =  transform.mc;  data[9] = transform.mg;   data[10] =transform.mk;   data[11] = 0;
			data[12] = transform.md;  data[13] = transform.mh;  data[14] = transform.ml;   data[15] = 1;
			//*/
			//throw new Error(RAW_DATA + " >>>> " + transform.matrix.rawData);
			
			MATRIX.rawData = RAW_DATA;
										//MATRIX.appendTranslation(transform.md, transform.mh, transform.ml);
			return MATRIX;
		}
		
		public static function calculateLocalToGlobal(parent:Object3D, local:Object3D):void {
			local.composeMatrix();
			var p:Object3D = local._parent;
			while (p != null && p != parent) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parent;
			}
		}
		

		
		public static function calculateLocalToGlobalNull(local:Object3D):void {
			local.composeMatrix();
			var p:Object3D = local._parent;
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parent;
			}
		}
		
		public static function transformMesh(mesh:Mesh, transform:Object3D):void  {
			for (var v:Vertex = mesh.vertexList; v != null; v = v.next) {
				var x:Number = v.x;
				var y:Number = v.y;
				var z:Number = v.z;
				v.x = x * transform.ma + y * transform.mb + z * transform.mc + transform.md;
				v.y = x * transform.me + y * transform.mf + z * transform.mg + transform.mh;
				v.z = x * transform.mi + y * transform.mj + z * transform.mk + transform.ml;
			}
			mesh.calculateVerticesNormals();
			mesh.calculateBounds();
			mesh.calculateFacesNormals();
		}
		
	}


	