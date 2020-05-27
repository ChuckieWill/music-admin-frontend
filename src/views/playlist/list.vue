<template>
    <div>
      <el-table v-loading="loading" :data="playlist" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="封面" width="100">
            <template slot-scope="scope">
            <img :src="scope.row.picUrl" alt height="50" />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="copywriter" label="描述"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
            </template>
        </el-table-column>
     </el-table>

     <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>


<script>
//从src/api导入获取歌单列表的函数
import {fetchList, del} from '@/api/playlist'
//下拉触底函数
import scroll from '@/utils/scroll'
export default{
    //数据
    data(){
        return {
            playlist: [],
            count: 50,
            loading: false,
            delDialogVisible: false , //删除歌单的对话框显示与否
            info : {} //记录删除的一条记录的信息
        }
    },
    //生命周期函数
    //页面启动
    created(){
        console.log('created')
        this.getList()
    },
    //页面启动后
    mounted(){
        console.log('mounted')
        scroll.start(this.getList)
    },
    //方法函数
    methods:{
        //---------------------网络请求函数--------------------------
        //获取歌单列表
        getList(){
            console.log('getList',this.playlist.length)
            console.log('getList-获取歌单列表之前',this.playlist)
            this.loading = true
            fetchList({
                skip:this.playlist.length,
                limit: this.count
            }).then((res) => {
                console.log('getList-获取的歌单',res)
                this.playlist = this.playlist.concat(res.data)
                //判断已经加载至数据库最后
                if(res.data.length < this.count){
                    console.log('getList-关闭scroll')
                    scroll.end()
                }
                this.loading = false
                console.log('getList-获取歌单列表之后',this.playlist)
            })
        },
        //---------------------网络请求函数--------------------------
        //编辑
        onEdit(row){
            //console.log('row._id',row._id)
            this.$router.push(`/playlist/edit/${row._id}`)
        },
        //删除
        onDel(row){
            this.delDialogVisible = true,
            this.info.id = row._id
        },
        //弹框确定删除
        doDel(){
            del({id: this.info.id}).then((res) => {
                this.delDialogVisible = false
                //判断删除成功
                if(res.data.deleted > 0){
                    //刷新列表
                    this.playlist = []
                    this.getList()
                    this.$message({
                        message: '删除成功',
                        type:'success'
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

