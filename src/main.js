import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './public-path' // 解决路由懒加载问题
import store from './store'

// 基座版 2.15.6
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)

// 旧版 2.4.8
// import install from 'old-ver';
// Vue.use(install)

// 新版 2.15.6
// import install from 'new-ver';
// Vue.use(install)

Vue.config.productionTip = false

let instance;
window.Vue.prototype.$test = { name: 'CHild_A' }


const render = function(container){
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container)
}

// 子应用独立运行
!window.__POWERED_BY_QIANKUN__ && render('#app')

/**
 * 子应用导出三个必要生命周期:
 * bootstrap、mount、unmount
 */
export async function bootstrap(){
  console.log('bootstrap..');
}

export async function mount(props = {}){
  const { container, parentStore } = props
  render(container.querySelector('#app') || '#app')
  console.log(instance, parentStore);
  // Vue.prototype.$PStore = parentStore
  Vue.prototype.$PStore = Vue.observable(parentStore)
}

export async function unmount(){
  // 内存释放
  instance.$el.html = ''
  instance = null
}
