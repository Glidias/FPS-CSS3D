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
	

	public function new() 
	{
		
		renderId = -999999999;
		
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
		
		// transform x,y,z by matrics
		//var pos:Vec3;
		var a:Float;
		var b:Float;
		var c:Float;
		
		//pos = east.scaleBy(x).add( south.scaleBy(y) ).add(up.scaleBy(z));
		//AABBUtils.expand(pos.x, pos.y, pos.z, this);
		
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
		
		x = gridSize * rect.x;
		y = gridSize * (rect.y+rect.height);
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
		
		x = gridSize * (rect.x+rect.width);
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
		
		x = gridSize * rect.x;
		y = gridSize * (rect.y+rect.height);
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
		
		x = gridSize * (rect.x+rect.width);
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
	
	
	public inline function addPortalPlane(plane:AABBPortalPlane):Void {  
		
		portalWalls.push(plane);
	}

	
	
}