$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof glidias=='undefined') glidias = {}
glidias.XYZ = function() { }
glidias.XYZ.__name__ = ["glidias","XYZ"];
glidias.XYZ.prototype.x = null;
glidias.XYZ.prototype.y = null;
glidias.XYZ.prototype.z = null;
glidias.XYZ.prototype.__class__ = glidias.XYZ;
glidias.XYZW = function() { }
glidias.XYZW.__name__ = ["glidias","XYZW"];
glidias.XYZW.prototype.w = null;
glidias.XYZW.prototype.__class__ = glidias.XYZW;
glidias.XYZW.__interfaces__ = [glidias.XYZ];
glidias.Frustum = function(p) { if( p === $_ ) return; {
	this.planes = new Array();
}}
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.planes[i] = new glidias.Vec3(0,0,0,0);
		}
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var plane = planes[i];
			if(plane.x >= 0) {
				if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
					}
					else {
						if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
					}
				}
				else if(plane.z >= 0) {
					if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
				}
				else {
					if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
				}
			}
			else if(plane.y >= 0) {
				if(plane.z >= 0) {
					if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
				}
				else {
					if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
				}
			}
			else if(plane.z >= 0) {
				if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
			}
			else {
				if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
			}
			side <<= 1;
		}
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
	{
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
						}
						else {
							if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return -1;
							if(minX * plane.x + minY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
						}
					}
					else if(plane.z >= 0) {
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return -1;
						if(minX * plane.x + maxY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
					}
					else {
						if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return -1;
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
					}
				}
				else if(plane.y >= 0) {
					if(plane.z >= 0) {
						if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return -1;
						if(maxX * plane.x + minY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
					}
					else {
						if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return -1;
						if(maxX * plane.x + minY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
					}
				}
				else if(plane.z >= 0) {
					if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return -1;
					if(maxX * plane.x + maxY * plane.y + minZ * plane.z > plane.w) culling &= rootCull & ~side;
				}
				else {
					if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return -1;
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z > plane.w) culling &= rootCull & ~side;
				}
			}
			side <<= 1;
		}
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
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
if(typeof a3d=='undefined') a3d = {}
a3d.A3DConst = function() { }
a3d.A3DConst.__name__ = ["a3d","A3DConst"];
a3d.A3DConst.prototype.__class__ = a3d.A3DConst;
glidias.IAABB = function() { }
glidias.IAABB.__name__ = ["glidias","IAABB"];
glidias.IAABB.prototype.minX = null;
glidias.IAABB.prototype.minY = null;
glidias.IAABB.prototype.minZ = null;
glidias.IAABB.prototype.maxX = null;
glidias.IAABB.prototype.maxY = null;
glidias.IAABB.prototype.maxZ = null;
glidias.IAABB.prototype.__class__ = glidias.IAABB;
glidias.AABBPortal = function(p) { if( p === $_ ) return; {
	this.points = new Array();
}}
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
	{
		meNew.minX = this.minX;
		meNew.minY = this.minY;
		meNew.minZ = this.minZ;
		meNew.maxX = this.maxX;
		meNew.maxY = this.maxY;
		meNew.maxZ = this.maxZ;
	}
	var len = this.points.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			meNew.points[i] = this.points[i].clone();
		}
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
	{
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
		if(dir == 1) {
			sx += 1;
		}
		else {
			sy += 1;
		}
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
	if((dir & 1) != 0) {
		sy += 1;
	}
	else {
		sx += 1;
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
glidias.RoomFiller = function(async) { if( async === $_ ) return; {
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
	{
		var _g = 0;
		while(_g < 80) {
			var i = _g++;
			this.grid[i] = new Array();
			{
				var _g1 = 0;
				while(_g1 < 80) {
					var j = _g1++;
					this.grid[i][j] = 0;
				}
			}
		}
	}
	this.random = new glidias.PM_PRNG(12345);
}}
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
	if(this.async == 0) null;
	else null;
}
glidias.RoomFiller.prototype.setupGeometryOfSectors = function(map,gridSize) {
	var mask;
	var sector;
	var uLen;
	var len = map.length;
	var pWalls;
	var p;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			sector = map[i];
			sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[5]);
			sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[4]);
			mask = 0;
			pWalls = sector.portalWalls;
			uLen = pWalls.length;
			{
				var _g1 = 0;
				while(_g1 < uLen) {
					var u = _g1++;
					p = pWalls[u];
					p.addFaces(sector,gridSize);
					mask |= 1 << p.direction;
				}
			}
			if((mask & 1) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[0]);
			if((mask & 4) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[2]);
			if((mask & 2) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[1]);
			if((mask & 8) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[3]);
		}
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
	{
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
			{
				var _g1 = 0;
				while(_g1 < uLen) {
					var u = _g1++;
					p = pWalls[u];
					str += p.getHTML(sector,gridSize,wallMat);
					mask |= 1 << p.direction;
				}
			}
			if((mask & 1) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[0],sector,gridSize).getHTML(wallMat);
			if((mask & 4) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[2],sector,gridSize).getHTML(wallMat);
			if((mask & 2) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[1],sector,gridSize).getHTML(wallMat);
			if((mask & 8) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[3],sector,gridSize).getHTML(wallMat);
			str += "</div>";
		}
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			rect = this.rooms[i];
			var uLen = Std["int"](rect.width);
			var vLen = Std["int"](rect.height);
			var invalid = false;
			{
				var _g1 = Std["int"](rect.x);
				while(_g1 < uLen) {
					var u = _g1++;
					{
						var _g2 = Std["int"](rect.y);
						while(_g2 < vLen) {
							var v = _g2++;
							if(this.grid[u][v] < 4) {
								haxe.Log.trace("NOn floor detected over room!  " + i,{ fileName : "RoomFiller.hx", lineNumber : 219, className : "glidias.RoomFiller", methodName : "getSectors"});
								invalid = true;
								break;
							}
						}
					}
					if(invalid) break;
				}
			}
			sector = new glidias.AABBSector();
			sector.setup(rect,gridSize,minRoomHeight + Math.round(Math.random() * possibleRoomHeightAdd),groundPos);
			map.push(sector);
		}
	}
	len = this.doors.length;
	var target;
	var direction;
	var d;
	var c;
	var exit = false;
	var addedPortals = [];
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			door = this.doors[i];
			doorType = this.getDoorType(door);
			if(doorType >= 4) {
				target = this.getSectorIndexAt(door.x - door.z,door.y - door.w);
				haxe.Log.trace("indoors!" + [door.x,door.y] + " : " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 248, className : "glidias.RoomFiller", methodName : "getSectors"});
			}
			else if(doorType == 0) {
				target = -1;
				if(!this.enableOutdoors) continue;
				haxe.Log.trace("Outdoors!",{ fileName : "RoomFiller.hx", lineNumber : 253, className : "glidias.RoomFiller", methodName : "getSectors"});
			}
			else if(doorType == 1) {
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
				}
				else {
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
			}
			else {
				haxe.Log.trace("Could not resolve door type. " + doorType + ". " + [door.x,door.y] + ": " + [door.z,door.w],{ fileName : "RoomFiller.hx", lineNumber : 317, className : "glidias.RoomFiller", methodName : "getSectors"});
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
				haxe.Log.trace("Dead end.",{ fileName : "RoomFiller.hx", lineNumber : 367, className : "glidias.RoomFiller", methodName : "getSectors"});
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
	}
	len = addedPortals.length;
	var points;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			portal = addedPortals[i];
			points = portal.points;
			portal.points = [points[3],points[0],points[1],points[2]];
		}
	}
	return map;
}
glidias.RoomFiller.prototype.getSectorIndexAt = function(tx,ty) {
	if(tx < 0 || tx >= 80 || ty < 0 || ty >= 80) {
		haxe.Log.trace("out of bound getSectorIndexAt",{ fileName : "RoomFiller.hx", lineNumber : 415, className : "glidias.RoomFiller", methodName : "getSectorIndexAt"});
	}
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
	{
		var _g = 0;
		while(_g < 80) {
			var i = _g++;
			{
				var _g1 = 0;
				while(_g1 < 80) {
					var j = _g1++;
					this.drawTile.x = i * gridSize;
					this.drawTile.y = j * gridSize;
					switch(this.grid[i][j]) {
					case 0:{
						callbacker(this.drawTile.toHTML("background-color:#000000",null));
					}break;
					case 1:{
						callbacker(this.drawTile.toHTML("background-color:" + this.wallColor,null));
					}break;
					case 2:{
						callbacker(this.drawTile.toHTML("background-color:#FF0000",null));
					}break;
					case 3:{
						callbacker(this.drawTile.toHTML("background-color:#733F12",null));
					}break;
					default:{
						callbacker(this.drawTile.toHTML("background-color:#CCCCCC",null));
					}break;
					}
				}
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
		while(this.createFeature()) null;
		if(this._onComplete) {
			this._onComplete();
			return;
		}
	}
	else {
		this.roomInterv = 0;
	}
}
glidias.RoomFiller.prototype.clearInterval = function(ier) {
	null;
}
glidias.RoomFiller.prototype.setInterval = function(target,timeMs) {
	return 0;
}
glidias.RoomFiller.prototype.createFeature = function() {
	if(this.currFeature-- == 0) {
		if(this.roomInterv != -1) null;
		haxe.Log.trace("Done.",{ fileName : "RoomFiller.hx", lineNumber : 543, className : "glidias.RoomFiller", methodName : "createFeature"});
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
			}
			else if(tb == 0 && (tl == 1 && tr == 1)) {
				tx = i;
				ty = j + 1;
				dir = 1;
			}
			else if(tl == 0 && (tt == 1 && tb == 1)) {
				tx = i - 1;
				ty = j;
				dir = 2;
			}
			else if(tr == 0 && (tt == 1 && tb == 1)) {
				tx = i + 1;
				ty = j;
				dir = 3;
			}
		}
	} while(dir == -1 && giveUp++ < 200);
	if(dir != -1) {
		do {
			var w, h;
			var sx, sy;
			var feature = Math.random();
			if(feature < .3) {
				{
					if(dir == 0 || dir == 1) {
						sx = tx - 1;
						w = 3;
						h = this.random.nextIntRange(10,20);
						if(dir == 0) {
							sy = ty - h;
							if(sy < 1) continue;
						}
						else {
							sy = ty + 1;
							if(ty + h > 79) continue;
						}
					}
					else {
						sy = ty - 1;
						w = this.random.nextIntRange(10,20);
						h = 3;
						if(dir == 2) {
							sx = tx - w;
							if(sx < 1) continue;
						}
						else {
							sx = tx + 1;
							if(tx + w > 79) continue;
						}
					}
				}
			}
			else {
				{
					if(dir == 0 || dir == 1) {
						w = this.random.nextIntRange(6,14);
						h = this.random.nextIntRange(6,14);
						sx = tx - Math.floor(w * .5);
						if(sx < 1 || sx + w > 79) continue;
						if(dir == 0) {
							sy = ty - h;
							if(sy < 1) continue;
						}
						else {
							sy = ty + 1;
							if(ty + h > 79) continue;
						}
					}
					else {
						w = this.random.nextIntRange(6,14);
						h = this.random.nextIntRange(6,14);
						sy = ty - Math.floor(h * .5);
						if(sy < 1 || sy + h > 79) return true;
						if(dir == 2) {
							sx = tx - w;
							if(sx < 1) continue;
						}
						else {
							sx = tx + 1;
							if(tx + w > 79) continue;
						}
					}
				}
			}
			if(sx < 1) sx = 2;
			if(sx + w > 78) w = sx - 80 - 2;
			if(sy < 1) sy = 1;
			if(sy + h > 78) h = sy - 80 - 2;
			if(this.createRoom(sx,sy,w,h)) {
				this.grid[tx][ty] = 2;
				switch(dir) {
				case 0:{
					this.grid[tx][ty + 1] = 3;
					this.doors.push(new glidias.Int4(tx,ty,0,1));
				}break;
				case 1:{
					this.grid[tx][ty - 1] = 3;
					this.doors.push(new glidias.Int4(tx,ty,0,-1));
				}break;
				case 2:{
					this.grid[tx + 1][ty] = 3;
					this.doors.push(new glidias.Int4(tx,ty,1,0));
				}break;
				case 3:{
					this.grid[tx - 1][ty] = 3;
					this.doors.push(new glidias.Int4(tx,ty,-1,0));
				}break;
				}
				break;
			}
		} while(giveUp++ < 200);
	}
	return true;
}
glidias.RoomFiller.prototype.createRoom = function(s,e,w,h) {
	w += s;
	h += e;
	var roomLen = this.rooms.length;
	if(this.checkArea(s,e,w,h) && (s != w && e != h)) {
		{
			var _g1 = s, _g = w + 1;
			while(_g1 < _g) {
				var i = _g1++;
				{
					var _g3 = e, _g2 = h + 1;
					while(_g3 < _g2) {
						var j = _g3++;
						if(this.grid[i][j] == 3) haxe.Log.trace("Covered corridoor exception!",{ fileName : "RoomFiller.hx", lineNumber : 756, className : "glidias.RoomFiller", methodName : "createRoom"});
						if(i == s || i == w || j == e || j == h) this.grid[i][j] = 1;
						else this.grid[i][j] = 4 + roomLen;
					}
				}
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
	{
		var _g1 = s, _g = w + 1;
		while(_g1 < _g) {
			var i = _g1++;
			{
				var _g3 = e, _g2 = h + 1;
				while(_g3 < _g2) {
					var j = _g3++;
					if(this.grid[i][j] != 0) return false;
				}
			}
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
a3d.SimpleObjectController = function(object,speed,speedMultiplier,mouseSensitivity) { if( object === $_ ) return; {
	if(mouseSensitivity == null) mouseSensitivity = 1;
	if(speedMultiplier == null) speedMultiplier = 3;
	if(speed == null) speed = 16;
	this.eventSource = { };
	this.maxPitch = 1e+22;
	this.minPitch = -1e+22;
	this.mousePoint = new jeash.geom.Point();
	this._vin = [.0,.0,.0];
	this._vout = [.0,.0,.0];
	this._up = false;
	this._down = false;
	this._forward = false;
	this._back = false;
	this._left = false;
	this._right = false;
	this._accelerate = false;
	this.mouseLook = true;
	this.displacement = new jeash.geom.Vector3D();
	this._object = object;
	this.speed = speed;
	this.speedMultiplier = speedMultiplier;
	this.mouseSensitivity = mouseSensitivity;
}}
a3d.SimpleObjectController.__name__ = ["a3d","SimpleObjectController"];
a3d.SimpleObjectController.prototype.speed = null;
a3d.SimpleObjectController.prototype.speedMultiplier = null;
a3d.SimpleObjectController.prototype.mouseLook = null;
a3d.SimpleObjectController.prototype.mouseSensitivity = null;
a3d.SimpleObjectController.prototype.maxPitch = null;
a3d.SimpleObjectController.prototype.minPitch = null;
a3d.SimpleObjectController.prototype._object = null;
a3d.SimpleObjectController.prototype._up = null;
a3d.SimpleObjectController.prototype._down = null;
a3d.SimpleObjectController.prototype._forward = null;
a3d.SimpleObjectController.prototype._back = null;
a3d.SimpleObjectController.prototype._left = null;
a3d.SimpleObjectController.prototype._right = null;
a3d.SimpleObjectController.prototype._accelerate = null;
a3d.SimpleObjectController.prototype.displacement = null;
a3d.SimpleObjectController.prototype.objectTransform = null;
a3d.SimpleObjectController.prototype.eventSource = null;
a3d.SimpleObjectController.prototype.mousePoint = null;
a3d.SimpleObjectController.prototype._vin = null;
a3d.SimpleObjectController.prototype._vout = null;
a3d.SimpleObjectController.prototype.startMouseLook = function() {
	this.mousePoint.x = this.eventSource.mouseX;
	this.mousePoint.y = this.eventSource.mouseY;
	this.mouseLook = true;
}
a3d.SimpleObjectController.prototype.stopMouseLook = function() {
	this.mouseLook = false;
}
a3d.SimpleObjectController.prototype.getObject = function() {
	return this._object;
}
a3d.SimpleObjectController.prototype.setObject = function(value) {
	this._object = value;
	this.updateObjectTransform();
}
a3d.SimpleObjectController.prototype.updateObjectTransform = function() {
	if(this._object != null) this.objectTransform = this._object.get_matrix().decompose();
}
a3d.SimpleObjectController.prototype.update = function(frameTime) {
	if(this._object == null) return;
	var moved = false;
	if(this.mouseLook) {
		var dx = this.eventSource.mouseX - this.mousePoint.x;
		var dy = this.eventSource.mouseY - this.mousePoint.y;
		this.mousePoint.x = this.eventSource.mouseX;
		this.mousePoint.y = this.eventSource.mouseY;
		var v = this.objectTransform[1];
		v.x -= dy * Math.PI / 180 * this.mouseSensitivity;
		if(v.x > this.maxPitch) v.x = this.maxPitch;
		if(v.x < this.minPitch) v.x = this.minPitch;
		v.z -= dx * Math.PI / 180 * this.mouseSensitivity;
		moved = true;
	}
	this.displacement.x = this._right?1:this._left?-1:0;
	this.displacement.y = this._forward?1:this._back?-1:0;
	this.displacement.z = this._up?1:this._down?-1:0;
	if(this.displacement.getLengthSquared() > 0) {
		var tmp = this.displacement.z;
		this.displacement.z = this.displacement.y;
		this.displacement.y = -tmp;
		this.deltaTransformVector(this.displacement);
		if(this._accelerate) this.displacement.scaleBy(this.speedMultiplier * this.speed * frameTime / Math.abs(jeash.geom.Vector3D.distance(this.displacement,new jeash.geom.Vector3D())));
		else this.displacement.scaleBy(this.speed * frameTime / Math.abs(jeash.geom.Vector3D.distance(this.displacement,new jeash.geom.Vector3D())));
		this.objectTransform[0].incrementBy(this.displacement);
		moved = true;
	}
	if(moved) {
		var m = new jeash.geom.Matrix3D();
		m.recompose(this.objectTransform);
		this._object.set_matrix(m);
	}
}
a3d.SimpleObjectController.prototype.setObjectPos = function(pos) {
	if(this._object != null) {
		var v = this.objectTransform[0];
		v.x = pos.x;
		v.y = pos.y;
		v.z = pos.z;
	}
}
a3d.SimpleObjectController.prototype.setObjectPosXYZ = function(x,y,z) {
	if(this._object != null) {
		var v = this.objectTransform[0];
		v.x = x;
		v.y = y;
		v.z = z;
	}
}
a3d.SimpleObjectController.prototype.lookAt = function(point) {
	this.lookAtXYZ(point.x,point.y,point.z);
}
a3d.SimpleObjectController.prototype.lookAtXYZ = function(x,y,z) {
	if(this._object == null) return;
	var v = this.objectTransform[0];
	var dx = x - v.x;
	var dy = y - v.y;
	var dz = z - v.z;
	v = this.objectTransform[1];
	v.x = Math.atan2(dz,Math.sqrt(dx * dx + dy * dy));
	v.x -= 0.5 * Math.PI;
	v.y = 0;
	v.z = -Math.atan2(dx,dy);
	var m = this._object.get_matrix();
	m.recompose(this.objectTransform);
	this._object.set_matrix(m);
}
a3d.SimpleObjectController.prototype.deltaTransformVector = function(v) {
	this._vin[0] = v.x;
	this._vin[1] = v.y;
	this._vin[2] = v.z;
	this._object.get_matrix().transformVectors(this._vin,this._vout);
	var c = this.objectTransform[0];
	v.x = this._vout[0] - c.x;
	v.y = this._vout[1] - c.y;
	v.z = this._vout[2] - c.z;
}
a3d.SimpleObjectController.prototype.moveForward = function(value) {
	this._forward = value;
}
a3d.SimpleObjectController.prototype.moveBack = function(value) {
	this._back = value;
}
a3d.SimpleObjectController.prototype.moveLeft = function(value) {
	this._left = value;
}
a3d.SimpleObjectController.prototype.moveRight = function(value) {
	this._right = value;
}
a3d.SimpleObjectController.prototype.moveUp = function(value) {
	this._up = value;
}
a3d.SimpleObjectController.prototype.moveDown = function(value) {
	this._down = value;
}
a3d.SimpleObjectController.prototype.accelerate = function(value) {
	this._accelerate = value;
}
a3d.SimpleObjectController.prototype.__class__ = a3d.SimpleObjectController;
glidias.Vec3 = function(x,y,z,w) { if( x === $_ ) return; {
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}}
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
glidias.Vec3.__interfaces__ = [glidias.XYZW];
glidias.AABBPortalPlane = function(p) { if( p === $_ ) return; {
	{
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	this.portals = new Array();
}}
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
	if((p = dir.x * south.x + dir.y * south.y + dir.z * south.z) != 0) {
		dirId = p < 0?0:2;
	}
	else if((p = dir.x * east.x + dir.y * east.y + dir.z * east.z) != 0) {
		dirId = p < 0?1:3;
	}
	else {
		if(!((p = dir.x * upwards.x + dir.y * upwards.y + dir.z * upwards.z) != 0)) haxe.Log.trace("Assumption failed for final dot up/down",{ fileName : "AABBPortalPlane.hx", lineNumber : 75, className : "glidias.AABBPortalPlane", methodName : "getPlaneResult"});
		dirId = p < 0?5:4;
	}
	var b1 = glidias.AABBPortalPlane.OFFSET_BITMASKS[dirId];
	var up;
	var right = glidias.AABBPortalPlane.UP.crossProduct(dir);
	if(right.x * right.x + right.y * right.y + right.z * right.z == 0) {
		right = dir.crossProduct(glidias.AABBPortalPlane.DIRECTIONS[2]);
		up = right.crossProduct(glidias.AABBPortalPlane.UP);
	}
	else {
		up = glidias.AABBPortalPlane.UP.getReverse();
	}
	planeResult.up = up;
	planeResult.right = right;
	planeResult.look = dir;
	if(dirId == 4 || dirId == 5) {
		planeResult.width = rect.width * gridSize;
		planeResult.height = rect.height * gridSize;
	}
	else {
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
	{
		if(portal.minX < this.minX) this.minX = portal.minX;
		if(portal.minY < this.minY) this.minY = portal.minY;
		if(portal.minZ < this.minZ) this.minZ = portal.minZ;
		if(portal.maxX > this.maxX) this.maxX = portal.maxX;
		if(portal.maxY > this.maxY) this.maxY = portal.maxY;
		if(portal.maxZ > this.maxZ) this.maxZ = portal.maxZ;
	}
	this.portals.push(portal);
}
glidias.AABBPortalPlane.prototype.addFaces = function(sector,gridSize) {
	var planeResult = glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[this.direction],sector,gridSize);
	var p;
	var x = 0;
	var y = 0;
	var z = 0;
	var width = planeResult.width;
	var doorwayHeight = this.portals[0].height;
	var aboveDoorwayHeight = planeResult.height - doorwayHeight;
	var geom = sector.geom;
	var pos = planeResult.pos;
	var right = planeResult.right.getReverse();
	var baseOffset = pos.x * right.x + pos.y * right.y + pos.z * right.z;
	var down = planeResult.up;
	var a;
	var b;
	var INDEX_LOOKUP = glidias.AABBSector.INDICES_LOOKUP[this.direction];
	if(aboveDoorwayHeight > 0) {
		p = glidias.PlaneResult.getIdentity();
		x = pos.x + down.x * aboveDoorwayHeight;
		y = pos.y + down.y * aboveDoorwayHeight;
		z = pos.z + down.z * aboveDoorwayHeight;
		a = geom.addVertex(x,y,z);
		x += right.x * planeResult.width;
		y += right.y * planeResult.width;
		z += right.z * planeResult.width;
		b = geom.addVertex(x,y,z);
		geom.addFace([INDEX_LOOKUP[0],a,b,INDEX_LOOKUP[3]]);
	}
	this.portals.sort(function(a1,b1) {
		var a2 = right.x * a1.minX + right.y * a1.minY + right.z * a1.minZ;
		var b2 = right.x * b1.minX + right.y * b1.minY + right.z * b1.minZ;
		if(a2 < b2) {
			return -1;
		}
		else if(a2 == b2) return 0;
		return 1;
	});
	var len = this.portals.length;
	var portal;
	var c;
	var lastC = -99999999;
	var o;
	var m = 0;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			portal = this.portals[i];
			c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
			o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
			if(o < c) c = o;
			if(lastC > c) haxe.Log.trace("WRONG, shoudl be less!",{ fileName : "AABBPortalPlane.hx", lineNumber : 212, className : "glidias.AABBPortalPlane", methodName : "addFaces"});
			lastC = c;
			o = baseOffset < c?c - baseOffset:baseOffset - c;
			p = planeResult.clone();
			p.pos.x += m * right.x;
			p.pos.y += m * right.y;
			p.pos.z += m * right.z;
			p.pos.x += aboveDoorwayHeight * down.x;
			p.pos.y += aboveDoorwayHeight * down.y;
			p.pos.z += aboveDoorwayHeight * down.z;
			p.width = o - m;
			p.height = portal.height;
			if(!(p.width == 0 || p.height == 0)) {
				p.addToGeometry(geom);
			}
			m += o - m + portal.width;
		}
	}
	portal = this.portals[len - 1];
	p = planeResult.clone();
	p.pos.x += m * right.x;
	p.pos.y += m * right.y;
	p.pos.z += m * right.z;
	p.pos.x += aboveDoorwayHeight * down.x;
	p.pos.y += aboveDoorwayHeight * down.y;
	p.pos.z += aboveDoorwayHeight * down.z;
	p.width = planeResult.width - m;
	p.height = portal.height;
	if(!(p.width == 0 || p.height == 0)) p.addToGeometry(geom);
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
	this.portals.sort(function(a,b) {
		var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
		var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
		if(a2 < b2) {
			return -1;
		}
		else if(a2 == b2) return 0;
		return 1;
	});
	var len = this.portals.length;
	var portal;
	var c;
	var lastC = -99999999;
	var o;
	var m = 0;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			portal = this.portals[i];
			c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
			o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
			if(o < c) c = o;
			if(lastC > c) haxe.Log.trace("WRONG, shoudl be less!",{ fileName : "AABBPortalPlane.hx", lineNumber : 324, className : "glidias.AABBPortalPlane", methodName : "getHTML"});
			lastC = c;
			o = baseOffset < c?c - baseOffset:baseOffset - c;
			p = glidias.PlaneResult.getIdentity();
			p.pos.x = m;
			p.pos.y = aboveDoorwayHeight;
			p.width = o - m;
			p.height = portal.height;
			if(!(p.width == 0 || p.height == 0)) html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
			m += p.width + portal.width;
		}
	}
	portal = this.portals[len - 1];
	p = glidias.PlaneResult.getIdentity();
	p.pos.x = m;
	p.pos.y = aboveDoorwayHeight;
	p.width = planeResult.width - m;
	p.height = portal.height;
	if(!(p.width == 0 || p.height == 0)) html += "<div style=" + (mat != null?"\"margin:0;padding:0;width:" + Math.round(p.width) + "px;height:" + Math.round(p.height) + "px;":"") + "-webkit-transform:matrix3d(" + [-p.right.x,-p.right.y,-p.right.z,0,p.up.x,p.up.y,p.up.z,0,p.look.x,p.look.y,p.look.z,0,p.pos.x,p.pos.y,p.pos.z,1].join(",") + ");" + (mat != null?mat:"") + "\">" + "</div>";
	html += "</div>";
	return html;
}
glidias.AABBPortalPlane.prototype.__class__ = glidias.AABBPortalPlane;
glidias.AABBPortalPlane.__interfaces__ = [glidias.IAABB];
glidias.Int4 = function(x,y,z,w) { if( x === $_ ) return; {
	if(w == null) w = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}}
glidias.Int4.__name__ = ["glidias","Int4"];
glidias.Int4.prototype.x = null;
glidias.Int4.prototype.y = null;
glidias.Int4.prototype.z = null;
glidias.Int4.prototype.w = null;
glidias.Int4.prototype.__class__ = glidias.Int4;
a3d.ITransform3D = function() { }
a3d.ITransform3D.__name__ = ["a3d","ITransform3D"];
a3d.ITransform3D.prototype.a = null;
a3d.ITransform3D.prototype.b = null;
a3d.ITransform3D.prototype.c = null;
a3d.ITransform3D.prototype.d = null;
a3d.ITransform3D.prototype.e = null;
a3d.ITransform3D.prototype.f = null;
a3d.ITransform3D.prototype.g = null;
a3d.ITransform3D.prototype.h = null;
a3d.ITransform3D.prototype.i = null;
a3d.ITransform3D.prototype.j = null;
a3d.ITransform3D.prototype.k = null;
a3d.ITransform3D.prototype.l = null;
a3d.ITransform3D.prototype.__class__ = a3d.ITransform3D;
a3d.Transform3D = function(p) { if( p === $_ ) return; {
	this.a = 1;
	this.b = 0;
	this.c = 0;
	this.d = 0;
	this.e = 0;
	this.f = 1;
	this.g = 0;
	this.h = 0;
	this.i = 0;
	this.j = 0;
	this.k = 1;
	this.l = 0;
}}
a3d.Transform3D.__name__ = ["a3d","Transform3D"];
a3d.Transform3D.prototype.a = null;
a3d.Transform3D.prototype.b = null;
a3d.Transform3D.prototype.c = null;
a3d.Transform3D.prototype.d = null;
a3d.Transform3D.prototype.e = null;
a3d.Transform3D.prototype.f = null;
a3d.Transform3D.prototype.g = null;
a3d.Transform3D.prototype.h = null;
a3d.Transform3D.prototype.i = null;
a3d.Transform3D.prototype.j = null;
a3d.Transform3D.prototype.k = null;
a3d.Transform3D.prototype.l = null;
a3d.Transform3D.prototype.identity = function() {
	this.a = 1;
	this.b = 0;
	this.c = 0;
	this.d = 0;
	this.e = 0;
	this.f = 1;
	this.g = 0;
	this.h = 0;
	this.i = 0;
	this.j = 0;
	this.k = 1;
	this.l = 0;
}
a3d.Transform3D.prototype.compose = function(x,y,z,rotationX,rotationY,rotationZ,scaleX,scaleY,scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(rotationZ);
	var cosZsinY = cosZ * sinY;
	var sinZsinY = sinZ * sinY;
	var cosYscaleX = cosY * scaleX;
	var sinXscaleY = sinX * scaleY;
	var cosXscaleY = cosX * scaleY;
	var cosXscaleZ = cosX * scaleZ;
	var sinXscaleZ = sinX * scaleZ;
	this.a = cosZ * cosYscaleX;
	this.b = cosZsinY * sinXscaleY - sinZ * cosXscaleY;
	this.c = cosZsinY * cosXscaleZ + sinZ * sinXscaleZ;
	this.d = x;
	this.e = sinZ * cosYscaleX;
	this.f = sinZsinY * sinXscaleY + cosZ * cosXscaleY;
	this.g = sinZsinY * cosXscaleZ - cosZ * sinXscaleZ;
	this.h = y;
	this.i = -sinY * scaleX;
	this.j = cosY * sinXscaleY;
	this.k = cosY * cosXscaleZ;
	this.l = z;
}
a3d.Transform3D.prototype.composeInverse = function(x,y,z,rotationX,rotationY,rotationZ,scaleX,scaleY,scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(-rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(-rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(-rotationZ);
	var sinXsinY = sinX * sinY;
	var cosYscaleX = cosY / scaleX;
	var cosXscaleY = cosX / scaleY;
	var sinXscaleZ = sinX / scaleZ;
	var cosXscaleZ = cosX / scaleZ;
	this.a = cosZ * cosYscaleX;
	this.b = -sinZ * cosYscaleX;
	this.c = sinY / scaleX;
	this.d = -this.a * x - this.b * y - this.c * z;
	this.e = sinZ * cosXscaleY + sinXsinY * cosZ / scaleY;
	this.f = cosZ * cosXscaleY - sinXsinY * sinZ / scaleY;
	this.g = -sinX * cosY / scaleY;
	this.h = -this.e * x - this.f * y - this.g * z;
	this.i = sinZ * sinXscaleZ - cosZ * sinY * cosXscaleZ;
	this.j = cosZ * sinXscaleZ + sinY * sinZ * cosXscaleZ;
	this.k = cosY * cosXscaleZ;
	this.l = -this.i * x - this.j * y - this.k * z;
}
a3d.Transform3D.prototype.invert = function() {
	var ta = this.a;
	var tb = this.b;
	var tc = this.c;
	var td = this.d;
	var te = this.e;
	var tf = this.f;
	var tg = this.g;
	var th = this.h;
	var ti = this.i;
	var tj = this.j;
	var tk = this.k;
	var tl = this.l;
	var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
	this.a = (-tg * tj + tf * tk) * det;
	this.b = (tc * tj - tb * tk) * det;
	this.c = (-tc * tf + tb * tg) * det;
	this.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
	this.e = (tg * ti - te * tk) * det;
	this.f = (-tc * ti + ta * tk) * det;
	this.g = (tc * te - ta * tg) * det;
	this.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
	this.i = (-tf * ti + te * tj) * det;
	this.j = (tb * ti - ta * tj) * det;
	this.k = (-tb * te + ta * tf) * det;
	this.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
}
a3d.Transform3D.prototype.initFromVector = function(vector) {
	this.a = vector[0];
	this.b = vector[1];
	this.c = vector[2];
	this.d = vector[3];
	this.e = vector[4];
	this.f = vector[5];
	this.g = vector[6];
	this.h = vector[7];
	this.i = vector[8];
	this.j = vector[9];
	this.k = vector[10];
	this.l = vector[11];
}
a3d.Transform3D.prototype.append = function(transform) {
	var ta = this.a;
	var tb = this.b;
	var tc = this.c;
	var td = this.d;
	var te = this.e;
	var tf = this.f;
	var tg = this.g;
	var th = this.h;
	var ti = this.i;
	var tj = this.j;
	var tk = this.k;
	var tl = this.l;
	this.a = transform.a * ta + transform.b * te + transform.c * ti;
	this.b = transform.a * tb + transform.b * tf + transform.c * tj;
	this.c = transform.a * tc + transform.b * tg + transform.c * tk;
	this.d = transform.a * td + transform.b * th + transform.c * tl + transform.d;
	this.e = transform.e * ta + transform.f * te + transform.g * ti;
	this.f = transform.e * tb + transform.f * tf + transform.g * tj;
	this.g = transform.e * tc + transform.f * tg + transform.g * tk;
	this.h = transform.e * td + transform.f * th + transform.g * tl + transform.h;
	this.i = transform.i * ta + transform.j * te + transform.k * ti;
	this.j = transform.i * tb + transform.j * tf + transform.k * tj;
	this.k = transform.i * tc + transform.j * tg + transform.k * tk;
	this.l = transform.i * td + transform.j * th + transform.k * tl + transform.l;
}
a3d.Transform3D.prototype.prepend = function(transform) {
	var ta = this.a;
	var tb = this.b;
	var tc = this.c;
	var td = this.d;
	var te = this.e;
	var tf = this.f;
	var tg = this.g;
	var th = this.h;
	var ti = this.i;
	var tj = this.j;
	var tk = this.k;
	var tl = this.l;
	this.a = ta * transform.a + tb * transform.e + tc * transform.i;
	this.b = ta * transform.b + tb * transform.f + tc * transform.j;
	this.c = ta * transform.c + tb * transform.g + tc * transform.k;
	this.d = ta * transform.d + tb * transform.h + tc * transform.l + td;
	this.e = te * transform.a + tf * transform.e + tg * transform.i;
	this.f = te * transform.b + tf * transform.f + tg * transform.j;
	this.g = te * transform.c + tf * transform.g + tg * transform.k;
	this.h = te * transform.d + tf * transform.h + tg * transform.l + th;
	this.i = ti * transform.a + tj * transform.e + tk * transform.i;
	this.j = ti * transform.b + tj * transform.f + tk * transform.j;
	this.k = ti * transform.c + tj * transform.g + tk * transform.k;
	this.l = ti * transform.d + tj * transform.h + tk * transform.l + tl;
}
a3d.Transform3D.prototype.combine = function(transformA,transformB) {
	this.a = transformA.a * transformB.a + transformA.b * transformB.e + transformA.c * transformB.i;
	this.b = transformA.a * transformB.b + transformA.b * transformB.f + transformA.c * transformB.j;
	this.c = transformA.a * transformB.c + transformA.b * transformB.g + transformA.c * transformB.k;
	this.d = transformA.a * transformB.d + transformA.b * transformB.h + transformA.c * transformB.l + transformA.d;
	this.e = transformA.e * transformB.a + transformA.f * transformB.e + transformA.g * transformB.i;
	this.f = transformA.e * transformB.b + transformA.f * transformB.f + transformA.g * transformB.j;
	this.g = transformA.e * transformB.c + transformA.f * transformB.g + transformA.g * transformB.k;
	this.h = transformA.e * transformB.d + transformA.f * transformB.h + transformA.g * transformB.l + transformA.h;
	this.i = transformA.i * transformB.a + transformA.j * transformB.e + transformA.k * transformB.i;
	this.j = transformA.i * transformB.b + transformA.j * transformB.f + transformA.k * transformB.j;
	this.k = transformA.i * transformB.c + transformA.j * transformB.g + transformA.k * transformB.k;
	this.l = transformA.i * transformB.d + transformA.j * transformB.h + transformA.k * transformB.l + transformA.l;
}
a3d.Transform3D.prototype.calculateInversion = function(source) {
	var ta = source.a;
	var tb = source.b;
	var tc = source.c;
	var td = source.d;
	var te = source.e;
	var tf = source.f;
	var tg = source.g;
	var th = source.h;
	var ti = source.i;
	var tj = source.j;
	var tk = source.k;
	var tl = source.l;
	var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
	this.a = (-tg * tj + tf * tk) * det;
	this.b = (tc * tj - tb * tk) * det;
	this.c = (-tc * tf + tb * tg) * det;
	this.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
	this.e = (tg * ti - te * tk) * det;
	this.f = (-tc * ti + ta * tk) * det;
	this.g = (tc * te - ta * tg) * det;
	this.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
	this.i = (-tf * ti + te * tj) * det;
	this.j = (tb * ti - ta * tj) * det;
	this.k = (-tb * te + ta * tf) * det;
	this.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
}
a3d.Transform3D.prototype.copy = function(source) {
	this.a = source.a;
	this.b = source.b;
	this.c = source.c;
	this.d = source.d;
	this.e = source.e;
	this.f = source.f;
	this.g = source.g;
	this.h = source.h;
	this.i = source.i;
	this.j = source.j;
	this.k = source.k;
	this.l = source.l;
}
a3d.Transform3D.prototype.__class__ = a3d.Transform3D;
a3d.Transform3D.__interfaces__ = [a3d.ITransform3D];
if(!glidias.input) glidias.input = {}
glidias.input.KeyPoll = function(displayObj) { if( displayObj === $_ ) return; {
	this.states = haxe.io.Bytes.alloc(32);
	this.jDoc = new $(displayObj != null?displayObj:js.Lib.document);
	this.jDoc.keydown($closure(this,"keyDownListener"));
	this.jDoc.keyup($closure(this,"keyUpListener"));
}}
glidias.input.KeyPoll.__name__ = ["glidias","input","KeyPoll"];
glidias.input.KeyPoll.prototype.states = null;
glidias.input.KeyPoll.prototype.jDoc = null;
glidias.input.KeyPoll.prototype.destroy = function() {
	this.jDoc.unbind("keydown",$closure(this,"keyDownListener"));
	this.jDoc.unbind("keyup",$closure(this,"keyUpListener"));
}
glidias.input.KeyPoll.prototype.keyDownListener = function(ev) {
	this.states.b[ev.keyCode >>> 3] = (this.states.b[ev.keyCode >>> 3] | 1 << (ev.keyCode & 7)) & 255;
}
glidias.input.KeyPoll.prototype.keyUpListener = function(ev) {
	this.states.b[ev.which >>> 3] = this.states.b[ev.which >>> 3] & ~(1 << (ev.which & 7)) & 255;
}
glidias.input.KeyPoll.prototype.clearListener = function(ev) {
	var i = 0;
	while(++i < 8) {
		this.states.b[i] = 0;
	}
}
glidias.input.KeyPoll.prototype.isDown = function(keyCode) {
	return (this.states.b[keyCode >>> 3] & 1 << (keyCode & 7)) != 0;
}
glidias.input.KeyPoll.prototype.isUp = function(keyCode) {
	return (this.states.b[keyCode >>> 3] & 1 << (keyCode & 7)) == 0;
}
glidias.input.KeyPoll.prototype.__class__ = glidias.input.KeyPoll;
a3d.Geometry = function(p) { if( p === $_ ) return; {
	this.vertices = [];
	this.indices = [];
	this.numVertices = 0;
}}
a3d.Geometry.__name__ = ["a3d","Geometry"];
a3d.Geometry.prototype.vertices = null;
a3d.Geometry.prototype.indices = null;
a3d.Geometry.prototype.numVertices = null;
a3d.Geometry.prototype.addVertex = function(x,y,z) {
	var b = this.numVertices * 3;
	this.vertices[b] = x;
	b++;
	this.vertices[b] = y;
	b++;
	this.vertices[b] = z;
	b = this.numVertices;
	this.numVertices++;
	return b;
}
a3d.Geometry.prototype.pushVertices = function(values) {
	var len = values.length;
	var numVF = len / 3;
	len = Math.floor(numVF);
	if(len != numVF) {
		haxe.Log.trace("Invalid push vertices. Values not divisible by 3!",{ fileName : "Geometry.hx", lineNumber : 44, className : "a3d.Geometry", methodName : "pushVertices"});
		return;
	}
	this.numVertices += len;
	len = values.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.vertices.push(values[i]);
		}
	}
}
a3d.Geometry.prototype.addFace = function(valIndices) {
	valIndices = valIndices.slice(0);
	valIndices.reverse();
	var startD;
	var d = startD = this.indices.length;
	var len = valIndices.length;
	var header = valIndices.length << 28 | valIndices[0];
	this.indices[d++] = header;
	{
		var _g = 1;
		while(_g < len) {
			var i = _g++;
			this.indices[d++] = valIndices[i];
		}
	}
	d = startD;
}
a3d.Geometry.prototype.__class__ = a3d.Geometry;
if(!glidias.debug) glidias.debug = {}
glidias.debug.SectorGeomTrace = function(sector) { if( sector === $_ ) return; {
	this._sector = sector;
	this.id = this._sector.toString();
}}
glidias.debug.SectorGeomTrace.__name__ = ["glidias","debug","SectorGeomTrace"];
glidias.debug.SectorGeomTrace.prototype._sector = null;
glidias.debug.SectorGeomTrace.prototype.x = null;
glidias.debug.SectorGeomTrace.prototype.y = null;
glidias.debug.SectorGeomTrace.prototype.z = null;
glidias.debug.SectorGeomTrace.prototype.id = null;
glidias.debug.SectorGeomTrace.prototype.doTrace = function(count) {
	var geom = this._sector.geom;
	var verts = geom.vertices;
	var len = geom.indices.length;
	var c = geom.indices[Math.floor(count % len)];
	c &= 268435455;
	c *= 3;
	this.x = verts[c];
	c++;
	this.y = verts[c];
	c++;
	this.z = verts[c];
}
glidias.debug.SectorGeomTrace.prototype.toString = function() {
	return this.id;
}
glidias.debug.SectorGeomTrace.prototype.__class__ = glidias.debug.SectorGeomTrace;
if(typeof jeash=='undefined') jeash = {}
if(!jeash.geom) jeash.geom = {}
jeash.geom.Vector3D = function(x,y,z,w) { if( x === $_ ) return; {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
}}
jeash.geom.Vector3D.__name__ = ["jeash","geom","Vector3D"];
jeash.geom.Vector3D.angleBetween = function(a,b) {
	var a0 = new jeash.geom.Vector3D(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new jeash.geom.Vector3D(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
}
jeash.geom.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
}
jeash.geom.Vector3D.X_AXIS = null;
jeash.geom.Vector3D.getX_AXIS = function() {
	return new jeash.geom.Vector3D(1,0,0);
}
jeash.geom.Vector3D.Y_AXIS = null;
jeash.geom.Vector3D.getY_AXIS = function() {
	return new jeash.geom.Vector3D(0,1,0);
}
jeash.geom.Vector3D.Z_AXIS = null;
jeash.geom.Vector3D.getZ_AXIS = function() {
	return new jeash.geom.Vector3D(0,0,1);
}
jeash.geom.Vector3D.prototype.length = null;
jeash.geom.Vector3D.prototype.getLength = function() {
	return Math.abs(jeash.geom.Vector3D.distance(this,new jeash.geom.Vector3D()));
}
jeash.geom.Vector3D.prototype.lengthSquared = null;
jeash.geom.Vector3D.prototype.getLengthSquared = function() {
	return Math.abs(jeash.geom.Vector3D.distance(this,new jeash.geom.Vector3D())) * Math.abs(jeash.geom.Vector3D.distance(this,new jeash.geom.Vector3D()));
}
jeash.geom.Vector3D.prototype.w = null;
jeash.geom.Vector3D.prototype.x = null;
jeash.geom.Vector3D.prototype.y = null;
jeash.geom.Vector3D.prototype.z = null;
jeash.geom.Vector3D.prototype.add = function(a) {
	return new jeash.geom.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
}
jeash.geom.Vector3D.prototype.clone = function() {
	return new jeash.geom.Vector3D(this.x,this.y,this.z,this.w);
}
jeash.geom.Vector3D.prototype.crossProduct = function(a) {
	return new jeash.geom.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
}
jeash.geom.Vector3D.prototype.decrementBy = function(a) {
	this.x -= a.x;
	this.y -= a.y;
	this.z -= a.z;
}
jeash.geom.Vector3D.prototype.dotProduct = function(a) {
	return this.x * a.x + this.y * a.y + this.z * a.z;
}
jeash.geom.Vector3D.prototype.equals = function(toCompare,allFour) {
	if(allFour == null) allFour = false;
	return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
}
jeash.geom.Vector3D.prototype.incrementBy = function(a) {
	this.x += a.x;
	this.y += a.y;
	this.z += a.z;
}
jeash.geom.Vector3D.prototype.nearEquals = function(toCompare,tolerance,allFour) {
	if(allFour == null) allFour = false;
	return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
}
jeash.geom.Vector3D.prototype.negate = function() {
	this.x *= -1;
	this.y *= -1;
	this.z *= -1;
}
jeash.geom.Vector3D.prototype.normalize = function() {
	var l = Math.abs(jeash.geom.Vector3D.distance(this,new jeash.geom.Vector3D()));
	if(l != 0) {
		this.x /= l;
		this.y /= l;
		this.z /= l;
	}
	return l;
}
jeash.geom.Vector3D.prototype.project = function() {
	this.x /= this.w;
	this.y /= this.w;
	this.z /= this.w;
}
jeash.geom.Vector3D.prototype.scaleBy = function(s) {
	this.x *= s;
	this.y *= s;
	this.z *= s;
}
jeash.geom.Vector3D.prototype.subtract = function(a) {
	return new jeash.geom.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
}
jeash.geom.Vector3D.prototype.toString = function() {
	return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
}
jeash.geom.Vector3D.prototype.__class__ = jeash.geom.Vector3D;
jeash.geom.Vector3D.__interfaces__ = [glidias.XYZW];
glidias.PlaneResult = function(p) { if( p === $_ ) return; {
	null;
}}
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
glidias.PlaneResult.prototype.addToGeometry = function(geom) {
	var x;
	var y;
	var z;
	var a;
	var b;
	var c;
	var d;
	x = this.pos.x;
	y = this.pos.y;
	z = this.pos.z;
	a = geom.addVertex(x,y,z);
	x += this.up.x * this.height;
	y += this.up.y * this.height;
	z += this.up.z * this.height;
	b = geom.addVertex(x,y,z);
	x -= this.right.x * this.width;
	y -= this.right.y * this.width;
	z -= this.right.z * this.width;
	c = geom.addVertex(x,y,z);
	x -= this.up.x * this.height;
	y -= this.up.y * this.height;
	z -= this.up.z * this.height;
	d = geom.addVertex(x,y,z);
	geom.addFace([a,b,c,d]);
}
glidias.PlaneResult.prototype.__class__ = glidias.PlaneResult;
a3d.EllipsoidCollider = function(radiusX,radiusY,radiusZ,threshold) { if( radiusX === $_ ) return; {
	if(threshold == null) threshold = 0.001;
	this.threshold = threshold;
	this.timestamp = 0;
	this.radiusX = radiusX;
	this.radiusY = radiusY;
	this.radiusZ = radiusZ;
	this.matrix = new a3d.Transform3D();
	this.inverseMatrix = new a3d.Transform3D();
	this.sphere = new jeash.geom.Vector3D();
	this.cornerA = new jeash.geom.Vector3D();
	this.cornerB = new jeash.geom.Vector3D();
	this.cornerC = new jeash.geom.Vector3D();
	this.cornerD = new jeash.geom.Vector3D();
	this.collisionPoint = new jeash.geom.Vector3D();
	this.collisionPlane = new jeash.geom.Vector3D();
	this.geometries = new Array();
	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.numI = 0;
	this.displ = new jeash.geom.Vector3D();
	this.dest = new jeash.geom.Vector3D();
	this.src = new jeash.geom.Vector3D();
}}
a3d.EllipsoidCollider.__name__ = ["a3d","EllipsoidCollider"];
a3d.EllipsoidCollider.isNaN2 = function(a) {
	return a != a;
}
a3d.EllipsoidCollider.prototype.radiusX = null;
a3d.EllipsoidCollider.prototype.radiusY = null;
a3d.EllipsoidCollider.prototype.radiusZ = null;
a3d.EllipsoidCollider.prototype.threshold = null;
a3d.EllipsoidCollider.prototype.matrix = null;
a3d.EllipsoidCollider.prototype.inverseMatrix = null;
a3d.EllipsoidCollider.prototype.geometries = null;
a3d.EllipsoidCollider.prototype.vertices = null;
a3d.EllipsoidCollider.prototype.normals = null;
a3d.EllipsoidCollider.prototype.indices = null;
a3d.EllipsoidCollider.prototype.numFaces = null;
a3d.EllipsoidCollider.prototype.numI = null;
a3d.EllipsoidCollider.prototype.radius = null;
a3d.EllipsoidCollider.prototype.src = null;
a3d.EllipsoidCollider.prototype.displ = null;
a3d.EllipsoidCollider.prototype.dest = null;
a3d.EllipsoidCollider.prototype.collisionPoint = null;
a3d.EllipsoidCollider.prototype.collisionPlane = null;
a3d.EllipsoidCollider.prototype.sphere = null;
a3d.EllipsoidCollider.prototype.cornerA = null;
a3d.EllipsoidCollider.prototype.cornerB = null;
a3d.EllipsoidCollider.prototype.cornerC = null;
a3d.EllipsoidCollider.prototype.cornerD = null;
a3d.EllipsoidCollider.prototype.gotMoved = null;
a3d.EllipsoidCollider.prototype.timestamp = null;
a3d.EllipsoidCollider.prototype.calculateSphere = function(transform) {
	this.sphere.x = transform.d;
	this.sphere.y = transform.h;
	this.sphere.z = transform.l;
	var sax = transform.a * this.cornerA.x + transform.b * this.cornerA.y + transform.c * this.cornerA.z + transform.d;
	var say = transform.e * this.cornerA.x + transform.f * this.cornerA.y + transform.g * this.cornerA.z + transform.h;
	var saz = transform.i * this.cornerA.x + transform.j * this.cornerA.y + transform.k * this.cornerA.z + transform.l;
	var sbx = transform.a * this.cornerB.x + transform.b * this.cornerB.y + transform.c * this.cornerB.z + transform.d;
	var sby = transform.e * this.cornerB.x + transform.f * this.cornerB.y + transform.g * this.cornerB.z + transform.h;
	var sbz = transform.i * this.cornerB.x + transform.j * this.cornerB.y + transform.k * this.cornerB.z + transform.l;
	var scx = transform.a * this.cornerC.x + transform.b * this.cornerC.y + transform.c * this.cornerC.z + transform.d;
	var scy = transform.e * this.cornerC.x + transform.f * this.cornerC.y + transform.g * this.cornerC.z + transform.h;
	var scz = transform.i * this.cornerC.x + transform.j * this.cornerC.y + transform.k * this.cornerC.z + transform.l;
	var sdx = transform.a * this.cornerD.x + transform.b * this.cornerD.y + transform.c * this.cornerD.z + transform.d;
	var sdy = transform.e * this.cornerD.x + transform.f * this.cornerD.y + transform.g * this.cornerD.z + transform.h;
	var sdz = transform.i * this.cornerD.x + transform.j * this.cornerD.y + transform.k * this.cornerD.z + transform.l;
	var dx = sax - this.sphere.x;
	var dy = say - this.sphere.y;
	var dz = saz - this.sphere.z;
	this.sphere.w = dx * dx + dy * dy + dz * dz;
	dx = sbx - this.sphere.x;
	dy = sby - this.sphere.y;
	dz = sbz - this.sphere.z;
	var dxyz = dx * dx + dy * dy + dz * dz;
	if(dxyz > this.sphere.w) this.sphere.w = dxyz;
	dx = scx - this.sphere.x;
	dy = scy - this.sphere.y;
	dz = scz - this.sphere.z;
	dxyz = dx * dx + dy * dy + dz * dz;
	if(dxyz > this.sphere.w) this.sphere.w = dxyz;
	dx = sdx - this.sphere.x;
	dy = sdy - this.sphere.y;
	dz = sdz - this.sphere.z;
	dxyz = dx * dx + dy * dy + dz * dz;
	if(dxyz > this.sphere.w) this.sphere.w = dxyz;
	this.sphere.w = Math.sqrt(this.sphere.w);
}
a3d.EllipsoidCollider.prototype.prepare = function(source,displacement) {
	this.radius = this.radiusX;
	if(this.radiusY > this.radius) this.radius = this.radiusY;
	if(this.radiusZ > this.radius) this.radius = this.radiusZ;
	this.matrix.compose(source.x,source.y,source.z,0,0,0,this.radiusX / this.radius,this.radiusY / this.radius,this.radiusZ / this.radius);
	this.inverseMatrix.copy(this.matrix);
	this.inverseMatrix.invert();
	this.src.x = 0;
	this.src.y = 0;
	this.src.z = 0;
	this.displ.x = this.inverseMatrix.a * displacement.x + this.inverseMatrix.b * displacement.y + this.inverseMatrix.c * displacement.z;
	this.displ.y = this.inverseMatrix.e * displacement.x + this.inverseMatrix.f * displacement.y + this.inverseMatrix.g * displacement.z;
	this.displ.z = this.inverseMatrix.i * displacement.x + this.inverseMatrix.j * displacement.y + this.inverseMatrix.k * displacement.z;
	this.dest.x = this.src.x + this.displ.x;
	this.dest.y = this.src.y + this.displ.y;
	this.dest.z = this.src.z + this.displ.z;
	var rad = this.radius + Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D()));
	this.cornerA.x = -rad;
	this.cornerA.y = -rad;
	this.cornerA.z = -rad;
	this.cornerB.x = rad;
	this.cornerB.y = -rad;
	this.cornerB.z = -rad;
	this.cornerC.x = rad;
	this.cornerC.y = rad;
	this.cornerC.z = -rad;
	this.cornerD.x = -rad;
	this.cornerD.y = rad;
	this.cornerD.z = -rad;
	this.calculateSphere(this.matrix);
}
a3d.EllipsoidCollider.prototype.loopGeometries = function() {
	var rad = this.radius + Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D()));
	this.numI = 0;
	this.numFaces = 0;
	var indicesLength = 0;
	var normalsLength = 0;
	var j;
	var verticesLength = 0;
	var geometriesLength = this.geometries.length;
	var transform = this.inverseMatrix;
	var vx;
	var vy;
	var vz;
	var oa;
	var numVertices;
	var geometryIndicesLength;
	var verts;
	var geometry;
	var nSides;
	var geometryIndices;
	if(geometriesLength > 400) {
		haxe.Log.trace("Too much geometries!" + geometriesLength,{ fileName : "EllipsoidCollider.hx", lineNumber : 238, className : "a3d.EllipsoidCollider", methodName : "loopGeometries"});
		return;
	}
	{
		var _g = 0;
		while(_g < geometriesLength) {
			var i = _g++;
			geometry = this.geometries[i];
			geometryIndices = geometry.indices;
			geometryIndicesLength = geometryIndices.length;
			verts = geometry.vertices;
			numVertices = geometry.numVertices;
			{
				var _g1 = 0;
				while(_g1 < numVertices) {
					var j1 = _g1++;
					vx = verts[j1 * 3];
					vy = verts[j1 * 3 + 1];
					vz = verts[j1 * 3 + 2];
					this.vertices[verticesLength] = transform.a * vx + transform.b * vy + transform.c * vz + transform.d;
					verticesLength++;
					this.vertices[verticesLength] = transform.e * vx + transform.f * vy + transform.g * vz + transform.h;
					verticesLength++;
					this.vertices[verticesLength] = transform.i * vx + transform.j * vy + transform.k * vz + transform.l;
					verticesLength++;
				}
			}
			j = 0;
			var k = 0;
			while(k < geometryIndicesLength) {
				j = k;
				var a = geometryIndices[j];
				j++;
				nSides = (a & -268435456) >> 28;
				k += nSides;
				oa = a;
				a &= 268435455;
				var index = a * 3;
				var ax = this.vertices[index];
				index++;
				var ay = this.vertices[index];
				index++;
				var az = this.vertices[index];
				var b = geometryIndices[j];
				j++;
				index = b * 3;
				var bx = this.vertices[index];
				index++;
				var by = this.vertices[index];
				index++;
				var bz = this.vertices[index];
				var c = geometryIndices[j];
				j++;
				index = c * 3;
				var cx = this.vertices[index];
				index++;
				var cy = this.vertices[index];
				index++;
				var cz = this.vertices[index];
				if(nSides == 3) {
					if(ax > rad && bx > rad && cx > rad || ax < -rad && bx < -rad && cx < -rad) continue;
					if(ay > rad && by > rad && cy > rad || ay < -rad && by < -rad && cy < -rad) continue;
					if(az > rad && bz > rad && cz > rad || az < -rad && bz < -rad && cz < -rad) continue;
				}
				var abx = bx - ax;
				var aby = by - ay;
				var abz = bz - az;
				var acx = cx - ax;
				var acy = cy - ay;
				var acz = cz - az;
				var normalX = acz * aby - acy * abz;
				var normalY = acx * abz - acz * abx;
				var normalZ = acy * abx - acx * aby;
				var len = normalX * normalX + normalY * normalY + normalZ * normalZ;
				if(len < 0.001) continue;
				len = 1 / Math.sqrt(len);
				normalX *= len;
				normalY *= len;
				normalZ *= len;
				var offset = ax * normalX + ay * normalY + az * normalZ;
				if(offset > rad || offset < -rad) continue;
				this.indices[indicesLength] = oa;
				indicesLength++;
				this.indices[indicesLength] = b;
				indicesLength++;
				this.indices[indicesLength] = c;
				indicesLength++;
				this.normals[normalsLength] = normalX;
				normalsLength++;
				this.normals[normalsLength] = normalY;
				normalsLength++;
				this.normals[normalsLength] = normalZ;
				normalsLength++;
				this.normals[normalsLength] = offset;
				normalsLength++;
				{
					var _g1 = 3;
					while(_g1 < nSides) {
						var n = _g1++;
						c = geometryIndices[j];
						j++;
						this.indices[indicesLength] = c;
						indicesLength++;
					}
				}
				this.numFaces++;
			}
		}
	}
	this.geometries.length = 0;
	this.numI = indicesLength;
}
a3d.EllipsoidCollider.prototype.calculateDestination = function(source,displacement,collidable) {
	if(Math.abs(jeash.geom.Vector3D.distance(displacement,new jeash.geom.Vector3D())) <= this.threshold) {
		this.gotMoved = false;
		return new jeash.geom.Vector3D(source.x,source.y,source.z,source.w);
	}
	this.gotMoved = true;
	this.timestamp++;
	this.prepare(source,displacement);
	collidable.collectGeometry(this);
	this.loopGeometries();
	var result;
	if(this.numFaces > 0) {
		{
			var _g = 0;
			while(_g < 50) {
				var i = _g++;
				if(this.checkCollision()) {
					var offset = this.radius + this.threshold + this.collisionPlane.w - this.dest.x * this.collisionPlane.x - this.dest.y * this.collisionPlane.y - this.dest.z * this.collisionPlane.z;
					this.dest.x += this.collisionPlane.x * offset;
					this.dest.y += this.collisionPlane.y * offset;
					this.dest.z += this.collisionPlane.z * offset;
					this.src.x = this.collisionPoint.x + this.collisionPlane.x * (this.radius + this.threshold);
					this.src.y = this.collisionPoint.y + this.collisionPlane.y * (this.radius + this.threshold);
					this.src.z = this.collisionPoint.z + this.collisionPlane.z * (this.radius + this.threshold);
					this.displ.x = this.dest.x - this.src.x;
					this.displ.y = this.dest.y - this.src.y;
					this.displ.z = this.dest.z - this.src.z;
					if(Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D())) < this.threshold) break;
				}
				else break;
			}
		}
		result = new jeash.geom.Vector3D(this.matrix.a * this.dest.x + this.matrix.b * this.dest.y + this.matrix.c * this.dest.z + this.matrix.d,this.matrix.e * this.dest.x + this.matrix.f * this.dest.y + this.matrix.g * this.dest.z + this.matrix.h,this.matrix.i * this.dest.x + this.matrix.j * this.dest.y + this.matrix.k * this.dest.z + this.matrix.l);
	}
	else {
		result = new jeash.geom.Vector3D(source.x + displacement.x,source.y + displacement.y,source.z + displacement.z);
	}
	return a3d.EllipsoidCollider.isNaN2(result.x)?new jeash.geom.Vector3D(source.x,source.y,source.z,source.w):result;
}
a3d.EllipsoidCollider.prototype.addGeometry = function(g) {
	this.geometries.push(g);
}
a3d.EllipsoidCollider.prototype.checkCollision = function() {
	var minTime = 1;
	var displacementLength = Math.abs(jeash.geom.Vector3D.distance(this.displ,new jeash.geom.Vector3D()));
	var t;
	var indicesLength = this.numI;
	var j = 0;
	var i = 0;
	var p1x;
	var p1y;
	var p1z;
	var p2x;
	var p2y;
	var p2z;
	var nSides;
	var locI;
	var k = 0;
	while(k < indicesLength) {
		locI = i = k;
		var index = this.indices[i];
		i++;
		nSides = (index & -268435456) >> 28;
		k += nSides;
		index &= 268435455;
		index *= 3;
		var ax = this.vertices[index];
		index++;
		var ay = this.vertices[index];
		index++;
		var az = this.vertices[index];
		index = this.indices[i] * 3;
		i++;
		var bx = this.vertices[index];
		index++;
		var by = this.vertices[index];
		index++;
		var bz = this.vertices[index];
		index = this.indices[i] * 3;
		i++;
		var cx = this.vertices[index];
		index++;
		var cy = this.vertices[index];
		index++;
		var cz = this.vertices[index];
		var normalX = this.normals[j];
		j++;
		var normalY = this.normals[j];
		j++;
		var normalZ = this.normals[j];
		j++;
		var offset = this.normals[j];
		j++;
		var distance = this.src.x * normalX + this.src.y * normalY + this.src.z * normalZ - offset;
		var pointX;
		var pointY;
		var pointZ;
		if(distance < this.radius) {
			pointX = this.src.x - normalX * distance;
			pointY = this.src.y - normalY * distance;
			pointZ = this.src.z - normalZ * distance;
		}
		else {
			var t1 = (distance - this.radius) / (distance - this.dest.x * normalX - this.dest.y * normalY - this.dest.z * normalZ + offset);
			pointX = this.src.x + this.displ.x * t1 - normalX * this.radius;
			pointY = this.src.y + this.displ.y * t1 - normalY * this.radius;
			pointZ = this.src.z + this.displ.z * t1 - normalZ * this.radius;
		}
		var faceX = 0;
		var faceY = 0;
		var faceZ = 0;
		var min = 1e+22;
		var inside = true;
		p1x = ax;
		p1y = ay;
		p1z = az;
		var startI = locI;
		locI++;
		var count = 0;
		{
			var _g = 0;
			while(_g < nSides) {
				var n = _g++;
				count++;
				index = count != nSides?this.indices[locI] * 3:(this.indices[startI] & 268435455) * 3;
				p2x = this.vertices[index];
				index++;
				p2y = this.vertices[index];
				index++;
				p2z = this.vertices[index];
				locI++;
				var abx = p2x - p1x;
				var aby = p2y - p1y;
				var abz = p2z - p1z;
				var acx = pointX - p1x;
				var acy = pointY - p1y;
				var acz = pointZ - p1z;
				var crx = acz * aby - acy * abz;
				var cry = acx * abz - acz * abx;
				var crz = acy * abx - acx * aby;
				if(crx * normalX + cry * normalY + crz * normalZ < 0) {
					var edgeLength = abx * abx + aby * aby + abz * abz;
					var edgeDistanceSqr = (crx * crx + cry * cry + crz * crz) / edgeLength;
					if(edgeDistanceSqr < min) {
						edgeLength = Math.sqrt(edgeLength);
						abx /= edgeLength;
						aby /= edgeLength;
						abz /= edgeLength;
						t = abx * acx + aby * acy + abz * acz;
						var acLen;
						if(t < 0) {
							acLen = acx * acx + acy * acy + acz * acz;
							if(acLen < min) {
								min = acLen;
								faceX = p1x;
								faceY = p1y;
								faceZ = p1z;
							}
						}
						else if(t > edgeLength) {
							acx = pointX - p2x;
							acy = pointY - p2y;
							acz = pointZ - p2z;
							acLen = acx * acx + acy * acy + acz * acz;
							if(acLen < min) {
								min = acLen;
								faceX = p2x;
								faceY = p2y;
								faceZ = p2z;
							}
						}
						else {
							min = edgeDistanceSqr;
							faceX = p1x + abx * t;
							faceY = p1y + aby * t;
							faceZ = p1z + abz * t;
						}
					}
					inside = false;
				}
				p1x = p2x;
				p1y = p2y;
				p1z = p2z;
			}
		}
		if(inside) {
			faceX = pointX;
			faceY = pointY;
			faceZ = pointZ;
		}
		var deltaX = this.src.x - faceX;
		var deltaY = this.src.y - faceY;
		var deltaZ = this.src.z - faceZ;
		if(deltaX * this.displ.x + deltaY * this.displ.y + deltaZ * this.displ.z <= 0) {
			var backX = -this.displ.x / displacementLength;
			var backY = -this.displ.y / displacementLength;
			var backZ = -this.displ.z / displacementLength;
			var deltaLength = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
			var projectionLength = deltaX * backX + deltaY * backY + deltaZ * backZ;
			var projectionInsideLength = this.radius * this.radius - deltaLength + projectionLength * projectionLength;
			if(projectionInsideLength > 0) {
				var time = (projectionLength - Math.sqrt(projectionInsideLength)) / displacementLength;
				if(time < minTime) {
					minTime = time;
					this.collisionPoint.x = faceX;
					this.collisionPoint.y = faceY;
					this.collisionPoint.z = faceZ;
					if(inside) {
						this.collisionPlane.x = normalX;
						this.collisionPlane.y = normalY;
						this.collisionPlane.z = normalZ;
						this.collisionPlane.w = offset;
					}
					else {
						deltaLength = Math.sqrt(deltaLength);
						this.collisionPlane.x = deltaX / deltaLength;
						this.collisionPlane.y = deltaY / deltaLength;
						this.collisionPlane.z = deltaZ / deltaLength;
						this.collisionPlane.w = this.collisionPoint.x * this.collisionPlane.x + this.collisionPoint.y * this.collisionPlane.y + this.collisionPoint.z * this.collisionPlane.z;
					}
				}
			}
		}
	}
	return minTime < 1;
}
a3d.EllipsoidCollider.prototype.__class__ = a3d.EllipsoidCollider;
glidias.ArrayBuffer = function(p) { if( p === $_ ) return; {
	this.i = 0;
	this.arr = new Array();
}}
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
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) { if( length === $_ ) return; {
	this.length = length;
	this.b = b;
}}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	{
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			a.push(0);
		}
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s.cca(i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			}
			else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
			else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		}
		else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127);
		else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		}
		else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
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
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
glidias.Rectangle = function(x,y,width,height) { if( x === $_ ) return; {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}}
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
a3d.IECollidable = function() { }
a3d.IECollidable.__name__ = ["a3d","IECollidable"];
a3d.IECollidable.prototype.collectGeometry = null;
a3d.IECollidable.prototype.__class__ = a3d.IECollidable;
glidias.AABBSector = function(p) { if( p === $_ ) return; {
	this.id = glidias.AABBSector.ID_COUNT++;
	this.renderId = -999999999;
	this.collisionId = -999999999;
	this.geom = new a3d.Geometry();
}}
glidias.AABBSector.__name__ = ["glidias","AABBSector"];
glidias.AABBSector.prototype.minX = null;
glidias.AABBSector.prototype.minY = null;
glidias.AABBSector.prototype.minZ = null;
glidias.AABBSector.prototype.maxX = null;
glidias.AABBSector.prototype.maxY = null;
glidias.AABBSector.prototype.maxZ = null;
glidias.AABBSector.prototype.portalWalls = null;
glidias.AABBSector.prototype.renderId = null;
glidias.AABBSector.prototype.collisionId = null;
glidias.AABBSector.prototype.rect = null;
glidias.AABBSector.prototype.ceilHeight = null;
glidias.AABBSector.prototype.groundPos = null;
glidias.AABBSector.prototype.dom = null;
glidias.AABBSector.prototype.setVis = function(val) {
	this.dom.style.visibility = val?"visible":"hidden";
}
glidias.AABBSector.prototype.geom = null;
glidias.AABBSector.prototype.id = null;
glidias.AABBSector.prototype.toString = function() {
	return "Sector:" + this.id + ">>" + this.renderId;
}
glidias.AABBSector.prototype.collectGeometry = function(collider) {
	var sphere = collider.sphere;
	var timestamp = collider.timestamp;
	this.collisionId = timestamp;
	if(sphere.x + sphere.w > this.minX && sphere.x - sphere.w < this.maxX && sphere.y + sphere.w > this.minY && sphere.y - sphere.w < this.maxY && sphere.z + sphere.w > this.minZ && sphere.z - sphere.w < this.maxZ) {
		collider.geometries.push(this.geom);
		var len = this.portalWalls.length;
		var port;
		var p;
		var ptl;
		var pl;
		var portal;
		{
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				p = this.portalWalls[i];
				ptl = p.portals;
				pl = ptl.length;
				{
					var _g1 = 0;
					while(_g1 < pl) {
						var u = _g1++;
						portal = ptl[u];
						if(sphere.x + sphere.w > p.minX && sphere.x - sphere.w < p.maxX && sphere.y + sphere.w > p.minY && sphere.y - sphere.w < p.maxY && sphere.z + sphere.w > p.minZ && sphere.z - sphere.w < p.maxZ) {
							port = portal.target;
							if(port == null) continue;
							if(port.collisionId != timestamp && (sphere.x + sphere.w > port.minX && sphere.x - sphere.w < port.maxX && sphere.y + sphere.w > port.minY && sphere.y - sphere.w < port.maxY && sphere.z + sphere.w > port.minZ && sphere.z - sphere.w < port.maxZ)) null;
						}
					}
				}
			}
		}
	}
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			p = this.portalWalls[i];
			if(frus.checkVisibility(p)) {
				ptl = p.portals;
				pl = ptl.length;
				{
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
	var i;
	var boundVerts = new Array();
	boundVerts.length = 8;
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
	i = 0;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
	x = gridSize * (rect.x + rect.width);
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
	i = 3;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
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
	i = 6;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
	x = gridSize * rect.x;
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
	i = 9;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
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
	i = 12;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
	x = gridSize * (rect.x + rect.width);
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
	i = 15;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
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
	i = 18;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
	x = gridSize * rect.x;
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
	i = 21;
	boundVerts[i++] = a;
	boundVerts[i++] = b;
	boundVerts[i] = c;
	this.geom.pushVertices(boundVerts);
}
glidias.AABBSector.prototype.addWallFace = function(direction) {
	this.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[direction]);
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(this.portalWalls[i].direction == direction) return this.portalWalls[i];
		}
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
		{
			if(portal.minX < portalPlane.minX) portalPlane.minX = portal.minX;
			if(portal.minY < portalPlane.minY) portalPlane.minY = portal.minY;
			if(portal.minZ < portalPlane.minZ) portalPlane.minZ = portal.minZ;
			if(portal.maxX > portalPlane.maxX) portalPlane.maxX = portal.maxX;
			if(portal.maxY > portalPlane.maxY) portalPlane.maxY = portal.maxY;
			if(portal.maxZ > portalPlane.maxZ) portalPlane.maxZ = portal.maxZ;
		}
		portalPlane.portals.push(portal);
	}
}
glidias.AABBSector.prototype.addPortalPlane = function(plane) {
	this.portalWalls.push(plane);
}
glidias.AABBSector.prototype.getPortalList = function() {
	var arr = [];
	{
		var _g1 = 0, _g = this.portalWalls.length;
		while(_g1 < _g) {
			var i = _g1++;
			var portalPlane = this.portalWalls[i];
			var portals = portalPlane.portals;
			{
				var _g3 = 0, _g2 = portals.length;
				while(_g3 < _g2) {
					var u = _g3++;
					arr.push(portals[u]);
				}
			}
		}
	}
	return arr;
}
glidias.AABBSector.prototype.__class__ = glidias.AABBSector;
glidias.AABBSector.__interfaces__ = [a3d.IECollidable,glidias.IAABB];
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
a3d.TransformUtil = function() { }
a3d.TransformUtil.__name__ = ["a3d","TransformUtil"];
a3d.TransformUtil.identity = function(targ) {
	targ.a = 1;
	targ.b = 0;
	targ.c = 0;
	targ.d = 0;
	targ.e = 0;
	targ.f = 1;
	targ.g = 0;
	targ.h = 0;
	targ.i = 0;
	targ.j = 0;
	targ.k = 1;
	targ.l = 0;
}
a3d.TransformUtil.compose = function(targ,x,y,z,rotationX,rotationY,rotationZ,scaleX,scaleY,scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(rotationZ);
	var cosZsinY = cosZ * sinY;
	var sinZsinY = sinZ * sinY;
	var cosYscaleX = cosY * scaleX;
	var sinXscaleY = sinX * scaleY;
	var cosXscaleY = cosX * scaleY;
	var cosXscaleZ = cosX * scaleZ;
	var sinXscaleZ = sinX * scaleZ;
	targ.a = cosZ * cosYscaleX;
	targ.b = cosZsinY * sinXscaleY - sinZ * cosXscaleY;
	targ.c = cosZsinY * cosXscaleZ + sinZ * sinXscaleZ;
	targ.d = x;
	targ.e = sinZ * cosYscaleX;
	targ.f = sinZsinY * sinXscaleY + cosZ * cosXscaleY;
	targ.g = sinZsinY * cosXscaleZ - cosZ * sinXscaleZ;
	targ.h = y;
	targ.i = -sinY * scaleX;
	targ.j = cosY * sinXscaleY;
	targ.k = cosY * cosXscaleZ;
	targ.l = z;
}
a3d.TransformUtil.composeInverse = function(targ,x,y,z,rotationX,rotationY,rotationZ,scaleX,scaleY,scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(-rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(-rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(-rotationZ);
	var sinXsinY = sinX * sinY;
	var cosYscaleX = cosY / scaleX;
	var cosXscaleY = cosX / scaleY;
	var sinXscaleZ = sinX / scaleZ;
	var cosXscaleZ = cosX / scaleZ;
	targ.a = cosZ * cosYscaleX;
	targ.b = -sinZ * cosYscaleX;
	targ.c = sinY / scaleX;
	targ.d = -targ.a * x - targ.b * y - targ.c * z;
	targ.e = sinZ * cosXscaleY + sinXsinY * cosZ / scaleY;
	targ.f = cosZ * cosXscaleY - sinXsinY * sinZ / scaleY;
	targ.g = -sinX * cosY / scaleY;
	targ.h = -targ.e * x - targ.f * y - targ.g * z;
	targ.i = sinZ * sinXscaleZ - cosZ * sinY * cosXscaleZ;
	targ.j = cosZ * sinXscaleZ + sinY * sinZ * cosXscaleZ;
	targ.k = cosY * cosXscaleZ;
	targ.l = -targ.i * x - targ.j * y - targ.k * z;
}
a3d.TransformUtil.invert = function(targ) {
	var ta = targ.a;
	var tb = targ.b;
	var tc = targ.c;
	var td = targ.d;
	var te = targ.e;
	var tf = targ.f;
	var tg = targ.g;
	var th = targ.h;
	var ti = targ.i;
	var tj = targ.j;
	var tk = targ.k;
	var tl = targ.l;
	var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
	targ.a = (-tg * tj + tf * tk) * det;
	targ.b = (tc * tj - tb * tk) * det;
	targ.c = (-tc * tf + tb * tg) * det;
	targ.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
	targ.e = (tg * ti - te * tk) * det;
	targ.f = (-tc * ti + ta * tk) * det;
	targ.g = (tc * te - ta * tg) * det;
	targ.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
	targ.i = (-tf * ti + te * tj) * det;
	targ.j = (tb * ti - ta * tj) * det;
	targ.k = (-tb * te + ta * tf) * det;
	targ.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
}
a3d.TransformUtil.initFromVector = function(targ,vector) {
	targ.a = vector[0];
	targ.b = vector[1];
	targ.c = vector[2];
	targ.d = vector[3];
	targ.e = vector[4];
	targ.f = vector[5];
	targ.g = vector[6];
	targ.h = vector[7];
	targ.i = vector[8];
	targ.j = vector[9];
	targ.k = vector[10];
	targ.l = vector[11];
}
a3d.TransformUtil.append = function(targ,transform) {
	var ta = targ.a;
	var tb = targ.b;
	var tc = targ.c;
	var td = targ.d;
	var te = targ.e;
	var tf = targ.f;
	var tg = targ.g;
	var th = targ.h;
	var ti = targ.i;
	var tj = targ.j;
	var tk = targ.k;
	var tl = targ.l;
	targ.a = transform.a * ta + transform.b * te + transform.c * ti;
	targ.b = transform.a * tb + transform.b * tf + transform.c * tj;
	targ.c = transform.a * tc + transform.b * tg + transform.c * tk;
	targ.d = transform.a * td + transform.b * th + transform.c * tl + transform.d;
	targ.e = transform.e * ta + transform.f * te + transform.g * ti;
	targ.f = transform.e * tb + transform.f * tf + transform.g * tj;
	targ.g = transform.e * tc + transform.f * tg + transform.g * tk;
	targ.h = transform.e * td + transform.f * th + transform.g * tl + transform.h;
	targ.i = transform.i * ta + transform.j * te + transform.k * ti;
	targ.j = transform.i * tb + transform.j * tf + transform.k * tj;
	targ.k = transform.i * tc + transform.j * tg + transform.k * tk;
	targ.l = transform.i * td + transform.j * th + transform.k * tl + transform.l;
}
a3d.TransformUtil.prepend = function(targ,transform) {
	var ta = targ.a;
	var tb = targ.b;
	var tc = targ.c;
	var td = targ.d;
	var te = targ.e;
	var tf = targ.f;
	var tg = targ.g;
	var th = targ.h;
	var ti = targ.i;
	var tj = targ.j;
	var tk = targ.k;
	var tl = targ.l;
	targ.a = ta * transform.a + tb * transform.e + tc * transform.i;
	targ.b = ta * transform.b + tb * transform.f + tc * transform.j;
	targ.c = ta * transform.c + tb * transform.g + tc * transform.k;
	targ.d = ta * transform.d + tb * transform.h + tc * transform.l + td;
	targ.e = te * transform.a + tf * transform.e + tg * transform.i;
	targ.f = te * transform.b + tf * transform.f + tg * transform.j;
	targ.g = te * transform.c + tf * transform.g + tg * transform.k;
	targ.h = te * transform.d + tf * transform.h + tg * transform.l + th;
	targ.i = ti * transform.a + tj * transform.e + tk * transform.i;
	targ.j = ti * transform.b + tj * transform.f + tk * transform.j;
	targ.k = ti * transform.c + tj * transform.g + tk * transform.k;
	targ.l = ti * transform.d + tj * transform.h + tk * transform.l + tl;
}
a3d.TransformUtil.combine = function(targ,transformA,transformB) {
	targ.a = transformA.a * transformB.a + transformA.b * transformB.e + transformA.c * transformB.i;
	targ.b = transformA.a * transformB.b + transformA.b * transformB.f + transformA.c * transformB.j;
	targ.c = transformA.a * transformB.c + transformA.b * transformB.g + transformA.c * transformB.k;
	targ.d = transformA.a * transformB.d + transformA.b * transformB.h + transformA.c * transformB.l + transformA.d;
	targ.e = transformA.e * transformB.a + transformA.f * transformB.e + transformA.g * transformB.i;
	targ.f = transformA.e * transformB.b + transformA.f * transformB.f + transformA.g * transformB.j;
	targ.g = transformA.e * transformB.c + transformA.f * transformB.g + transformA.g * transformB.k;
	targ.h = transformA.e * transformB.d + transformA.f * transformB.h + transformA.g * transformB.l + transformA.h;
	targ.i = transformA.i * transformB.a + transformA.j * transformB.e + transformA.k * transformB.i;
	targ.j = transformA.i * transformB.b + transformA.j * transformB.f + transformA.k * transformB.j;
	targ.k = transformA.i * transformB.c + transformA.j * transformB.g + transformA.k * transformB.k;
	targ.l = transformA.i * transformB.d + transformA.j * transformB.h + transformA.k * transformB.l + transformA.l;
}
a3d.TransformUtil.calculateInversion = function(targ,source) {
	var ta = source.a;
	var tb = source.b;
	var tc = source.c;
	var td = source.d;
	var te = source.e;
	var tf = source.f;
	var tg = source.g;
	var th = source.h;
	var ti = source.i;
	var tj = source.j;
	var tk = source.k;
	var tl = source.l;
	var det = 1 / (-tc * tf * ti + tb * tg * ti + tc * te * tj - ta * tg * tj - tb * te * tk + ta * tf * tk);
	targ.a = (-tg * tj + tf * tk) * det;
	targ.b = (tc * tj - tb * tk) * det;
	targ.c = (-tc * tf + tb * tg) * det;
	targ.d = (td * tg * tj - tc * th * tj - td * tf * tk + tb * th * tk + tc * tf * tl - tb * tg * tl) * det;
	targ.e = (tg * ti - te * tk) * det;
	targ.f = (-tc * ti + ta * tk) * det;
	targ.g = (tc * te - ta * tg) * det;
	targ.h = (tc * th * ti - td * tg * ti + td * te * tk - ta * th * tk - tc * te * tl + ta * tg * tl) * det;
	targ.i = (-tf * ti + te * tj) * det;
	targ.j = (tb * ti - ta * tj) * det;
	targ.k = (-tb * te + ta * tf) * det;
	targ.l = (td * tf * ti - tb * th * ti - td * te * tj + ta * th * tj + tb * te * tl - ta * tf * tl) * det;
}
a3d.TransformUtil.copy = function(targ,source) {
	targ.a = source.a;
	targ.b = source.b;
	targ.c = source.c;
	targ.d = source.d;
	targ.e = source.e;
	targ.f = source.f;
	targ.g = source.g;
	targ.h = source.h;
	targ.i = source.i;
	targ.j = source.j;
	targ.k = source.k;
	targ.l = source.l;
}
a3d.TransformUtil.prototype.__class__ = a3d.TransformUtil;
a3d.BoundBox = function(p) { if( p === $_ ) return; {
	this.minX = 1.7976931348623157e+308;
	this.minY = 1.7976931348623157e+308;
	this.minZ = 1.7976931348623157e+308;
	this.maxX = -1.7976931348623157e+308;
	this.maxY = -1.7976931348623157e+308;
	this.maxZ = -1.7976931348623157e+308;
}}
a3d.BoundBox.__name__ = ["a3d","BoundBox"];
a3d.BoundBox.prototype.minX = null;
a3d.BoundBox.prototype.minY = null;
a3d.BoundBox.prototype.minZ = null;
a3d.BoundBox.prototype.maxX = null;
a3d.BoundBox.prototype.maxY = null;
a3d.BoundBox.prototype.maxZ = null;
a3d.BoundBox.prototype.__class__ = a3d.BoundBox;
a3d.BoundBox.__interfaces__ = [glidias.IAABB];
glidias.PM_PRNG = function(_seed) { if( _seed === $_ ) return; {
	if(_seed == null) _seed = 1;
	this.seed = _seed;
}}
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
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
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
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
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
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
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
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
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
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
jeash.geom.Point = function(inX,inY) { if( inX === $_ ) return; {
	this.x = inX == null?0.0:inX;
	this.y = inY == null?0.0:inY;
}}
jeash.geom.Point.__name__ = ["jeash","geom","Point"];
jeash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
jeash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new jeash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
jeash.geom.Point.polar = function(len,angle) {
	return new jeash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
jeash.geom.Point.prototype.x = null;
jeash.geom.Point.prototype.y = null;
jeash.geom.Point.prototype.add = function(v) {
	return new jeash.geom.Point(v.x + this.x,v.y + this.y);
}
jeash.geom.Point.prototype.clone = function() {
	return new jeash.geom.Point(this.x,this.y);
}
jeash.geom.Point.prototype.equals = function(toCompare) {
	return toCompare.x == this.x && toCompare.y == this.y;
}
jeash.geom.Point.prototype.length = null;
jeash.geom.Point.prototype.get_length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}
jeash.geom.Point.prototype.normalize = function(thickness) {
	if(this.x == 0 && this.y == 0) this.x = thickness;
	else {
		var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
		this.x *= norm;
		this.y *= norm;
	}
}
jeash.geom.Point.prototype.offset = function(dx,dy) {
	this.x += dx;
	this.y += dy;
}
jeash.geom.Point.prototype.subtract = function(v) {
	return new jeash.geom.Point(this.x - v.x,this.y - v.y);
}
jeash.geom.Point.prototype.__class__ = jeash.geom.Point;
glidias.ArrayBuffer_glidias_AABBSector = function(p) { if( p === $_ ) return; {
	this.i = 0;
	this.arr = new Array();
}}
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
a3d.IEuler = function() { }
a3d.IEuler.__name__ = ["a3d","IEuler"];
a3d.IEuler.prototype.x = null;
a3d.IEuler.prototype.y = null;
a3d.IEuler.prototype.z = null;
a3d.IEuler.prototype.rotationX = null;
a3d.IEuler.prototype.rotationY = null;
a3d.IEuler.prototype.rotationZ = null;
a3d.IEuler.prototype.scaleX = null;
a3d.IEuler.prototype.scaleY = null;
a3d.IEuler.prototype.scaleZ = null;
a3d.IEuler.prototype.__class__ = a3d.IEuler;
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
glidias.AABBUtils.checkSphere = function(aabb,sphere) {
	return sphere.x + sphere.w > aabb.minX && sphere.x - sphere.w < aabb.maxX && sphere.y + sphere.w > aabb.minY && sphere.y - sphere.w < aabb.maxY && sphere.z + sphere.w > aabb.minZ && sphere.z - sphere.w < aabb.maxZ;
}
glidias.AABBUtils.intersectRay = function(aabb,origin,direction) {
	if(origin.x >= aabb.minX && origin.x <= aabb.maxX && origin.y >= aabb.minY && origin.y <= aabb.maxY && origin.z >= aabb.minZ && origin.z <= aabb.maxZ) return true;
	if(origin.x < aabb.minX && direction.x <= 0) return false;
	if(origin.x > aabb.maxX && direction.x >= 0) return false;
	if(origin.y < aabb.minY && direction.y <= 0) return false;
	if(origin.y > aabb.maxY && direction.y >= 0) return false;
	if(origin.z < aabb.minZ && direction.z <= 0) return false;
	if(origin.z > aabb.maxZ && direction.z >= 0) return false;
	var a;
	var b;
	var c;
	var d;
	var threshold = 0.000001;
	if(direction.x > threshold) {
		a = (aabb.minX - origin.x) / direction.x;
		b = (aabb.maxX - origin.x) / direction.x;
	}
	else if(direction.x < -threshold) {
		a = (aabb.maxX - origin.x) / direction.x;
		b = (aabb.minX - origin.x) / direction.x;
	}
	else {
		a = -1e+22;
		b = 1e+22;
	}
	if(direction.y > threshold) {
		c = (aabb.minY - origin.y) / direction.y;
		d = (aabb.maxY - origin.y) / direction.y;
	}
	else if(direction.y < -threshold) {
		c = (aabb.maxY - origin.y) / direction.y;
		d = (aabb.minY - origin.y) / direction.y;
	}
	else {
		c = -1e+22;
		d = 1e+22;
	}
	if(c >= b || d <= a) return false;
	if(c < a) {
		if(d < b) b = d;
	}
	else {
		a = c;
		if(d < b) b = d;
	}
	if(direction.z > threshold) {
		c = (aabb.minZ - origin.z) / direction.z;
		d = (aabb.maxZ - origin.z) / direction.z;
	}
	else if(direction.z < -threshold) {
		c = (aabb.maxZ - origin.z) / direction.z;
		d = (aabb.minZ - origin.z) / direction.z;
	}
	else {
		c = -1e+22;
		d = 1e+22;
	}
	if(c >= b || d <= a) return false;
	return true;
}
glidias.AABBUtils.prototype.__class__ = glidias.AABBUtils;
glidias.AllocatorF_glidias_Frustum = function(method,fillAmount,initialCapacity,fixed) { if( method === $_ ) return; {
	if(fixed == null) fixed = false;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this._method = method;
	this._len = 0;
	this.fixed = fixed;
	this._i = 0;
	this._vec = new Array();
	if(fillAmount > 0) this.fill(fillAmount,fixed);
}}
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
	{
		var _g1 = this._i, _g = this._len;
		while(_g1 < _g) {
			var i = _g1++;
			this._vec[i] = null;
		}
	}
	if(truncateLength) {
		this._vec.length = this._i;
		this._len = this._i;
	}
}
glidias.AllocatorF_glidias_Frustum.prototype.fill = function(amount,fixed) {
	this._vec.length = amount;
	this._len = amount;
	while(--amount > -1) {
		if(this._vec[amount] == null) this._vec[amount] = this._method();
	}
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
jeash.geom.Matrix3D = function(v) { if( v === $_ ) return; {
	if(v != null && v.length == 16) {
		this.rawData = v;
	}
	else {
		this.rawData = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
	}
}}
jeash.geom.Matrix3D.__name__ = ["jeash","geom","Matrix3D"];
jeash.geom.Matrix3D.interpolate = function(thisMat,toMat,percent) {
	var m = new jeash.geom.Matrix3D();
	{
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
		}
	}
	return m;
}
jeash.geom.Matrix3D.getAxisRotation = function(x,y,z,degrees) {
	var m = new jeash.geom.Matrix3D();
	var a1 = new jeash.geom.Vector3D(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	m.rawData[0] = c + a1.x * a1.x * t;
	m.rawData[5] = c + a1.y * a1.y * t;
	m.rawData[10] = c + a1.z * a1.z * t;
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	m.rawData[4] = tmp1 + tmp2;
	m.rawData[1] = tmp1 - tmp2;
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	m.rawData[8] = tmp1 - tmp2;
	m.rawData[2] = tmp1 + tmp2;
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	m.rawData[9] = tmp1 + tmp2;
	m.rawData[6] = tmp1 - tmp2;
	return m;
}
jeash.geom.Matrix3D.prototype.determinant = null;
jeash.geom.Matrix3D.prototype.position = null;
jeash.geom.Matrix3D.prototype.rawData = null;
jeash.geom.Matrix3D.prototype.getPosition = function() {
	return new jeash.geom.Vector3D(this.rawData[12],this.rawData[13],this.rawData[14]);
}
jeash.geom.Matrix3D.prototype.setPosition = function(val) {
	this.rawData[12] = val.x;
	this.rawData[13] = val.y;
	this.rawData[14] = val.z;
	return val;
}
jeash.geom.Matrix3D.prototype.getDeterminant = function() {
	return -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
}
jeash.geom.Matrix3D.prototype.append = function(lhs) {
	var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
	this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
}
jeash.geom.Matrix3D.prototype.appendRotation = function(degrees,axis,pivotPoint) {
	var m = jeash.geom.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		{
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
	}
	this.append(m);
}
jeash.geom.Matrix3D.prototype.appendScale = function(xScale,yScale,zScale) {
	this.append(new jeash.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]));
}
jeash.geom.Matrix3D.prototype.appendTranslation = function(x,y,z) {
	this.rawData[12] += x;
	this.rawData[13] += y;
	this.rawData[14] += z;
}
jeash.geom.Matrix3D.prototype.clone = function() {
	return new jeash.geom.Matrix3D(this.rawData.copy());
}
jeash.geom.Matrix3D.prototype.decompose = function() {
	var vec = new Array();
	var m = new jeash.geom.Matrix3D(this.rawData.copy());
	var mr = m.rawData;
	var pos = new jeash.geom.Vector3D(mr[12],mr[13],mr[14]);
	mr[12] = 0;
	mr[13] = 0;
	mr[14] = 0;
	var scale = new jeash.geom.Vector3D();
	scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
	scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
	scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
	if(mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) scale.z = -scale.z;
	mr[0] /= scale.x;
	mr[1] /= scale.x;
	mr[2] /= scale.x;
	mr[4] /= scale.y;
	mr[5] /= scale.y;
	mr[6] /= scale.y;
	mr[8] /= scale.z;
	mr[9] /= scale.z;
	mr[10] /= scale.z;
	var rot = new jeash.geom.Vector3D();
	rot.y = Math.asin(-mr[2]);
	var C = Math.cos(rot.y);
	if(C > 0) {
		rot.x = Math.atan2(mr[6],mr[10]);
		rot.z = Math.atan2(mr[1],mr[0]);
	}
	else {
		rot.z = 0;
		rot.x = Math.atan2(mr[4],mr[5]);
	}
	vec.push(pos);
	vec.push(rot);
	vec.push(scale);
	return vec;
}
jeash.geom.Matrix3D.prototype.deltaTransformVector = function(v) {
	var x = v.x, y = v.y, z = v.z;
	return new jeash.geom.Vector3D(x * this.rawData[0] + y * this.rawData[1] + z * this.rawData[2] + this.rawData[3],x * this.rawData[4] + y * this.rawData[5] + z * this.rawData[6] + this.rawData[7],x * this.rawData[8] + y * this.rawData[9] + z * this.rawData[10] + this.rawData[11],0);
}
jeash.geom.Matrix3D.prototype.identity = function() {
	this.rawData[0] = 1;
	this.rawData[1] = 0;
	this.rawData[2] = 0;
	this.rawData[3] = 0;
	this.rawData[4] = 0;
	this.rawData[5] = 1;
	this.rawData[6] = 0;
	this.rawData[7] = 0;
	this.rawData[8] = 0;
	this.rawData[9] = 0;
	this.rawData[10] = 1;
	this.rawData[11] = 0;
	this.rawData[12] = 0;
	this.rawData[13] = 0;
	this.rawData[14] = 0;
	this.rawData[15] = 1;
}
jeash.geom.Matrix3D.prototype.interpolateTo = function(toMat,percent) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
	}
}
jeash.geom.Matrix3D.prototype.invert = function() {
	var d = -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
	var invertable = Math.abs(d) > 0.00000000001;
	if(invertable) {
		d = -1 / d;
		var m11 = this.rawData[0];
		var m21 = this.rawData[4];
		var m31 = this.rawData[8];
		var m41 = this.rawData[12];
		var m12 = this.rawData[1];
		var m22 = this.rawData[5];
		var m32 = this.rawData[9];
		var m42 = this.rawData[13];
		var m13 = this.rawData[2];
		var m23 = this.rawData[6];
		var m33 = this.rawData[10];
		var m43 = this.rawData[14];
		var m14 = this.rawData[3];
		var m24 = this.rawData[7];
		var m34 = this.rawData[11];
		var m44 = this.rawData[15];
		this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
		this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
		this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
		this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
		this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
		this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
		this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
		this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
		this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
		this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
		this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
		this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
		this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
		this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
		this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
		this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
	}
	return invertable;
}
jeash.geom.Matrix3D.prototype.prepend = function(rhs) {
	var m111 = rhs.rawData[0], m121 = rhs.rawData[4], m131 = rhs.rawData[8], m141 = rhs.rawData[12], m112 = rhs.rawData[1], m122 = rhs.rawData[5], m132 = rhs.rawData[9], m142 = rhs.rawData[13], m113 = rhs.rawData[2], m123 = rhs.rawData[6], m133 = rhs.rawData[10], m143 = rhs.rawData[14], m114 = rhs.rawData[3], m124 = rhs.rawData[7], m134 = rhs.rawData[11], m144 = rhs.rawData[15], m211 = this.rawData[0], m221 = this.rawData[4], m231 = this.rawData[8], m241 = this.rawData[12], m212 = this.rawData[1], m222 = this.rawData[5], m232 = this.rawData[9], m242 = this.rawData[13], m213 = this.rawData[2], m223 = this.rawData[6], m233 = this.rawData[10], m243 = this.rawData[14], m214 = this.rawData[3], m224 = this.rawData[7], m234 = this.rawData[11], m244 = this.rawData[15];
	this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
}
jeash.geom.Matrix3D.prototype.prependRotation = function(degrees,axis,pivotPoint) {
	var m = jeash.geom.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		{
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
	}
	this.prepend(m);
}
jeash.geom.Matrix3D.prototype.prependScale = function(xScale,yScale,zScale) {
	this.prepend(new jeash.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]));
}
jeash.geom.Matrix3D.prototype.prependTranslation = function(x,y,z) {
	var m = new jeash.geom.Matrix3D();
	m.setPosition(new jeash.geom.Vector3D(x,y,z));
	this.prepend(m);
}
jeash.geom.Matrix3D.prototype.recompose = function(components) {
	if(components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) return false;
	{
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
	}
	this.append(new jeash.geom.Matrix3D([components[2].x,0.0,0.0,0.0,0.0,components[2].y,0.0,0.0,0.0,0.0,components[2].z,0.0,0.0,0.0,0.0,1.0]));
	var angle;
	angle = -components[1].x;
	this.append(new jeash.geom.Matrix3D([1,0,0,0,0,Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,0]));
	angle = -components[1].y;
	this.append(new jeash.geom.Matrix3D([Math.cos(angle),0,Math.sin(angle),0,0,1,0,0,-Math.sin(angle),0,Math.cos(angle),0,0,0,0,0]));
	angle = -components[1].z;
	this.append(new jeash.geom.Matrix3D([Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,1,0,0,0,0,0]));
	this.setPosition(components[0]);
	this.rawData[15] = 1;
	return true;
}
jeash.geom.Matrix3D.prototype.transformVector = function(v) {
	var x = v.x, y = v.y, z = v.z;
	return new jeash.geom.Vector3D(x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12],x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13],x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14],1);
}
jeash.geom.Matrix3D.prototype.transformVectors = function(vin,vout) {
	var i = 0;
	while(i + 3 <= vin.length) {
		var x = vin[i], y = vin[i + 1], z = vin[i + 2];
		vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
		vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
		vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
		i += 3;
	}
}
jeash.geom.Matrix3D.prototype.transpose = function() {
	var oRawData = this.rawData.copy();
	this.rawData[1] = oRawData[4];
	this.rawData[2] = oRawData[8];
	this.rawData[3] = oRawData[12];
	this.rawData[4] = oRawData[1];
	this.rawData[6] = oRawData[9];
	this.rawData[7] = oRawData[13];
	this.rawData[8] = oRawData[2];
	this.rawData[9] = oRawData[6];
	this.rawData[11] = oRawData[14];
	this.rawData[12] = oRawData[3];
	this.rawData[13] = oRawData[7];
	this.rawData[14] = oRawData[11];
}
jeash.geom.Matrix3D.prototype.__class__ = jeash.geom.Matrix3D;
a3d.Object3D = function(p) { if( p === $_ ) return; {
	{
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 0;
		this.e = 0;
		this.f = 1;
		this.g = 0;
		this.h = 0;
		this.i = 0;
		this.j = 0;
		this.k = 1;
		this.l = 0;
	}
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.rotationX = 0;
	this.rotationY = 0;
	this.rotationZ = 0;
	this.scaleX = 0;
	this.scaleY = 0;
	this.scaleZ = 0;
}}
a3d.Object3D.__name__ = ["a3d","Object3D"];
a3d.Object3D.prototype.a = null;
a3d.Object3D.prototype.b = null;
a3d.Object3D.prototype.c = null;
a3d.Object3D.prototype.d = null;
a3d.Object3D.prototype.e = null;
a3d.Object3D.prototype.f = null;
a3d.Object3D.prototype.g = null;
a3d.Object3D.prototype.h = null;
a3d.Object3D.prototype.i = null;
a3d.Object3D.prototype.j = null;
a3d.Object3D.prototype.k = null;
a3d.Object3D.prototype.l = null;
a3d.Object3D.prototype.x = null;
a3d.Object3D.prototype.y = null;
a3d.Object3D.prototype.z = null;
a3d.Object3D.prototype.rotationX = null;
a3d.Object3D.prototype.rotationY = null;
a3d.Object3D.prototype.rotationZ = null;
a3d.Object3D.prototype.scaleX = null;
a3d.Object3D.prototype.scaleY = null;
a3d.Object3D.prototype.scaleZ = null;
a3d.Object3D.prototype.geometry = null;
a3d.Object3D.prototype.boundBox = null;
a3d.Object3D.prototype.get_matrix = function() {
	a3d.TransformUtil.compose(this,this.x,this.y,this.z,this.rotationX,this.rotationY,this.rotationZ,this.scaleX,this.scaleY,this.scaleZ);
	return new jeash.geom.Matrix3D([this.a,this.e,this.i,0,this.b,this.f,this.j,0,this.c,this.g,this.k,0,this.d,this.h,this.l,1]);
}
a3d.Object3D.prototype.set_matrix = function(value) {
	var v = value.decompose();
	var t = v[0];
	var r = v[1];
	var s = v[2];
	this.x = t.x;
	this.y = t.y;
	this.z = t.z;
	this.rotationX = r.x;
	this.rotationY = r.y;
	this.rotationZ = r.z;
	this.scaleX = s.x;
	this.scaleY = s.y;
	this.scaleZ = s.z;
	return value;
}
a3d.Object3D.prototype.matrix = null;
a3d.Object3D.prototype.__class__ = a3d.Object3D;
a3d.Object3D.__interfaces__ = [a3d.IEuler,a3d.ITransform3D];
glidias.Package = function() { }
glidias.Package.__name__ = ["glidias","Package"];
glidias.Package.main = function() {
	null;
}
glidias.Package.prototype.__class__ = glidias.Package;
glidias.AllocatorF = function(method,fillAmount,initialCapacity,fixed) { if( method === $_ ) return; {
	if(fixed == null) fixed = false;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this._method = method;
	this._len = 0;
	this.fixed = fixed;
	this._i = 0;
	this._vec = new Array();
	if(fillAmount > 0) this.fill(fillAmount,fixed);
}}
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
	{
		var _g1 = this._i, _g = this._len;
		while(_g1 < _g) {
			var i = _g1++;
			this._vec[i] = null;
		}
	}
	if(truncateLength) {
		this._vec.length = this._i;
		this._len = this._i;
	}
}
glidias.AllocatorF.prototype.fill = function(amount,fixed) {
	this._vec.length = amount;
	this._len = amount;
	while(--amount > -1) {
		if(this._vec[amount] == null) this._vec[amount] = this._method();
	}
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
glidias.input.KeyCode = function() { }
glidias.input.KeyCode.__name__ = ["glidias","input","KeyCode"];
glidias.input.KeyCode.prototype.__class__ = glidias.input.KeyCode;
glidias.AABBSectorVisController = function(fillAmount,initialCapacity) { if( fillAmount === $_ ) return; {
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this.renderId = 0;
	this.sectorStack = new glidias.ArrayBuffer_glidias_AABBSector();
	this.frustumStack = new glidias.AllocatorF_glidias_Frustum($closure(glidias.Frustum,"create4"),fillAmount,initialCapacity);
}}
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
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			arr[i].dom.style.visibility = "hidden";
		}
	}
	var s = this.curSector;
	if(s == null) {
		s = this.getCurrentSector(camPos,sectors);
		if(s == null) {
			return;
		}
		this.curSector = s;
	}
	else {
		if(!!(camPos.x < s.minX || camPos.y < s.minY || camPos.z < s.minZ || camPos.x > s.maxX || camPos.y > s.maxY || camPos.z > s.maxZ)) {
			s = this.getCurrentSector(camPos,sectors);
			if(s != null && this.curSector != s) {
				this.curSector = s;
			}
		}
	}
	this.sectorStack.i = 0;
	this.curSector.checkVis(camPos,this.frustumStack,camFrus,this.sectorStack,this.renderId);
}
glidias.AABBSectorVisController.prototype.getCurrentSector = function(camPos,sectors) {
	var len = sectors.length;
	var s;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			s = sectors[i];
			if(!(camPos.x < s.minX || camPos.y < s.minY || camPos.z < s.minZ || camPos.x > s.maxX || camPos.y > s.maxY || camPos.z > s.maxZ)) return s;
		}
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
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
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
{
	js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e1 ) {
						{
							var e1 = $e1;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this));
}
a3d.A3DConst._NSHIFT = 28;
a3d.A3DConst._NMASK_ = -268435456;
a3d.A3DConst._FMASK_ = 268435455;
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
glidias.AABBSector.INDICES_WEST = [5,1,2,6];
glidias.AABBSector.INDICES_NORTH = [6,2,3,7];
glidias.AABBSector.INDICES_SOUTH = [4,0,1,5];
glidias.AABBSector.INDICES_EAST = [7,3,0,4];
glidias.AABBSector.INDICES_DOWNWARDS = [4,5,6,7];
glidias.AABBSector.INDICES_UPWARDS = [0,3,2,1];
glidias.AABBSector.INDICES_LOOKUP = (function($this) {
	var $r;
	var indices = new Array();
	indices.length = 6;
	indices[3] = glidias.AABBSector.INDICES_EAST;
	indices[2] = glidias.AABBSector.INDICES_SOUTH;
	indices[0] = glidias.AABBSector.INDICES_NORTH;
	indices[1] = glidias.AABBSector.INDICES_WEST;
	indices[5] = glidias.AABBSector.INDICES_DOWNWARDS;
	indices[4] = glidias.AABBSector.INDICES_UPWARDS;
	$r = indices;
	return $r;
}(this));
glidias.AABBSector.ID_COUNT = 0;
js.Lib.onerror = null;
glidias.AABBUtils.MAX_VALUE = 1.7976931348623157e+308;
glidias.AABBUtils.THRESHOLD = .1;
glidias.input.KeyCode.A = 65;
glidias.input.KeyCode.ALTERNATE = 18;
glidias.input.KeyCode.APPLICATION_KEY = 93;
glidias.input.KeyCode.B = 66;
glidias.input.KeyCode.BACKQUOTE = 192;
glidias.input.KeyCode.BACKSLASH = 220;
glidias.input.KeyCode.BACKSPACE = 8;
glidias.input.KeyCode.BREAK = 19;
glidias.input.KeyCode.C = 67;
glidias.input.KeyCode.CAPS_LOCK = 20;
glidias.input.KeyCode.COMMA = 188;
glidias.input.KeyCode.COMMAND = 19;
glidias.input.KeyCode.CONTROL = 17;
glidias.input.KeyCode.D = 68;
glidias.input.KeyCode.DELETE = 46;
glidias.input.KeyCode.DOWN = 40;
glidias.input.KeyCode.E = 69;
glidias.input.KeyCode.END = 35;
glidias.input.KeyCode.ENTER = 13;
glidias.input.KeyCode.EQUAL = 187;
glidias.input.KeyCode.ESCAPE = 27;
glidias.input.KeyCode.F = 70;
glidias.input.KeyCode.F1 = 112;
glidias.input.KeyCode.F10 = 121;
glidias.input.KeyCode.F11 = 122;
glidias.input.KeyCode.F12 = 123;
glidias.input.KeyCode.F13 = 124;
glidias.input.KeyCode.F14 = 125;
glidias.input.KeyCode.F15 = 126;
glidias.input.KeyCode.F2 = 113;
glidias.input.KeyCode.F3 = 114;
glidias.input.KeyCode.F4 = 115;
glidias.input.KeyCode.F5 = 116;
glidias.input.KeyCode.F6 = 117;
glidias.input.KeyCode.F7 = 118;
glidias.input.KeyCode.F8 = 119;
glidias.input.KeyCode.F9 = 120;
glidias.input.KeyCode.G = 71;
glidias.input.KeyCode.H = 72;
glidias.input.KeyCode.HOME = 36;
glidias.input.KeyCode.I = 73;
glidias.input.KeyCode.INSERT = 45;
glidias.input.KeyCode.J = 74;
glidias.input.KeyCode.K = 75;
glidias.input.KeyCode.L = 76;
glidias.input.KeyCode.LEFT = 37;
glidias.input.KeyCode.LEFTBRACKET = 219;
glidias.input.KeyCode.M = 77;
glidias.input.KeyCode.MINUS = 189;
glidias.input.KeyCode.N = 78;
glidias.input.KeyCode.NUMBER_0 = 48;
glidias.input.KeyCode.NUMBER_1 = 49;
glidias.input.KeyCode.NUMBER_2 = 50;
glidias.input.KeyCode.NUMBER_3 = 51;
glidias.input.KeyCode.NUMBER_4 = 52;
glidias.input.KeyCode.NUMBER_5 = 53;
glidias.input.KeyCode.NUMBER_6 = 54;
glidias.input.KeyCode.NUMBER_7 = 55;
glidias.input.KeyCode.NUMBER_8 = 56;
glidias.input.KeyCode.NUMBER_9 = 57;
glidias.input.KeyCode.NUM_LOCK = 144;
glidias.input.KeyCode.NUMPAD = 21;
glidias.input.KeyCode.NUMPAD_0 = 96;
glidias.input.KeyCode.NUMPAD_1 = 97;
glidias.input.KeyCode.NUMPAD_2 = 98;
glidias.input.KeyCode.NUMPAD_3 = 99;
glidias.input.KeyCode.NUMPAD_4 = 100;
glidias.input.KeyCode.NUMPAD_5 = 101;
glidias.input.KeyCode.NUMPAD_6 = 102;
glidias.input.KeyCode.NUMPAD_7 = 103;
glidias.input.KeyCode.NUMPAD_8 = 104;
glidias.input.KeyCode.NUMPAD_9 = 105;
glidias.input.KeyCode.NUMPAD_ADD = 107;
glidias.input.KeyCode.NUMPAD_DECIMAL = 110;
glidias.input.KeyCode.NUMPAD_DIVIDE = 111;
glidias.input.KeyCode.NUMPAD_ENTER = 108;
glidias.input.KeyCode.NUMPAD_MULTIPLY = 106;
glidias.input.KeyCode.NUMPAD_SUBTRACT = 109;
glidias.input.KeyCode.O = 79;
glidias.input.KeyCode.P = 80;
glidias.input.KeyCode.PAGE_DOWN = 34;
glidias.input.KeyCode.PAGE_UP = 33;
glidias.input.KeyCode.PERIOD = 190;
glidias.input.KeyCode.PRINT_SCREEN = 124;
glidias.input.KeyCode.Q = 81;
glidias.input.KeyCode.QUOTE = 222;
glidias.input.KeyCode.R = 82;
glidias.input.KeyCode.RIGHT = 39;
glidias.input.KeyCode.RIGHTBRACKET = 221;
glidias.input.KeyCode.S = 83;
glidias.input.KeyCode.SCROLL_LOCK = 145;
glidias.input.KeyCode.SEMICOLON = 186;
glidias.input.KeyCode.SHIFT = 16;
glidias.input.KeyCode.SLASH = 191;
glidias.input.KeyCode.SPACE = 32;
glidias.input.KeyCode.T = 84;
glidias.input.KeyCode.TAB = 9;
glidias.input.KeyCode.U = 85;
glidias.input.KeyCode.UP = 38;
glidias.input.KeyCode.V = 86;
glidias.input.KeyCode.W = 87;
glidias.input.KeyCode.X = 88;
glidias.input.KeyCode.Y = 89;
glidias.input.KeyCode.Z = 90;
glidias.Package.main()