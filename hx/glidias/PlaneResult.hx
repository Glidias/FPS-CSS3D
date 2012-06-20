package glidias;

/**
 * Generic structure
 */
class PlaneResult {
	
	// othogaonal oreientation
	var up:Vec3;
	var right:Vec3;
	var look:Vec3;
	
	var pos:Vec3;
	var width:Float;
	var height:Float;
	
	public function new() {
		
	}
	
	public inline function getHTML(mat:String):String {
		return getOpenHTML(mat)+"</div>";
	}
	public inline function getOpenHTML(mat:String):String {
		return "";
	}
	
}