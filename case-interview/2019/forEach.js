/**
 * forEach 循环删除元素，输出坑
 */
var words = ["one", "two", "three", "four"];
words.forEach(function(word) {
  console.log(word);
  if (word === "two") {
    words.shift();
  }
});

// one
// two
// four