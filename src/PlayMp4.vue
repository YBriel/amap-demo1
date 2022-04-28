<template>
    <vueMiniPlayer :video="video" />
</template>

<script>

    export default {
        name: "PlayMp4",
        data () {
            return {
                video: {
                   // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                    url: 'https://outin-dcd776cb322c11eb8f6900163e1c60dc.oss-cn-shanghai.aliyuncs.com/sv/4d7b01c2-17613877c19/4d7b01c2-17613877c19.mp4?Expires=1606649029&OSSAccessKeyId=LTAIrkwb21KyGjJl&Signature=Gi%2BUDIRz45FFrqCjzv5Dq4nEUAI%3D',
                  //  cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png'
                    cover: 'http://outin-dcd776cb322c11eb8f6900163e1c60dc.oss-cn-shanghai.aliyuncs.com/f62cd930b91a4cefb958896c029e99ab/snapshots/51118939c5b24ff5a9d7ea14f6c88968-00005.jpg?Expires=1606649023&OSSAccessKeyId=LTAIrkwb21KyGjJl&Signature=XXHpxOSKo58v6btoMaZUvnCmJu0%3D'
                }
            }
        }
    }
</script>

<style scoped>

</style>