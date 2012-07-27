package glidias;
import a3d.Geometry;

/**
 * Generic structure
 */
class PlaneResult {
	
	// othogaonal oreientation (for now, we use this conventions!)
	public var up:Vec3; // - y
	public var right:Vec3; // -x
	public var look:Vec3; // -z
	
	public var pos:Vec3;
	public var width:Float;
	public var height:Float;
	
	public function new() {
		
	}
	
	public inline function getHTML(mat:String):String {
		return getOpenHTML(mat)+"</div>";
	}
//	public static var COUNT:Int = 0;
//
	public inline function getOpenHTML(mat:String):String {
		// darn, not too sure why must use -right?
		/*
		var c:Int = (COUNT++);
		pos.x = c * 500;
		pos.y = 0;
		pos.z = 0;
		
		width = 500;
		height = 300;
		*/
		//REVERSE BUG:
		var w = Math.round(width);
		var h = Math.round(height);
		return '<div style='+(mat!=null ? '"margin:0;padding:0;width:'+1+'px;height:'+1+'px;' : '')+'-webkit-transform:matrix3d('+[-right.x,-right.y,-right.z, 0,up.x,up.y,up.z, 0,  look.x,look.y,look.z, 0,pos.x,pos.y,pos.z,1].join(",")+') scaleX('+width+') scaleY('+height+');'+(mat!=null ? mat : "")+'">';
	}
	
	public function clone():PlaneResult
	{
		var me:PlaneResult = new PlaneResult();
		me.up = up.clone();
		me.right = right.clone();
		me.look = look.clone();
		me.pos = pos.clone();
		me.width = width;
		me.height = height;
		return me;
	}
	
	static public function getIdentity():PlaneResult
	{
		var me:PlaneResult = new PlaneResult();
		me.pos = new Vec3(0, 0, 0);
		me.up = new Vec3(0, 1, 0);
		me.right = new Vec3(-1, 0, 0);
		me.look = new Vec3(0, 0, 1);
		return me;
	}
	
	public  function addToGeometry(geom:Geometry):Void {

			var x:Float;
			var y:Float;
			var z:Float;
			var a:Int;
			var b:Int;
			var c:Int;
			var d:Int;
			// Leftmost top position
			x = pos.x;
			y = pos.y;
			z = pos.z;
			a = geom.addVertex(x, y, z);
			
			// Leftmost lower position
			x += up.x * height;
			y += up.y * height;
			z += up.z * height;
			b = geom.addVertex(x, y, z);
			
			// Rightmost lower position
			x -= right.x * width;
			y -= right.y * width;
			z -= right.z * width;
			c = geom.addVertex(x, y, z);
			
			
			// Rightmost top position
			x -= up.x * height;
			y -= up.y * height;
			z -= up.z * height;
			d = geom.addVertex(x, y, z);
			
			geom.addFace([a, b, c, d]);

	}
	
	
	
}