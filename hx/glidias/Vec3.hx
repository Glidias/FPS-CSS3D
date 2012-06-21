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
	
	public inline function getReverse():Vec3 {
		return new Vec3( -x, -y, -z, w);
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