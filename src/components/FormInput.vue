<script setup lang="ts">
const props = defineProps(['value', 'unit', 'units', 'label'])
defineEmits(['update:value', 'update:unit'])
</script>

<template>
  <div>
    <label
      for="density"
      class="block text-sm font-medium text-gray-400"
    >{{ props.label }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        id="density"
        type="text"
        step="0.001"
        name="density"
        class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900"
        placeholder="0.00"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      >
      <div
        v-if="units"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <label
          for="density_units"
          class="sr-only"
        >Units</label>
        <select
          id="density_units"
          :value="unit"
          name="density_units"
          class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-8 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm uppercase"
          @input="$emit('update:unit', $event.target.value)"
        >
          <option
            v-for="option in units"
            :key="option"
            :value="option"
            class="uppercase"
          >
            {{ option.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
