package glidias;

/**
 * ...
 * @author Glenn Ko
 */

class AABBSectorVisController
{

	public var curSector:AABBSector;
	private var sectorStack:ArrayBuffer<AABBSector>;
	private var frustumStack:AllocatorF<Frustum>;
	public var renderId:Int;

	public function new(fillAmount:Int=0, initialCapacity:Int=0) 
	{

	
		renderId = 0;
		sectorStack = new ArrayBuffer<AABBSector>();
		frustumStack = new AllocatorF<Frustum>(Frustum.create4, fillAmount, initialCapacity);
	}
	public inline function getVisCount():Int {
		return sectorStack.i;
	}
	

	
	public function run(camPos:Vec3, camFrus:Frustum, sectors:Array<AABBSector>):Void {

		renderId++;
		frustumStack.reset();
		
		var arr = sectorStack.arr;
		var len = sectorStack.i;
		for (i in 0...len) {
			arr[i].setVis(false);
		}

		
		var s:AABBSector = curSector;
		if (s == null) {
			s = getCurrentSector(camPos, sectors);
			if (s == null) {
	
				return; // no sector at all
			}
			curSector = s;
			
		}
		else {
			if (!AABBUtils.pointInside(s, camPos)) {  // we're not inside current aabb anymore, find a different sector if possible
				s = getCurrentSector(camPos, sectors);
				if (s != null && curSector != s) {
					curSector = s;
				}
			}
		}
		
		sectorStack.reset();
		var culling:Int;
		if ( (culling = camFrus.checkFrustumCulling(curSector, 15)) >= 0 ) {
			curSector.checkVis(camPos, frustumStack, camFrus, sectorStack, culling, renderId);
		}
		
		
		
		
		
	}
	
	public function getCurrentSector(camPos:Vec3, sectors:Array<AABBSector>):AABBSector {
		var len:Int = sectors.length;
		var s:AABBSector;
		for (i in 0...len) {
			s = sectors[i];
			if (AABBUtils.pointInside(s, camPos)) return s;
		}
		return null;
	}
	
	// this iterative method too complicated for now( top-down approach..later can consider...)
	//public inline function flagOnSectors(camPos:Vec3, frus:Frustum, sector:AABBSector):Void {
		
		/*
		var sectorStack = this.sectorStack;
		
		var portalWalls = sector.portalWalls;
		var len = portalWalls.length;
		var p;
		var f = frus;
		
		for (i in 0...len) {
			p = portalWalls[i];
			if (f.checkFrustumCulling(p, 63) >= 0) {
				f = frustumStack.get();
				frustumStack._pop();
			}
		}
		sVis = si -1;
	*/
	//}
	
	
	
}