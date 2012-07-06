$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof glidias=='undefined') glidias = {}
glidias.Frustum = function(p) {
	if( p === $_ ) return;
	this.planes = new Array();
}
glidias.Frustum.__name__ = ["glidias","Frustum"];
glidias.Frustum.create6 = function() {
	var me = new glidias.Frustum();
	var planes = me.planes;
	planes[0] = new glidias.Vec3(0,0,0,0);
	planes[1] = new glidias.Vec3(0,0,0,0);
	planes[2] = new glidias.Vec3(0,0,0,0);
	planes[3] = new glidias.Vec3(0,0,0,0);
	planes[4] = new glidias.Vec3(0,0,0,0);
	planes[5] = new glidias.Vec3(0,0,0,0);
	return me;
}
glidias.Frustum.create4 = function() {
	var me = new glidias.Frustum();
	var planes = me.planes;
	planes[0] = new glidias.Vec3(0,0,0,0);
	planes[1] = new glidias.Vec3(0,0,0,0);
	planes[2] = new glidias.Vec3(0,0,0,0);
	planes[3] = new glidias.Vec3(0,0,0,0);
	return me;
}
glidias.Frustum.prototype.planes = null;
glidias.Frustum.prototype.toString = function() {
	return "[[Frustum]" + this.planes + "]]";
}
glidias.Frustum.prototype.fillNewPlanes = function() {
	var len = this.planes.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		this.planes[i] = new glidias.Vec3(0,0,0,0);
	}
}
glidias.Frustum.prototype.debugPts = null;
glidias.Frustum.prototype.setup4FromPortal = function(camX,camY,camZ,pts,o) {
	if(o == null) o = 0;
	var a;
	var b;
	this.debugPts = pts;
	var ax, ay, az;
	var bx, by, bz;
	var vx, vy, vz;
	var p;
	var planes = this.planes;
	p = planes[o];
	a = pts[0];
	b = pts[1];
	ax = a.x - camX;
	ay = a.y - camY;
	az = a.z - camZ;
	bx = b.x - camX;
	by = b.y - camY;
	bz = b.z - camZ;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * camX + vy * camY + vz * camZ;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	o++;
	p = planes[o];
	a = pts[1];
	b = pts[2];
	ax = a.x - camX;
	ay = a.y - camY;
	az = a.z - camZ;
	bx = b.x - camX;
	by = b.y - camY;
	bz = b.z - camZ;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * camX + vy * camY + vz * camZ;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	o++;
	p = planes[o];
	a = pts[2];
	b = pts[3];
	ax = a.x - camX;
	ay = a.y - camY;
	az = a.z - camZ;
	bx = b.x - camX;
	by = b.y - camY;
	bz = b.z - camZ;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * camX + vy * camY + vz * camZ;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	o++;
	p = planes[o];
	a = pts[3];
	b = pts[0];
	ax = a.x - camX;
	ay = a.y - camY;
	az = a.z - camZ;
	bx = b.x - camX;
	by = b.y - camY;
	bz = b.z - camZ;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * camX + vy * camY + vz * camZ;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	return this;
}
glidias.Frustum.prototype.checkVisibility = function(a) {
	var side = 1;
	var planes = this.planes;
	var len = planes.length;
	var minX = a.minX;
	var minY = a.minY;
	var minZ = a.minZ;
	var maxX = a.maxX;
	var maxY = a.maxY;
	var maxZ = a.maxZ;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var plane = planes[i];
		if(plane.x >= 0) {
			if(plane.y >= 0) {
				if(plane.z >= 0) {
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
				} else if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
			} else if(plane.z >= 0) {
				if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
			} else if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
		} else if(plane.y >= 0) {
			if(plane.z >= 0) {
				if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
			} else if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
		} else if(plane.z >= 0) {
			if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
		} else if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
		side <<= 1;
	}
	return true;
}
glidias.Frustum.prototype.checkFrustumCulling = function(a,culling) {
	var side = 1;
	var planes = this.planes;
	var len = planes.length;
	var minX = a.minX;
	var minY = a.minY;
	var minZ = a.minZ;
	var maxX = a.maxX;
	var maxY = a.maxY;
	var maxZ = a.maxZ;
	var rootCull = culling;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var plane = planes[i];
		if((culling & side) != 0) {
			if(plane.x >= 0) {
				if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return -1;
						if(minX * plane.x + minY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
					} else {
						if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return -1;
						if(minX * plane.x + minY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
					}
				} else if(plane.z >= 0) {
					if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return -1;
					if(minX * plane.x + maxY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
				} else {
					if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return -1;
					if(minX * plane.x + maxY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
				}
			} else if(plane.y >= 0) {
				if(plane.z >= 0) {
					if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return -1;
					if(maxX * plane.x + minY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
				} else {
					if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return -1;
					if(maxX * plane.x + minY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
				}
			} else if(plane.z >= 0) {
				if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return -1;
				if(maxX * plane.x + maxY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
			} else {
				if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return -1;
				if(maxX * plane.x + maxY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
			}
		}
		side <<= 1;
	}
	return culling;
}
glidias.Frustum.prototype.setup6FromWorldMatrix = function(te,screenWhalf,screenHhalf,focalLength,near,far) {
	if(far == null) far = 9999999999;
	if(near == null) near = 0;
	var planes = this.planes;
	var p;
	var vx;
	var vy;
	var vz;
	var ax;
	var ay;
	var az;
	var bx;
	var by;
	var bz;
	var cx = te[12];
	var cy = te[13];
	var cz = te[14];
	p = planes[0];
	vz = -focalLength;
	vx = -screenWhalf;
	vy = -screenHhalf;
	ax = te[0] * vx + te[4] * vy + te[8] * vz;
	ay = te[1] * vx + te[5] * vy + te[9] * vz;
	az = te[2] * vx + te[6] * vy + te[10] * vz;
	var tx = ax;
	var ty = ay;
	var tz = az;
	vz = -focalLength;
	vx = screenWhalf;
	vy = -screenHhalf;
	bx = te[0] * vx + te[4] * vy + te[8] * vz;
	by = te[1] * vx + te[5] * vy + te[9] * vz;
	bz = te[2] * vx + te[6] * vy + te[10] * vz;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * cx + vy * cy + vz * cz;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	ax = bx;
	ay = by;
	az = bz;
	p = planes[1];
	vz = -focalLength;
	vx = screenWhalf;
	vy = screenHhalf;
	bx = te[0] * vx + te[4] * vy + te[8] * vz;
	by = te[1] * vx + te[5] * vy + te[9] * vz;
	bz = te[2] * vx + te[6] * vy + te[10] * vz;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * cx + vy * cy + vz * cz;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	ax = bx;
	ay = by;
	az = bz;
	p = planes[2];
	vz = -focalLength;
	vx = -screenWhalf;
	vy = screenHhalf;
	bx = te[0] * vx + te[4] * vy + te[8] * vz;
	by = te[1] * vx + te[5] * vy + te[9] * vz;
	bz = te[2] * vx + te[6] * vy + te[10] * vz;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * cx + vy * cy + vz * cz;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	ax = bx;
	ay = by;
	az = bz;
	p = planes[3];
	bx = tx;
	by = ty;
	bz = tz;
	vx = ay * bz - az * by;
	vy = az * bx - ax * bz;
	vz = ax * by - ay * bx;
	p.x = vx;
	p.y = vy;
	p.z = vz;
	p.w = vx * cx + vy * cy + vz * cz;
	{
		p.x = -p.x;
		p.y = -p.y;
		p.z = -p.z;
		p.w = -p.w;
	}
	vx = 0;
	vy = 0;
	vz = -1;
	tx = te[0] * vx + te[4] * vy + te[8] * vz;
	ty = te[1] * vx + te[5] * vy + te[9] * vz;
	tz = te[2] * vx + te[6] * vy + te[10] * vz;
	p = planes[4];
	p.x = tx;
	p.y = ty;
	p.z = tz;
	p.w = tx * cx + ty * cy + tz * cz;
	p = planes[5];
	p.x = tx;
	p.y = ty;
	p.z = tz;
	p.w = tx * cx + ty * cy + tz * cz;
}
glidias.Frustum.prototype.__class__ = glidias.Frustum;
glidias.IAABB = function() { }
glidias.IAABB.__name__ = ["glidias","IAABB"];
glidias.IAABB.prototype.minX = null;
glidias.IAABB.prototype.minY = null;
glidias.IAABB.prototype.minZ = null;
glidias.IAABB.prototype.maxX = null;
glidias.IAABB.prototype.maxY = null;
glidias.IAABB.prototype.maxZ = null;
glidias.IAABB.prototype.__class__ = glidias.IAABB;
glidias.AABBPortal = function(p) {
	if( p === $_ ) return;
	this.points = new Array();
}
glidias.AABBPortal.__name__ = ["glidias","AABBPortal"];
glidias.AABBPortal.prototype.minX = null;
glidias.AABBPortal.prototype.minY = null;
glidias.AABBPortal.prototype.minZ = null;
glidias.AABBPortal.prototype.maxX = null;
glidias.AABBPortal.prototype.maxY = null;
glidias.AABBPortal.prototype.maxZ = null;
glidias.AABBPortal.prototype.points = null;
glidias.AABBPortal.prototype.width = null;
glidias.AABBPortal.prototype.height = null;
glidias.AABBPortal.prototype.target = null;
glidias.AABBPortal.prototype.id = null;
glidias.AABBPortal.prototype.getReverse = function(newTarget,direction,version2) {
	if(version2 == null) version2 = false;
	var meNew = new glidias.AABBPortal();
	glidias.AABBUtils.match(meNew,this);
	var len = this.points.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		meNew.points[i] = this.points[i].clone();
	}
	meNew.points.reverse();
	meNew.width = this.width;
	meNew.height = this.height;
	meNew.target = newTarget;
	return meNew;
}
glidias.AABBPortal.prototype.clone2 = function(newTarget,ox,oy,oz) {
	if(oz == null) oz = 0;
	if(oy == null) oy = 0;
	if(ox == null) ox = 0;
	var meNew = new glidias.AABBPortal();
	{
		meNew.minX = 1.7976931348623157e+308;
		meNew.minY = 1.7976931348623157e+308;
		meNew.minZ = 1.7976931348623157e+308;
		meNew.maxX = -1.7976931348623157e+308;
		meNew.maxY = -1.7976931348623157e+308;
		meNew.maxZ = -1.7976931348623157e+308;
	}
	meNew.width = this.width;
	meNew.height = this.height;
	meNew.target = newTarget;
	var mePoints = [];
	var len = this.points.length;
	var p;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		p = this.points[i];
		p = new glidias.Vec3(p.x,p.y,p.z,p.w);
		p.x += ox;
		p.y += oy;
		p.z += oz;
		mePoints[i] = p;
		glidias.AABBUtils.expand(p.x,p.y,p.z,meNew);
	}
	meNew.points = mePoints;
	meNew.points.reverse();
	return meNew;
}
glidias.AABBPortal.prototype.traceValid = function() {
	if(this.points[0].z <= 0) haxe.Log.trace("Invalid first point z!" + this.points[0].z,{ fileName : "AABBPortal.hx", lineNumber : 135, className : "glidias.AABBPortal", methodName : "traceValid"});
	if(this.points[0].z == this.points[2].z) haxe.Log.trace("Invalid first point z 2222!",{ fileName : "AABBPortal.hx", lineNumber : 136, className : "glidias.AABBPortal", methodName : "traceValid"});
}
glidias.AABBPortal.prototype.setup = function(target,door,gridSize,doorWidth,doorHeight,groundPos) {
	this.target = target;
	this.height = doorHeight;
	this.width = doorWidth;
	var south = glidias.AABBPortalPlane.DIRECTIONS[2];
	var east = glidias.AABBPortalPlane.DIRECTIONS[3];
	var up = glidias.AABBPortalPlane.UP;
	var dir = glidias.AABBPortalPlane.getDoorDir(door);
	var sx = door.x;
	var sy = door.y;
	var reverse = dir == 0 || dir == 1;
	if(reverse) {
		if(dir == 1) sx += 1; else sy += 1;
	}
	{
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	var px;
	var py;
	var pz;
	var p;
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos + doorHeight;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	if((dir & 1) != 0) sy += 1; else sx += 1;
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos + doorHeight;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	if(dir == 1 || dir == 2) this.points.reverse();
	glidias.AABBUtils.expandWithPoint(this.points[0],this);
	glidias.AABBUtils.expandWithPoint(this.points[2],this);
	return dir;
}
glidias.AABBPortal.prototype.__class__ = glidias.AABBPortal;
glidias.AABBPortal.__interfaces__ = [glidias.IAABB];
glidias.RoomFiller = function(async) {
	if( async === $_ ) return;
	if(async == null) async = 0;
	this.wallColor = "#3d3c37";
	this.enableOutdoors = true;
	this.doorHeight = 13;
	this.async = async;
	this.roomInterv = -1;
	this.drawTile = new glidias.Rectangle(0,0,10,10);
	this.grid = new Array();
	this.doors = new Array();
	this.rooms = new Array();
	var _g = 0;
	while(_g < 80) {
		var i = _g++;
		this.grid[i] = new Array();
		var _g1 = 0;
		while(_g1 < 80) {
			var j = _g1++;
			this.grid[i][j] = 0;
		}
	}
	this.random = new glidias.PM_PRNG(12345);
}
glidias.RoomFiller.__name__ = ["glidias","RoomFiller"];
glidias.RoomFiller.prototype.grid = null;
glidias.RoomFiller.prototype.doors = null;
glidias.RoomFiller.prototype.rooms = null;
glidias.RoomFiller.prototype.random = null;
glidias.RoomFiller.prototype.roomInterv = null;
glidias.RoomFiller.prototype.currFeature = null;
glidias.RoomFiller.prototype.drawTile = null;
glidias.RoomFiller.prototype.wallColor = null;
glidias.RoomFiller.prototype.enableOutdoors = null;
glidias.RoomFiller.prototype.doorHeight = null;
glidias.RoomFiller.prototype.async = null;
glidias.RoomFiller.prototype._onComplete = null;
glidias.RoomFiller.prototype.run = function(onComplete) {
	this._onComplete = onComplete;
	haxe.Log.trace("RUNNING...",{ fileName : "RoomFiller.hx", lineNumber : 89, className : "glidias.RoomFiller", methodName : "run"});
	this.createFirstRoom();
	if(this.async == 0) {
	} else {
	}
}
glidias.RoomFiller.prototype.getHTMLFromSectors = function(map,gridSize,wallMat,floorMat,ceilingMat) {
	if(floorMat == null) floorMat = wallMat;
	if(ceilingMat == null) ceilingMat = floorMat;
	var str = "";
	var mask;
	var sector;
	var uLen;
	var len = map.length;
	var pWalls;
	var p;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		sector = map[i];
		str += "<div class=\"Mesh Object3D\">";
		str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP.getReverse(),sector,gridSize).getHTML(ceilingMat);
		str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP,sector,gridSize).getHTML(floorMat);
		mask = 0;
		pWalls = sector.portalWalls;
		uLen = pWalls.length;
		var _g1 = 0;
		while(_g1 < uLen) {
			var u = _g1++;
			p = pWalls[u];
			str += p.getHTML(sector,gridSize,wallMat);
			mask |= 1 << p.direction;
		}
		if((mask & 1) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[0],sector,gridSize).getHTML(wallMat);
		if((mask & 4) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[2],sector,gridSize).getHTML(wallMat);
		if((mask & 2) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[1],sector,gridSize).getHTML(wallMat);
		if((mask & 8) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[3],sector,gridSize).getHTML(wallMat);
		str += "</div>";
	}
	return str;
}
glidias.RoomFiller.prototype.getSectors = function(gridSize,minRoomHeight,possibleRoomHeightAdd,groundPos) {
	if(groundPos == null) groundPos = 0;
	if(possibleRoomHeightAdd == null) possibleRoomHeightAdd = 0;
	var map = new Array();
	var wallMask;
	var len;
	var door;
	var doorType;
	var sector;
	var rect;
	var portal;
	var portalPlane;
	len = this.rooms.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		rect = this.rooms[i];
		var uLen = Std["int"](rect.width);
		var vLen = Std["int"](rect.height);
		var invalid = false;
		var _g1 = Std["int"](rect.x);
		while(_g1 < uLen) {
			var u = _g1++;
			var _g2 = Std["int"](rect.y);
			while(_g2 < vLen) {
				var v = _g2++;
				if(this.grid[u][v] < 4) {
					haxe.Log.trace("NOn floor detected over room!  " + i,{ fileName : "RoomFiller.hx", lineNumber : 177, className : "glidias.RoomFiller", methodName : "getSectors"});
					invalid = true;
					break;
				}
			}
			if(invalid) break;
		}
		sector = new glidias.AABBSector();
		sector.setup(rect,gridSize,minRoomHeight + Math.round(Math.random() * possibleRoomHeightAdd),groundPos);
		map.push(sector);
	}
	len = this.doors.length;
	var target;
	var direction;
	var d;
	var c;
	var exit = false;
	var addedPortals = [];
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		door = this.doors[i];
		doorType = this.getDoorType(door);
		if(doorType >= 4) {
			target = this.getSectorIndexAt(door.x - door.z,door.y - door.w);
			haxe.Log.trace("indoors!" + [door.x,door.y] + " : " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 206, className : "glidias.RoomFiller", methodName : "getSectors"});
		} else if(doorType == 0) {
			target = -1;
			if(!this.enableOutdoors) continue;
			haxe.Log.trace("Outdoors!",{ fileName : "RoomFiller.hx", lineNumber : 211, className : "glidias.RoomFiller", methodName : "getSectors"});
		} else if(doorType == 1) {
			this.grid[door.x][door.y] = 3;
			if(door.z != 0) {
				d = glidias.AABBPortalPlane.norm(door.z);
				door.z += d;
				door.x -= d;
				while(true) {
					c = door.x - d;
					exit = c < 0 || c >= 80;
					if(exit) break;
					if(this.grid[c - d][door.y] >= 4) {
						this.grid[door.x][door.y] = 2;
						break;
					}
					door.z += d;
					door.x = c;
					this.grid[c][door.y] = 3;
					d++;
				}
				if(exit) continue;
			} else {
				d = glidias.AABBPortalPlane.norm(door.w);
				door.w += d;
				door.y -= d;
				while(true) {
					c = door.y - d;
					exit = c < 0 || c >= 80;
					if(exit) break;
					if(this.grid[door.x][c - d] >= 4) {
						this.grid[door.x][door.y] = 2;
						break;
					}
					door.w += d;
					door.y = c;
					this.grid[door.x][c] = 3;
					d++;
				}
				if(exit) continue;
			}
			target = !exit?this.getSectorIndexAt(door.x - door.z,door.y - door.w):-1;
		} else {
			haxe.Log.trace("Could not resolve door type. " + doorType + ". " + [door.x,door.y] + ": " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 275, className : "glidias.RoomFiller", methodName : "getSectors"});
			continue;
		}
		sector = new glidias.AABBSector();
		var tarOffset = target >= 0?2:1;
		rect = new glidias.Rectangle(door.x - (door.z < 0?tarOffset:0),door.y - (door.w < 0?tarOffset:0),door.z != 0?this.abs(door.z) + 1:1,door.w != 0?this.abs(door.w) + 1:1);
		sector.setup(rect,gridSize,this.doorHeight,groundPos);
		map.push(sector);
		portal = new glidias.AABBPortal();
		portal.id = "c_s";
		direction = portal.setup(target >= 0?map[target]:null,door,gridSize,gridSize,this.doorHeight,groundPos);
		sector.addPortal(portal,direction);
		addedPortals.push(portal);
		direction = glidias.AABBPortalPlane.getReverse(direction);
		var p;
		if(target >= 0) {
			p = portal.getReverse(sector,direction);
			p.id = "s_c";
			map[target].addPortal(p,direction);
			addedPortals.push(p);
		}
		target = this.getSectorIndexAt(door.x + door.z + glidias.AABBPortalPlane.norm(door.z),door.y + door.w + glidias.AABBPortalPlane.norm(door.w));
		if(target < 0) {
			haxe.Log.trace("Dead end.",{ fileName : "RoomFiller.hx", lineNumber : 325, className : "glidias.RoomFiller", methodName : "getSectors"});
			continue;
		}
		var copyDir = glidias.AABBPortalPlane.DIRECTIONS[direction];
		var copyOffset = (direction & 1) != 0?(glidias.AABBPortalPlane.abs(door.z) + 1) * gridSize:(glidias.AABBPortalPlane.abs(door.w) + 1) * gridSize;
		portal = portal.clone2(map[target],copyDir.x * -copyOffset,copyDir.y * -copyOffset,copyDir.z * -copyOffset);
		portal.id = "c_s2";
		sector.addPortal(portal,direction);
		addedPortals.push(portal);
		direction = glidias.AABBPortalPlane.getReverse(direction);
		p = portal.getReverse(sector,direction,true);
		p.id = "s_c2";
		map[target].addPortal(p,direction);
		addedPortals.push(p);
	}
	len = addedPortals.length;
	var points;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		portal = addedPortals[i];
		points = portal.points;
		portal.points = [points[3],points[0],points[1],points[2]];
	}
	return map;
}
glidias.RoomFiller.prototype.getSectorIndexAt = function(tx,ty) {
	if(tx < 0 || tx >= 80 || ty < 0 || ty >= 80) haxe.Log.trace("out of bound getSectorIndexAt",{ fileName : "RoomFiller.hx", lineNumber : 373, className : "glidias.RoomFiller", methodName : "getSectorIndexAt"});
	return this.grid[tx][ty] - 4;
}
glidias.RoomFiller.prototype.abs = function(w) {
	return w < 0?-w:w;
}
glidias.RoomFiller.prototype.getDoorType = function(door) {
	var xer = door.x - door.z;
	if(xer < 0 || xer >= 80) return 0;
	var yer = door.y - door.w;
	if(yer < 0 || yer >= 80) return 0;
	return this.grid[xer][yer];
}
glidias.RoomFiller.prototype.testUpdate = function(callbacker,gridSize) {
	if(gridSize == null) gridSize = 5;
	this.drawTile.width = gridSize;
	this.drawTile.height = gridSize;
	var _g = 0;
	while(_g < 80) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 80) {
			var j = _g1++;
			this.drawTile.x = i * gridSize;
			this.drawTile.y = j * gridSize;
			switch(this.grid[i][j]) {
			case 0:
				callbacker(this.drawTile.toHTML("background-color:#000000",null));
				break;
			case 1:
				callbacker(this.drawTile.toHTML("background-color:" + this.wallColor,null));
				break;
			case 2:
				callbacker(this.drawTile.toHTML("background-color:#FF0000",null));
				break;
			case 3:
				callbacker(this.drawTile.toHTML("background-color:#733F12",null));
				break;
			default:
				callbacker(this.drawTile.toHTML("background-color:#CCCCCC",null));
			}
		}
	}
	var i = 0;
	while(i < 80) {
		this.drawTile.x = i * gridSize;
		this.drawTile.y = 0;
		callbacker(this.drawTile.toHTML("background-color:#FFFF00",null));
		i += 10;
	}
	i = 0;
	while(i < 80) {
		this.drawTile.x = 0;
		this.drawTile.y = i * gridSize;
		callbacker(this.drawTile.toHTML("background-color:#FFFF00",null));
		i += 10;
	}
}
glidias.RoomFiller.prototype.floor = function(val) {
	return Math.floor(val);
}
glidias.RoomFiller.prototype.createFirstRoom = function() {
	var fw = this.random.nextIntRange(6,12);
	var fh = this.random.nextIntRange(6,12);
	this.createRoom(Math.floor(80 * .5 - fw * .5),Math.floor(80 * .5 - fh * .5),fw,fh);
	this.currFeature = 50;
	if(this.async == 0) {
		while(this.createFeature()) {
		}
		if(this._onComplete) {
			this._onComplete();
			return;
		}
	} else this.roomInterv = 0;
}
glidias.RoomFiller.prototype.clearInterval = function(ier) {
}
glidias.RoomFiller.prototype.setInterval = function(target,timeMs) {
	return 0;
}
glidias.RoomFiller.prototype.createFeature = function() {
	if(this.currFeature-- == 0) {
		if(this.roomInterv != -1) null;
		haxe.Log.trace("Done.",{ fileName : "RoomFiller.hx", lineNumber : 501, className : "glidias.RoomFiller", methodName : "createFeature"});
		return false;
	}
	var i, j;
	var giveUp = 0;
	var tx = -1;
	var ty = -1;
	var tt, tb, tl, tr;
	var dir = -1;
	do {
		i = this.random.nextIntRange(2,78);
		j = this.random.nextIntRange(2,78);
		if(this.grid[i][j] == 1) {
			tt = this.grid[i][j - 1];
			tb = this.grid[i][j + 1];
			tl = this.grid[i - 1][j];
			tr = this.grid[i + 1][j];
			if(tt == 0 && (tl == 1 && tr == 1)) {
				tx = i;
				ty = j - 1;
				dir = 0;
			} else if(tb == 0 && (tl == 1 && tr == 1)) {
				tx = i;
				ty = j + 1;
				dir = 1;
			} else if(tl == 0 && (tt == 1 && tb == 1)) {
				tx = i - 1;
				ty = j;
				dir = 2;
			} else if(tr == 0 && (tt == 1 && tb == 1)) {
				tx = i + 1;
				ty = j;
				dir = 3;
			}
		}
	} while(dir == -1 && giveUp++ < 200);
	if(dir != -1) do {
		var w, h;
		var sx, sy;
		var feature = Math.random();
		if(feature < .3) {
			if(dir == 0 || dir == 1) {
				sx = tx - 1;
				w = 3;
				h = this.random.nextIntRange(10,20);
				if(dir == 0) {
					sy = ty - h;
					if(sy < 1) continue;
				} else {
					sy = ty + 1;
					if(ty + h > 79) continue;
				}
			} else {
				sy = ty - 1;
				w = this.random.nextIntRange(10,20);
				h = 3;
				if(dir == 2) {
					sx = tx - w;
					if(sx < 1) continue;
				} else {
					sx = tx + 1;
					if(tx + w > 79) continue;
				}
			}
		} else if(dir == 0 || dir == 1) {
			w = this.random.nextIntRange(6,14);
			h = this.random.nextIntRange(6,14);
			sx = tx - Math.floor(w * .5);
			if(sx < 1 || sx + w > 79) continue;
			if(dir == 0) {
				sy = ty - h;
				if(sy < 1) continue;
			} else {
				sy = ty + 1;
				if(ty + h > 79) continue;
			}
		} else {
			w = this.random.nextIntRange(6,14);
			h = this.random.nextIntRange(6,14);
			sy = ty - Math.floor(h * .5);
			if(sy < 1 || sy + h > 79) return true;
			if(dir == 2) {
				sx = tx - w;
				if(sx < 1) continue;
			} else {
				sx = tx + 1;
				if(tx + w > 79) continue;
			}
		}
		if(sx < 1) sx = 2;
		if(sx + w > 78) w = sx - 80 - 2;
		if(sy < 1) sy = 1;
		if(sy + h > 78) h = sy - 80 - 2;
		if(this.createRoom(sx,sy,w,h)) {
			this.grid[tx][ty] = 2;
			switch(dir) {
			case 0:
				this.grid[tx][ty + 1] = 3;
				this.doors.push(new glidias.Int4(tx,ty,0,1));
				break;
			case 1:
				this.grid[tx][ty - 1] = 3;
				this.doors.push(new glidias.Int4(tx,ty,0,-1));
				break;
			case 2:
				this.grid[tx + 1][ty] = 3;
				this.doors.push(new glidias.Int4(tx,ty,1,0));
				break;
			case 3:
				this.grid[tx - 1][ty] = 3;
				this.doors.push(new glidias.Int4(tx,ty,-1,0));
				break;
			}
			break;
		}
	} while(giveUp++ < 200);
	return true;
}
glidias.RoomFiller.prototype.createRoom = function(s,e,w,h) {
	w += s;
	h += e;
	var roomLen = this.rooms.length;
	if(this.checkArea(s,e,w,h) && (s != w && e != h)) {
		var _g1 = s, _g = w + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = e, _g2 = h + 1;
			while(_g3 < _g2) {
				var j = _g3++;
				if(this.grid[i][j] == 3) haxe.Log.trace("Covered corridoor exception!",{ fileName : "RoomFiller.hx", lineNumber : 714, className : "glidias.RoomFiller", methodName : "createRoom"});
				if(i == s || i == w || j == e || j == h) this.grid[i][j] = 1; else this.grid[i][j] = 4 + roomLen;
			}
		}
		w = w - s - 1;
		h = h - e - 1;
		if(w < 1 || h < 1) return true;
		this.rooms.push(new glidias.Rectangle(s + 1,e + 1,w,h));
		return true;
	}
	return false;
}
glidias.RoomFiller.prototype.checkArea = function(s,e,w,h) {
	var _g1 = s, _g = w + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = e, _g2 = h + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			if(this.grid[i][j] != 0) return false;
		}
	}
	return true;
}
glidias.RoomFiller.prototype.__class__ = glidias.RoomFiller;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
glidias.Vec3 = function(x,y,z,w) {
	if( x === $_ ) return;
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}
glidias.Vec3.__name__ = ["glidias","Vec3"];
glidias.Vec3.prototype.x = null;
glidias.Vec3.prototype.y = null;
glidias.Vec3.prototype.z = null;
glidias.Vec3.prototype.w = null;
glidias.Vec3.prototype.toString = function() {
	return "[Vec3 " + this.x + "," + this.y + "," + this.z + "]";
}
glidias.Vec3.prototype.normalize = function() {
	var mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	if(mag != 0 && mag != 1) {
		mag = 1 / mag;
		this.x *= mag;
		this.y *= mag;
		this.z *= mag;
	}
}
glidias.Vec3.prototype.normalizeAndCalcOffset = function(px,py,pz) {
	this.normalize();
	this.w = this.x * px + py * this.y + pz * this.z;
}
glidias.Vec3.prototype.set = function(x,y,z,w) {
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}
glidias.Vec3.prototype.add3 = function(x,y,z) {
	this.x += x;
	this.y += y;
	this.z += z;
}
glidias.Vec3.prototype.subtract3 = function(x,y,z) {
	this.x -= x;
	this.y -= y;
	this.z -= z;
}
glidias.Vec3.prototype.copyReverse = function(ref) {
	this.x = -ref.x;
	this.y = -ref.y;
	this.z = -ref.z;
	this.w = ref.w;
}
glidias.Vec3.prototype.copy = function(ref) {
	this.x = ref.x;
	this.y = ref.y;
	this.z = ref.z;
	this.w = ref.w;
}
glidias.Vec3.prototype.crossProduct = function(b) {
	return new glidias.Vec3(this.y * b.z - this.z * b.y,this.z * b.x - this.x * b.z,this.x * b.y - this.y * b.x);
}
glidias.Vec3.prototype.dotProduct = function(b) {
	return this.x * b.x + this.y * b.y + this.z * b.z;
}
glidias.Vec3.prototype.getReverse = function() {
	return new glidias.Vec3(-this.x,-this.y,-this.z,this.w);
}
glidias.Vec3.prototype.lengthSquared = function() {
	return this.x * this.x + this.y * this.y + this.z * this.z;
}
glidias.Vec3.prototype.clone = function() {
	return new glidias.Vec3(this.x,this.y,this.z,this.w);
}
glidias.Vec3.prototype.divideScalar = function(amt) {
	this.x /= amt;
	this.y /= amt;
	this.z /= amt;
}
glidias.Vec3.prototype.scaleBy = function(amt) {
	this.x *= amt;
	this.y *= amt;
	this.z *= amt;
}
glidias.Vec3.prototype.flip = function() {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	this.w = -this.w;
}
glidias.Vec3.prototype.__class__ = glidias.Vec3;
glidias.AABBPortalPlane = function(p) {
	if( p === $_ ) return;
	{
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	this.portals = new Array();
}
glidias.AABBPortalPlane.__name__ = ["glidias","AABBPortalPlane"];
glidias.AABBPortalPlane.norm = function(w) {
	return w != 0?w < 0?-1:1:0;
}
glidias.AABBPortalPlane.getPlaneResult = function(dir,sector,gridSize) {
	var south = glidias.AABBPortalPlane.DIRECTIONS[2];
	var east = glidias.AABBPortalPlane.DIRECTIONS[3];
	var upwards = glidias.AABBPortalPlane.UP;
	var rect = sector.rect;
	var planeResult = new glidias.PlaneResult();
	dir = new glidias.Vec3(dir.x,dir.y,dir.z,dir.w);
	var p;
	var x;
	var y;
	var z;
	var b;
	var dirId;
	if((p = dir.x * south.x + dir.y * south.y + dir.z * south.z) != 0) dirId = p < 0?0:2; else if((p = dir.x * east.x + dir.y * east.y + dir.z * east.z) != 0) dirId = p < 0?1:3; else {
		if(!((p = dir.x * upwards.x + dir.y * upwards.y + dir.z * upwards.z) != 0)) haxe.Log.trace("Assumption failed for final dot up/down",{ fileName : "AABBPortalPlane.hx", lineNumber : 74, className : "glidias.AABBPortalPlane", methodName : "getPlaneResult"});
		dirId = p < 0?5:4;
	}
	var b1 = glidias.AABBPortalPlane.OFFSET_BITMASKS[dirId];
	var up;
	var right = glidias.AABBPortalPlane.UP.crossProduct(dir);
	if(right.x * right.x + right.y * right.y + right.z * right.z == 0) {
		right = dir.crossProduct(glidias.AABBPortalPlane.DIRECTIONS[2]);
		up = right.crossProduct(glidias.AABBPortalPlane.UP);
	} else up = glidias.AABBPortalPlane.UP.getReverse();
	planeResult.up = up;
	planeResult.right = right;
	planeResult.look = dir;
	if(dirId == 4 || dirId == 5) {
		planeResult.width = rect.width * gridSize;
		planeResult.height = rect.height * gridSize;
	} else {
		planeResult.width = dirId == 3 || dirId == 1?rect.height * gridSize:rect.width * gridSize;
		planeResult.height = sector.ceilHeight;
	}
	p = (rect.x + ((b1 & 1) != 0?rect.width:0)) * gridSize;
	x = east.x * p;
	y = east.y * p;
	z = east.z * p;
	p = (rect.y + ((b1 & 2) != 0?rect.height:0)) * gridSize;
	x += south.x * p;
	y += south.y * p;
	z += south.z * p;
	p = sector.groundPos + sector.ceilHeight - ((b1 & 4) != 0?sector.ceilHeight:0);
	x += upwards.x * p;
	y += upwards.y * p;
	z += upwards.z * p;
	planeResult.pos = new glidias.Vec3(x,y,z);
	return planeResult;
}
glidias.AABBPortalPlane.setEastSouthUp = function(east,south,up) {
	glidias.AABBPortalPlane.DIRECTIONS[3].copy(east);
	glidias.AABBPortalPlane.DIRECTIONS[2].copy(south);
	glidias.AABBPortalPlane.UP.copy(up);
	glidias.AABBPortalPlane.DIRECTIONS[1].copyReverse(east);
	glidias.AABBPortalPlane.DIRECTIONS[0].copyReverse(south);
}
glidias.AABBPortalPlane.getDoorDir = function(door) {
	var dir = 0;
	dir |= door.z != 0?1:0;
	dir |= door.z != 0?door.z > 0?2:0:door.w > 0?2:0;
	return dir;
}
glidias.AABBPortalPlane.isDoorHorizontal = function(door) {
	return door.z != 0;
}
glidias.AABBPortalPlane.isDoorValHorizontal = function(val) {
	return (val & 1) != 0;
}
glidias.AABBPortalPlane.getReverse = function(direction) {
	return direction ^= 2;
}
glidias.AABBPortalPlane.isReversed = function(dir) {
	return dir == 0 || dir == 1;
}
glidias.AABBPortalPlane.getMagnitudeOffset = function(door) {
	return door.z != 0?glidias.AABBPortalPlane.abs(door.z):glidias.AABBPortalPlane.abs(door.w);
}
glidias.AABBPortalPlane.abs = function(val) {
	return val < 0?-val:val;
}
glidias.AABBPortalPlane.absFloat = function(val) {
	return val < 0?-val:val;
}
glidias.AABBPortalPlane.prototype.direction = null;
glidias.AABBPortalPlane.prototype.minX = null;
glidias.AABBPortalPlane.prototype.minY = null;
glidias.AABBPortalPlane.prototype.minZ = null;
glidias.AABBPortalPlane.prototype.maxX = null;
glidias.AABBPortalPlane.prototype.maxY = null;
glidias.AABBPortalPlane.prototype.maxZ = null;
glidias.AABBPortalPlane.prototype.portals = null;
glidias.AABBPortalPlane.prototype.addPortal = function(portal) {
	glidias.AABBUtils.expand2(this,portal);
	this.portals.push(portal);
}
glidias.AABBPortalPlane.prototype.getHTML = function(sector,gridSize,mat) {
	var planeResult = glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[this.direction],sector,gridSize);
	var p;
	var html = "<div style=" + "" + "-webkit-transform:matrix3d(" + [-planeResult.right.x,-planeResult.right.y,-planeResult.right.z,0,planeResult.up.x,planeResult.up.y,planeResult.up.z,0,planeResult.look.x,planeResult.look.y,planeResult.look.z,0,planeResult.pos.x,planeResult.pos.y,planeResult.pos.z,1].join(",") + ");" + "" + "\">";
	var x = 0;
	var y = 0;
	var width = planeResult.width;
	var doorwayHeight = this.portals[0].height;
	var aboveDoorwayHeight = planeResult.height - doorwayHeight;
	if(aboveDoorwayHeight > 0) {
		p = glidias.PlaneResult.getIdentity();
		p.width = planeResult.width;
		p.height = aboveDoorwayHeight;
		html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
	}
	var pos = planeResult.pos;
	var right = planeResult.right.getReverse();
	var baseOffset = pos.x * right.x + pos.y * right.y + pos.z * right.z;
	var up = glidias.AABBPortalPlane.UP;
	this.portals.sort(function(a,b) {
		var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
		var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
		if(a2 < b2) return -1; else if(a2 == b2) return 0;
		return 1;
	});
	var len = this.portals.length;
	var portal;
	var c;
	var lastC = -99999999;
	var o;
	var m = 0;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		portal = this.portals[i];
		c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
		o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
		if(o < c) c = o;
		if(lastC > c) haxe.Log.trace("WRONG, shoudl be less!",{ fileName : "AABBPortalPlane.hx", lineNumber : 187, className : "glidias.AABBPortalPlane", methodName : "getHTML"});
		lastC = c;
		o = baseOffset < c?c - baseOffset:baseOffset - c;
		p = glidias.PlaneResult.getIdentity();
		p.pos.x = m;
		p.pos.y = aboveDoorwayHeight;
		p.width = o - m;
		p.height = portal.height;
		html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
		m = p.pos.x + p.width + portal.width;
	}
	portal = this.portals[len - 1];
	p = glidias.PlaneResult.getIdentity();
	p.pos.x = m;
	p.pos.y = aboveDoorwayHeight;
	p.width = planeResult.width - m;
	p.height = portal.height;
	html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
	html += "</div>";
	return html;
}
glidias.AABBPortalPlane.prototype.__class__ = glidias.AABBPortalPlane;
glidias.AABBPortalPlane.__interfaces__ = [glidias.IAABB];
glidias.Int4 = function(x,y,z,w) {
	if( x === $_ ) return;
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}
glidias.Int4.__name__ = ["glidias","Int4"];
glidias.Int4.prototype.x = null;
glidias.Int4.prototype.y = null;
glidias.Int4.prototype.z = null;
glidias.Int4.prototype.w = null;
glidias.Int4.prototype.__class__ = glidias.Int4;
glidias.PlaneResult = function(p) {
}
glidias.PlaneResult.__name__ = ["glidias","PlaneResult"];
glidias.PlaneResult.getIdentity = function() {
	var me = new glidias.PlaneResult();
	me.pos = new glidias.Vec3(0,0,0);
	me.up = new glidias.Vec3(0,1,0);
	me.right = new glidias.Vec3(-1,0,0);
	me.look = new glidias.Vec3(0,0,1);
	return me;
}
glidias.PlaneResult.prototype.up = null;
glidias.PlaneResult.prototype.right = null;
glidias.PlaneResult.prototype.look = null;
glidias.PlaneResult.prototype.pos = null;
glidias.PlaneResult.prototype.width = null;
glidias.PlaneResult.prototype.height = null;
glidias.PlaneResult.prototype.getHTML = function(mat) {
	return "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(this.width) + "px;height:" + Math.round(this.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-this.right.x,-this.right.y,-this.right.z,0,this.up.x,this.up.y,this.up.z,0,this.look.x,this.look.y,this.look.z,0,this.pos.x,this.pos.y,this.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
}
glidias.PlaneResult.prototype.getOpenHTML = function(mat) {
	return "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(this.width) + "px;height:" + Math.round(this.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-this.right.x,-this.right.y,-this.right.z,0,this.up.x,this.up.y,this.up.z,0,this.look.x,this.look.y,this.look.z,0,this.pos.x,this.pos.y,this.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">";
}
glidias.PlaneResult.prototype.clone = function() {
	var me = new glidias.PlaneResult();
	me.up = this.up.clone();
	me.right = this.right.clone();
	me.look = this.look.clone();
	me.pos = this.pos.clone();
	me.width = this.width;
	me.height = this.height;
	return me;
}
glidias.PlaneResult.prototype.__class__ = glidias.PlaneResult;
glidias.ArrayBuffer = function(p) {
	if( p === $_ ) return;
	this.i = 0;
	this.arr = new Array();
}
glidias.ArrayBuffer.__name__ = ["glidias","ArrayBuffer"];
glidias.ArrayBuffer.prototype.arr = null;
glidias.ArrayBuffer.prototype.i = null;
glidias.ArrayBuffer.prototype.push = function(val) {
	this.arr[this.i++] = val;
}
glidias.ArrayBuffer.prototype.reset = function() {
	this.i = 0;
}
glidias.ArrayBuffer.prototype.__class__ = glidias.ArrayBuffer;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
glidias.Rectangle = function(x,y,width,height) {
	if( x === $_ ) return;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
glidias.Rectangle.__name__ = ["glidias","Rectangle"];
glidias.Rectangle.prototype.x = null;
glidias.Rectangle.prototype.y = null;
glidias.Rectangle.prototype.width = null;
glidias.Rectangle.prototype.height = null;
glidias.Rectangle.prototype.toHTML = function(mat,scale) {
	if(scale == null) scale = 1;
	return "<div style=\"position:absolute;top:" + Math.round(this.y * scale) + "px;left:" + Math.round(this.x * scale) + "px;width:" + Math.round(this.width * scale) + "px;height:" + Math.round(this.height * scale) + "px;" + mat + "\"></div>";
}
glidias.Rectangle.prototype.toString = function() {
	return "rect:" + [this.x,this.y,this.width,this.height];
}
glidias.Rectangle.prototype.__class__ = glidias.Rectangle;
glidias.AABBSector = function(p) {
	if( p === $_ ) return;
	this.id = glidias.AABBSector.ID_COUNT++;
	this.renderId = -999999999;
}
glidias.AABBSector.__name__ = ["glidias","AABBSector"];
glidias.AABBSector.prototype.minX = null;
glidias.AABBSector.prototype.minY = null;
glidias.AABBSector.prototype.minZ = null;
glidias.AABBSector.prototype.maxX = null;
glidias.AABBSector.prototype.maxY = null;
glidias.AABBSector.prototype.maxZ = null;
glidias.AABBSector.prototype.portalWalls = null;
glidias.AABBSector.prototype.renderId = null;
glidias.AABBSector.prototype.rect = null;
glidias.AABBSector.prototype.ceilHeight = null;
glidias.AABBSector.prototype.groundPos = null;
glidias.AABBSector.prototype.dom = null;
glidias.AABBSector.prototype.setVis = function(val) {
	this.dom.style.visibility = val?"visible":"hidden";
}
glidias.AABBSector.prototype.id = null;
glidias.AABBSector.prototype.toString = function() {
	return "Sector:" + this.id + ">>" + this.renderId;
}
glidias.AABBSector.prototype.checkVis = function(camPos,buffer,frus,visibleSectors,renderId) {
	this.dom.style.visibility = "visible";
	this.renderId = renderId;
	visibleSectors.arr[visibleSectors.i++] = this;
	var p;
	var ptl;
	var pl;
	var cp;
	var portal;
	var len = this.portalWalls.length;
	var port;
	var cFrus;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		p = this.portalWalls[i];
		if(frus.checkVisibility(p)) {
			ptl = p.portals;
			pl = ptl.length;
			var _g1 = 0;
			while(_g1 < pl) {
				var u = _g1++;
				portal = ptl[u];
				if(frus.checkVisibility(portal)) {
					port = portal.target;
					if(port == null) continue;
					if(port.renderId != renderId) {
						cFrus = (buffer._i < buffer._len?buffer._vec[buffer._i++]:buffer._vec[buffer._len++] = buffer._method()).setup4FromPortal(camPos.x,camPos.y,camPos.z,portal.points,null);
						cFrus.planes[4] = frus.planes[4];
						cFrus.planes[5] = frus.planes[5];
						port.checkVis(camPos,buffer,cFrus,visibleSectors,renderId);
					}
				}
			}
		}
	}
}
glidias.AABBSector.prototype.setup = function(rect,gridSize,height,groundPos) {
	if(groundPos == null) groundPos = 0;
	{
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	this.portalWalls = new Array();
	this.rect = rect;
	this.ceilHeight = height;
	this.groundPos = groundPos;
	var east = glidias.AABBPortalPlane.DIRECTIONS[3];
	var south = glidias.AABBPortalPlane.DIRECTIONS[2];
	var up = glidias.AABBPortalPlane.UP;
	var x;
	var y;
	var z;
	var a;
	var b;
	var c;
	x = gridSize * rect.x;
	y = gridSize * rect.y;
	z = groundPos;
	a = east.x * x;
	b = east.y * x;
	c = east.z * x;
	a += south.x * y;
	b += south.y * y;
	c += south.z * y;
	a += up.x * z;
	b += up.y * z;
	c += up.z * z;
	{
		if(a < this.minX) this.minX = a;
		if(b < this.minY) this.minY = b;
		if(c < this.minZ) this.minZ = c;
		if(a > this.maxX) this.maxX = a;
		if(b > this.maxY) this.maxY = b;
		if(c > this.maxZ) this.maxZ = c;
	}
	x = gridSize * (rect.x + rect.width);
	y = gridSize * (rect.y + rect.height);
	z = groundPos;
	a = east.x * x;
	b = east.y * x;
	c = east.z * x;
	a += south.x * y;
	b += south.y * y;
	c += south.z * y;
	a += up.x * z;
	b += up.y * z;
	c += up.z * z;
	{
		if(a < this.minX) this.minX = a;
		if(b < this.minY) this.minY = b;
		if(c < this.minZ) this.minZ = c;
		if(a > this.maxX) this.maxX = a;
		if(b > this.maxY) this.maxY = b;
		if(c > this.maxZ) this.maxZ = c;
	}
	x = gridSize * rect.x;
	y = gridSize * rect.y;
	z = groundPos + height;
	a = east.x * x;
	b = east.y * x;
	c = east.z * x;
	a += south.x * y;
	b += south.y * y;
	c += south.z * y;
	a += up.x * z;
	b += up.y * z;
	c += up.z * z;
	{
		if(a < this.minX) this.minX = a;
		if(b < this.minY) this.minY = b;
		if(c < this.minZ) this.minZ = c;
		if(a > this.maxX) this.maxX = a;
		if(b > this.maxY) this.maxY = b;
		if(c > this.maxZ) this.maxZ = c;
	}
	x = gridSize * (rect.x + rect.width);
	y = gridSize * (rect.y + rect.height);
	z = groundPos + height;
	a = east.x * x;
	b = east.y * x;
	c = east.z * x;
	a += south.x * y;
	b += south.y * y;
	c += south.z * y;
	a += up.x * z;
	b += up.y * z;
	c += up.z * z;
	{
		if(a < this.minX) this.minX = a;
		if(b < this.minY) this.minY = b;
		if(c < this.minZ) this.minZ = c;
		if(a > this.maxX) this.maxX = a;
		if(b > this.maxY) this.maxY = b;
		if(c > this.maxZ) this.maxZ = c;
	}
}
glidias.AABBSector.prototype.getWallHTML = function(direction,mat,gridSize) {
	return glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[direction],this,gridSize).getHTML(mat);
}
glidias.AABBSector.prototype.getCeilingHTML = function(mat,gridSize) {
	return glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP.getReverse(),this,gridSize).getHTML(mat);
}
glidias.AABBSector.prototype.getFloorHTML = function(mat,gridSize) {
	return glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP,this,gridSize).getHTML(mat);
}
glidias.AABBSector.prototype.getPortalPlane = function(direction) {
	var len = this.portalWalls.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(this.portalWalls[i].direction == direction) return this.portalWalls[i];
	}
	return null;
}
glidias.AABBSector.prototype.addPortal = function(portal,direction) {
	var portalPlane;
	if((portalPlane = this.getPortalPlane(direction)) == null) {
		portalPlane = new glidias.AABBPortalPlane();
		portalPlane.direction = direction;
		this.portalWalls.push(portalPlane);
	}
	{
		glidias.AABBUtils.expand2(portalPlane,portal);
		portalPlane.portals.push(portal);
	}
}
glidias.AABBSector.prototype.addPortalPlane = function(plane) {
	this.portalWalls.push(plane);
}
glidias.AABBSector.prototype.getPortalList = function() {
	var arr = [];
	var _g1 = 0, _g = this.portalWalls.length;
	while(_g1 < _g) {
		var i = _g1++;
		var portalPlane = this.portalWalls[i];
		var portals = portalPlane.portals;
		var _g3 = 0, _g2 = portals.length;
		while(_g3 < _g2) {
			var u = _g3++;
			arr.push(portals[u]);
		}
	}
	return arr;
}
glidias.AABBSector.prototype.__class__ = glidias.AABBSector;
glidias.AABBSector.__interfaces__ = [glidias.IAABB];
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
glidias.PM_PRNG = function(_seed) {
	if( _seed === $_ ) return;
	if(_seed == null) _seed = 1;
	this.seed = _seed;
}
glidias.PM_PRNG.__name__ = ["glidias","PM_PRNG"];
glidias.PM_PRNG.prototype.seed = null;
glidias.PM_PRNG.prototype.nextInt = function() {
	return this.gen();
}
glidias.PM_PRNG.prototype.nextDouble = function() {
	return this.gen() / 2147483647;
}
glidias.PM_PRNG.prototype.nextIntRange = function(min,max) {
	min -= .4999;
	max += .4999;
	return Math.round(min + (max - min) * this.nextDouble());
}
glidias.PM_PRNG.prototype.nextDoubleRange = function(min,max) {
	return min + (max - min) * this.nextDouble();
}
glidias.PM_PRNG.prototype.gen = function() {
	return this.seed = this.seed * 16807 % 2147483647;
}
glidias.PM_PRNG.prototype.__class__ = glidias.PM_PRNG;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
glidias.ArrayBuffer_glidias_AABBSector = function(p) {
	if( p === $_ ) return;
	this.i = 0;
	this.arr = new Array();
}
glidias.ArrayBuffer_glidias_AABBSector.__name__ = ["glidias","ArrayBuffer_glidias_AABBSector"];
glidias.ArrayBuffer_glidias_AABBSector.prototype.arr = null;
glidias.ArrayBuffer_glidias_AABBSector.prototype.i = null;
glidias.ArrayBuffer_glidias_AABBSector.prototype.push = function(val) {
	this.arr[this.i++] = val;
}
glidias.ArrayBuffer_glidias_AABBSector.prototype.reset = function() {
	this.i = 0;
}
glidias.ArrayBuffer_glidias_AABBSector.prototype.__class__ = glidias.ArrayBuffer_glidias_AABBSector;
glidias.AABBUtils = function() { }
glidias.AABBUtils.__name__ = ["glidias","AABBUtils"];
glidias.AABBUtils.getRect = function(aabb,threshold) {
	if(threshold == null) threshold = .1;
	return new glidias.Rectangle(aabb.minX,aabb.minZ,glidias.AABBUtils.clampMagnitude(aabb.maxX - aabb.minX,threshold),glidias.AABBUtils.clampMagnitude(aabb.maxZ - aabb.minZ,threshold));
}
glidias.AABBUtils.clampMagnitude = function(mag,threshold) {
	if(threshold == null) threshold = .1;
	return mag < 0?threshold:mag < threshold?threshold:mag;
}
glidias.AABBUtils.abs = function(val) {
	return val < 0?-val:val;
}
glidias.AABBUtils.norm = function(w) {
	return w != 0?w < 0?-1:1:0;
}
glidias.AABBUtils.getString = function(aabb) {
	return "AABB: " + [aabb.minX,aabb.minY,aabb.minZ,aabb.maxX,aabb.maxY,aabb.maxZ];
}
glidias.AABBUtils.pointInside = function(aabb,pt) {
	return !(pt.x < aabb.minX || pt.y < aabb.minY || pt.z < aabb.minZ || pt.x > aabb.maxX || pt.y > aabb.maxY || pt.z > aabb.maxZ);
}
glidias.AABBUtils.match = function(aabb,refAABB) {
	aabb.minX = refAABB.minX;
	aabb.minY = refAABB.minY;
	aabb.minZ = refAABB.minZ;
	aabb.maxX = refAABB.maxX;
	aabb.maxY = refAABB.maxY;
	aabb.maxZ = refAABB.maxZ;
}
glidias.AABBUtils.reset = function(aabb) {
	aabb.minX = 1.7976931348623157e+308;
	aabb.minY = 1.7976931348623157e+308;
	aabb.minZ = 1.7976931348623157e+308;
	aabb.maxX = -1.7976931348623157e+308;
	aabb.maxY = -1.7976931348623157e+308;
	aabb.maxZ = -1.7976931348623157e+308;
}
glidias.AABBUtils.expand2 = function(aabb,refAABB) {
	if(refAABB.minX < aabb.minX) aabb.minX = refAABB.minX;
	if(refAABB.minY < aabb.minY) aabb.minY = refAABB.minY;
	if(refAABB.minZ < aabb.minZ) aabb.minZ = refAABB.minZ;
	if(refAABB.maxX > aabb.maxX) aabb.maxX = refAABB.maxX;
	if(refAABB.maxY > aabb.maxY) aabb.maxY = refAABB.maxY;
	if(refAABB.maxZ > aabb.maxZ) aabb.maxZ = refAABB.maxZ;
}
glidias.AABBUtils.expand = function(x,y,z,aabb) {
	if(x < aabb.minX) aabb.minX = x;
	if(y < aabb.minY) aabb.minY = y;
	if(z < aabb.minZ) aabb.minZ = z;
	if(x > aabb.maxX) aabb.maxX = x;
	if(y > aabb.maxY) aabb.maxY = y;
	if(z > aabb.maxZ) aabb.maxZ = z;
}
glidias.AABBUtils.expandWithPoint = function(vec,aabb) {
	if(vec.x < aabb.minX) aabb.minX = vec.x;
	if(vec.y < aabb.minY) aabb.minY = vec.y;
	if(vec.z < aabb.minZ) aabb.minZ = vec.z;
	if(vec.x > aabb.maxX) aabb.maxX = vec.x;
	if(vec.y > aabb.maxY) aabb.maxY = vec.y;
	if(vec.z > aabb.maxZ) aabb.maxZ = vec.z;
}
glidias.AABBUtils.prototype.__class__ = glidias.AABBUtils;
glidias.AllocatorF_glidias_Frustum = function(method,fillAmount,initialCapacity,fixed) {
	if( method === $_ ) return;
	if(fixed == null) fixed = false;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this._method = method;
	this._len = 0;
	this.fixed = fixed;
	this._i = 0;
	this._vec = new Array();
	if(fillAmount > 0) this.fill(fillAmount,fixed);
}
glidias.AllocatorF_glidias_Frustum.__name__ = ["glidias","AllocatorF_glidias_Frustum"];
glidias.AllocatorF_glidias_Frustum.prototype._method = null;
glidias.AllocatorF_glidias_Frustum.prototype._i = null;
glidias.AllocatorF_glidias_Frustum.prototype._len = null;
glidias.AllocatorF_glidias_Frustum.prototype._vec = null;
glidias.AllocatorF_glidias_Frustum.prototype.fixed = null;
glidias.AllocatorF_glidias_Frustum.prototype.get = function() {
	return this._i < this._len?this._vec[this._i++]:this._vec[this._len++] = this._method();
}
glidias.AllocatorF_glidias_Frustum.prototype._pop = function() {
	this._i--;
}
glidias.AllocatorF_glidias_Frustum.prototype.reset = function() {
	this._i = 0;
}
glidias.AllocatorF_glidias_Frustum.prototype.getSize = function() {
	return this._len;
}
glidias.AllocatorF_glidias_Frustum.prototype.purge = function() {
	this._purge(null,null);
}
glidias.AllocatorF_glidias_Frustum.prototype.purgeAndTruncate = function(fixed) {
	if(fixed == null) fixed = false;
	this._purge(true,fixed);
}
glidias.AllocatorF_glidias_Frustum.prototype._purge = function(truncateLength,fixed) {
	if(fixed == null) fixed = false;
	if(truncateLength == null) truncateLength = false;
	var _g1 = this._i, _g = this._len;
	while(_g1 < _g) {
		var i = _g1++;
		this._vec[i] = null;
	}
	if(truncateLength) {
		this._vec.length = this._i;
		this._len = this._i;
	}
}
glidias.AllocatorF_glidias_Frustum.prototype.fill = function(amount,fixed) {
	this._vec.length = amount;
	this._len = amount;
	while(--amount > -1) if(this._vec[amount] == null) this._vec[amount] = this._method();
}
glidias.AllocatorF_glidias_Frustum.prototype.setFixed = function(val) {
	this.fixed = val;
}
glidias.AllocatorF_glidias_Frustum.prototype.getFixed = function() {
	return this.fixed;
}
glidias.AllocatorF_glidias_Frustum.prototype.kill = function() {
	this.fill(0,false);
	this._i = 0;
}
glidias.AllocatorF_glidias_Frustum.prototype.__class__ = glidias.AllocatorF_glidias_Frustum;
glidias.Package = function() { }
glidias.Package.__name__ = ["glidias","Package"];
glidias.Package.main = function() {
}
glidias.Package.prototype.__class__ = glidias.Package;
glidias.AllocatorF = function(method,fillAmount,initialCapacity,fixed) {
	if( method === $_ ) return;
	if(fixed == null) fixed = false;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this._method = method;
	this._len = 0;
	this.fixed = fixed;
	this._i = 0;
	this._vec = new Array();
	if(fillAmount > 0) this.fill(fillAmount,fixed);
}
glidias.AllocatorF.__name__ = ["glidias","AllocatorF"];
glidias.AllocatorF.prototype._method = null;
glidias.AllocatorF.prototype._i = null;
glidias.AllocatorF.prototype._len = null;
glidias.AllocatorF.prototype._vec = null;
glidias.AllocatorF.prototype.fixed = null;
glidias.AllocatorF.prototype.get = function() {
	return this._i < this._len?this._vec[this._i++]:this._vec[this._len++] = this._method();
}
glidias.AllocatorF.prototype._pop = function() {
	this._i--;
}
glidias.AllocatorF.prototype.reset = function() {
	this._i = 0;
}
glidias.AllocatorF.prototype.getSize = function() {
	return this._len;
}
glidias.AllocatorF.prototype.purge = function() {
	this._purge(null,null);
}
glidias.AllocatorF.prototype.purgeAndTruncate = function(fixed) {
	if(fixed == null) fixed = false;
	this._purge(true,fixed);
}
glidias.AllocatorF.prototype._purge = function(truncateLength,fixed) {
	if(fixed == null) fixed = false;
	if(truncateLength == null) truncateLength = false;
	var _g1 = this._i, _g = this._len;
	while(_g1 < _g) {
		var i = _g1++;
		this._vec[i] = null;
	}
	if(truncateLength) {
		this._vec.length = this._i;
		this._len = this._i;
	}
}
glidias.AllocatorF.prototype.fill = function(amount,fixed) {
	this._vec.length = amount;
	this._len = amount;
	while(--amount > -1) if(this._vec[amount] == null) this._vec[amount] = this._method();
}
glidias.AllocatorF.prototype.setFixed = function(val) {
	this.fixed = val;
}
glidias.AllocatorF.prototype.getFixed = function() {
	return this.fixed;
}
glidias.AllocatorF.prototype.kill = function() {
	this.fill(0,false);
	this._i = 0;
}
glidias.AllocatorF.prototype.__class__ = glidias.AllocatorF;
glidias.AABBSectorVisController = function(fillAmount,initialCapacity) {
	if( fillAmount === $_ ) return;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this.renderId = 0;
	this.sectorStack = new glidias.ArrayBuffer_glidias_AABBSector();
	this.frustumStack = new glidias.AllocatorF_glidias_Frustum(glidias.Frustum.create4,fillAmount,initialCapacity);
}
glidias.AABBSectorVisController.__name__ = ["glidias","AABBSectorVisController"];
glidias.AABBSectorVisController.prototype.curSector = null;
glidias.AABBSectorVisController.prototype.sectorStack = null;
glidias.AABBSectorVisController.prototype.frustumStack = null;
glidias.AABBSectorVisController.prototype.renderId = null;
glidias.AABBSectorVisController.prototype.getVisCount = function() {
	return this.sectorStack.i;
}
glidias.AABBSectorVisController.prototype.run = function(camPos,camFrus,sectors) {
	this.renderId++;
	this.frustumStack._i = 0;
	var arr = this.sectorStack.arr;
	var len = this.sectorStack.i;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		arr[i].dom.style.visibility = "hidden";
	}
	var s = this.curSector;
	if(s == null) {
		s = this.getCurrentSector(camPos,sectors);
		if(s == null) return;
		this.curSector = s;
	} else if(!!(camPos.x < s.minX || camPos.y < s.minY || camPos.z < s.minZ || camPos.x > s.maxX || camPos.y > s.maxY || camPos.z > s.maxZ)) {
		s = this.getCurrentSector(camPos,sectors);
		if(s != null && this.curSector != s) this.curSector = s;
	}
	this.sectorStack.i = 0;
	this.curSector.checkVis(camPos,this.frustumStack,camFrus,this.sectorStack,this.renderId);
}
glidias.AABBSectorVisController.prototype.getCurrentSector = function(camPos,sectors) {
	var len = sectors.length;
	var s;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		s = sectors[i];
		if(!(camPos.x < s.minX || camPos.y < s.minY || camPos.z < s.minZ || camPos.x > s.maxX || camPos.y > s.maxY || camPos.z > s.maxZ)) return s;
	}
	return null;
}
glidias.AABBSectorVisController.prototype.__class__ = glidias.AABBSectorVisController;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
glidias.RoomFiller.COLS = 80;
glidias.RoomFiller.ROWS = 80;
glidias.RoomFiller.DIRT = 0;
glidias.RoomFiller.WALL = 1;
glidias.RoomFiller.DOOR = 2;
glidias.RoomFiller.CORRIDOOR = 3;
glidias.RoomFiller.FLOOR = 4;
glidias.RoomFiller.FEATURES = 50;
glidias.RoomFiller.NEW_FEATURE_TRIES = 200;
glidias.RoomFiller.MIN_CORRIDOR = 10;
glidias.RoomFiller.MAX_CORRIDOR = 20;
glidias.RoomFiller.MIN_ROOM = 6;
glidias.RoomFiller.MAX_ROOM = 14;
glidias.AABBPortalPlane.NORTH = 0;
glidias.AABBPortalPlane.WEST = 1;
glidias.AABBPortalPlane.SOUTH = 2;
glidias.AABBPortalPlane.EAST = 3;
glidias.AABBPortalPlane.UPWARDS = 4;
glidias.AABBPortalPlane.DOWNWARDS = 5;
glidias.AABBPortalPlane.BIT_WIDTH = 1;
glidias.AABBPortalPlane.BIT_HEIGHT = 2;
glidias.AABBPortalPlane.BIT_CEILHEIGHT = 4;
glidias.AABBPortalPlane.OFFSET_BITMASKS = (function($this) {
	var $r;
	var arr = new Array();
	arr[0] = 3;
	arr[1] = 1;
	arr[2] = 0;
	arr[3] = 2;
	arr[4] = 4;
	arr[5] = 3;
	$r = arr;
	return $r;
}(this));
glidias.AABBPortalPlane.DIRECTIONS = [new glidias.Vec3(0,-1,0),new glidias.Vec3(-1,0,0),new glidias.Vec3(0,1,0),new glidias.Vec3(1,0,0)];
glidias.AABBPortalPlane.UP = new glidias.Vec3(0,0,1);
glidias.AABBSector.ID_COUNT = 0;
js.Lib.onerror = null;
glidias.AABBUtils.MAX_VALUE = 1.7976931348623157e+308;
glidias.AABBUtils.THRESHOLD = .1;
glidias.Package.main()