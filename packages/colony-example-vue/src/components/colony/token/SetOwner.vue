<template>
  <form @submit.prevent="$emit('submit', setTokenOwner)">
    <button type="submit">Set Token Owner</button>
  </form>
</template>

<script>
import { setTokenOwner } from '@/api/token'

export default {
  name: 'Colony.Token.SetOwner',
  methods: {
    setTokenOwner,
  },
}
</script>
