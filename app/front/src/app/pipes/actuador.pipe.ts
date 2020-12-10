import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'actuador'
})

export class ActuadorPipe implements PipeTransform {

	transform(value: number): string {
		if(value == 0)
		{
			return ("OFF");
		}
		else
		{
			return ("ON");
		}
	}
}
