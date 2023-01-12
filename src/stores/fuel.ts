import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import configureMeasurements, { mass, volume } from 'convert-units'

const convert = configureMeasurements({
  mass,
  volume,
})

export const useFuelStore = defineStore(
  'fuel',
  () => {
    const density = ref(0.804)
    const currentFuelMass = ref(0)
    const blockFuelMass = ref(0)

    const densityUnits = ref('kg/l')
    const massUnits = ref('kg')

    const densityUnitOptions = [
      'kg/l',
      'lb/gal',
    ]

    const massUnitOptions = [
      'kg',
      'lb',
    ]

    function convertUnits(value, from, to) {
      return convert(parseFloat(value)).from(from).to(to)
    }

    const baseDensity = computed(() => {
      const densityUnitsArray = densityUnits.value.split('/')

      let value = convertUnits(density.value, densityUnitsArray[0], 'kg')

      value = convertUnits(value, 'l', densityUnitsArray[1])

      return value
    })

    const baseCurrentFuelMass = computed(() => {
      return convertUnits(currentFuelMass.value, massUnits.value, 'kg')
    })

    const baseBlockFuelMass = computed(() => {
      return convertUnits(blockFuelMass.value, massUnits.value, 'kg')
    })

    const baseRequiredFuelMass = computed(() => {
      return baseBlockFuelMass.value - baseCurrentFuelMass.value
    })

    const baseRequiredFuelVolume = computed(() => {
      return baseDensity.value !== 0 ? baseRequiredFuelMass.value / baseDensity.value : 0
    })

    const requiredFuelMass = computed(() => {
      return Math.round(convertUnits(baseRequiredFuelMass.value, 'kg', massUnits.value))
    })

    const volumeUnits = computed(() => {
      return densityUnits.value === 'kg/l' ? 'l' : 'gal'
    })

    const requiredFuelVolume = computed(() => {
      return Math.round(convertUnits(baseRequiredFuelVolume.value, 'l', volumeUnits.value))
    })

    return {
      blockFuelMass,
      currentFuelMass,
      density,
      densityUnitOptions,
      densityUnits,
      massUnitOptions,
      massUnits,
      requiredFuelMass,
      requiredFuelVolume,
      volumeUnits,
    }
  },
  {
    persist: true,
  },
)
