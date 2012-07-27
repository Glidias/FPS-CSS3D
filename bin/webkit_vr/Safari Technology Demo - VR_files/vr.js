VirtualTour = {
    init: function() {
        if (isTransform3DAvailable()) {
            window.kRingRadius = 150;
            this.setup();
        }
    },
    didShow: function() {
        this.init();
    },
    willHide: function() {
        recycleObjectValueForKey(this, "_gSpinner");
        this._gSpinner = null;
    },
    _imageSrcs: ["../images/shanghai/50472916_D3VH/left.jpg",
                         "../images/shanghai/50472916_D3VH/back.jpg",
                         "../images/shanghai/50472916_D3VH/right.jpg",
                         "../images/shanghai/50472916_D3VH/front.jpg",
                         "../images/shanghai/50472916_D3VH/top.jpg",
                         "../images/shanghai/50472916_D3VH/bottom.jpg"],
    _iPhoneImageSrcs: ["../images/shanghai/50472916_D3VH/left.jpg",
                               "../images/shanghai/50472916_D3VH/back.jpg",
                               "../images/shanghai/50472916_D3VH/right.jpg",
                               "../images/shanghai/50472916_D3VH/front.jpg",
                               "../images/shanghai/50472916_D3VH/top.jpg",
                               "../images/shanghai/50472916_D3VH/bottom.jpg"],
    setup: function() {
		var gotScene = document.getElementById('scene') != null;
        var container = document.getElementById('vr-container');
        var cube = document.getElementById('cube')
        if (!AC.Detector.isiPhone()) {
            var images = this._imageSrcs,
                imagesWidth = 840,
                imagesHeight = 840;
        } else {
            var images = this._iPhoneImageSrcs,
                imagesWidth = 500,
                imagesHeight = 500;
        };
        var imageDocumentFragment = document.createDocumentFragment();
        for (var i = 0, countI = images.length, img;
        (imageURL = images[i]); i++) {
            img = new Image();
            img.src = imageURL;
            img.id = "face" + (i + 1);
            img.className = "face";
            img.width = imagesWidth;
            img.height = imagesHeight;
            imageDocumentFragment.appendChild(img);
        }
	if (!gotScene) cube.appendChild(imageDocumentFragment);
        this._gSpinner = new Spinner(document.getElementById('rotateX'), document.getElementById('rotor-x'), document.getElementById('rotateY'), document.getElementById('rotor-y'), container);
      
		container = null;
        imageDocumentFragment = null;
    }
}
if (!window.isLoaded) {
    window.addEventListener("load", function() {
        VirtualTour.init();
    }, false);
}
