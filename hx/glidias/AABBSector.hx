package glidias;

/**
 * ...
 * @author Glenn Ko
 */

class AABBSector implements IAABB
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
	
	public var rect:Rectangle;  // 2d rectangle on minimap
	public var ceilHeight:Float;  // 3d ceiling height offset
	public var groundPos:Float;   // 3d ground position offfset
	
	
	public var dom:Dynamic;
	public inline function setVis(val:Bool):Void {
		dom.style.visibility = val ? "visible" : "hidden";
	}
	

	public static var ID_COUNT:Int = 0;
	public var id:Int;
	public function toString():String {
		return "Sector:" + id + ">>"+renderId;
	}
	
	public function new() 
	{
		id = ID_COUNT++;
		renderId = -999999999;	
		
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
		
		//minY = 0;
		//maxY = 256;
	
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