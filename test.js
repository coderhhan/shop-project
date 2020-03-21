
let reg1 = new RegExp(/[0,2,4,6,8,]/, "g")
const string = "get1_install2_app3_list4_by5_android6"
let string1 = string.replace(reg1,'')  //去偶数

let reg2 = new RegExp(/_/,"g")
let string2 = string1.replace(reg2,' ')  //去_

let reg3 =new RegExp( /\b\s\w/,'g')

function replaceReg(reg,str){
  str = str.toLowerCase();
  return str.replace(reg,function(m){return m.toUpperCase()})
}
let string3 = replaceReg(reg3,string2)  // 替换字母

let reg4 =new RegExp( /\s/,'g')
let string4 = string3.replace(reg4,'')  //去空格
console.log(string4);  //最终结果

//-----------------------------------------------------------
let i = 0
let arry =[]
function a() {
  i++
  arry.push(i)

  if (i == 1000 ) {
    return arry  //最终结果
  } else {
    a()
  }
}
a()
console.log(new Array(1000))
let newArr = Array.from([1,3,4], (val, idx)  => {
  return 'key：'+idx+'value：'+val;
})
console.log(newArr);
//-----------------------------------------------------------------

var obj ={
  a:"adsa",
  b:'11',
  c:1,
  e:function () {
    console.log('1')
  }
}
const  obj2 = {
  a:"adssada",
  b:'11',
  c:'1',
  d:1,
  e:function () {
    console.log('1')
  }
}

console.log(Object.keys(obj2));
function isDifferent(obj1,obj2) {
  let obj1Keys = Object.keys(obj1)
  let obj2Keys = Object.keys(obj2)
  for (let i of obj1Keys) {
    if (obj1[i] !== obj2[i]){
      console.log('不一致的属性变量:'+i+"----obj1的属性类型:"+(typeof obj1[i]) +"obj1的属性值:"+obj1[i]+"----obj2的属性类型:"+(typeof obj2[i]) +"obj2的属性值:"+obj2[i])
    }
  }
  for (let j of obj2Keys) {
    if (obj1[j] !== obj2[j]){
      console.log('不一致的属性变量:'+j+"----obj1的属性类型:"+(typeof obj1[j]) +"obj1的属性值:"+obj1[j]+"----obj2的属性类型:"+(typeof obj2[j]) +"obj2的属性值:"+obj2[j])
    }
  }

}
isDifferent (obj,obj2)
//
// const theObjectValueEqual5 = (a, b) => {
//   let result = [];
//   let aProps = Object.keys(a);
//   let bProps = Object.keys(b);
//   for (let i = 0; i < aProps.length; i++) {
//     let aCompare = a[aProps[i]];
//     let isExist = false;
//     for (let j = 0; j < bProps.length; j++) {
//       let bCompare = b[bProps[j]];
//       if (JSON.stringify(aCompare) === JSON.stringify(bCompare)) {
//         isExist = true;
//         break;
//       }
//     }
//     console.log(isExist, aProps[i])
//     if (!isExist) {
//       result.push(aProps[i]);
//     }
//   }
//   return result;
// }
// console.log(theObjectValueEqual5(obj, obj2));

var o = {}

o.b = {}
o.b.a = 1
console.log(o)
