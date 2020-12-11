import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective
{
	constructor(private el: ElementRef) 
	{ 

	}

	@HostListener('mouseenter') onMouseEnter() 
	{
		this.changeColor('lightgrey');
	}

	@HostListener('mouseleave') onMouseLeave() 
	{
		this.changeColor('white');
	}

	changeColor(color: string) 
	{
		this.el.nativeElement.style.backgroundColor = color;
	}
}