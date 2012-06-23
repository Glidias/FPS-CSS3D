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
	
	public inline function toHTML(mat:String, scale:Float = 1):String {
		//if (Math.round(this.y * scale).toString().indexOf(".")>=0) alert( Math.round(this.y * scale) );
		return '<div style="position:absolute;top:'+Math.round(y*scale)+'px;left:'+Math.round(x*scale)+'px;width:'+Math.round(width*scale)+'px;height:'+Math.round(height*scale)+'px;'+mat+'"></div>';
		
	}
	
	public function toString():String {
		return "rect:" + [x, y, width, height];
	}
	
}