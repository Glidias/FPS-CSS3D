/*

 File: vr_spinner.js

 Abstract: Cubic Panorama Demo

 Version: 1.0

 Disclaimer: IMPORTANT:  This Apple software is supplied to you by 
 Apple Inc. ("Apple") in consideration of your agreement to the
 following terms, and your use, installation, modification or
 redistribution of this Apple software constitutes acceptance of these
 terms.  If you do not agree with these terms, please do not use,
 install, modify or redistribute this Apple software.

 In consideration of your agreement to abide by the following terms, and
 subject to these terms, Apple grants you a personal, non-exclusive
 license, under Apple's copyrights in this original Apple software (the
 "Apple Software"), to use, reproduce, modify and redistribute the Apple
 Software, with or without modifications, in source and/or binary forms;
 provided that if you redistribute the Apple Software in its entirety and
 without modifications, you must retain this notice and the following
 text and disclaimers in all such redistributions of the Apple Software. 
 Neither the name, trademarks, service marks or logos of Apple Inc. 
 may be used to endorse or promote products derived from the Apple
 Software without specific prior written permission from Apple.  Except
 as expressly stated in this notice, no other rights or licenses, express
 or implied, are granted by Apple herein, including but not limited to
 any patent rights that may be infringed by your derivative works or by
 other works in which the Apple Software may be incorporated.

 The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
 MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
 OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

 IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
 OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
 MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
 AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
 STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.

 Copyright (C) 2010 Apple Inc. All Rights Reserved.
 
*/
function Spinner(elementX, rotorX, elementY, rotorY, container, horizontal) {
    this.elementX = elementX;
    this.rotorX = rotorX;
    this.elementY = elementX;
    this.rotorY = rotorY;
    this.container = container;
    this.startX = 0;
    this.startY = 0;
    this.startRotationX = 0;
    this.startRotationY = 0;
    this.staticRotationX = 0;
    this.staticRotationY = 0;
    this.trackingPoints = [];
    this.tracking = false;
    var _self = this;
    this.mousedownHandler = function(e) {
        _self.mouseDown(e)
    };
    this.mousemoveHandler = function(e) {
        _self.mouseMove(e)
    };
    this.mouseupHandler = function(e) {
        _self.mouseUp(e)
    };
    this.mouseoutHandler = function(e) {
        _self.mouseOut(e)
    };
    this.touchstartHandler = function(e) {
        _self.touchStart(e)
    };
    this.touchmoveHandler = function(e) {
        _self.touchMove(e)
    };
    this.touchendHandler = function(e) {
        _self.touchEnd(e)
    };
    this.webkitAnimationStartHandler = function(e) {
        _self.animationStarted(e)
    };
    this.webkitAnimationEndStartHandler = function(e) {
        _self.animationEnded(e)
    };
    this.container.addEventListener('mousedown', this.mousedownHandler, false);
    this.container.addEventListener('mousemove', this.mousemoveHandler, false);
    this.container.addEventListener('mouseup', this.mouseupHandler, false);
    this.container.addEventListener('mouseout', this.mouseoutHandler, false);
    this.container.addEventListener('touchstart', this.touchstartHandler, false);
    this.container.addEventListener('touchmove', this.touchmoveHandler, false);
    this.container.addEventListener('touchend', this.touchendHandler, false);
    this.container.addEventListener('webkitAnimationStart', this.webkitAnimationStartHandler, false);
    this.container.addEventListener('webkitAnimationEnd', this.webkitAnimationEndStartHandler, false);
};
Spinner.prototype.recycle = function() {
    delete this.elementX;
    delete this.rotorX;
    delete this.elementY;
    delete this.rotorY;
    this.container.removeEventListener('mousedown', this.mousedownHandler, false);
    this.container.removeEventListener('mousemove', this.mousemoveHandler, false);
    this.container.removeEventListener('mouseup', this.mouseupHandler, false);
    this.container.removeEventListener('mouseout', this.mouseoutHandler, false);
    this.container.removeEventListener('touchstart', this.touchstartHandler, false);
    this.container.removeEventListener('touchmove', this.touchmoveHandler, false);
    this.container.removeEventListener('touchend', this.touchendHandler, false);
    this.container.removeEventListener('webkitAnimationStart', this.webkitAnimationStartHandler, false);
    this.container.removeEventListener('webkitAnimationEnd', this.webkitAnimationEndStartHandler, false);
    delete this.container;
}
Spinner.prototype.startAnimating = function() {
    return false;
    if (this.trackingPoints.length < 3) return false;
    var releaseDelay = this.trackingPoints[2].date - this.trackingPoints[1].date;
    var timeDelta = (this.trackingPoints[1].date - this.trackingPoints[0].date);
    var deltaDist;
    if (this.horizontal) deltaDist = this.trackingPoints[1].xPos - this.trackingPoints[0].xPos;
    else deltaDist = this.trackingPoints[1].yPos - this.trackingPoints[0].yPos;
    if (Math.abs(deltaDist) < 0.5 || releaseDelay > 35) {
        return false;
    }
    var angleDelta = Math.atan(deltaDist / kRingRadius);
    var direction;
    if (this.horizontal) direction = (angleDelta < 0) ? 'left' : 'right';
    else direction = (angleDelta < 0) ? 'up' : 'down';
    var animName = direction + '-spin';
    this.element.style.webkitAnimationName = animName;
    return true;
};
Spinner.prototype.mouseDown = function(event) {
    this.interactionStart(event.clientX, event.clientY);
    event.preventDefault();
};
Spinner.prototype.mouseMove = function(event) {
    this.interactionMove(event.clientX, event.clientY);
    event.preventDefault();
};
Spinner.prototype.mouseUp = function(event) {
    this.interactionEnd(event.clientX, event.clientY);
    event.preventDefault();
};
Spinner.prototype.mouseOut = function(event) {};
Spinner.prototype.touchStart = function(event) {
    this.interactionStart(event.touches[0].clientX, event.touches[0].clientY);
};
Spinner.prototype.touchMove = function(event) {
    this.interactionMove(event.touches[0].clientX, event.touches[0].clientY);
    event.preventDefault();
};
Spinner.prototype.touchEnd = function(event) {
    this.interactionEnd(0, 0);
};
Spinner.prototype.interactionStart = function(x, y) {
    this.startX = x;
    this.startY = y;
    this.tracking = true;
    this.trackingPoints = [];
    this.elementX.style.webkitAnimationName = 'none';
    this.elementY.style.webkitAnimationName = 'none';
    var curXTransform = window.getComputedStyle(this.elementX).webkitTransform;
    var matrix = curXTransform == 'none' ? new WebKitCSSMatrix() : new WebKitCSSMatrix(curXTransform);
    var angleX = Math.atan2(matrix.m13, matrix.m11);
    if (matrix.m11 < 0) angleX += Math.PI;
    this.staticRotationX -= angleX;
    var curYTransform = window.getComputedStyle(this.elementY).webkitTransform;
    var matrix = curYTransform == 'none' ? new WebKitCSSMatrix() : new WebKitCSSMatrix(curYTransform);
    var angleY = Math.atan2(matrix.m23, matrix.m22);
    if (matrix.m22 < 0) angleY += Math.PI;
    this.staticRotationY += angleY;
    this.startRotationX = this.staticRotationX;
    this.startRotationY = this.staticRotationY;
    this.setRotation(this.staticRotationX, this.staticRotationY);
    matrix = null;
};
Spinner.prototype.interactionMove = function(x, y) {
    var deltaX = x - this.startX;
    var deltaY = y - this.startY;
    if (this.tracking) {
        this.storeEventLocation(x, y);
        var xDisplacement = Math.atan(deltaX / kRingRadius);
        var yDisplacement = Math.atan(-deltaY / kRingRadius);
        var angleXDelta = yDisplacement * Math.cos(this.staticRotationX);
        var angleYDelta = xDisplacement * Math.cos(this.staticRotationX);
        this.staticRotationX = this.startRotationX + angleXDelta;
        this.staticRotationY = this.startRotationY + angleYDelta;
        this.setRotation(this.staticRotationX, this.staticRotationY);
    }
};
Spinner.prototype.interactionEnd = function(x, y) {
    if (this.tracking) {
        if (!this.startAnimating()) {
            this.setRotation(this.staticRotationX, this.staticRotationY);
        }
        this.tracking = false;
    }
};
Spinner.prototype.storeEventLocation = function(x, y) {
    var newDatum = {
        xPos: x,
        yPos: y,
        date: new Date()
    };
    this.trackingPoints.push(newDatum);
    if (this.trackingPoints.length > 3) this.trackingPoints.shift();
};
Spinner.prototype.animationStarted = function(event) {};
Spinner.prototype.animationEnded = function(event) {
    if (event.animationName == 'none') return;
    this.element.style.webkitAnimationName = 'none';
    this.setRotation(this.staticRotationX, this.staticRotationY);
    window.console.log('animation end: setting rotation to ' + this.staticRotationX + ' ' + this.staticRotationY);
};
Spinner.prototype.setRotation = function(angleX, angleY) {
    this.rotorX.style.webkitTransform = 'rotateX(' + angleX + 'rad)';
    this.rotorY.style.webkitTransform = 'rotateY(' + angleY + 'rad)';
};
