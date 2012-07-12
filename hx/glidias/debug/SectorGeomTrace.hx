package glidias.debug;
import a3d.A3DConst;
import a3d.Geometry;
import glidias.AABBSector;

/**
 * Trace out indexed vertex position of AABBSectors!
 * @author Glenn Ko
 */

class SectorGeomTrace 
{
	private var _sector:AABBSector;
	public var x:Float;
	public var y:Float;
	public var z:Float;
	public var id:String;

	public function new(sector:AABBSector) 
	{
		_sector = sector;
		id = _sector.toString();
	}
	
	public function doTrace(count:Int):Void {
		var geom:Geometry = _sector.geom;
		//var totalFaces:Int = Math.floor( geom.indices.length / 4 );  // assumed aabb sector with quads only
		var verts = geom.vertices;
		var len:Int = geom.indices.length;
		var c:Int = geom.indices[ Math.floor( (count % len) ) ] ;
		c &= A3DConst._FMASK_;
		c *= 3;
		x =  verts[c]; c++;
		y = verts[c]; c++;
		z = verts[c]; 
		
	}
	
	public function toString():String {
		return id;
	}
	
}