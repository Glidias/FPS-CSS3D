// forked from GARENA123's Alternativa3D 7.5で動くダンボー
//【気ままに動くダンボー】
//ダンボーが動きまわります。
//BoxとPlaneの組み合わせで比較的簡単に作れそうなので作ってみました。
//
//ボタン操作でダンボーの増減と、カメラの動きを変更することができます。
//カメラモードをマニュアルにすると、カメラをキーボードとマウスで自由に操作することができます。
//カメラの角度：マウスドラッグ
//カメラ移動：WASDEC or カーソル
/**
*  DanboardPlayer character (3rd person view) test
*/
package wonderfl {
    import alternativa.engine3d.containers.DistanceSortContainer;
    import alternativa.engine3d.core.Clipping;
    import alternativa.engine3d.core.Debug;
    import alternativa.engine3d.core.Object3D;
    import alternativa.engine3d.core.Object3DContainer;
    import alternativa.engine3d.materials.TextureMaterial;
    import alternativa.engine3d.primitives.Box;
    import com.bit101.components.Slider;
    import flash.display.BitmapData;
    import flash.display.DisplayObject;
    import flash.display.StageQuality
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.filters.DropShadowFilter;
	import flash.system.System;
    import flash.utils.getTimer;
    //
    //Alternativa3D
    import alternativa.engine3d.containers.*;
    import alternativa.engine3d.controllers.SimpleObjectController;
    import alternativa.engine3d.core.Camera3D;
    import alternativa.engine3d.core.View;
    import alternativa.engine3d.materials.FillMaterial;
    import alternativa.engine3d.primitives.Plane;
    //
    //ボタンやラベル
    import com.bit101.components.PushButton;
    import com.bit101.components.Label;
    //
    //ステータス表示
     import net.hires.debug.Stats;
    //
    [SWF(width = 465, height = 465, frameRate = 60 , backgroundColor = "#FFF9E5")]

        public class DangBoardPlayer extends Sprite {
        private static var AREA_W:uint = 3000;
        private static var AREA_H:uint = 3000;
        private static var FPS:uint = 60;

        
        //ボタン、ラベル
        private var btnAdd:PushButton;
        private var btnRemove:PushButton;
        //private var btnCamera:PushButton;
        private var labelTotal:Label;
       // private var labelCamera:Label;
        private var labelZoom:Label;
        private var sliderZoom:Slider;
        
        //3D関連
        private var container:Object3DContainer;    // container for entities
        private var kageContainer:Object3DContainer; // container for blob shadows
        private var rootContainer:Object3DContainer;  // root container for scene
        private var camera:Camera3D;
        private var cameraMode:int;
        private var cameraModeLabels:Vector.<String>;
        private var cameraFrame:int = 0;
        private var cameraChangeFrame:int = 300;
        private var cameraR:Number;
        private var cameraSp:Number;
        private var controller:SimpleObjectController;
        
        
        private var plane:Plane;
        private var planeMat:TextureMaterial;
        
        private var textures:Textures;
        private var danbords:Vector.<Danbord>;
        private var kages:Vector.<Object3D>;
        
        private var addState:Boolean = true;
        private var stats:Stats = new Stats();
        
        private var player:DanboPlayer;
    
        
        public function DangBoardPlayer():void {
            //stage.quality = StageQuality.LOW;
            var child:DisplayObject;
            danbords = new Vector.<Danbord>();
            kages = new Vector.<Object3D>();
            
            //rootContainer static draw order. 
            rootContainer = new Object3DContainer();
             kageContainer = new Object3DContainer();
             container = new DistanceSortContainer();     
           
            //カメラ設定
            camera = new Camera3D();
            cameraModeLabels = new Vector.<String>();
            cameraModeLabels[0] = "Auto";
            cameraModeLabels[1] = "Rotate 1";
            cameraModeLabels[2] = "Rotate 2";
            cameraModeLabels[3] = "Target 1";
            cameraModeLabels[4] = "Target 2";
            cameraModeLabels[5] = "Top";
            cameraModeLabels[6] = "Manual";
            cameraMode = 0;
            cameraR = 0;
            cameraFrame = 0;
            
            Danbord.precomputeAll();
            /*
            camera.debug = true;
            camera.addToDebug(Debug.EDGES, Object3D);
            camera.addToDebug(Debug.BOUNDS, Object3D);
            */
            
            rootContainer.addChild(camera);
            camera.view = new View(465, 465);
            addChild(camera.view);
            camera.y = -1000;
            camera.z = 300
            camera.rotationX = -Math.PI * 0.53;
            controller = new SimpleObjectController(stage, camera, 500);
            
            //
            //床
            planeMat = new TextureMaterial(new BitmapData(8,8,false,0xFF614F3E));
            plane = new Plane(AREA_W + 80, AREA_H + 80, 1, 1, false, false, false, planeMat, planeMat);
         
            var cell:Box = new Box(AREA_W + 80, AREA_H + 80, AREA_W + 1000, 1, 1, 1, true, false);
            cell.clipping = 0;
            cell.sorting = 0;
            plane.z  = 0;
            plane.sorting  = 0;
            plane.clipping = Clipping.FACE_CLIPPING;
            rootContainer.addChild(plane);
            
            rootContainer.addChild(cell);
            
            // Establish draw order now
            rootContainer.addChild(kageContainer);
            rootContainer.addChild(container);
            
            //テクスチャ
            textures = new Textures();
            
            //ボタン
            btnAdd = new PushButton(this, 80, 5, "AddDanbord", addDanbord);
            
            btnRemove = new PushButton(this, 80, 30, "RemoveDanbord", removeDanbord);
            labelTotal = new Label(this, 80, 55, "TotalDanbord = " + String(danbords.length));
            
          //  btnCamera = new PushButton(this, 210, 5, "CameraChange", cameraModeChange);
          //  labelCamera = new Label(this, 210, 30, "CameraMode = " + cameraModeLabels[cameraMode]);
            
            sliderZoom = new Slider(Slider.HORIZONTAL, this, 210, 5, sliderZoomChange);
            sliderZoom.minimum = 0;
            sliderZoom.maximum = 1;
            sliderZoom.addEventListener(MouseEvent.MOUSE_DOWN, stopEventPropagate);
        
            labelZoom = new Label(this, 210, 30, "CameraZoom ");
            
       
            //ダンボー追加
            /*
            for (var i:int = 0; i < 10; i++) {
                addDanbord();
            }
            */
            
            var playerDanbord:Danbord = addDanbord(null, false);
           playerDanbord.setupRenderer(camera);
           player = new DanboPlayer(playerDanbord, camera, rootContainer, stage);
           player.excludedObjects[container] = true;
           player.excludedObjects[kageContainer] = true;
           sliderZoom.value =player.getZoomRatio(); 
           
            //イベント
            addEventListener(Event.ENTER_FRAME, onEnterFrameHandler);
            
            
            
            //addDanbord(
            
            
            addChild(stats);
            
            child = addChild( new CrossHair() );
            child.x = stage.stageWidth * .5;
            child.y = stage.stageHeight * .5;
            child.filters = [new DropShadowFilter(1,45,0,1,0,0,1,1,false,false, false)];
        }
        
        private function stopEventPropagate(e:MouseEvent):void 
        {
            e.stopPropagation();
        }
        
        private function sliderZoomChange(e:Event):void 
        {
            player.zoom = sliderZoom.value;
        }
        //ダンボー追加
        private function addDanbord(_e:Event = null, ai:Boolean=true):Danbord {
            var mySc:Number = Math.random() * 1 + 0.5;
            
            var myDanbord:Danbord = new Danbord(textures);
		
			
			if (!ai) System.setClipboard( Danbord.STAND.getCSS(myDanbord) + Danbord.WALK.getCSS(myDanbord) + Danbord.DASH.getCSS(myDanbord)   );
			//myDanbord.
            myDanbord.x = Math.random() * AREA_W - AREA_W * 0.5;
            myDanbord.y = Math.random() * AREA_H - AREA_H * 0.5;
            myDanbord.scaleX = myDanbord.scaleY = myDanbord.scaleZ = mySc;
            container.addChild(myDanbord)
            if (ai) {
                danbords.push(myDanbord)
                myDanbord.bodyR = Math.random() * Math.PI * 2;
                myDanbord.danBody.rotationZ = myDanbord.bodyR;
            }
            else {
                //myDanbord.z += 480;
            }
            
            
            var myKage:Kage = new Kage(textures);
            myKage.x = myDanbord.x
            myKage.y = myDanbord.y
            myKage.scaleX = myKage.scaleY = myKage.scaleZ = mySc;
            kageContainer.addChild(myKage);
            myKage.calculateBounds();
            myDanbord.boundMinZ = 0;
            myDanbord.boundMaxZ = 288;
            const padd:Number = 1;
            myDanbord.boundMinX = (myKage.boundMinX+padd) * mySc ;
            myDanbord.boundMaxX =( myKage.boundMaxX-padd) * mySc;
            myDanbord.boundMinY = (myKage.boundMinY+padd) * mySc;
            myDanbord.boundMaxY = (myKage.boundMaxY-padd) * mySc;
            if (ai) kages.push(myKage);  // to take away this
            
            
            myDanbord.kage = myKage;
            
            
        //    myKage.z += myDanbord.boundMaxZ;
            
            //
            labelTotal.text = "TotalDanbord = " + String(danbords.length);
            
            return myDanbord;
        }
        //ダンボー消去
        private function removeDanbord(_e:Event = null):void {
            var myNum:int = danbords.length - 1;
            if (myNum > 0) {
                var myDanbord:Danbord = danbords[myNum];
               
                container.removeChild(myDanbord);
                danbords[myNum] = null;
                danbords.pop();
                
                var myKage:Object3D = kages[myNum];
                kageContainer.removeChild(myKage);
                kages[myNum] = null;
                kages.pop();
                
                labelTotal.text = "TotalDanbord = " + String(danbords.length);
            }
        }
        //カメラモードの変更
        private function cameraModeChange(_e:Event = null):void {
            cameraMode++;
            cameraR = 0;
            cameraFrame = 0;
            if (cameraMode >= cameraModeLabels.length) {
                cameraMode = 0;
            }
            if (cameraMode == 6) {
                controller.enable();
                controller.setObjectPosXYZ(0, -1000, 200);
                controller.lookAtXYZ(0, 0, 200);
            }else {
                controller.disable();
            }
           // labelCamera.text = "CameraMode = " + cameraModeLabels[cameraMode];
        }
        private var _lastTime:int = 0;
        private static const MS:Number = 1 / 1000;
        //毎フレーム実行
        private function onEnterFrameHandler(_e:Event):void {
            //ダンボーのモーション
            var curTime:Number = getTimer();
            var timeElapsed:Number = _lastTime != 0 ? curTime-_lastTime : 30;
            timeElapsed *= MS;
            _lastTime = curTime;
            
             var myDanbord:Danbord
            var myLength:int = danbords.length;
            for (var i:int = 0; i < myLength; i++) {
                myDanbord= danbords[i];
                //ジャンプしていないときに、一定確率でモーションをランダムに変更
                if (Math.random() < 0.01 && myDanbord.ground == true) {
                    myDanbord.setMotionRandom();
                }
                //移動
                myDanbord.x += Math.sin(-myDanbord.bodyR) * myDanbord.sp;
                myDanbord.y += Math.cos(-myDanbord.bodyR) * myDanbord.sp;
                //画面端に移動したら反射
                if (myDanbord.x < -AREA_W * 0.5) {
                    myDanbord.x = -AREA_W * 0.5 - (AREA_W * 0.5 + myDanbord.x);
                    myDanbord.bodyR = Math.PI - myDanbord.bodyR + Math.PI;
                }else if (myDanbord.x > AREA_W * 0.5) {
                    myDanbord.x = AREA_W * 0.5 + (AREA_W * 0.5 - myDanbord.x);
                    myDanbord.bodyR = Math.PI - myDanbord.bodyR + Math.PI;
                }
                if (myDanbord.y < -AREA_H * 0.5) {
                    myDanbord.y = -AREA_H * 0.5 - (AREA_H * 0.5 + myDanbord.y);
                    myDanbord.bodyR = Math.PI - myDanbord.bodyR;
                }else if (myDanbord.y > AREA_H * 0.5) {
                    myDanbord.y = AREA_H * 0.5 + (AREA_H * 0.5 - myDanbord.y);
                    myDanbord.bodyR = Math.PI - myDanbord.bodyR;
                }
                //ジャンプ時の挙動
                if (myDanbord.ground == false) {
                    myDanbord.spZ -= 9.8 / FPS;
                    myDanbord.z += myDanbord.spZ;
                    if (myDanbord.z <= 0) {
                        myDanbord.z = 0;
                        myDanbord.spZ = 0;
                        myDanbord.ground = true;
                        myDanbord.setMotionRandom(false);
                    }
                }
                //パーツのモーション
                myDanbord.enterFrameEvent2();
                //影を足元に移動
                var myKage:Object3D = kages[i];
                myKage.x = myDanbord.x;
                myKage.y = myDanbord.y;
            }
            //
            //オートカメラモードの管理
            /*
            var myCameraMode:int = cameraMode;
            if (myCameraMode == 0) {
                cameraFrame++;
                myCameraMode = Math.floor(cameraFrame / cameraChangeFrame) + 1;
                if (myCameraMode >= cameraModeLabels.length - 1) {
                    cameraFrame = 0;
                    myCameraMode = 1
                }
                
            }
            //
            //カメラを移動
        
            switch(myCameraMode) {
                case 0:
                    break;
                case 1:
                    //回転1
                    cameraR += 0.007;
                    controller.setObjectPosXYZ(Math.cos(cameraR)*1200, Math.sin(cameraR)*1200, 300);
                    controller.lookAtXYZ(Math.cos(cameraR + Math.PI * 0.6)*700, Math.sin(cameraR + Math.PI * 0.6)*700, 100);
                    break;
                case 2:
                    //回転2
                    cameraR += 0.005;
                    controller.setObjectPosXYZ(Math.cos(cameraR)*1800, Math.sin(cameraR)*1800, 1500);
                    controller.lookAtXYZ(0, 0, 0);
                    break;
                case 3:
                    //ターゲット1
                   myDanbord = danbords[danbords.length - 1];
                    cameraR += 0.01;
                    controller.setObjectPosXYZ(Math.cos(cameraR)*600 + myDanbord.x, Math.sin(cameraR)*600 + myDanbord.y, 300);
                    controller.lookAtXYZ(myDanbord.x, myDanbord.y, myDanbord.z + 200);
                    break;
                case 4:
                    //ターゲット2
                    myDanbord = danbords[danbords.length - 1];
                    var targetR:Number = myDanbord.bodyR + Math.PI * 0.5;
                    while (targetR > cameraR + Math.PI) {
                        targetR -= Math.PI * 2;
                    }
                    while (targetR < cameraR - Math.PI) {
                        targetR += Math.PI * 2;
                    }
                    cameraR += (targetR - cameraR) * 0.03;
                    controller.setObjectPosXYZ(Math.cos(cameraR)*400+myDanbord.x, Math.sin(cameraR)*400+myDanbord.y, myDanbord.z + 300);
                    controller.lookAtXYZ(myDanbord.x, myDanbord.y, myDanbord.z + 200);
                    break;
                case 5:
                    //トップ
                    controller.setObjectPosXYZ(0, 0, 3000);
                    controller.lookAtXYZ(0, 0, 0);
                    break;
                case 6:
                    controller.update();
                    //マニュアル
                    break;
                default:
                    break;
                
            }
            */
            
            player.update(timeElapsed);
            
            player.preRender();
            camera.render();
        }
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
	import flash.geom.Matrix3D;
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
        private var materialLoader:MaterialLoader;
        
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
        }
    }
    
    
    class DanboPlayer {
        
        private var danbo:Danbord;
        private var scene:Object3D;
        
        public var thirdPerson:OrbitCameraMan;
        
        public var surfaceMovement:SurfaceMovement;
        
        public var jump:Jump;
        
        public var velocity:Vector3D = new Vector3D();
        public var position:Vector3D = new Vector3D();
        public var rotation:Vector3D = new Vector3D();
        public var radius:Vector3D = new Vector3D(16,16,32);
    
        private var /*static const*/ playerMover:PlayerMover = new PlayerMover();
        private var /*static const*/ qPhysics:QPhysics  = new QPhysics(QPhysics.FLAG_GRAVITY);
        
        private var lookAtObject:Object3D = new Object3D();
        public var excludedObjects:Dictionary = new Dictionary();
        private var lookAtOffset:Vector3D = new Vector3D();
        
        private var keyBinder:KeyBinder = new KeyBinder();
        
        private var colliderPosition:Vector3D = new Vector3D();
        
        private var walkSpeed:Number;
        private var runSpeed:Number;
        
        public function calculateMovementSpeeds():void {
            walkSpeed = 1 + (10 * radius.z/400);
            runSpeed = 1 + (30 * radius.z/400);
        }

        
        public function DanboPlayer(danbo:Danbord, camera:Camera3D, scene:Object3D, stage:Stage) {
            this.scene = scene;
            

            // -- Player-Specific stuff for Client
            thirdPerson = new OrbitCameraMan(new OrbitCameraController(camera, lookAtObject, stage, stage, stage, false, false), scene, danbo ); 
            //thirdPerson.controller.easingSeparator  = 12;
            thirdPerson.preferedZoom = 1000;
            thirdPerson.controller.minDistance = 100;
            thirdPerson.controller.maxDistance = 1800;
            //thirdPerson.controller.minAngleLatitude = 5;
            thirdPerson.controller.minAngleLatitude = -85;
            thirdPerson.controller.maxAngleLatidude =75;
            thirdPerson.followAzimuth = true;
            thirdPerson.useFadeDistance = true;
            thirdPerson.maxFadeAlpha = 1;
            
            keyBinder.clear();
            keyBinder.setupStageListeners(stage);
            keyBinder.bindKey(Keyboard.W, forward);
            keyBinder.bindKey(Keyboard.S, back);
            keyBinder.bindKey(Keyboard.A, left);
            keyBinder.bindKey(Keyboard.D, right);
            keyBinder.bindKey(Keyboard.SPACE, space);
            keyBinder.bindKey(Keyboard.SHIFT, speedChange);
            
           // stage.addEventListener(MouseEvent.MOUSE_WHEEL, thirdPerson.mouseWheelHandler);
            
            
            // -- The below also applies to NPCs or "other players" besides Client
            
            this.danbo = danbo;
            updateRadius();
            
    
            lookAtOffset.y = 0;
            lookAtOffset.z = 200;
            
            surfaceMovement = new SurfaceMovement();
            jump = new Jump(1,2135);
            
            
            excludedObjects[danbo] = true;
            excludedObjects[danbo.kage] = true;
            
            //danbo.z += 100;
            setupPosition();
            
            // view collision sphere
            ///*
            var sphere:Object3D = new Sphere(radius.z, 8, 7, false, new FillMaterial(0xFF0000, .3) );
            sphere.x = position.x;
            sphere.y = position.y;
            sphere.z = position.z;
            (scene as Object3DContainer).addChild( sphere);
            excludedObjects[sphere] = true;
            //*/
            

            calculateMovementSpeeds();
        }
        

        
        // Client controls
                
        
        public function getZoomRatio():Number {
            return  (thirdPerson.preferedZoom- thirdPerson.controller.minDistance) /  (thirdPerson.controller.maxDistance -  thirdPerson.controller.minDistance);
        }
        
        public function set zoom(ratio:Number):void {
            ratio = 1 - ratio;
            thirdPerson.preferedZoom =   thirdPerson.controller.minDistance + (thirdPerson.controller.maxDistance -  thirdPerson.controller.minDistance) * ratio;
        }
        
        
        
        
        
        private function speedChange(boo:Boolean):void 
        {
            _runMode = !boo;
        }
        
        private function space(boo:Boolean):void 
        {
            if (boo == _space) return;
            _space = boo;
        }
        
        private function right(boo:Boolean):void 
        {
            if (boo == _right) return;
            surfaceMovement.strafe_state += boo ? 1 : -1;
            _right = boo;
        }
        
        private function left(boo:Boolean):void 
        {
            if (boo == _left) return;
            surfaceMovement.strafe_state += boo ? -1 : 1;
            _left = boo;
            
        }
        
        private function back(boo:Boolean):void 
        {
            if (boo == _back) return;
            surfaceMovement.walk_state += boo ? -1 : 1;
            _back = boo;
        }
        
        private function forward(boo:Boolean):void 
        {
            if (boo == _forward) return;
            surfaceMovement.walk_state += boo ? 1 : -1;
            _forward = boo;
        }
        

        
        // Methods
        private function updateRadius():void 
        {
            radius.x = (danbo.boundMaxX - danbo.boundMinX + 12)*danbo.scaleX * .5;
            radius.y = (danbo.boundMaxY - danbo.boundMinY + 12)*danbo.scaleY * .5;
            radius.z = (danbo.boundMaxZ - danbo.boundMinZ + 35)*danbo.scaleZ * .5;
        }
        
        private function setupPosition():void 
        {
            position.x = danbo.x;
            position.y = danbo.y;
            position.z = danbo.z + radius.z;
        }
        
        private function preRenderPosition():void {
            danbo.x = position.x;
            danbo.y = position.y;
            danbo.z = position.z - radius.z;
            
            danbo.kage.x = danbo.x;
            danbo.kage.y = danbo.y;
            //danbo.kage.z = danbo.z;
        }
        
        private var _back:Boolean= false;
        private var _forward:Boolean= false;
        private var _left:Boolean = false;
        private var _right:Boolean = false;
    
        private var _space:Boolean = false;
        private var _runMode:Boolean = true;
        private var maxGroundNormal:Vector3D;
        

        public function update(t:Number):void {
        
            // Update global environs
            qPhysics.update(t, velocity);
            
            rotation.x = danbo.rotationX;
            rotation.y = danbo.rotationY;
            rotation.z = danbo.rotationZ;

            // Jump
            jump.update(t);
            var gotJump:Boolean = false;
            if (maxGroundNormal != null && _space) {
                gotJump = jump.do_jump(velocity, t);
            }
            
            // Movement along surface
            var lastPosition:Vector3D = position.clone();
    
            maxGroundNormal = playerMover.queryMove(radius, position, velocity, scene, excludedObjects);        
            var baseSpeed:Number = _runMode ? runSpeed : walkSpeed;
            surfaceMovement.WALK_SPEED = baseSpeed;
            surfaceMovement.WALKBACK_SPEED = baseSpeed * 1;
            surfaceMovement.STRAFE_SPEED = baseSpeed * 1;
            
            surfaceMovement.update(t, position, rotation, velocity, maxGroundNormal);
            
            if (maxGroundNormal == null) {
                danbo.spZ -= 9.8 / 60;
            //    myDanbord.z += myDanbord.spZ;
            }
            
            // Animations
            danbo.setMotion(  maxGroundNormal == null ? "jump" :
            
            maxGroundNormal != null &&  (surfaceMovement.strafe_state != 0 || surfaceMovement.walk_state != 0) ? 
                    _runMode ?  "dash" : "walk" 
                    
                    
                    :
                    "stand"
            );
            danbo.enterFrameEvent2();
            // Update animations for Client
            /*
            var useLat:Number = thirdPerson.controller.angleLatitude;
            if (useLat > 45 ) useLat = 45;
            if (useLat < 0 ) useLat = 0;
            danbo.danHead.rotationX = -useLat * DEG_TO_RAD * .7;
            */
            
        }
        
        private static const DEG_TO_RAD:Number = Math.PI / 180;
        
        
        private function preRenderCallback():void {
            
            //  Adjust look at position for Client Camera
            // This is basically a hardcoded way to translate position of lookAtObject from local coordinate space to global coordinate space. 
            //  If not, one would need to uncomment "//   testLook = _followTarget.localToGlobal(testLook);"
            // from OrbitCameraController class.
            lookAtObject.x = lookAtOffset.x +  danbo.danHead.x + danbo.danBody.x;
            lookAtObject.y = lookAtOffset.y +  danbo.danHead.y + danbo.danBody.y;
            lookAtObject.z = lookAtOffset.z + danbo.danHead.z + danbo.danBody.z;
            
            danbo.composeMatrix();
            lookAtObject.composeAndAppend(danbo);
            
            lookAtObject.x = lookAtObject.md;
            lookAtObject.y = lookAtObject.mh;
            lookAtObject.z = lookAtObject.ml;
        }
        
        private function get pitchRatio():Number {
            return (thirdPerson.controller.angleLatitude - thirdPerson.controller.minAngleLatitude) / (thirdPerson.controller.maxAngleLatidude - thirdPerson.controller.minAngleLatitude);
        }
        
        private function get arcRatio():Number {
            return thirdPerson.controller.angleLatitude < 0 ? -thirdPerson.controller.angleLatitude/thirdPerson.controller.minAngleLatitude : thirdPerson.controller.angleLatitude/thirdPerson.controller.maxAngleLatidude;
        }
        
        public function preRender():void {
            
            preRenderPosition();
            lookAtOffset.y = 90 * arcRatio;  // adjust so that got crosshair to view at center
    
            
            // Client view
            // This is stupid, have to call this multiple times to ensure Danbo's rotation transform of lookAtOffset vector appears more accruately without jittering.
            preRenderCallback();
            thirdPerson.update();
            
            preRenderCallback();
            thirdPerson.update();
            
            preRenderCallback();
            thirdPerson.update();
        }

        
    }
    

class PlayerMover {
    
    public var collisionPoint:Vector3D = new Vector3D();
    public var collisionNormal:Vector3D = new Vector3D();
    private static const GRAVITY_DIR:Vector3D = new Vector3D(0, 0, -1);
    public static var COLLIDER:EllipsoidCollider = new EllipsoidCollider(2, 2, 2);
    
        public function queryMove(radius:Vector3D, position:Vector3D, displacement:Vector3D, scene:Object3D, excludedObjects:Dictionary = null):Vector3D {
            const collider:EllipsoidCollider = COLLIDER;
            collider.radiusX = radius.x;
            collider.radiusY = radius.y;
            collider.radiusZ = radius.z;
            
            const collisionPoint:Vector3D = collisionPoint;
            const collisionNormal:Vector3D = collisionNormal;
            
                var dest:Vector3D = collider.calculateDestination(position, displacement, scene, excludedObjects);
                var maxGroundNormal:Vector3D
                if (collider.getCollision(position, displacement, collisionPoint, collisionNormal, scene, excludedObjects) ) {
                    if (collisionNormal.z >= .8) {
                        maxGroundNormal = collisionNormal; // <- shoudl still count this?
                    }
                    else {
                        GRAVITY_DIR.z = displacement.z;
                        if ( collider.getCollision(dest, GRAVITY_DIR, collisionPoint, collisionNormal, scene, excludedObjects) ) {
                        
                            if (collisionNormal.z >= .8)  {
                                maxGroundNormal =  collisionNormal;
                            }
                    //        collisionEvent.next = groundCollision;
                        }
                        
                    }
                //    p.move.collisions = collisionEvent;
                //    return maxGroundNormal;
                }
                else {
                //    p.move.clearCollisions();
                
                }
                
                position.x = dest.x;
                position.y = dest.y;
                position.z = dest.z;
                
                return maxGroundNormal;
    
        }
        
    
}


    
class Jump 
{
    // State Settings
    public var JUMP_COOLDOWN:Number;
    
    // State for thing
    private var jump_timer:Number;
    private var jump_speed:Number;
    public var enabled:Boolean;  // use this as a master lock to enable/disable jump depending on situation
    
    public function Jump(timeCooldown:Number, jumpSpeed:Number) 
    {
        JUMP_COOLDOWN = timeCooldown;
        jump_speed = jumpSpeed;
        jump_timer = 0;
        enabled = true;
    }
    
    public function update(time:Number ):void {
        jump_timer = jump_timer-time < 0 ? 0 : jump_timer - time;
    }
     
    
    public function do_jump(velocity:Vector3D, time:Number):Boolean {
        if (enabled && this.jump_timer == 0)
        {
            velocity.z += jump_speed * time;
            jump_timer = JUMP_COOLDOWN;         
            return true;
        }
        return false;
    }

}

class SurfaceMovement 
{
    // State settings
    public var WALK_SPEED:Number;
    public var WALKBACK_SPEED:Number;
    public var STRAFE_SPEED:Number;

    // State for thing
    // delta walk/strafe state (-1 for backwards/left, 0 for neither direction, 1 for forwards/right)
    public var walk_state:int; 
    public var strafe_state:int;
    
    public static const WALK_FORWARD:int = 1;
    public static const WALK_STOP:int = 0;
    public static const WALK_BACK:int = -1;

    public static const STRAFE_LEFT:int = -1;
    public static const STRAFE_STOP:int = 0;
    public static const STRAFE_RIGHT:int = 1;
    
    // Normalized forward direction along surface
    public var forwardVec:Vector3D;
    public var rightVec:Vector3D;
    public var friction:Number;

    
    

    public function SurfaceMovement() 
    {
        walk_state = 0;
        strafe_state = 0;
        forwardVec = new Vector3D();
        rightVec = new Vector3D();
        friction = .25;
        
        setWalkSpeeds(16);
        setStrafeSpeed(10);
    }
    
    public function setWalkSpeeds(forwardSpeed:Number, backspeed:Number = -1):void {
        WALK_SPEED = forwardSpeed;
        WALKBACK_SPEED = (backspeed != -1) ? backspeed : forwardSpeed; 
    }
    public function setStrafeSpeed(val:Number):void {
        STRAFE_SPEED = val;
    }
    public function setAllSpeeds(val:Number):void {
        WALK_SPEED = val;
        WALKBACK_SPEED  = val;
        STRAFE_SPEED = val;
    }
        
    public function respond_move_forward():void {
        walk_state = 1;
    }
    public function respond_move_back():void {
        walk_state = -1;
    }
    public function respond_move_stop():void {
        walk_state = 0;
    }
    
    public function respond_strafe_left():void {
        strafe_state = -1;
    }
    public function respond_strafe_right():void {
        strafe_state = 1;
    }
    public function respond_strafe_stop():void {
        strafe_state = 0;
    }

    
    public function update(time:Number, position:Vector3D, rotation:Vector3D, velocity:Vector3D, ground_normal:Vector3D = null):void {
        
        var multiplier:Number;
        
        if (ground_normal != null) { // can walk on ground
            velocity.x *= friction;
            velocity.y *= friction;
            velocity.z *= friction;
            
            /*
             * Math.cos(this.thingBase.azimuth) * Math.cos(this.thingBase.elevation), Math.sin(this.thingBase.azimuth) * Math.cos(this.thingBase.elevation)
             */
            forwardVec.x = -Math.sin(rotation.z); //Math.cos(rotation.z) * Math.cos(rotation.y);  // frm rotation.z azimith
            forwardVec.y = Math.cos(rotation.z);//Math.sin(rotation.z) * Math.cos(rotation.y); // frm rotation.x pitch.  //* Math.cos(rotation.x)
            forwardVec.z = 0;
            if (forwardVec.dotProduct(ground_normal) > 0) {
                multiplier = ground_normal.x * forwardVec.x + ground_normal.y * forwardVec.y + ground_normal.z * forwardVec.z;
                forwardVec.x -= ground_normal.x * multiplier;
                forwardVec.y -= ground_normal.y * multiplier;
                forwardVec.z -= ground_normal.z * multiplier;
            }
            forwardVec.normalize();
            
            if (walk_state != 0 ) {
                multiplier = (walk_state != WALK_BACK) ? WALK_SPEED : -WALKBACK_SPEED;
                velocity.x += forwardVec.x * multiplier;
                velocity.y += forwardVec.y * multiplier;
                velocity.z += forwardVec.z * multiplier;
    
            }
            
            rightVec = forwardVec.crossProduct(ground_normal);  // TODO: inline
            rightVec.normalize();
            if (strafe_state != 0) {
                multiplier = strafe_state != STRAFE_LEFT ? STRAFE_SPEED : -STRAFE_SPEED;
                velocity.x += rightVec.x * multiplier;
                velocity.y += rightVec.y * multiplier;
                velocity.z += rightVec.z * multiplier;
            }
        }
        
    }

}


/**
 * Quake-like physics static controller or stateful component.
 * @author Glidias
 */
class QPhysics 
{
    public static const FLAG_STICKY:int = 8;
    public static const FLAG_DAMPING:int = 4;
    public static const FLAG_BOUNCE:int = 2;
    public static const FLAG_GRAVITY:int = 1;
    
    // State settings
    public var FLAGS:int;
    public var T_BOUNCE:Number;
    public var TAU_DAMP:Number;
    public var N_BOUNCE:Number;

    
    public static var GRAVITY:Number = 40;
    
    public function QPhysics(flags:int=0) {    
    
        FLAGS = flags;
        N_BOUNCE = 0.5;
        T_BOUNCE = 0.9;
        TAU_DAMP = .9;
    }

    public function applyBounce(collisions:CollisionEvent, velocity:Vector3D):void {
        var coll:CollisionEvent = collisions;
        applyBounceWith(velocity, coll.normal, T_BOUNCE, N_BOUNCE);
        coll = coll.next;
        while (coll != null) {
            applyBounceWith(velocity, coll.normal, T_BOUNCE, N_BOUNCE);
            coll = coll.next;
        }
    }
    public static function applyBounceWith(velocity:Vector3D, normal:Vector3D, T_BOUNCE:Number, N_BOUNCE:Number):void {
        var pushBack:Number = normal.dotProduct( velocity);
        var addVel:Vector3D = normal.clone();
        addVel.scaleBy(-pushBack);
        velocity.add(addVel);
        velocity.scaleBy(T_BOUNCE);
        addVel.scaleBy(N_BOUNCE);
        velocity.add(addVel);
    }
    

    
    public function update(time:Number,  velocity:Vector3D, rotation:Vector3D = null, ang_velocity:Vector3D=null):void {
        if (rotation != null) {
            rotation.x += ang_velocity.x * time; // roll
            rotation.y += ang_velocity.y * time; // elevation
            rotation.z += ang_velocity.z * time; // azimuth 
        }
        if ( (FLAGS & FLAG_DAMPING) != 0)
        {
            velocity.scaleBy(Math.exp((-time) / TAU_DAMP)); // need to check on this.
        }
        if ( (FLAGS & FLAG_GRAVITY) != 0)
        {
            velocity.z -= GRAVITY * time;
        }
        
    }

}


class CollisionEvent {
    
    public var collision:Vector3D = new Vector3D();
    public var normal:Vector3D = new Vector3D();
    public var offset:Number;
    public var t:Number;
    
    public static var COLLECTOR:CollisionEvent = new CollisionEvent();
    public var next:CollisionEvent;
    
    public function CollisionEvent() 
    {
    
    }
    
        
    // Pooling, linked list and disposal
    public static function Get(collision:Vector3D, normal:Vector3D, offset:Number, t:Number, geomtype:int):CollisionEvent {
        var c:CollisionEvent = COLLECTOR || (COLLECTOR = new CollisionEvent());
        COLLECTOR = COLLECTOR.next;

        c.next = null;
        
        c.collision.x = collision.x;
        c.collision.y = collision.y;
        c.collision.z = collision.z;
        c.normal.x = normal.x;
        c.normal.y = normal.y;
        c.normal.z = normal.z;
        c.offset = offset;
        c.t = t;
       // c.geomtype = geomtype;
        
        return c;
    }
    

    public function get(collision:Vector3D, normal:Vector3D, offset:Number, t:Number, geomtype:int):CollisionEvent {
        //return Get(collision, normal, offset, t, geomtype);
        var c:CollisionEvent = COLLECTOR || (COLLECTOR = new CollisionEvent());
        COLLECTOR = COLLECTOR.next;

        c.next = null;
        
        c.collision.x = collision.x;
        c.collision.y = collision.y;
        c.collision.z = collision.z;
        c.normal.x = normal.x;
        c.normal.y = normal.y;
        c.normal.z = normal.z;
        c.offset = offset;
        c.t = t;
       // c.geomtype = geomtype;
        
        return c;
    }
    
    
    public function dispose():void {    
        next = COLLECTOR;
        COLLECTOR = this;
    }
    

}




//}
//Danbord.as
//ダンボーの生成とモーション
//package {
    //Alternativa3D
    import alternativa.engine3d.core.Object3DContainer;
    import alternativa.engine3d.materials.TextureMaterial;
    import alternativa.engine3d.primitives.Box;
    import alternativa.engine3d.primitives.Plane;
    import alternativa.engine3d.alternativa3d;
    use namespace alternativa3d;
        
    //public 
    class Danbord extends Object3D {
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
        
        public var danHead:Object3DContainer;
        public var danBody:Object3D;
        public var danSldL:Object3D;
        public var danSldR:Object3D;
        public var danArmL:Object3D;
        public var danArmR:Object3D;
        public var danKneL:Object3D;
        public var danKneR:Object3D;
        public var danLegL:Object3D;
        public var danLegR:Object3D;
        public var danSktL:Object3D;
        public var danSktR:Object3D;
        public var danSktF:Object3D;
        public var danSktB:Object3D;
        
        private var danUpper:Object3D;

        private var motionR:Number = 0;
        private var motionType:String = "stand";
        private var motionTypes:Vector.<String>;
        //
        private var textures:Textures;
        
        public var bodyR:Number = 0;
        public var sp:Number = 0;
        public var spZ:Number = 0;
        public var ground:Boolean = true;
        
        public var kage:Kage;
        
        private var brushes:Vector.<Object3D>;
        
        private static var RENDERER:BSPTreeRendererI;
        
        // Must call this method once to setup renderer!
        public function setupRenderer(camera:Camera3D):void {  
            RENDERER = new BSPTreeRendererI(camera, new BSPXMLNode(getBSPXML(), this, brushes) );
        }
        
        override alternativa3d function draw(camera:Camera3D, parentCanvas:Canvas):void {
            calculateInverseMatrix();
             danBody.composeAndAppend(this);
             danUpper.composeAndAppend(danBody);
             
                boxBody.composeAndAppend(danUpper);             boxBody.calculateInverseMatrix();
                danHead.composeAndAppend(danUpper);  
                    boxHead.composeAndAppend(danHead);         boxHead.calculateInverseMatrix();
                danSldL.composeAndAppend(danUpper);
                   boxSldL.composeAndAppend(danSldL);         boxSldL.calculateInverseMatrix();
                   danArmL.composeAndAppend(danSldL);
                        boxArmL.composeAndAppend(danArmL);   boxArmL.calculateInverseMatrix();
                danSldR.composeAndAppend(danUpper);
                    boxSldR.composeAndAppend(danSldR);          boxSldR.calculateInverseMatrix();
                    danArmR.composeAndAppend(danSldR);
                        boxArmR.composeAndAppend(danArmR);   boxArmR.calculateInverseMatrix();
                danKneL.composeAndAppend(danBody);
                    boxKneL.composeAndAppend(danKneL);          boxKneL.calculateInverseMatrix();
                   danLegL.composeAndAppend(danKneL);
                       boxLegL.composeAndAppend(danLegL);      boxLegL.calculateInverseMatrix();
                danKneR.composeAndAppend(danBody);
                    boxKneR.composeAndAppend(danKneR);         boxKneR.calculateInverseMatrix();
                    danLegR.composeAndAppend(danKneR);
                       boxLegR.composeAndAppend(danLegR);     boxLegR.calculateInverseMatrix();
                danSktL.composeAndAppend(danUpper);
                   planeSktL.composeAndAppend(danSktL);      planeSktL.calculateInverseMatrix();
                danSktR.composeAndAppend(danUpper);
                    planeSktR.composeAndAppend(danSktR);     planeSktR.calculateInverseMatrix();
                danSktF.composeAndAppend(danUpper);
                    planeSktF.composeAndAppend(danSktF);     planeSktF.calculateInverseMatrix();
                danSktB.composeAndAppend(danUpper);
                    planeSktB.composeAndAppend(danSktB);     planeSktB.calculateInverseMatrix();
                    
                RENDERER.draw(parentCanvas, brushes, culling);
                
                //Debug.drawBounds(camera, parentCanvas.getChildCanvas(true, false, this), this, boundMinX, boundMinY, boundMinZ, boundMaxX, boundMaxY, boundMaxZ);
                
        
                
                    
        }

        
        public function getBSPXML():XML {
            boxHead._parent = danHead;
            return <bsp>
                <back>{_(boxHead)}</back>
                <front>
                    <front>
                        <front>{_(planeSktL)}</front>
                        <back>
                            <back>{_(boxSldL)}</back>
                            <front>{_(boxArmL)}</front>
                            {planeOf(boxSldL, "bottom")}
                        </back>
                        {planeOf(planeSktL, "bottom")}
                    </front>
                    <back>
                        <front>
                            <front>{_(planeSktR)}</front>
                            <back>
                                <back>{_(boxSldR)}</back>
                                <front>{_(boxArmR)}</front>
                                {planeOf(boxSldR, "bottom")}
                            </back>
                            {planeOf(planeSktR, "bottom")}
                        </front>
                        <back>
                            <front>{_(planeSktF)}</front>    
                            <back>
                                <front>{_(planeSktB)}</front>
                                <back>
                                    <front>
                                        <front>{_(boxLegL)}</front>
                                        <back>{_(boxLegR)}</back>
                                        {planeOf(boxLegR, "left")}
                                    </front>
                                    <back>{_(boxBody)}</back>
                                    {planeOf(boxBody, "bottom")}
                                </back>
                                {planeOf(boxBody, "back")}
                            </back>
                            {planeOf(boxBody, "bodyFront")}
                        </back>
                        {planeOf(boxBody, "right")}
                    </back>
                    {planeOf(boxBody, "left")}
                </front>
                {planeOf(boxHead, "bottom")}
            </bsp>
        }

    
        /**
         * Gets face from mesh using material id
         * @param    mesh
         * @param    matId
         * @return
         */
        private static function getFaceOf(mesh:Mesh, matId:String):Face {
            var face:Face = mesh.faceList;
            while ( face) {
                if (face.material && face.material.name === matId) {
                
                    return face;
                }
                face = face.next;
            }
            throw new Error("could not find face by matId:"+matId);
            return null;
        }
        
                
        public function planeOf(mesh:Mesh, matId:String, animated:Boolean=true):XML {
            var face:Face = getFaceOf(mesh, matId);
            return <plane animated={animated}>
                <nx>{face.normalX}</nx>
                <ny>{face.normalY}</ny>
                <nz>{face.normalZ}</nz>
                <offset>{face.offset}</offset>
                <brush>{brushes.indexOf(mesh)}</brush>
            </plane>;
        }
        
        /**
         * Gets brush index of brush for bsp xml node
         * @param    searchBrush
         * @return    The brush index xml node
         */
        private function _(searchBrush:Object3D):XML {
            return <brush>{brushes.indexOf(searchBrush)}</brush>;
        }
        

    

        
        //ダンボー
        public function Danbord(_textures:Textures):void {
            textures = _textures;
            //
            //パーツを埋め込むコンテナの作成（回転軸を中心以外の場所にしたいためコンテナに埋め込んでます）
            
            // 14 dans
            danHead = new Object3DContainer();
            danBody = new Object3D();
            danSldL = new Object3D();
            danSldR = new Object3D() ;
            danArmL = new Object3D();
            danArmR = new Object3D();
            danKneL = new Object3D();
            danKneR = new Object3D();
            danLegL = new Object3D();
            danLegR = new Object3D() ;
            danSktL = new Object3D();
            danSktR = new Object3D();
            danSktF = new Object3D();
            danSktB = new Object3D();
            
            danUpper = new Object3D();
            
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
            boundMinX = 0;
            boundMaxX = 0;
            boundMinY = 0;
            boundMaxY = 0;
            boundMinZ = 0;
            boundMaxZ = 0;
            
            // 10 box
            //パーツを作成
            boxBody = new Box(76, 60, 102, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboBodyFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxHead = new Box(160, 102, 102, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFace, textures.txMatDanboBottom, textures.txMatDanboHeadTop);
            boxSldL = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxSldR = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxArmL = new Box(106, 26, 26, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxArmR = new Box(106, 26, 26, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxKneL = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxKneR = new Box(20, 20, 20, 1, 1, 1, false, false, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxLegL = new Box(30, 56, 66, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
            boxLegR = new Box(30, 56, 66, 1, 1, 1, false, false, textures.txMatDanboLeft, textures.txMatDanboRight, textures.txMatDanboBack, textures.txMatDanboFront, textures.txMatDanboBottom, textures.txMatDanboTop);
    
            // 4 plane
            planeSktL = new Plane(60, 30, 1, 1, true, false, false, textures.txMatDanboLeft, textures.txMatDanboBottom);
            planeSktR = new Plane(60, 30, 1, 1, true, false, false, textures.txMatDanboRight, textures.txMatDanboBottom);
            planeSktF = new Plane(76, 30, 1, 1, true, false, false, textures.txMatDanboFront, textures.txMatDanboBottom);
            planeSktB = new Plane(76, 30, 1, 1, true, false, false, textures.txMatDanboBack, textures.txMatDanboBottom);
    
            //ステージに追加（パーツごとに親子関係になっています）
            brushes = new Vector.<Object3D>(14, true);
            brushes[0] = boxBody;  boxBody.sorting = 0;
            brushes[1] = boxHead;  boxHead.sorting = 0;
            brushes[2] = boxSldL;  boxSldL.sorting = 0;
            brushes[3] = boxSldR;  boxSldR.sorting = 0;
            brushes[4] = boxArmL;  boxArmL.sorting = 0;
            brushes[5] = boxArmR;  boxArmR.sorting = 0;
            brushes[6] = boxKneL;  boxKneL.sorting = 0;
            brushes[7] = boxKneR;  boxKneR.sorting = 0;
            brushes[8] = boxLegL;  boxLegL.sorting = 0;
            brushes[9] = boxLegR;  boxLegR.sorting = 0;
            brushes[10] = planeSktL;  planeSktL.sorting = 0;
            brushes[11] = planeSktR;  planeSktR.sorting = 0;
            brushes[12] = planeSktF;  planeSktF.sorting = 0;
            brushes[13] = planeSktB;  planeSktB.sorting = 0;
            
            
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
         //   motionTypes[3] = "jump";
            
          //  bodyR = Math.random() * Math.PI * 2;
            //danBody.rotationZ = bodyR;
            //setMotionRandom();
            


        }
        
        public var motionI:int = 0;
        
        //モーションを設定
        public function setMotion(_motion:String):void {
            if(motionType != _motion){
                motionType = _motion;
                motionR = 0;
                motionI = 0;
                danBody.rotationX = 0;
                danBody.rotationY = 0;
                switch(_motion) {
                    case "stand":
                        sp = 0;
                        break;
                    case "walk":
                        bodyR = Math.random() * Math.PI * 2;
                       // danBody.rotationZ = bodyR
                        sp = (2 + Math.random() * 2) * scaleX;
                        break;
                    case "dash":
                        bodyR = Math.random() * Math.PI * 2;
                       // danBody.rotationZ = bodyR
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
        
        public static const MOTION_TIMES:Object = {
            stand: 0.03,
            walk: 0.1,
            dash: 0.23
            //jump: 0.23
        }
        
        public static var STAND:DangBoardClip;
        public static var WALK:DangBoardClip;
        public static var DASH:DangBoardClip;
        
        public static function precomputeAll():void {
            STAND = precompute("stand");
            WALK = precompute("walk");
            DASH = precompute("dash");
        }
        
        private static function precompute(motionType:String):DangBoardClip {
            var clip:DangBoardClip = new DangBoardClip();
			clip.name = motionType;

            var amt:Number = MOTION_TIMES[motionType];
            var units:int = Math.round( 2 * Math.PI / amt );
            clip.motionR = amt = 2 * Math.PI / units;
            
            for (var i:int = 0 ; i < units; i++) {
                var frame:DangBoardFrame =  new DangBoardFrame();
                clip.frames[clip.frameLen++] = frame;
                var motionR:Number = i * amt;
                  switch(motionType) {
                    case "stand":
                        frame.danBody_z = 0;
                        frame.danHead_rotationX = Math.sin(-motionR) * 0.04;
                        frame.danArmL_rotationY = Math.sin(-motionR) * 0.1 + -1.3;
                        frame.danArmR_rotationY = Math.sin(motionR) * 0.1 + 1.3;
                        frame.danSldL_rotationX = 0;
                        frame.danSldR_rotationX = 0;
                        frame.danLegL_rotationX = 0;
                        frame.danLegR_rotationX = 0;
                        frame.danKneL_rotationY = 0;
                        frame.danKneR_rotationY = 0;
                        break;
                    case "walk":
                        frame.danBody_z = Math.sin(motionR * 2) * 3 + 3;
                        frame.danHead_rotationX = Math.cos(motionR*2) * 0.03;
                        frame.danArmL_rotationY = -1.3;
                        frame.danArmR_rotationY = 1.3;
                        frame.danSldL_rotationX = Math.sin(-motionR) * 0.3;
                        frame.danSldR_rotationX = Math.sin(motionR) * 0.3;
                        frame.danLegL_rotationX = Math.sin(motionR) * 0.4;
                        frame.danLegR_rotationX = Math.sin( -motionR) * 0.4;
                        frame.danKneL_rotationY = 0;
                        frame.danKneR_rotationY = 0;
                        break;
                    case "dash":
                        frame.danBody_z = Math.sin(motionR * 2) * 8 + 8;
                        frame.danHead_rotationX = Math.cos(motionR*2) * 0.05;
                        frame.danArmL_rotationY = -1.3;
                        frame.danArmR_rotationY = 1.3;
                        frame.danSldL_rotationX = Math.sin(-motionR) * 0.6;
                        frame.danSldR_rotationX = Math.sin(motionR) * 0.6;
                        frame.danLegL_rotationX = Math.sin(motionR) * 0.6;
                        frame.danLegR_rotationX = Math.sin( -motionR) * 0.6;
                        frame.danKneL_rotationY = 0;
                        frame.danKneR_rotationY = 0;
                        break;
                    /*
                    case "jump":
                        frame.danBody_z = 0;
                        frame.danHead_rotationX = Math.max(Math.min(spZ * 0.1, 0.8), -0.5);
                        frame.danArmL_rotationY = -Math.max(Math.min(spZ * 0.2, 1.4), -0.2);
                        frame.danArmR_rotationY = Math.max(Math.min(spZ * 0.2, 1.4), -0.2);
                        frame.danSldL_rotationX = 0;
                        frame.danSldR_rotationX = 0;
                        frame.danKneL_rotationY = -Math.max(Math.min(spZ * 0.2, 0), -0.2);
                        frame.danKneR_rotationY = Math.max(Math.min(spZ * 0.2, 0), -0.2);
                        frame.danLegL_rotationX = 0;
                        frame.danLegR_rotationX = 0;
                        break;
                    */
                    default :
                        break;
                }
            }
			
			
            

            return clip;
        }
        
        
         public function enterFrameEvent2() :void {
        
            //danUpper.rotationZ += .1;
        //    danHead.rotationZ += .1;
         //   danBody.rotationZ = bodyR;
            var clip:DangBoardClip;
            switch(motionType) {
                case "stand": 
                    clip = STAND;
                    danBody.y = 0;
                break;
                case "walk":
                    clip = WALK;
                break;
                case "dash":
                    clip = DASH;
                 
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
                    
                    return;
                default :
                    return;
                    
            }
            
            
            if (motionI >= clip.frameLen) motionI = 0;
            var frame:DangBoardFrame = clip.frames[motionI];
                    
                    danBody.z = frame.danBody_z;
                    danHead.rotationX = frame.danHead_rotationX;
                    danArmL.rotationY = frame.danArmL_rotationY
                    danArmR.rotationY = frame.danArmR_rotationY
                    danSldL.rotationX = frame.danSldL_rotationX
                    danSldR.rotationX = frame.danSldR_rotationX
                    danKneL.rotationY = frame.danKneL_rotationY
                    danKneR.rotationY = frame.danKneR_rotationY
                    danLegL.rotationX = frame.danLegL_rotationX
                    danLegR.rotationX = frame.danLegR_rotationX
                    
            motionI++;
             
             
         }
        
      
    
    }
//}
//Kage.as
//影
//package {
    //Alternativa3D
    import alternativa.engine3d.primitives.Plane;
        
    //public 
    class Kage extends Plane {
        
      
        public function Kage(textures:Textures):void {
           super(200, 200, 1, 1, true, false, false, textures.txMatKage, textures.txMatKage);
        }
    }
//}





//package bsp 
//{
    /**
     * Generic cross-platform BSP node construct for any engine
     * @author Glenn Ko
     */
    //public 
    class BSPNode 
    {
        public var front:BSPNode;
        public var back:BSPNode;
        public var brushIndex:int = -1;
        public var normalX:Number;
        public var normalY:Number;
        public var normalZ:Number;
        public var offset:Number;
        
        
        public function BSPNode() 
        {
            
        }
        
        /** Recursively counts the number of nodes in this tree (including this). */
        public function size():int
        {
            var c:int = 1;
            if (front) { 
                 // assumption made both available
                c += front.size();
                c += back.size();  
            }
            return c;
        }
        

    }
        
    
//}


//package bsp 
//{
    import alternativa.engine3d.core.Object3D;
    import alternativa.engine3d.alternativa3d;
    import alternativa.engine3d.core.Object3DContainer;
    use namespace alternativa3d;
    
    /**
     * Custom xml parsing construct of BSPNode for Alternativa3D on animatable brush-based entities
     * @author Glenn Ko
     */
    //public 
    class BSPXMLNode extends BSPNode
    {
        
        
        public function BSPXMLNode(xml:XML, rootBrush:Object3D, brushContext:Vector.<Object3D>) 
        {
            var planeXML:XML;
            
            // Node validation
            //#if debug
            ///*
            if ( xml.hasOwnProperty("front") || xml.hasOwnProperty("back") ) {
                if (!(xml.hasOwnProperty("front") && xml.hasOwnProperty("back"))) {
                    throw new Error("Do not have both front and back!");
                }
                planeXML = xml.hasOwnProperty("plane") ? xml.plane[0] : null;
                if (planeXML == null) throw new Error("Could not find split plane node <plane>!");
                if ( !planeXML.hasOwnProperty("nx") || !planeXML.hasOwnProperty("ny") || !planeXML.hasOwnProperty("nz") || !planeXML.hasOwnProperty("offset") ) {
                    throw new Error("Do not have valid plane variables!");
                }
            }
            else if (!xml.hasOwnProperty("brush")) {
                throw new Error("No leaf node brush reference found!!");
            }
            
            //*/
            //#end
            
            
            if (xml.hasOwnProperty("front")) {  
                planeXML = xml.plane[0];
                normalX = Number(planeXML.nx[0]);    
                normalY = Number(planeXML.ny[0]);
                normalZ = Number(planeXML.nz[0]);
                offset = Number(planeXML.offset[0]);  
                brushIndex = planeXML.hasOwnProperty("brush") ? int(planeXML.brush[0]) : -1;  
                front = new BSPXMLNode(xml.front[0], rootBrush, brushContext);
                back = new BSPXMLNode(xml.back[0], rootBrush, brushContext);
            }
            else {
                brushIndex = int(xml.brush[0]);
            }    
            
            
            
        }
        
        
    }

//}

//package bsp 
//{
    import alternativa.engine3d.core.Camera3D;
    import alternativa.engine3d.core.Canvas;
    import alternativa.engine3d.core.Object3D;
    import alternativa.engine3d.alternativa3d;
    use namespace alternativa3d;
    /**
     * @author Glenn Ko
     */
    //public 
    class BSPTreeRendererI
    {
        public var rootNode:BSPNode;
        public var camera:Camera3D;
        
        private var stack:Vector.<BSPNode>;
        private var stackResults:Vector.<BSPNode>;
        
        /**
         * 
         * @param    camera        The camera for rendering
         * @param    rootNode    Reference bsp model node to use for rendering.
         */
        public function BSPTreeRendererI(camera:Camera3D, rootNode:BSPNode ) 
        {
            this.camera = camera;
            this.rootNode = rootNode;
            stack = new Vector.<BSPNode>( rootNode.size(), true ); 
            stackResults = new Vector.<BSPNode>( stack.length, true ); 
        }
		
		
		/*
		public function collectVG(faceContext:Vector.<Face>):VG {
			
		}
		*/
        
        /**
         * Draw brushes onto canvas through iterative bsp traversal
         * @param    canvas            The canvas being 
         * @param   rootBrush        Usually the entity being drawn     // rootBrush:Object3D,        
         * @param    brushContext    Any related brushes for the entity to be drawn/referenced 
         *                             for split-planes/leafs.
         */
        public function draw(canvas:Canvas,  brushContext:Vector.<Object3D>, culling:int):void {
            // drawing vars
            var brush:Object3D;
        
            // node vars
            var node:BSPNode;
            var top:int = 0;
            var prev:BSPNode;
            var prevResult:BSPNode; 
        
            stack[top++] = rootNode;

            while (top != 0) {
                node = stack[top - 1];
                
                if (!node.front) { // No more children, so spit leaf out for drawing
                    top--;
                    // todo: inline drawing of faces if rootNode is BSPNodeNiva
                    brush = brushContext[node.brushIndex];
                  //  if (brush.cullingInCamera(camera, culling) >= 0) 
					brush.culling = culling;
					brush.draw(camera, canvas); 
                    
                    prev = node;
                    continue;
                }
                 // got children to recurse into     
                if (!prev || prev.front === node || prev.back === node) {  // if curr node is child of previous
                    //brush = node.brushIndex >= 0 ?  brushContext[node.brushIndex] : rootBrush;
                    brush = brushContext[node.brushIndex];
                    stackResults[top - 1] = prevResult =  brush.imd * node.normalX + brush.imh * node.normalY  + brush.iml * node.normalZ > node.offset ? node.front : node.back;
                
                    stack[top++] = prevResult;
                    prev = node;
                    continue;
                }
                else if ( (prevResult = stackResults[top - 1]) === prev ) { // if curr node's initial result was the previous, recurse other side as well
                
                    stack[top++] = prevResult === node.back ? node.front :  node.back;
                    prev = node;
                    continue;
                }    
                top--;
                prev = node;
            }
        }

    }

//}


class DangBoardFrame {

    public var danBody_z:Number;
          public var           danHead_rotationX :Number;
          public var           danArmL_rotationY:Number;
           public var          danArmR_rotationY:Number;
          public var           danSldL_rotationX :Number;
           public var          danSldR_rotationX:Number;
           public var          danLegL_rotationX:Number;
            public var        danLegR_rotationX:Number;
            public var         danKneL_rotationY :Number;
          public var           danKneR_rotationY:Number;
		  

	public function getCSS(clipName:String):String {
		return (
		"."+clipName+".danbot .danHead { -webkit-transform:rotateX(" + danHead_rotationX + ");}" +
		"."+clipName+".danbot .danArmL { -webkit-transform:rotateY(" + danArmL_rotationY + ");}" +
		"."+clipName+".danbot .danArmR { -webkit-transform:rotateY(" + danArmR_rotationY + ");}" +
		"."+clipName+".danbot .danSldL { -webkit-transform:rotateX(" + danSldL_rotationX + ");}" +
		"."+clipName+".danbot .danSldR { -webkit-transform:rotateX(" + danSldR_rotationX + ");}" +
		"."+clipName+".danbot .danLegL { -webkit-transform:rotateX(" + danLegL_rotationX + ");}" +
		"."+clipName+".danbot .danLegR { -webkit-transform:rotateX(" + danLegR_rotationX + ");}" +
		"."+clipName+".danbot .danKneL { -webkit-transform:rotateY(" + danKneL_rotationY + ");}" +
		"."+clipName+".danbot .danKneR { -webkit-transform:rotateY(" + danKneR_rotationY + ";}" 
		);
	} 

}

class DangBoardClip {
    public var motionR:Number;
    public var frameLen:int = 0;
    public var frames:Vector.<DangBoardFrame> = new Vector.<DangBoardFrame>();
	public var name:String;
	
	public function getCSS(danbo:Danbord):String {

		var str:String = "";
	
		str += getBodyPart(danbo, "danHead", "rotateX", "rotationX");
		str += getBodyPart(danbo, "danArmL", "rotateX", "rotationY", 1);
		str += getBodyPart(danbo, "danArmR", "rotateX", "rotationY", 1);
		str += getBodyPart(danbo, "danSldL", "rotateX", "rotationX");
		str += getBodyPart(danbo, "danSldR", "rotateX", "rotationX");
		str += getBodyPart(danbo, "danLegL", "rotateX", "rotationX");
		str += getBodyPart(danbo, "danLegR", "rotateX", "rotationX");
		str += getBodyPart(danbo, "danKneL", "rotateY", "rotationY", 1);
		str += getBodyPart(danbo, "danKneR", "rotateY", "rotationY", 1);

		
		 return str;
		 
	}
	
		private function convertNestedObjMatrix(matrix:Matrix3D):Vector.<Number> {
			var dummy:Object3D = new Object3D();
			dummy.matrix = matrix;
			dummy.rotationY *= -1;
			dummy.rotationZ *= -1;
			dummy.y *= -1;
			dummy.z *= -1;
			
			return precisionMatrix(dummy.matrix);
		}
		private function convertNestedObj(plane:Object3D):Vector.<Number> {
			return convertNestedObjMatrix(plane.matrix);
		}
		
		private function precisionMatrix(mat:Matrix3D):Vector.<Number> {
			var data:Vector.<Number>  = mat.rawData;
			const PRECISION_AMT:uint = 4;
			for (var i:int = 0; i < 16; i++) {
				data[i] = precision( data[i], PRECISION_AMT );
			}
			return data.concat();
		}
		private  function precision(val:Number, decimalPlaces:uint):Number{
            var multiplier:uint = Math.pow(10, decimalPlaces);
            var truncatedVal:Number = val*multiplier;

            if (truncatedVal > int.MAX_VALUE){

                       return Number(truncatedVal.toFixed(decimalPlaces));
            }              
            return int(truncatedVal)/multiplier;

		}
	
	private function getBodyPart(danbo:Object, bodyPart:String, cssProperty:String, property:String, mult:Number =1):String {
		var lastPerc:int = -1;
		var len:int = frames.length;
		var animName:String = name + "-" + bodyPart;
		var str:String = ".danbot."+name+" ." + bodyPart + " { -webkit-animation:"+animName+" "+Math.round(len/30)+"s infinite; }";
		str += "@-webkit-keyframes "+animName+" { ";
		var i:int;
		var bodyPart3D:Object3D = danbo[bodyPart];
		var bodyMatrixStr:String = convertNestedObj(bodyPart3D).join(","); // get bind pose matrix values
		const radDeg:Number = 180 / Math.PI;
		//bodyPart3D.matrix;
		
		property = bodyPart + "_" + property;
		for (i = 0; i < len; i++) {
			var perc:int = Math.round(i / len * 100);
			if (lastPerc == perc) continue;
			
			str += perc + "% { -webkit-transform:matrix3d("+bodyMatrixStr+") "+cssProperty+"(" + Math.round(frames[i][property]*mult*radDeg) + "deg); }";
			lastPerc = perc;
		}
		
		str += " }";
		return str;
	}
 
	
}

// -- Other utilities/classes



import flash.utils.Dictionary;
import flash.events.KeyboardEvent;
import flash.display.Stage;

    class KeyBinder {
        protected var _keys : flash.utils.Dictionary;
        public function KeyBinder(stage : flash.display.Stage = null) : void {
            this._keys = new flash.utils.Dictionary();
            if(stage != null) this.setupStageListeners(stage);
        }
        
        public function setupStageListeners(stage : flash.display.Stage) : void {
            stage.addEventListener(flash.events.KeyboardEvent.KEY_UP,this.onKeyUp);
            stage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN,this.onKeyDown);
        }
        
        public function removeStageListeners(stage : flash.display.Stage) : void {
            stage.removeEventListener(flash.events.KeyboardEvent.KEY_UP,this.onKeyUp);
            stage.removeEventListener(flash.events.KeyboardEvent.KEY_DOWN,this.onKeyDown);
        }
        
        protected function onKeyDown(e : flash.events.KeyboardEvent) : void {
            if(this._keys[e.keyCode]) this._keys[e.keyCode](true);
        }
        
        protected function onKeyUp(e : flash.events.KeyboardEvent) : void {
            if(this._keys[e.keyCode]) this._keys[e.keyCode](false);
        }
        
        public function bindKey(key : int,method : *) : void {
            this._keys[key] = method;
        }
        
        public function hasBinding(key : int) : Boolean {
            return this._keys[key] != null;
        }
        
        public function clear() : void {
            this._keys = new flash.utils.Dictionary();
        }
        
    }

    

    import alternativa.engine3d.core.Camera3D;
    import alternativa.engine3d.core.Object3D;
    import alternativa.engine3d.core.RayIntersectionData;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.geom.Vector3D;
    import flash.utils.Dictionary;
    import alternativa.engine3d.alternativa3d;
    use namespace alternativa3d;
    
    /**
     * Does adjustments to orbit controller for chase-cams/follow target in relation to entire environment
     * and various game-types.
     * 
     * @author Glidias
     */
     class OrbitCameraMan 
    {

        private var _followTarget:Object3D;
        public var controller:OrbitCameraController;
        
        protected var _preferedZoom:Number;
        public var maxFadeAlpha:Number = .8;
        public var minFadeAlpha:Number = .2;
        protected var _fadeDistance:Number = 200;
        public var useFadeDistance:Boolean = true;
        
        public var visBufferLength:Number = 0;
        public var preferedAlpha:Number = 1;
        
        public var followAzimuth:Boolean = false;
        public var followPitch:Boolean = false;
        protected static const ORIGIN:Vector3D = new Vector3D();
        protected var scene:Object3D;
        //x:  -45 * (Math.PI / 180)  
        
        public var cameraForward:Vector3D = new Vector3D();
        public var cameraReverse:Vector3D = new Vector3D();
        public var ignoreDict:Dictionary = new Dictionary();
        public var collideOffset:Number = 24;
        
        public var threshold:Number = 0.01;
        
    

        
        public var instant:Boolean = false;
        public var mouseWheelSensitivity:Number = 30;
        
        public function OrbitCameraMan(controller:OrbitCameraController, scene:Object3D, followTarget:Object3D=null) 
        {
            this._followTarget = followTarget || (controller._followTarget);
        
            this.scene = scene;
            this.controller = controller;
            _preferedZoom = controller.getDistance();
            ignoreDict[controller._followTarget] = true;
            controller.minPitch = Math.PI*.5;
        }
        
        /*
             _object.x += -Math.sin(_object.rotationZ) * 120;
            _object.y += Math.cos(_object.rotationZ) * 120;
        
            _object.x += forward.x * 120;
            _object.y += forward.y * 120;
            _object.z += forward.z * 120;
        */
        
        public function mouseWheelHandler(e:MouseEvent):void {
            var _lastLength:Number = controller.getDistance();
            _lastLength -= e.delta * mouseWheelSensitivity;
            if (_lastLength < controller.minDistance)
            {
                _lastLength = controller.minDistance
            }
            else if (_lastLength > controller.maxDistance)
            {
                _lastLength = controller.maxDistance
            }
            
            preferedZoom = _lastLength;
            
        }
        public function update():void {
            controller.update();

            var camera:Camera3D = controller._target;
        
            var camLookAtTarget:Object3D = controller._followTarget;
            if (followAzimuth) _followTarget.rotationZ = camera.rotationZ;
            if (followPitch) _followTarget.rotationX =  camera.rotationX + Math.PI * .5;
            
        
            
            camera.calculateRay(ORIGIN, cameraForward, camera.view._width*.5, camera.view._height*.5);            
        
            cameraReverse.x = -cameraForward.x;
            cameraReverse.y = -cameraForward.y;
            cameraReverse.z = -cameraForward.z;
            
            var data:RayIntersectionData = getBackRayIntersectionData( new Vector3D(camLookAtTarget.x + cameraForward.x*-threshold, camLookAtTarget.y + cameraForward.y*-threshold, camLookAtTarget.z + cameraForward.z*-threshold) );
        
                _followTarget.visible = true;
            var tarDist:Number = _preferedZoom;
            if (data != null) {
                
                //cameraReverse.normalize();
                data.point = data.object.localToGlobal(data.point);
                tarDist = data.point.subtract( new Vector3D(camLookAtTarget.x, camLookAtTarget.y, camLookAtTarget.z) ).length - collideOffset;
            
                if (tarDist > _preferedZoom) tarDist = _preferedZoom;
                if (tarDist < controller.minDistance) {
                    tarDist =  controller.minDistance;
                    
                }
                var limit:Number = (controller.minDistance + visBufferLength);
                _followTarget.visible = tarDist >= limit;
                
                if (useFadeDistance) {
                    limit = (tarDist - limit) / (_preferedZoom - _fadeDistance);
                    if (limit < 1) {
                        limit  = limit < 0 ? 0 : limit;
                        limit = minFadeAlpha + limit * (maxFadeAlpha - minFadeAlpha);
                        _followTarget.alpha = limit;
                    }
                    else _followTarget.alpha = preferedAlpha;
                }
                controller.setDistance(tarDist, instant);
                controller.setObjectPosXYZ(camera.x = camLookAtTarget.x +  cameraReverse.x * tarDist,
                camera.y= camLookAtTarget.y +  cameraReverse.y * tarDist,
                camera.z = camLookAtTarget.z +  cameraReverse.z * tarDist);
            
            }
            else  {
                
                controller.setDistance(tarDist, instant);
                if (useFadeDistance) _followTarget.alpha = preferedAlpha;
            }
            
            
            //*/
            
        }
        
        public function get sceneCollidable():Object3D {
            return scene;
        }
        protected function getBackRayIntersectionData(objPosition:Vector3D):RayIntersectionData 
        {
            return scene.intersectRay( objPosition, cameraReverse, ignoreDict);
        }
        
        public function get preferedZoom():Number 
        {
            return _preferedZoom;
        }
        
        public function set preferedZoom(value:Number):void 
        {
            _preferedZoom = value;
            controller.setDistance(value);
            
        }
        
        public function get fadeDistance():Number 
        {
            return _fadeDistance;
        }
        
        public function set fadeDistance(value:Number):void 
        {
            _fadeDistance = value;

        }
        
    }


    
    

    import alternativa.engine3d.containers.BSPContainer;
    import alternativa.engine3d.containers.ConflictContainer;
    import alternativa.engine3d.containers.DistanceSortContainer;
    import alternativa.engine3d.containers.KDContainer;
    import alternativa.engine3d.containers.LODContainer;
    import alternativa.engine3d.controllers.SimpleObjectController;
    import alternativa.engine3d.core.Camera3D;
    import alternativa.engine3d.core.Object3D;
    import alternativa.engine3d.core.Object3DContainer;
    import alternativa.engine3d.core.View;
    import flash.events.IEventDispatcher;

    import flash.display.DisplayObjectContainer;
    import flash.display.InteractiveObject;
    import flash.display.Sprite;
    import flash.display.StageAlign;
    import flash.display.StageQuality;
    import flash.display.StageScaleMode;
    import flash.events.Event;
    import flash.events.KeyboardEvent;
    import flash.events.MouseEvent;
    import flash.geom.Vector3D;
    import flash.ui.Keyboard;
    import flash.ui.Mouse;
    import flash.ui.MouseCursor;

    /**
     * GeoCameraController は 3D オブジェクトの周りに配置することのできるコントローラークラスです。
     * 緯度・経度で配置することができます。
     *
     * @author narutohyper
     * @author clockmaker
     *
     * @see http://wonderfl.net/c/fwPU
     *  @langversion 3.0
     *  @playerversion Flash 10
     *  @playerversion AIR 1.5
     */
    
    class OrbitCameraController extends SimpleObjectController
    {

        //----------------------------------------------------------
        //
        //   Static Property 
        //
        //----------------------------------------------------------

        /** 中心と方向へ移動するアクションを示す定数です。 */
        public static const ACTION_FORWARD:String = "actionForward";

        /** 中心と反対方向へ移動するアクションを示す定数です。 */
        public static const ACTION_BACKWARD:String = "actionBackward";

        /** イージングの終了判断に用いるパラメーターです。0〜0.2で設定し、0に近いほどイージングが残されます。 */
        private static const ROUND_VALUE:Number = 0.1;
        
        
        private var _lockRotationZ:Boolean = false;
        

        //----------------------------------------------------------
        //
        //   Constructor 
        //
        //----------------------------------------------------------

        /**
         * 新しい GeoCameraController インスタンスを作成します。
         * @param targetObject    コントローラーで制御したいオブジェクトです。
         * @param mouseDownEventSource    マウスダウンイベントとひもづけるオブジェクトです。
         * @param mouseUpEventSource    マウスアップイベントとひもづけるオブジェクトです。推奨は stage です。
         * @param keyEventSource    キーダウン/キーマップイベントとひもづけるオブジェクトです。推奨は stage です。
         * @param useKeyControl    キーコントロールを使用するか指定します。
         * @param useMouseWheelControl    マウスホイールコントロールを使用するか指定します。
         */
        public function OrbitCameraController(
            targetObject:Camera3D,
            followTarget:Object3D,
            mouseDownEventSource:InteractiveObject,
            mouseUpEventSource:InteractiveObject,
            keyEventSource:InteractiveObject,
            useKeyControl:Boolean = true,
            useMouseWheelControl:Boolean = true
            )
        {
            _target = targetObject;
            _followTarget = followTarget;

            super(mouseDownEventSource, targetObject, 0, 3, mouseSensitivity);
            super.mouseSensitivity = 0;
            super.unbindAll();
            super.accelerate(true);

            this._mouseDownEventSource = mouseDownEventSource;
            this._mouseUpEventSource = mouseUpEventSource;
            this._keyEventSource = keyEventSource;

            _mouseDownEventSource.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
            _mouseUpEventSource.addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
    
            // マウスホイール操作
            if (useMouseWheelControl)
            {
                _mouseDownEventSource.addEventListener(MouseEvent.MOUSE_WHEEL, mouseWheelHandler);
            }

            // キーボード操作
            if (useKeyControl)
            {
                _keyEventSource.addEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
                _keyEventSource.addEventListener(KeyboardEvent.KEY_UP, keyUpHandler);
            }
        }
        
        public function reset():void {
            _angleLongitude = 0;
            _lastLongitude = 0;
            _angleLatitude = 0;
        //    _mouseMove = false;
            if (useHandCursor)
                Mouse.cursor = MouseCursor.AUTO;
            
        }

        //----------------------------------------------------------
        //
        //   Property 
        //
        //----------------------------------------------------------

        //--------------------------------------
        // easingSeparator 
        //--------------------------------------

        private var _easingSeparator:Number = 1.5;

        /**
         * イージング時の現在の位置から最後の位置までの分割係数
         * フレームレートと相談して使用
         * 1〜
         * 正の整数のみ。0 を指定しても 1 になります。
         * 1 でイージング無し。数値が高いほど、遅延しぬるぬるします
         */
        public function set easingSeparator(value:uint):void
        {
            if (value)
            {
                _easingSeparator = value;
            }
            else
            {
                _easingSeparator = 1;
            }
        }
        /** Camera から、中心までの最大距離です。デフォルト値は 2000 です。 */
        public var maxDistance:Number = 2000;

        /** Camera から、中心までの最小距離です。デフォルト値は 200 です。 */
        public var minDistance:Number = 200;

        //--------------------------------------
        // mouseSensitivityX 
        //--------------------------------------

        private var _mouseSensitivityX:Number = -1;

        /**
         * マウスの X 方向の感度
         */
        public function set mouseSensitivityX(value:Number):void
        {
            _mouseSensitivityX = value;
        }

        //--------------------------------------
        // mouseSensitivityY 
        //--------------------------------------

        private var _mouseSensitivityY:Number = 1;

        /**
         * マウスの Y 方向の感度
         */
        public function set mouseSensitivityY(value:Number):void
        {
            _mouseSensitivityY = value;
        }

        public var multiplyValue:Number = 10;

        //--------------------------------------
        // needsRendering 
        //--------------------------------------

        private var _needsRendering:Boolean;

        /**
         * レンダリングが必要かどうかを取得します。
         * この値は update() メソッドが呼び出されたタイミングで更新されます。
         *
         * @see GeoCameraController.update
         */
        public function get needsRendering():Boolean
        {
            return _needsRendering;
        }

        //--------------------------------------
        // pitchSpeed 
        //--------------------------------------

        private var _pitchSpeed:Number = 5;

        /**
         * 上下スピード
         * 初期値は5(px)
         */
        public function set pitchSpeed(value:Number):void
        {
            _pitchSpeed = value
        }

        public var useHandCursor:Boolean = true;

        //--------------------------------------
        // yawSpeed 
        //--------------------------------------

        private var _yawSpeed:Number = 5;

        /**
         * 回転スピード
         * 初期値は5(度)
         */
        public function set yawSpeed(value:Number):void
        {
            _yawSpeed = value * Math.PI / 180;
        }

        /**
         * Zoomスピード
         * 初期値は5(px)
         */
        public function set zoomSpeed(value:Number):void
        {
            _distanceSpeed = value;
        }
        
        public function get lockRotationZ():Boolean 
        {
            return _lockRotationZ;
        }
        
        public function set lockRotationZ(value:Boolean):void 
        {
            _lockRotationZ = value;
        }
        
        public function get followTarget():Object3D 
        {
            return _followTarget;
        }
        
        public function get angleLatitude():Number 
        {
            return _angleLatitude;
        }
        
        public function set angleLatitude(value:Number):void 
        {
            _angleLatitude = value;
            _lastLatitude = value;
        }
        
        public function get angleLongitude():Number 
        {
            return _angleLongitude;
        }
        
        public function set angleLongitude(value:Number):void 
        {
            _angleLongitude = value;
            _lastLongitude = value;
        }
        
        public function get minAngleLatitude():Number 
        {
            return _minAngleLatitude;
        }
        
        public function set minAngleLatitude(value:Number):void 
        {
            _minAngleLatitude = value;
        }
        
        public function get maxAngleLatidude():Number 
        {
            return _maxAngleLatidude;
        }
        
        public function set maxAngleLatidude(value:Number):void 
        {
            _maxAngleLatidude = value;
        }
        


        private var _minAngleLatitude:Number = -Number.MAX_VALUE;
        private var _maxAngleLatidude:Number = Number.MAX_VALUE;

        private var _angleLatitude:Number = 0;
        private var _angleLongitude:Number = 0;
        private var _distanceSpeed:Number = 5;
        private var _keyEventSource:InteractiveObject;
        private var _lastLatitude:Number = 0;
        private var _lastLength:Number = 700;
        private var _lastLongitude:Number = _angleLongitude;
        private var _lastLookAtX:Number = _lookAtX;
        private var _lastLookAtY:Number = _lookAtY;
        private var _lastLookAtZ:Number = _lookAtZ;
        private var _length:Number = 700;
        private var _lookAtX:Number = 0;
        private var _lookAtY:Number = 0;
        private var _lookAtZ:Number = 0;
        private var _mouseDownEventSource:InteractiveObject;
        private var _mouseMove:Boolean;
        private var _mouseUpEventSource:InteractiveObject;
        private var _mouseX:Number;
        private var _mouseY:Number;
        private var _oldLatitude:Number;
        private var _oldLongitude:Number;
        private var _pitchDown:Boolean;
        private var _pitchUp:Boolean;
        private var _taregetDistanceValue:Number = 0;
        private var _taregetPitchValue:Number = 0;
        private var _taregetYawValue:Number = 0;
        public var _target:Camera3D
        private var _yawLeft:Boolean;
        private var _yawRight:Boolean;
        private var _zoomIn:Boolean;
        private var _zoomOut:Boolean;
        public var _followTarget:Object3D;

        //----------------------------------------------------------
        //
        //   Function 
        //
        //----------------------------------------------------------

        /**
         * 自動的に適切なキーを割り当てます。
         */
        public function bindBasicKey():void
        {
            bindKey(Keyboard.LEFT, SimpleObjectController.ACTION_YAW_LEFT);
            bindKey(Keyboard.RIGHT, SimpleObjectController.ACTION_YAW_RIGHT);
            bindKey(Keyboard.DOWN, SimpleObjectController.ACTION_PITCH_DOWN);
            bindKey(Keyboard.UP, SimpleObjectController.ACTION_PITCH_UP);
            bindKey(Keyboard.PAGE_UP, OrbitCameraController.ACTION_BACKWARD);
            bindKey(Keyboard.PAGE_DOWN, OrbitCameraController.ACTION_FORWARD);
        }

        /** 上方向に移動します。 */
        public function pitchUp():void
        {
            _taregetPitchValue = _pitchSpeed * multiplyValue;
        }

        /** 下方向に移動します。 */
        public function pitchDown():void
        {
            _taregetPitchValue = _pitchSpeed * -multiplyValue;
        }

        /** 左方向に移動します。 */
        public function yawLeft():void
        {
            _taregetYawValue = _yawSpeed * multiplyValue;
        }

        /** 右方向に移動します。 */
        public function yawRight():void
        {
            _taregetYawValue = _yawSpeed * -multiplyValue;
        }

        /** 中心へ向かって近づきます。 */
        public function moveForeward():void
        {
            _taregetDistanceValue -= _distanceSpeed * multiplyValue;
        }

        /** 中心から遠くに離れます。 */
        public function moveBackward():void
        {
            _taregetDistanceValue += _distanceSpeed * multiplyValue;
        }

        /**
         *　@inheritDoc
         */
        override public function bindKey(keyCode:uint, action:String):void
        {
            switch (action)
            {
                case ACTION_FORWARD:
                    keyBindings[keyCode] = toggleForward;
                    break
                case ACTION_BACKWARD:
                    keyBindings[keyCode] = toggleBackward;
                    break
                case ACTION_YAW_LEFT:
                    keyBindings[keyCode] = toggleYawLeft;
                    break
                case ACTION_YAW_RIGHT:
                    keyBindings[keyCode] = toggleYawRight;
                    break
                case ACTION_PITCH_DOWN:
                    keyBindings[keyCode] = togglePitchDown;
                    break
                case ACTION_PITCH_UP:
                    keyBindings[keyCode] = togglePitchUp;
                    break
            }
            //super.bindKey(keyCode, action)
        }

        /**
         * 下方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function togglePitchDown(value:Boolean):void
        {
            _pitchDown = value
        }

        /**
         * 上方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function togglePitchUp(value:Boolean):void
        {
            _pitchUp = value
        }

        /**
         * 左方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function toggleYawLeft(value:Boolean):void
        {
            _yawLeft = value;
        }

        /**
         * 右方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function toggleYawRight(value:Boolean):void
        {
            _yawRight = value;
        }

        /**
         * 中心方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function toggleForward(value:Boolean):void
        {
            _zoomIn = value;
        }

        /**
         * 中心と反対方向に移動し続けるかを設定します。
         * @param value    true の場合は移動が有効になります。
         */
        public function toggleBackward(value:Boolean):void
        {
            _zoomOut = value;
        }

        private var testLook:Vector3D = new Vector3D();
        /**
         * @inheritDoc
         */
        override public function update():void
        {
            const RADIAN:Number = Math.PI / 180;
            var oldAngleLatitude:Number = _angleLatitude;
            var oldAngleLongitude:Number = _angleLongitude;
            var oldLengh:Number = _lastLength;

            //CameraZoom制御
            if (_zoomIn)
            {
                _lastLength -= _distanceSpeed;
            }
            else if (_zoomOut)
            {
                _lastLength += _distanceSpeed;
            }

            // ズーム制御
            if (_taregetDistanceValue != 0)
            {
                _lastLength += _taregetDistanceValue;
                _taregetDistanceValue = 0;
            }

            if (_lastLength < minDistance)
            {
                _lastLength = minDistance;
            }
            else if (_lastLength > maxDistance)
            {
                _lastLength = maxDistance;
            }
            if (_lastLength - _length)
            {
                _length += (_lastLength - _length) / _easingSeparator;
            }

            if (Math.abs(_lastLength - _length) < ROUND_VALUE)
            {
                _length = _lastLength;
            }

            //Camera回転制御
            if (_mouseMove)
            {
                _lastLongitude = _oldLongitude + (_mouseDownEventSource.mouseX - _mouseX) * _mouseSensitivityX
            }
            else if (_yawLeft)
            {
                _lastLongitude += _yawSpeed;
            }
            else if (_yawRight)
            {
                _lastLongitude -= _yawSpeed;
            }

            if (_taregetYawValue)
            {
                _lastLongitude += _taregetYawValue;
                _taregetYawValue = 0;
            }

            if (_lastLongitude - _angleLongitude)
            {
                _angleLongitude += (_lastLongitude - _angleLongitude) / _easingSeparator;
            }

            if (Math.abs(_lastLatitude - _angleLatitude) < ROUND_VALUE)
            {
                _angleLatitude = _lastLatitude;
            }

            //CameraZ位置制御
            if (_mouseMove)
            {
                _lastLatitude = _oldLatitude + (_mouseDownEventSource.mouseY - _mouseY) * _mouseSensitivityY;
            }
            else if (_pitchDown)
            {
                _lastLatitude -= _pitchSpeed;
            }
            else if (_pitchUp)
            {
                _lastLatitude += _pitchSpeed;
            }

            if (_taregetPitchValue)
            {
                _lastLatitude += _taregetPitchValue;
                _taregetPitchValue = 0;
            }

            _lastLatitude = Math.max(-89.9, Math.min(_lastLatitude, 89.9));

            if (_lastLatitude - _angleLatitude)
            {
                _angleLatitude += (_lastLatitude - _angleLatitude) / _easingSeparator;
            }
            if (Math.abs(_lastLongitude - _angleLongitude) < ROUND_VALUE)
            {
                _angleLongitude = _lastLongitude;
            }
            
            
            if (_angleLatitude < _minAngleLatitude) _angleLatitude = _minAngleLatitude;
            if (_angleLatitude > _maxAngleLatidude) _angleLatitude = _maxAngleLatidude;
            

            var vec3d:Vector3D = this.translateGeoCoords(_angleLatitude, _angleLongitude, _length);
                testLook.x = _followTarget.x;
                testLook.y = _followTarget.y;
                testLook.z = _followTarget.z;
            //    testLook = _followTarget.localToGlobal(testLook);
    
            _target.x = testLook.x + vec3d.x;
            _target.y = testLook.y + vec3d.y;
            _target.z = testLook.z + vec3d.z;

            //lookAt制御
            if (_lastLookAtX - _lookAtX)
            {
                _lookAtX += (_lastLookAtX - _lookAtX) / _easingSeparator;
            }

            if (_lastLookAtY - _lookAtY)
            {
                _lookAtY += (_lastLookAtY - _lookAtY) / _easingSeparator;
            }

            if (_lastLookAtZ - _lookAtZ)
            {
                _lookAtZ += (_lastLookAtZ - _lookAtZ) / _easingSeparator;
            }
            
        

            //super.update()
            updateObjectTransform();
            
            
            
            lookAtXYZ(_lookAtX + testLook.x, _lookAtY + testLook.y, _lookAtZ + testLook.z);
            
    

            _needsRendering = oldAngleLatitude != _angleLatitude
                || oldAngleLongitude != _angleLongitude
                || oldLengh != _length;
        }

        /** @inheritDoc */
        override public function startMouseLook():void
        {
            // 封印
        }

        /** @inheritDoc */
        override public function stopMouseLook():void
        {
            // 封印
        }

        /**
         * Cameraの向く方向を指定します。
         * lookAtやlookAtXYZとの併用は不可。
         * @param x
         * @param y
         * @param z
         * @param immediate    trueで、イージングしないで変更
         */
        public function lookAtPosition(x:Number, y:Number, z:Number, immediate:Boolean = false):void
        {
            if (immediate)
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
         * 経度を設定します。
         * @param value    0で、正面から中央方向(lookAtPosition)を見る
         * @param immediate    trueで、イージングしないで変更
         */
        public function setLongitude(value:Number, immediate:Boolean = false):void
        {
            if (immediate)
            {
                _angleLongitude = value;
            }
            _lastLongitude = value;
        }

        /**
         * 緯度を設定します。
         * @param value    0で、正面から中央方向(lookAtPosition)を見る
         * @param immediate    trueで、イージングしないで変更
         */
        public function setLatitude(value:Number, immediate:Boolean = false):void
        {
            if (immediate)
            {
                _angleLatitude = value;
            }
            _lastLatitude = value;

        }

        /**
         * Cameraから、targetObjectまでの距離を設定します。
         * @param value    Cameraから、targetObjectまでの距離
         * @param immediate trueで、イージングしないで変更
         */
        public function setDistance(value:Number, immediate:Boolean = false):void
        {
            if (immediate)
            {
                _length = value;
            }
            _lastLength = value;
        }
        
        public function getDistance():Number {
            return _length;
        }

        /**
         * オブジェクトを使用不可にしてメモリを解放します。
         */
        public function dispose():void
        {
            // イベントの解放
            if (_mouseDownEventSource)
                _mouseDownEventSource.removeEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);

            // マウスホイール操作
            if (_mouseDownEventSource)
                _mouseDownEventSource.removeEventListener(MouseEvent.MOUSE_WHEEL, mouseWheelHandler);

            // キーボード操作
            if (_keyEventSource)
            {
                _keyEventSource.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
                _keyEventSource.removeEventListener(KeyboardEvent.KEY_UP, keyUpHandler);
            }

            // プロパティーの解放
            _easingSeparator = 0;
            maxDistance = 0;
            minDistance = 0;
            _mouseSensitivityX = 0;
            _mouseSensitivityY = 0;
            multiplyValue = 0;
            _needsRendering = false;
            _pitchSpeed = 0;
            useHandCursor = false;
            _yawSpeed = 0;
            _angleLatitude = 0;
            _angleLongitude = 0;
            _distanceSpeed = 0;
            _keyEventSource = null;
            _lastLatitude = 0;
            _lastLength = 0;
            _lastLongitude = 0;
            _lastLookAtX = 0;
            _lastLookAtY = 0;
            _lastLookAtZ = 0;
            _length = 0;
            _lookAtX = 0;
            _lookAtY = 0;
            _lookAtZ = 0;
            _mouseDownEventSource = null;
            _mouseMove = false;
            _mouseUpEventSource = null;
            _mouseX = 0;
            _mouseY = 0;
            _oldLatitude = 0;
            _oldLongitude = 0;
            _pitchDown = false;
            _pitchUp = false;
            _taregetDistanceValue = 0;
            _taregetPitchValue = 0;
            _taregetYawValue = 0;
            _target = null;
            _yawLeft = false;
            _yawRight = false;
            _zoomIn = false;
            _zoomOut = false;
        }

        protected function mouseDownHandler(event:Event):void
        {
            _oldLongitude = _lastLongitude;
            _oldLatitude = _lastLatitude;
            _mouseX = _mouseDownEventSource.mouseX;
            _mouseY = _mouseDownEventSource.mouseY;
            _mouseMove = true;

            if (useHandCursor)
                Mouse.cursor = MouseCursor.HAND;

        
        }

        protected function mouseUpHandler(event:Event):void
        {
            if (!_mouseMove) return;
            
            if (useHandCursor)
                Mouse.cursor = MouseCursor.AUTO;

            _mouseMove = false;
            
        }
        
        

        private function keyDownHandler(event:KeyboardEvent):void
        {
            for (var key:String in keyBindings)
            {
                if (String(event.keyCode) == key)
                {
                    keyBindings[key](true)
                }
            }
        }

        private function keyUpHandler(event:KeyboardEvent = null):void
        {
            for (var key:String in keyBindings)
            {
                keyBindings[key](false)
            }
        }

        private function mouseWheelHandler(event:MouseEvent):void
        {
            _lastLength -= event.delta * 20;
            if (_lastLength < minDistance)
            {
                _lastLength = minDistance
            }
            else if (_lastLength > maxDistance)
            {
                _lastLength = maxDistance
            }
        }

        /**
         * 経度と緯度から位置を算出します。
         * @param latitude    緯度
         * @param longitude    経度
         * @param radius    半径
         * @return 位置情報
         */
        private function translateGeoCoords(latitude:Number, longitude:Number, radius:Number):Vector3D
        {
            const latitudeDegreeOffset:Number = 90;
            const longitudeDegreeOffset:Number = -90;

            latitude = Math.PI * latitude / 180;
            longitude = Math.PI * longitude / 180;

            latitude -= (latitudeDegreeOffset * (Math.PI / 180));
            longitude -= (longitudeDegreeOffset * (Math.PI / 180));

            var x:Number = radius * Math.sin(latitude) * Math.cos(longitude);
            var y:Number = radius * Math.cos(latitude);
            var z:Number = radius * Math.sin(latitude) * Math.sin(longitude);

            return new Vector3D(x, z, y);
        }
    }
//}


class CrossHair extends Sprite {
    public function CrossHair() {
        graphics.lineStyle(1, 0xDDEE44, 1);
        graphics.moveTo(0, -2);
        graphics.lineTo(0, -6);
        
        graphics.moveTo(0, 2);
        graphics.lineTo(0, 6);
        
        graphics.moveTo(2, 0);
        graphics.lineTo(6, 0);
        
        graphics.moveTo(-2, 0);
        graphics.lineTo(-6, 0);
    }
}