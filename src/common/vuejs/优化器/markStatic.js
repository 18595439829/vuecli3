const data = {
  name: "aaa",
};
let myTitle = "";
function update() {
  myTitle = data.name + "Title";
}
// 手动收集依赖
const dependCollection = {};
dependCollection.data = {};
dependCollection.data.name = [];
dependCollection.data.name.push(update);

// 添加响应式
// vue3之前
const handler = {
  get: function(obj, prop) {
    return Reflect.get(obj, prop);
  },
  set: function(obj, prop, value) {
    const result = Reflect.set(obj, prop, value);
    // 触发依赖
    dependCollection.data.name.forEach((fn) => fn());
    return result;
  },
};
const observed = new Proxy(data, handler);
observed.name = "bbb";
console.log(myTitle); // bbbTitle

// 标记静态节点
function markStatic(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // node 为元素节点
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function isStatic(node) {
  if (node.type === 2) {
    // 带变量的动态文本节点
    return false;
  }
  if (node.type === 3) {
    // 不带变量的纯文本节点
    return true;
  }
  return !!(
    node.pre ||
    (!node.hasBindings && // 没有动态绑定
    !node.if &&
    !node.for && // 没有v-if或v-for或v-else
    !isBuiltInTag(node.tag) && // 不是内置标签
    isPlatformReservedTag(node.tag) && // 不是组件
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey))
  );
}
// 标记静态根节点
function markStaticRoots(node) {
  if (node.type === 1) {
    if (
      node.static &&
      node.children.length &&
      !(
        // node有子节点
        (node.children.length === 1 && node.children[0].type === 3) // 且子节点不能是只有一个静态文本的子节点,否则优化成本将超过收益
      )
    ) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        markStaticRoots(node.children[i]);
      }
    }
  }
}

