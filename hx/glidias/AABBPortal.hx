package glidias;

/**
 * ...
 * @author Glenn Ko
 */

class AABBPortal implements IAABB
{
	// world space bound reject
	public var minX:Float;
	public var minY:Float;
	public var minZ:Float;
	
	public var maxX:Float;
	public var maxY:Float;
	public var maxZ:Float;
	
	public var points:Array<Float>;  // clip points in anticlockwise order in world space to form new portal in world spacw
	
	public var width:Float;
	public var height:Float;
	public var target:AABBSector;
	
	public function new() 
	{
		points = new Array<Float>();
	}
	
	
	/**
	 * Precalculates all necessary values based on a room definition and it's door.
	 * @param	room
	 * @param	door
	 * @param	gridSize
	 * @param	doorHeight
	 * @param	groundPos
	 * @return	An integer id indiciating it's facing direction to match with the AABBPortalPlane's direction.
	 */
	public inline function setup(target:AABBSector, door:Int4, gridSize:Float, doorWidth:Float, doorHeight:Float, groundPos:Float ):Int {
		this.target = target;
		
		this.height = doorHeight;
		this.width = doorWidth; 
		
		 // todo: points and bounds based on direction
		var south:Vec3 = AABBPortalPlane.DIRECTIONS[AABBPortalPlane.SOUTH];
		var east =  AABBPortalPlane.DIRECTIONS[AABBPortalPlane.EAST];
		var up = AABBPortalPlane.UP;
		
		// top left
		var sx= south.x* door.y * gridSize;
		var sy = east.y * door.x * gridSize;
		var sz = up.z * (groundPos + doorHeight);
		var px;
		var py;
		var pz;
		points.push(sx);
		points.push(sy);
		points.push(sz);
		// set bounds to above start poitn and expand outward by height and width in antoclockwise direction
		minX = maxX = sx;
		minY = maxY = sy;
		minZ = maxZ = sz;
		
		// bottom left
		px = sx;
		py = sy;
		pz = up.z * (groundPos + doorHeight);
		AABBUtils.expand(px, py, pz, this);
		
		// bottom right
		
		// top right
		
		
		return AABBPortalPlane.getDoorDir(door);
	}
	
}