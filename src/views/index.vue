<template>
  <div class="hello">
    
    <el-row>
      <el-col :span="12">
          <section class="col-4 demo">
            <phone></phone>
          </section>
      </el-col>
    <el-col :span="12">
      <div class="block" style="margin-top:20px;margin-right:20px;margin-left:20px">
        <span class="wrapper">
          <el-button type="primary">navbar</el-button>
          <el-button type="primary">searchbar</el-button>
          <el-button type="primary">tabar</el-button>
        </span>
      </div>
      <div>
      </div>
    </el-col>
  </el-row>
    
  </div>

</template>

<script>
import Phone from './phone';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tabbar: ["推荐","分类","排行","设置"],
      navbar: ["杂志","兴趣"]
    }
  },
  components: {
      Phone
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
