package a3d;
import glidias.AABBUtils;
import glidias.IAABB;
import jeash.geom.Matrix3D;
import jeash.geom.Vector3D;

/**
 * Holder for dynamic 3d objects
 * @author Glenn Ko
 */

class Object3D implements ITransform3D, implements IEuler
{
	// Static objects:
	
	// matrix
	public var a:Float;
	public var b:Float;
	public var c:Float;
	public var d:Float;
	
	public var e:Float;
	public var f:Float;
	public var g:Float;
	public var h:Float;
	
	public var i:Float;
	public var j:Float;
	public var k:Float;
	public var l:Float;
	
	// euler
	public var x:Float;
	public var y:Float;
	public var z:Float;
	public var rotationX:Float;
	public var rotationY:Float;
	public var rotationZ:Float;
	public var scaleX:Float;
	public var scaleY:Float;
	public var scaleZ:Float;
		
	// optionals
	public var geometry:Geometry;
	public var boundBox:BoundBox;
	
	//public var transformChanged
	
	public function new() 
	{
		TransformUtil.identity(this);
		x = 0;
		y = 0;
		z = 0;
		rotationX = 0;
		rotationY = 0;
		rotationZ = 0;
		scaleX = 0;
		scaleY = 0;
		scaleZ = 0;
	}
	
	private inline function get_matrix():Matrix3D 
	{
		TransformUtil.compose(this, x, y, z, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ);
		return new Matrix3D([a, e, i, 0, b, f, j, 0, c, g, k, 0, d, h, l, 1]);
	}
	
	private inline function set_matrix(value:Matrix3D):Matrix3D 
	{
		var v = value.decompose();
			var t:Vector3D = v[0];
			var r:Vector3D = v[1];
			var s:Vector3D = v[2];
			x = t.x;
			y = t.y;
			z = t.z;
			rotationX = r.x;
			rotationY = r.y;
			rotationZ = r.z;
			scaleX = s.x;
			scaleY = s.y;
			scaleZ = s.z;
			//transformChanged = true;
		return value;
	}
	
	public inline var matrix(get_matrix, set_matrix):Matrix3D;
	
}