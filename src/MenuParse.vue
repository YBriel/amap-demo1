<template>
  <div>
    <el-upload class="upload-demo" action='' drag :auto-upload="false" :on-change="uploadChange" :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <h4>{{result}}</h4>
  </div>
</template>


<script>
import xlsx from 'xlsx';
import request from "@/request";

export default {
  data() {
    return {
      result:'',
      menus:{
        dept:'',
        menu:''
      },
      sum: {
        total: 0,
        menu: [{
          name: '',
          num: 0
        }],
        dept: [
          {
            name:'',
            menu:{

            }
          }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    async uploadChange(file) {
      console.log(file)
      // let dataBinary = await readFile(file.raw)
      // let workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true})
      // let workSheet = workBook.Sheets[workBook.SheetNames[0]]
      // let data=[];
      // data = xlsx.utils.sheet_to_json(workSheet)
      //
      // let menus=[];
      // let strings = Object.keys(data[0]);
      // for (const string of strings) {
      //   if(strings.con)
      // }
      // console.log(strings)
      // console.log()
      // for (const datum of data) {
      //
      // }
      // console.log(data)
      const  data = new FormData()
      const fileobj = {uri: file.path, type: 'multipart/form-data', name: 'file.xls'}
      data.append('file', file.raw)
      request({url: '/api/nftplatform/menu/menuParse', method: 'POST' , data:data }).then((rep)=>{
        this.result=rep.data.result;
        console.log(rep)})

    }
  }
}
export const readFile = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}

</script>

<style scoped>

</style>
