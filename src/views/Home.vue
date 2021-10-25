<template>
  <div class="home">
    <h1>This is an child home page.</h1>
    <el-button type="success" @click="$router.push('/about')">to about</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
