package glidias;


/**
 * ...
 * @author Glenn Ko
 */

class AABBUtils 
{
	public static inline var MAX_VALUE:Float = 1.7976931348623157e+308;
	public static inline var THRESHOLD:Float = .1;
	
	public static inline function getRect(aabb:IAABB, threshold:Float=THRESHOLD):Rectangle {
		return new Rectangle(aabb.minX, aabb.minY, clampMagnitude(aabb.maxX - aabb.minX, threshold), clampMagnitude(aabb.maxY - aabb.minY, threshold) );
	
	}
	public static inline function clampMagnitude(mag:Float, threshold:Float=THRESHOLD):Float {
		return mag < 0 ? threshold : mag <  threshold ?  threshold : mag;
	}

	private static inline function abs(val:Float):Float {
		return val < 0 ? -val : val;
	}
	private static function norm(w:Int):Int 
	{
		return w != 0 ?  w < 0 ? -1 : 1 : 0;
	}
	
	public static function match(aabb:IAABB, refAABB:IAABB):Void {
		aabb.minX = refAABB.minX;
		aabb.minY = refAABB.minY;
		aabb.minZ = refAABB.minZ;
		
		aabb.maxX = refAABB.maxX;
		aabb.maxY = refAABB.maxY;
		aabb.maxZ = refAABB.maxZ;
	}
	
	public static inline function reset(aabb:IAABB):Void {
		aabb.minX = MAX_VALUE;
		aabb.minY = MAX_VALUE;
		aabb.minZ = MAX_VALUE;
		aabb.maxX = -MAX_VALUE;
		aabb.maxY = -MAX_VALUE;
		aabb.maxZ = -MAX_VALUE;
	}
	
	public static function expand2(aabb:IAABB, refAABB:IAABB):Void {
		if (refAABB.minX < aabb.minX) aabb.minX = refAABB.minX;
		if (refAABB.minY < aabb.minY) aabb.minY = refAABB.minY;
		if (refAABB.minZ < aabb.minZ) aabb.minZ = refAABB.minZ;
		
		if (refAABB.maxX > aabb.maxX) aabb.maxX = refAABB.maxX;
		if (refAABB.maxY > aabb.maxY) aabb.maxY = refAABB.maxY;
		if (refAABB.maxZ > aabb.maxZ) aabb.maxZ = refAABB.maxZ;
	}

	public static inline function expand(x:Float, y:Float, z:Float, aabb:IAABB):Void {
		if (x < aabb.minX) aabb.minX = x;
		if (y < aabb.minY) aabb.minY = y;
		if (z < aabb.minZ) aabb.minZ = z;
		if (x > aabb.maxX) aabb.maxX = x;
		if (y > aabb.maxY) aabb.maxY = y;
		if (z > aabb.maxZ) aabb.maxZ = z;
	}
	public static inline function expandWithPoint(vec:Vec3, aabb:IAABB):Void {
		if (vec.x < aabb.minX) aabb.minX = vec.x;
		if (vec.y < aabb.minY) aabb.minY = vec.y;
		if (vec.z < aabb.minZ) aabb.minZ = vec.z;
		if (vec.x > aabb.maxX) aabb.maxX = vec.x;
		if (vec.y > aabb.maxY) aabb.maxY = vec.y;
		if (vec.z > aabb.maxZ) aabb.maxZ = vec.z;
	}
	
}