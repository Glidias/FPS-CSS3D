
/* CSS Utility Functions
-------------------------------------------------- */

var CssUtils = (function() {	
	var s = document.documentElement.style;
 	var vendorPrefix = 
		(s.WebkitTransform !== undefined && "-webkit-") ||
		(s.MozTransform !== undefined && "-moz-");
	
	return {
		translate: function( x, y, z, rx, ry, rz ) {
			return vendorPrefix + "transform:" +
				"translate3d(" + x + "px," + y + "px," + z + "px)" +	
				"rotateX(" + rx + "deg)" +
				"rotateY("  +ry + "deg)" +
				"rotateZ(" + rz + "deg);"
		},
		origin: function( x, y, z ) {
			return vendorPrefix + "transform-origin:" + x + "px " + y + "px " + z + "px;";
		},
		texture: function( colour, rx, ry, rz ) {
			var a = Math.abs(-0.5+ry/180)/1.5;
			if (rz!==0) {
				a/=1.75;
			}
			/* for shading:  return "background:rgb(" + (200-a*255|0) + "," + (200-a*255|0) + "," + (200-a*255|0) + ");" */
			/* dor outline:  return "outline:1px solid #393;"; */
			return "background:"+ colour + ";";  //+vendorPrefix +"linear-gradient(rgba(0,0,0," + a + "),rgba(0,0,0," + a + "))," 
		}		
	}
}());


/* Math stuff
-------------------------------------------------- */

function Triplet( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}
Triplet.prototype.invert = function() {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	return this;
}
Triplet.prototype.clone = function() {
	return new Triplet(this.x, this.y, this.z);
}
Triplet.prototype.scaleBy = function(amt) {
	return new Triplet(this.x * amt, this.y * amt, this.z * amt);
}
Triplet.prototype.add = function(v) {
	return new Triplet( this.x + v.x, this.y + v.y, this.z + v.z);
}
Triplet.prototype.normalize = function() {
	var mag = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );
	if( mag != 0 && mag != 1)
	{
		mag = 1 / mag;
		this.x *= mag;
		this.y *= mag;
		this.z *= mag;
	}
}
Triplet.prototype.crossProduct= function(b) {
	return new Triplet((this.y * b.z) - (this.z * b.y), (this.z * b.x) - (this.x * b.z), (this.x * b.y) - (this.y * b.x));
}

function Transform3D() {
	
}
Transform3D.prototype.a = 1;
Transform3D.prototype.b = 0;
Transform3D.prototype.c = 0;
Transform3D.prototype.d = 0;
Transform3D.prototype.e = 0;
Transform3D.prototype.f = 1;
Transform3D.prototype.g = 0;
Transform3D.prototype.h = 0;
Transform3D.prototype.i = 0;
Transform3D.prototype.j = 0;
Transform3D.prototype.k = 1;
Transform3D.prototype.l = 0;
Transform3D.prototype.identity = function() {
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
Transform3D.prototype.compose = function(x, y, z, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(rotationZ);
	var cosZsinY = cosZ*sinY;
	var sinZsinY = sinZ*sinY;
	var cosYscaleX = cosY*scaleX;
	var sinXscaleY = sinX*scaleY;
	var cosXscaleY = cosX*scaleY;
	var cosXscaleZ = cosX*scaleZ;
	var sinXscaleZ = sinX*scaleZ;
	this.a = cosZ*cosYscaleX;
	this.b = cosZsinY*sinXscaleY - sinZ*cosXscaleY;
	this.c = cosZsinY*cosXscaleZ + sinZ*sinXscaleZ;
	this.d = x;
	this.e = sinZ*cosYscaleX;
	this.f = sinZsinY*sinXscaleY + cosZ*cosXscaleY;
	this.g = sinZsinY*cosXscaleZ - cosZ*sinXscaleZ;
	this.h = y;
	this.i = -sinY*scaleX;
	this.j = cosY*sinXscaleY;
	this.k = cosY*cosXscaleZ;
	this.l = z;
}
Transform3D.prototype.composeInverse = function(x, y, z, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ) {
	var cosX = Math.cos(rotationX);
	var sinX = Math.sin(-rotationX);
	var cosY = Math.cos(rotationY);
	var sinY = Math.sin(-rotationY);
	var cosZ = Math.cos(rotationZ);
	var sinZ = Math.sin(-rotationZ);
	var sinXsinY = sinX*sinY;
	var cosYscaleX = cosY/scaleX;
	var cosXscaleY = cosX/scaleY;
	var sinXscaleZ = sinX/scaleZ;
	var cosXscaleZ = cosX/scaleZ;
	this.a = cosZ*cosYscaleX;
	this.b = -sinZ*cosYscaleX;
	this.c = sinY/scaleX;
	this.d = -a*x - b*y - c*z;
	this.e = sinZ*cosXscaleY + sinXsinY*cosZ/scaleY;
	this.f = cosZ*cosXscaleY - sinXsinY*sinZ/scaleY;
	this.g = -sinX*cosY/scaleY;
	this.h = -e*x - f*y - g*z;
	this.i = sinZ*sinXscaleZ - cosZ*sinY*cosXscaleZ;
	this.j = cosZ*sinXscaleZ + sinY*sinZ*cosXscaleZ;
	this.k = cosY*cosXscaleZ;
	this.l = -i*x - j*y - k*z;
}
Transform3D.prototype.transformVector = function(v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	v.x = this.a*x + this.b*y + this.c*z;
	v.y = this.e*x + this.f*y + this.g*z;
	v.z = this.i*x + this.j*y + this.k*z;
}
Transform3D.prototype.getVector = function(v) {
	var res = new Triplet();
	var x = v.x;
	var y = v.y;
	var z = v.z;
	res.x = this.a*x + this.b*y + this.c*z;
	res.y = this.e*x + this.f*y + this.g*z;
	res.z = this.i*x + this.j*y + this.k*z;
	return res;
}
Transform3D.prototype.transformPoint = function(v) {
	v.x = this.a*x + this.b*y + this.c*z + this.d;
	v.y = this.e*x + this.f*y + this.g*z + this.h;
	v.z = this.i*x + this.j*y + this.k*z + this.l;
}




/* Camera
-------------------------------------------------- */

function Camera( world, x, y, z, rx, ry, rz) {
	this.world = world;
	this.position = new Triplet(x, y, z);
	this.rotation = new Triplet(rx, ry, rz);	
	this.focalLength = 700;
	this.viewWidth = 400;
	this.viewHeight = 300;
}

Camera.prototype.viewWidth = 0;
Camera.prototype.viewHeight = 0;
Camera.prototype = {
	getForward: function() {
		var t = this.transform;
		t.identity();
		return this.FORWARD.clone();
		////t.compose(this.position.x, this.position.y, this.position.z, this.rotation.x, this.rotation.y, this.rotation.z, 1, 1, 1);
		return t.getVector(this.FORWARD);
	},
	update: function() {
		var culler = this.culler;
		var t = this.transform;
		t.compose(this.position.x, this.position.y, this.position.z, this.rotation.x, this.rotation.y, this.rotation.z, 1, 1, 1);

		var up = t.getVector(this.UP);
		var forward = t.getVector(this.FORWARD);
		var right = t.getVector(this.RIGHT);
		
		culler.px = t.md;
		culler.py = t.mh;
		culler.pz = t.ml;
		culler.nx = culler.px + forward.x;
		culler.ny = culler.py + forward.y;
		culler.nz = culler.pz + forward.z;	
		var viewWidth = this.viewWidth;
		var viewHeight = this.viewHeight;
	
		// later optimize object re-use
		var tr = forward.scaleBy(this.focalLength).add(right.scaleBy(viewWidth)).add(up.scaleBy(viewHeight));	tr.normalize();
		var br = forward.scaleBy(this.focalLength).add(right.scaleBy(viewWidth)).add(up.scaleBy(-viewHeight));	br.normalize();
		var tl = forward.scaleBy(this.focalLength).add(right.scaleBy(-viewWidth)).add(up.scaleBy(viewHeight));	tl.normalize();
		var bl = forward.scaleBy(this.focalLength).add(right.scaleBy(-viewWidth)).add(up.scaleBy(-viewHeight)); bl.normalize();
		
		var res;
		
		res = tr.crossProduct(br);
		culler.rx = culler.px + res.x;
		culler.ry = culler.py + res.y;
		culler.rz = culler.pz + res.z;
		
		res = br.crossProduct(bl);
		culler.bx = culler.px + res.x;
		culler.by = culler.py + res.y;
		culler.bz = culler.pz + res.z;
		
		res = bl.crossProduct(tl);
		culler.lx = culler.px + res.x;
		culler.ly = culler.py + res.y;
		culler.lz = culler.pz + res.z;
		
		res = tl.crossProduct(tr);
		culler.tx = culler.px + res.x;
		culler.ty = culler.py + res.y;
		culler.tz = culler.pz + res.z;
		
		
		if (this.world) {
			this.world.node.style.cssText=  
			CssUtils.origin(-this.position.x, -this.position.y, -this.position.z) +
			CssUtils.translate(this.position.x, this.position.y, this.focalLength, this.rotation.x, this.rotation.y, this.rotation.z)
		}
		
		
	}
}
Camera.prototype.culler = new Culler();
Camera.prototype.transform = new Transform3D();
Camera.prototype.FORWARD  = new Triplet(0,0,1);
Camera.prototype.RIGHT = new Triplet(0,0,1);
Camera.prototype.UP = new Triplet(0,0,1);


// Frustum
function Culler() {
	
}
Culler.prototype.px = 0; // position
Culler.prototype.py = 0;
Culler.prototype.pz = 0;

Culler.prototype.nx =0; // near clip position   - 1
Culler.prototype.ny =0;
Culler.prototype.nz =0;

Culler.prototype.lx =0; // left clip position - 2
Culler.prototype.ly =0;
Culler.prototype.lz =0;

Culler.prototype.rx =0; // right clip position - 4
Culler.prototype.ry =0;
Culler.prototype.rz =0;

Culler.prototype.tx =0; // top clip position  - 8
Culler.prototype.ty =0;
Culler.prototype.tz =0;

Culler.prototype.bx =0; // bottom clip position  - 16
Culler.prototype.by =0;
Culler.prototype.bz =0;


function CullList() {
	
}
CullList.prototype.items = [];
CullList.prototype.list = null;
CullList.prototype.culled = 0;

CullList.prototype.add = function(obj) {
	obj.vis = false;
	obj.dom.style.display = "none";
	
	obj.next = list;
	list = obj;
	
	this.culled++;
}
CullList.prototype.remove = function(obj) {
	obj.vis = true;
	
	var c;
	var ci;
	var last;
	var next;
	for (c = this.list; c!=null; c=next) {
		next = c.next;
		ci = c.cullIndex;
		if (ci < from || ci > to) {
			last = c;
			continue;
		}
		if (last != null) last.next = next;
		else this.list = next;
		c.vis = true;
		c.dom.style.display = "block";
		this.culled--;
		last = c;
	}
}


// Immutable Obj3D scene graph (for static world) for hierachical culling
function Obj3D(dom) { 
	this.dom = dom;
	
	var mArr= user.getAttribute("data-mat").split(",");
	var bArr= user.getAttribute("data-bounds").split(",");
	var minX = bArr[0], minY=bArr[1], minZ=bArr[2], maxX=bArr[3], maxY=bArr[4], maxZ=bArr[5];
	var ma=parseFloat(mArr[0]),mb=parseFloat(mArr[1]),mc=parseFloat(mArr[2]),md=parseFloat(mArr[3]),me=parseFloat(mArr[4])
			,mf=parseFloat(mArr[5]),mg=parseFloat(mArr[6]),mh=parseFloat(mArr[7]),mi=parseFloat(mArr[8]),mj=parseFloat(mArr[9]),mk=parseFloat(mArr[10]),ml=parseFloat(mArr[11]);
	mArr = null;
	bArr= null;
	
		
	function _setVis(vis, cullList) {
		
		if (vis) {
			cullList.remove(this);
		}
		else if (this.vis) {
			cullList.add(this);
		}
	}
	
	var children = [];	
	
	// Recursive methods below are done for convenience atm, not for performance
	
	this._visit = function(culler, culling, cullList) {
		
		// -- Perform culling
		var x;
		var y;
		var z;
		var o;
		
		var hx;
		var hy;
		var hz;
		
		x = culler.px;
		y = culler.py;
		z = culler.pz;
		var px = ma*x+ mb*y + mc.z + md;
		var py = me*x+ mf*y + mg.z + mh;
		var pz = mi*x+ mj*y + mk.z + ml;
	
		
		// near
		if (culling & 1) { 
			hx = culler.nx;
			hy = culler.ny;
			hz = culler.nz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			z = (mi*hx+ mj*hy + mk*hz + ml)-pz;
			o = x*px + y*py + z*pz;
			hx = x>=0;
			hy = y>=0;
			hz = z>=0;
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y + (hz ? maxZ : minZ)*z <= o) { _setVis(false); return; }
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y + (hz ? minZ : maxZ)*z > o) culling &= ~1;
		}
		//if (culling == 0) { _setVis(true); return; }
		
		
		//left
		if (culling & 2) {  
			hx = culler.lx;
			hy = culler.ly;
			hz = culler.lz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			z = (mi*hx+ mj*hy + mk*hz + ml)-pz;
			o = x*px + y*py + z*pz;
			hx = x>=0;
			hy = y>=0;
			hz = z>=0;
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y + (hz ? maxZ : minZ)*z <= o) { _setVis(false); return; }
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y + (hz ? minZ : maxZ)*z > o) culling &= ~2;
		}
		//if (culling == 0) { _setVis(true); return; }
		
		//right
		if (culling & 4) { 
			hx = culler.rx;
			hy = culler.ry;
			hz = culler.rz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			z = (mi*hx+ mj*hy + mk*hz + ml)-pz;
			o = x*px + y*py + z*pz;
			hx = x>=0;
			hy = y>=0;
			hz = z>=0;
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y + (hz ? maxZ : minZ)*z <= o) { _setVis(false); return; }
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y + (hz ? minZ : maxZ)*z > o) culling &= ~4;
		}
		//if (culling == 0) { _setVis(true); return; }
		
		// top
		if (culling & 8) { 
			hx = culler.tx;
			hy = culler.ty;
			hz = culler.tz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			z = (mi*hx+ mj*hy + mk*hz + ml)-pz;
			o = x*px + y*py + z*pz;
			hx = x>=0;
			hy = y>=0;
			hz = z>=0;
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y + (hz ? maxZ : minZ)*z <= o) { _setVis(false); return; }
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y + (hz ? minZ : maxZ)*z > o) culling &= ~8;
		}
		//if (culling == 0) { _setVis(true); return; }
		
		//bottom
		if (culling & 16) {  
			hx = culler.bx;
			hy = culler.by;
			hz = culler.bz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			z = (mi*hx+ mj*hy + mk*hz + ml)-pz;
			o = x*px + y*py + z*pz;
			hx = x>=0;
			hy = y>=0;
			hz = z>=0;
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y + (hz ? maxZ : minZ)*z <= o) { _setVis(false); return; }
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y + (hz ? minZ : maxZ)*z > o) culling &= ~16;
		}
		if (culling == 0) { _setVis(true); return; }
		
		
		
		// -- Check children
		if ( cull == 1 && !(culling & 1) ) return; // doesn't touch nearclip, and setting dont need to go through children
		
		if (cull == 3) { // it has it's own cullList, push to stack
			cullList = this.cullList;
		}
		
		var i;
		var len = children.length;
		for (i=0; i< len; i++) {
			children[i]._visit(culler, culling, cullList); // we assume all children in the list doesn't use a cull ==0 setting.
		}
		
	}
}
Obj3D.prototype.vis = true;
Obj3D.prototype.cull = 1;
Obj3D.prototype.next = null;
Obj3D.prototype.cullIndex = -1;
Obj3D.prototype.cullFrom = -1;
Obj3D.prototype.cullTo = -1;


// Immutable Plane3D geometry leaf information for culling and near-clip kd-splitting
function Plane3D(dom) {
	this.dom = dom;
	
	var mArr = user.getAttribute("data-mat").split(",");
	var pArr = user.getAttribute("data-pos").split(","); // this can actually be derived from matrix.
	
	var ma=parseFloat(mArr[0]),mb=parseFloat(mArr[1]),mc=parseFloat(mArr[2]),md=parseFloat(mArr[3]),me=parseFloat(mArr[4])
			,mf=parseFloat(mArr[5]),mg=parseFloat(mArr[6]),mh=parseFloat(mArr[7]),mi=parseFloat(mArr[8]),mj=parseFloat(mArr[9]),mk=parseFloat(mArr[10]),ml=parseFloat(mArr[11]);

	var width = dom.style.width;
	var height = dom.style.height;
	var bgImage = dom.style.backgroundImage;
	
	this.x = parseFloat(pArr[0]); // required for bounds checking
	this.y = parseFloat(pArr[1]);
	this.z = parseFloat(pArr[2]);
	this.width = width;
	this.height =height;
	
	mArr = null;
	pArr= null;
	
	this.st = "";

	
	// Recursive methods below are done for convenience atm, not for performance
	
	function method2(culling, minX, minY, maxX, maxY, me) {  // BRUTE FORCE HALF SPLITS
		var side = maxX - minX;
		var side2 = maxY - minY;
		var h;
		var c;
		// TODO: include vendor prefix!
		
		if (side2 > side) {  // split along y
			side = side2;
			if (side <= 32) return;  // TODO: factor in abs scale for this metric!
			h  = maxY + (maxY - minY) * .5;  
			c = getCulling(culling, minX, minY, maxX, h);
			if (c & 1) method2(c, minX, minY, maxX, h)
			else { me.st+= '<div class="plane" style="-webkit-translate3d('+minX+'px,'+minY+'px);width:'+(maxX-minX)+'px;height:'+(h-minY)+'px;"></div>'; }  // leaf
			c = getCulling(culling, minX, h, maxX, maxY)
			if (c & 1) method2(c, minX, h, maxX, maxY);
			else { me.st+= '<div class="plane" style="-webkit-translate3d('+minX+'px,'+h+'px);width:'+(maxX-minX)+'px;height:'+(maxY-h)+'px;"></div>'; }  // leaf
		}
		else {   // split along x
			if (side <= 32) return;  // TODO: factor in abs scale for this metric!
			h =  minX + (maxX - minX) * .5;
			c = getCulling(culling, minX, minY, h, maxY);
			if (c & 1) method2(c, minX, minY, h, maxY)
			else { me.st+= '<div class="plane" style="-webkit-translate3d('+minX+'px,'+minY+'px);width:'+(h-minX)+'px;height:'+(maxY-minY)+'px;"></div>'; } // leaf
			c = getCulling(culling, h, minY, maxX, maxY)
			if (c & 1) method2(c, h, minY, maxX, maxY);
			else { me.st+= '<div class="plane" style="-webkit-translate3d('+h+'px,'+minY+'px);width:'+(maxX-h)+'px;height:'+(maxY-minY)+'px;"></div>'; } // leaf
		}
	}
	

	function hide() {
		dom.style.display = "none";
	}
	
	//var _splitted = false;
	
	function hideSplits() {
		dom.style.display = "block";
		//if (!_splitted) return;
		
		dom.innerHTML = "";
		
		dom.style.width = width;
		dom.style.height = height;
		dom.style.backgroundImage = bgImage;
			
		
		//_splitted = false;
	}
	
	function showSplits() {
		dom.style.display = "block";
		//if (!_splitted) return;
		
		dom.style.width = "auto";
		dom.style.height = "auto";
		dom.style.backgroundImage = "none";
		
		//_splitted = true;	
	}
	
	
	
	function getCulling(culling, minX, minY, maxX, maxY) {
		
		
		// Assume (culling & 1) is true
			var x;
			var y;
			var z;
			var o;
			var minX = 0;
			var minY = 0;
			var maxX = width;
			var maxY = height;
			
			var hx;
			var hy;
			var hz;
			
			x = culler.px;
			y = culler.py;
			z = culler.pz;
			var px = ma*x+ mb*y + mc*z + md;
			var py = me*x+ mf*y + mg*z + mh;
			
			hx = culler.nx;
			hy = culler.ny;
			hz = culler.nz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { return 0; }  // plane lies completely behind nearclip plane, not visible at all, can early exit
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) {  return 0; } // face doesn't touch nearclip plane but lies completely within it, can early exit
		
		if (culling & 2) {
			hx = culler.lx;
			hy = culler.ly;
			hz = culler.lz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { return 0; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) { culling &= ~2; } 
		}
		if (culling & 4) {
			hx = culler.rx;
			hy = culler.ry;
			hz = culler.rz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { return 0; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) {  culling &= ~4;  } 
		}
		if (culling & 8) {
			hx = culler.tx;
			hy = culler.ty;
			hz = culler.tz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { return 0; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) {  culling &= ~8; } 
		}
		if (culling & 16) {
			hx = culler.bx;
			hy = culler.by;
			hz = culler.bz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { return 0; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) { culling &= ~16; } 
		}
		
		return culling;
	}
	
	this._visit = function(culler, culling, cullList) {
		// TODO: add support for backface culling!
		
		
		// -- Get culling info
		// get nearclip plane in local coordinate (2d) space
		if (culling & 1) {
			var x;
			var y;
			var z;
			var o;
			var minX = 0;
			var minY = 0;
			var maxX = width;
			var maxY = height;
			
			var hx;
			var hy;
			var hz;
			
			x = culler.px;
			y = culler.py;
			z = culler.pz;
			var px = ma*x+ mb*y + mc*z + md;
			var py = me*x+ mf*y + mg*z + mh;
			
			hx = culler.nx;
			hy = culler.ny;
			hz = culler.nz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; // find dot product of determining min/max bound box corner against plane normal, to determine if plane intersects bounding box.
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { hide(); return; }  // plane lies completely behind nearclip plane, not visible at all, can early exit
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) { hideSplits();  return; } // face doesn't touch nearclip plane but lies completely within it, can early exit
		}
		else return;
		
		// get supplementary culling planes in local coordinate (2d) space, do further tests based on additional supplementary planes
		if (culling & 2) {
			hx = culler.lx;
			hy = culler.ly;
			hz = culler.lz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { hide(); return; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) { culling &= ~2; } 
		}
		if (culling & 4) {
			hx = culler.rx;
			hy = culler.ry;
			hz = culler.rz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { hide(); return; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) {  culling &= ~4;  } 
		}
		if (culling & 8) {
			hx = culler.tx;
			hy = culler.ty;
			hz = culler.tz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { hide(); return; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) {  culling &= ~8; } 
		}
		if (culling & 16) {
			hx = culler.bx;
			hy = culler.by;
			hz = culler.bz;
			x = (ma*hx+ mb*hy + mc*hz + md)-px;
			y = (me*hx+ mf*hy + mg*hz + mh)-py;
			o = x*px + y*py;
			hx = x>=0;
			hy = y>=0; 
			if ( (hx ? maxX : minX )*x + (hy ? maxY : minY)*y  <= o) { hide(); return; } 
			if ( (hx ? minX : maxX )*x + (hy ? minY : maxY)*y  > o) { culling &= ~16; } 
		}
		
		showSplits();
		
		
		this.st = "";

		// start splitting plane into sub-planes to avoid intersection
		/* set vis to false */
		
		// For each piece,
		
		// METHOD #1: The smart kd-edge split approach
		// split = null
		// to find  closest edge to midpoint intersection ratio:
		//  test along both x direction edges  (only if x edge length is large enough, ie.width. > min edge length)
		// test along both y direction edges  (only if y edge length is large enough.,ie.height > min edge length)
		// if got split...
		   //   but ratio is too far middle,  force-split along mid-point across longer dimension (x/y) instead. (note: use min edge length from corner, as a determining factor rather than a ratio. ie. dist from corner >= min edge length)
	     	// define positive and negative, recurse positive, recurse negative,  (optional: split piece bound check before recursing in,)
		
		
		// METHOD #2: The brute force kd half-split approach
		// Test if piece bounds intersects plane, if so, simply force-split by half along longer dimension (x/y).
		// recurse positive/negative split (repeating the above process) so long as longer dimension is <= min edge length.
		method2(culling, minX, minX, maxX, maxY, this);
		
		dom.innerHTML = this.st;
		
	}
}


/* Plane  (to be depreciated)
-------------------------------------------------- */

function Plane( colour, w,h,x,y,z,rx,ry,rz) {
	this.node = document.createElement("div")
	this.node.className="plane"
	this.colour = colour
	this.width = w;
	this.height = h;
	this.position = new Triplet(x, y, z);
	this.rotation = new Triplet(rx, ry, rz);
	this.update();
}

Plane.prototype = {
	update: function() {
		this.node.style.cssText += 
			"width:" + this.width + "px;" +
			"height:" + this.height + "px;" +
			CssUtils.texture(this.colour, this.rotation.x, this.rotation.y, this.rotation.z) +
			CssUtils.translate( this.position.x, this.position.y, this.position.z, this.rotation.x, this.rotation.y, this.rotation.z)
	}
}

/* World 
-------------------------------------------------- */

function World( viewport, worldNode ) {
	if (worldNode == undefined) {
		worldNode = document.createElement("div");
		worldNode.className = "world"
		viewport.node.appendChild(worldNode)
	}
	viewport.camera.world = this;
	this.node = worldNode;
}

World.prototype = {
	addPlane: function( plane ) { 
		this.node.appendChild(plane.node)
	}
}

/* Viewport
-------------------------------------------------- */

function Viewport( parentNode, node ) {

	if (node == undefined) {
		this.node = document.createElement("div");
	}
	else this.node = node;
	
	if (parentNode != undefined) {	
		this.node.className = "viewport";
		parentNode.appendChild(this.node)
	}
	this.camera = new Camera();
	
}