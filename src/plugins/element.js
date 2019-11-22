import Vue from 'vue'
import { Button, Select, Input, Form, FormItem, Icon, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
// Vue.use(Message)
Vue.prototype.$message = Message
