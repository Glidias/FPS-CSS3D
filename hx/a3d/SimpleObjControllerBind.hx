package a3d;
import glidias.input.KeyCode;
import glidias.input.KeyPoll;

/**
 * // TODO:
 * @author Glenn Ko
 */

class SimpleObjControllerBind 
{
	private var keyPoller:KeyPoll;
	private var controller:SimpleObjectController;
	
	public function new(keyPoller:KeyPoll, controller:SimpleObjectController) 
	{
		this.keyPoller = keyPoller;
		this.controller = controller;
	}
	
	public function update(dt:Int):Void {
		controller.moveUp( keyPoller.isDown(KeyCode.W) );
		controller.moveDown( keyPoller.isDown(KeyCode.S) );
		controller.moveLeft( keyPoller.isDown(KeyCode.A) );
		controller.moveRight( keyPoller.isDown(KeyCode.D) );
		controller.moveRight( keyPoller.isDown(KeyCode.D) );
		
	}
	
}