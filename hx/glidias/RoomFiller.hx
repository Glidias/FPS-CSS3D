package glidias;
	import glidias.TypeDefs;
	import js.Dom;
	import js.Lib;

	/**
	 * Haxe port of http://wonderfl.net/c/57nZ . Useful to create random aabb dungoen rooms to fill up any given aabb space.
		 Provides optimized room-by-room/doorway information to facilitiate optimized 2d/3d environments and faster room-to-room pathfinding.
	 */
    class RoomFiller
    {
        // Size
         static inline var COLS:Int = 80;
         static inline var  ROWS:Int = 80;
        // Types
         static inline var  DIRT:Int = 0;
         static inline var  WALL:Int = 1;
         static inline var  DOOR:Int = 2;
		 static inline var  CORRIDOOR:Int = 3;
		 static inline var  FLOOR:Int = 4;  
		 
		 
		 // anything higher or equal to the above FLOOR value indicates a FLOOR type value. Higher FLOOR values can be used to indicates different levels/sectors
		 
		 
        // Consts
        static inline var  FEATURES:Int = 50;
        static inline var  NEW_FEATURE_TRIES:Int = 200;

        static inline var  MIN_CORRIDOR:Int = 10;
        static inline var  MAX_CORRIDOR:Int = 20;

        static inline var  MIN_ROOM:Int = 6;
        static inline var  MAX_ROOM:Int = 14;

        // Dungeon container
        public var grid:Array<Array<Int>>;
		public var doors:Array<Int4>;
		public var rooms:Array<Rectangle>;
		
        private var random:PM_PRNG;
        private var roomInterv:Int;
        private var currFeature:Int;

       // private var screen:BitmapData;
        private var drawTile:Rectangle;
		public var wallColor:String;
		public var enableOutdoors:Bool;
		
		public var doorHeight:Float;
		


		private var async:Int;
		
        public function new(async:Int=0)
        {
			wallColor = "#3d3c37";
			enableOutdoors = true;
			
			doorHeight = 13;
			
			this.async = async;
			roomInterv = -1;
			drawTile = new Rectangle( 0, 0, 10, 10 );
            grid = new Array<Array<Int>>();
			doors = new Array<Int4>();
			rooms = new Array<Rectangle>();
            for ( i in 0...COLS)
            {
                grid[ i ] = new Array<Int>();
                for ( j in 0...ROWS )
                    grid[ i ][ j ] = DIRT;
            }

            random = new PM_PRNG( 12345 );

           // screen = new BitmapData( 400, 400, false, 0x000000 );
            //addChild( new Bitmap( screen ));

           
        }
		
		private var _onComplete:Dynamic;
		
		public function run(onComplete:Dynamic=null):Void {
			_onComplete = onComplete;
			 trace("RUNNING...");
			 
			 createFirstRoom();

          
			  if (this.async == 0) {
				  // do nothing
			  }
			  else {  // todo: asynchrounous update of room state
				   //stage.addEventListener( Event.ENTER_FRAME, update );
			  }
			  
			 
		}
		
		
		/**
		 * Javascript method to generate CSSPlanes definitnation from sector map
		 * @param	map
		 */
		public function getHTMLFromSectors(map:Array<AABBSector>, gridSize:Float, wallMat:String, floorMat:String = null, ceilingMat:String = null):String {
			if (floorMat == null) floorMat = wallMat;
			if (ceilingMat == null) ceilingMat = floorMat;
			
			// go through all sectors
			
			// For each sector:
			// create sector node
			// for all portal walls...AABBPortalPlane.getHTML(sector.rect, gridSize) , flag out direction
			// for all remaining walls with direction, AABBSector.getWallHTML(dir,mat).  Finally,  AABBSector.getCeilingHTML(mat), getFloorHTML(mat)
			// add all collected walls to sector node
			
			return null;
		}
		
		
		/**
		 * Get list of sectors and their interconnected portals. 
		 * Also attempts to drill through walls to the next sector if the door opens towards a dead-end wall, effectively 
		 * increasing the length of a corridoor. 
		 * @param	gridSize
		 * @param	minRoomHeight
		 * @param	possibleRoomHeightAdd
		 * @param	groundPos
		 * @return
		 */
		public function getSectors(gridSize:Float, minRoomHeight:Float, possibleRoomHeightAdd:Float=0, groundPos:Float=0):Array<AABBSector> {
			var map:Array<AABBSector> = new Array<AABBSector>();
			var wallMask:Int; 
			var len:Int;
			var door:Int4;
			var doorType:Int;
			var sector:AABBSector;
			var rect:Rectangle;
			var portal:AABBPortal;
			var portalPlane:AABBPortalPlane;
			
			len = rooms.length;
			for (i in 0...len) {
				rect = rooms[i];
				var uLen = Std.int(rect.width);
				var vLen = Std.int(rect.height);
				var invalid:Bool = false;
				for (u in Std.int(rect.x)...uLen) {
					for (v in Std.int(rect.y)...vLen) {
						if (grid[u][v] < FLOOR) {
							trace("NOn floor detected over room!  " + i);
							invalid = true;
							break;
						}
						
					}
					if (invalid) break;
					
				}
				sector = new AABBSector();
				sector.setup(rect, gridSize, minRoomHeight + Math.round(Math.random() * possibleRoomHeightAdd), 0);
				map.push( sector );
			}
			
			len = doors.length;
			var target:Int;
			var direction:Int;
			var d:Int;
			var c:Int;
			var exit:Bool = false;
			//var gotCoridoor:Bool;
			for (i in 0...len) {
				door = doors[i];
				
				doorType = getDoorType(door);
				if (doorType >= FLOOR) { // indoors!
					target = getSectorIndexAt(door.x - door.z, door.y - door.w);  // get key target sector index of corridoor
					trace("indoors!"+ [door.x,door.y]+" : "+[door.z, door.w]);
				}
				else if (doorType == DIRT) { // outdoors!
					target = -1;
					if (!enableOutdoors) continue;
					trace("Outdoors!");
					
					//continue;   // allow possibility for outdoor
				}
				else if (doorType == WALL) {
					//trace("Could not resolve door type. Need to drill deeper:" + doorType + ":" + [door.x, door.y] + ": " + [door.z, door.w]);
					//continue;
					
					grid[door.x][door.y] = CORRIDOOR;
					if (AABBPortalPlane.isDoorHorizontal(door)) {
						d = AABBPortalPlane.norm(door.z);
						///*
						door.z += d;
						door.x -= d;
						while (true) {
							c = door.x - d;
							
							exit = c < 0 || c >= COLS;
							if (exit) break;
							if ( grid[c-d][door.y] >= FLOOR) {
								// form new door position
								
								grid[door.x][door.y] = DOOR;
								break;
							}
							
							door.z += d;
							door.x = c;
							grid[c][door.y] = CORRIDOOR;
							
							d++;
						}
						if (exit) continue;
						//*/
					}
					else {
						///*
						d = AABBPortalPlane.norm(door.w);
						door.w += d;
						door.y -= d;
						
						while (true) {
							c = door.y - d;
							
							exit = c < 0 || c >= ROWS;
							if (exit) break;
							if ( grid[door.x][c-d] >= FLOOR) {
								// form new door
								grid[door.x][door.y] = DOOR;
								break;
							}
							door.w += d;
							door.y = c;
							grid[door.x][c] = CORRIDOOR;
							
							d++;
						}
						if (exit) continue;
						//*/
					}
					target = !exit ? getSectorIndexAt(door.x - door.z, door.y - door.w) : -1;   // get key target sector index of corridoor
					//continue;  // comment when done. to trace only
				}
				else {
					trace("Could not resolve door type. " + doorType + ". " + [door.x, door.y] + ": " + [door.z, door.w]);
					continue;
				}
				
				// create corridoor sector
				sector = new AABBSector();
				 // optional fix for outdoor corridoor to test later... shrink coridoor so it does't protrude out of building
				/*
				 if (target < 0) { 
					grid[door.x][door.y] = DIRT;
					
					door.x += AABBPortalPlane.norm(door.z);
					door.y += AABBPortalPlane.norm(door.w);
					door.z = 0;// AABBPortalPlane.norm(door.z);
					door.w = 0;// AABBPortalPlane.norm(door.w);
					grid[door.x][door.y] = DOOR;
					
				}
				*/
				var tarOffset = target >= 0 ? 2 : 1; // somehow outdoor target < 0 start position settings seem different..
				rect = new Rectangle(door.x - (door.z < 0 ? tarOffset : 0), door.y - (door.w < 0 ? tarOffset : 0), door.z != 0 ? abs(door.z)+1 : 1, door.w != 0 ? abs(door.w)+1: 1 );		
	
				sector.setup(rect, gridSize, gridSize, groundPos);
				map.push(sector);
				
				
				// create portal that faces target 
				portal = new AABBPortal();
				portal.id = "c_s"; 
				direction = portal.setup((target >= 0 ? map[target] : null ), door, gridSize, gridSize, doorHeight, groundPos);
				sector.addPortal(portal, direction);
				
				
				direction = AABBPortalPlane.getReverse(direction);  // flip direction
				var p;
				// create portal from target to corridoor in revesesed direction
				if (target >= 0) {
					p = portal.getReverse(sector, direction);
					p.id  = "s_c";
					map[target].addPortal( p, direction );
				}
			
				
				
				// craete portal on other side of coridoor (ie. towards opposite sector at other side).
				target = getSectorIndexAt( door.x + door.z + AABBPortalPlane.norm(door.z), door.y + door.w + AABBPortalPlane.norm(door.w) );
				if (target < 0) {
					 trace("Dead end.");  // next time, can consider not having dead ends but finding curve path to nearest sector
					continue;
				}
				
				
				portal =  new AABBPortal();
				portal.id  = "c_s2";
				portal.setup(map[target], new Int4(door.x + door.z, door.y + door.w, -door.z, -door.w), gridSize, gridSize, doorHeight, groundPos); 
				sector.addPortal(portal, direction);
				
		
				//direction = AABBPortalPlane.getReverse(direction);   // flip direction
				
				//  create portal from opposite sector to corridoor in reversed direction
				p = portal.getReverse(sector, direction, true);
				p.id = "s_c2";
				map[target].addPortal(p, direction );
				
			}
			
			return map;
		}
		
		
		
		/**
		 * Gets sector index at tile coordinate (assumed valid in range)
		 * @param	tx
		 * @param	ty
		 * @return	Negative values indicate non-sectors.
		 */
		public inline function getSectorIndexAt(tx:Int, ty:Int):Int {
			if (tx < 0 || tx >= COLS || ty < 0 || ty >= ROWS) {
				trace("out of bound getSectorIndexAt");
			}

			return grid[tx][ty] - FLOOR;
		}
		
		
		
		private inline function abs(w:Int):Float
		{
			return w < 0 ? -w : w;
		}
		
		
		
		/**
		 * Useful to check if corridoor is facing outdoors(dirt) or facing another room(floor) or facing a wall!
		 * @param	door
		 * @return	The door type
		 */
		public function getDoorType(door:Int4):Int {
			var xer:Int = door.x - door.z;
			if (xer < 0 || xer >= COLS) return DIRT;
			var yer:Int = door.y - door.w;
			if (yer < 0 || yer >= ROWS) return DIRT;
			return grid[xer][yer];
		}



        private function testUpdate(callbacker:Dynamic, gridSize:Float=5 ):Void
        {
           // screen.lock();
          //  screen.fillRect( screen.rect, 0x000000 );
		 
		  drawTile.width = gridSize;
		  drawTile.height = gridSize;
            // Draw tiles            
            for ( i in 0...COLS )
            {
				
                for (j in 0...ROWS )
                {
                    drawTile.x = i * gridSize;
                    drawTile.y = j * gridSize;
                    switch ( grid[ i ][ j ])
                    {
                        case DIRT:
						  callbacker( drawTile.toHTML("background-color:#000000") );             
                        case WALL:
							 callbacker( drawTile.toHTML("background-color:"+wallColor) );
                        case DOOR:
						    callbacker( drawTile.toHTML("background-color:#FF0000") );
                          case CORRIDOOR:
							  	callbacker( drawTile.toHTML("background-color:#733F12") );
						default:   // ASSUMED FLOOR!
							// check assumption
							//if (grid[ i ][ j ] < FLOOR) trace("Default FLOOR assumption failed!");
							callbacker( drawTile.toHTML("background-color:#CCCCCC") );
							
                    }
                }
            }
			
			var i:Int = 0;
			while ( i < COLS)
            {
				 drawTile.x = i * gridSize;
                    drawTile.y =  0;
					  	callbacker( drawTile.toHTML("background-color:#FFFF00") );
						
						i += 10;
			}
			i = 0;
			while ( i < ROWS)
            {
				 drawTile.x = 0;
                   drawTile.y = i * gridSize;
					callbacker( drawTile.toHTML("background-color:#FFFF00") );
					
					i += 10;
					
			}
			
           // screen.unlock();
        }
		
		private inline function floor(val:Float):Int {
			return Math.floor(val);
		}


        private function createFirstRoom():Void
        {
            var fw:Int = random.nextIntRange( 6, 12 );
            var fh:Int = random.nextIntRange( 6, 12 );

            createRoom( floor( ( COLS * .5 ) - ( fw * .5 ) ), floor(( ROWS * .5 ) - ( fh * .5 )), fw, fh );

            currFeature = FEATURES;
			
            
		    if (async == 0) {
			  while ( createFeature() ) { };
			  if (_onComplete) {
				  _onComplete();
				  return;
			  }
			}
			else {  
				roomInterv = setInterval( createFeature, async );
			}   
			
        }
		
		private inline function clearInterval(ier:Int):Void {
			
		}
		private inline function setInterval(target:Dynamic, timeMs:Int):Int {
			return 0;
		}

        private function createFeature():Bool
        {
			//trace( currFeature );
            if ( currFeature-- == 0 )
            {
               if (roomInterv != -1) clearInterval( roomInterv );
			   trace("Done.");
			   
                return false;
            }

            var i:Int, j:Int;
            var giveUp:UInt = 0;
            var tx:Int = -1;
            var ty:Int = -1;
            var tt:Int, tb:Int, tl:Int, tr:Int;
            var dir:Int = -1;
            do
            {
                i = random.nextIntRange( 2, COLS - 2 );
                j = random.nextIntRange( 2, ROWS - 2 );

              //  trace( i, j );
                if ( grid[ i ][ j ] == WALL )
                {
                    tt = grid[ i ][ j - 1 ];
                    tb = grid[ i ][ j + 1 ];
                    tl = grid[ i - 1 ][ j ];
                    tr = grid[ i + 1 ][ j ];
                    if ( tt == DIRT && ( tl == WALL && tr == WALL ))
                    {
                        tx = i;
                        ty = j - 1;
                        dir = 0;
                    }
                    else if ( tb == DIRT && ( tl == WALL && tr == WALL ))
                    {
                        tx = i;
                        ty = j + 1;
                        dir = 1;
                    }
                    else if ( tl == DIRT && ( tt == WALL && tb == WALL ))
                    {
                        tx = i - 1;
                        ty = j;
                        dir = 2;
                    }
                    else if ( tr == DIRT && ( tt == WALL && tb == WALL ))
                    {
                        tx = i + 1;
                        ty = j;
                        dir = 3;
                    }

                }
            } while ( dir == -1 && giveUp++ < NEW_FEATURE_TRIES );

            if ( dir != -1 )
            {
                do
                {
                    var w:Int, h:Int;
                    var sx:Int, sy:Int;
                    var feature:Float = Math.random();
                    // Two features for now
                    if ( feature < .3 )
                    {
                        // Corridor
                        {
                            if ( dir == 0 || dir == 1 )
                            {
                                sx = tx - 1;
                                w = 3;
                                h = random.nextIntRange( MIN_CORRIDOR, MAX_CORRIDOR );
                                if ( dir == 0 )
                                {
                                    // Up
                                    sy = ty - h;
                                    if ( sy < 1 )
                                        continue;
                                }
                                else
                                {
                                    // Down
                                    sy = ty + 1;
                                    if ( ty + h > ROWS - 1 )
                                        continue;
                                }
                            }
                            else
                            {
                                sy = ty - 1;
                                w = random.nextIntRange( MIN_CORRIDOR, MAX_CORRIDOR );
                                h = 3;
                                if ( dir == 2 )
                                {
                                    // Left
                                    sx = tx - w;
                                    if ( sx < 1 )
                                        continue;
                                }
                                else
                                {
                                    // Right
                                    sx = tx + 1;
                                    if ( tx + w > ROWS - 1 )
                                        continue;
                                }
                            }
                        }
                    }
                    else
                    {
                        // Room
                        {
                            if ( dir == 0 || dir == 1 )
                            {
                                w = random.nextIntRange( MIN_ROOM, MAX_ROOM );
                                h = random.nextIntRange( MIN_ROOM, MAX_ROOM );

                                sx = tx - floor( w * .5 );
                                if ( sx < 1 || ( sx + w ) > COLS - 1 )
                                    continue;

                                if ( dir == 0 )
                                {
                                    // Up
                                    sy = ty - h;
                                    if ( sy < 1 )
                                        continue;
                                }
                                else
                                {
                                    // Down
                                    sy = ty + 1;
                                    if ( ty + h > ROWS - 1 )
                                        continue;
                                }
                            }
                            else
                            {
                                w = random.nextIntRange( MIN_ROOM, MAX_ROOM );
                                h = random.nextIntRange( MIN_ROOM, MAX_ROOM );

                                sy = ty - floor( h * .5 );
                                if ( sy < 1 || ( sy + h ) > ROWS - 1 )
                                    return true;

                                if ( dir == 2 )
                                {
                                    // Left
                                    sx = tx - w;
                                    if ( sx < 1 )
                                        continue;
                                }
                                else
                                {
                                    // Right
                                    sx = tx + 1;
                                    if ( tx + w > ROWS - 1 )
                                        continue;
                                }
                            }
                        }
                    }

                    // Check Bounds
                    if ( sx < 1 )
                        sx = 2;
                    if ( sx + w > COLS - 2 )
                        w = sx - COLS - 2;
                    if ( sy < 1 )
                        sy = 1;
                    if ( sy + h > ROWS - 2 )
                        h = sy - ROWS - 2;
                    
                    // Attempt to create
                    if ( createRoom( sx, sy, w, h ))
                    {
                        grid[ tx ][ ty ] = DOOR;
						
						// for doors, values z and w indicate direction towards coridoor from door position x,y 
                        switch(dir)
                        {
                            case 0:
                                grid[tx][ty + 1] = CORRIDOOR;
								doors.push( new Int4(tx, ty, 0, 1) );  // south
                              
                            case 1:
                                grid[tx][ty - 1] = CORRIDOOR;
								doors.push( new Int4(tx, ty, 0, -1) );  // north
                              
                            case 2:
                                grid[tx + 1][ty] = CORRIDOOR;
								doors.push( new Int4(tx, ty, 1, 0) );  // east
                               
                            case 3:
                                grid[tx - 1][ty] = CORRIDOOR;
								doors.push( new Int4(tx, ty, -1, 0) ); //west
                                
                        }
                        break;
                    }
                } while ( giveUp++ < NEW_FEATURE_TRIES );
            }
			return true;
        }

        private function createRoom( s:Int, e:Int, w:Int, h:Int ):Bool
        {
            w += s;
            h += e;
			var roomLen:Int = rooms.length;
            if ( checkArea( s, e, w, h ) && (s != w && e != h))
            {
                for ( i in s...(w+1) )
                {
                    for ( j in e...(h+1) )
                    {
						if ( grid[ i ][ j ] == CORRIDOOR) trace("Covered corridoor exception!");
                        if ( i == s || i == w || j == e || j == h )
                            grid[ i ][ j ] = WALL;
                        else
                            grid[ i ][ j ] = FLOOR + roomLen;
                    }
                }
				
				w = w - s - 1;
				h = h - e - 1;
				if (w < 1 || h < 1) return true; // important fix! somehow there's zero length rect
				rooms.push( new Rectangle(s+1, e+1,w, h) );
                return true;
            }

            return false;
        }

        private function checkArea( s:Int, e:Int, w:Int, h:Int ):Bool
        {
            for ( i in s...(w+1) )
            {
                for ( j in e...(h+1) )
                {
                    if ( grid[ i ][ j ] != DIRT )
                        return false;
                }
            }
            return true;
        }
		

		
    }






