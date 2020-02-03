<template>
    <div class="chats-container">
        <message v-for="(message,index) in messages" :message="message"  :key="index"/>
    </div>

</template>

<script>
import Message from '~/components/Message'
export default {
    props: ['messages'],
    components: {
        Message
    },
    mounted() {
        console.log(this.messages)
    }
}
</script>

<style>
.chats-container {
 padding: 16px;
}
</style>