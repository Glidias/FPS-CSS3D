package glidias;

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
	public inline function getOpenHTML(mat:String):String {
		return '<div style='+(width != 0 ? '"width:'+Math.round(width)+'px;height:'+Math.round(height)+'px;' : '')+'-webkit-transform:matrix3d('+[right.x,right.y,right.z, 0,up.x,up.y,up.z, 0,  look.x,look.y,look.z, 0,pos.x,pos.y,pos.z,1].join(",")+');'+mat+'">';
	}
	
}