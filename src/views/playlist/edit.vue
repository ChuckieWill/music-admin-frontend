<template>
    <div>
        <el-form ref="form" :model="playlist" label-width="80px">
            <el-form-item label="歌单名称">
                <el-input v-model="playlist.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="playlist.copywriter"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import {fetchById,update} from '@/api/playlist'
export default{
    //数据
    data(){
        return {
            playlist: {}
        }
    },
    //生命周期函数
    created(){
        console.log('this.$route.params.id',this.$route.params.id)
        fetchById({
            id: this.$route.params.id
        }).then((res) => {
            console.log(res)
            this.playlist = res.data
        })
    },
    //方法
    methods:{
        //---------------------事件处理函数--------------------------
        //更新
        onSubmit(){
            update(this.playlist).then((res) => {
                console.log('update',res)
                if(res.data.modified > 0){
                    this.$message({
                        message: '更新成功',
                        type:'success'
                    })
                }else{
                    this.$message.error('更新失败')
                }
                this.$router.push('/playlist/list')
            })
        },
        //取消
        onCancel(){
           this.$router.push('/playlist/list') 
        }
    }
}
</script>


<style>

</style>