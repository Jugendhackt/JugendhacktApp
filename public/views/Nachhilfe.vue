<template>
  <div class="card">
      <h2 class="name">Nachhilfe</h2>
  <form @sendMSG="sendMessage()">
    <div ID="messageInput">
    <label for="TextBox">Message:</label>
    <input name="TextBox" type="text"/>
    <button type="sendMSG" for="TextBox"><b>Send</button>
    </form>
  </div>

  </div>

</template>
<style scoped>



#messageInput{
  margin-top: 8em;
}


</style>
