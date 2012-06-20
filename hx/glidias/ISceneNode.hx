package glidias;

/**
 * ...
 * @author Glenn Ko
 */

interface ISceneNode 
{
	function visit(visitor:Dynamic, time:Int):Bool;
}