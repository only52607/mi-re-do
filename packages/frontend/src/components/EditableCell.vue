<!--
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 
 * @Date: 2021-02-03 17:46:06
 * @LastEditTime: 2021-02-27 20:58:59
-->
<template>
  <div class="editable-cell">
      <div v-if="editing" class="editable-cell-input-wrapper">
        <check-outlined class="editable-cell-icon-check" @click="finish" />
        <a-input v-model:value="inputValue" @pressEnter="finish" />
      </div>
      <div v-else class="editable-cell-text-wrapper">
        <edit-outlined class="editable-cell-icon" @click="startEdit" />
        {{value || ' '}}
      </div>
  </div>
</template>

<script setup lang="ts">
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { defineEmits, defineProps, useAttrs } from 'vue';
const props = defineProps<{
  value: any
}>()
const emit = defineEmits(["change","update:value"])
ref: inputValue = ""
ref: editing = false
ref: oldValue = "" as string | undefined
function finish() {
  editing = false;
  emit("update:value", inputValue)
  emit('change', inputValue, oldValue)
}
function startEdit() {
  if (props.value) inputValue = props.value?.toString()
  oldValue = inputValue
  editing = true;
}

</script>

<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>