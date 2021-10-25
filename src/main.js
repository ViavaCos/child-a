import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './public-path' // 解决路由懒加载问题
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false

let instance;

const render = function(container){
  instance = new Vue({
    router,
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
  const { container } = props
  render(container.querySelector('#app') || '#app')
  console.log(instance);
}

export async function unmount(){
  // 内存释放
  instance.$el.html = ''
  instance = null
}
