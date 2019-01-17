<template>
  <div>
    <input type="file"
           ref="file">
    <Button @click="fileUpload">上传</Button>
  </div>
</template>
<script>
export default {
  name: 'fileUpload',
  methods: {
    fileUpload() {
      let file = this.$refs.file.files[0]
      console.log(file)
      let formData = new FormData()
      formData.append('file', file)
      this.$axios.post('/Express', formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
