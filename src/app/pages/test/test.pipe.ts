import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "objNgFor", pure: false})

export class objNgFor implements PipeTransform {
    transform(value: any, args: any[] = null) {
        return Object.keys(value);
    }
}