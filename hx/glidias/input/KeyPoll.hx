/*
 * Author: Richard Lord
 * Copyright (c) Big Room Ventures Ltd. 2007
 * Version: 1.0.2
 * 
 * Licence Agreement
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package glidias.input;
	#if (usePolygonal || usePolygonalKey)
	import de.polygonal.ds.mem.ByteMemory;
	import js.Dom;
	#end	

	#if (flash9 || flash10) 
	import flash.events.IEventDispatcher;
	import flash.events.KeyboardEvent;
	import flash.events.Event;
	import flash.utils.ByteArray;
	#else  // js
	import glidias.TypeDefs;
	import haxe.io.Bytes;
	import js.Dom;
	import js.Lib;
		#if (jQuery)
		import jQuery.JQuery;
		#end
	#end
	
	
	/**
	 * <p>Games often need to get the current state of various keys in order to respond to user input. 
	 * This is not the same as responding to key down and key up events, but is rather a case of discovering 
	 * if a particular key is currently pressed.</p>
	 * 
	 * <p>In Actionscript 2 this was a simple matter of calling Key.isDown() with the appropriate key code. 
	 * But in Actionscript 3 Key.isDown no longer exists and the only intrinsic way to react to the keyboard 
	 * is via the keyUp and keyDown events.</p>
	 * 
	 * <p>The KeyPoll class rectifies this. It has isDown and isUp methods, each taking a key code as a 
	 * parameter and returning a Boolean.</p>
	 */
	/**
	 * Integration with Polygonal DS (alchemy)
	 * @author Glenn
	 */
	class KeyPoll
	{
		#if (usePolygonal || usePolygonalKey)
		private var states:ByteMemory;
		#elseif (flash9 || flash10)
		private var states:ByteArray;
		private var dispObj:IEventDispatcher;

		#else
		private var states:Bytes;
			#if (jQuery) 
			private var jDoc:JQuery;
			#else
			private var jDoc:HtmlDom;
				
			#end
		#end
		
		
		
		/**
		 * Constructor
		 * 
		 * @param displayObj A display object on which to test listen for keyboard events. If null, to catch all key events use the stage.
		 */
		public function new( #if (flash9 || flash10) displayObj:IEventDispatcher #else displayObj:Dynamic=null #end )
		{
			#if (usePolygonal || usePolygonalKey)
			states = new ByteMemory(32, "KeyPoll");
			if (flash)
			states = new ByteArray();
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			states.writeUnsignedInt( 0 );
			#else
			states = Bytes.alloc(32);
				#if (jQuery)
				jDoc = new JQuery(displayObj != null ?  displayObj : Lib.document);
				#else
				jDoc = displayObj != null ? displayObj : Lib.document;
				#end
			#end
			
			#if (flash9 || flash10)
			dispObj = displayObj;
			dispObj.addEventListener( KeyboardEvent.KEY_DOWN, keyDownListener, false, 0, true );
			dispObj.addEventListener( KeyboardEvent.KEY_UP, keyUpListener, false, 0, true );
			dispObj.addEventListener( Event.ACTIVATE, clearListener, false, 0, true );
			dispObj.addEventListener( Event.DEACTIVATE, clearListener, false, 0, true );
			#else
			  #if (jQuery)
			  jDoc.keydown(keyDownListener);
			  jDoc.keyup(keyUpListener);
			  #else
			  jDoc.onkeydown = keyDownListener;
			   jDoc.onkeyup = keyUpListener;
			  #end
			#end
		}
		
		public function destroy():Void {
			#if (flash9 || flash10)
			dispObj.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownListener);
			dispObj.removeEventListener(KeyboardEvent.KEY_UP, keyUpListener);
			dispObj.removeEventListener( Event.ACTIVATE, clearListener );
			dispObj.removeEventListener( Event.DEACTIVATE, clearListener );
			#else
			  #if (jQuery)
			  jDoc.unbind("keydown",keyDownListener);
			  jDoc.unbind("keyup", keyUpListener);
			  #else
			   jDoc.onkeydown = null;
			   jDoc.onkeyup = null;
			  #end
			#end
			
			#if (usePolygonal || usePolygonalKey)
			states.free();
			#end
		}
		
		private function keyDownListener( #if (flash9 || flash10) ev:IEventDispatcher #else ev:Dynamic #end ):Void
		{
			#if (usePolygonal || usePolygonalKey)
		
			states.set(  (ev.keyCode >>> 3),  states.get(ev.keyCode >>> 3) | (1<<(ev.keyCode & 7))  );
			#elseif (flash9 || flash10)
			states[ ev.keyCode >>> 3 ] |= 1 << (ev.keyCode & 7);
			#else
			states.set(  (ev.keyCode >>> 3),  states.get(ev.keyCode >>> 3) | (1<<(ev.keyCode & 7))  );
			#end
		}
		
		private function keyUpListener( #if (flash9 || flash10) ev:IEventDispatcher #else ev:Dynamic #end ):Void
		{
			#if (usePolygonal || usePolygonalKey)
			states.set(  (ev.keyCode >>> 3),  states.get(ev.keyCode >>> 3) & (~(1<<(ev.keyCode & 7))) );
			#elseif (flash9 || flash10)
			states[ ev.keyCode >>> 3 ] &= ~(1 << (ev.keyCode & 7));
			#else
				#if (jQuery) 
					states.set(  (ev.which >>> 3),  states.get(ev.which >>> 3) & (~(1<<(ev.which & 7))) );
				#else
					states.set(  (ev.keyCode >>> 3),  states.get(ev.keyCode >>> 3) & (~(1<<(ev.keyCode & 7))) );
				#end
			#end
		}
		
		private function clearListener( #if (flash9 || flash10) ev:IEventDispatcher #else ev:Dynamic #end ):Void
		{
			#if (usePolygonal || usePolygonalKey)
			var i:Int = 0;
			while (++i < 8) {
				states.set(i, 0);
			}
			#elseif (flash9 || flash10)
			var i:Int = 0;
			while (++i < 8) {
				states[ i ] = 0;
			}
			#else
			var i:Int = 0;
			while (++i < 8) {
				states.set(i, 0);
			}
			#end
		}
		
		/**
		 * To test whether a key is down.
		 *
		 * @param keyCode code for the key to test.
		 *
		 * @return true if the key is down, false otherwise.
		 *
		 * @see isUp
		 */
		public inline function isDown( keyCode:UInt ):Bool
		{
			#if (usePolygonal || usePolygonalKey)
			return (states.get(keyCode >>> 3) & (1 << (keyCode & 7)) ) != 0;
			#elseif (flash9 || flash10)
			return ( states[ keyCode >>> 3 ] & (1 << (keyCode & 7)) ) != 0;
			#else
			return (states.get(keyCode >>> 3) & (1 << (keyCode & 7)) ) != 0;
			#end
		}
		
		/**
		 * To test whetrher a key is up.
		 *
		 * @param keyCode code for the key to test.
		 *
		 * @return true if the key is up, false otherwise.
		 *
		 * @see isDown
		 */
		public inline function isUp( keyCode:UInt ):Bool
		{
			#if (usePolygonal || usePolygonalKey)
			return (states.get(keyCode >>> 3) & (1 << (keyCode & 7)) ) == 0;
			#elseif (flash9 || flash10)
			return ( states[ keyCode >>> 3 ] & (1 << (keyCode & 7)) ) == 0;
			#else 
			return (states.get(keyCode >>> 3) & (1 << (keyCode & 7)) ) == 0;
			#end
		}
	
}