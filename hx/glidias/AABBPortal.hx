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
	
	
	// -- Procedural generation helper methods
	
	public function getReverse(newTarget:AABBSector):AABBPortal {
		var meNew:AABBPortal = new AABBPortal();
		AABBUtils.match(meNew, this);
		meNew.points = points.concat(new Array<Float>());
		meNew.points.reverse(); // reverse poitns so they face opposite direction
		meNew.width = width;
		meNew.height = height;
		meNew.target = newTarget;
		return meNew;
	}
	
	
	/**
	 *
	 * @return  Gets  opposite portal from other side of corridoor
	 */
	public function getOppositePortal(gridSize:Float, newTarget:AABBSector, door:Int4):AABBPortal
	{
		var portal:AABBPortal = getReverse(newTarget);
		
		// offset all points and bounds along reverse direction
		var direction:Int = AABBPortalPlane.getDoorDir(door
		);
		var ox:Float = 0;
		var oy:Float = 0;
	
		if (AABBPortalPlane.isDoorValHorizontal(direction)) {
			ox = (door.z + AABBPortalPlane.norm(door.z) ) * gridSize;
		}
		else {
			oy = (door.w + AABBPortalPlane.norm(door.w) ) * gridSize;
		}
		var south = AABBPortalPlane.DIRECTIONS[AABBPortalPlane.SOUTH];
		var east = AABBPortalPlane.DIRECTIONS[AABBPortalPlane.EAST];
		
		var x:Float;
		var y:Float;
		var z:Float;
		
		x = ox * east.x;
		y = ox * east.y;
		z = ox * east.z;
	
		x+=oy * south.x;
		y+=oy * south.y;
		z += oy * south.z;
		
		minX += x;
		minY += y;
		minZ += z;
		maxX += x;
		maxY += y;
		maxZ += z;
		
		var offsets = [x,y,z];
		
		direction = points.length;
		var ind:Int;
		for (i in 0...direction) {
			points[i]+= offsets[i % 3];
		}
		
		return portal;
	}

	
	/**
	 * Precalculates all necessary values based on a room definition and it's door. This is for otuward facing doors only.
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
		
		var dir:Int = AABBPortalPlane.getDoorDir(door);
	
		// Door tile position
		var sx = door.x;
		var sy = door.y;
		var reverse:Bool = AABBPortalPlane.isReversed(dir);
		
		if (reverse) {
			if (dir == AABBPortalPlane.WEST) {
				sx += 1;
			}
			else { // NORTH
				sy += 1;
			}
		}
		
		// Anti-clockwise from top-left of door
		
		// top left
		var px;
		var py;
		var pz;
		var p;
		p =  sy* gridSize;
		px = south.x * p;
		py = south.y * p;
		pz = south.z * p;
		p = sx * gridSize;
		px += east.x * p;
		py += east.y * p;
		pz += east.z * p;
		p = groundPos + doorHeight;
		px += up.x  * p;
		py += up.y  * p;
		pz += up.z  * p;
		points.push(px);
		points.push(py);
		points.push(pz);

		// set bounds to above top-left and expand outward by height and width in antoclockwise direction
		minX = maxX = px;
		minY = maxY = py;
		minZ = maxZ = pz;
		
		// bottom left
		p = sy * gridSize;
		px = south.x * p;
		py = south.y * p;
		pz = south.z * p;
		p = sx * gridSize;
		px += east.x * p;
		py += east.y * p;
		pz += east.z * p;
		p = groundPos;
		px += up.x  * p;
		py += up.y  * p;
		pz += up.z  * p;
		points.push(px);
		points.push(py);
		points.push(pz);
		AABBUtils.expand(px, py, pz, this);
		
		
		// shift over to right
		
		if ( AABBPortalPlane.isDoorValHorizontal(dir) ) {
			sy += 1;
		}
		else {
			sy += 1;
		}
		
		// repeat process in reverse vertical direction
		
		// bottom right
		p =  sy* gridSize;
		px = south.x * p;
		py = south.y * p;
		pz = south.z * p;
		p = sx * gridSize;
		px += east.x * p;
		py += east.y * p;
		pz += east.z * p;
		p = groundPos + doorHeight;
		px += up.x  * p;
		py += up.y  * p;
		pz += up.z  * p;
		points.push(px);
		points.push(py);
		points.push(pz);
		AABBUtils.expand(px, py, pz, this);
		
		
		// top right
		p =  sy* gridSize;
		px = south.x * p;
		py = south.y * p;
		pz = south.z * p;
		p = sx * gridSize;
		px += east.x * p;
		py += east.y * p;
		pz += east.z * p;
		p = groundPos + doorHeight;
		px += up.x  * p;
		py += up.y  * p;
		pz += up.z  * p;
		points.push(px);
		points.push(py);
		points.push(pz);
		AABBUtils.expand(px, py, pz, this);
		
		
		return dir;
	}

	
}