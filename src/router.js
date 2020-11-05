import Home from './components/home/Home.vue'
import Chat from './components/chat/Chat.vue'
import Create from './components/home/Create.vue'
import Join from './components/home/Join.vue'
export default [
    {path : '/home' , component : Home  , children : [
        {path : '/home/join', component : Join , name : 'join'},
        {path : '/home/create' , component : Create , name :'create'}
    ]},
    {path : '/chat/:roomId' , component : Chat , name : 'chat'},
    {path : '*' , redirect: {name : 'join'}}
];