import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'unit'
})

export class UnitPipe implements PipeTransform 
{
    transform(value: string): string 
    {
        return(value + " kPA");
	}
}