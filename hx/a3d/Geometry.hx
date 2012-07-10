package a3d;

/**
 * Basic geometry class to support collision detection/raycasting/etc.
 * @author Glenn Ko
 */


 import glidias.TypeDefs;
 
class Geometry
{
	public var vertices:Array<Float>;
	public var indices:Array<UInt>;
	public var normals:Array<Float>;
	public var numVertices:Int;
	public var nSides:Int;  // to support n-gon geometry storage

	public function new() 
	{
		nSides = 3;
		vertices = [];
		indices = [];
		normals = [];
		numVertices = 0;		
	}
	
}