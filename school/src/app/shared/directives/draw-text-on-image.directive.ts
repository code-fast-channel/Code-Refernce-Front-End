import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[DrawTextOnImage]'
})
export class DrawTextOnImageDirective {

  loaded = false;
  @Input() text: string = "GStu";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) {
      renderer.setAttribute(el.nativeElement, 'crossOrigin', 'anonymous');
  }

  @HostListener('load', ['$event.target'])

  onLoad(img) {

    if (this.loaded) {
      return;
    }

    this.loaded = true;
    let canvas = this.renderer.createElement('canvas')
    let context = canvas.getContext('2d');

    canvas.height = img.height;
    canvas.width = img.width;

    context.drawImage(img, 0, 0);
    context.font = "100px impact";
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.fillText(this.text, canvas.width / 2, canvas.height * 0.8);

    img.src = canvas.toDataURL();
  }

}
