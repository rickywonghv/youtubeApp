import {Pipe} from "@angular/core";
/**
 * Created by Damon on 10/9/16.
 */

@Pipe({
  name: 'secondsToTime'
})
export class secondsToTimePipe{
  times = {
    yr: 31557600,
    mon: 2629746,
    day: 86400,
    hr: 3600,
    min: 60,
    s: 1
  }

  transform(seconds){
    let time_string: string = '';
    let plural: string = '';
    for(var key in this.times){
      if(Math.floor(seconds / this.times[key]) > 0){
        if(Math.floor(seconds / this.times[key]) >1 ){
          plural = '';
        }
        else{
          plural = '';
        }

        time_string += Math.floor(seconds / this.times[key]).toString() + ' ' + key.toString() + plural + ' ';
        seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

      }
    }
    return time_string;
  }
}
