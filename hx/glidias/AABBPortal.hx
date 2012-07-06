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
	
	public var points:Array<Vec3>;  // clip points in anticlockwise order in world space to form new portal in world spacw
	
	public var width:Float;
	public var height:Float;
	public var target:AABBSector;
	
	public var id:Dynamic;
	
	public function new() 
	{
		points = new Array<Vec3>();
	}
	
	
	// -- Procedural generation helper methods
	
	
	
	/**
	 * 
	 * @param	newTarget	THe new target to assign to
	 * @param	direction	The reversed direction indicator
	 * @return
	 */
	public function getReverse(newTarget:AABBSector, direction:Int, version2:Bool=false):AABBPortal {
		var meNew:AABBPortal = new AABBPortal();
		AABBUtils.match(meNew, this);
		
		if (!version2) {
			if (direction == AABBPortalPlane.WEST) {
				meNew.points = [points[1], points[2], points[3], points[0]  ];
			}
			else if (direction == AABBPortalPlane.NORTH) {
				meNew.points = [   points[3], points[2], points[1], points[0]  ];  
			}
			else if (direction == AABBPortalPlane.SOUTH) {
				meNew.points = [  points[1], points[2], points[3], points[0]  ];
			}
			else {
				meNew.points = [ points[3], points[2], points[1], points[0] ];  
			
			}
			
		}
		else {
			// Same as above version, but fLip logic gah!
			if (direction == AABBPortalPlane.WEST) {
					meNew.points = [ points[3], points[2], points[1], points[0] ];  
					
			}
			else if (direction == AABBPortalPlane.NORTH) {
					meNew.points = [  points[1], points[2], points[3], points[0]  ];
			}
			else if (direction == AABBPortalPlane.SOUTH) {
			
				meNew.points = [   points[3], points[2], points[1], points[0]  ];  
			}
			else {
			
				meNew.points = [points[1], points[2], points[3], points[0]  ];
			
			}
			
		}
//

//meNew.points.reverse(); // reverse poitns so they face opposite direction
		//AABBUtils.reset(meNew);
		//AABBUtils.expandWithPoint(meNew.points[0], meNew);
		//AABBUtils.expandWithPoint(meNew.points[2], meNew); 
		//AABBUtils.expandWithPoint(meNew.points[3], meNew); 
		//AABBUtils.expandWithPoint(meNew.points[1], meNew); 
		
		meNew.width = width;
		meNew.height = height;
		meNew.target = newTarget;
		return meNew;
	}
	
	
	public function clone(newTarget:AABBSector, ox:Float = 0, oy:Float = 0, oz:Float=0 ):AABBPortal 
	{
		var meNew:AABBPortal = new AABBPortal();
		//AABBUtils.match(meNew, this);
		AABBUtils.reset(this);

		meNew.width = width;
		meNew.height = height;
		meNew.target = newTarget;
		
		var len:Int = points.length;
		for (i in 0...len) {
			var p:Vec3 = points[i];
			p.x += ox;
			p.y += oy;
			p.z += oz;
			AABBUtils.expand(p.x,p.y,p.z, this);
		}
		
		
		return meNew;
	}
	
	public function traceValid():Void {  // to depeciate: temporary method to  test for above ground zero case and diagonal
		if (points[0].z <= 0) trace("Invalid first point z!" + points[0].z);
		if (points[0].z == points[2].z) trace("Invalid first point z 2222!");
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
		
		if (reverse) {  // door edge offset
			if (dir == AABBPortalPlane.WEST) {
				sx += 1;
			}
			else { // NORTH
				sy += 1;
			}
		}
	
		
		// Anti-clockwise from top-left of door
		AABBUtils.reset(this);
		
		
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
		points.push(new Vec3(px, py, pz, 1));
		
		//AABBUtils.expand(px, py, pz, this);
		// set bounds to above top-left and expand outward by height and width in antoclockwise direction
		
		
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
		points.push(new Vec3(px, py, pz, 1));
		
		
		
		// shift over to right
		
		if ( AABBPortalPlane.isDoorValHorizontal(dir) ) {
			sy += 1;
		}
		else {
			sx += 1;
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
		p = groundPos;
		px += up.x  * p;
		py += up.y  * p;
		pz += up.z  * p;
		points.push(new Vec3(px, py, pz, 1));
		//AABBUtils.expand(px, py, pz, this);
		
		
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
		points.push(new Vec3(px, py, pz, 1));
		
		
		// Ensure that point starts anti-clockwise at the top-left hand corner from door-facing.
		// This sucks, harccoded cross product conditional...vicey versa swappey logic
		if (AABBPortalPlane.isDoorValHorizontal(dir)) {  // use 3012 instead order instead
			if (!reverse) points = [ points[3], points[0], points[1], points[2]  ];
		}
		else {
			if (reverse) points = [ points[3], points[0], points[1], points[2]  ];
		}
		
		// Form bounds by crossing diagonal line
		AABBUtils.expandWithPoint(points[0], this);
		AABBUtils.expandWithPoint(points[2], this); 
		//traceValid();
		
		return dir;
	}
	

	


	
}