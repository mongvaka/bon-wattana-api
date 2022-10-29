export function getLabelEnum(enumOption:any[], title: number): any {
    return enumOption.find(fn=>fn.value == title).label
  }
 export function onlyUnique(value:any, index:any, self:any) {
    return self.indexOf(value) === index;
  }