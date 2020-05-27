<template>
    <div>
        <el-table v-loading="loading" :data="blogList" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="nickName" label="发布人"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <!-- 确认删除的对话框 -->
        <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
        <span>确定删除该博客吗</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doDel">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>


<script>
import {fetchList,del} from '@/api/blog.js'
import scroll from '@/utils/scroll.js'
export default{
    data(){
        return {
            blogList:[],
            count:50,
            delDialogVisible:false, //控制确认弹出框显示
            loading: false,//加载
            blog:{}
        }
    },
    created(){
        this.getList()
    },
    mounted(){
        scroll.start(this.getList)
    },
    methods:{
        //--------------------------网络请求函数-----------------
        //获取博客列表
        getList(){
            this.loading = true
            fetchList({
                start:this.blogList.length,
                count:this.count
            }).then((res)=>{
                this.loading = false
                const data = res.data
                let _bolgList = []
                for(let i=0 ,len = data.length;i<len;i++){
                    _bolgList.push(JSON.parse(data[i]))
                }
                if(data.length < this.count){
                    scroll.end()
                }
                this.blogList = this.blogList.concat(_bolgList)              
                console.log(this.blogList)
            })
        },
        //--------------------------事件处理函数-----------------
        //删除
        onDel(row){
            this.blog = row
            this.delDialogVisible = true
        },
        //确认删除
        doDel(){
            this.delDialogVisible = false
            this.loading = true
            del(this.blog).then((res)=>{
                console.log(res)
                this.loading = false
                //判断删除条数 
                if(res.data.blogRes.deleted > 0){
                    this.blogList = []
                    this.getList()
                    this.$message({
                        message:'删除成功',
                        type: "success"
                    })
                }else{
                     this.$message.error('删除失败')
                }
            })
        }
    }

}
</script>

<style>

</style>

