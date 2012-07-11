package a3d;

/**
 * Basic geometry class to support collision detection/raycasting/etc.
 * @author Glenn Ko
 */


 import glidias.TypeDefs;
 import haxe.io.Error;
 
class Geometry
{
	public var vertices:Vector<Float>;
	public var indices:Vector<Int>;
	public var normals:Vector<Float>;
	public var numVertices:Int;

	public function new() 
	{
		vertices = [];
		indices = [];
		normals = [];
		numVertices = 0;		
	}
	
	public inline function addVertex(x:Float, y:Float, z:Float):Void {
		var b:Int = numVertices * 3;
		vertices[b] = x; b++;
		vertices[b] = y; b++;
		vertices[b] = z;
		numVertices++;
	}
	
	
	public function pushVertices(values:Vector<Float>):Void {
		var len:Int= values.length;
		var numVF:Float = len / 3;
		len = Math.floor( numVF);
		if (len != numVF) {
			trace("Invalid push vertices. Values not divisible by 3!");
			return;
		}
		len = values.length;
		for (i in 0...len) {
			vertices.push(values[i]);
		}
	}
	
	public inline function addFace(indices:Vector<Int>):Void {
		var d:Int;
		var len:Int = d =indices.length;
		var header:Int = ((1 << len) << A3DConst._NSHIFT) | indices[0]; 
		indices[d] = header;  d++;
		for (i in 1...len) {
			indices[d] = indices[i];
			d++;
		}
	}
	
	/*
	public inline function pushNFaces(indices:Vector<Int>, nSides:Int):Void {
		
	}
	*/
	
	
}