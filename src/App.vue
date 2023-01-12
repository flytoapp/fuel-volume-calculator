<script setup lang="ts">
import { useFuelStore } from '@/stores/fuel'
import FormInput from '@/components/FormInput.vue'

const store = useFuelStore()
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center uppercase tracking-widest text-white">
    <div class="flex flex-col gap-8 max-w-md mx-auto">
      <FormInput
        v-model:value="store.density"
        v-model:unit="store.densityUnits"
        :units="store.densityUnitOptions"
        label="Fuel density"
      />
      <FormInput
        v-model:value="store.currentFuelMass"
        v-model:unit="store.massUnits"
        :units="store.massUnitOptions"
        label="Current fuel"
      />
      <FormInput
        v-model:value="store.blockFuelMass"
        v-model:unit="store.massUnits"
        :units="store.massUnitOptions"
        label="Block fuel"
      />
      <div>
        <div class="text-sm font-medium text-gray-400">
          Required fuel mass
        </div>
        <div class="font-bold">
          {{ store.requiredFuelMass }} {{ store.massUnits }}
        </div>
      </div>
      <div>
        <div class="text-sm font-medium text-gray-400">
          Required fuel volume
        </div>
        <div class="font-bold">
          {{ store.requiredFuelVolume }} {{ store.volumeUnits }}
        </div>
      </div>
    </div>
  </div>
</template>
