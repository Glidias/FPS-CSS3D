package glidias;
import a3d.Geometry;
import glidias.Int4;

/**
 * A group of portals that lie on the same plane (ie. face same direction) within an abbb sector. 
 * @author Glenn Ko
 */

class AABBPortalPlane implements IAABB
{
	// backface plane reject lookup index for normal direction
	public var direction:Int;
	
	// bound reject for space occupied by all portals
	public var minX:Float;
	public var minY:Float;
	public var minZ:Float;
	
	public var maxX:Float;
	public var maxY:Float;
	public var maxZ:Float;
	
	public var portals:Array<AABBPortal>;

	public function new() 
	{
		AABBUtils.reset(this);
		portals = new Array<AABBPortal>();
	}
	

	// -- Procedural generation helper methods
	
	public inline function addPortal(portal:AABBPortal):Void {
		AABBUtils.expand2(this, portal);
		portals.push(portal);
	}
	
		
	public static function norm(w:Int):Int 
	{
		return w != 0 ?  w < 0 ? -1 : 1 : 0;
	}
	

	public static inline function getPlaneResult(dir:Vec3, sector:AABBSector, gridSize:Float):PlaneResult {

		var south:Vec3 =  AABBPortalPlane.DIRECTIONS[AABBPortalPlane.SOUTH];
		var east:Vec3 =  AABBPortalPlane.DIRECTIONS[AABBPortalPlane.EAST];
		var upwards:Vec3 = AABBPortalPlane.UP;
		
		var rect:Rectangle = sector.rect;
		var planeResult:PlaneResult = new PlaneResult();
		dir = dir.clone();  // to feed new result into PlaneResult!
		
		var p:Float;
		var x:Float;
		var y:Float;
		var z:Float;
		var b:Int;
			
	
		
		// get cardinal direction
		var dirId:Int;
		if ((p=dir.dotProduct(south)) != 0) {  // vertical
			dirId = p < 0 ? NORTH : SOUTH;
			
		}
		else if ((p=dir.dotProduct(east)) != 0) {  // horizontal
			dirId = p < 0 ? WEST: EAST;
		}
		else {	// assumed floor/ceiling plane, where   dir.dotProduct(upwards) !=0
			if ( !((p=dir.dotProduct(upwards)) != 0) ) trace("Assumption failed for final dot up/down");
			dirId = p < 0 ? DOWNWARDS : UPWARDS;
	
		}
		
		var b:Int = OFFSET_BITMASKS[dirId];
		
		// get direction from right vector (using right-hand rule). THis can be precompiuted actually..
		// if zero length vector, than it;s parallel! (either floor or ceiling case:: so right = dir.crossProduct(SOUTH))
		//    	
		var up;

		var right:Vec3 = AABBPortalPlane.UP.crossProduct(dir);  
		if (right.lengthSquared() == 0) {
			right = dir.crossProduct(AABBPortalPlane.DIRECTIONS[SOUTH]);
				up = right.crossProduct(UP);
		}
		else {
			up = UP.getReverse();  // REVERSE BUG: dunno why need to reverse... GAH!!
		}
	
		
		planeResult.up = up;
		planeResult.right = right;
		planeResult.look = dir;
		
	
		
		if (dirId == UPWARDS || dirId == DOWNWARDS) {
			planeResult.width = rect.width * gridSize;  
			planeResult.height = rect.height * gridSize;
		}
		else { // only east/west would use rect.height as width of wall,  ceiling/floor and north/south walls uses rect.width.
			planeResult.width = dirId==EAST || dirId==WEST ?  rect.height * gridSize : rect.width * gridSize;  
			planeResult.height = sector.ceilHeight;
		}
		
	
		p = (rect.x + ( (b & BIT_WIDTH) !=0 ? rect.width : 0 )) * gridSize;
		x = east.x * p;
		y = east.y * p;
		z = east.z * p;
		
		p = (rect.y + ( (b & BIT_HEIGHT) !=0 ? rect.height : 0 )) * gridSize;
		x += south.x * p;
		y += south.y * p;
		z += south.z * p;
		
		///*
		p  = sector.groundPos + sector.ceilHeight - ( (b & BIT_CEILHEIGHT) !=0 ? sector.ceilHeight : 0 ); 
		x += upwards.x * p;
		y += upwards.y * p;
		z += upwards.z * p;
		//*/
	
		planeResult.pos = new Vec3(x , y, z);
		
		return planeResult;
	}

	public function addFaces(sector:AABBSector, gridSize:Float):Void {
		var planeResult:PlaneResult = getPlaneResult( AABBPortalPlane.DIRECTIONS[direction], sector, gridSize);
		var p:PlaneResult;
		//var html:String = planeResult.getOpenHTML(null);  // open html  , // no width, no height, no material, just a  planar container!
		
		var x:Float = 0;
		var y:Float = 0;
		var z:Float = 0;
		var width:Float =  planeResult.width;
		
		var doorwayHeight:Float = portals[0].height;  // ASSUMPTION, all portals same height.., this might change later
		var aboveDoorwayHeight:Float = planeResult.height - doorwayHeight;
		
	
		var geom = sector.geom;
		
		var pos:Vec3 = planeResult.pos;
		var right:Vec3 = planeResult.right.getReverse();  // REVERSE BUG: argh! need to get reverse for right
		var baseOffset:Float = pos.dotProduct(right);
		var down:Vec3 = planeResult.up;
	//	down.normalize();
		//right.normalize();
		
		var a:Int;
		var b:Int;
		var INDEX_LOOKUP = AABBSector.INDICES_LOOKUP[direction];
		
		if (aboveDoorwayHeight > 0) {
			p =  PlaneResult.getIdentity();
			
			// Leftmost top position
			// Leftmost lower position
			x = pos.x + down.x * aboveDoorwayHeight;
			y = pos.y + down.y * aboveDoorwayHeight;
			z = pos.z + down.z * aboveDoorwayHeight;
			a = geom.addVertex(x, y, z);
			
			// Rightmost lower position
			x+= right.x * planeResult.width;
			y+= right.y * planeResult.width;
			z += right.z * planeResult.width;
			b = geom.addVertex(x, y, z);
			// Rightmost top position
			
			
			// add face accordingly
			geom.addFace([INDEX_LOOKUP[0],a,b,INDEX_LOOKUP[3]]); 
		
		//	html += p.getHTML(mat);
		}
		
		
		// re-arrange portals from left to right using squared dist from starting point or right vector offset). set up walls accordingly.
		portals.sort( function(a, b):Int {
			var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
			var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
			if (a2 < b2) {
				return -1;
			}
			else if (a2 == b2) return 0;
			return 1;
		});
		
		
		// add spacings if possible
		var len:Int = portals.length;
		var portal:AABBPortal;
		var c:Float;
		var lastC:Float = -99999999;
		var o:Float;
		var m:Float = 0;
		for (i in 0...len) {
			portal = portals[i];
			c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
			o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
			if (o < c) c = o;  // get leftmost position for c variable
			// c should be icnrementing
			if (lastC > c) trace("WRONG, shoudl be less!");
			lastC = c;

			o = baseOffset < c ? c - baseOffset : baseOffset - c;
			//if (o < 0) trace("Need to abs!");
			p = planeResult.clone();
			p.pos.x += m * right.x;
			p.pos.y += m * right.y;
			p.pos.z += m * right.z;
			
			p.pos.x += aboveDoorwayHeight * down.x;
			p.pos.y += aboveDoorwayHeight * down.y;
			p.pos.z += aboveDoorwayHeight * down.z;
			
			
			p.width =   (o - m);

			p.height = portal.height;
		//	html += p.getHTML(mat);
		
			if ( !(p.width == 0 || p.height == 0) ) {
				p.addToGeometry(geom);
			
		//	trace("Should not happen!");
			}
		
		
			m += (o-m)  + portal.width;
			// door wall spacing rect = (right vector offset - baseOffset, aboveDoorwayHeight, spacignWidth, doorwayHeight)
			// spacing before portal
			
		
			
		}
		///*
		portal = portals[len -1];
		
			p = planeResult.clone();
			p.pos.x += m * right.x;
			p.pos.y += m * right.y;
			p.pos.z += m * right.z;
			
			p.pos.x += aboveDoorwayHeight * down.x;
			p.pos.y += aboveDoorwayHeight * down.y;
			p.pos.z += aboveDoorwayHeight * down.z;
			p.width =   planeResult.width - m;
			p.height = portal.height;
		if ( !(p.width == 0 || p.height ==0) ) p.addToGeometry(geom);
			
		//	html += p.getHTML(mat);
		//*/
		
		// spacing after last portal
				
		// validate that all portals lie on the same plane using points of portal
		
	

		
	}
		
	public function getHTML(sector:AABBSector, gridSize:Float, mat:String, textureSize:Float):String { // Gets html of aabb portal plane wall, ie. a wall with portal openings..
		
		var planeResult:PlaneResult = getPlaneResult( AABBPortalPlane.DIRECTIONS[direction], sector, gridSize);
		var p:PlaneResult;
		var html:String = planeResult.getOpenHTML(null,textureSize);  // open html  , // no width, no height, no material, just a  planar container!
		
		var x:Float = 0;
		var y:Float = 0;
		var width:Float =  planeResult.width;
		
		var doorwayHeight:Float = portals[0].height;  // ASSUMPTION, all portals same height.., this might change later
		var aboveDoorwayHeight:Float = planeResult.height - doorwayHeight;
		
		if (aboveDoorwayHeight > 0) {
			p =  PlaneResult.getIdentity();
		
			p.width = planeResult.width;
			p.height = aboveDoorwayHeight;
		
			html += p.getHTML(mat, textureSize);
		}
		
		
		
		var pos:Vec3 = planeResult.pos;
		var right:Vec3 = planeResult.right.getReverse();  // REVERSE BUG: argh! need to get reverse for right
		var baseOffset:Float = pos.dotProduct(right);
		
		// re-arrange portals from left to right using squared dist from starting point or right vector offset). set up walls accordingly.
		portals.sort( function(a, b):Int {
			var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
			var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
			if (a2 < b2) {
				return -1;
			}
			else if (a2 == b2) return 0;
			return 1;
		});
		// add spacings if possible
		var len:Int = portals.length;
		var portal:AABBPortal;
		var c:Float;
		var lastC:Float = -99999999;
		var o:Float;
		var m:Float = 0;
		for (i in 0...len) {
			portal = portals[i];
			c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
			o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
			if (o < c) c = o;  // get leftmost position for c variable
			// c should be icnrementing
			if (lastC > c) trace("WRONG, shoudl be less!");
			lastC = c;

			o = baseOffset < c ? c - baseOffset : baseOffset - c;
			//if (o < 0) trace("Need to abs!");
			p = PlaneResult.getIdentity();
			p.pos.x = m;
			p.pos.y = aboveDoorwayHeight;
			p.width =   o - m ;
			p.height = portal.height;
		if ( !(p.width == 0 || p.height ==0) )	html += p.getHTML(mat, textureSize);
		
			m +=  p.width  + portal.width;
			// door wall spacing rect = (right vector offset - baseOffset, aboveDoorwayHeight, spacignWidth, doorwayHeight)
			// spacing before portal
		}
		///*
		portal = portals[len -1];
		
			p = PlaneResult.getIdentity();
			p.pos.x = m;
			p.pos.y = aboveDoorwayHeight;
			p.width =   planeResult.width - m;
			p.height = portal.height;
		if ( !(p.width == 0 || p.height ==0) )	html += p.getHTML(mat, textureSize);
		//*/
		
		// spacing after last portal
				
		// validate that all portals lie on the same plane using points of portal
		
		// close html
		html += "</div>";

		return html;
	}
	

	
	// Static model
	
	

	public static inline var NORTH:Int = 0;
	public static inline var WEST:Int = 1;
	public static inline var SOUTH:Int = 2;
	public static inline var EAST:Int = 3;
	public static inline var UPWARDS:Int = 4;
	public static inline var DOWNWARDS:Int = 5;
	
	public static inline var BIT_WIDTH:Int = 1;
	public static inline var BIT_HEIGHT:Int = 2;
	public static inline var BIT_CEILHEIGHT:Int = 4;

	
	public static var OFFSET_BITMASKS:Array<Int> = {  // a bit mask indicating whether to offset by width/height/ceilHeight respectively
		var arr = new Array<Int>();
		// 1 - width 
		// 2 - height
		// 4 - ceilHeight
		arr[NORTH] = BIT_WIDTH | BIT_HEIGHT;
		arr[WEST] = BIT_WIDTH;
		arr[SOUTH] = 0;
		arr[EAST] = BIT_HEIGHT;
		arr[UPWARDS] = BIT_CEILHEIGHT;
		arr[DOWNWARDS] = BIT_WIDTH | BIT_HEIGHT;
		arr;
	}
	
	 // adjust this for directions in 3d world in relation to cardinal indices above.
	public static var DIRECTIONS:Array<Vec3> = [ 
		new Vec3(0, -1, 0),
		new Vec3(-1, 0, 0),
		new Vec3(0, 1, 0),
		new Vec3(1, 0,0)
	];
	// adjust up vector
	public static var UP:Vec3 = new Vec3(0, 0, 1);
	
	public static function setEastSouthUp(east:Vec3, south:Vec3, up:Vec3 ):Void {
		DIRECTIONS[EAST].copy(east);
		DIRECTIONS[SOUTH].copy(south);
		UP.copy(up);
		DIRECTIONS[WEST].copyReverse(east);
		DIRECTIONS[NORTH].copyReverse(south);
	}
	
	
	/**
	 * Gets normal facing door direction from doorway (ie. indoor facing door direction towards corridoor tile ).
	 * @param	door
	 * @return Returns the normal door direction , ie. inward facing normal direction).
	 */
	static public inline function getDoorDir(door:Int4):Int
	{
		var dir:Int = 0;
		dir |= isDoorHorizontal(door) ? 1 : 0;  // first bit - is door horizontal?
		dir |= isDoorHorizontal(door) ? door.z > 0 ? 2:0 : door.w > 0  ? 2:0;  // second bit - positive or negative? 
		return dir;
	}
	
	static public inline function isDoorHorizontal(door:Int4):Bool {
		 return door.z != 0;
	}
	static public inline function isDoorValHorizontal(val:Int):Bool { // first bit is door horizontal
		return (val & 1) !=0;
	}
	
	static public inline function getReverse(direction:Int):Int
	{
		return direction ^= 2;
	}
	
	static public inline function isReversed(dir:Int):Bool
	{
		return dir == AABBPortalPlane.NORTH || dir == AABBPortalPlane.WEST;
	}
	
	static public inline function getMagnitudeOffset(door:Int4):Int {
		return isDoorHorizontal(door) ? abs(door.z) : abs(door.w);
	}
	static public inline function abs(val:Int):Int {
		return val < 0 ? -val : val;
	}
		static public inline function absFloat(val:Float):Float {
		return val < 0 ? -val : val;
	}
	
	
	
}

