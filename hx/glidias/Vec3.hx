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
	
	public function toString():String {
		return "[Vec3 "+x+","+y+","+z+"]";
	}
	
	public inline function normalize():Void {
		var mag = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );
		if( mag != 0 && mag != 1)
		{
			mag = 1 / mag;
			this.x *= mag;
			this.y *= mag;
			this.z *= mag;
		}
	}
	
	public inline function normalizeAndCalcOffset(px:Float, py:Float, pz:Float):Void {
		normalize();
		w = x * px + py * y + pz* z;
		
	}
	
	public inline function set(x:Float, y:Float, z:Float, w:Float=0):Void {
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
	public inline function subtract3(x:Float, y:Float, z:Float):Void {
		this.x -= x;
		this.y -= y;
		this.z -= z;
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
	public inline function divideScalar(amt:Float):Void {
		x /= amt;
		y /= amt;
		z /= amt;
	}
	public inline function scaleBy(amt:Float):Void {
		x *= amt;
		y *= amt;
		z *= amt;
	}
	
	public inline function flip():Void
	{
		this.x = -x;
		this.y = -y;
		this.z = -z;
		this.w = -w;
	}
	

	

}