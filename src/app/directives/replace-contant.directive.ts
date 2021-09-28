import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReplaceContant]'
})
export class ReplaceContantDirective implements OnInit{

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.renderer.setStyle
  }

}
