var test = function () {
  var arr = []
  for(var i = 0; i < 5; i++){
    arr.push(function () {
      return i*i
    })
  }
  return arr
}

var test1 = test()
console.log(test1[0]())
console.log(test1[1]())
console.log(test1[2]())

// 25
// 25
// 25

/** 闭包*/

var test = function () {
  var arr = []
  for(var i = 0; i < 5; i++){
    arr.push(function (n) {
      return function () {
        return n * n
      }
    }(i))
  }
  return arr
}

var test1 = test()
console.log(test1[0]())
console.log(test1[1]())
console.log(test1[2]())

// 0
// 1
// 4

/**ES6 */

var test = function () {
  const arr = []
  for(let i = 0; i < 5; i++ ){
    arr.push(function () {
      return i*i
    })
  }
  return arr
}

var test1 = test()
console.log(test1[0]())
console.log(test1[1]())
console.log(test1[2]())
