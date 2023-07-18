export function quickSort(arr: any, map: any) : any {
    if (arr.length <= 1) {
      return arr
    }
    var pivot = arr[Math.floor(arr.length / 2)]
    var left = []
    var middle = []
    var right = []
  
    for (var i = 0; i < arr.length; i++) {
      if (map[arr[i].id] > map[pivot.id]) left.push(arr[i])
      else if (map[arr[i].id] === map[pivot.id]) middle.push(arr[i])
      else right.push(arr[i])
    }
  
    return quickSort(left, map).concat(middle, quickSort(right, map))
  }
  