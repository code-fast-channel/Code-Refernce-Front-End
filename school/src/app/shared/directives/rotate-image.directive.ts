import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[RotateImage]'
})
export class RotateImageDirective {

  loaded = false;

  customStyle = ""
  customClass = ""

  srcOrientation = 1

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) {
      this.customStyle = this.el.nativeElement.getAttribute("style")
      this.customClass = this.el.nativeElement.getAttribute("class")

      renderer.setAttribute(el.nativeElement, 'crossOrigin', 'anonymous');

      // remove all styling and classes on the image before rotating it
     // this.applyStyling();
  }
  
  @HostListener('click', ['$event.target'])
 
  onClick(img) {   

    let height = img.height
    let width = img.width

    let canvas = this.renderer.createElement('canvas')
    let ctx = canvas.getContext("2d")
    
    this.drawRotated(img, canvas, ctx, 90)
/*
    this.srcOrientation = this.srcOrientation >= 8 ? 2 : this.srcOrientation + 1
          
      // transform context before drawing image
      switch (this.srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, height); break;
        case 3: ctx.transform(-1, 0, 0, -1); break;
        case 4: ctx.transform(1, 0, 0, -1); break;
        case 5: ctx.transform(0, 1, 1, 0); break;
        case 6: ctx.transform(0, 1, -1, 0); break;
        case 7: ctx.transform(0, -1, -1, 0); break;
        case 8: ctx.transform(0, -1, 1, 0); break;
        default: ctx.transform(-1, 0, 0, 1, width, height); break;
      }

      // After rotating the image apply the same classes and style which was provided initially
     // this.applyStyling(this.customClass, this.customStyle)

      // draw image
      ctx.drawImage(img, 0, 0);
      img.src = canvas.toDataURL();
*/
  }

  applyStyling(classes="", styles=""){
    this.renderer.setAttribute(this.el.nativeElement, 'class', classes)
    this.renderer.setAttribute(this.el.nativeElement, 'style', styles)
  }

  drawRotated(image, canvas, context, degrees){
    context.clearRect(0,0,canvas.width,canvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

    // move to the center of the canvas
    context.translate(canvas.width/2,canvas.height/2);

    // rotate the canvas to the specified degrees
    context.rotate(degrees*Math.PI/180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(image,-image.width/2,-image.width/2);


    image.src = canvas.toDataURL();
    // we’re done with the rotating so restore the unrotated context
    context.restore();
}

}
