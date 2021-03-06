// forked from narutohyper's Alternativa3D 7.6 Template
package wonderfl
{
	import alternativa.engine3d.core.Face;
	import alternativa.engine3d.core.Object3D;
	import alternativa.engine3d.core.Object3DContainer;
	import alternativa.engine3d.core.Vertex;
	import alternativa.engine3d.core.Wrapper;
    import alternativa.engine3d.materials.FillMaterial;
	import alternativa.engine3d.materials.Material;
    import alternativa.engine3d.materials.TextureMaterial;
    import alternativa.engine3d.loaders.MaterialLoader;
	import alternativa.engine3d.objects.Mesh;
	import alternativa.engine3d.primitives.Box;
    import alternativa.engine3d.primitives.Plane;
    import alternativa.engine3d.primitives.GeoSphere;
    import alternativa.engine3d.objects.Sprite3D;
    import alternativa.engine3d.controllers.SimpleObjectController
    import flash.display.Sprite;
    import flash.display.Shape;
    import flash.display.BitmapData;
	import flash.geom.Matrix3D;
	import flash.geom.Vector3D;
    import flash.system.LoaderContext;
	import wonderfl.utils.A3DToCSSUtil;
	
    
	    import flash.events.Event;
    import flash.ui.Keyboard;
    
	
	import alternativa.engine3d.alternativa3d;
	use namespace alternativa3d;

    /**
     *
     * Alternativa3D 7.6
     *
     * RollCameraController
     * イージング（遅延減速）付き
     * 
     * @author narutohyper
     */
    [SWF(backgroundColor="#000000", frameRate="100", width="800", height="600")]
    public class DanboToCSSPlanes extends Sprite
    {
		
		
        
        public function DanboToCSSPlanes():void    {
            if (stage) init();
            else addEventListener(Event.ADDED_TO_STAGE, init);
        }
		
		private static const MAT:Material = new FillMaterial(0x00FF00, 1);
		private var textures:Textures;
	
		private var scene:AlternativaTemplate;
	
        
        private function init(e:Event=null):void {
            removeEventListener(Event.ADDED_TO_STAGE, init);
        
            //AlternativaTemplate作成
            scene = new AlternativaTemplate(this );

			textures = new Textures();
           
			
			textures.materialLoader.addEventListener(Event.COMPLETE, onMatLoadComplete);
      //      scene.container.addChild( newCSSPlane(150, 102, textures.txMatDanboFace) );

            
            
            scene.cameraController.object = null;
            
            var cameraController:RollCameraController = new RollCameraController(stage, scene.camera, 200);
            cameraController.mouseSensitivity = 0;
            cameraController.mouseSensitivityX = 1; 
            cameraController.mouseSensitivityY = 1; 
            cameraController.unbindAll();
            cameraController.accelerate(true);
            //Cameraの中心からの距離
            cameraController.length(700);
            cameraController.minLength = 200;
            
            //イージング設定
            //1～数値が高いほど、遅延大でぬるぬる
            cameraController.easingSeparator = 30;
            
            //Cameraの初期位置
            cameraController.posZ(500,true);
            cameraController.angle(0);
            
            //視点の調整
            //ただし回転するCameraなので、Z以外は、おかしくなる
            cameraController.lookAtPosition(0, 0, 10);
            cameraController.minZ = -1000;
            cameraController.maxZ = 1000;
            cameraController.bindKey(Keyboard.LEFT, SimpleObjectController.ACTION_YAW_LEFT);
            cameraController.bindKey(Keyboard.RIGHT,SimpleObjectController.ACTION_YAW_RIGHT);
            cameraController.bindKey(Keyboard.DOWN, SimpleObjectController.ACTION_PITCH_DOWN);
            cameraController.bindKey(Keyboard.UP, SimpleObjectController.ACTION_PITCH_UP);
            cameraController.bindKey(Keyboard.PAGE_UP, RollCameraController.ACTION_ZOOM_IN);
            cameraController.bindKey(Keyboard.PAGE_DOWN,RollCameraController.ACTION_ZOOM_OUT);
            cameraController.update();
            
            //描画開始
            scene.startRendering()
            
            scene.onPreRender = function():void {
                cameraController.update();
            }

        }
		
		
	
		
		private function onMatLoadComplete(e:Event):void 
		{
			// transform test box geometry to global coordinate space
var util:A3DToCSSUtil = new A3DToCSSUtil();
util.imgUrlPrefix = "../";

			 var danbo:Object3DContainer;
			scene.container.addChild(danbo = new Danbord(textures, 0));
			danbo.name = "#testDanbo."+danbo.name;
			
		//	scene.container.composeMatrix();
		//	globalizeAll(danbo, scene.container);
			
		
			throw new Error( util.getHTML(scene.container) );
		}
		
		private function globalizeAll(targ:Object3DContainer, root:Object3DContainer):void {
			var obj:Object3D
			for (var c:Object3D = targ.childrenList; c != null; c = c.next) {
				if (c is Mesh) {
					
					TransformMacros.calculateLocalToGlobalNull(c);
					TransformMacros.transformMesh(c as Mesh, c);
					c.matrix = new Matrix3D();
					root.addChild(c);
				}
				else if (c is Object3DContainer) {
					obj = new Object3D();
					obj.matrix = c.matrix;
					obj._parent = c._parent;
					TransformMacros.calculateLocalToGlobalNull(obj);
					
					globalizeAll(c as Object3DContainer, root);
				}
			}
		}
		

    }
	
	

	
	
    
}





import alternativa.engine3d.controllers.SimpleObjectController;
import alternativa.engine3d.core.Object3D;
import alternativa.engine3d.objects.Joint;
import alternativa.engine3d.objects.Skin;
import flash.display.InteractiveObject;
import flash.events.KeyboardEvent;
import flash.events.MouseEvent;
import flash.geom.Rectangle;
import flash.geom.Vector3D;

/**
 * RollCameraController
 *
 * @author narutohyper
 */

class RollCameraController extends SimpleObjectController{
    public static const ACTION_ZOOM_IN : String="action_zoom_in";
    public static const ACTION_ZOOM_OUT : String="action_zoom_out";
    

    
    /**
     * Camera位置の最小高さ(z) 上が+ 初期値は100
     */
    public var minZ:Number = 100;
    /**
     * Camera位置の最大高さ(z) 上が+ 初期値は800
     */
    public var maxZ:Number = 800;
    /**
     * Cameraから、中心までの最小距離
     */
    public var minLength:Number = 200;
    /**
     * Cameraから、中心までの最大距離
     */
    public var maxLength:Number = 2000;
    
    private var _easingSeparator:Number = 20;
    private var _yawNear:Boolean=false
    private var _yawNearAngle:Number
    private var _pitchNear:Boolean=false
    private var _pitchNearAngle:Number


    private var _target:Object3D
    private var _pitchDown:Boolean;
    private var _pitchUp:Boolean;
    private var _yawLeft:Boolean;
    private var _yawRight:Boolean;
    
    private var _mouseMove:Boolean;
    private var _mouseSensitivityX:Number=1
    private var _mouseSensitivityY:Number=1
    private var _mouseX:Number;
    private var _mouseY:Number;
    private var _zoomIn:Boolean;
    private var _zoomOut:Boolean;
    private var _length:Number = 700;
    private var _lastLength:Number = 700;
    
    private var _zoomSpeed:Number = 10;
    private var _yawSpeed:Number = 5;
    private var _pitchSpeed:Number = 30;

    private var _oldAngle:Number;
    private var _angle:Number = 90;
    private var _lastAngle:Number = _angle;
    private var _oldZ:Number;
    private var _lastZ:Number;
    private var _eventSource:InteractiveObject;
    
    private var _lookAtX:Number=0;
    private var _lastLookAtX:Number=_lookAtX;
    private var _lookAtY:Number=0;
    private var _lastLookAtY:Number=_lookAtY;
    private var _lookAtZ:Number=0;
    private var _lastLookAtZ:Number=_lookAtZ;
    
    
    public function RollCameraController(eventSource:InteractiveObject, object:Object3D, speed:Number, speedMultiplier:Number = 3, mouseSensitivityX:Number = 1, mouseSensitivityY:Number = 1) {
        _target = object;
        _lastZ = _target.z;
        _eventSource = eventSource;
        super(eventSource, object, speed, speedMultiplier, mouseSensitivity);
        
        eventSource.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
        eventSource.addEventListener(KeyboardEvent.KEY_UP, onKeyUp);
        _eventSource.addEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheel);
    }
    
    private function onMouseWheel(e:MouseEvent):void
    {
        _lastLength += e.delta*20;
        if (_lastLength < minLength) {
            _lastLength=minLength
        } else if (_lastLength > maxLength) {
            _lastLength=maxLength
        }
    }
    
    public function onKeyDown(e:KeyboardEvent):void {
        for (var key:String in keyBindings) {
            if (String(e.keyCode)==key) {
                keyBindings[key](true)
            }
        }
    }
    
    public function onKeyUp(e:KeyboardEvent = null):void {
        for (var key:String in keyBindings) {
            keyBindings[key](false)
        }
        _yawNear = false
        _pitchNear = false;
    }

    
    override public function bindKey(keyCode:uint, action:String): void {
        switch (action) {
            case ACTION_ZOOM_IN:
                keyBindings[keyCode] = zoomIn;
            break
            case ACTION_ZOOM_OUT:
                keyBindings[keyCode] = zoomOut;
            break
            case ACTION_YAW_LEFT:
                keyBindings[keyCode] = yawLeft;
            break
            case ACTION_YAW_RIGHT:
                keyBindings[keyCode] = yawRight;
            break
            case ACTION_PITCH_DOWN:
                keyBindings[keyCode] = pitchDown;
            break
            case ACTION_PITCH_UP:
                keyBindings[keyCode] = pitchUp;
            break
        }
        //super.bindKey(keyCode, action)
    }
    

    public function pitchDown(value:Boolean):void {
        _pitchDown=value
    }
    
    public function pitchUp(value:Boolean):void {
        _pitchUp=value
    }
    
    public function yawLeft(value:Boolean,near:Boolean=false):void {
        _yawLeft = value;
        _yawNear = near;
    }
    
    public function yawRight(value:Boolean,near:Boolean=false):void {
        _yawRight = value;
        _yawNear = near;
    }
    
    public function zoomIn(value:Boolean):void {
        _zoomIn = value;

    }
    
    public function zoomOut(value:Boolean):void {
        _zoomOut = value;
    }

    
    
    override public function update(): void {
        var RADIAN:Number = Math.PI / 180;
        
        //CameraZoom制御
        if (_zoomIn) {
            _lastLength -= _zoomSpeed
        } else if (_zoomOut){
            _lastLength += _zoomSpeed
        }
        if (_lastLength < minLength) {
            _lastLength=minLength
        } else if (_lastLength > maxLength) {
            _lastLength=maxLength
        }
        if (_lastLength - _length) {
            _length += (_lastLength - _length) / _easingSeparator;
        }
        
        //Camera回転制御
        if (_mouseMove) {
            _lastAngle = _oldAngle + (_eventSource.mouseX - _mouseX) * _mouseSensitivityX/2
            
        } else if (_yawLeft) {
            _lastAngle += _yawSpeed;

        } else if (_yawRight) {
            _lastAngle -= _yawSpeed;

        }
        if (_lastAngle-_angle) {
            _angle += (_lastAngle - _angle) / _easingSeparator;
        }
        
        _target.x = Math.cos(_angle * RADIAN) * _length;
        _target.y = Math.sin(_angle * RADIAN) * _length;
        
        
        //CameraZ位置制御
        if (_mouseMove) {
            _lastZ = _oldZ + (_eventSource.mouseY - _mouseY) * _mouseSensitivityY * 2

        } else if (_pitchDown) {
            _lastZ -= _pitchSpeed

        } else if (_pitchUp) {
            _lastZ += _pitchSpeed
        }
        if (_lastZ < minZ) {
            _lastZ = minZ;
        } else if (_lastZ > maxZ) {
            _lastZ = maxZ
        }
        if (_lastZ - _target.z) {
            _target.z += (_lastZ - _target.z) / _easingSeparator;
        }
        
        //lookAt制御
        if (_lastLookAtX - _lookAtX) {
            _lookAtX += (_lastLookAtX-_lookAtX) / _easingSeparator;
        }
        
        if (_lastLookAtY - _lookAtY) {
            _lookAtY += (_lastLookAtY-_lookAtY) / _easingSeparator;
        }
        
        if (_lastLookAtZ - _lookAtZ) {
            _lookAtZ += (_lastLookAtZ-_lookAtZ) / _easingSeparator;
        }
        
        //super.update()
        updateObjectTransform()
        lookAtXYZ(_lookAtX, _lookAtY, _lookAtZ);
    }
    
    override public function startMouseLook():void {
        _oldAngle = _lastAngle
        _oldZ = _lastZ
        _mouseX = _eventSource.mouseX;
        _mouseY = _eventSource.mouseY;
        _mouseMove = true;
        
    }

    override public function stopMouseLook():void {
        _mouseMove = false;
    }
    
    /**
     * Zoomスピード
     * 初期値は10(px)
     */
    public function set zoomSpeed(value:Number):void
    {
        _zoomSpeed = value;
    }
    
    /**
     * 回転スピード
     * 初期値は5(度)
     */
    public function set yawSpeed(value:Number):void {
        _yawSpeed = value*Math.PI/180;
    }

    /**
     * 上下スピード
     * 初期値は30(px)
     */
    public function set pitchSpeed(value:Number):void
    {
        _pitchSpeed = value
    }
    
    /**
     * マウスのX方向の感度
     */
    public function set mouseSensitivityX(value:Number):void
    {
        _mouseSensitivityX = value;
    }
    
    /**
     * マウスのY方向の感度
     */
    public function set mouseSensitivityY(value:Number):void
    {
        _mouseSensitivityY = value;
    }

    
    /**
     * イージング時の現在の位置から最後の位置までの分割係数
     * フレームレートと相談して使用
     * 1～
     * 正の整数のみ。0を指定しても1になります。
     * 1でイージング無し。数値が高いほど、遅延しぬるぬるします
     */
    public function set easingSeparator(value:uint):void
    {
        if (value) {
            _easingSeparator = value;
        } else {
            _easingSeparator = 1;
        }
    }
    
    /**
     * Cameraの向く方向
     * mode=trueで、イージングしないで変更
     * lookAtやlookAtXYZとの併用は不可
     */
    public function lookAtPosition(x:Number, y:Number, z:Number,mode:Boolean=false):void {
        if (mode)
        {
            _lookAtX = x
            _lookAtY = y
            _lookAtZ = z
        }
        _lastLookAtX = x
        _lastLookAtY = y
        _lastLookAtZ = z
    }
    
    /**
     * Cameraの初期位置
     * value=0で、正面から中央方向(lookAtPosition)を見る
     * mode=trueで、イージングしないで変更
     */
    public function angle(value:Number,mode:Boolean=false):void
    {
        if (mode)
        {
            _angle = value+90;
        }
        _lastAngle = value+90;
    }
    
    /**
     * Cameraから、targetObjectまでの距離
     * mode=trueで、イージングしないで変更
     */
    public function length(value:Number,mode:Boolean=false):void
    {
        if (mode)
        {
            _length = value;
        }
        _lastLength = value;
    }
    /**
     * Cameraの高さ
     * mode=trueで、イージングしないで変更
     */
    public function posZ(value:Number,mode:Boolean=false):void
    {
        if (mode)
        {
            _target.z = value;
        }
        _lastZ = value;
    }
    

    

    
}




/**
 * BasicTemplate for Alternativa3D 7.6
 * Alternativa3D 7.6を扱いやすくするためのテンプレートです
 * @author narutohyper & clockmaker
 *
 */
import alternativa.engine3d.containers.BSPContainer;
import alternativa.engine3d.containers.ConflictContainer;
import alternativa.engine3d.containers.DistanceSortContainer;
import alternativa.engine3d.containers.KDContainer;
import alternativa.engine3d.containers.LODContainer;
import alternativa.engine3d.controllers.SimpleObjectController;
import alternativa.engine3d.core.Camera3D;
import alternativa.engine3d.core.Object3DContainer;
import alternativa.engine3d.core.View;
import flash.display.DisplayObject;

import flash.display.DisplayObjectContainer;
import flash.display.Sprite;
import flash.display.StageAlign;
import flash.display.StageQuality;
import flash.display.StageScaleMode;

import flash.events.Event;

class AlternativaTemplate extends Sprite
{
        /**
         * 子オブジェクトを最適な方法でソートするコンテナ
         * (ConflictContainer)
         */
        public static const CONFLICT:String = 'conflict';
        /**
         * 子オブジェクトをBSP(バイナリ空間分割法)によってソートするコンテナ
         * (BSPContainer)
         */
        public static const BSP:String = 'bsp';
        
        /**
         * 子オブジェクトをカメラからのZ値でソートするコンテナ
         * (DistanceSortContainer)
         */
        public static const ZSORT:String = 'zsort';
        /**
         * KDツリー(http://ja.wikipedia.org/wiki/Kd%E6%9C%A8)によってソートするコンテナ
         * (KDContainer)
         */
        public static const KD:String = 'kd';
        /**
         * detalizationと子オブジェクトの距離でソートするコンテナ（詳細は調査中）
         * (LODContainer)
         */
        public static const LOD:String = 'lod';
        
        /**
         * 3dオブジェクト格納するコンテナインスタンス。
         */
        public var container:Object3DContainer;

        /**
         * ビューインスタンスです。
         */
        public var view:View
        
        /**
         * カメラインスタンスです。
         */
        public var camera:Camera3D;
        
        /**
         * カメラコントローラーです。
         */
        public var cameraController:SimpleObjectController
        
        private var _mc:DisplayObjectContainer
        private var _viewWidth:int;
        private var _viewHeight:int;
        private var _scaleToStage:Boolean;
        private var _containerType:String
        
        /**
         * 新しい Alternativa3DTemplate インスタンスを作成します。
         * @param        mc
         * @param        containerType
         * @param        viewWidth
         * @param        viewHeight
         * @param        scaleToStage
         */
        public function AlternativaTemplate(mc:DisplayObjectContainer,containerType:String="",viewWidth:int=640, viewHeight:int=480, scaleToStage:Boolean = true)
        {
                _mc = mc
                _mc.addChild(this)

                _containerType = containerType
                _viewWidth = viewWidth;
                _viewHeight = viewHeight;
                _scaleToStage = scaleToStage;
                
                if (stage) init();
                else addEventListener(Event.ADDED_TO_STAGE, init);
        }


        /**
         * 初期化されたときに実行されるイベントです。
         * 初期化時に実行したい処理をオーバーライドして記述します。
         */
        protected function atInit():void {}


        /**
         * Event.ENTER_FRAME 時に実行されるレンダリングのイベントです。
         * レンダリング前に実行したい処理をオーバーライドして記述します。
         */
        protected function atPreRender():void {}
        
        /**
         * Event.ENTER_FRAME 時に実行されるレンダリングのイベントです。
         * レンダリング前に実行したい処理をオーバーライドして記述します。
         */
        private var _onPreRender:Function = function():void{};
        public function get onPreRender():Function { return _onPreRender; }
        public function set onPreRender(value:Function):void
        {
                _onPreRender = value;
        }
        
        /**
         * Event.ENTER_FRAME 時に実行されるレンダリングのイベントです。
         * レンダリング後に実行したい処理をオーバーライドして記述します。
         */
        protected function atPostRender():void {}
        
        /**
         * Event.ENTER_FRAME 時に実行されるレンダリングのイベントです。
         * レンダリング後に実行したい処理を記述します。
         */
        private var _onPostRender:Function = function():void{};
        public function get onPostRender():Function { return _onPostRender; }
        public function set onPostRender(value:Function):void
        {
                _onPostRender = value;
        }
        
        
        /**
         * レンダリングを開始します。
         */
        public function startRendering():void
        {
                addEventListener(Event.ENTER_FRAME, onRenderTick);
        }

        /**
        * レンダリングを停止します。
        */
        public function stopRendering():void
        {
                removeEventListener(Event.ENTER_FRAME, onRenderTick);
        }

        /**
         * シングルレンダリング(レンダリングを一回だけ)を実行します。
         */
        public function singleRender():void
        {
                onRenderTick();
        }

        /**
         * @private
         */
        private function init(e:Event = null):void
        {
                removeEventListener(Event.ADDED_TO_STAGE, init);
                // entry point
                stage.scaleMode = StageScaleMode.NO_SCALE;
                stage.align = StageAlign.TOP_LEFT;
                stage.quality = StageQuality.HIGH;
                
                //Root objectの作成
                if (_containerType == CONFLICT) {
                        container = new ConflictContainer();
                } else if (_containerType == BSP) {
                        container = new BSPContainer();
                } else if (_containerType == ZSORT) {
                        container = new DistanceSortContainer();
                } else if (_containerType == KD) {
                        container = new KDContainer();
                } else if (_containerType == LOD) {
                        container = new LODContainer();
                }
				else {
					container = new Object3DContainer();
				}
                //Viewの作成
                view = new View(stage.stageWidth, stage.stageHeight);
                _mc.addChild(view);

                //cameraの作成
                camera = new Camera3D();
                camera.view = view;
                camera.x = 0;
                camera.y = -500;
                camera.z = 0;
                container.addChild(camera);
                
                // Camera controller
                cameraController = new SimpleObjectController(stage, camera, 10);
                cameraController.mouseSensitivity = 0
                cameraController.unbindAll()
                cameraController.lookAtXYZ(0, 0, 0)
                
                onResize();
                stage.addEventListener(Event.RESIZE, onResize);
                
                atInit();
        }
        
        /**
         * @private
         */
        private function onResize(e:Event = null):void
        {
                if (_scaleToStage)
                {
                    view.width = stage.stageWidth;
                    view.height = stage.stageHeight;
                }
                else
                {
                    view.width = _viewWidth;
                    view.height = _viewHeight;
                }
        }
        
        /**
         * @private
         */
        private function onRenderTick(e:Event = null):void
        {
                atPreRender();
                _onPreRender()
                cameraController.update();
                camera.render();
                atPostRender();
                _onPostRender();
        }


}



//Texture.as
//テクスチャを一括読み込み
//package {
    import alternativa.engine3d.containers.BSPContainer;
    import alternativa.engine3d.containers.ConflictContainer;
    import alternativa.engine3d.containers.KDContainer;
    import alternativa.engine3d.core.Camera3D;
    import alternativa.engine3d.core.Canvas;
    import alternativa.engine3d.core.Debug;
    import alternativa.engine3d.core.EllipsoidCollider;
    import alternativa.engine3d.core.Face;
    import alternativa.engine3d.core.Object3D;
	import alternativa.engine3d.core.VG;
    import alternativa.engine3d.materials.FillMaterial;
    import alternativa.engine3d.materials.Material;
    import alternativa.engine3d.objects.Mesh;
    import alternativa.engine3d.primitives.Box;
    import alternativa.engine3d.primitives.Sphere;
    import flash.display.FrameLabel;
    import flash.display.Shape;
    import flash.display.Stage;
    import flash.events.KeyboardEvent;
    import flash.events.MouseEvent;
    import flash.geom.Vector3D;
    import flash.system.LoaderContext;
    import flash.ui.Keyboard;
    import flash.utils.Dictionary;
    

    //
    //Alternativa3D
    import alternativa.engine3d.core.Object3DContainer;
    import alternativa.engine3d.loaders.MaterialLoader;
    import alternativa.engine3d.materials.TextureMaterial;
        
    //public 
    class Textures {
        //3D関連
        private var loaderContext:LoaderContext;
        public var materialLoader:MaterialLoader;
        
        private var textureMats:Vector.<TextureMaterial>;
        
        public var txMatDanboTop:TextureMaterial;
        public var txMatDanboBottom:TextureMaterial;
        public var txMatDanboFront:TextureMaterial;
        public var txMatDanboLeft:TextureMaterial;
        public var txMatDanboBack:TextureMaterial;
        public var txMatDanboRight:TextureMaterial;
        public var txMatDanboFace:TextureMaterial;
        public var txMatDanboHeadTop:TextureMaterial;
        public var txMatDanboBodyFront:TextureMaterial;
        public var txMatKage:TextureMaterial;
        
        public function Textures():void {
            //テクスチャの読み込み
            txMatDanboTop = new TextureMaterial();  txMatDanboTop.name = "top";
            txMatDanboBottom = new TextureMaterial(); txMatDanboBottom.name = "bottom";
            txMatDanboFront = new TextureMaterial(); txMatDanboFront.name = "front";
            txMatDanboLeft = new TextureMaterial(); txMatDanboLeft.name = "left";
            txMatDanboBack = new TextureMaterial(); txMatDanboBack.name = "back";
            txMatDanboRight = new TextureMaterial(); txMatDanboRight.name = "right";
            txMatDanboFace = new TextureMaterial(); txMatDanboFace.name = "face";
            txMatDanboHeadTop = new TextureMaterial(); txMatDanboHeadTop.name = "headTop";
            txMatDanboBodyFront = new TextureMaterial(); txMatDanboBodyFront.name = "bodyFront";
            txMatKage = new TextureMaterial();
            
            txMatDanboTop.diffuseMapURL = "danbo_textures/danbo_tx_top.png";
            txMatDanboBottom.diffuseMapURL = "danbo_textures/danbo_tx_bottom.png";
            txMatDanboFront.diffuseMapURL = "danbo_textures/danbo_tx_front.png";
            txMatDanboLeft.diffuseMapURL = "danbo_textures/danbo_tx_left.png";
            txMatDanboBack.diffuseMapURL = "danbo_textures/danbo_tx_back.png";
            txMatDanboRight.diffuseMapURL = "danbo_textures/danbo_tx_right.png";
            txMatDanboFace.diffuseMapURL = "danbo_textures/danbo_tx_face.png";
            txMatDanboHeadTop.diffuseMapURL = "danbo_textures/danbo_tx_headtop.png";
            txMatDanboBodyFront.diffuseMapURL = "danbo_textures/danbo_tx_bodyfront.png";
            txMatKage.diffuseMapURL = "danbo_textures/tx_kage.png";
            
            textureMats = new Vector.<TextureMaterial>();
            
            textureMats.push(txMatDanboTop);
            textureMats.push(txMatDanboBottom);
            textureMats.push(txMatDanboFront);
            textureMats.push(txMatDanboLeft);
            textureMats.push(txMatDanboBack);
            textureMats.push(txMatDanboRight);
            textureMats.push(txMatDanboFace);
            textureMats.push(txMatDanboHeadTop);
            textureMats.push(txMatDanboBodyFront);
            textureMats.push(txMatKage);
            //
            //MaterialLoaderに読み込むテクスチャのリストを投げて、読み込み開始
            loaderContext = new LoaderContext(true);
            materialLoader = new MaterialLoader();
            materialLoader.load(textureMats, loaderContext);
			materialLoader.addEventListener(Event.COMPLETE, onmaterialLoadComplete);// MouseEvent.CLICK,
        }
		
		private function onmaterialLoadComplete(e:Event):void 
		{
			for (var i:int = 0; i < textureMats.length; i++) {
				textureMats[i].texture.fillRect(new Rectangle(0, 0, 8, 8), 0x0000FF);
			}
		}
		
		
    }
	
	
	
	

	import alternativa.engine3d.core.Object3D;
	import alternativa.engine3d.alternativa3d;
	import alternativa.engine3d.core.Vertex;
	import alternativa.engine3d.objects.Joint;
	import alternativa.engine3d.objects.Mesh;
	import alternativa.engine3d.objects.Skin;
	import flash.geom.Matrix3D;
	import flash.geom.Vector3D;

	use namespace alternativa3d;
	/**
	 * Use alternativa3d v7 routines for transformations
	 * @author Glidias
	 */
	 class TransformMacros 
	{
		//private static const DUMMY:Object3D = new Object3D();
		
		public static function calculateLocalToGlobalJ(local:Joint):void {
		
			local.composeMatrix();
			var p:Joint = local._parentJoint;
			
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parentJoint;
			}
			
		}
		
		public static function calculateLocalToGlobalJ3(local:Joint, skin:Skin, parent:Object3D):void {
		
			local.composeMatrix();
			var p:Object3D = local._parentJoint;
			
			while (p != null && p != parent ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = (p is Joint) ? (p as Joint)._parentJoint || skin : p._parent;
			}
			
		}
		
		public static function transformPositions(list:Object3D, transform:Object3D):void {
			while (list != null) {
				var x:Number = list.x;
				var y:Number = list.y;
				var z:Number = list.z;
				list.x = list.x * transform.ma + list.y * transform.mb + list.z * transform.mc + transform.md;
				list.y = list.x * transform.me + list.y * transform.mf + list.z * transform.mg + transform.mh;
				list.z = list.x * transform.mi + list.y * transform.mj + list.z * transform.mk + transform.ml;
				list = list.next;
			}
		}
		
		public static function transformPosition(pos:Vector3D, transform:Object3D):void {
			var x:Number = pos.x;
			var y:Number = pos.y;
			var z:Number = pos.z;
			pos.x = x * transform.ma + y * transform.mb + z * transform.mc + transform.md;
				pos.y = x * transform.me + y * transform.mf +z * transform.mg + transform.mh;
				pos.z = x * transform.mi + y * transform.mj + z * transform.mk + transform.ml;
		}
		
		public static function calculateLocalToGlobalJ3_2(local:Joint, skin:Skin, nullSpace:Object3D):void {
		
			local.composeMatrix();
			var p:Object3D = local._parentJoint;
			
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = (p is Joint) ? (p as Joint)._parentJoint || skin : p._parent;
			}
			nullSpace.composeMatrix();
			local.appendMatrix(nullSpace);
		}
		
		public static function copyTransform(copier:Object3D, target:Object3D):void {
			copier.ma = target.ma;
			copier.mb = target.mb;
			copier.mc = target.mc;
			copier.md = target.md;
			copier.me = target.me;
			copier.mf = target.mf;
			copier.mg = target.mg;
			copier.mh = target.mh;
			copier.mi = target.mi;
			copier.mj = target.mj;
			copier.mk = target.mk;
			copier.ml = target.ml;
		}
		
		private static const MATRIX:Matrix3D = new Matrix3D();
		private static const RAW_DATA:Vector.<Number> = (new Matrix3D()).rawData;
		
		public static function getMatrix3D(transform:Object3D):Matrix3D {
			/*
			transform = new Object3D();  // for testing only
			transform.rotationX = 1.4;
			transform.rotationY = .2;
			transform.rotationZ = .4;
			transform.x = 19950;
			transform.y = 29930;
			transform.z = 39990;
			transform.composeMatrix();
			*/
			
			const data:Vector.<Number> = RAW_DATA;
			///*
			data[0] =  transform.ma;  data[1] = transform.me;  data[2] = transform.mi;   data[3] = 0;
			data[4] =  transform.mb;  data[5] = transform.mf;   data[6] = transform.mj;   data[7] = 0;
			data[8] =  transform.mc;  data[9] = transform.mg;   data[10] =transform.mk;   data[11] = 0;
			data[12] = transform.md;  data[13] = transform.mh;  data[14] = transform.ml;   data[15] = 1;
			//*/
			//throw new Error(RAW_DATA + " >>>> " + transform.matrix.rawData);
			
			MATRIX.rawData = RAW_DATA;
										//MATRIX.appendTranslation(transform.md, transform.mh, transform.ml);
			return MATRIX;
		}
		
		public static function calculateLocalToGlobal(parent:Object3D, local:Object3D):void {
			local.composeMatrix();
			var p:Object3D = local._parent;
			while (p != null && p != parent) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parent;
			}
		}
		

		
		public static function calculateLocalToGlobalNull(local:Object3D):void {
			local.composeMatrix();
			var p:Object3D = local._parent;
			while (p != null ) {
				p.composeMatrix();
				local.appendMatrix(p);
				p = p._parent;
			}
		}
		
		public static function transformMesh(mesh:Mesh, transform:Object3D):void  {
			for (var v:Vertex = mesh.vertexList; v != null; v = v.next) {
				var x:Number = v.x;
				var y:Number = v.y;
				var z:Number = v.z;
				v.x = x * transform.ma + y * transform.mb + z * transform.mc + transform.md;
				v.y = x * transform.me + y * transform.mf + z * transform.mg + transform.mh;
				v.z = x * transform.mi + y * transform.mj + z * transform.mk + transform.ml;
			}
			mesh.calculateVerticesNormals();
			mesh.calculateBounds();
			mesh.calculateFacesNormals();
		}
		
	}
	
	

//ダンボーの生成とモーション
//package {
    //Alternativa3D
    import alternativa.engine3d.core.Object3DContainer;
    import alternativa.engine3d.materials.TextureMaterial;
    import alternativa.engine3d.primitives.Box;
    import alternativa.engine3d.primitives.Plane;
        
    //public 
    class Danbord extends Object3DContainer {
        private static var AREA_W:uint = 4000;
        private static var AREA_H:uint = 4000;
        private static var FPS:uint = 60;
        //3D関連
        private var boxHead:Box;
        private var boxBody:Box;
        private var boxSldL:Box;
        private var boxSldR:Box;
        private var boxArmL:Box;
        private var boxArmR:Box;
        private var boxKneL:Box;
        private var boxKneR:Box;
        private var boxLegL:Box;
        private var boxLegR:Box;
        private var planeSktL:Plane;
        private var planeSktR:Plane;
        private var planeSktF:Plane;
        private var planeSktB:Plane;
        
        private var danHead:Object3DContainer;
        private var danBody:Object3DContainer;
        private var danSldL:Object3DContainer;
        private var danSldR:Object3DContainer;
        private var danArmL:Object3DContainer;
        private var danArmR:Object3DContainer;
        private var danKneL:Object3DContainer;
        private var danKneR:Object3DContainer;
        private var danLegL:Object3DContainer;
        private var danLegR:Object3DContainer;
        private var danSktL:Object3DContainer;
        private var danSktR:Object3DContainer;
        private var danSktF:Object3DContainer;
        private var danSktB:Object3DContainer;

        private var motionR:Number = 0;
        private var motionType:String = "stand";
        private var motionTypes:Vector.<String>;
        //
        private var textures:Textures;
        
        public var bodyR:Number = 0;
        public var sp:Number = 0;
        public var spZ:Number = 0;
        public var ground:Boolean = true;
        
        //ダンボー
        public function Danbord(_textures:Textures, bodyRot:Number=Number.POSITIVE_INFINITY):void {
            textures = _textures;
			
			name = "danbot";
            //
            //パーツを埋め込むコンテナの作成（回転軸を中心以外の場所にしたいためコンテナに埋め込んでます）
            danHead = new Object3DContainer(); danHead.name = "danHead";
            danBody = new Object3DContainer(); danBody.name = "danBody";
            danSldL = new Object3DContainer(); danSldL.name = "danSldL";
            danSldR = new Object3DContainer(); danSldR.name = "danSldR"
            danArmL = new Object3DContainer(); danArmL.name = "danArmL"
            danArmR = new Object3DContainer(); danArmR.name = "danArmR"
            danKneL = new Object3DContainer(); danKneL.name = "danKneL"
            danKneR = new Object3DContainer(); danKneR.name = "danKneR"
            danLegL = new Object3DContainer(); danLegL.name = "danLegL"
            danLegR = new Object3DContainer(); danLegR.name = "danLegR"
            danSktL = new Object3DContainer(); danSktL.name = "danSktL"
            danSktR = new Object3DContainer(); danSktR.name = "danSktR"
            danSktF = new Object3DContainer(); danSktF.name = "danSktF"
            danSktB = new Object3DContainer(); danSktB.name = "danSktB"
            
            //パーツを作成
            boxBody = new Box(76, 60, 102, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboBodyFront, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxHead = new Box(160, 102, 102, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFace, textures.txMatDanboBottom, textures.txMatDanboHeadTop);
            boxSldL = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxSldR = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxArmL = new Box(106, 26, 26, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxArmR = new Box(106, 26, 26, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxKneL = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxKneR = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxLegL = new Box(30, 56, 66, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboBottom);
            boxLegR = new Box(30, 56, 66, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboBottom);
            planeSktL = new Plane(60, 30, 1, 1, true, false, false, textures.txMatDanboLeft, textures.txMatDanboBottom);
            planeSktR = new Plane(60, 30, 1, 1, true, false, false, textures.txMatDanboRight, textures.txMatDanboBottom);
            planeSktF = new Plane(76, 30, 1, 1, true, false, false, textures.txMatDanboFront, textures.txMatDanboBottom);
            planeSktB = new Plane(76, 30, 1, 1, true, false, false, textures.txMatDanboBack, textures.txMatDanboBottom);
			
			boxBody.name = "boxBody";
			boxHead.name = "boxHead";
			boxSldL.name = "boxSldL";
			boxSldR.name = "boxSldR";
			boxArmL.name = "boxArmL";
			boxArmR.name = "boxArmR";
			boxKneL.name = "boxKneL";
			boxKneR.name = "boxKneR";
			boxLegL.name = "boxLegL";
			boxLegR.name = "boxLegR";
			planeSktL.name = "planeSktL";
			planeSktR.name = "planeSktR";
			planeSktF.name = "planeSktF";
			planeSktB.name = "planeSktB";

            
            //ステージに追加（パーツごとに親子関係になっています）
            /*
            danBody：体
            -danHead：頭
            -danSldL：左肩
            --danArmL：左腕
            -danSldR：右肩
            --danArmR：右腕
            -boxKneL：左膝
            --boxLegL：左足
            -boxKneR：右膝
            --boxLegR：右足
            -danSktL：スカート右
            -danSktR：スカート左
            -danSktF：スカート前
            -danSktB：スカート後
            */
            addChild(danBody);
            danBody.addChild(danHead);
            
            danBody.addChild(danSldL);
            danBody.addChild(danSldR);
            danSldL.addChild(danArmL);
            danSldR.addChild(danArmR);
            danBody.addChild(danKneL);
            danBody.addChild(danKneR);
            danKneL.addChild(danLegL);
            danKneR.addChild(danLegR);
            danBody.addChild(danSktL);
            danBody.addChild(danSktR);
            danBody.addChild(danSktF);
            danBody.addChild(danSktB);
            
            danHead.addChild(boxHead);
            danBody.addChild(boxBody);
            danSldL.addChild(boxSldL);
            danSldR.addChild(boxSldR);
            danArmL.addChild(boxArmL);
            danArmR.addChild(boxArmR);
            danKneL.addChild(boxKneL);
            danKneR.addChild(boxKneR);
            danLegL.addChild(boxLegL);
            danLegR.addChild(boxLegR);
            danSktL.addChild(planeSktL);
            danSktR.addChild(planeSktR);
            danSktF.addChild(planeSktF);
            danSktB.addChild(planeSktB);
            
            //座標・角度設定
            boxBody.z = 137
            boxHead.z = 51;
            boxArmL.x = -63;
            boxArmR.x = 63;
            boxLegL.z = -38;
            boxLegR.z = -38;
            
            danArmL.rotationY = -1.3;
            danArmR.rotationY = 1.3;
            
            planeSktL.rotationX = Math.PI * 0.5;
            planeSktL.rotationZ = Math.PI * 0.5;
            planeSktL.z = -15;
            planeSktR.rotationX = Math.PI * 0.5;
            planeSktR.rotationZ = Math.PI * -0.5;
            planeSktR.z = -15
            planeSktF.rotationX = Math.PI * 0.5;
            planeSktF.rotationZ = Math.PI * 0;
            planeSktF.z = -15
            planeSktB.rotationX = Math.PI * 0.5;
            planeSktB.rotationZ = Math.PI * 1;
            planeSktB.z = -15
            
            danBody.z = 0;
            danHead.z = 188;
            danSldL.x = -48;
            danSldL.z = 178;
            danSldR.x = 48;
            danSldR.z = 178;
            
            danKneL.x = -17;
            danKneL.z = 76;
            danKneR.x = 17;
            danKneR.z = 76;
            
            danSktL.x = -38;
            danSktL.z = 86;
            danSktL.rotationY = 0.5;
            danSktR.x = 38;
            danSktR.z = 86;
            danSktR.rotationY = -0.5;
            danSktF.y = 30;
            danSktF.z = 86;
            danSktF.rotationX = 0.5;
            danSktB.y = -30;
            danSktB.z = 86;
            danSktB.rotationX = -0.5;
            
            //
            motionTypes = new Vector.<String>();
            motionTypes[0] = "stand";
            motionTypes[1] = "walk";
            motionTypes[2] = "dash";
            motionTypes[3] = "jump";
            
            bodyR = bodyRot!=Number.POSITIVE_INFINITY ? bodyRot :  Math.random() * Math.PI * 2;
            danBody.rotationZ = bodyR;
            if ( bodyRot==Number.POSITIVE_INFINITY) setMotionRandom();
        }
        //モーションを設定
        public function setMotion(_motion:String):void {
            if(motionType != _motion){
                motionType = _motion;
                motionR = 0;
                danBody.rotationX = 0;
                danBody.rotationY = 0;
                switch(_motion) {
                    case "stand":
                        sp = 0;
                        break;
                    case "walk":
                        bodyR = Math.random() * Math.PI * 2;
                        danBody.rotationZ = bodyR
                        sp = (2 + Math.random() * 2) * scaleX;
                        break;
                    case "dash":
                        bodyR = Math.random() * Math.PI * 2;
                        danBody.rotationZ = bodyR
                        sp = (6 + Math.random() * 4) * scaleX;
                        break;
                    case "jump":
                        spZ = (8 + Math.random() * 8) * scaleX;
                        ground = false;
                        break;
                    default :
                        break;
                }
            }
        }
        //ランダムにモーションを設定（ジャンプの有無）
        public function setMotionRandom(_jump:Boolean = true):void {
            if (_jump) {
                setMotion(motionTypes[Math.floor(Math.random() * motionTypes.length)])
            }else {
                setMotion(motionTypes[Math.floor(Math.random() * (motionTypes.length - 1))])
            }
        }
        //モーション
        public function enterFrameEvent() :void{
            danBody.rotationZ = bodyR;
            switch(motionType) {
                case "stand":
                    motionR += 0.03;
                    danBody.y = 0;
                    danBody.z = 0;
                    danHead.rotationX = Math.sin(-motionR) * 0.04;
                    danArmL.rotationY = Math.sin(-motionR) * 0.1 + -1.3;
                    danArmR.rotationY = Math.sin(motionR) * 0.1 + 1.3;
                    danSldL.rotationX = 0;
                    danSldR.rotationX = 0;
                    danLegL.rotationX = 0;
                    danLegR.rotationX = 0;
                    danKneL.rotationY = 0;
                    danKneR.rotationY = 0;
                    break;
                case "walk":
                    motionR += 0.1;
                    danBody.z = Math.sin(motionR * 2) * 3 + 3;
                    danHead.rotationX = Math.cos(motionR*2) * 0.03;
                    danArmL.rotationY = -1.3;
                    danArmR.rotationY = 1.3;
                    danSldL.rotationX = Math.sin(-motionR) * 0.3;
                    danSldR.rotationX = Math.sin(motionR) * 0.3;
                    danLegL.rotationX = Math.sin(motionR) * 0.4;
                    danLegR.rotationX = Math.sin( -motionR) * 0.4;
                    danKneL.rotationY = 0;
                    danKneR.rotationY = 0;
                    break;
                case "dash":
                    motionR += 0.23;
                    danBody.z = Math.sin(motionR * 2) * 8 + 8;
                    danHead.rotationX = Math.cos(motionR*2) * 0.05;
                    danArmL.rotationY = -1.3;
                    danArmR.rotationY = 1.3;
                    danSldL.rotationX = Math.sin(-motionR) * 0.6;
                    danSldR.rotationX = Math.sin(motionR) * 0.6;
                    danLegL.rotationX = Math.sin(motionR) * 0.6;
                    danLegR.rotationX = Math.sin( -motionR) * 0.6;
                    danKneL.rotationY = 0;
                    danKneR.rotationY = 0;
                    break;
                case "jump":
                    motionR += 0.23;
                    danBody.z = 0;
                    danHead.rotationX = Math.max(Math.min(spZ * 0.1, 0.8), -0.5);
                    danArmL.rotationY = -Math.max(Math.min(spZ * 0.2, 1.4), -0.2);
                    danArmR.rotationY = Math.max(Math.min(spZ * 0.2, 1.4), -0.2);
                    danSldL.rotationX = 0;
                    danSldR.rotationX = 0;
                    danKneL.rotationY = -Math.max(Math.min(spZ * 0.2, 0), -0.2);
                    danKneR.rotationY = Math.max(Math.min(spZ * 0.2, 0), -0.2);
                    danLegL.rotationX = 0;
                    danLegR.rotationX = 0;
                    break;
                default :
                    break;
            }
        }
    }


	