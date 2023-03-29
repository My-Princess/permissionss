

<script>
import base from './base'
export default {
    extends:base,
    components:{},
    data(){
        return{

        }
    },
    created(){
        console.log("child",this)
        console.log("子类不改写",this.a)  // 6
        this.add()   // 父类方法
        this.title = '不改写'
    },
    methods:{
        add(){
            console.log("嘻嘻覆盖了没")
        }
    }

}
</script>

<style>

</style>