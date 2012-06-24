package glidias;
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
	

	public static inline function getPlaneResult(dir:Vec3, sector:AABBSector, gridSize:Float, noDimension:Bool=false):PlaneResult {

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
		//    																		 new Up = right.crossProduct(up);  // 
		var right:Vec3 = AABBPortalPlane.UP.crossProduct(dir);  
		if (right.lengthSquared() == 0) {
			right = dir.crossProduct(AABBPortalPlane.DIRECTIONS[SOUTH]);
		}
		var up = right.crossProduct(UP);
		
		planeResult.up = up;
		planeResult.right = right;
		planeResult.look = dir;
		
		if (noDimension) {
			planeResult.width = 0;
			planeResult.height = 0;
		}
		else {
		
			if (dirId == UPWARDS || dirId == DOWNWARDS) {
				planeResult.width = rect.width * gridSize;  
				planeResult.height = rect.height * gridSize;
			}
			else { // only east/west would use rect.height as width of wall,  ceiling/floor and north/south walls uses rect.width.
				planeResult.width = dirId==EAST || dirId==WEST ?  rect.height * gridSize : rect.width * gridSize;  
				planeResult.height = sector.ceilHeight;
			}
		}
		
	
		p = (rect.x + ( (b & 1) !=0 ? rect.width : 0 )) * gridSize;
		x = east.x * p;
		y = east.y * p;
		z = east.z * p;
		
		p = (rect.y + ( (b & 2) !=0 ? rect.height : 0 )) * gridSize;
		x += south.x * p;
		y += south.y * p;
		z += south.z * p;
		
		p  = sector.groundPos + sector.ceilHeight - ( (b & 3) !=0 ? sector.ceilHeight : 0 ); 
		x += upwards.x * p;
		y += upwards.y * p;
		z += upwards.z * p;
	
		planeResult.pos = new Vec3(x , y, z);
		
		return planeResult;
	}

		
	public function getHTML(sector:AABBSector, gridSize:Float, mat:String):String { // todo:
		
		var planeResult:PlaneResult = getPlaneResult( AABBPortalPlane.DIRECTIONS[direction], sector, gridSize, true);
		var html:String = planeResult.getOpenHTML(mat);  // open html
		
		
		// aboveDoorway x and y = (0,0)
		// aboveDoorwayWidth =  roomRect.width * gridSize;
		// doorwayHeight = portals[0].height;
		// aboveDoorwayHeight = roomRect.y * gridSize + ceilHeight - doorwayHeight; 
		
		// add any wall above doorway if available
		
		
		// baseOffset = planeResult.pos.dotProduct(planeResult.right);
		// re-arrange portals from left to right using squared dist from starting point or right vector offset). set up walls accordingly.
		portals.sort( function(a, b):Int {
			
			return 0;
		});
		// add spacings if possible
		// door wall spacing rect = (right vector offset - baseOffset, aboveDoorwayHeight, spacignWidth, doorwayHeight)
		
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
	

	
	public static var OFFSET_BITMASKS:Array<Int> = {  // a bit mask indicating whether to offset by width/height/ceilHeight respectively
		var arr = new Array<Int>();
		// 1 - width 
		// 2 - height
		// 4 - ceilHeight
		arr[NORTH] = 1 | 2;
		arr[WEST] = 1;
		arr[SOUTH] = 0;
		arr[EAST] = 2;
		arr[UPWARDS] = 4;
		arr[DOWNWARDS] = 0;
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
		DIRECTIONS[SOUTH].copyReverse(south);
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
	
	
	
}

