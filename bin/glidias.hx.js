$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof js=='undefined') js = {}
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
if(typeof glidias=='undefined') glidias = {}
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
glidias.Rectangle.prototype.__class__ = glidias.Rectangle;
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
glidias.RoomFiller = function(async) { if( async === $_ ) return; {
	if(async == null) async = 0;
	this.async = async;
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
	this.createFirstRoom();
	if(async == 0) null;
	else null;
}}
glidias.RoomFiller.__name__ = ["glidias","RoomFiller"];
glidias.RoomFiller.prototype.grid = null;
glidias.RoomFiller.prototype.doors = null;
glidias.RoomFiller.prototype.rooms = null;
glidias.RoomFiller.prototype.random = null;
glidias.RoomFiller.prototype.roomInterv = null;
glidias.RoomFiller.prototype.currFeature = null;
glidias.RoomFiller.prototype.drawTile = null;
glidias.RoomFiller.prototype.async = null;
glidias.RoomFiller.prototype.getDoorType = function(door) {
	var xer = door.x * -door.z;
	if(xer < 0 || xer >= 80) return 0;
	var yer = door.y * -door.w;
	if(yer < 0 || yer >= 80) return 0;
	return this.grid[xer][yer];
}
glidias.RoomFiller.prototype.update = function() {
	var _g = 0;
	while(_g < 80) {
		var i = _g++;
		{
			var _g1 = 0;
			try {
				while(_g1 < 80) {
					var j = _g1++;
					this.drawTile.x = i * 5;
					this.drawTile.y = j * 5;
					switch(this.grid[i][j]) {
					case 0:{
						throw "__break__";
					}break;
					case 1:{
						throw "__break__";
					}break;
					case 2:{
						throw "__break__";
					}break;
					case 3:{
						throw "__break__";
					}break;
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
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
		null;
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
		haxe.Log.trace(i,{ fileName : "RoomFiller.hx", lineNumber : 166, className : "glidias.RoomFiller", methodName : "createFeature", customParams : [j]});
		if(this.grid[i][j] == 2) {
			tt = this.grid[i][j - 1];
			tb = this.grid[i][j + 1];
			tl = this.grid[i - 1][j];
			tr = this.grid[i + 1][j];
			if(tt == 0 && (tl == 2 && tr == 2)) {
				tx = i;
				ty = j - 1;
				dir = 0;
			}
			else if(tb == 0 && (tl == 2 && tr == 2)) {
				tx = i;
				ty = j + 1;
				dir = 1;
			}
			else if(tl == 0 && (tt == 2 && tb == 2)) {
				tx = i - 1;
				ty = j;
				dir = 2;
			}
			else if(tr == 0 && (tt == 2 && tb == 2)) {
				tx = i + 1;
				ty = j;
				dir = 3;
			}
		}
	} while(dir == -1 && giveUp++ < 200);
	if(dir != -1) {
		try {
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
					this.grid[tx][ty] = 3;
					switch(dir) {
					case 0:{
						this.grid[tx][ty + 1] = 1;
						this.doors.push(new glidias.Int4(tx,ty,0,1));
						throw "__break__";
					}break;
					case 1:{
						this.grid[tx][ty - 1] = 1;
						this.doors.push(new glidias.Int4(tx,ty,0,-1));
						throw "__break__";
					}break;
					case 2:{
						this.grid[tx + 1][ty] = 1;
						this.doors.push(new glidias.Int4(tx,ty,1,0));
						throw "__break__";
					}break;
					case 3:{
						this.grid[tx - 1][ty] = 1;
						this.doors.push(new glidias.Int4(tx,ty,-1,0));
						throw "__break__";
					}break;
					}
					throw "__break__";
				}
			} while(giveUp++ < 200);
		} catch( e ) { if( e != "__break__" ) throw e; }
	}
	return true;
}
glidias.RoomFiller.prototype.createRoom = function(s,e,w,h) {
	w += s;
	h += e;
	if(this.checkArea(s,e,w,h) && (s != w && e != h)) {
		{
			var _g1 = s, _g = w + 1;
			while(_g1 < _g) {
				var i = _g1++;
				{
					var _g3 = e, _g2 = h + 1;
					while(_g3 < _g2) {
						var j = _g3++;
						if(i == s || i == w || j == e || j == h) this.grid[i][j] = 2;
						else this.grid[i][j] = 1;
					}
				}
			}
		}
		this.rooms.push(new glidias.Rectangle(s,e,w + 1,h + 1));
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
glidias.Package = function() { }
glidias.Package.__name__ = ["glidias","Package"];
glidias.Package.main = function() {
	null;
}
glidias.Package.prototype.__class__ = glidias.Package;
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
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
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
js.Lib.onerror = null;
glidias.RoomFiller.COLS = 80;
glidias.RoomFiller.ROWS = 80;
glidias.RoomFiller.DIRT = 0;
glidias.RoomFiller.FLOOR = 1;
glidias.RoomFiller.WALL = 2;
glidias.RoomFiller.DOOR = 3;
glidias.RoomFiller.FEATURES = 50;
glidias.RoomFiller.NEW_FEATURE_TRIES = 200;
glidias.RoomFiller.MIN_CORRIDOR = 10;
glidias.RoomFiller.MAX_CORRIDOR = 20;
glidias.RoomFiller.MIN_ROOM = 6;
glidias.RoomFiller.MAX_ROOM = 14;
glidias.Package.main()