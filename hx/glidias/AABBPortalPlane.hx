package glidias;
import glidias.Int4;

/**
 * A group of portals that lie on the same plane (ie. face same direction) within an abbb sector. 
 * @author Glenn Ko
 */

class AABBPortalPlane implements IAABB
{
	// backface plane reject lookup index
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
	
	public inline function addPortal(portal:AABBPortal):Void {
		AABBUtils.expand2(this, portal);
		portals.push(portal);
	}
	
	

	public static inline function getPlaneResult(dir:Vec3, sector:AABBSector, gridSize:Float):PlaneResult {

		var rect:Rectangle = sector.rect;
		var planeResult:PlaneResult = new PlaneResult();
		dir = dir.clone();
		
		// right = AABBPortalPlane.UP.crossProduct(dir);  // get direction from right vector (using right-hand rule)
		// if zero length vector, than it;s parallel! (either floor or ceiling case:: so right = dir.crossProduct(SOUTH))
		//    																		 new Up = right.crossProduct(up);  // 
		
		
		// Note: based on direction index, need to offset accordingly using a mult that could be -1, 1, or 0
		// south.scaleBy((rect.y + mult*rect.height )*gridSize).add;
		// east.scaleBy((rect.x + mult*rect.width )*gridSize);
		
		return planeResult;
	}

		
	public function getHTML(sector:AABBSector, gridSize:Float, mat:String):String { // todo:
		
		var planeResult:PlaneResult = getPlaneResult( AABBPortalPlane.DIRECTIONS[direction], sector, gridSize);
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
		
		
		// close html
		
		return html;
	}
	
	// Static model

	public static inline var NORTH:Int = 0;
	public static inline var WEST:Int = 1;
	public static inline var SOUTH:Int = 2;
	public static inline var EAST:Int = 3;
	 // adjust this for directions in 3d world in relation to cardinal indices above.
	public static var DIRECTIONS:Array<Vec3> = [ 
		new Vec3(0, -1, 0),
		new Vec3(-1, 0, 0),
		new Vec3(0, 1, 0),
		new Vec3(1, 1,0)
	];
	// adjust up vector
	public static var UP:Vec3 = new Vec3(0, 0, 1);
	
	
	static public inline function getDoorDir(door:Int4):Int
	{
		var dir:Int = 0;
		dir |= door.x != 0 ? 1 : 0;  // first bit - is door horizontal?
		dir |= ( door.x != 0 ? door.x > 0 : door.y > 0 ) ? 2 : 0;  // second bit - positive or negative? 
		return dir;
	}
	
	
}

