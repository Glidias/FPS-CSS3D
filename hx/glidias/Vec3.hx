package glidias;
import glidias.Vec3;

/**
 * ...
 * @author Glenn Ko
 */

class Vec3 
{

	public var x:Float;
	public var y:Float;
	public var z:Float;
	public var w:Float;
	
	public function new(x:Float, y:Float, z:Float, w:Float=0) 
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	public inline function add3(x:Float, y:Float, z:Float):Void {
		this.x += x;
		this.y += y;
		this.z += z;
	}
	public inline function copyReverse(ref:Vec3):Void
	{
		this.x = -ref.x;
		this.y = -ref.y;
		this.z = -ref.z;
		this.w = ref.w;
	}
	
	public inline function copy(ref:Vec3):Void {
		this.x = ref.x;
		this.y = ref.y;
		this.z = ref.z;
		this.w = ref.w;
	}
	
	public inline function crossProduct(b:Vec3):Vec3 {
		return new Vec3((this.y * b.z) - (this.z * b.y), (this.z * b.x) - (this.x * b.z), (this.x * b.y) - (this.y * b.x));
	}
	
	public inline function dotProduct(b:Vec3):Float  {
		return x * b.x + y * b.y + z * b.z;
	}
	
	public inline function getReverse():Vec3 {
		return new Vec3( -x, -y, -z, w);
	}
	
	public inline function lengthSquared():Float {
		return x * x + y * y + z * z;
	}
	
	public inline function clone():Vec3 {
		return new Vec3(x, y, z, w);
	}
	public inline function scaleBy(amt:Float):Void {
		x *= amt;
		y *= amt;
		z *= amt;
	}
	

}