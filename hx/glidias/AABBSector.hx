package glidias;

import a3d.EllipsoidCollider;
import a3d.Geometry;
import a3d.IECollidable;
import jeash.geom.Vector3D;
import glidias.TypeDefs;

/**
 * ...
 * @author Glenn Ko
 */

class AABBSector implements IAABB, implements IECollidable
{
	// world bounds for sector residency/culling in 3d
	public var minX:Float;
	public var minY:Float;
	public var minZ:Float;
	
	public var maxX:Float;
	public var maxY:Float;
	public var maxZ:Float;
	
	public var portalWalls:Array<AABBPortalPlane>;   // portal plane groups
	
	
	public var renderId:Int;  // to ensure it doesnt get visited twice
	public var collisionId:Int;

	
	public var rect:Rectangle;  // 2d rectangle on minimap
	public var ceilHeight:Float;  // 3d ceiling height offset
	public var groundPos:Float;   // 3d ground position offfset
	
	// constants do NOT change! Indicates indices for cardinal direction-facing walls.
	public static var INDICES_WEST:Vector<Int> = [5,1,2,6];
	public static var INDICES_NORTH:Vector<Int> = [6,2,3,7];
	public static var INDICES_SOUTH:Vector<Int> = [4,0,1,5];
	public static var INDICES_EAST:Vector<Int> = [7,3,0,4];
	public static var INDICES_DOWNWARDS:Vector<Int> = [4,5,6,7];
	public static var INDICES_UPWARDS:Vector<Int> = [0, 3, 2, 1];
	public static var INDICES_LOOKUP:Vector<Vector<Int>> = {
		var indices:Vector<Vector<Int>> = new Vector<Vector<Int>>();
			#if (cpp||php)
					for (i in 0...6)) {
						indices[i] = 0;
					}
				#else
					untyped indices.length = 6;
				#end
		indices[AABBPortalPlane.EAST] = INDICES_EAST;
		indices[AABBPortalPlane.SOUTH] = INDICES_SOUTH;
		indices[AABBPortalPlane.NORTH] = INDICES_NORTH;
		indices[AABBPortalPlane.WEST] = INDICES_WEST;
		indices[AABBPortalPlane.DOWNWARDS] = INDICES_DOWNWARDS;
		indices[AABBPortalPlane.UPWARDS] = INDICES_UPWARDS;
		indices;
	};
	
	public var dom:Dynamic;
	public inline function setVis(val:Bool):Void {
		
		dom.style.visibility = val ? "visible" : "hidden";
	}
	
	public var geom:Geometry;
	

	public static var ID_COUNT:Int = 0;
	public var id:Dynamic;
	public function toString():String {
		return "Sector:" + id + ">>"+renderId;
	}
	
	public function new() 
	{
		id = ID_COUNT++;
		renderId = -999999999;	
		collisionId = -999999999;
		
		geom = new Geometry();
	}
	
	public function collectGeometry(collider:EllipsoidCollider):Void {
		var sphere:Vector3D = collider.sphere;
		var timestamp:Int = collider.timestamp;
		collisionId = timestamp;
		
		if ( AABBUtils.checkSphere(this, sphere) ) {
			collider.addGeometry(geom);
				
			var len = portalWalls.length;
			var port:AABBSector;
			
			var p:AABBPortalPlane;
			var ptl;
			var pl:Int;
			var portal:AABBPortal;
			
			
	
			
			
			for (i in 0...len) {
				p = portalWalls[i];
				//if ( AABBUtils.checkSphere(p, sphere) ) { // too unnecessary in most cases. opt out for now.
					ptl = p.portals;
					pl = ptl.length;
					for (u in 0...pl) {
						portal = ptl[u];
						if (AABBUtils.checkSphere(p, sphere)) {
							
							port = portal.target;
							if (port == null) continue;
							if (port.collisionId != timestamp && AABBUtils.checkSphere(port, sphere) ) {
							//	port.collectGeometry(collider);
							}
						}
					}
				//}
			}
		}
	}
	
	//private static var COUNT:Int = 0;
	// conveneint recursive method
	public  function checkVis(camPos:Vec3, buffer:AllocatorF<Frustum>, frus:Frustum, visibleSectors:ArrayBuffer<AABBSector>, renderId:Int):Void {
	//	if (COUNT == 0) 
		//COUNT++;
		
		setVis(true);
		this.renderId = renderId;  // prevent infinite render twice situations..
		visibleSectors.push(this);
		
		
		var p:AABBPortalPlane;
		var ptl;
		var pl:Int;
		var cp:Int;
		var portal:AABBPortal;
		var len = portalWalls.length;
		var port:AABBSector;
		var cFrus:Frustum;
	
		for (i in 0...len) {
			p = portalWalls[i];
			if ( frus.checkVisibility(p) ) {
				ptl = p.portals;
				pl = ptl.length;
				for (u in 0...pl) {
					portal = ptl[u];
					if (frus.checkVisibility(portal)) {
						port = portal.target;
						if (port == null) continue;
						if (port.renderId != renderId) {
							cFrus = buffer.get().setup4FromPortal(camPos.x, camPos.y, camPos.z, portal.points);
							cFrus.planes[4] = frus.planes[4];
							cFrus.planes[5] = frus.planes[5];
							port.checkVis(camPos, buffer, cFrus , visibleSectors,  renderId);
						}
					}
				}
			};
		}
	}
	
	
	public inline function setup(rect:Rectangle, gridSize:Float, height:Float, groundPos:Float = 0):Void {  
		AABBUtils.reset(this);
		portalWalls = new Array<AABBPortalPlane>();
		
		this.rect = rect;
		this.ceilHeight = height;
		this.groundPos = groundPos;
		
		var i:Int;
		
		var boundVerts:Vector<Float> = new Vector<Float>();
			#if (cpp||php)
					for (i in 0...(8 * 3)) {
						boundVerts[i] = 0;
					}
				#else
					untyped boundVerts.length = 8;
				#end
	
		
		
	
		// create 8 corner points of sector  using east and south vectors with rect, calculate bounds accordignly (<- stupid method, doh..)
		var east =  AABBPortalPlane.DIRECTIONS[AABBPortalPlane.EAST];
		var south =  AABBPortalPlane.DIRECTIONS[AABBPortalPlane.SOUTH];
		var up =  AABBPortalPlane.UP;
		var x:Float;
		var y:Float;
		var z:Float;
		

		var a:Float;
		var b:Float;
		var c:Float;
		
		
		// start bottom 4
		
		x = gridSize * rect.x;
		y = gridSize * rect.y;
		z = groundPos;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		AABBUtils.expand(a, b, c, this);
		i = 0*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		
		x = gridSize * (rect.x + rect.width);
		y = gridSize * rect.y;
		z = groundPos;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
	//	AABBUtils.expand(a, b, c, this);
		i = 1*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		
		x = gridSize * (rect.x + rect.width);
		y = gridSize * (rect.y + rect.height);
		z = groundPos;
		// 
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		AABBUtils.expand(a, b, c, this);
		i = 2*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		x = gridSize * rect.x;
		y = gridSize * (rect.y + rect.height);
		z = groundPos;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		//AABBUtils.expand(a, b, c, this);
		i = 3*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		
		// End bottom 4
		
		// now top 4
		
		x = gridSize * rect.x;
		y = gridSize * rect.y;
		z = groundPos + height;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		AABBUtils.expand(a, b, c, this);
		i = 4*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		x = gridSize * (rect.x + rect.width);
		y = gridSize * rect.y;
		z = groundPos + height;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		//AABBUtils.expand(a, b, c, this);
		i = 5*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		
		x = gridSize * (rect.x + rect.width);
		y = gridSize * (rect.y + rect.height);
		z = groundPos + height;
		// 
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		AABBUtils.expand(a, b, c, this);
		i = 6*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		x = gridSize * rect.x;
		y = gridSize * (rect.y + rect.height);
		z = groundPos + height;
		//
		a = east.x * x;
		b= east.y * x;
		c = east.z * x;
		a += south.x * y;
		b += south.y * y;
		c += south.z * y;
		a += up.x * z;
		b += up.y *z;
		c += up.z * z;
		//AABBUtils.expand(a, b, c, this);
		i = 7*3;
		boundVerts[i++] = a;
		boundVerts[i++] = b;
		boundVerts[i] = c;
		
		geom.pushVertices(boundVerts);
		
	}
	
	public inline function addWallFace(direction:Int):Void {
		geom.addFace( INDICES_LOOKUP[direction] );
	}
	
	
	public inline function getWallHTML(direction:Int, mat:String, gridSize:Float):String {
		return AABBPortalPlane.getPlaneResult(AABBPortalPlane.DIRECTIONS[direction], this, gridSize).getHTML(mat);
	}
	public inline function getCeilingHTML(mat:String, gridSize:Float):String {
		return AABBPortalPlane.getPlaneResult(AABBPortalPlane.UP.getReverse(), this, gridSize).getHTML(mat);
	}
	public inline function getFloorHTML(mat:String, gridSize:Float):String {
		return AABBPortalPlane.getPlaneResult(AABBPortalPlane.UP, this, gridSize).getHTML(mat);
	}
	
	
	public  function getPortalPlane(direction:Int):AABBPortalPlane {
			var len:Int = portalWalls.length;
			for (i in 0...len) {
				if (portalWalls[i].direction == direction) return portalWalls[i];
			}
			return null;
		}
	
	public function addPortal(portal:AABBPortal, direction:Int):Void {
		var portalPlane:AABBPortalPlane;
		if ( (portalPlane = getPortalPlane(direction))==null ) {
			portalPlane= new AABBPortalPlane();
			portalPlane.direction = direction;
			addPortalPlane(portalPlane);
		}
		portalPlane.addPortal(portal);
	}
	public inline function addPortalPlane(plane:AABBPortalPlane):Void {  
		portalWalls.push(plane);
	}
	
	public function getPortalList():Array<AABBPortal> {
		var arr:Array<AABBPortal> = [];
		for (i in 0...portalWalls.length) {
			var portalPlane:AABBPortalPlane = portalWalls[i];
			var portals:Array<AABBPortal> = portalPlane.portals;
			for (u in 0...portals.length) {
			
				arr.push(portals[u]);
			}
		}
		return arr;
	}

	
	
}