import Home from './components/home/Home.vue'
import Chat from './components/chat/Chat.vue'
import Create from './components/home/Create.vue'
import Join from './components/home/Join.vue'
export default [
    {path : '/' , component : Home , children : [
        {path : '' , component : Join},
        {path : '/create' , component : Create}
    ]},
    {path : '/chat/:roomId' , component : Chat , name : 'chat'}
];