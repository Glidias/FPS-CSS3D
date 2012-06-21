package glidias;

/**
 * ...
 * @author Glenn Ko
 */

class Rectangle 
{
	public var x:Float;
	public var y:Float;
	public var width:Float;
	public var height:Float;

	public function new(x:Float, y:Float, width:Float, height:Float) 
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	public inline function toHTML(mat:String, scale:Float=1):String {
		return '<div style="position:absolute;top:'+(y*scale)+'px;left:'+(x*scale)+'px;width:'+(width*scale)+'px;height:'+(height*scale)+'px;'+mat+'"></div>';
		
	}
	
}