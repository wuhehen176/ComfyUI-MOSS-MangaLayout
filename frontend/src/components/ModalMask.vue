<script setup lang="ts">
defineProps<{open?:boolean;topLayer?:boolean}>();
const emit=defineEmits<{close:[]}>();
</script>
<template><Teleport to="body"><div v-if="open" class="moss-modal" @mousedown.self="emit('close')"><slot /></div></Teleport></template>
<style scoped>.moss-modal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:#000a;color:#e9eef4;font:14px/1.5 system-ui,sans-serif}.moss-modal :deep(.manga-designer){--bbi-surface:#202733;--bbi-ink:#e9eef4;background:#202733;box-shadow:0 10px 50px #000a}.moss-modal :deep(button){color:inherit}.moss-modal :deep(select option){background:#202733;color:#e9eef4}</style>
