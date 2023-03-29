<template>
    <div class="modal" v-show="visible">
        <div class="dialog">
            <div v-if="text.pic" class="img">
                <img :src="text.pic" alt="">
            </div>
            <div class="content">
                <h2 :class="{'blod': text.color }">{{text.type}}</h2>
                <p v-if="text.color" class="red">{{text.msg}}</p>
                <p v-else>{{text.msg}}</p>
            </div>
            <div class="btnbox">
                <span @click="success" class="confirm" v-if="text.btn.ok && text.btn.no">{{text.btn.ok}}</span>
				<span @click="success" class="success" v-if="!text.btn.no">{{text.btn.ok}}</span>
                <span @click="close" class="cancel" v-if="text.btn.no">{{text.btn.no}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialog',
    data(){
        return {
			visible: true,
            text: {
                type:'提示',              
				msg:'确定删除此条信息？',
                pic: 'https://ins-pro-luban.miao.cn/online/source/image/338ada60-732a-11ea-815e-29b7b0dc6a01.png',
                color: 'red',
                btn:{
                    ok:'确定',
                    no:'取消'
                },
            }
        }
    },
    methods: {
        success(){
			console.log('确定');
        },
        close(){
            // this.$theConfirm.close
    //   this.$theConfirm().close()
    // this.visible = true
    

			console.log('关闭');
        },
    }
}
</script>
<style scoped  lang="scss">
.modal{
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.dialog{
    width: 7.333333rem;
    height: auto;
    background: #FFFFFF;
    border-radius: .266667rem;
    margin: auto;
    position: relative;
}
.img{
    width: 100%;
    height: 2rem;
    text-align: center;
    margin-top: -1rem;
    img{
        width: 2.533333rem;
        height: 2rem;
    }
}
.content{
	margin-top: .613333rem;
    text-align: center;
    padding: 0 .533333rem;
    box-sizing: border-box;
    h2{
        font-size: .48rem;
        color: #535353;
        font-weight: 600;
        margin-bottom: .2rem;
    }
    .blod{
        margin-top: 1rem;
    }
    p{
        font-size: .346667rem;
        color: #666666;
    }
}
.btnbox{
	margin-top: 1.066667rem;
	padding: 0 .266667rem;
	box-sizing: border-box;
	display: flex;
    flex-direction: column;
	justify-content: space-evenly;
    align-items: center;
    span{
        height: .933333rem;
        border-radius: .48rem;
        font-size: .426667rem;
        color: #FFFFFF;
        text-align: center;
        line-height: .933333rem;
    }
	.confirm{
		width: 5.333333rem;
		color: #FFFFFF;
        margin-bottom: .266667rem;
        background: linear-gradient(126deg,rgba(102,187,231,1) 0%,rgba(89,172,223,1) 35%,rgba(54,133,203,1) 100%);
	}
	.cancel{
	    width: 5.333333rem;
		color: #999999;
        margin-bottom: .4rem;
	}
	.success{
		width: 5.333333rem;
		color: #FFFFFF;
        background: linear-gradient(126deg,rgba(102,187,231,1) 0%,rgba(89,172,223,1) 35%,rgba(54,133,203,1) 100%);
        margin-bottom: .666667rem;
	}
}
</style>